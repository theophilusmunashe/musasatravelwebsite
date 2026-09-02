"use client";

import { useCallback, useEffect, useState } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight, X } from "lucide-react";

type ImageLightboxProps = {
  open: boolean;
  onClose: () => void;
  images: string[];
  title: string;
  subtitle?: string;
  startIndex?: number;
};

export default function ImageLightbox({
  open,
  onClose,
  images,
  title,
  subtitle,
  startIndex = 0,
}: ImageLightboxProps) {
  const [index, setIndex] = useState(startIndex);
  const [mounted, setMounted] = useState(false);

  const count = images.length;
  const current = images[index] || images[0];
  const hasMany = count > 1;

  const go = useCallback(
    (direction: -1 | 1) => {
      if (count < 2) return;
      setIndex((i) => (i + direction + count) % count);
    },
    [count]
  );

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    if (open) setIndex(Math.min(Math.max(startIndex, 0), Math.max(count - 1, 0)));
  }, [open, startIndex, count]);

  useEffect(() => {
    if (!open) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
      if (event.key === "ArrowRight") go(1);
      if (event.key === "ArrowLeft") go(-1);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = previous;
      window.removeEventListener("keydown", onKey);
    };
  }, [open, onClose, go]);

  if (!mounted || !images.length) return null;

  return createPortal(
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[80] flex items-center justify-center p-3 sm:p-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          role="dialog"
          aria-modal="true"
          aria-label={`${title} photos`}
        >
          <button
            type="button"
            className="absolute inset-0 overflow-hidden"
            onClick={onClose}
            aria-label="Close photo viewer"
          >
            <Image
              src={current}
              alt=""
              fill
              className="object-cover scale-110 blur-2xl brightness-[0.28]"
              sizes="100vw"
              unoptimized
            />
            <span className="absolute inset-0 bg-black/60" />
          </button>

          <button
            type="button"
            onClick={onClose}
            className="absolute top-4 right-4 z-20 rounded-full bg-black/70 p-2.5 text-white hover:bg-amber-500 hover:text-black"
            aria-label="Close"
          >
            <X className="h-5 w-5" />
          </button>

          <div
            className="relative z-10 flex w-full max-w-6xl items-center gap-2 sm:gap-4"
            onClick={(event) => event.stopPropagation()}
          >
            {hasMany && (
              <button
                type="button"
                onClick={() => go(-1)}
                className="hidden sm:flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-full border border-white/15 bg-black/70 text-white shadow-xl hover:border-amber-400 hover:bg-amber-500 hover:text-black"
                aria-label="Previous photo"
              >
                <ChevronLeft className="h-8 w-8" />
              </button>
            )}

            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 12, scale: 0.98 }}
              transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
              className="min-w-0 flex-1 overflow-hidden rounded-3xl border border-white/10 bg-[#111] shadow-2xl"
            >
              <div className="relative aspect-[16/10] bg-black">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={current}
                    initial={{ opacity: 0, x: 24 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -24 }}
                    transition={{ duration: 0.22 }}
                    drag={hasMany ? "x" : false}
                    dragConstraints={{ left: 0, right: 0 }}
                    dragElastic={0.18}
                    onDragEnd={(_, info) => {
                      if (info.offset.x < -70) go(1);
                      if (info.offset.x > 70) go(-1);
                    }}
                    className="absolute inset-0 cursor-grab active:cursor-grabbing"
                  >
                    <Image
                      src={current}
                      alt={`${title} photo ${index + 1}`}
                      fill
                      className="object-contain pointer-events-none"
                      sizes="(max-width: 768px) 100vw, 1024px"
                      unoptimized
                      priority
                    />
                  </motion.div>
                </AnimatePresence>

                {hasMany && (
                  <>
                    <button
                      type="button"
                      onClick={() => go(-1)}
                      className="absolute left-2 top-1/2 z-10 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-black/70 text-white sm:hidden"
                      aria-label="Previous photo"
                    >
                      <ChevronLeft className="h-7 w-7" />
                    </button>
                    <button
                      type="button"
                      onClick={() => go(1)}
                      className="absolute right-2 top-1/2 z-10 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-black/70 text-white sm:hidden"
                      aria-label="Next photo"
                    >
                      <ChevronRight className="h-7 w-7" />
                    </button>
                    <div className="pointer-events-none absolute top-3 left-3 rounded-full bg-black/65 px-3 py-1 text-xs font-semibold text-white">
                      {index + 1} / {count}
                    </div>
                  </>
                )}
              </div>

              <div className="px-4 py-4 sm:px-6">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-lg font-bold text-white">{title}</p>
                    {subtitle && <p className="mt-1 text-sm text-white/55">{subtitle}</p>}
                  </div>
                  {hasMany && (
                    <p className="hidden sm:block text-sm text-white/40 pt-1">Swipe or use the side arrows</p>
                  )}
                </div>

                <div className="mt-4 flex gap-2 overflow-x-auto pb-1">
                  {images.map((image, i) => (
                    <button
                      key={`${image}-${i}`}
                      type="button"
                      onClick={() => setIndex(i)}
                      className={`relative h-16 w-24 flex-shrink-0 overflow-hidden rounded-xl border-2 ${
                        i === index
                          ? "border-amber-400 ring-2 ring-amber-400/40"
                          : "border-white/10 opacity-70 hover:opacity-100"
                      }`}
                      aria-label={`Show photo ${i + 1}`}
                    >
                      <Image src={image} alt="" fill className="object-cover" sizes="96px" unoptimized />
                    </button>
                  ))}
                </div>
              </div>
            </motion.div>

            {hasMany && (
              <button
                type="button"
                onClick={() => go(1)}
                className="hidden sm:flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-full border border-white/15 bg-black/70 text-white shadow-xl hover:border-amber-400 hover:bg-amber-500 hover:text-black"
                aria-label="Next photo"
              >
                <ChevronRight className="h-8 w-8" />
              </button>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  );
}
