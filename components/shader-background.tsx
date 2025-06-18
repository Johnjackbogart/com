"use client"

import { useRef, useEffect } from "react"
import { Canvas, useFrame, extend, useThree } from "@react-three/fiber"
import { shaderMaterial } from "@react-three/drei"
import * as THREE from "three"

const vertexShader = `
varying vec2 vUv;

void main() {
  vUv = uv;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
`

const fragmentShader = `
precision highp float;

uniform float u_time;
uniform vec2 u_resolution;
varying vec2 vUv;

// 2D Random function
float random (vec2 st) {
    return fract(sin(dot(st.xy,
                         vec2(12.9898,78.233)))*
        43758.5453123);
}

void main() {
    vec2 st = vUv;
    // Preserve aspect ratio
    float aspect = u_resolution.x / u_resolution.y;
    st.x *= aspect;

    float rnd = random(st * 2.0 + u_time * 0.005); // Increased frequency of noise

    // Create a subtle, dark, grainy texture
    vec3 color = vec3(rnd * 0.06 + 0.02); // Slightly brighter base for grain

    gl_FragColor = vec4(color, 1.0);
}
`

const NoiseMaterial = shaderMaterial(
  {
    u_time: 0,
    u_resolution: new THREE.Vector2(),
  },
  vertexShader,
  fragmentShader,
)

extend({ NoiseMaterial })

declare global {
  namespace JSX {
    interface IntrinsicElements {
      noiseMaterial: any
    }
  }
}

function Scene() {
  const materialRef = useRef<THREE.ShaderMaterial>(null!)
  const { size } = useThree()

  useEffect(() => {
    if (materialRef.current) {
      materialRef.current.uniforms.u_resolution.value.x = size.width
      materialRef.current.uniforms.u_resolution.value.y = size.height
    }
  }, [size])

  useFrame((state) => {
    if (materialRef.current) {
      materialRef.current.uniforms.u_time.value = state.clock.getElapsedTime()
    }
  })

  return (
    <mesh>
      <planeGeometry args={[2, 2]} />
      <noiseMaterial ref={materialRef} />
    </mesh>
  )
}

export function ShaderBackground() {
  return (
    <div className="fixed top-0 left-0 w-full h-full -z-10 bg-black">
      <Canvas camera={{ position: [0, 0, 1] }}>
        <Scene />
      </Canvas>
    </div>
  )
}
