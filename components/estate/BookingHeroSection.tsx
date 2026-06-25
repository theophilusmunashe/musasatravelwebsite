"use client";

import { Suspense } from "react";
import { SITE_NAME } from "@/lib/site";
import { chat } from "@/lib/sahwira-chat-theme";
import EstateHeroVideo from "./EstateHeroVideo";
import BookingExperience from "./booking/BookingExperience";

function PanelFallback() {
  return (
    <p className="p-6 text-[15px]" style={{ color: chat.textMuted }}>
      Loading booking…
    </p>
  );
}

function BookingPanelGate() {
  return (
    <Suspense fallback={<PanelFallback />}>
      <BookingExperience />
    </Suspense>
  );
}

function VideoFrame({ compact = false }: { compact?: boolean }) {
  return (
    <div
      className={
        compact
          ? "relative mx-auto aspect-[9/16] w-full max-w-[min(100%,240px)] overflow-hidden rounded-[14px] border shadow-sm sm:max-w-[280px]"
          : "relative aspect-[9/16] h-full max-h-full w-auto max-w-[min(100%,340px)] overflow-hidden rounded-[14px] border shadow-sm"
      }
      style={{ borderColor: chat.border, backgroundColor: chat.surface }}
    >
      <EstateHeroVideo />
      <div
        className="absolute left-2 top-2 z-10 rounded-full border px-2.5 py-1 text-[10px] font-medium sm:left-3 sm:top-3 sm:px-3 sm:py-1.5 sm:text-xs"
        style={{
          borderColor: chat.border,
          backgroundColor: chat.surface,
          color: chat.text,
        }}
      >
        Welcome to Kumusha
      </div>
    </div>
  );
}

export default function BookingHeroSection() {
  return (
    <section
      id="book"
      className="grid h-full min-h-0 flex-1 grid-cols-1 grid-rows-1 overflow-hidden md:grid-cols-[min(720px,54%)_1fr]"
      style={{ backgroundColor: chat.bg }}
    >
      <div
        id="booking-left-panel"
        className="min-h-0 overflow-x-hidden overflow-y-auto overscroll-y-contain"
        style={{ backgroundColor: chat.bg, WebkitOverflowScrolling: "touch" }}
      >
        <header
          className="border-b px-4 py-3 sm:px-5 sm:py-4 md:px-6 md:py-5"
          style={{ borderColor: chat.border }}
        >
          <h1
            className="text-xl font-medium leading-tight sm:text-[22px] md:text-[26px]"
            style={{ color: chat.text }}
          >
            {SITE_NAME}
          </h1>
          <p
            className="mt-1 text-[10px] font-semibold uppercase tracking-[0.08em] sm:mt-1.5 sm:text-[11px]"
            style={{ color: chat.textMuted }}
          >
            Victoria Falls · Zimbabwe
          </p>
          <p
            className="mt-2 max-w-lg text-[13px] leading-[1.55] sm:text-[14px] sm:leading-[1.6] md:text-[15px]"
            style={{ color: chat.textSecondary }}
          >
            On 2.5 hectares near Victoria Falls, our private estate is yours for unhurried
            stays, meaningful celebrations, and evenings of wine and good company in the open
            air — private, welcoming, and close to the river.
          </p>
        </header>

        <div
          className="border-b px-4 py-2.5 sm:px-5 sm:py-3 md:hidden"
          style={{ borderColor: chat.border, backgroundColor: chat.sidebar }}
        >
          <VideoFrame compact />
        </div>

        <BookingPanelGate />
      </div>

      <aside
        className="hidden min-h-0 overflow-hidden border-l md:flex md:items-center md:justify-center md:p-6 lg:p-10"
        style={{ borderColor: chat.border, backgroundColor: chat.sidebar }}
        aria-label="Estate showcase video"
      >
        <VideoFrame />
      </aside>
    </section>
  );
}
