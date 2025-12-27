"use client";

import * as THREE from "three";
import { useRef, useMemo, useEffect, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useIsMobile } from "@/lib/useIsMobile";
import { useTheme } from "next-themes";

// --- Constants for Particle Behavior ---
const PARTICLE_COUNT = 15000; // Increased for a denser cloud
const PARTICLE_SIZE = 0.02;

// Particle Physics
const MAX_VELOCITY = 0.005;
const CENTER_POINT = new THREE.Vector3(0, 0, 0);
const WEAK_ATTRACTION = 0.005; // Stronger pull to the center
const DAMPING_FACTOR = 0.6; // Less damping for more floaty movement

// Mouse Repulsion controlled by Y-axis
const MOUSE_RADIUS = 2.0;
const MIN_REPULSION_FORCE = 0.0;
const MAX_REPULSION_FORCE = 0.25;

const NOISE_STRENGTH = 0.0001;

// Center Reset Logic
const CENTER_RESET_THRESHOLD = 0.25; // Larger threshold for more frequent resets

type ParticlesProps = {
  particleCount: number;
  backgroundColor: string;
  particleColor: string;
  useNormalBlending: boolean;
};

function Particles({
  particleCount,
  backgroundColor,
  particleColor,
  useNormalBlending,
}: ParticlesProps) {
  const { scene, viewport } = useThree();
  const pointsRef = useRef<THREE.Points>(null!);
  const velocitiesRef = useRef<Float32Array>(
    new Float32Array(particleCount * 3).fill(0),
  );

  const particleSpread = useMemo(() => {
    const width = viewport.width > 0 ? viewport.width : 10;
    const height = viewport.height > 0 ? viewport.height : 10;
    return {
      x: width * 1.2,
      y: height * 1.2,
      z: 3.0,
    };
  }, [viewport.width, viewport.height]);

  // Initial positions are still used for the first render
  const initialParticlePositions = useMemo(() => {
    const p = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount; i++) {
      const i3 = i * 3;
      p[i3] = THREE.MathUtils.randFloatSpread(particleSpread.x * 0.7);
      p[i3 + 1] = THREE.MathUtils.randFloatSpread(particleSpread.y * 0.7);
      p[i3 + 2] = THREE.MathUtils.randFloatSpread(particleSpread.z * 0.7);
    }
    return p;
  }, []);

  useEffect(() => {
    scene.background = new THREE.Color(backgroundColor);
  }, [backgroundColor, scene]);

  useEffect(() => {
    velocitiesRef.current = new Float32Array(particleCount * 3);
  }, [particleCount]);

  useFrame((state) => {
    if (!pointsRef.current || !pointsRef.current.geometry) return;
    const positions = pointsRef.current.geometry.attributes.position
      .array as Float32Array;
    const velocities = velocitiesRef.current;

    const framePointer = state.pointer;
    const mouseWorldX = framePointer.x * (viewport.width / 2);
    const mouseWorldY = framePointer.y * (viewport.height / 2);

    const normalizedMouseY = (framePointer.y + 1) / 2;
    const currentRepulsionForce =
      MIN_REPULSION_FORCE +
      normalizedMouseY * (MAX_REPULSION_FORCE - MIN_REPULSION_FORCE);

    for (let i = 0; i < particleCount; i++) {
      const i3 = i * 3;
      let px = positions[i3];
      let py = positions[i3 + 1];
      let pz = positions[i3 + 2];

      let accX = 0,
        accY = 0,
        accZ = 0;

      // Faint attraction to the center
      accX += (CENTER_POINT.x - px) * WEAK_ATTRACTION;
      accY += (CENTER_POINT.y - py) * WEAK_ATTRACTION;
      accZ += (CENTER_POINT.z - pz) * WEAK_ATTRACTION;

      // Mouse Repulsion Force (strength controlled by Y-axis)
      const dxMouse = px - mouseWorldX;
      const dyMouse = py - mouseWorldY;
      const distanceMouse = Math.sqrt(dxMouse * dxMouse + dyMouse * dyMouse);

      if (distanceMouse < MOUSE_RADIUS && currentRepulsionForce > 0) {
        const forceFactor = (MOUSE_RADIUS - distanceMouse) / MOUSE_RADIUS;
        const angle = Math.atan2(dyMouse, dxMouse);
        accX += Math.cos(angle) * forceFactor * currentRepulsionForce;
        accY += Math.sin(angle) * forceFactor * currentRepulsionForce;
      }

      // A tiny bit of random noise
      accX += (Math.random() - 0.5) * NOISE_STRENGTH;
      accY += (Math.random() - 0.5) * NOISE_STRENGTH;
      accZ += (Math.random() - 0.5) * NOISE_STRENGTH;

      // Update velocities
      velocities[i3] += accX;
      velocities[i3 + 1] += accY;
      velocities[i3 + 2] += accZ;

      // Apply Damping
      velocities[i3] *= DAMPING_FACTOR;
      velocities[i3 + 1] *= DAMPING_FACTOR;
      velocities[i3 + 2] *= DAMPING_FACTOR;

      // Cap velocity
      const speedSq =
        velocities[i3] ** 2 + velocities[i3 + 1] ** 2 + velocities[i3 + 2] ** 2;
      if (speedSq > MAX_VELOCITY ** 2 && speedSq > 0) {
        const factor = MAX_VELOCITY / Math.sqrt(speedSq);
        velocities[i3] *= factor;
        velocities[i3 + 1] *= factor;
        velocities[i3 + 2] *= factor;
      }

      // Update positions
      positions[i3] += velocities[i3];
      positions[i3 + 1] += velocities[i3 + 1];
      positions[i3 + 2] += velocities[i3 + 2];

      // Update local px, py, pz for distance check after position update
      px = positions[i3];
      py = positions[i3 + 1];
      pz = positions[i3 + 2];

      // Reset Logic: If particle reaches the center OR goes too far out, reset it to a random position within the full spread
      const distToCenterSq = px * px + py * py + pz * pz; // Using squared distance for efficiency
      const halfSpreadX = particleSpread.x / 2;
      const halfSpreadY = particleSpread.y / 2;
      const halfSpreadZ = particleSpread.z / 2;

      if (
        distToCenterSq < CENTER_RESET_THRESHOLD * CENTER_RESET_THRESHOLD || // Reached center
        Math.abs(positions[i3]) > halfSpreadX || // Went too far X
        Math.abs(positions[i3 + 1]) > halfSpreadY || // Went too far Y
        Math.abs(positions[i3 + 2]) > halfSpreadZ // Went too far Z
      ) {
        positions[i3] = THREE.MathUtils.randFloatSpread(particleSpread.x); // Reset X to random position within full spread
        positions[i3 + 1] = THREE.MathUtils.randFloatSpread(particleSpread.y); // Reset Y to random position within full spread
        positions[i3 + 2] = THREE.MathUtils.randFloatSpread(particleSpread.z); // Reset Z to random position within full spread
        velocities[i3] = 0; // Zero out velocity
        velocities[i3 + 1] = 0;
        velocities[i3 + 2] = 0;
      }
    }
    if (pointsRef.current.geometry.attributes.position) {
      pointsRef.current.geometry.attributes.position.needsUpdate = true;
    }
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry attach="geometry">
        <bufferAttribute
          attach="attributes-position"
          args={[initialParticlePositions, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        attach="material"
        size={PARTICLE_SIZE}
        color={particleColor}
        sizeAttenuation
        transparent
        opacity={0.65}
        blending={
          useNormalBlending ? THREE.NormalBlending : THREE.AdditiveBlending
        }
        depthWrite={false}
      />
    </points>
  );
}

export function InteractiveParticleCloud({
  className,
}: {
  className?: string;
}) {
  const [mounted, setMounted] = useState(false);
  const { resolvedTheme, theme } = useTheme();
  const isMobile = useIsMobile();
  const count = isMobile ? 5000 : 15000;
  useEffect(() => {
    setMounted(true);
  }, []);
  const currentTheme = mounted
    ? theme === "system"
      ? resolvedTheme
      : theme
    : undefined;
  const isDark = currentTheme === "dark";
  const backgroundColor = isDark ? "#000000" : "#ffffff";
  const particleColor = isDark ? "#ffffff" : "#000000";

  return (
    <div className={className}>
      <Canvas
        eventSource={typeof window !== "undefined" ? document.body : undefined}
        eventPrefix="client"
        camera={{ position: [0, 0, 4.0], fov: 70 }}
      >
        <ambientLight intensity={0.5} />
        <Particles
          particleCount={count}
          key={`${count}-${isDark ? "dark" : "light"}`}
          backgroundColor={backgroundColor}
          particleColor={particleColor}
          useNormalBlending={!isDark}
        />
      </Canvas>
    </div>
  );
}
