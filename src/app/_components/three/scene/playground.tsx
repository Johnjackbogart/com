"use client";
import * as THREE from "three";
import { useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";
import {
  MeshTransmissionMaterial,
  ScrollControls,
  Scroll as DreiScroll,
  useScroll,
} from "@react-three/drei";
import { easing } from "maath";
import { isMobile } from "react-device-detect";
import { useThemeToFill } from "&/theme";
import Text from "./text/text";
import Me from "./me";
import Mic from "./mic";

function Scene() {
  const theming = useThemeToFill();
  const tk = useRef<THREE.Mesh>(null);
  const scroll = useScroll();
  const [mic, setMic] = useState(false);
  const mobileMultiplier = isMobile ? 0.1 : 1;

  const p = 31;
  const q = 5;

  useFrame((state, delta) => {
    if (!tk.current) return;
    const scrolled = scroll.offset * 100;
    const scrollMultiplier = scrolled > 70 ? 0.0001 : 1;
    let cameraYOffset = state.pointer.y * 0.05 + scrolled * 10 - 100;
    const cameraZOffset = scrolled > 70 ? 7 : 5 + Math.cos(state.pointer.x) * 2;
    tk.current.rotation.z = 1 * state.clock.getElapsedTime();
    tk.current.rotation.x = Math.PI / 2;

    if (scrolled > 10 && scrolled < 30) {
      cameraYOffset = 0;
    } else if (scrolled > 30 && scrolled < 50) {
      tk.current.rotation.x = ((scrolled - 30) * Math.PI) / 40 + Math.PI / 2;
      tk.current.position.z = scrolled / 5 - 6;
      cameraYOffset = 0;
    } else if (scrolled > 50 && scrolled < 70) {
      setMic(false);
      tk.current.rotation.x = Math.PI;
      tk.current.position.z = scrolled / 5 - 6;
      cameraYOffset = 0;
    } else if (scrolled > 70) {
      tk.current.rotation.x = Math.PI;
      tk.current.position.z = scrolled / 5 - 6;
      setMic(true);
    }

    easing.damp3(
      state.camera.position,
      [
        scrollMultiplier * mobileMultiplier * Math.sin(-state.pointer.x) * 2.5,
        scrollMultiplier * cameraYOffset,
        cameraZOffset,
      ],
      0.01,
      delta,
    );
    state.camera.lookAt(new THREE.Vector3(0, 0, 0));
  });

  return (
    <>
      <Text theming={theming!} />
      <spotLight position={[0, 0, 3]} penumbra={100} castShadow angle={1} />
      <ambientLight color="white" intensity={1} />
      <pointLight position={[0, 0, 3]} />
      <Me />
      {mic && <Mic />}
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
    </>
  );
}

export default function Playground() {
  return (
    //scroll controls breaks canvas when pages not equal to 1
    //if screen is resized, or canvas is moved, camera produces weird activity
    //setting distance to 10 produces the same behavior that I'm initially looking for
    <Scene />
  );
}
