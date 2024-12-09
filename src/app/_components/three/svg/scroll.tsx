import * as THREE from "three";
import { Svg } from "@react-three/drei";
export default function Scroll() {
  return (
    <Svg
      src={"scroll.svg"}
      position={[-50, 0, -50]}
      scale={0.1}
      rotation={new THREE.Euler(Math.PI / 2, 0, 0)}
      fillMaterial={{ color: "white" }}
      strokeMaterial={{ color: "black" }}
    />
  );
}
