"use client";
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import logoImg from "@/assets/whitelogo.png";

const DESTINATIONS = [
  "Victoria Falls",
  "Hwange National Park",
  "Matetsi Private Reserve",
  "Zambezi River",
  "Chobe, Botswana",
  "Livingstone, Zambia",
];

const DURATION_MS = 6000;

export default function Preloader() {
  // Start as TRUE so the preloader covers the page immediately on first paint
  const [visible, setVisible] = useState(true);
  const [destIndex, setDestIndex] = useState(0);
  const [ready, setReady] = useState(false); // becomes true once we know session state
  const ranRef = useRef(false);

  useEffect(() => {
    // Guard against double-fire in dev strict mode
    if (ranRef.current) return;
    ranRef.current = true;

    const seen = sessionStorage.getItem("musasa_intro_seen");

    if (seen) {
      // Already shown this session — hide instantly, no flash
      setVisible(false);
      setReady(true);
      return;
    }

    // First visit — mark seen and show full intro
    sessionStorage.setItem("musasa_intro_seen", "1");
    setReady(true);

    // Cycle destinations
    const destTimer = setInterval(() => {
      setDestIndex((i) => (i + 1) % DESTINATIONS.length);
    }, 1000);

    // Hide after DURATION_MS
    const hideTimer = setTimeout(() => {
      setVisible(false);
      clearInterval(destTimer);
    }, DURATION_MS);

    // No cleanup that could accidentally cancel the timers on re-render
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <AnimatePresence>
      {visible && ready && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center overflow-hidden bg-[#080808]"
        >
          {/* Background image */}
          <motion.div
            initial={{ opacity: 0, scale: 1.08 }}
            animate={{ opacity: 0.35, scale: 1 }}
            transition={{ delay: 0.5, duration: 3.5, ease: "easeOut" }}
            className="absolute inset-0"
          >
            <Image
              src="https://images.unsplash.com/photo-1504432842672-1a79f78e4084?w=1800&q=70"
              alt=""
              fill
              priority
              className="object-cover"
              unoptimized
            />
          </motion.div>

          {/* Overlays */}
          <div className="absolute inset-0 bg-gradient-to-b from-[#080808]/80 via-[#080808]/50 to-[#080808]/90 pointer-events-none" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#080808]/60 via-transparent to-[#080808]/60 pointer-events-none" />

          {/* Corner brackets */}
          {["top-8 left-8 border-t border-l", "top-8 right-8 border-t border-r",
            "bottom-12 left-8 border-b border-l", "bottom-12 right-8 border-b border-r",
          ].map((pos, i) => (
            <motion.div key={i}
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.6 + i * 0.07, duration: 0.5 }}
              className={`absolute w-10 h-10 border-amber-500/30 ${pos}`}
            />
          ))}

          {/* Content */}
          <div className="relative z-10 flex flex-col items-center text-center px-8">
            <motion.p
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="text-amber-400/80 text-[10px] font-semibold uppercase tracking-[0.5em] mb-6 select-none"
            >
              Welcome to
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 24, scale: 0.88 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ delay: 0.4, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
              className="drop-shadow-[0_4px_32px_rgba(245,158,11,0.22)]"
            >
              <Image src={logoImg} alt="Musasa Travel" width={280} height={100} priority className="object-contain" />
            </motion.div>

            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ delay: 0.9, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="mt-7 h-px w-64 origin-left bg-gradient-to-r from-transparent via-amber-400/60 to-transparent"
            />

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.2, duration: 0.7 }}
              className="mt-4 text-white/40 text-xs uppercase tracking-[0.4em] select-none"
            >
              Rooted in Africa &nbsp;·&nbsp; Reaching the World
            </motion.p>

            {/* Cycling destinations */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.8, duration: 0.6 }}
              className="mt-10 h-7 flex items-center justify-center overflow-hidden"
            >
              <AnimatePresence mode="wait">
                <motion.p
                  key={destIndex}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                  className="text-white/55 text-sm tracking-widest uppercase select-none"
                >
                  {DESTINATIONS[destIndex]}
                </motion.p>
              </AnimatePresence>
            </motion.div>

            {/* Pulsing dots */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 2 }}
              className="mt-6 flex items-center gap-2"
            >
              {[0, 0.2, 0.4].map((delay, i) => (
                <motion.span key={i}
                  animate={{ opacity: [0.2, 1, 0.2] }}
                  transition={{ repeat: Infinity, duration: 1.4, delay, ease: "easeInOut" }}
                  className="w-1.5 h-1.5 rounded-full bg-amber-400/50"
                />
              ))}
            </motion.div>
          </div>

          {/* Progress bar — pure CSS animation, never gets stuck */}
          <div className="absolute bottom-0 left-0 right-0 h-[3px] bg-white/5">
            <motion.div
              className="h-full bg-gradient-to-r from-amber-600 via-amber-400 to-amber-500"
              initial={{ width: "0%" }}
              animate={{ width: "100%" }}
              transition={{ duration: DURATION_MS / 1000, ease: "linear" }}
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
