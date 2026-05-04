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

// Additional moving attractors
const ATTRACTOR_POINT_COUNT = 2;
const ATTRACTOR_POINT_SIZE = 0.08;
const ATTRACTOR_RADIUS = 2.0;
const ATTRACTOR_FORCE = 0.015;
const ATTRACTOR_RETURN_FORCE = 0.004;
const ATTRACTOR_RANDOM_TARGET_FORCE = 0.008;
const ATTRACTOR_RANDOM_TARGET_RADIUS = 0.35;
const ATTRACTOR_RANDOM_TARGET_MIN_FRAMES = 80;
const ATTRACTOR_RANDOM_TARGET_MAX_FRAMES = 220;
const ATTRACTOR_DAMPING_FACTOR = 0.92;
const ATTRACTOR_MAX_VELOCITY = 0.045;
const ATTRACTOR_BOUNCE_DAMPING = 0.8;
const ATTRACTOR_BOUND_PADDING = 0.08;
const ATTRACTOR_INITIAL_SIDE_RATIO = 0.72;

// Mouse Repulsion controlled by Y-axis
const PARTICLE_MOUSE_RADIUS = 1.2;
const MIN_REPULSION_FORCE = 0.0;
const MAX_REPULSION_FORCE = 0.25;

const NOISE_STRENGTH = 0.0001;

// Center Reset Logic
const CENTER_RESET_THRESHOLD = 0.25; // Larger threshold for more frequent resets

function resetAttractorTarget(
  targets: Float32Array,
  timers: Uint16Array,
  index: number,
  boundX: number,
  boundY: number,
) {
  const i3 = index * 3;
  targets[i3] = THREE.MathUtils.randFloatSpread(boundX * 2);
  targets[i3 + 1] = THREE.MathUtils.randFloatSpread(boundY * 2);
  targets[i3 + 2] = 0;
  timers[index] = THREE.MathUtils.randInt(
    ATTRACTOR_RANDOM_TARGET_MIN_FRAMES,
    ATTRACTOR_RANDOM_TARGET_MAX_FRAMES,
  );
}

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
  const attractorGeometryRef = useRef<THREE.BufferGeometry>(null!);
  const attractorInitialX = useMemo(() => {
    const halfWidth = Math.max(
      viewport.width / 2 - ATTRACTOR_BOUND_PADDING,
      ATTRACTOR_BOUND_PADDING,
    );
    return halfWidth * ATTRACTOR_INITIAL_SIDE_RATIO;
  }, [viewport.width]);
  const attractorPositions = useMemo(
    () =>
      new Float32Array([
        -attractorInitialX,
        0,
        0,
        attractorInitialX,
        0,
        0,
      ]),
    [attractorInitialX],
  );
  const attractorVelocities = useMemo(
    () => new Float32Array([0.01, 0, 0, -0.01, 0, 0]),
    [],
  );
  const attractorTargets = useMemo(
    () =>
      new Float32Array([
        attractorInitialX,
        0,
        0,
        -attractorInitialX,
        0,
        0,
      ]),
    [attractorInitialX],
  );
  const attractorTargetTimers = useMemo(
    () => new Uint16Array([ATTRACTOR_RANDOM_TARGET_MIN_FRAMES, 140]),
    [],
  );
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
  }, [particleCount, particleSpread.x, particleSpread.y, particleSpread.z]);

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

    const attractorBoundX = Math.max(
      viewport.width / 2 - ATTRACTOR_BOUND_PADDING,
      ATTRACTOR_BOUND_PADDING,
    );
    const attractorBoundY = Math.max(
      viewport.height / 2 - ATTRACTOR_BOUND_PADDING,
      ATTRACTOR_BOUND_PADDING,
    );

    for (let a = 0; a < ATTRACTOR_POINT_COUNT; a++) {
      const a3 = a * 3;
      const ax = attractorPositions[a3];
      const ay = attractorPositions[a3 + 1];

      let accX = (CENTER_POINT.x - ax) * ATTRACTOR_RETURN_FORCE;
      let accY = (CENTER_POINT.y - ay) * ATTRACTOR_RETURN_FORCE;

      const dxTarget = attractorTargets[a3] - ax;
      const dyTarget = attractorTargets[a3 + 1] - ay;
      const distToTarget = Math.sqrt(dxTarget * dxTarget + dyTarget * dyTarget);

      if (
        distToTarget < ATTRACTOR_RANDOM_TARGET_RADIUS ||
        attractorTargetTimers[a] === 0
      ) {
        resetAttractorTarget(
          attractorTargets,
          attractorTargetTimers,
          a,
          attractorBoundX,
          attractorBoundY,
        );
      } else {
        attractorTargetTimers[a] -= 1;
        accX += dxTarget * ATTRACTOR_RANDOM_TARGET_FORCE;
        accY += dyTarget * ATTRACTOR_RANDOM_TARGET_FORCE;
      }

      attractorVelocities[a3] += accX;
      attractorVelocities[a3 + 1] += accY;
      attractorVelocities[a3] *= ATTRACTOR_DAMPING_FACTOR;
      attractorVelocities[a3 + 1] *= ATTRACTOR_DAMPING_FACTOR;

      const speedSq =
        attractorVelocities[a3] ** 2 + attractorVelocities[a3 + 1] ** 2;
      if (speedSq > ATTRACTOR_MAX_VELOCITY ** 2 && speedSq > 0) {
        const factor = ATTRACTOR_MAX_VELOCITY / Math.sqrt(speedSq);
        attractorVelocities[a3] *= factor;
        attractorVelocities[a3 + 1] *= factor;
      }

      attractorPositions[a3] += attractorVelocities[a3];
      attractorPositions[a3 + 1] += attractorVelocities[a3 + 1];
      attractorPositions[a3 + 2] = 0;
      attractorVelocities[a3 + 2] = 0;

      if (attractorPositions[a3] > attractorBoundX) {
        attractorPositions[a3] = attractorBoundX;
        attractorVelocities[a3] =
          -Math.abs(attractorVelocities[a3]) * ATTRACTOR_BOUNCE_DAMPING;
      } else if (attractorPositions[a3] < -attractorBoundX) {
        attractorPositions[a3] = -attractorBoundX;
        attractorVelocities[a3] =
          Math.abs(attractorVelocities[a3]) * ATTRACTOR_BOUNCE_DAMPING;
      }

      if (attractorPositions[a3 + 1] > attractorBoundY) {
        attractorPositions[a3 + 1] = attractorBoundY;
        attractorVelocities[a3 + 1] =
          -Math.abs(attractorVelocities[a3 + 1]) * ATTRACTOR_BOUNCE_DAMPING;
      } else if (attractorPositions[a3 + 1] < -attractorBoundY) {
        attractorPositions[a3 + 1] = -attractorBoundY;
        attractorVelocities[a3 + 1] =
          Math.abs(attractorVelocities[a3 + 1]) * ATTRACTOR_BOUNCE_DAMPING;
      }
    }

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

      for (let a = 0; a < ATTRACTOR_POINT_COUNT; a++) {
        const a3 = a * 3;
        const dxAttractor = attractorPositions[a3] - px;
        const dyAttractor = attractorPositions[a3 + 1] - py;
        const dzAttractor = attractorPositions[a3 + 2] - pz;
        const distanceAttractor = Math.sqrt(
          dxAttractor * dxAttractor +
            dyAttractor * dyAttractor +
            dzAttractor * dzAttractor,
        );

        if (distanceAttractor < ATTRACTOR_RADIUS) {
          const safeDistance = Math.max(distanceAttractor, 0.0001);
          const forceFactor =
            (ATTRACTOR_RADIUS - safeDistance) / ATTRACTOR_RADIUS;
          accX +=
            (dxAttractor / safeDistance) * forceFactor * ATTRACTOR_FORCE;
          accY +=
            (dyAttractor / safeDistance) * forceFactor * ATTRACTOR_FORCE;
          accZ +=
            (dzAttractor / safeDistance) * forceFactor * ATTRACTOR_FORCE;
        }
      }

      // Mouse Repulsion Force (strength controlled by Y-axis)
      const dxMouse = px - mouseWorldX;
      const dyMouse = py - mouseWorldY;
      const distanceMouse = Math.sqrt(dxMouse * dxMouse + dyMouse * dyMouse);

      if (distanceMouse < PARTICLE_MOUSE_RADIUS && currentRepulsionForce > 0) {
        const forceFactor =
          (PARTICLE_MOUSE_RADIUS - distanceMouse) / PARTICLE_MOUSE_RADIUS;
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

      // Reset Logic: If particle reaches an attractor OR goes too far out, reset it to a random position within the full spread
      const distToCenterSq = px * px + py * py + pz * pz; // Using squared distance for efficiency
      const resetThresholdSq = CENTER_RESET_THRESHOLD * CENTER_RESET_THRESHOLD;
      let distToMovingAttractorSq = Number.POSITIVE_INFINITY;
      for (let a = 0; a < ATTRACTOR_POINT_COUNT; a++) {
        const a3 = a * 3;
        const dxAttractor = px - attractorPositions[a3];
        const dyAttractor = py - attractorPositions[a3 + 1];
        const dzAttractor = pz - attractorPositions[a3 + 2];
        distToMovingAttractorSq = Math.min(
          distToMovingAttractorSq,
          dxAttractor * dxAttractor +
            dyAttractor * dyAttractor +
            dzAttractor * dzAttractor,
        );
      }
      const halfSpreadX = particleSpread.x / 2;
      const halfSpreadY = particleSpread.y / 2;
      const halfSpreadZ = particleSpread.z / 2;

      if (
        distToCenterSq < resetThresholdSq || // Reached center
        distToMovingAttractorSq < resetThresholdSq || // Reached moving attractor
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
    if (attractorGeometryRef.current?.attributes.position) {
      attractorGeometryRef.current.attributes.position.needsUpdate = true;
    }
  });

  return (
    <>
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
      <points>
        <bufferGeometry ref={attractorGeometryRef} attach="geometry">
          <bufferAttribute
            attach="attributes-position"
            args={[attractorPositions, 3]}
          />
        </bufferGeometry>
        <pointsMaterial
          attach="material"
          size={ATTRACTOR_POINT_SIZE}
          color={particleColor}
          sizeAttenuation
          transparent
          opacity={0.85}
          blending={
            useNormalBlending ? THREE.NormalBlending : THREE.AdditiveBlending
          }
          depthWrite={false}
        />
      </points>
    </>
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
  const count = isMobile ? 5000 : PARTICLE_COUNT;
  useEffect(() => {
    setMounted(true);
  }, []);
  const themePreference = theme ?? "system";
  const currentTheme = mounted
    ? themePreference === "system"
      ? resolvedTheme
      : themePreference
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
