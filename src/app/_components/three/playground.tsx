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
      scrollOffset.current += e.deltaY * 0.001;
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
    if (state.clock.getElapsedTime() < 5) {
      tk.current.position.setZ(-50 + 12 * state.clock.getElapsedTime());
    }
    tk.current.rotation.z = 1 * state.clock.getElapsedTime();
    //can I just import this as a prop ?????
    //stolen from https://discourse.threejs.org/t/how-to-create-glass-material-that-refracts-elements-in-dom/53625/3
    easing.damp3(
      state.camera.position,
      [
        Math.sin(-state.pointer.x) * 5,
        state.pointer.y * 5,
        5 + scrollOffset.current + Math.cos(state.pointer.x) * 2,
      ],
      0.1,
      delta,
    );
    state.camera.lookAt(0, 0, 0);
  });

  return (
    <Physics gravity={[0, 0, 0]}>
      <spotLight position={[0, 0, 0]} penumbra={10} castShadow angle={0.2} />
      <ambientLight intensity={1} />
      <pointLight position={[0, 0, 0]} />
      <DragControls>
        <Me />
      </DragControls>
      <DragControls>
        <RigidBody colliders={"hull"} restitution={2}>
          <mesh ref={tk}>
            <torusKnotGeometry args={[5, 0.5, 1000, 100, p, q]} />
            <MeshTransmissionMaterial
              thickness={2}
              backside
              backsideThickness={1}
            />
          </mesh>
        </RigidBody>
      </DragControls>
    </Physics>
  );
}
