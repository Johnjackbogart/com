import { Svg } from "@react-three/drei";
import { type ThemeFill } from "&/theme";
interface developerProps {
  theming: ThemeFill;
}
export default function Developer({ theming }: developerProps) {
  if (!theming) return;
  return (
    <Svg
      //src={`${theming.isMobile ? "callmejackmobile.svg" : "callmejack.svg"}`}
      src={"developer.svg"}
      position={theming.textPositions.developer}
      scale={0.001}
      fillMaterial={{ color: `${theming.fill}` }}
      strokeMaterial={{ color: "black" }}
    />
  );
}
