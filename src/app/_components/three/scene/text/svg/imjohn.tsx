import { Svg } from "@react-three/drei";
import { type ThemeFill } from "&/theme";
interface ImJohnProps {
  theming: ThemeFill;
}
export default function ImJohn({ theming }: ImJohnProps) {
  if (!theming) return;
  return (
    <Svg
      src={"imjohn.svg"}
      position={theming.textPositions.imJohn}
      scale={0.001}
      fillMaterial={{ color: `${theming.fill}` }}
      strokeMaterial={{ color: "black" }}
    />
  );
}
