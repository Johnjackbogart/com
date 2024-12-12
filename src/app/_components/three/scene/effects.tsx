"use client";

import { useRef } from "react";
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
import { isMobile } from "react-device-detect";
import { useThemeToFill } from "&/theme";

export default function Effects() {
  const theming = useThemeToFill();
  const mobileMultiplier = isMobile ? 0.1 : 1;
  let chromaEffect: ChromaticAberrationEffect | null = null;
  const offset = useRef(new THREE.Vector2(0.05, 0.05));

  useFrame((state, delta) => {
    //can I just import this as a prop ?????
    //stolen from https://discourse.threejs.org/t/how-to-create-glass-material-that-refracts-elements-in-dom/53625/3
    easing.damp3(
      state.camera.position,
      [
        mobileMultiplier * Math.sin(-state.pointer.x) * 2.5,
        mobileMultiplier * state.pointer.y * 5,
        mobileMultiplier * 5 + Math.cos(state.pointer.x) * 2,
      ],
      1,
      delta,
    );
    state.camera.lookAt(0, 0, 0);

    if (!chromaEffect) return;
    const x = Math.sin(-state.pointer.x) / 100;
    const y = state.pointer.y / 100;
    offset.current.set(x, y);
    chromaEffect.offset = offset.current;
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
      <Bloom
        mipmapBlur
        luminanceThreshold={0.8}
        intensity={theming?.bloom}
        levels={8}
      />
      <TiltShift2 blur={0.2} />
    </EffectComposer>
  );
}
