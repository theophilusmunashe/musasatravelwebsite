"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import desktopImage from "@/assets/doorway_welcome_desktop.jpg";
import mobileImage from "@/assets/doorway_welcome_mobile.jpg";
import { DOOR_ZOOM_DURATION_S, DOOR_ZOOM_SCALE } from "./constants";

export default function KenBurnsBackground({
  reducedMotion,
}: {
  reducedMotion: boolean;
}) {
  const zoomScale = reducedMotion ? 1.03 : DOOR_ZOOM_SCALE;
  const zoomDuration = reducedMotion ? 8 : DOOR_ZOOM_DURATION_S;

  return (
    <div className="absolute inset-0 overflow-hidden" aria-hidden="true">
      <motion.div
        initial={{ opacity: 0, scale: 1 }}
        animate={{ opacity: 1, scale: zoomScale }}
        transition={{
          opacity: { duration: 1.4, ease: [0.22, 1, 0.36, 1] },
          scale: {
            duration: zoomDuration,
            ease: [0.22, 0.03, 0.12, 1],
          },
        }}
        className="absolute inset-0 will-change-transform"
        style={{ transformOrigin: "center center" }}
      >
        <Image
          src={desktopImage}
          alt=""
          fill
          priority
          sizes="100vw"
          className="hidden object-cover object-[center_42%] md:block"
          placeholder="blur"
        />
        <Image
          src={mobileImage}
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover object-[center_40%] md:hidden"
          placeholder="blur"
        />
      </motion.div>
    </div>
  );
}
