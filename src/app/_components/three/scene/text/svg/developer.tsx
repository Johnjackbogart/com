import { useRef } from "react";
import * as THREE from "three";
import { useFrame } from "@react-three/fiber";
import { useScroll, Svg } from "@react-three/drei";
import { type ThemeFill } from "&/theme";
interface developerProps {
  theming: ThemeFill;
}
export default function Developer({ theming }: developerProps) {
  const scroll = useScroll();
  const sr = useRef<THREE.Object3D>(new THREE.Object3D());
  if (!theming) return;
  useFrame((state, delta) => {
    const scrolled = scroll.offset * 100;
    if (scrolled > 70) {
      sr.current.position.setZ(scrolled - 65);
    }
  });
  return (
    <Svg
      //src={`${theming.isMobile ? "callmejackmobile.svg" : "callmejack.svg"}`}
      ref={sr}
      src={"developer.svg"}
      position={theming.textPositions.developer}
      scale={0.001}
      fillMaterial={{ color: `${theming.fill}` }}
      strokeMaterial={{ color: "black" }}
    />
  );
}
