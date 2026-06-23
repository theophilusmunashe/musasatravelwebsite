"use client";

import { useMemo } from "react";

type Particle = {
  id: number;
  left: number;
  top: number;
  size: number;
  delay: number;
  duration: number;
  opacity: number;
};

function createParticles(count: number): Particle[] {
  return Array.from({ length: count }, (_, id) => ({
    id,
    left: Math.random() * 100,
    top: Math.random() * 100,
    size: 1 + Math.random() * 2.5,
    delay: Math.random() * 8,
    duration: 14 + Math.random() * 12,
    opacity: 0.08 + Math.random() * 0.18,
  }));
}

export default function DustParticles({
  reducedMotion,
}: {
  reducedMotion: boolean;
}) {
  const particles = useMemo(() => createParticles(36), []);

  if (reducedMotion) return null;

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
      {particles.map((p) => (
        <span
          key={p.id}
          className="absolute rounded-full bg-amber-50 animate-dust-float will-change-transform"
          style={{
            left: `${p.left}%`,
            top: `${p.top}%`,
            width: p.size,
            height: p.size,
            opacity: p.opacity,
            animationDelay: `${p.delay}s`,
            animationDuration: `${p.duration}s`,
          }}
        />
      ))}
    </div>
  );
}
