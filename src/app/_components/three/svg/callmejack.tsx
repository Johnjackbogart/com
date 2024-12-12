import * as THREE from "three";
import { Svg } from "@react-three/drei";
interface callMeJackProps {
  fill: string | undefined;
}
export default function CallMeJack({ fill }: callMeJackProps) {
  return (
    <Svg
      src={"callmejack.svg"}
      position={[1, -1, 5]}
      scale={0.001}
      fillMaterial={{ color: `${fill}` }}
      strokeMaterial={{ color: "black" }}
    />
  );
}
