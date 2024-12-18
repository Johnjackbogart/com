import { Svg } from "@react-three/drei";
import { type ThemeFill } from "&/theme";
interface clevelandProps {
  theming: ThemeFill;
}
export default function Cleveland({ theming }: clevelandProps) {
  if (!theming) return;
  return (
    <Svg
      //src={`${theming.isMobile ? "callmejackmobile.svg" : "callmejack.svg"}`}
      src={"cleveland.svg"}
      position={theming.textPositions.cleveland}
      scale={0.001}
      fillMaterial={{ color: `${theming.fill}` }}
      strokeMaterial={{ color: "black" }}
    />
  );
}
