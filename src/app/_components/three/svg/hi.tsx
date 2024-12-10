import * as THREE from "three";
import type { SVGProps } from "react";
import { Svg } from "@react-three/drei";
interface hiProps extends SVGProps<SVGSVGElement> {
  fill: string | undefined;
}
export default function Hi({ fill }: hiProps) {
  if (!fill) return;
  return (
    <Svg
      src={"hi.svg"}
      position={[-50, 0, 50]}
      scale={0.1}
      rotation={new THREE.Euler(Math.PI / 2, 0, 0)}
      fillMaterial={{ color: `${fill}` }}
      strokeMaterial={{ color: "black" }}
    />
  );
}
