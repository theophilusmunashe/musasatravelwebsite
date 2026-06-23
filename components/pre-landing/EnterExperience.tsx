"use client";

import { motion } from "framer-motion";

function MouseIcon() {
  return (
    <svg
      width="26"
      height="40"
      viewBox="0 0 26 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="text-white/80"
      aria-hidden="true"
    >
      <rect
        x="1"
        y="1"
        width="24"
        height="38"
        rx="12"
        stroke="currentColor"
        strokeWidth="1.5"
      />
      <motion.rect
        x="11"
        y="10"
        width="4"
        height="8"
        rx="2"
        fill="currentColor"
        animate={{ y: [0, 6, 0], opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
      />
    </svg>
  );
}

export default function EnterExperience({
  onEnter,
  reducedMotion,
  visible,
}: {
  onEnter: () => void;
  reducedMotion: boolean;
  visible: boolean;
}) {
  if (!visible) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
      className="flex flex-col items-center"
    >
      <motion.button
        type="button"
        onClick={onEnter}
        aria-label="Enter the website"
        whileHover={reducedMotion ? undefined : { scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className="group relative flex flex-col items-center gap-4 rounded-full focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400/60 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent"
      >
        <motion.div
          animate={reducedMotion ? undefined : { y: [0, -6, 0] }}
          transition={
            reducedMotion
              ? undefined
              : { duration: 3.5, repeat: Infinity, ease: "easeInOut" }
          }
          className="relative flex h-16 w-11 items-center justify-center transition-all duration-500 md:group-hover:h-14 md:group-hover:w-14"
        >
          <span className="max-md:hidden md:transition-opacity md:duration-500 md:group-hover:opacity-0 md:group-hover:scale-75">
            <MouseIcon />
          </span>
          <span className="font-sans text-[11px] font-medium uppercase tracking-[0.45em] text-white/90 pl-1 max-md:inline md:pointer-events-none md:absolute md:inset-0 md:flex md:items-center md:justify-center md:opacity-0 md:transition-all md:duration-500 md:group-hover:opacity-100">
            Enter
          </span>
        </motion.div>

        <span className="font-sans text-[10px] uppercase tracking-[0.35em] text-white/35 transition-colors duration-500 group-hover:text-white/55">
          <span className="md:hidden">Tap to Enter</span>
          <span className="hidden md:inline">Enter Experience</span>
        </span>
      </motion.button>
    </motion.div>
  );
}
