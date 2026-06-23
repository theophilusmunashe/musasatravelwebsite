"use client";

import { useCallback, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { SITE_NAME } from "@/lib/site";
import KenBurnsBackground from "./KenBurnsBackground";
import DustParticles from "./DustParticles";
import DoorGlow from "./DoorGlow";
import EnterExperience from "./EnterExperience";
import HeroCopy from "./HeroCopy";
import {
  EXIT_DURATION_MS,
  getCopyFadeStartMs,
  getEnterRevealDelayMs,
} from "./constants";
import {
  markPreLandingEntered,
  resolvePreLandingVisibility,
} from "./session";

function useReducedMotion() {
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReducedMotion(media.matches);
    update();
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, []);

  return reducedMotion;
}

export default function PreLandingExperience() {
  const [ready, setReady] = useState(false);
  const [visible, setVisible] = useState(false);
  const [exiting, setExiting] = useState(false);
  const [copyVisible, setCopyVisible] = useState(true);
  const [enterVisible, setEnterVisible] = useState(false);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    setVisible(resolvePreLandingVisibility());
    setReady(true);
  }, []);

  useEffect(() => {
    if (!visible) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [visible]);

  useEffect(() => {
    if (!visible || exiting) return;

    const fadeCopyTimer = window.setTimeout(() => {
      setCopyVisible(false);
    }, getCopyFadeStartMs(reducedMotion));

    const revealEnterTimer = window.setTimeout(() => {
      setEnterVisible(true);
    }, getEnterRevealDelayMs(reducedMotion));

    return () => {
      window.clearTimeout(fadeCopyTimer);
      window.clearTimeout(revealEnterTimer);
    };
  }, [visible, exiting, reducedMotion]);

  const handleEnter = useCallback(() => {
    if (exiting) return;
    setExiting(true);
    markPreLandingEntered();
    window.setTimeout(() => setVisible(false), EXIT_DURATION_MS);
  }, [exiting]);

  useEffect(() => {
    if (!visible || exiting || !enterVisible) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        handleEnter();
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [visible, exiting, enterVisible, handleEnter]);

  if (!ready || !visible) return null;

  return (
    <motion.div
      role="dialog"
      aria-modal="true"
      aria-label={`Welcome to ${SITE_NAME}`}
      initial={{ opacity: 1 }}
      animate={{ opacity: exiting ? 0 : 1 }}
      transition={{
        duration: EXIT_DURATION_MS / 1000,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="fixed inset-0 z-[10000] overflow-hidden bg-[#0a0908]"
    >
      <KenBurnsBackground reducedMotion={reducedMotion} />

      <div
        className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/70 via-black/10 to-black/80"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/45"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute inset-0 shadow-[inset_0_0_120px_rgba(0,0,0,0.55)]"
        aria-hidden="true"
      />

      <DustParticles reducedMotion={reducedMotion} />
      <DoorGlow reducedMotion={reducedMotion} />

      <div className="relative z-10 flex h-full min-h-[100dvh] flex-col items-center justify-center px-6 pb-28 pt-16">
        <HeroCopy visible={copyVisible} />

        <div className="pointer-events-none absolute inset-x-0 bottom-10 flex justify-center md:bottom-14">
          <div className="pointer-events-auto">
            <EnterExperience
              onEnter={handleEnter}
              reducedMotion={reducedMotion}
              visible={enterVisible}
            />
          </div>
        </div>
      </div>
    </motion.div>
  );
}
