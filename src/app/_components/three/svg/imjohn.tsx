import * as THREE from "three";
import { Svg } from "@react-three/drei";
export default function ImJohn() {
  return (
    <Svg
      src={"imjohn.svg"}
      position={[1, 0, 5]}
      scale={0.001}
      fillMaterial={{ color: "white" }}
      strokeMaterial={{ color: "black" }}
    />
  );
}
