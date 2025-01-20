import * as THREE from "three";
import { Svg } from "@react-three/drei";
import { type ThemeFill } from "&/theme";
interface hiProps {
  theming: ThemeFill;
}
export default function Hi({ theming }: hiProps) {
  if (!theming) return;
  return (
    <Svg
      src={"hi.svg"}
      position={[-40, 0, 75]}
      scale={0.1}
      rotation={new THREE.Euler(Math.PI / 2, 0, 0)}
      fillMaterial={{ color: `${theming.fill}` }}
      strokeMaterial={{ color: "black" }}
    />
  );
}
