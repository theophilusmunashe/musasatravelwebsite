"use client";

import { cn } from "@/lib/utils";
import { chat } from "@/lib/sahwira-chat-theme";
import BookingLaneSwitch, { carryOverHint } from "./BookingLaneSwitch";
import BookingSuccessView from "./BookingSuccessView";
import SahwiraChatLane from "./SahwiraChatLane";
import ManualBookingView from "./ManualBookingView";
import { useBookingExperience } from "./useBookingExperience";

type BookingExperienceOptions = {
  manualOnly?: boolean;
};

export default function BookingExperience({ manualOnly = false }: BookingExperienceOptions) {
  const { done, intent, form, reference, summary, viewProps } = useBookingExperience({ manualOnly });
  const { mode, setMode } = viewProps;

  if (done) {
    return (
      <div className="px-4 py-5 pb-[max(1.25rem,env(safe-area-inset-bottom))] sm:py-6 md:px-6">
        <BookingSuccessView
          lane={manualOnly ? "manual" : "chat"}
          intent={intent}
          form={form}
          reference={reference}
          summary={summary}
        />
      </div>
    );
  }

  if (manualOnly) {
    return (
      <div className="px-0">
        <ManualBookingView {...viewProps} />
      </div>
    );
  }

  return (
    <>
      <div
        className="sticky top-0 z-10 border-b px-4 py-2.5 sm:py-3 md:px-6"
        style={{ borderColor: chat.border, backgroundColor: chat.surface }}
      >
        <BookingLaneSwitch mode={mode} onChange={setMode} />
      </div>

      <div className="px-4 py-3 sm:px-5 md:px-6">
        {mode === "chat" ? <SahwiraChatLane {...viewProps} /> : <ManualBookingView {...viewProps} />}

        <p
          className={cn(
            "mt-3 text-center text-[10px] leading-relaxed sm:mt-4 sm:pb-4 sm:text-[11px]",
            mode === "manual" && "hidden text-estate-muted sm:block",
            mode === "chat" && "pb-[max(0.5rem,env(safe-area-inset-bottom))]"
          )}
          style={mode === "chat" ? { color: chat.textMuted } : undefined}
        >
          <span className="sm:hidden">{carryOverHint(mode, true)}</span>
          <span className="hidden sm:inline">{carryOverHint(mode, false)}</span>
        </p>
      </div>
    </>
  );
}
