"use client";
import * as THREE from "three";
import { useRef, useEffect } from "react";
import { useFrame } from "@react-three/fiber";
import { Physics, RigidBody } from "@react-three/rapier";
import { DragControls, MeshTransmissionMaterial } from "@react-three/drei";
import { easing } from "maath";

import { Me } from "./avatar";

export default function PlayGround() {
  const tk = useRef<THREE.Mesh>(null);
  const scrollOffset = useRef(0);

  const p = 31;
  const q = 5;

  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      // Adjust this multiplier to control zoom speed
      scrollOffset.current += e.deltaY * 0.1;
    };

    // Add a wheel event listener to window (or a scrollable container)
    window.addEventListener("wheel", handleWheel, { passive: true });

    // Cleanup the event listener on unmount
    return () => {
      window.removeEventListener("wheel", handleWheel);
    };
  }, []);
  useFrame((state, delta) => {
    if (!tk.current) return;
    let cameraYOffset = state.pointer.y * 0.05 + scrollOffset.current - 100;
    tk.current.rotation.z = 1 * state.clock.getElapsedTime();
    tk.current.rotation.x = Math.PI / 2;
    if (scrollOffset.current > 100 && scrollOffset.current < 200) {
      tk.current.rotation.x = ((scrollOffset.current / 100) * Math.PI) / 2;
      cameraYOffset = 0;
    }
    if (scrollOffset.current > 200) {
      tk.current.rotation.x = Math.PI * 2;
      tk.current.position.z = scrollOffset.current / 50 - 2;
      cameraYOffset = 0;
    }
    easing.damp3(
      state.camera.position,
      [
        Math.sin(-state.pointer.x) * 5,
        cameraYOffset,
        5 + Math.cos(state.pointer.x) * 2,
      ],
      0.1,
      delta,
    );
    state.camera.lookAt(0, 0, 0);
  });

  return (
    <Physics gravity={[0, 0, 0]}>
      <spotLight position={[0, 0, 3]} penumbra={100} castShadow angle={0.2} />
      <ambientLight color="white" intensity={1} />
      <pointLight position={[0, 0, 3]} />
      <Me />
      <DragControls>
        <mesh ref={tk}>
          <torusKnotGeometry args={[7, 0.5, 1000, 100, p, q]} />
          <MeshTransmissionMaterial
            specularColor={0x0000ff}
            sheenColor={0x8800ff}
            thickness={2}
            backside
            backsideThickness={1}
          />
        </mesh>
      </DragControls>
    </Physics>
  );
}
