import * as THREE from "three";
import type { SVGProps } from "react";
import { Svg } from "@react-three/drei";
interface scrollProps extends SVGProps<SVGSVGElement> {
  fill: string | undefined;
}
export default function Scroll({ fill }: scrollProps) {
  if (!fill) return;
  return (
    <Svg
      src={"scroll.svg"}
      position={[-50, 0, -50]}
      scale={0.1}
      rotation={new THREE.Euler(Math.PI / 2, 0, 0)}
      fillMaterial={{ color: `${fill}` }}
      strokeMaterial={{ color: "black" }}
    />
  );
}
