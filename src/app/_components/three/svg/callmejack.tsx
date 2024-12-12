import { Svg } from "@react-three/drei";
import { type ThemeFill } from "&/theme";
interface callMeJackProps {
  theming: ThemeFill;
}
export default function CallMeJack({ theming }: callMeJackProps) {
  if (!theming) return;
  return (
    <Svg
      src={`${theming.isMobile ? "callmejackmobile.svg" : "callmejack.svg"}`}
      position={theming.textPositions.callMeJack}
      scale={0.001}
      fillMaterial={{ color: `${theming.fill}` }}
      strokeMaterial={{ color: "black" }}
    />
  );
}
