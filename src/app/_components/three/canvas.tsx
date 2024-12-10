"use client";
import { Suspense, lazy } from "react";
import * as THREE from "three";
import { Canvas } from "@react-three/fiber";
import { useThemeToFill } from "&/theme";
import Effects from "./scene/effects";
import Env from "./scene/env";
import Loading from "./Loading";

//const Env = lazy(() => import("./scene/env"));

export default function ThreeCanvas({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const theming = useThemeToFill();
  return (
    <Canvas
      gl={{ alpha: true }}
      onCreated={({ gl }) => {
        gl.setClearColor(new THREE.Color(0x000000), 0.01);
      }}
      eventPrefix="client"
      camera={{ position: [0, 0, 0], fov: 100 }}
    >
      <Suspense fallback={<Loading />}>
        <Env theming={theming} />
        <Effects />
        {children}
      </Suspense>
    </Canvas>
  );
}
