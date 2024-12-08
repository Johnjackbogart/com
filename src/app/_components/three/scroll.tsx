"use client";
import { ScrollControls, Scroll } from "@react-three/drei";
import { useThree } from "@react-three/fiber";

export default function ScrollContainer({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const { height } = useThree((state) => state.viewport);
  return (
    <ScrollControls>
      <Scroll>{children}</Scroll>
    </ScrollControls>
  );
}
