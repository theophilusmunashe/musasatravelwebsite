"use client";

export default function DoorGlow({ reducedMotion }: { reducedMotion: boolean }) {
  return (
    <div
      className="pointer-events-none absolute inset-0 flex items-center justify-center"
      aria-hidden="true"
    >
      <div
        className={
          reducedMotion
            ? "h-[min(72vw,520px)] w-[min(44vw,320px)] rounded-full bg-amber-200/10 blur-3xl"
            : "h-[min(72vw,520px)] w-[min(44vw,320px)] animate-door-glow rounded-full bg-amber-200/10 blur-3xl will-change-transform"
        }
      />
    </div>
  );
}
