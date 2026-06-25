"use client";

import { cn } from "@/lib/utils";
import { chat } from "@/lib/sahwira-chat-theme";
import type { BookingLane } from "@/lib/booking-flow";

type BookingProgressProps = {
  step: number;
  total: number;
  lane: BookingLane;
};

export default function BookingProgress({ step, total, lane }: BookingProgressProps) {
  const current = step + 1;
  const progress = total > 0 ? (current / total) * 100 : 0;

  return (
    <div className="flex items-center gap-3">
      <div
        className="h-[3px] flex-1 overflow-hidden rounded-full"
        style={
          lane === "chat"
            ? { backgroundColor: chat.border }
            : undefined
        }
        role="progressbar"
        aria-valuenow={current}
        aria-valuemin={1}
        aria-valuemax={total}
        aria-label={`Step ${current} of ${total}`}
      >
        <div
          className={cn("h-full transition-all duration-300", lane === "manual" && "bg-estate-terracotta")}
          style={{
            width: `${progress}%`,
            backgroundColor: lane === "chat" ? chat.accent : undefined,
          }}
        />
      </div>
      <span
        className={cn(
          "shrink-0 text-xs tabular-nums",
          lane === "manual" && "text-estate-muted"
        )}
        style={lane === "chat" ? { color: chat.textMuted } : undefined}
      >
        Step {current} of {total}
      </span>
    </div>
  );
}
