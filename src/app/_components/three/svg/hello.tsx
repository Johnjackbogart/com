import { Svg } from "@react-three/drei";
interface helloProps {
  fill: string | undefined;
}
export default function Hello({ fill }: helloProps) {
  return (
    <Svg
      src={"hello.svg"}
      position={[1, 1, 5]}
      scale={0.001}
      fillMaterial={{ color: `${fill}` }}
      strokeMaterial={{ color: "black" }}
    />
  );
}
