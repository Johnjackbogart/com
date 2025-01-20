"use client";
import { Suspense } from "react";
import * as THREE from "three";
import { Canvas } from "@react-three/fiber";
import { ScrollControls, Scroll as DreiScroll } from "@react-three/drei";
import { useThemeToFill } from "&/theme";
import Effects from "./scene/effects";
import Env from "./scene/env";
import Loading from "./Loading";
import PlayGround from "&/three/scene/playground";

//const Env = lazy(() => import("./scene/env"));

export default function ThreeCanvas() {
  const theming = useThemeToFill();
  return (
    <Canvas
      gl={{ alpha: true }}
      onCreated={({ gl }) => {
        gl.setClearColor(new THREE.Color(0x000000), 0.01);
      }}
      eventPrefix="client"
      camera={{
        position: [0, 0, 0],
        fov: 100,
        near: 0.1,
        far: 1000,
      }}
    >
      <Suspense fallback={<Loading />}>
        <ScrollControls pages={1} damping={0.01} distance={10}>
          <DreiScroll>
            <Env theming={theming} />
            <Effects />
            <PlayGround />
          </DreiScroll>
        </ScrollControls>
      </Suspense>
    </Canvas>
  );
}
