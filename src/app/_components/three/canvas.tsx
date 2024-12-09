"use client";
import { Suspense } from "react";
import * as THREE from "three";
import { Canvas } from "@react-three/fiber";
import Effects from "./scene/effects";
import Env from "./scene/env";
import Loading from "./Loading";

export default function ThreeCanvas({
  children,
}: Readonly<{ children: React.ReactNode }>) {
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
        <Env />
        <Effects />
        {children}
      </Suspense>
    </Canvas>
  );
}
