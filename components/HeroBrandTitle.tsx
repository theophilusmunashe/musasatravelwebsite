"use client";

import { motion, type Transition, type Variants } from "framer-motion";
import { cn } from "@/lib/utils";

type HeroBrandTitleProps = {
  className?: string;
  variants?: Variants;
  transition?: Transition;
  initial?: string;
  animate?: string;
};

export default function HeroBrandTitle({
  className,
  variants,
  transition,
  initial = "bananin",
  animate = "bananon",
}: HeroBrandTitleProps) {
  return (
    <motion.h1
      variants={variants}
      initial={initial}
      whileInView={animate}
      viewport={{ once: true }}
      transition={transition}
      className={cn(
        "hero-brand-title flex flex-col items-center normal-case text-white",
        "drop-shadow-[0_4px_32px_rgba(0,0,0,0.55)]",
        className
      )}
    >
      <span className="font-script block leading-[0.85] text-[clamp(3.25rem,11vw,6.75rem)]">
        Kumusha
      </span>
      <span className="font-display block font-light uppercase tracking-[0.42em] text-[clamp(0.55rem,1.6vw,0.8rem)] text-white/90 mt-2 sm:mt-3">
        ( E K H A Y A L E T H U )
      </span>
      <span className="font-script block leading-none text-[clamp(1.65rem,4.5vw,2.85rem)] mt-3 sm:mt-4">
        Private Estate
      </span>
    </motion.h1>
  );
}
