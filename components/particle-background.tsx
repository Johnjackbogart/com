"use client";

import dynamic from "next/dynamic";

// Lazy-load the actual R3F canvas and skip SSR
const InteractiveParticleCloud = dynamic(
  () =>
    import("@/components/interactive-particle-cloud").then(
      (m) => m.InteractiveParticleCloud, // adjust if default export
    ),
  { ssr: false }, // ← allowed here
);

export function ParticleCloudBackground(
  props: React.ComponentProps<"div"> & { className?: string },
) {
  return <InteractiveParticleCloud {...props} />;
}
