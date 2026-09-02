"use client";

import { useEffect, useState } from "react";
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

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    if (open) setIndex(Math.min(Math.max(startIndex, 0), Math.max(images.length - 1, 0)));
  }, [open, startIndex, images.length]);

  useEffect(() => {
    if (!open) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
      if (event.key === "ArrowRight") setIndex((i) => (i + 1) % images.length);
      if (event.key === "ArrowLeft") setIndex((i) => (i - 1 + images.length) % images.length);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = previous;
      window.removeEventListener("keydown", onKey);
    };
  }, [open, onClose, images.length]);

  if (!mounted || !images.length) return null;

  const current = images[index] || images[0];
  const hasMany = images.length > 1;

  return createPortal(
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[80] flex items-center justify-center p-4 md:p-8"
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
              className="object-cover scale-110 blur-2xl brightness-[0.35]"
              sizes="100vw"
              unoptimized
            />
            <span className="absolute inset-0 bg-black/55" />
          </button>

          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.98 }}
            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
            className="relative z-10 w-full max-w-4xl overflow-hidden rounded-3xl border border-white/10 bg-[#111] shadow-2xl"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="relative aspect-[16/10] bg-black">
              <AnimatePresence mode="wait">
                <motion.div
                  key={current}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="absolute inset-0"
                >
                  <Image
                    src={current}
                    alt={`${title} photo ${index + 1}`}
                    fill
                    className="object-contain"
                    sizes="(max-width: 768px) 100vw, 896px"
                    unoptimized
                    priority
                  />
                </motion.div>
              </AnimatePresence>

              <button
                type="button"
                onClick={onClose}
                className="absolute top-3 right-3 z-10 rounded-full bg-black/60 p-2 text-white hover:bg-black/80"
                aria-label="Close"
              >
                <X className="h-5 w-5" />
              </button>

              {hasMany && (
                <>
                  <button
                    type="button"
                    onClick={() => setIndex((i) => (i - 1 + images.length) % images.length)}
                    className="absolute left-3 top-1/2 z-10 -translate-y-1/2 rounded-full bg-black/60 p-2 text-white hover:bg-black/80"
                    aria-label="Previous photo"
                  >
                    <ChevronLeft className="h-6 w-6" />
                  </button>
                  <button
                    type="button"
                    onClick={() => setIndex((i) => (i + 1) % images.length)}
                    className="absolute right-3 top-1/2 z-10 -translate-y-1/2 rounded-full bg-black/60 p-2 text-white hover:bg-black/80"
                    aria-label="Next photo"
                  >
                    <ChevronRight className="h-6 w-6" />
                  </button>
                  <div className="absolute top-3 left-3 rounded-full bg-black/60 px-3 py-1 text-xs font-semibold text-white">
                    {index + 1} / {images.length}
                  </div>
                </>
              )}
            </div>

            <div className="px-5 py-4 md:px-6">
              <p className="text-lg font-bold text-white">{title}</p>
              {subtitle && <p className="mt-1 text-sm text-white/55">{subtitle}</p>}
              {hasMany && (
                <div className="mt-4 flex gap-2 overflow-x-auto pb-1">
                  {images.map((image, i) => (
                    <button
                      key={image}
                      type="button"
                      onClick={() => setIndex(i)}
                      className={`relative h-14 w-20 flex-shrink-0 overflow-hidden rounded-lg border-2 ${
                        i === index ? "border-amber-400" : "border-transparent opacity-70 hover:opacity-100"
                      }`}
                      aria-label={`Show photo ${i + 1}`}
                    >
                      <Image src={image} alt="" fill className="object-cover" sizes="80px" unoptimized />
                    </button>
                  ))}
                </div>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  );
}
