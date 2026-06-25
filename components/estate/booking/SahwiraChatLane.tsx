"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { ArrowUp, Loader2, Pencil } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";
import { chat } from "@/lib/sahwira-chat-theme";
import { SAHWIRA_NAME } from "@/lib/sahwira";
import {
  getCapturedFieldLabels,
  getMissingFieldLabels,
  isBookingComplete,
} from "@/lib/sahwira-client";
import type { BookingExperienceProps } from "./booking-types";

const QUICK_PROMPTS = [
  "Stay for 4 nights",
  "Host a wedding",
  "Wine tasting tickets",
];

function SahwiraAvatar() {
  return (
    <div
      className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-[11px] font-semibold text-white sm:h-8 sm:w-8"
      style={{ backgroundColor: chat.accent }}
      aria-hidden
    >
      E
    </div>
  );
}

function TypingIndicator() {
  const reduceMotion = useReducedMotion();
  return (
    <div className="flex items-start gap-2 sm:gap-3" aria-live="polite" aria-label={`${SAHWIRA_NAME} is typing`}>
      <SahwiraAvatar />
      <div className="flex items-center gap-1 pt-1.5">
        {[0, 1, 2].map((i) => (
          <motion.span
            key={i}
            className="inline-block h-1.5 w-1.5 rounded-full"
            style={{ backgroundColor: chat.textMuted }}
            animate={reduceMotion ? {} : { opacity: [0.35, 1, 0.35] }}
            transition={reduceMotion ? { duration: 0 } : { duration: 0.9, repeat: Infinity, delay: i * 0.15 }}
          />
        ))}
      </div>
    </div>
  );
}

export default function SahwiraChatLane({
  intent,
  form,
  messages,
  chatLoading,
  chatStreaming,
  submitting,
  sendMessage,
  submit,
  setMode,
}: BookingExperienceProps) {
  const [input, setInput] = useState("");
  const bottomRef = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();

  const captured = getCapturedFieldLabels(form, intent);
  const missing = getMissingFieldLabels(form, intent);
  const ready = isBookingComplete(form, intent);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({
      behavior: reduceMotion ? "auto" : "smooth",
      block: "end",
    });
  }, [messages, chatLoading, chatStreaming, reduceMotion]);

  const handleSend = useCallback(() => {
    const trimmed = input.trim();
    if (!trimmed || chatLoading) return;
    setInput("");
    sendMessage(trimmed);
  }, [input, chatLoading, sendMessage]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="mx-auto w-full max-w-xl">
      <div
        className="space-y-4 px-0.5 py-2 sm:space-y-5 sm:px-1"
        role="log"
        aria-label={`Conversation with ${SAHWIRA_NAME}`}
        aria-live="polite"
      >
        {messages.map((msg, i) =>
          msg.role === "assistant" ? (
            <div key={`a-${i}`} className="flex items-start gap-2 sm:gap-3">
              <SahwiraAvatar />
              <p
                className="min-w-0 flex-1 pt-0.5 text-[15px] leading-[1.6] sm:text-base sm:leading-[1.65]"
                style={{ color: chat.text }}
              >
                {msg.content}
              </p>
            </div>
          ) : (
            <div key={`u-${i}`} className="flex justify-end">
              <div
                className="max-w-[min(92%,20rem)] rounded-[16px] border px-3.5 py-2.5 text-[15px] leading-[1.6] sm:max-w-[88%] sm:rounded-[18px] sm:px-4 sm:py-3 sm:text-base sm:leading-[1.65]"
                style={{
                  borderColor: chat.border,
                  backgroundColor: chat.surface,
                  color: chat.text,
                }}
              >
                {msg.content}
              </div>
            </div>
          )
        )}

        {chatLoading && !chatStreaming && <TypingIndicator />}

        {chatStreaming && (
          <div className="flex items-start gap-2 sm:gap-3">
            <SahwiraAvatar />
            <p
              className="min-w-0 flex-1 pt-0.5 text-[15px] leading-[1.6] sm:text-base sm:leading-[1.65]"
              style={{ color: chat.text }}
            >
              {chatStreaming}
              <span className="inline-block w-0.5 animate-pulse bg-current" aria-hidden />
            </p>
          </div>
        )}

        <div ref={bottomRef} aria-hidden className="h-px" />
      </div>

      <div
        className="mt-3 rounded-xl border px-3 py-2.5 sm:mt-4 sm:px-4 sm:py-3"
        style={{ borderColor: chat.border, backgroundColor: chat.surface }}
      >
        <div className="flex flex-col gap-2 sm:flex-row sm:flex-wrap sm:items-center sm:justify-between">
          <p className="text-[10px] font-medium uppercase tracking-wide sm:text-xs" style={{ color: chat.textMuted }}>
            {SAHWIRA_NAME} has noted
          </p>
          <button
            type="button"
            onClick={() => setMode("manual")}
            className="inline-flex min-h-[44px] w-full items-center justify-center gap-1.5 rounded-lg border px-3 text-xs font-medium sm:w-auto sm:border-0 sm:px-2 hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
            style={{ borderColor: chat.border, color: chat.accent, outlineColor: chat.accent }}
          >
            <Pencil className="h-3.5 w-3.5 shrink-0" aria-hidden />
            Edit in manual
          </button>
        </div>

        <div className="mt-2 flex flex-wrap gap-1.5">
          {captured.length === 0 ? (
            <span
              className="inline-flex min-h-[32px] items-center rounded-full border px-2.5 py-1 text-[11px] sm:px-3 sm:text-xs"
              style={{ borderColor: chat.border, color: chat.textMuted }}
            >
              Nothing captured yet — just chat naturally
            </span>
          ) : (
            captured.map(({ field, label, value }) => (
              <span
                key={field}
                className="inline-flex max-w-full min-h-[32px] items-center truncate rounded-full px-2.5 py-1 text-[11px] font-medium text-white sm:px-3 sm:text-xs"
                style={{ backgroundColor: chat.accent }}
              >
                {label}: {value}
              </span>
            ))
          )}
        </div>

        {missing.length > 0 && (
          <div className="mt-2 flex flex-wrap gap-1.5">
            <span className="w-full text-[11px] sm:w-auto sm:text-xs" style={{ color: chat.textMuted }}>
              Still needed:
            </span>
            {missing.map((label) => (
              <span
                key={label}
                className="inline-flex min-h-[28px] items-center rounded-full border px-2 py-0.5 text-[11px] sm:text-xs"
                style={{ borderColor: chat.border, color: chat.textMuted }}
              >
                {label}
              </span>
            ))}
          </div>
        )}
      </div>

      <div
        className="sticky bottom-0 z-10 -mx-4 mt-3 border-t px-4 pt-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] sm:-mx-5 sm:px-5 md:-mx-6 md:px-6"
        style={{ borderColor: chat.border, backgroundColor: chat.bg }}
      >
        {!ready && !chatLoading && (
          <div className="-mx-1 mb-3 flex gap-2 overflow-x-auto overscroll-x-contain px-1 pb-1 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            {QUICK_PROMPTS.map((prompt) => (
              <button
                key={prompt}
                type="button"
                onClick={() => sendMessage(prompt)}
                className="min-h-[36px] shrink-0 rounded-full border px-3 py-1.5 text-xs font-medium whitespace-nowrap transition-colors hover:opacity-90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
                style={{
                  borderColor: chat.border,
                  color: chat.textSecondary,
                  outlineColor: chat.accent,
                }}
              >
                {prompt}
              </button>
            ))}
          </div>
        )}

        {ready && (
          <button
            type="button"
            onClick={submit}
            disabled={submitting}
            className={cn(
              "mb-3 w-full min-h-[44px] rounded-xl text-sm font-medium text-white",
              "transition-opacity hover:opacity-95 disabled:opacity-50",
              "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
            )}
            style={{ backgroundColor: chat.accent, outlineColor: chat.accent }}
          >
            {submitting ? "Sending enquiry…" : "Review & send enquiry"}
          </button>
        )}

        <div
          className="flex items-end gap-2 border-b pb-1"
          style={{ borderColor: chat.inputBorder }}
        >
          <label htmlFor="sahwira-composer" className="sr-only">
            Message {SAHWIRA_NAME}
          </label>
          <textarea
            id="sahwira-composer"
            rows={1}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={`Message ${SAHWIRA_NAME}…`}
            disabled={chatLoading}
            className="max-h-28 min-h-[44px] flex-1 resize-none bg-transparent py-2.5 text-base leading-[1.6] outline-none placeholder:opacity-60 focus-visible:outline-none"
            style={{ color: chat.text }}
          />
          <button
            type="button"
            disabled={chatLoading || !input.trim()}
            onClick={handleSend}
            className={cn(
              "mb-1 flex h-11 w-11 shrink-0 items-center justify-center rounded-full text-white",
              "transition-opacity disabled:opacity-30",
              "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
            )}
            style={{ backgroundColor: chat.accent, outlineColor: chat.accent }}
            aria-label="Send message"
          >
            {chatLoading ? (
              <Loader2 className="h-4 w-4 animate-spin" aria-hidden />
            ) : (
              <ArrowUp className="h-4 w-4" aria-hidden />
            )}
          </button>
        </div>

        <p className="mt-2 text-center text-[11px] leading-relaxed sm:text-xs" style={{ color: chat.textMuted }}>
          Nothing is booked until you confirm. Our team replies within one business day.
        </p>
      </div>
    </div>
  );
}
