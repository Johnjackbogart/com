import { Svg } from "@react-three/drei";
import { type ThemeFill } from "&/theme";
interface helloProps {
  theming: ThemeFill;
}
export default function Hello({ theming }: helloProps) {
  if (!theming) return;
  return (
    <Svg
      src={"hello.svg"}
      position={theming.textPositions.hello}
      scale={0.001}
      fillMaterial={{ color: `${theming.fill}` }}
      strokeMaterial={{ color: "black" }}
    />
  );
}
