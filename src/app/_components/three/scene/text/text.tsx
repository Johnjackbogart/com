import { useState } from "react";
import { useFrame } from "@react-three/fiber";
import { useScroll } from "@react-three/drei";
import Scroll from "./svg/scroll";
import Hi from "./svg/hi";
import Hello from "./svg/hello";
import ImJohn from "./svg/imjohn";
import CallMeJack from "./svg/callmejack";
import Cleveland from "./svg/cleveland";
import Developer from "./svg/developer";
import { type ThemeFill } from "&/theme";
interface textProps {
  theming: ThemeFill;
}
export default function Text({ theming }: textProps) {
  const scroll = useScroll();
  const [intro, setIntro] = useState<boolean>(true);
  useFrame(() => {
    const scrolled = scroll.offset * 100;
    console.log(scrolled);
    if (scrolled > 40) {
      setIntro(false);
    } else {
      setIntro(true);
    }
  });
  return (
    <>
      <Hi theming={theming} />
      <Scroll theming={theming} />
      {intro ? (
        <>
          <Hello theming={theming} />
          <ImJohn theming={theming} />
          <CallMeJack theming={theming} />
        </>
      ) : (
        <>
          <Developer theming={theming} />
          <Cleveland theming={theming} />
        </>
      )}
    </>
  );
}
