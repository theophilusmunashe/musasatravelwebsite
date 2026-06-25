"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import BookingTrustBadges from "../BookingTrustBadges";
import type { BookingExperienceProps } from "./booking-types";
import BookingProgress from "./BookingProgress";
import BookingStepField, { manualFieldTheme } from "./BookingStepField";
import { iconForStep } from "./booking-field-icons";
import { BOOKING_INTENTS, intentLabel } from "@/lib/booking-flow";

const STEP_MOTION = {
  initial: { opacity: 0, y: 8 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -6 },
  transition: { duration: 0.2, ease: [0.25, 0.1, 0.25, 1] as const },
};

function VisitSummary({
  summary,
  form,
  className,
}: {
  summary: string[];
  form: BookingExperienceProps["form"];
  className?: string;
}) {
  return (
    <aside className={cn("rounded-lg border border-estate-border bg-estate-warm/50 p-4 sm:p-5", className)}>
      <p className="text-sm font-medium text-estate-ink">Your visit</p>
      <ul className="mt-3 space-y-1.5 text-sm text-estate-muted">
        {summary.map((line) => (
          <li key={line} className="break-words">
            {line}
          </li>
        ))}
        {form.firstName && (
          <li className="break-words">
            {form.firstName} {form.lastName}
          </li>
        )}
      </ul>
      <p className="mt-4 text-xs leading-relaxed text-estate-muted">
        Enquiries are confirmed by our team — no payment taken online.
      </p>
    </aside>
  );
}

export default function ManualBookingView({
  intent,
  step,
  steps,
  form,
  submitting,
  summary,
  embedded,
  setField,
  switchIntent,
  goBack,
  goNext,
  submit,
}: BookingExperienceProps) {
  const reduceMotion = useReducedMotion();
  const stepMotion = reduceMotion
    ? { initial: { opacity: 1 }, animate: { opacity: 1 }, exit: { opacity: 1 }, transition: { duration: 0 } }
    : STEP_MOTION;

  const current = steps[step];
  const isLast = step === steps.length - 1;
  const canNext =
    current?.field === "message"
      ? true
      : current?.field
        ? Boolean(form[current.field]?.trim())
        : true;
  const theme = manualFieldTheme();

  const navButtons = (
    <>
      <button
        type="button"
        disabled={step === 0}
        onClick={goBack}
        className="inline-flex min-h-[44px] shrink-0 items-center gap-1 rounded-lg border border-estate-border px-4 text-sm font-medium text-estate-muted disabled:opacity-40 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-estate-terracotta sm:px-5"
      >
        <ChevronLeft className="h-4 w-4" aria-hidden />
        Back
      </button>
      {isLast ? (
        <button
          type="button"
          disabled={!canNext || submitting}
          onClick={submit}
          className="inline-flex min-h-[44px] flex-1 items-center justify-center rounded-lg bg-estate-terracotta px-4 text-sm font-medium text-white hover:bg-estate-terracotta/90 disabled:opacity-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-estate-terracotta sm:px-6"
        >
          {submitting ? "Sending…" : "Send enquiry"}
        </button>
      ) : (
        <button
          type="button"
          disabled={!canNext}
          onClick={goNext}
          className="inline-flex min-h-[44px] flex-1 items-center justify-center gap-1 rounded-lg bg-estate-terracotta px-4 text-sm font-medium text-white hover:bg-estate-terracotta/90 disabled:opacity-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-estate-terracotta sm:px-6"
        >
          Continue
          <ChevronRight className="h-4 w-4" aria-hidden />
        </button>
      )}
    </>
  );

  return (
    <div
      className={cn(
        "relative w-full max-w-xl md:max-w-none",
        embedded ? "pb-[max(5.5rem,calc(4.5rem+env(safe-area-inset-bottom)))] md:pb-2" : "pb-28 lg:pb-0"
      )}
    >
      <div
        className="mb-3 grid grid-cols-3 gap-0.5 rounded-lg border border-estate-border p-0.5 sm:mb-4 sm:gap-1 sm:p-1"
        role="tablist"
        aria-label="Visit type"
      >
        {BOOKING_INTENTS.map((tab) => {
          const selected = intent === tab.id;
          return (
            <button
              key={tab.id}
              type="button"
              role="tab"
              aria-selected={selected}
              onClick={() => switchIntent(tab.id)}
              className={cn(
                "min-h-[44px] rounded-md px-1 py-2 text-xs font-medium transition-colors sm:px-2 sm:text-sm",
                "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-estate-terracotta",
                selected
                  ? "bg-estate-terracotta text-white"
                  : "border border-transparent bg-transparent text-estate-muted hover:text-estate-ink"
              )}
            >
              {tab.short}
            </button>
          );
        })}
      </div>

      <BookingTrustBadges className="mb-4 gap-2 sm:mb-6 sm:gap-4" />

      <VisitSummary summary={summary} form={form} className="mb-4 lg:hidden" />

      <div className="grid gap-4 sm:gap-6 lg:grid-cols-[1fr_280px] lg:items-start lg:gap-8">
        <div className="rounded-lg border border-estate-border bg-white p-4 sm:p-6 md:p-8">
          <p className="text-[10px] font-medium uppercase tracking-[0.15em] text-estate-terracotta sm:text-xs">
            {intentLabel(intent)}
          </p>
          <div className="mt-3 sm:mt-4">
            <BookingProgress step={step} total={steps.length} lane="manual" />
          </div>

          <AnimatePresence mode="wait">
            <motion.div key={`${intent}-${step}`} {...stepMotion} className="mt-6 sm:mt-8">
              <label
                htmlFor={`manual-field-${current.field}`}
                className="block text-[15px] font-medium text-estate-ink sm:text-base"
              >
                {current.label}
              </label>
              <div className="mt-2 sm:mt-3">
                <BookingStepField
                  step={current}
                  form={form}
                  setField={setField}
                  theme={theme}
                  idPrefix="manual-field"
                  icon={iconForStep(current)}
                  hideLabel
                />
              </div>
            </motion.div>
          </AnimatePresence>

          <div className="mt-6 hidden gap-3 sm:mt-8 md:flex">{navButtons}</div>
        </div>

        <VisitSummary summary={summary} form={form} className="hidden lg:block" />
      </div>

      <div
        className={cn(
          "border-t border-estate-border bg-white/95 backdrop-blur-sm shadow-[0_-4px_16px_rgba(42,38,32,0.06)] md:hidden",
          embedded
            ? "sticky bottom-0 z-10 -mx-4 mt-4 px-4 py-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] sm:-mx-5 sm:px-5 md:mx-0"
            : "fixed inset-x-0 bottom-0 z-40 p-4 pb-[max(1rem,env(safe-area-inset-bottom))]"
        )}
      >
        <p className="mb-2 truncate text-xs text-estate-muted">
          {summary[summary.length - 1] || intentLabel(intent)}
        </p>
        <div className="flex gap-2">{navButtons}</div>
      </div>
    </div>
  );
}
