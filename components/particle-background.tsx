"use client";

// from claude:
// They're not actually duplicates — particle-background.tsx is a thin "use client" shim whose only job is to call next/dynamic(..., { ssr: false }). Next's App Router forbids ssr:
// false inside a Server Component's dynamic() call, and app/layout.tsx is a Server Component, so that indirection is the standard workaround to lazy-load the actual Three.js
// scene (interactive-particle-cloud.tsx) without SSR. Not redundant, just two different responsibilities.
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
