"use client";

import { useState, type ReactNode } from "react";
import { cn } from "@/lib/utils";
import { chat } from "@/lib/sahwira-chat-theme";
import type { BookingLane, BookingStep, FormState } from "@/lib/booking-flow";
import HairlineSelect from "./HairlineSelect";

export type StepFieldTheme = {
  lane: BookingLane;
  accent: string;
  borderDefault: string;
  borderFocus: string;
  text: string;
  muted: string;
};

export function chatFieldTheme(): StepFieldTheme {
  return {
    lane: "chat",
    accent: chat.accent,
    borderDefault: chat.inputBorder,
    borderFocus: chat.inputFocus,
    text: chat.text,
    muted: chat.textMuted,
  };
}

export function manualFieldTheme(): StepFieldTheme {
  return {
    lane: "manual",
    accent: "var(--estate-terracotta, #C96442)",
    borderDefault: "var(--estate-border, #E5E3DF)",
    borderFocus: "var(--estate-terracotta, #C96442)",
    text: "inherit",
    muted: "inherit",
  };
}

type BookingStepFieldProps = {
  step: BookingStep;
  form: FormState;
  setField: (field: keyof FormState, value: string) => void;
  theme: StepFieldTheme;
  idPrefix: string;
  icon?: ReactNode;
  hideLabel?: boolean;
};

export default function BookingStepField({
  step,
  form,
  setField,
  theme,
  idPrefix,
  icon,
  hideLabel,
}: BookingStepFieldProps) {
  const fieldId = `${idPrefix}-${step.field}`;
  const [focused, setFocused] = useState(false);
  const field = step.field!;
  const value = form[field];

  const hairlineClass = cn(
    "w-full min-h-[44px] border-0 border-b bg-transparent px-0 py-2",
    "text-base leading-normal outline-none rounded-none",
    "transition-[border-color] duration-150",
    "focus-visible:border-b-[1.5px] focus-visible:outline-none",
    theme.lane === "manual" &&
      "border-estate-border text-estate-ink placeholder:text-estate-muted/60 focus-visible:border-estate-terracotta"
  );

  const chatStyle =
    theme.lane === "chat"
      ? {
          color: chat.text,
          borderBottomWidth: "1.5px" as const,
          borderBottomColor: focused ? theme.borderFocus : theme.borderDefault,
        }
      : { borderBottomWidth: "1.5px" as const };

  const inputRow = (
    <div className="flex items-end gap-3">
      {icon && (
        <span
          className="mb-2.5 shrink-0 opacity-70"
          style={theme.lane === "chat" ? { color: chat.textMuted } : undefined}
          aria-hidden
        >
          {icon}
        </span>
      )}
      <div className="min-w-0 flex-1">
        {!hideLabel && (
          <label htmlFor={fieldId} className="sr-only">
            {step.label}
          </label>
        )}
        {step.type === "select" ? (
          <HairlineSelect
            id={fieldId}
            label={step.label}
            value={value}
            options={step.options ?? []}
            lane={theme.lane}
            onChange={(v) => setField(field, v)}
          />
        ) : step.type === "textarea" ? (
          <textarea
            id={fieldId}
            value={value}
            onChange={(e) => setField(field, e.target.value)}
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
            rows={3}
            className={cn(hairlineClass, "resize-none")}
            style={chatStyle}
            placeholder="Optional notes, dietary needs, timing…"
          />
        ) : (
          <input
            id={fieldId}
            type={step.type || "text"}
            value={value}
            onChange={(e) => setField(field, e.target.value)}
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
            className={hairlineClass}
            style={chatStyle}
          />
        )}
      </div>
    </div>
  );

  return inputRow;
}
