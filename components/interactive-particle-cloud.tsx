"use client"

import * as THREE from "three"
import { useRef, useMemo } from "react"
import { Canvas, useFrame, useThree } from "@react-three/fiber"

// --- Constants for Particle Behavior ---
const PARTICLE_COUNT = 3500
const PARTICLE_SIZE = 0.02

// Particle Physics
const MAX_VELOCITY = 0.15 // Increased to allow for stronger repulsion
const CENTER_POINT = new THREE.Vector3(0, 0, 0)
const WEAK_ATTRACTION = 0.0001 // A very faint pull to the center to keep the cloud cohesive
const DAMPING_FACTOR = 0.96 // A constant damping factor

// Mouse Repulsion controlled by Y-axis
const MOUSE_RADIUS = 1.0 // The area of effect around the mouse
const MIN_REPULSION_FORCE = 0.0 // No force at the bottom of the screen
const MAX_REPULSION_FORCE = 0.25 // Strongest force at the top of the screen

const NOISE_STRENGTH = 0.0001

function Particles() {
  const { viewport } = useThree()
  const pointsRef = useRef<THREE.Points>(null!)
  const velocitiesRef = useRef<Float32Array>(new Float32Array(PARTICLE_COUNT * 3).fill(0))

  const particleSpread = useMemo(() => {
    const width = viewport.width > 0 ? viewport.width : 10
    const height = viewport.height > 0 ? viewport.height : 10
    return {
      x: width * 1.2,
      y: height * 1.2,
      z: 3.0,
    }
  }, [viewport.width, viewport.height])

  const initialParticlePositions = useMemo(() => {
    const p = new Float32Array(PARTICLE_COUNT * 3)
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const i3 = i * 3
      p[i3] = THREE.MathUtils.randFloatSpread(particleSpread.x * 0.7)
      p[i3 + 1] = THREE.MathUtils.randFloatSpread(particleSpread.y * 0.7)
      p[i3 + 2] = THREE.MathUtils.randFloatSpread(particleSpread.z * 0.7)
    }
    return p
  }, [particleSpread.x, particleSpread.y, particleSpread.z])

  useMemo(() => {
    velocitiesRef.current = new Float32Array(PARTICLE_COUNT * 3).fill(0)
  }, [PARTICLE_COUNT])

  useFrame((state) => {
    if (!pointsRef.current || !pointsRef.current.geometry) return
    const positions = pointsRef.current.geometry.attributes.position.array as Float32Array
    const velocities = velocitiesRef.current

    const framePointer = state.pointer
    const mouseWorldX = framePointer.x * (viewport.width / 2)
    const mouseWorldY = framePointer.y * (viewport.height / 2)

    // Normalize mouse.y from [-1, 1] to [0, 1] for repulsion strength
    const normalizedMouseY = (framePointer.y + 1) / 2
    const currentRepulsionForce = MIN_REPULSION_FORCE + normalizedMouseY * (MAX_REPULSION_FORCE - MIN_REPULSION_FORCE)

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const i3 = i * 3
      const px = positions[i3]
      const py = positions[i3 + 1]
      const pz = positions[i3 + 2]

      let accX = 0,
        accY = 0,
        accZ = 0

      // 1. Faint attraction to the center to prevent drifting away
      accX += (CENTER_POINT.x - px) * WEAK_ATTRACTION
      accY += (CENTER_POINT.y - py) * WEAK_ATTRACTION
      accZ += (CENTER_POINT.z - pz) * WEAK_ATTRACTION

      // 2. Mouse Repulsion Force (strength controlled by Y-axis)
      const dx = px - mouseWorldX
      const dy = py - mouseWorldY
      const distance = Math.sqrt(dx * dx + dy * dy)

      if (distance < MOUSE_RADIUS && currentRepulsionForce > 0) {
        const forceFactor = (MOUSE_RADIUS - distance) / MOUSE_RADIUS
        const angle = Math.atan2(dy, dx)
        accX += Math.cos(angle) * forceFactor * currentRepulsionForce
        accY += Math.sin(angle) * forceFactor * currentRepulsionForce
      }

      // 3. A tiny bit of random noise
      accX += (Math.random() - 0.5) * NOISE_STRENGTH
      accY += (Math.random() - 0.5) * NOISE_STRENGTH
      accZ += (Math.random() - 0.5) * NOISE_STRENGTH

      // Update velocities
      velocities[i3] += accX
      velocities[i3 + 1] += accY
      velocities[i3 + 2] += accZ

      // Apply Damping
      velocities[i3] *= DAMPING_FACTOR
      velocities[i3 + 1] *= DAMPING_FACTOR
      velocities[i3 + 2] *= DAMPING_FACTOR

      // Cap velocity
      const speedSq = velocities[i3] ** 2 + velocities[i3 + 1] ** 2 + velocities[i3 + 2] ** 2
      if (speedSq > MAX_VELOCITY ** 2 && speedSq > 0) {
        const factor = MAX_VELOCITY / Math.sqrt(speedSq)
        velocities[i3] *= factor
        velocities[i3 + 1] *= factor
        velocities[i3 + 2] *= factor
      }

      // Update positions
      positions[i3] += velocities[i3]
      positions[i3 + 1] += velocities[i3 + 1]
      positions[i3 + 2] += velocities[i3 + 2]

      // Boundary Reset
      const halfSpreadX = particleSpread.x / 2
      const halfSpreadY = particleSpread.y / 2
      const halfSpreadZ = particleSpread.z / 2

      if (
        Math.abs(positions[i3]) > halfSpreadX ||
        Math.abs(positions[i3 + 1]) > halfSpreadY ||
        Math.abs(positions[i3 + 2]) > halfSpreadZ
      ) {
        positions[i3] = THREE.MathUtils.randFloatSpread(particleSpread.x * 0.1)
        positions[i3 + 1] = THREE.MathUtils.randFloatSpread(particleSpread.y * 0.1)
        positions[i3 + 2] = THREE.MathUtils.randFloatSpread(particleSpread.z * 0.1)
        velocities[i3] = 0
        velocities[i3 + 1] = 0
        velocities[i3 + 2] = 0
      }
    }
    if (pointsRef.current.geometry.attributes.position) {
      pointsRef.current.geometry.attributes.position.needsUpdate = true
    }
  })

  return (
    <points ref={pointsRef}>
      <bufferGeometry attach="geometry">
        <bufferAttribute
          attach="attributes-position"
          count={PARTICLE_COUNT}
          array={initialParticlePositions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        attach="material"
        size={PARTICLE_SIZE}
        color="#A0A0F0"
        sizeAttenuation
        transparent
        opacity={0.65}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  )
}

export function InteractiveParticleCloud({ className }: { className?: string }) {
  return (
    <div className={className}>
      <Canvas camera={{ position: [0, 0, 4.0], fov: 70 }}>
        <ambientLight intensity={0.5} />
        <Particles />
      </Canvas>
    </div>
  )
}
