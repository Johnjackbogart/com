import * as THREE from "three";
import { Svg } from "@react-three/drei";
export default function CallMeJack() {
  return (
    <Svg
      src={"callmejack.svg"}
      position={[1, -1, 5]}
      scale={0.001}
      fillMaterial={{ color: "white" }}
      strokeMaterial={{ color: "black" }}
    />
  );
}
