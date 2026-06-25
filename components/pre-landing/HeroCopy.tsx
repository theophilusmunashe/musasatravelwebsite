"use client";

import { motion } from "framer-motion";
import { SITE_NAME } from "@/lib/site";
import LogoMark from "../LogoMark";
import { COPY_FADE_S, ENTRANCE_SEQUENCE } from "./constants";

const ease = [0.22, 1, 0.36, 1] as const;

export default function HeroCopy({ visible }: { visible: boolean }) {
  return (
    <motion.div
      initial={false}
      animate={
        visible
          ? { opacity: 1, y: 0, filter: "blur(0px)" }
          : { opacity: 0, y: -18, filter: "blur(6px)" }
      }
      transition={{
        duration: visible ? 0.9 : COPY_FADE_S,
        ease,
      }}
      className="pointer-events-none flex w-full max-w-5xl flex-col items-center px-4 text-center sm:px-6"
    >
      <motion.div
        initial={{ opacity: 0, y: 14 }}
        animate={visible ? { opacity: 1, y: 0 } : { opacity: 0, y: -10 }}
        transition={{
          delay: visible ? ENTRANCE_SEQUENCE.headline - 0.2 : 0,
          duration: 0.75,
          ease,
        }}
        className="relative mb-3 w-full md:mb-4"
      >
        <LogoMark size="hero" tone="intro" className="relative mx-auto" />
      </motion.div>

      <motion.h1
        initial={{ opacity: 0, y: 28 }}
        animate={visible ? { opacity: 1, y: 0 } : { opacity: 0, y: -14 }}
        transition={{
          delay: visible ? ENTRANCE_SEQUENCE.headline : 0,
          duration: 1,
          ease,
        }}
        className="font-display text-[clamp(2.5rem,7vw,5.5rem)] font-light leading-[1.05] tracking-[0.04em] text-white"
      >
        Where African Stories Live
      </motion.h1>

      <motion.div
        initial={{ scaleX: 0, opacity: 0 }}
        animate={
          visible ? { scaleX: 1, opacity: 1 } : { scaleX: 0.6, opacity: 0 }
        }
        transition={{
          delay: visible ? ENTRANCE_SEQUENCE.headline + 0.25 : 0,
          duration: 0.85,
          ease,
        }}
        className="my-7 h-px w-24 origin-center bg-gradient-to-r from-transparent via-amber-300/50 to-transparent"
        aria-hidden="true"
      />

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={visible ? { opacity: 1, y: 0 } : { opacity: 0, y: -12 }}
        transition={{
          delay: visible ? ENTRANCE_SEQUENCE.supporting : 0,
          duration: 0.95,
          ease,
        }}
        className="max-w-xl font-sans text-[clamp(0.95rem,2.2vw,1.125rem)] font-light leading-relaxed tracking-[0.04em] text-white/65"
      >
        Step through the doorway into {SITE_NAME} — a sanctuary where heritage,
        warmth, and belonging become your story.
      </motion.p>
    </motion.div>
  );
}
