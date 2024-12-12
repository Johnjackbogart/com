import * as THREE from "three";
import { Svg } from "@react-three/drei";
import { type ThemeFill } from "&/theme";
interface scrollProps {
  theming: ThemeFill;
}
export default function Scroll({ theming }: scrollProps) {
  if (!theming) return;
  return (
    <Svg
      src={"scroll.svg"}
      position={[-40, 0, -50]}
      scale={0.1}
      rotation={new THREE.Euler(Math.PI / 2, 0, 0)}
      fillMaterial={{ color: `${theming.fill}` }}
      strokeMaterial={{ color: "black" }}
    />
  );
}
