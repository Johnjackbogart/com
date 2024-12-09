import * as THREE from "three";
import { Svg } from "@react-three/drei";
export default function Hello() {
  return (
    <Svg
      src={"hello.svg"}
      position={[1, 1, 5]}
      scale={0.001}
      fillMaterial={{ color: "white" }}
      strokeMaterial={{ color: "black" }}
    />
  );
}
