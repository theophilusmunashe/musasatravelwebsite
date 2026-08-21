"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Calendar, Sparkles, MapPin, Home, ChevronRight, Mail } from "lucide-react";
import type { EnquiryFormData } from "@/lib/enquiry-templates";
import type { BookingDestination } from "@/lib/booking-destinations";
import { guestTierTitleForDestination } from "@/lib/booking-destinations";
import {
  CUSTOM_ACCOMMODATION_ID,
  OPEN_STAY_ID,
  getAccommodationByIdIn,
  getActivityByIdIn,
  priceForTier,
  type GuestTier,
} from "@/lib/bookings-data";

interface BookingCartProps {
  destination: BookingDestination;
  formData?: EnquiryFormData;
  currentStep?: number;
}

export default function BookingCart({ destination, formData, currentStep = 0 }: BookingCartProps) {
  const tier = (formData?.guestTier ?? "international") as GuestTier;
  const ids = formData?.activityIds ?? [];
  const activities = ids.map((id) => getActivityByIdIn(destination.activities, id)).filter(Boolean);
  const accId = formData?.accommodationId?.trim() ?? "";
  const acc =
    accId === CUSTOM_ACCOMMODATION_ID
      ? formData?.accommodationBudget?.trim()
        ? `Custom budget · ${formData.accommodationBudget}`
        : "Custom budget (set amount)"
      : accId === OPEN_STAY_ID
        ? "Open stay — Musasa proposes"
        : accId
          ? getAccommodationByIdIn(destination.accommodations, accId)
          : null;

  const hasPlan =
    activities.length > 0 ||
    !!accId ||
    !!formData?.stillExploring ||
    !!(formData?.service && formData.service.trim());

  const tierTitle = guestTierTitleForDestination(destination, tier);

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      className="relative lg:sticky lg:top-28"
    >
      <div className="pointer-events-none absolute -inset-px rounded-[28px] bg-gradient-to-b from-amber-500/35 via-white/10 to-transparent opacity-80" />
      <div className="relative rounded-[28px] bg-zinc-950/80 backdrop-blur-2xl ring-1 ring-white/10 shadow-[0_24px_80px_rgba(0,0,0,0.55)] overflow-hidden">
        <div className="px-6 pt-6 pb-2 flex items-start justify-between gap-3">
          <div>
            <div className="flex items-center gap-2 text-amber-300/90">
              <Sparkles className="w-4 h-4" />
              <span className="text-[11px] font-bold uppercase tracking-[0.2em]">Live trip build</span>
            </div>
            <h3 className="text-lg font-black text-white mt-1 tracking-tight">{destination.cartPlanTitle}</h3>
            <p className="text-xs text-white/45 mt-1 leading-relaxed">
              Updates as you tap experiences — no clutter, just what matters.
            </p>
          </div>
          <div className="shrink-0 text-right">
            <div className="text-[10px] uppercase tracking-widest text-white/35">Step</div>
            <div className="text-2xl font-black text-white tabular-nums">{currentStep + 1}<span className="text-white/25 text-base font-semibold">/4</span></div>
          </div>
        </div>

        <div className="px-6 pb-6 space-y-5">
          <div className="flex flex-wrap gap-2">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-white/5 px-3 py-1 text-[11px] font-semibold text-white/70 ring-1 ring-white/10 max-w-full">
              <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-emerald-400 animate-pulse" />
              <span className="min-w-0">
                Pricing tier: <span className="text-amber-200/95 font-bold">{tierTitle}</span>
              </span>
            </span>
            {activities.length > 0 && (
              <span className="inline-flex rounded-full bg-amber-500/15 px-3 py-1 text-[11px] font-bold text-amber-200 ring-1 ring-amber-500/25">
                {activities.length} experience{activities.length !== 1 ? "s" : ""}
              </span>
            )}
          </div>

          {!hasPlan ? (
            <div className="rounded-2xl bg-white/[0.03] py-10 px-4 text-center">
              <MapPin className="w-8 h-8 text-white/15 mx-auto mb-3" />
              <p className="text-sm text-white/45">Pick a few must-do experiences or a stay to see your plan build here.</p>
            </div>
          ) : (
            <div className="space-y-4">
              <AnimatePresence initial={false}>
                {accId && (
                  <motion.div
                    key="stay"
                    initial={{ opacity: 0, x: 8 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -8 }}
                    className="group"
                  >
                    <div className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-widest text-white/35 mb-2">
                      <Home className="w-3.5 h-3.5 text-amber-400/80" />
                      Stay
                    </div>
                    <div className="rounded-2xl bg-gradient-to-br from-white/[0.07] to-transparent px-4 py-3 ring-1 ring-white/10">
                      <p className="text-sm font-semibold text-white leading-snug">
                        {acc && typeof acc === "object" ? acc.name : acc}
                      </p>
                      {acc && typeof acc === "object" && (
                        <p className="text-xs text-white/45 mt-1">
                          From ~${acc.fromUsd}/night · {acc.area}
                        </p>
                      )}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {activities.length > 0 && (
                <div>
                  <div className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-widest text-white/35 mb-2">
                    <Sparkles className="w-3.5 h-3.5 text-amber-400/80" />
                    Experiences
                  </div>
                  <ul className="space-y-2 max-h-[280px] overflow-y-auto pr-1">
                    {activities.map((a) => (
                      <motion.li
                        layout
                        key={a!.id}
                        className="flex items-start justify-between gap-3 rounded-2xl bg-white/[0.04] px-3.5 py-2.5 ring-1 ring-white/[0.06] hover:ring-amber-500/20 transition-[box-shadow,transform] hover:-translate-y-0.5"
                      >
                        <div className="min-w-0">
                          <p className="text-[13px] font-medium text-white/90 leading-snug line-clamp-2">{a!.name}</p>
                          <p className="text-[11px] text-white/40 mt-0.5 line-clamp-1">{a!.short}</p>
                        </div>
                        <div className="shrink-0 text-right">
                          <p className="text-sm font-black text-amber-300 tabular-nums">${priceForTier(a!, tier)}</p>
                          <p className="text-[9px] text-white/30 uppercase tracking-tighter">your tier</p>
                        </div>
                      </motion.li>
                    ))}
                  </ul>
                </div>
              )}

              {(formData?.startDate || formData?.endDate) && (
                <div className="flex items-center gap-3 rounded-2xl bg-white/[0.03] px-4 py-3 ring-1 ring-white/[0.06]">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-500/15 text-amber-300">
                    <Calendar className="w-5 h-5" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-[11px] font-bold uppercase tracking-widest text-white/35">Dates</p>
                    <p className="text-sm font-semibold text-white/85 truncate">
                      {formData?.startDate || "—"} → {formData?.endDate || "—"}
                    </p>
                    {formData?.travelers && (
                      <p className="text-xs text-white/40 mt-0.5">{formData.travelers} travellers</p>
                    )}
                  </div>
                </div>
              )}

              {(formData?.firstName || formData?.email) && (
                <div className="rounded-2xl bg-white/[0.03] px-4 py-3 ring-1 ring-white/[0.06] flex items-start gap-3">
                  <Mail className="w-4 h-4 text-white/30 mt-0.5" />
                  <div className="text-xs text-white/50 leading-relaxed min-w-0">
                    <span className="text-white/70 font-semibold">Contact</span>
                    <br />
                    {[formData?.firstName, formData?.lastName].filter(Boolean).join(" ")}
                    {formData?.email && (
                      <>
                        <br />
                        {formData.email}
                      </>
                    )}
                  </div>
                </div>
              )}
            </div>
          )}

          <div className="rounded-2xl bg-gradient-to-r from-amber-500/10 via-amber-500/5 to-transparent px-4 py-3 ring-1 ring-amber-500/20">
            <div className="flex items-center justify-between gap-2">
              <p className="text-[11px] text-amber-100/80 leading-relaxed flex-1">
                Final quotes combine availability, seasonality & official park fees — Musasa confirms everything.
              </p>
              <ChevronRight className="w-4 h-4 text-amber-300/60 shrink-0" />
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
