"use client";

import * as THREE from "three";
import { useRef, useMemo, useEffect, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useIsMobile } from "@/lib/useIsMobile";
import { useTheme } from "next-themes";

// --- Grid sizing (tweak these to change scale) ---
// GRID_SPACING: world-space distance between adjacent grid vertices.
// GRID_EXTENT: how many cells the grid spans in each direction from the
// center (so the full grid is (2*extent + 1) vertices wide per axis).
// CAMERA_DISTANCE/FOV: move the camera further/closer or widen the lens if
// the grid doesn't fill the viewport the way you want after changing the
// values above.
const GRID_SPACING = 0.6;
const GRID_EXTENT = { x: 20, y: 10, z: 22 };
const CAMERA_DISTANCE = 30;
const CAMERA_FOV = 48;

// View angle: 45 degrees around the vertical axis (azimuth) and 45 degrees
// up from the horizontal plane (elevation).
const CAMERA_AZIMUTH_DEG = 45;
const CAMERA_ELEVATION_DEG = 45;

// --- Particle behavior ---
const PARTICLE_COUNT = 3500;
const MOBILE_PARTICLE_COUNT = 1200;
const PARTICLE_SIZE = 0.12; // sphere diameter
const STEP_DURATION = 0.22; // seconds to travel one grid unit
const MAX_FRAME_DELTA = 0.1; // clamp so a stalled tab can't skip grid cells

// Each particle picks one of the 6 axis-aligned neighbors every time it
// reaches a vertex.
const AXIS_DELTAS: ReadonlyArray<readonly [number, number, number]> = [
  [1, 0, 0],
  [-1, 0, 0],
  [0, 1, 0],
  [0, -1, 0],
  [0, 0, 1],
  [0, 0, -1],
];

function pickNextDelta(
  cx: number,
  cy: number,
  cz: number,
  extent: { x: number; y: number; z: number },
): readonly [number, number, number] {
  const validDeltas = AXIS_DELTAS.filter(([dx, dy, dz]) => {
    const nx = cx + dx;
    const ny = cy + dy;
    const nz = cz + dz;
    return (
      Math.abs(nx) <= extent.x &&
      Math.abs(ny) <= extent.y &&
      Math.abs(nz) <= extent.z
    );
  });
  return validDeltas[Math.floor(Math.random() * validDeltas.length)];
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
  const { scene } = useThree();
  const meshRef = useRef<THREE.InstancedMesh>(null!);
  const dummy = useMemo(() => new THREE.Object3D(), []);

  const walkState = useMemo(() => {
    const currentGrid = new Int16Array(particleCount * 3);
    const targetGrid = new Int16Array(particleCount * 3);
    // Start at progress 1 so every particle picks its first destination on
    // the first frame instead of needing special-cased setup logic.
    const progress = new Float32Array(particleCount).fill(1);

    for (let i = 0; i < particleCount; i++) {
      const i3 = i * 3;
      currentGrid[i3] = THREE.MathUtils.randInt(-GRID_EXTENT.x, GRID_EXTENT.x);
      currentGrid[i3 + 1] = THREE.MathUtils.randInt(
        -GRID_EXTENT.y,
        GRID_EXTENT.y,
      );
      currentGrid[i3 + 2] = THREE.MathUtils.randInt(
        -GRID_EXTENT.z,
        GRID_EXTENT.z,
      );
      targetGrid[i3] = currentGrid[i3];
      targetGrid[i3 + 1] = currentGrid[i3 + 1];
      targetGrid[i3 + 2] = currentGrid[i3 + 2];
    }

    return { currentGrid, targetGrid, progress };
  }, [particleCount]);

  useEffect(() => {
    scene.background = new THREE.Color(backgroundColor);
  }, [backgroundColor, scene]);

  // Place instances at their starting vertices before the first frame runs.
  useEffect(() => {
    if (!meshRef.current) return;
    const { currentGrid } = walkState;
    for (let i = 0; i < particleCount; i++) {
      const i3 = i * 3;
      dummy.position.set(
        currentGrid[i3] * GRID_SPACING,
        currentGrid[i3 + 1] * GRID_SPACING,
        currentGrid[i3 + 2] * GRID_SPACING,
      );
      dummy.updateMatrix();
      meshRef.current.setMatrixAt(i, dummy.matrix);
    }
    meshRef.current.instanceMatrix.needsUpdate = true;
  }, [particleCount, walkState, dummy]);

  useFrame((_, rawDelta) => {
    if (!meshRef.current) return;
    const { currentGrid, targetGrid, progress } = walkState;
    const delta = Math.min(rawDelta, MAX_FRAME_DELTA);
    const step = delta / STEP_DURATION;

    for (let i = 0; i < particleCount; i++) {
      const i3 = i * 3;
      let t = progress[i] + step;

      if (t >= 1) {
        currentGrid[i3] = targetGrid[i3];
        currentGrid[i3 + 1] = targetGrid[i3 + 1];
        currentGrid[i3 + 2] = targetGrid[i3 + 2];

        const [dx, dy, dz] = pickNextDelta(
          currentGrid[i3],
          currentGrid[i3 + 1],
          currentGrid[i3 + 2],
          GRID_EXTENT,
        );
        targetGrid[i3] = currentGrid[i3] + dx;
        targetGrid[i3 + 1] = currentGrid[i3 + 1] + dy;
        targetGrid[i3 + 2] = currentGrid[i3 + 2] + dz;

        t -= 1;
      }
      progress[i] = t;

      // Linear interpolation keeps speed constant through each vertex
      // instead of slowing to a stop there.
      dummy.position.set(
        (currentGrid[i3] + (targetGrid[i3] - currentGrid[i3]) * t) *
          GRID_SPACING,
        (currentGrid[i3 + 1] + (targetGrid[i3 + 1] - currentGrid[i3 + 1]) * t) *
          GRID_SPACING,
        (currentGrid[i3 + 2] + (targetGrid[i3 + 2] - currentGrid[i3 + 2]) * t) *
          GRID_SPACING,
      );
      dummy.updateMatrix();
      meshRef.current.setMatrixAt(i, dummy.matrix);
    }

    meshRef.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={meshRef} args={[undefined, undefined, particleCount]}>
      <sphereGeometry args={[PARTICLE_SIZE / 2, 10, 10]} />
      <meshBasicMaterial
        color={particleColor}
        transparent
        opacity={0.75}
        blending={
          useNormalBlending ? THREE.NormalBlending : THREE.AdditiveBlending
        }
        depthWrite={false}
      />
    </instancedMesh>
  );
}

const CAMERA_POSITION: [number, number, number] = (() => {
  const azimuth = THREE.MathUtils.degToRad(CAMERA_AZIMUTH_DEG);
  const elevation = THREE.MathUtils.degToRad(CAMERA_ELEVATION_DEG);
  const horizontalDistance = CAMERA_DISTANCE * Math.cos(elevation);
  return [
    horizontalDistance * Math.sin(azimuth),
    CAMERA_DISTANCE * Math.sin(elevation),
    horizontalDistance * Math.cos(azimuth),
  ];
})();

export function InteractiveParticleCloud({
  className,
}: {
  className?: string;
}) {
  const [mounted, setMounted] = useState(false);
  const { resolvedTheme, theme } = useTheme();
  const isMobile = useIsMobile();
  const count = isMobile ? MOBILE_PARTICLE_COUNT : PARTICLE_COUNT;
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
        camera={{ position: CAMERA_POSITION, fov: CAMERA_FOV }}
        onCreated={({ camera }) => camera.lookAt(0, 0, 0)}
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
