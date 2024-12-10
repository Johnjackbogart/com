import { useRef } from "react";
import * as THREE from "three";
import { Environment, Lightformer, Float } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { LayerMaterial, Depth, Color } from "lamina";
import { type Theme } from "&/theme";

interface envProps {
  theming: Theme;
}

interface lfProps {
  positions?: number[];
  theming: Theme;
}

export function Lightformers({
  positions = [2, 0, 2, 0, 2, 0, 2, 0],
  theming,
}: lfProps) {
  const group = useRef<THREE.Group>(null);
  useFrame((state, delta) => {
    if (!group.current) return;
    group.current.position.z += delta * 100;
  });
  if (!theming) return;
  return (
    <>
      {/* Ceiling */}
      <Lightformer
        intensity={0.75}
        color={`${theming?.background}`}
        rotation-x={Math.PI / 2}
        position={[0, 5, -9]}
        scale={[10, 10, 1]}
      />
      <group rotation={[0, 0.5, 0]}>
        <group ref={group}>
          {positions.map((x, i) => (
            <Lightformer
              key={i}
              form="circle"
              intensity={2}
              rotation={[Math.PI / 2, 0, 0]}
              position={[x, 4, i * 4]}
              scale={[3, 1, 1]}
            />
          ))}
        </group>
      </group>
      {/* Sides */}
      <Lightformer
        intensity={4}
        //color="#f3f3f3"
        color={`${theming?.background}`}
        rotation-y={Math.PI / 2}
        position={[-5, 1, -1]}
        scale={[20, 0.1, 1]}
      />
      <Lightformer
        rotation-y={Math.PI / 2}
        //color="#3f3f3f"
        color={`${theming?.background}`}
        position={[-5, -1, -1]}
        scale={[20, 0.5, 1]}
      />
      <Lightformer
        rotation-y={-Math.PI / 2}
        //color="#111"
        color={`${theming?.fill}`}
        position={[10, 1, 0]}
        scale={[20, 1, 1]}
      />
      <Float speed={5} floatIntensity={2} rotationIntensity={2}>
        <Lightformer
          form="ring"
          //color="white"
          color={`${theming?.background}`}
          intensity={1}
          scale={10}
          position={[-15, 4, -18]}
          target={[0, 0, 0]}
        />
      </Float>
      {/* Background */}
      <mesh scale={50}>
        <sphereGeometry args={[1, 64, 64]} />
        <LayerMaterial side={THREE.BackSide}>
          <Color color={`${theming?.background}`} alpha={0.1} mode="normal" />
          <Depth
            //colorA="white"
            colorA={`${theming?.background}`}
            colorB="black"
            alpha={1}
            mode="normal"
            near={0}
            far={300}
            origin={[100, 100, 100]}
          />
        </LayerMaterial>
      </mesh>
    </>
  );
}
export default function Env({ theming }: envProps) {
  return (
    <Environment
      frames={Infinity}
      resolution={256}
      background
      backgroundBlurriness={1}
    >
      <Lightformers theming={theming} />
    </Environment>
  );
}
