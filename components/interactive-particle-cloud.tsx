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

// --- Click-to-scatter ---
// Clicking raycasts to a point in the grid; particles inside the
// EXPLOSION_RADIUS cube centered on that point get kicked outward (falloff by
// distance from center), then a spring-damper pulls each one back toward its
// walk position.
const SCATTER_STIFFNESS = 45;
const SCATTER_DAMPING = 12;
const EXPLOSION_RADIUS = 10;
const EXPLOSION_MAX_STRENGTH = 300;

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
  const { scene, camera } = useThree();
  const meshRef = useRef<THREE.InstancedMesh>(null!);
  const dummy = useMemo(() => new THREE.Object3D(), []);
  const raycaster = useMemo(() => new THREE.Raycaster(), []);
  const pointer = useMemo(() => new THREE.Vector2(), []);
  const explosionPoint = useMemo(() => new THREE.Vector3(), []);

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

    // Extra spring-driven offset layered on top of the grid walk, used to
    // scatter particles outward on click.
    const scatterOffset = new Float32Array(particleCount * 3);
    const scatterVelocity = new Float32Array(particleCount * 3);

    return {
      currentGrid,
      targetGrid,
      progress,
      scatterOffset,
      scatterVelocity,
    };
  }, [particleCount]);

  useEffect(() => {
    // Grid center sits at the world origin, so a plane through the origin
    // facing the (fixed) camera approximates the depth the click landed at.
    const explosionPlane = new THREE.Plane().setFromNormalAndCoplanarPoint(
      camera.position.clone().normalize(),
      new THREE.Vector3(0, 0, 0),
    );

    const handleClick = (event: MouseEvent) => {
      pointer.set(
        (event.clientX / window.innerWidth) * 2 - 1,
        -(event.clientY / window.innerHeight) * 2 + 1,
      );
      raycaster.setFromCamera(pointer, camera);
      if (!raycaster.ray.intersectPlane(explosionPlane, explosionPoint)) return;

      const { currentGrid, scatterVelocity } = walkState;
      const cx = explosionPoint.x;
      const cy = explosionPoint.y;
      const cz = explosionPoint.z;

      for (let i = 0; i < particleCount; i++) {
        const i3 = i * 3;
        const px = currentGrid[i3] * GRID_SPACING;
        const py = currentGrid[i3 + 1] * GRID_SPACING;
        const pz = currentGrid[i3 + 2] * GRID_SPACING;
        let dx = px - cx;
        let dy = py - cy;
        let dz = pz - cz;
        if (
          Math.abs(dx) > EXPLOSION_RADIUS ||
          Math.abs(dy) > EXPLOSION_RADIUS ||
          Math.abs(dz) > EXPLOSION_RADIUS
        )
          continue;

        // Chebyshev distance drives falloff so the influence region reads as
        // a cube instead of a sphere.
        const cubeDist = Math.max(Math.abs(dx), Math.abs(dy), Math.abs(dz));
        let len = Math.sqrt(dx * dx + dy * dy + dz * dz);
        if (len < 1e-4) {
          dx = Math.random() * 2 - 1;
          dy = Math.random() * 2 - 1;
          dz = Math.random() * 2 - 1;
          len = Math.sqrt(dx * dx + dy * dy + dz * dz) || 1;
        }
        const falloff = 1 - cubeDist / EXPLOSION_RADIUS;
        const strength = (EXPLOSION_MAX_STRENGTH * falloff * falloff) / len;
        scatterVelocity[i3] += dx * strength;
        scatterVelocity[i3 + 1] += dy * strength;
        scatterVelocity[i3 + 2] += dz * strength;
      }
    };
    window.addEventListener("click", handleClick);
    return () => window.removeEventListener("click", handleClick);
  }, [particleCount, walkState, camera, raycaster, pointer, explosionPoint]);

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
    const {
      currentGrid,
      targetGrid,
      progress,
      scatterOffset,
      scatterVelocity,
    } = walkState;
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

      // Damped spring pulls any scatter offset back toward zero, so a click
      // kicks particles out and they drift back onto the grid walk.
      const ox = scatterOffset[i3];
      const oy = scatterOffset[i3 + 1];
      const oz = scatterOffset[i3 + 2];
      const vx =
        scatterVelocity[i3] +
        (-SCATTER_STIFFNESS * ox - SCATTER_DAMPING * scatterVelocity[i3]) *
          delta;
      const vy =
        scatterVelocity[i3 + 1] +
        (-SCATTER_STIFFNESS * oy - SCATTER_DAMPING * scatterVelocity[i3 + 1]) *
          delta;
      const vz =
        scatterVelocity[i3 + 2] +
        (-SCATTER_STIFFNESS * oz - SCATTER_DAMPING * scatterVelocity[i3 + 2]) *
          delta;
      scatterVelocity[i3] = vx;
      scatterVelocity[i3 + 1] = vy;
      scatterVelocity[i3 + 2] = vz;
      scatterOffset[i3] = ox + vx * delta;
      scatterOffset[i3 + 1] = oy + vy * delta;
      scatterOffset[i3 + 2] = oz + vz * delta;

      // Linear interpolation keeps speed constant through each vertex
      // instead of slowing to a stop there.
      dummy.position.set(
        (currentGrid[i3] + (targetGrid[i3] - currentGrid[i3]) * t) *
          GRID_SPACING +
          scatterOffset[i3],
        (currentGrid[i3 + 1] + (targetGrid[i3 + 1] - currentGrid[i3 + 1]) * t) *
          GRID_SPACING +
          scatterOffset[i3 + 1],
        (currentGrid[i3 + 2] + (targetGrid[i3 + 2] - currentGrid[i3 + 2]) * t) *
          GRID_SPACING +
          scatterOffset[i3 + 2],
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
