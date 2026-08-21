"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft,
  Calendar,
  Check,
  ChevronRight,
  Clock,
  Home,
  MapPin,
  MessageCircle,
  Search,
  Sparkles,
  Users,
} from "lucide-react";
import toast from "react-hot-toast";
import { useCartStore } from "@/lib/cartStore";
import { WA_NUMBER, buildWhatsAppMessage } from "./WhatsAppButton";
import type { EnquiryFormData } from "@/lib/enquiry-templates";
import type { BookingDestination } from "@/lib/booking-destinations";
import { guestTierTitleForDestination } from "@/lib/booking-destinations";
import {
  BOOKING_PRICING_NOTE,
  CUSTOM_ACCOMMODATION_ID,
  OPEN_STAY_ID,
  formatDualPrice,
  getActivityByIdIn,
  priceForTier,
  type ActivityCategory,
  type ActivityDef,
  type GuestTier,
} from "@/lib/bookings-data";

const GUIDE_OPTIONS = ["Yes — expert guide", "Yes — basic guide", "No — self-guided", "Not sure yet"] as const;
const TRANSFER_OPTIONS = ["Yes — round trip", "Yes — one way", "No — arranged separately", "Not sure yet"] as const;
const TRAVELLER_OPTIONS = ["1", "2", "3–4", "5–8", "9+"] as const;

function GuestTierPicker({
  tier,
  onPick,
  options,
}: {
  tier: GuestTier;
  onPick: (t: GuestTier) => void;
  options: ReadonlyArray<{ id: GuestTier; title: string; sub: string }>;
}) {
  return (
    <div role="radiogroup" aria-label="Your pricing tier" className="grid grid-cols-1 sm:grid-cols-3 gap-2">
      {options.map((opt) => {
        const on = tier === opt.id;
        return (
          <button
            key={opt.id}
            type="button"
            role="radio"
            aria-checked={on}
            onClick={() => onPick(opt.id)}
            className={[
              "rounded-2xl px-4 py-3 text-left transition-all duration-200 relative",
              on
                ? "bg-gradient-to-br from-amber-500/25 to-amber-600/5 ring-2 ring-amber-400/70 shadow-lg shadow-amber-900/20"
                : "bg-white/[0.04] ring-1 ring-white/10 hover:bg-white/[0.07]",
            ].join(" ")}
          >
            <span className="flex items-start justify-between gap-2">
              <span className="min-w-0">
                <span className="flex items-center gap-2">
                  <p className="text-sm font-bold text-white">{opt.title}</p>
                  {on && (
                    <span className="inline-flex items-center gap-0.5 rounded-full bg-amber-400/20 px-2 py-0.5 text-[9px] font-black uppercase tracking-wide text-amber-200 ring-1 ring-amber-400/40">
                      Selected
                    </span>
                  )}
                </span>
                <p className="text-[11px] text-white/40 mt-1">{opt.sub}</p>
              </span>
              {on && <Check className="w-5 h-5 shrink-0 text-amber-300" aria-hidden />}
            </span>
          </button>
        );
      })}
    </div>
  );
}

const CATEGORY_LABEL: Record<ActivityCategory | "all", string> = {
  all: "All",
  falls: "Falls",
  adventure: "Adventure",
  wildlife: "Wildlife",
  aerial: "Aerial",
  cruise: "Cruises",
  cultural: "Culture",
  daytrip: "Day trips",
  city: "City",
  beach: "Beach",
  wine: "Wine",
  safari: "Safari",
  desert: "Desert",
  island: "Island",
};

const CATEGORY_ORDER: (ActivityCategory | "all")[] = [
  "all",
  "safari",
  "wildlife",
  "falls",
  "adventure",
  "aerial",
  "cruise",
  "daytrip",
  "city",
  "beach",
  "wine",
  "desert",
  "island",
  "cultural",
];

type SectionIndex = 0 | 1 | 2 | 3;

function matchCartToActivityIds(cartNames: string[], activities: ActivityDef[]): string[] {
  const lower = cartNames.map((n) => n.toLowerCase().trim());
  const ids: string[] = [];
  for (const a of activities) {
    if (lower.some((n) => n.includes(a.name.toLowerCase().slice(0, 12)) || a.name.toLowerCase().includes(n.slice(0, 10)))) {
      ids.push(a.id);
    }
  }
  return [...new Set(ids)];
}

interface BookingFormProps {
  destination: BookingDestination;
  onDataChange?: (data: EnquiryFormData) => void;
  onSectionChange?: (section: number) => void;
}

export default function BookingForm({ destination, onDataChange, onSectionChange }: BookingFormProps) {
  const cartItems = useCartStore((s) => s.items);
  const clearCart = useCartStore((s) => s.clearCart);

  const cartActivityNames = useMemo(
    () => cartItems.filter((i) => i.category === "activity").map((i) => i.name),
    [cartItems]
  );
  const cartAccommodation = useMemo(() => cartItems.find((i) => i.category === "accommodation"), [cartItems]);
  const cartTransfer = useMemo(() => cartItems.find((i) => i.category === "transfer"), [cartItems]);
  const cartGuide = useMemo(() => cartItems.find((i) => i.category === "guide"), [cartItems]);

  const initialAccId = useMemo(() => {
    if (!cartAccommodation) return "";
    const n = cartAccommodation.name.toLowerCase();
    const hit = destination.accommodations.find(
      (h) => n.includes(h.name.toLowerCase().slice(0, 8)) || h.name.toLowerCase().includes(n.slice(0, 10))
    );
    return hit?.id ?? "";
  }, [cartAccommodation, destination.accommodations]);

  const [currentSection, setCurrentSection] = useState<SectionIndex>(0);
  const [showSuccess, setShowSuccess] = useState(false);
  const [successWaUrl, setSuccessWaUrl] = useState<string | null>(null);
  const [error, setError] = useState("");
  const [sending, setSending] = useState(false);
  const [activityFilter, setActivityFilter] = useState<ActivityCategory | "all">("all");
  const [activitySearch, setActivitySearch] = useState("");

  const [formData, setFormData] = useState<EnquiryFormData>({
    destinationId: destination.id,
    service: destination.serviceChips[0],
    guestTier: "international",
    activityIds: matchCartToActivityIds(cartActivityNames, destination.activities),
    accommodationId: initialAccId,
    accommodationBudget: "",
    stillExploring: false,
    tourGuide: cartGuide ? "Yes — expert guide" : "",
    transfers: cartTransfer ? "Yes — round trip" : "",
    startDate: "",
    endDate: "",
    travelers: "",
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    specialRequests: "",
  });

  const pushForm = useCallback(
    (patch: Partial<EnquiryFormData>) => {
      setFormData((prev) => {
        const next = { ...prev, ...patch };
        onDataChange?.(next);
        return next;
      });
    },
    [onDataChange]
  );

  useEffect(() => {
    onDataChange?.(formData);
  }, [formData, onDataChange]);

  useEffect(() => {
    onSectionChange?.(currentSection);
  }, [currentSection, onSectionChange]);

  const tier = (formData.guestTier ?? "international") as GuestTier;

  const activityCategorySet = useMemo(
    () => new Set(destination.activities.map((a) => a.category)),
    [destination.activities]
  );

  const categoryTabs = useMemo(
    () => CATEGORY_ORDER.filter((c) => c === "all" || activityCategorySet.has(c)),
    [activityCategorySet]
  );

  useEffect(() => {
    if (activityFilter !== "all" && !activityCategorySet.has(activityFilter)) {
      setActivityFilter("all");
    }
  }, [activityFilter, activityCategorySet]);

  const filteredActivities = useMemo(() => {
    const q = activitySearch.trim().toLowerCase();
    return destination.activities.filter((a) => {
      if (activityFilter !== "all" && a.category !== activityFilter) return false;
      if (!q) return true;
      return (
        a.name.toLowerCase().includes(q) ||
        a.short.toLowerCase().includes(q) ||
        formatDualPrice(a).toLowerCase().includes(q)
      );
    });
  }, [activityFilter, activitySearch, destination.activities]);

  const toggleActivity = (id: string) => {
    const cur = formData.activityIds ?? [];
    const next = cur.includes(id) ? cur.filter((x) => x !== id) : [...cur, id];
    pushForm({ activityIds: next, stillExploring: false });
  };

  const validateSection = (idx: number) => {
    const d = formData;
    const req = (v?: string) => !!(v && v.trim());

    if (idx === 0) {
      const hasActs = (d.activityIds?.length ?? 0) > 0;
      const acc = d.accommodationId?.trim() ?? "";
      const hasStay =
        !!acc &&
        (acc !== CUSTOM_ACCOMMODATION_ID || req(d.accommodationBudget));
      if (!hasActs && !hasStay && !d.stillExploring) {
        return "Choose experiences and/or a stay, or tap “Still deciding”.";
      }
      if (d.accommodationId === CUSTOM_ACCOMMODATION_ID && !req(d.accommodationBudget)) {
        return "Enter your nightly or total budget for custom accommodation.";
      }
      return "";
    }
    if (idx === 1) {
      if (!req(d.startDate)) return "Choose a start date.";
      if (!req(d.endDate)) return "Choose an end date.";
      if (!req(d.travelers)) return "How many travellers?";
      const s = new Date(d.startDate!);
      const e = new Date(d.endDate!);
      if (!Number.isNaN(s.getTime()) && !Number.isNaN(e.getTime()) && e < s) return "End date cannot be before start date.";
      return "";
    }
    if (idx === 2) {
      if (!req(d.firstName)) return "First name required.";
      if (!req(d.lastName)) return "Last name required.";
      if (!req(d.email)) return "Email required.";
      if (!req(d.phone)) return "Phone required.";
      return "";
    }
    return "";
  };

  const goNext = () => {
    const msg = validateSection(currentSection);
    setError(msg);
    if (msg) return;
    setCurrentSection((s) => (s < 3 ? ((s + 1) as SectionIndex) : s));
  };

  const goBack = () => {
    setError("");
    setCurrentSection((s) => (s > 0 ? ((s - 1) as SectionIndex) : s));
  };

  const handleSubmit = async () => {
    const gate = validateSection(0) || validateSection(1) || validateSection(2);
    if (gate) {
      setError(gate);
      toast.error(gate);
      return;
    }

    const msg = buildWhatsAppMessage(cartItems, formData);
    const waUrl = `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(msg)}`;

    // Open WhatsApp in the same user-gesture tick so pop-up blockers allow the tab.
    let waTab: Window | null = null;
    try {
      waTab = window.open(waUrl, "_blank", "noopener,noreferrer");
    } catch {
      waTab = null;
    }
    if (!waTab || waTab.closed) {
      toast.error("Allow pop-ups for this site to open WhatsApp automatically, or use the button on the confirmation screen.", {
        duration: 8000,
      });
    }

    setSending(true);
    try {
      const res = await fetch("/api/bookings/enquiry", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ cartItems, formData }),
      });
      let json: { ok?: boolean; error?: string; provider?: string } = {};
      try {
        json = await res.json();
      } catch {
        json = {};
      }
      if (!res.ok || !json.ok) {
        const detail = typeof json.error === "string" ? json.error : "Email could not be sent.";
        toast.error(detail, { duration: 7000 });
      } else {
        toast.success(`Enquiry emailed to bookings@musasatravel.com (${json.provider ?? "ok"})`);
      }
    } catch {
      toast.error("Network error while sending email. Your WhatsApp tab should still have the full enquiry.", { duration: 6000 });
    } finally {
      setSending(false);
    }

    setSuccessWaUrl(waUrl);
    clearCart();
    setShowSuccess(true);
  };

  const steps = ["Plan", "Trip", "You", "Send"] as const;

  if (showSuccess) {
    const openSavedWa = () => {
      if (successWaUrl) window.open(successWaUrl, "_blank", "noopener,noreferrer");
    };
    return (
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        className="rounded-[28px] bg-zinc-950/75 ring-1 ring-white/10 backdrop-blur-xl px-8 py-12 text-center"
      >
        <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-emerald-500/15 ring-1 ring-emerald-400/30">
          <Check className="h-8 w-8 text-emerald-400" />
        </div>
        <h3 className="text-2xl font-black text-white tracking-tight">You&apos;re all set</h3>
        <p className="mt-3 text-sm text-white/50 leading-relaxed max-w-md mx-auto">
          A new tab should have opened in WhatsApp with your full itinerary, cart line items, and contact details. When email is
          configured on the server, a copy is also sent to{" "}
          <span className="text-white/75 font-semibold">bookings@musasatravel.com</span>.
        </p>
        {successWaUrl && (
          <button
            type="button"
            onClick={openSavedWa}
            className="mt-6 w-full max-w-sm mx-auto flex items-center justify-center gap-2 rounded-2xl bg-white/[0.06] py-3 text-sm font-semibold text-white/80 ring-1 ring-white/15 hover:bg-white/[0.1] transition-colors"
          >
            <MessageCircle className="w-5 h-5 text-[#25D366]" />
            WhatsApp didn&apos;t open? Tap here
          </button>
        )}
        <button
          type="button"
          onClick={() => {
            setShowSuccess(false);
            setSuccessWaUrl(null);
            setCurrentSection(0);
          }}
          className="mt-4 w-full max-w-sm mx-auto block text-sm font-semibold text-amber-400/90 hover:text-amber-300 transition-colors"
        >
          Plan another trip
        </button>
      </motion.div>
    );
  }

  return (
    <div className="space-y-8">
      {cartItems.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-wrap items-center gap-2 text-xs text-amber-200/90"
        >
          <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-500/10 px-3 py-1 font-semibold ring-1 ring-amber-500/25">
            <Sparkles className="w-3.5 h-3.5" />
            {cartItems.length} item{cartItems.length !== 1 ? "s" : ""} from your trip cart pre-loaded
          </span>
        </motion.div>
      )}

      {/* Step rail — minimal, no heavy boxes */}
      <div className="flex items-center gap-1 overflow-x-auto pb-1">
        {steps.map((label, idx) => {
          const active = idx === currentSection;
          const done = idx < currentSection;
          return (
            <button
              key={label}
              type="button"
              disabled={idx > currentSection}
              onClick={() => {
                if (idx <= currentSection) {
                  setError("");
                  setCurrentSection(idx as SectionIndex);
                }
              }}
              className={[
                "group relative flex-1 min-w-[72px] px-3 py-2.5 text-center transition-colors rounded-xl",
                active ? "text-white" : done ? "text-white/55 hover:text-white/80" : "text-white/25 cursor-not-allowed",
              ].join(" ")}
            >
              <span className="text-[11px] font-bold uppercase tracking-widest">{label}</span>
              {active && (
                <motion.span
                  layoutId="stepline"
                  className="absolute bottom-0 left-3 right-3 h-0.5 rounded-full bg-gradient-to-r from-amber-400 to-amber-600"
                />
              )}
            </button>
          );
        })}
      </div>

      {error && (
        <div className="rounded-2xl bg-red-500/10 px-4 py-3 text-sm text-red-200 ring-1 ring-red-500/25">{error}</div>
      )}

      <AnimatePresence mode="wait">
        <motion.div
          key={currentSection}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.18 }}
          className="relative z-10 space-y-8"
        >
          {currentSection === 0 && (
            <>
              <header className="space-y-2">
                <h2 className="text-2xl md:text-3xl font-black text-white tracking-tight">{destination.plannerTitle}</h2>
                <p className="text-sm text-white/45 max-w-2xl leading-relaxed">
                  {destination.plannerSubtitle} {BOOKING_PRICING_NOTE}
                </p>
              </header>

              <div className="space-y-3">
                <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-white/35">Your pricing tier</p>
                <GuestTierPicker tier={tier} onPick={(t) => pushForm({ guestTier: t })} options={destination.guestTierOptions} />
              </div>

              <div className="space-y-3">
                <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-white/35">What are you planning?</p>
                <div className="flex flex-wrap gap-2">
                  {destination.serviceChips.map((s) => {
                    const on = formData.service === s;
                    return (
                      <button
                        key={s}
                        type="button"
                        onClick={() => pushForm({ service: s })}
                        className={[
                          "rounded-full px-4 py-2 text-xs font-semibold transition-all",
                          on ? "bg-white text-zinc-900" : "bg-white/5 text-white/60 hover:bg-white/10 ring-1 ring-white/10",
                        ].join(" ")}
                      >
                        {s}
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex items-end justify-between gap-4 flex-wrap">
                  <div>
                    <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-white/35">Where you&apos;ll rest</p>
                    <p className="text-sm text-white/45 mt-1">Real hotels & lodges — or set your own budget.</p>
                  </div>
                </div>
                <div className="flex gap-3 overflow-x-auto pb-2 snap-x snap-mandatory scrollbar-none [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
                  <button
                    type="button"
                    onClick={() => pushForm({ accommodationId: OPEN_STAY_ID, accommodationBudget: "", stillExploring: false })}
                    className={[
                      "snap-start shrink-0 w-[200px] rounded-2xl px-4 py-4 text-left transition-all",
                      formData.accommodationId === OPEN_STAY_ID
                        ? "bg-white text-zinc-900 ring-2 ring-amber-400"
                        : "bg-white/5 text-white/70 ring-1 ring-white/10 hover:bg-white/10",
                    ].join(" ")}
                  >
                    <p className="text-xs font-bold uppercase tracking-wider opacity-60">Flexible</p>
                    <p className="text-sm font-bold mt-2 leading-snug">Let Musasa suggest stays</p>
                  </button>
                  {destination.accommodations.map((h) => {
                    const on = formData.accommodationId === h.id;
                    return (
                      <button
                        key={h.id}
                        type="button"
                        onClick={() => pushForm({ accommodationId: h.id, accommodationBudget: "", stillExploring: false })}
                        className={[
                          "snap-start shrink-0 w-[220px] rounded-2xl px-4 py-4 text-left transition-all",
                          on
                            ? "bg-gradient-to-br from-amber-500/30 to-transparent ring-2 ring-amber-400/80"
                            : "bg-white/[0.04] ring-1 ring-white/10 hover:bg-white/[0.07]",
                        ].join(" ")}
                      >
                        <p className="text-[10px] font-bold uppercase tracking-widest text-amber-200/80">{h.tier}</p>
                        <p className="text-sm font-bold text-white mt-1.5 leading-snug line-clamp-2">{h.name}</p>
                        <p className="text-[11px] text-white/40 mt-2">from ~${h.fromUsd}/night</p>
                      </button>
                    );
                  })}
                  <button
                    type="button"
                    onClick={() => pushForm({ accommodationId: CUSTOM_ACCOMMODATION_ID, stillExploring: false })}
                    className={[
                      "snap-start shrink-0 w-[220px] rounded-2xl px-4 py-4 text-left transition-all",
                      formData.accommodationId === CUSTOM_ACCOMMODATION_ID
                        ? "bg-gradient-to-br from-violet-500/25 to-transparent ring-2 ring-violet-400/70"
                        : "bg-white/[0.04] ring-1 ring-white/10 hover:bg-white/[0.07]",
                    ].join(" ")}
                  >
                    <p className="text-[10px] font-bold uppercase tracking-widest text-violet-200/90">Custom</p>
                    <p className="text-sm font-bold text-white mt-1.5 leading-snug">I have a budget in mind</p>
                    <p className="text-[11px] text-white/40 mt-2">Nightly or total — you choose</p>
                  </button>
                </div>
                {formData.accommodationId === CUSTOM_ACCOMMODATION_ID && (
                  <motion.input
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    type="text"
                    placeholder="e.g. $120/night max or $800 total"
                    value={formData.accommodationBudget ?? ""}
                    onChange={(e) => pushForm({ accommodationBudget: e.target.value })}
                    className="w-full max-w-md rounded-2xl bg-white/5 px-4 py-3 text-sm text-white placeholder:text-white/25 ring-1 ring-white/10 focus:outline-none focus:ring-2 focus:ring-amber-500/60"
                  />
                )}
              </div>

              <div className="space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
                  <div>
                    <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-white/35">Experiences</p>
                    <p className="text-sm text-white/45 mt-1">Tap cards to add — your tier price highlights on the right.</p>
                  </div>
                  <div className="relative max-w-xs w-full">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/25" />
                    <input
                      value={activitySearch}
                      onChange={(e) => setActivitySearch(e.target.value)}
                      placeholder={destination.searchPlaceholder}
                      className="w-full rounded-2xl bg-white/5 pl-10 pr-4 py-2.5 text-sm text-white placeholder:text-white/25 ring-1 ring-white/10 focus:outline-none focus:ring-2 focus:ring-amber-500/50"
                    />
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => pushForm({ stillExploring: !formData.stillExploring })}
                  className={[
                    "mb-2 inline-flex rounded-full px-4 py-2 text-[11px] font-bold uppercase tracking-wider transition-all",
                    formData.stillExploring
                      ? "bg-violet-500 text-white ring-2 ring-violet-300/60"
                      : "bg-white/5 text-white/45 hover:bg-white/10 ring-1 ring-white/10",
                  ].join(" ")}
                >
                  Still deciding — contact me to plan
                </button>

                <div className="flex flex-wrap gap-2">
                  {categoryTabs.map((cat) => {
                    const on = activityFilter === cat;
                    return (
                      <button
                        key={cat}
                        type="button"
                        onClick={() => setActivityFilter(cat)}
                        className={[
                          "rounded-full px-3.5 py-1.5 text-[11px] font-bold uppercase tracking-wider transition-all",
                          on ? "bg-amber-500 text-black" : "bg-white/5 text-white/45 hover:bg-white/10 ring-1 ring-white/10",
                        ].join(" ")}
                      >
                        {CATEGORY_LABEL[cat]}
                      </button>
                    );
                  })}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {filteredActivities.map((a) => {
                    const selected = (formData.activityIds ?? []).includes(a.id);
                    const your = priceForTier(a, tier);
                    return (
                      <button
                        key={a.id}
                        type="button"
                        onClick={() => toggleActivity(a.id)}
                        className={[
                          "group relative rounded-2xl p-4 text-left transition-all duration-200",
                          selected
                            ? "bg-gradient-to-br from-amber-500/20 via-amber-500/5 to-transparent ring-2 ring-amber-400/80"
                            : "bg-white/[0.035] ring-1 ring-white/[0.08] hover:ring-amber-500/25 hover:bg-white/[0.06]",
                        ].join(" ")}
                      >
                        <div className="flex items-start justify-between gap-3">
                          <div className="min-w-0">
                            <p className="text-[10px] font-bold uppercase tracking-widest text-white/30">{a.category}</p>
                            <p className="text-sm font-bold text-white mt-1 leading-snug">{a.name}</p>
                            <p className="text-[11px] text-white/40 mt-1.5 line-clamp-2">{a.short}</p>
                            <p className="text-[10px] text-white/30 mt-2">{formatDualPrice(a)}</p>
                          </div>
                          <div className="shrink-0 text-right">
                            <p className="text-lg font-black text-amber-300 tabular-nums">${your}</p>
                            <p className="text-[9px] text-white/30 uppercase tracking-tighter mt-0.5">your tier</p>
                            <div
                              className={[
                                "mt-2 ml-auto flex h-7 w-7 items-center justify-center rounded-full text-xs font-black transition-all",
                                selected ? "bg-amber-400 text-black scale-110" : "bg-white/10 text-white/40 group-hover:bg-white/15",
                              ].join(" ")}
                            >
                              {selected ? <Check className="w-4 h-4" /> : "+"}
                            </div>
                          </div>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            </>
          )}

          {currentSection === 1 && (
            <>
              <header className="space-y-2">
                <h2 className="text-2xl md:text-3xl font-black text-white tracking-tight">Trip timing</h2>
                <p className="text-sm text-white/45">When you travel and how we move you.</p>
              </header>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <label className="space-y-2 block">
                  <span className="text-[11px] font-bold uppercase tracking-widest text-white/35 flex items-center gap-2">
                    <Calendar className="w-3.5 h-3.5" /> Start
                  </span>
                  <input
                    type="date"
                    value={formData.startDate ?? ""}
                    onChange={(e) => pushForm({ startDate: e.target.value })}
                    className="w-full rounded-2xl bg-white/5 px-4 py-3 text-sm text-white ring-1 ring-white/10 focus:outline-none focus:ring-2 focus:ring-amber-500/50 [color-scheme:dark]"
                  />
                </label>
                <label className="space-y-2 block">
                  <span className="text-[11px] font-bold uppercase tracking-widest text-white/35 flex items-center gap-2">
                    <Calendar className="w-3.5 h-3.5" /> End
                  </span>
                  <input
                    type="date"
                    value={formData.endDate ?? ""}
                    onChange={(e) => pushForm({ endDate: e.target.value })}
                    className="w-full rounded-2xl bg-white/5 px-4 py-3 text-sm text-white ring-1 ring-white/10 focus:outline-none focus:ring-2 focus:ring-amber-500/50 [color-scheme:dark]"
                  />
                </label>
              </div>
              <label className="space-y-2 block max-w-md">
                <span className="text-[11px] font-bold uppercase tracking-widest text-white/35 flex items-center gap-2">
                  <Users className="w-3.5 h-3.5" /> Travellers
                </span>
                <select
                  value={formData.travelers ?? ""}
                  onChange={(e) => pushForm({ travelers: e.target.value })}
                  className="w-full rounded-2xl bg-white/5 px-4 py-3 text-sm text-white ring-1 ring-white/10 focus:outline-none focus:ring-2 focus:ring-amber-500/50 [&>option]:bg-zinc-900"
                >
                  <option value="">Select</option>
                  {TRAVELLER_OPTIONS.map((o) => (
                    <option key={o} value={o}>
                      {o}
                    </option>
                  ))}
                </select>
              </label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <label className="space-y-2 block">
                  <span className="text-[11px] font-bold uppercase tracking-widest text-white/35 flex items-center gap-2">
                    <MapPin className="w-3.5 h-3.5" /> Guide
                  </span>
                  <select
                    value={formData.tourGuide ?? ""}
                    onChange={(e) => pushForm({ tourGuide: e.target.value })}
                    className="w-full rounded-2xl bg-white/5 px-4 py-3 text-sm text-white ring-1 ring-white/10 focus:outline-none focus:ring-2 focus:ring-amber-500/50 [&>option]:bg-zinc-900"
                  >
                    <option value="">Select</option>
                    {GUIDE_OPTIONS.map((o) => (
                      <option key={o} value={o}>
                        {o}
                      </option>
                    ))}
                  </select>
                </label>
                <label className="space-y-2 block">
                  <span className="text-[11px] font-bold uppercase tracking-widest text-white/35 flex items-center gap-2">
                    <Clock className="w-3.5 h-3.5" /> Transfers
                  </span>
                  <select
                    value={formData.transfers ?? ""}
                    onChange={(e) => pushForm({ transfers: e.target.value })}
                    className="w-full rounded-2xl bg-white/5 px-4 py-3 text-sm text-white ring-1 ring-white/10 focus:outline-none focus:ring-2 focus:ring-amber-500/50 [&>option]:bg-zinc-900"
                  >
                    <option value="">Select</option>
                    {TRANSFER_OPTIONS.map((o) => (
                      <option key={o} value={o}>
                        {o}
                      </option>
                    ))}
                  </select>
                </label>
              </div>
            </>
          )}

          {currentSection === 2 && (
            <>
              <header className="space-y-2">
                <h2 className="text-2xl md:text-3xl font-black text-white tracking-tight">Your contact</h2>
                <p className="text-sm text-white/45">{destination.contactResponseLine}</p>
              </header>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <input
                  placeholder="First name"
                  value={formData.firstName ?? ""}
                  onChange={(e) => pushForm({ firstName: e.target.value })}
                  className="rounded-2xl bg-transparent border-b border-white/15 px-1 py-3 text-sm text-white placeholder:text-white/25 focus:outline-none focus:border-amber-400/80"
                />
                <input
                  placeholder="Last name"
                  value={formData.lastName ?? ""}
                  onChange={(e) => pushForm({ lastName: e.target.value })}
                  className="rounded-2xl bg-transparent border-b border-white/15 px-1 py-3 text-sm text-white placeholder:text-white/25 focus:outline-none focus:border-amber-400/80"
                />
              </div>
              <input
                type="email"
                placeholder="Email"
                value={formData.email ?? ""}
                onChange={(e) => pushForm({ email: e.target.value })}
                className="w-full rounded-2xl bg-transparent border-b border-white/15 px-1 py-3 text-sm text-white placeholder:text-white/25 focus:outline-none focus:border-amber-400/80"
              />
              <input
                placeholder="Phone (WhatsApp preferred)"
                value={formData.phone ?? ""}
                onChange={(e) => pushForm({ phone: e.target.value })}
                className="w-full rounded-2xl bg-transparent border-b border-white/15 px-1 py-3 text-sm text-white placeholder:text-white/25 focus:outline-none focus:border-amber-400/80"
              />
              <textarea
                placeholder="Anything else? Dietary, mobility, surprise for someone…"
                rows={3}
                value={formData.specialRequests ?? ""}
                onChange={(e) => pushForm({ specialRequests: e.target.value })}
                className="w-full rounded-2xl bg-white/[0.03] px-4 py-3 text-sm text-white placeholder:text-white/25 ring-1 ring-white/10 focus:outline-none focus:ring-2 focus:ring-amber-500/40 resize-none"
              />
            </>
          )}

          {currentSection === 3 && (
            <>
              <header className="space-y-2">
                <h2 className="text-2xl md:text-3xl font-black text-white tracking-tight">Review & send</h2>
                <p className="text-sm text-white/45">
                  We email <span className="text-white/70 font-semibold">bookings@musasatravel.com</span> and open WhatsApp in the same step with identical details (including your cart).
                </p>
              </header>
              <div className="space-y-3">
                <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-white/35">Pricing tier — tap to change</p>
                <GuestTierPicker tier={tier} onPick={(t) => pushForm({ guestTier: t })} options={destination.guestTierOptions} />
              </div>
              <div className="space-y-4 text-sm text-white/70">
                <p>
                  <span className="text-white/40">Selected tier:</span>{" "}
                  <span className="text-white font-semibold">{guestTierTitleForDestination(destination, tier)}</span>
                </p>
                <p>
                  <span className="text-white/40">Plan:</span> {formData.service}
                </p>
                {formData.stillExploring && (
                  <p>
                    <span className="text-white/40">Planning:</span> Still exploring — please advise
                  </p>
                )}
                <div>
                  <span className="text-white/40">Stay:</span>{" "}
                  {formData.accommodationId === CUSTOM_ACCOMMODATION_ID
                    ? `Custom budget — ${formData.accommodationBudget || "…"}`
                    : formData.accommodationId === OPEN_STAY_ID
                      ? "Open — Musasa to propose stays"
                      : formData.accommodationId
                        ? destination.accommodations.find((x) => x.id === formData.accommodationId)?.name ?? formData.accommodationId
                        : "—"}
                </div>
                <div>
                  <span className="text-white/40">Experiences:</span>
                  <ul className="mt-2 space-y-1.5">
                    {(formData.activityIds ?? []).map((id) => {
                      const a = getActivityByIdIn(destination.activities, id);
                      if (!a) return null;
                      return (
                        <li key={id} className="flex justify-between gap-3 text-white/80">
                          <span className="min-w-0">{a.name}</span>
                          <span className="shrink-0 text-amber-300 font-bold tabular-nums">${priceForTier(a, tier)}</span>
                        </li>
                      );
                    })}
                    {(formData.activityIds ?? []).length === 0 && <li className="text-white/35">None selected</li>}
                  </ul>
                </div>
                <p>
                  <span className="text-white/40">Dates:</span> {formData.startDate} → {formData.endDate} ·{" "}
                  <span className="text-white/40">Group:</span> {formData.travelers}
                </p>
                <p>
                  <span className="text-white/40">Contact:</span> {formData.firstName} {formData.lastName} · {formData.email} ·{" "}
                  {formData.phone}
                </p>
              </div>
              <p className="text-[11px] text-white/30 leading-relaxed">{BOOKING_PRICING_NOTE}</p>
            </>
          )}
        </motion.div>
      </AnimatePresence>

      <div className="flex items-center justify-between gap-4 pt-4">
        <button
          type="button"
          onClick={goBack}
          disabled={currentSection === 0}
          className="inline-flex items-center gap-2 rounded-2xl px-5 py-3 text-sm font-semibold text-white/50 hover:text-white disabled:opacity-25 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back
        </button>
        {currentSection < 3 ? (
          <button
            type="button"
            onClick={goNext}
            className="inline-flex items-center gap-2 rounded-2xl bg-gradient-to-r from-amber-500 to-amber-400 px-7 py-3 text-sm font-black text-zinc-900 shadow-lg shadow-amber-900/30 hover:brightness-105 transition-all"
          >
            Next
            <ChevronRight className="w-4 h-4" />
          </button>
        ) : (
          <button
            type="button"
            disabled={sending}
            onClick={handleSubmit}
            className="inline-flex items-center gap-2 rounded-2xl bg-gradient-to-r from-emerald-500 to-[#25D366] px-7 py-3 text-sm font-black text-white shadow-lg shadow-emerald-900/30 disabled:opacity-60 transition-all"
          >
            {sending ? "Sending…" : "Send enquiry"}
            <MessageCircle className="w-4 h-4" />
          </button>
        )}
      </div>
    </div>
  );
}
