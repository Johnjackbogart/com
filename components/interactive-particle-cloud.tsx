"use client"

import * as THREE from "three"
import { useRef, useMemo } from "react"
import { Canvas, useFrame, useThree } from "@react-three/fiber"

// --- Constants for Particle Behavior ---
const PARTICLE_COUNT = 35000
const PARTICLE_SIZE = 0.02

// Particle Physics
const MAX_VELOCITY = 0.15
const CENTER_POINT = new THREE.Vector3(0, 0, 0)
const WEAK_ATTRACTION = 0.005 // <--- TRY INCREASING THIS (e.g., to 0.001 or 0.002)
const DAMPING_FACTOR = 0.96

// Mouse Repulsion controlled by Y-axis
const MOUSE_RADIUS = 1.0
const MIN_REPULSION_FORCE = 0.0
const MAX_REPULSION_FORCE = 0.25

const NOISE_STRENGTH = 0.0001

// Center Reset Logic
const CENTER_RESET_THRESHOLD = 0.1 // <--- TRY INCREASING THIS (e.g., to 0.2 or 0.3)

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

  // Store initial positions for resetting
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

    const normalizedMouseY = (framePointer.y + 1) / 2
    const currentRepulsionForce = MIN_REPULSION_FORCE + normalizedMouseY * (MAX_REPULSION_FORCE - MIN_REPULSION_FORCE)

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const i3 = i * 3
      let px = positions[i3]
      let py = positions[i3 + 1]
      let pz = positions[i3 + 2]

      let accX = 0,
        accY = 0,
        accZ = 0

      accX += (CENTER_POINT.x - px) * WEAK_ATTRACTION
      accY += (CENTER_POINT.y - py) * WEAK_ATTRACTION
      accZ += (CENTER_POINT.z - pz) * WEAK_ATTRACTION

      const dxMouse = px - mouseWorldX
      const dyMouse = py - mouseWorldY
      const distanceMouse = Math.sqrt(dxMouse * dxMouse + dyMouse * dyMouse)

      if (distanceMouse < MOUSE_RADIUS && currentRepulsionForce > 0) {
        const forceFactor = (MOUSE_RADIUS - distanceMouse) / MOUSE_RADIUS
        const angle = Math.atan2(dyMouse, dxMouse)
        accX += Math.cos(angle) * forceFactor * currentRepulsionForce
        accY += Math.sin(angle) * forceFactor * currentRepulsionForce
      }

      accX += (Math.random() - 0.5) * NOISE_STRENGTH
      accY += (Math.random() - 0.5) * NOISE_STRENGTH
      accZ += (Math.random() - 0.5) * NOISE_STRENGTH

      velocities[i3] += accX
      velocities[i3 + 1] += accY
      velocities[i3 + 2] += accZ

      velocities[i3] *= DAMPING_FACTOR
      velocities[i3 + 1] *= DAMPING_FACTOR
      velocities[i3 + 2] *= DAMPING_FACTOR

      const speedSq = velocities[i3] ** 2 + velocities[i3 + 1] ** 2 + velocities[i3 + 2] ** 2
      if (speedSq > MAX_VELOCITY ** 2 && speedSq > 0) {
        const factor = MAX_VELOCITY / Math.sqrt(speedSq)
        velocities[i3] *= factor
        velocities[i3 + 1] *= factor
        velocities[i3 + 2] *= factor
      }

      positions[i3] += velocities[i3]
      positions[i3 + 1] += velocities[i3 + 1]
      positions[i3 + 2] += velocities[i3 + 2]

      // Update local px, py, pz for distance check after position update
      px = positions[i3]
      py = positions[i3 + 1]
      pz = positions[i3 + 2]

      // Center Reset Logic
      const distToCenterSq = px * px + py * py + pz * pz // Using squared distance for efficiency
      if (distToCenterSq < CENTER_RESET_THRESHOLD * CENTER_RESET_THRESHOLD) {
        positions[i3] = initialParticlePositions[i3] // <--- THIS RESETS TO ORIGINAL X
        positions[i3 + 1] = initialParticlePositions[i3 + 1] // <--- THIS RESETS TO ORIGINAL Y
        positions[i3 + 2] = initialParticlePositions[i3 + 2] // <--- THIS RESETS TO ORIGINAL Z
        velocities[i3] = 0 // <--- THIS ZEROS VELOCITY
        velocities[i3 + 1] = 0
        velocities[i3 + 2] = 0
      } else {
        // Boundary Reset (if not reset by center)
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
          array={initialParticlePositions} // Use initial positions for the buffer attribute
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
