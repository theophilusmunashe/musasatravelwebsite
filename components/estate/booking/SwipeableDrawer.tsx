"use client";

import { useEffect } from "react";
import { AnimatePresence, motion, useDragControls } from "framer-motion";
import { X } from "lucide-react";
import { chat } from "@/lib/sahwira-chat-theme";

type SwipeableDrawerProps = {
  open: boolean;
  onClose: () => void;
  title?: string;
  subtitle?: string;
  children: React.ReactNode;
  /** Optional node rendered in the header between the title and the close button (e.g. a lane switch). */
  headerExtra?: React.ReactNode;
};

export default function SwipeableDrawer({
  open,
  onClose,
  title,
  subtitle,
  children,
  headerExtra,
}: SwipeableDrawerProps) {
  const dragControls = useDragControls();

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-[60] md:hidden" role="dialog" aria-modal="true" aria-label={title}>
          <motion.button
            type="button"
            aria-label="Close"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/45 backdrop-blur-[2px]"
          />

          <motion.div
            drag="y"
            dragControls={dragControls}
            dragListener={false}
            dragConstraints={{ top: 0, bottom: 0 }}
            dragElastic={{ top: 0, bottom: 0.45 }}
            onDragEnd={(_, info) => {
              if (info.offset.y > 130 || info.velocity.y > 650) onClose();
            }}
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ type: "spring", damping: 34, stiffness: 340 }}
            className="absolute inset-x-0 bottom-0 flex max-h-[93dvh] flex-col overflow-hidden rounded-t-[22px] border-t shadow-[0_-12px_40px_rgba(26,25,23,0.22)]"
            style={{ backgroundColor: chat.bg, borderColor: chat.border }}
          >
            <div
              onPointerDown={(e) => dragControls.start(e)}
              className="shrink-0 cursor-grab touch-none select-none border-b px-4 pb-3 pt-2.5 active:cursor-grabbing"
              style={{ borderColor: chat.border, backgroundColor: chat.surface }}
            >
              <div className="mx-auto mb-2.5 h-1.5 w-11 rounded-full" style={{ backgroundColor: chat.border }} />
              <div className="flex items-start gap-3">
                <div className="min-w-0 flex-1">
                  {title && (
                    <p className="truncate text-[15px] font-semibold leading-tight" style={{ color: chat.text }}>
                      {title}
                    </p>
                  )}
                  {subtitle && (
                    <p className="mt-0.5 truncate text-[12px]" style={{ color: chat.textMuted }}>
                      {subtitle}
                    </p>
                  )}
                </div>
                <button
                  type="button"
                  onClick={onClose}
                  aria-label="Close"
                  className="-mr-1.5 -mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-full transition-colors hover:bg-black/5"
                  style={{ color: chat.textSecondary }}
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
              {headerExtra && <div className="mt-3">{headerExtra}</div>}
            </div>

            <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain" style={{ WebkitOverflowScrolling: "touch" }}>
              {children}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
