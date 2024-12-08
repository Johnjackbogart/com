"use client";
import * as THREE from "three";
import { useRef, useEffect } from "react";
import { useFrame } from "@react-three/fiber";
import { Physics } from "@react-three/rapier";
import { MeshTransmissionMaterial, Svg } from "@react-three/drei";
import { easing } from "maath";

import { Me } from "./avatar";

export default function PlayGround() {
  const tk = useRef<THREE.Mesh>(null);
  const scrollOffset = useRef(0);

  const p = 31;
  const q = 5;

  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      scrollOffset.current += e.deltaY * 0.1;
    };

    window.addEventListener("wheel", handleWheel, { passive: true });

    return () => {
      window.removeEventListener("wheel", handleWheel);
    };
  }, []);
  useFrame((state, delta) => {
    if (!tk.current) return;

    let cameraYOffset = state.pointer.y * 0.05 + scrollOffset.current - 100;
    const cameraZOffset = 5 + Math.cos(state.pointer.x) * 2;
    tk.current.rotation.z = 1 * state.clock.getElapsedTime();
    tk.current.rotation.x = Math.PI / 2;

    if (scrollOffset.current > 100 && scrollOffset.current < 200) {
      cameraYOffset = 0;
    } else if (scrollOffset.current > 200 && scrollOffset.current < 400) {
      console.log(scrollOffset.current);
      tk.current.rotation.x = (scrollOffset.current / 400) * Math.PI;
      tk.current.position.z = scrollOffset.current / 50 - 4;
      cameraYOffset = 0;
    } else if (scrollOffset.current > 400) {
      tk.current.rotation.x = Math.PI;
      tk.current.position.z = scrollOffset.current / 50 - 4;
      cameraYOffset = 0;
    }
    easing.damp3(
      state.camera.position,
      [Math.sin(-state.pointer.x) * 5, cameraYOffset, cameraZOffset],
      0.1,
      delta,
    );
    console.log(tk.current.position);
    state.camera.lookAt(0, 0, 0);
  });

  return (
    <Physics gravity={[0, 0, 0]}>
      <Svg
        src={"scroll.svg"}
        position={[0, 0, 50]}
        scale={0.1}
        rotation={new THREE.Euler(Math.PI / 2, 0, 0)}
        fillMaterial={{ color: "white" }}
        strokeMaterial={{ color: "black" }}
      />
      <spotLight position={[0, 0, 3]} penumbra={100} castShadow angle={0.2} />
      <ambientLight color="white" intensity={1} />
      <pointLight position={[0, 0, 3]} />
      <Me />
      <mesh ref={tk}>
        <torusKnotGeometry args={[7, 0.5, 1000, 100, p, q]} />
        <MeshTransmissionMaterial
          specularColor={0xffffff}
          sheenColor={0xffffff}
          thickness={2}
          backside
          backsideThickness={1}
        />
      </mesh>
    </Physics>
  );
}
