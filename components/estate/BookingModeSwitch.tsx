"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { SAHWIRA_NAME } from "@/lib/sahwira";
import { cn } from "@/lib/utils";
import { chat } from "@/lib/sahwira-chat-theme";

export type BookingMode = "sahwira" | "manual";

export default function BookingModeSwitch({
  mode,
  onChange,
}: {
  mode: BookingMode;
  onChange: (mode: BookingMode) => void;
}) {
  const options: { id: BookingMode; label: string }[] = [
    { id: "sahwira", label: SAHWIRA_NAME },
    { id: "manual", label: "Manual booking" },
  ];

  return (
    <div
      className="inline-flex rounded-[10px] border p-1"
      style={{ borderColor: chat.border, backgroundColor: chat.sidebar }}
      role="tablist"
      aria-label="Booking method"
    >
      {options.map(({ id, label }) => (
        <button
          key={id}
          type="button"
          role="tab"
          aria-selected={mode === id}
          onClick={() => onChange(id)}
          className={cn(
            "min-h-[36px] rounded-[8px] px-4 py-1.5 text-[13px] font-medium transition-colors",
            mode === id ? "border" : "border border-transparent"
          )}
          style={
            mode === id
              ? {
                  backgroundColor: chat.surface,
                  borderColor: chat.border,
                  color: chat.text,
                }
              : { color: chat.textSecondary }
          }
        >
          {label}
        </button>
      ))}
    </div>
  );
}

export function useBookingMode(defaultMode: BookingMode = "sahwira"): [
  BookingMode,
  (mode: BookingMode) => void,
] {
  const router = useRouter();
  const searchParams = useSearchParams();

  const mode: BookingMode =
    searchParams.get("mode") === "manual" ? "manual" : defaultMode;

  const setMode = (next: BookingMode) => {
    const url = new URL(window.location.href);
    url.searchParams.set("mode", next);
    router.replace(url.toString(), { scroll: false });
  };

  return [mode, setMode];
}
