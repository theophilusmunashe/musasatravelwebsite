"use client";

import { Suspense, useEffect, useState } from "react";
import { ClipboardList, MessageCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import { SITE_NAME } from "@/lib/site";
import { SAHWIRA_NAME } from "@/lib/sahwira";
import { chat } from "@/lib/sahwira-chat-theme";
import type { BookingLane } from "@/lib/booking-flow";
import EstateHeroVideo from "./EstateHeroVideo";
import BookingLaneSwitch, { carryOverHint } from "./booking/BookingLaneSwitch";
import SahwiraChatLane from "./booking/SahwiraChatLane";
import ManualBookingView from "./booking/ManualBookingView";
import BookingSuccessView from "./booking/BookingSuccessView";
import SwipeableDrawer from "./booking/SwipeableDrawer";
import { useBookingExperience } from "./booking/useBookingExperience";

function PanelFallback() {
  return (
    <p className="p-6 text-[15px]" style={{ color: chat.textMuted }}>
      Loading booking…
    </p>
  );
}

function VideoFrame({ rounded = "rounded-[14px]" }: { rounded?: string }) {
  return (
    <div
      className={cn(
        "relative aspect-[9/16] h-full max-h-full w-auto max-w-[min(100%,340px)] overflow-hidden border shadow-sm",
        rounded
      )}
      style={{ borderColor: chat.border, backgroundColor: chat.surface }}
    >
      <EstateHeroVideo />
      <div
        className="absolute left-3 top-3 z-10 rounded-full border px-3 py-1.5 text-xs font-medium"
        style={{ borderColor: chat.border, backgroundColor: chat.surface, color: chat.text }}
      >
        Welcome to Kumusha
      </div>
    </div>
  );
}

function HintLine({ mode }: { mode: BookingLane }) {
  return (
    <p
      className={cn(
        "mt-3 text-center text-[10px] leading-relaxed sm:mt-4 sm:pb-4 sm:text-[11px]",
        mode === "manual" && "hidden text-estate-muted sm:block",
        mode === "chat" && "pb-[max(0.5rem,env(safe-area-inset-bottom))]"
      )}
      style={mode === "chat" ? { color: chat.textMuted } : undefined}
    >
      <span className="hidden sm:inline">{carryOverHint(mode, false)}</span>
    </p>
  );
}

function useIsDesktop() {
  const [isDesktop, setIsDesktop] = useState(() =>
    typeof window !== "undefined" ? window.matchMedia("(min-width: 768px)").matches : false
  );
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 768px)");
    const update = () => setIsDesktop(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);
  return isDesktop;
}

function BookingHeroInner() {
  const { done, intent, form, reference, summary, viewProps } = useBookingExperience();
  const { mode, setMode } = viewProps;
  const [drawerOpen, setDrawerOpen] = useState(false);
  const isDesktop = useIsDesktop();

  const openLane = (lane: BookingLane) => {
    setMode(lane);
    setDrawerOpen(true);
  };

  const drawerTitle = mode === "chat" ? `Chat with ${SAHWIRA_NAME}` : "Book manually";
  const drawerSubtitle =
    mode === "chat" ? "Your estate concierge · replies within a day" : "A few quick questions";

  if (isDesktop) {
    return (
      <div
        className="grid h-full min-h-0 grid-cols-[min(720px,54%)_1fr]"
        style={{ backgroundColor: chat.bg }}
      >
        <div
          id="booking-left-panel"
          className="min-h-0 overflow-x-hidden overflow-y-auto overscroll-y-contain"
          style={{ backgroundColor: chat.bg, WebkitOverflowScrolling: "touch" }}
        >
          <header className="border-b px-6 py-5" style={{ borderColor: chat.border }}>
            <h1 className="text-[26px] font-medium leading-tight" style={{ color: chat.text }}>
              {SITE_NAME}
            </h1>
            <p
              className="mt-1.5 text-[11px] font-semibold uppercase tracking-[0.08em]"
              style={{ color: chat.textMuted }}
            >
              Victoria Falls · Zimbabwe
            </p>
            <p
              className="mt-2 max-w-lg text-[15px] leading-[1.6]"
              style={{ color: chat.textSecondary }}
            >
              On 2.5 hectares near Victoria Falls, our private estate is yours for unhurried
              stays, meaningful celebrations, and evenings of wine and good company in the open
              air — private, welcoming, and close to the river.
            </p>
          </header>

          {done ? (
            <div className="px-6 py-6">
              <BookingSuccessView
                lane={mode}
                intent={intent}
                form={form}
                reference={reference}
                summary={summary}
              />
            </div>
          ) : (
            <>
              <div
                className="sticky top-0 z-10 border-b px-6 py-3"
                style={{ borderColor: chat.border, backgroundColor: chat.surface }}
              >
                <BookingLaneSwitch mode={mode} onChange={setMode} />
              </div>
              <div className="px-6 py-3">
                {mode === "chat" ? (
                  <SahwiraChatLane {...viewProps} />
                ) : (
                  <ManualBookingView {...viewProps} />
                )}
                <HintLine mode={mode} />
              </div>
            </>
          )}
        </div>

        <aside
          className="flex min-h-0 items-center justify-center overflow-hidden border-l p-6 lg:p-10"
          style={{ borderColor: chat.border, backgroundColor: chat.sidebar }}
          aria-label="Estate showcase video"
        >
          <VideoFrame />
        </aside>
      </div>
    );
  }

  return (
    <>
      {/* ───────────────────────── MOBILE HUB ───────────────────────── */}
      <div className="flex h-full min-h-0 flex-col" style={{ backgroundColor: chat.bg }}>
        <header
          className="shrink-0 border-b px-4 py-3 text-center"
          style={{ borderColor: chat.border }}
        >
          <h1 className="text-lg font-medium leading-tight" style={{ color: chat.text }}>
            {SITE_NAME}
          </h1>
          <p
            className="mt-0.5 text-[10px] font-semibold uppercase tracking-[0.12em]"
            style={{ color: chat.textMuted }}
          >
            Victoria Falls · Zimbabwe
          </p>
        </header>

        <div className="relative flex min-h-0 flex-1 items-center justify-center px-4 py-5">
          <div
            className="relative aspect-[9/16] h-full max-h-full w-auto max-w-[min(100%,300px)] overflow-hidden rounded-[20px] border shadow-[0_18px_50px_rgba(26,25,23,0.22)]"
            style={{ borderColor: chat.border, backgroundColor: chat.surface }}
          >
            <EstateHeroVideo />

            <div
              className="absolute left-3 top-3 z-10 rounded-full border px-3 py-1.5 text-[11px] font-medium"
              style={{ borderColor: chat.border, backgroundColor: chat.surface, color: chat.text }}
            >
              Welcome to Kumusha
            </div>

            <div className="pointer-events-none absolute inset-x-0 bottom-0 h-3/5 bg-gradient-to-t from-black/80 via-black/35 to-transparent" />

            <div className="absolute inset-x-0 bottom-0 z-10 flex flex-col gap-2.5 p-4">
              <p className="text-center text-[12px] font-medium text-white/90">
                How would you like to begin?
              </p>
              <button
                type="button"
                onClick={() => openLane("chat")}
                className="flex min-h-[48px] w-full items-center justify-center gap-2 rounded-full px-4 text-[14px] font-semibold text-white shadow-lg shadow-black/25 transition-transform active:scale-[0.98]"
                style={{ backgroundColor: chat.accent }}
              >
                <MessageCircle className="h-[18px] w-[18px]" aria-hidden />
                Chat with {SAHWIRA_NAME}
              </button>
              <button
                type="button"
                onClick={() => openLane("manual")}
                className="flex min-h-[48px] w-full items-center justify-center gap-2 rounded-full border border-white/30 bg-white/95 px-4 text-[14px] font-semibold shadow-lg shadow-black/25 backdrop-blur transition-transform active:scale-[0.98]"
                style={{ color: chat.text }}
              >
                <ClipboardList className="h-[18px] w-[18px]" aria-hidden />
                Book manually
              </button>
            </div>
          </div>
        </div>
      </div>

      <SwipeableDrawer
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        title={drawerTitle}
        subtitle={drawerSubtitle}
        headerExtra={!done ? <BookingLaneSwitch mode={mode} onChange={setMode} /> : undefined}
      >
        {done ? (
          <div className="px-4 py-5 pb-[max(1.25rem,env(safe-area-inset-bottom))]">
            <BookingSuccessView
              lane={mode}
              intent={intent}
              form={form}
              reference={reference}
              summary={summary}
            />
          </div>
        ) : mode === "chat" ? (
          <div className="px-4 py-3">
            <SahwiraChatLane {...viewProps} />
          </div>
        ) : (
          <div className="px-4 py-3">
            <ManualBookingView {...viewProps} />
          </div>
        )}
      </SwipeableDrawer>
    </>
  );
}

export default function BookingHeroSection() {
  return (
    <section
      id="book"
      className="h-full min-h-0 flex-1 overflow-hidden"
      style={{ backgroundColor: chat.bg }}
    >
      <Suspense fallback={<PanelFallback />}>
        <BookingHeroInner />
      </Suspense>
    </section>
  );
}
