"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { ClipboardList, MessageCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import { chat } from "@/lib/sahwira-chat-theme";
import { SAHWIRA_NAME } from "@/lib/sahwira";
import type { BookingLane } from "@/lib/booking-flow";
import { parseLane } from "@/lib/booking-flow";

const CHAT_LABEL = `Chat with ${SAHWIRA_NAME}`;

const OPTIONS: {
  id: BookingLane;
  label: string;
  shortLabel: string;
  Icon: typeof MessageCircle;
}[] = [
  { id: "chat", label: CHAT_LABEL, shortLabel: SAHWIRA_NAME, Icon: MessageCircle },
  { id: "manual", label: "Book manually", shortLabel: "Manual", Icon: ClipboardList },
];

export default function BookingLaneSwitch({
  mode,
  onChange,
}: {
  mode: BookingLane;
  onChange: (mode: BookingLane) => void;
}) {
  return (
    <div
      className="flex w-full rounded-full border p-1 sm:max-w-md"
      style={{ borderColor: chat.border, backgroundColor: chat.sidebar }}
      role="tablist"
      aria-label="Booking method"
    >
      {OPTIONS.map(({ id, label, shortLabel, Icon }) => {
        const selected = mode === id;
        return (
          <button
            key={id}
            type="button"
            role="tab"
            aria-selected={selected}
            aria-label={label}
            onClick={() => onChange(id)}
            className={cn(
              "flex min-h-[44px] min-w-0 flex-1 items-center justify-center gap-1.5 rounded-full px-2 py-2",
              "text-xs font-medium transition-all sm:gap-2 sm:px-4 sm:text-[13px]",
              "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2",
              !selected && "border border-transparent"
            )}
            style={
              selected
                ? {
                    backgroundColor: chat.surface,
                    borderColor: chat.border,
                    color: chat.text,
                    boxShadow: "0 1px 2px rgba(26,25,23,0.06)",
                    outlineColor: chat.accent,
                  }
                : { color: chat.textSecondary, outlineColor: chat.accent }
            }
          >
            <Icon className="h-4 w-4 shrink-0" aria-hidden />
            <span className="truncate sm:hidden">{shortLabel}</span>
            <span className="hidden truncate sm:inline">{label}</span>
          </button>
        );
      })}
    </div>
  );
}

export function useBookingLane(defaultLane: BookingLane = "chat"): [BookingLane, (lane: BookingLane) => void] {
  const router = useRouter();
  const searchParams = useSearchParams();
  const mode = parseLane(searchParams.get("mode"));

  const setMode = (next: BookingLane) => {
    const url = new URL(window.location.href);
    url.searchParams.set("mode", next);
    router.replace(url.toString(), { scroll: false });
  };

  return [mode, setMode];
}

export function carryOverHint(mode: BookingLane, compact = false) {
  if (mode === "chat") {
    return compact
      ? "Switch to Manual — your answers carry over."
      : "Prefer to type it yourself? Switch to Book manually — your answers carry over.";
  }
  return compact
    ? `Switch to ${SAHWIRA_NAME} — your answers carry over.`
    : `Want a guided conversation? Switch to ${CHAT_LABEL} — your answers carry over.`;
}
