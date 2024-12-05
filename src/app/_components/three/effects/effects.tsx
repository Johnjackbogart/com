"use client";

import { useRef, useEffect } from "react";
import * as THREE from "three";
import { useFrame } from "@react-three/fiber";
import {
  Bloom,
  ChromaticAberration,
  EffectComposer,
  TiltShift2,
} from "@react-three/postprocessing";
import { ChromaticAberrationEffect, BlendFunction } from "postprocessing";
import { easing } from "maath";

export default function Effects() {
  let chromaEffect: ChromaticAberrationEffect | null = null;
  let offset = new THREE.Vector2(0.1, 0.1);

  // Use a ref to store the scroll-based zoom offset
  const scrollOffset = useRef(0);

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

    if (!chromaEffect) return;
    const x = Math.sin(-state.pointer.x) / 100;
    const y = state.pointer.y / 100;
    offset = new THREE.Vector2(x, y);
    chromaEffect.offset = offset;
  });
  return (
    <EffectComposer enableNormalPass={true}>
      <ChromaticAberration
        ref={(ref) => {
          if (ref && typeof ref === "object" && "offset" in ref) {
            chromaEffect = ref as ChromaticAberrationEffect;
          }
        }}
        blendFunction={BlendFunction.NORMAL}
        offset={new THREE.Vector2(0.01, 0.01)}
        radialModulation={false}
        modulationOffset={1.0}
      />
      <Bloom mipmapBlur luminanceThreshold={0.8} intensity={2} levels={8} />
      <TiltShift2 blur={0.2} />
    </EffectComposer>
  );
}
