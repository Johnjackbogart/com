import { Svg } from "@react-three/drei";
interface imJohnProps {
  fill: string | undefined;
}
export default function ImJohn({ fill }: imJohnProps) {
  return (
    <Svg
      src={"imjohn.svg"}
      position={[1, 0, 5]}
      scale={0.001}
      fillMaterial={{ color: `${fill}` }}
      strokeMaterial={{ color: "black" }}
    />
  );
}
