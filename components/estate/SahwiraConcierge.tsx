"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useSearchParams } from "next/navigation";
import { ArrowUp, Loader2 } from "lucide-react";
import toast from "react-hot-toast";
import { SITE_ENQUIRIES_EMAIL, SITE_NAME } from "@/lib/site";
import type { BookingIntent } from "@/lib/estate-tokens";
import {
  SAHWIRA_GREETING,
  SAHWIRA_NAME,
  type SahwiraCollected,
  type SahwiraMessage,
} from "@/lib/sahwira";
import { chat } from "@/lib/sahwira-chat-theme";

const QUICK_PROMPTS: { label: string; message: string; intent?: BookingIntent }[] = [
  { label: "Stay with us", message: "I'd like to stay at the estate", intent: "stay" },
  { label: "Host an event", message: "I want to host an event", intent: "host" },
  { label: "Attend a gathering", message: "I'd like to attend an event", intent: "attend" },
];

function intentLabel(intent?: BookingIntent) {
  if (intent === "host") return "Host an event";
  if (intent === "attend") return "Attend an event";
  if (intent === "stay") return "Stay with us";
  return "Your visit";
}

function greetingForIntent(intent: BookingIntent | null) {
  if (intent === "stay") {
    return `Welcome — I'm ${SAHWIRA_NAME}. I can help you plan a stay at ${SITE_NAME}. What dates are you thinking?`;
  }
  if (intent === "host") {
    return `Welcome — I'm ${SAHWIRA_NAME}. Tell me about the event you'd like to host — weddings, retreats, celebrations, and more.`;
  }
  if (intent === "attend") {
    return `Welcome — I'm ${SAHWIRA_NAME}. I can help you join one of our wine tastings, sip & paint evenings, or ticketed gatherings.`;
  }
  return SAHWIRA_GREETING;
}

function parseIntent(value: string | null): BookingIntent | null {
  if (value === "host" || value === "attend" || value === "stay") return value;
  return null;
}

export default function SahwiraConcierge({ fullHeight = false }: { fullHeight?: boolean }) {
  const searchParams = useSearchParams();
  const urlIntent = parseIntent(searchParams.get("intent"));
  const [messages, setMessages] = useState<SahwiraMessage[]>([]);
  const [collected, setCollected] = useState<SahwiraCollected>(() =>
    urlIntent ? { intent: urlIntent } : {}
  );
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [readyToSubmit, setReadyToSubmit] = useState(false);
  const [reference, setReference] = useState("");
  const [done, setDone] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const booted = useRef(false);

  useEffect(() => {
    if (booted.current) return;
    booted.current = true;
    setMessages([{ role: "assistant", content: greetingForIntent(urlIntent) }]);
  }, [urlIntent]);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, loading]);

  const sendMessage = useCallback(
    async (text: string, intentOverride?: BookingIntent) => {
      const trimmed = text.trim();
      if (!trimmed || loading) return;

      const nextCollected = intentOverride
        ? { ...collected, intent: intentOverride }
        : collected;

      const nextMessages: SahwiraMessage[] = [
        ...messages,
        { role: "user", content: trimmed },
      ];
      setMessages(nextMessages);
      setInput("");
      if (intentOverride) setCollected(nextCollected);
      setLoading(true);

      try {
        const res = await fetch("/api/sahwira", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ messages: nextMessages, collected: nextCollected }),
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data.error);

        setCollected(data.collected ?? nextCollected);
        setReadyToSubmit(Boolean(data.readyToSubmit));
        setMessages((prev) => [...prev, { role: "assistant", content: data.reply }]);
      } catch {
        toast.error(`${SAHWIRA_NAME} couldn't respond. Try manual booking instead.`);
      } finally {
        setLoading(false);
      }
    },
    [messages, collected, loading]
  );

  const submitEnquiry = async () => {
    setSubmitting(true);
    const intent = collected.intent ?? "stay";
    const payload = {
      intent,
      service: intentLabel(collected.intent),
      accommodation: collected.space || "N/A",
      activities:
        intent === "attend"
          ? [collected.event].filter(Boolean)
          : intent === "host"
            ? [collected.eventType].filter(Boolean)
            : [],
      tourGuide: "N/A",
      transfers: "N/A",
      startDate: collected.checkIn || collected.eventDate,
      endDate: collected.checkOut || collected.eventDate,
      travelers: collected.guests || collected.headcount || collected.tickets,
      firstName: collected.firstName,
      lastName: collected.lastName,
      email: collected.email,
      phone: collected.phone,
      specialRequests: collected.message || `Enquiry via ${SAHWIRA_NAME} concierge`,
    };

    try {
      const res = await fetch("/api/send-booking-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (!res.ok || !data.success) throw new Error("failed");
      setReference(`KE-${Date.now().toString(36).toUpperCase()}`);
      setDone(true);
    } catch {
      toast.error(`Something went wrong. Email us at ${SITE_ENQUIRIES_EMAIL}`);
    } finally {
      setSubmitting(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage(input);
    }
  };

  if (done) {
    return (
      <div className="flex flex-1 flex-col items-center justify-center px-6 py-10 text-center">
        <p className="text-[15px] font-medium" style={{ color: chat.text }}>
          Enquiry sent
        </p>
        <p className="mt-2 max-w-sm text-[15px] leading-[1.6]" style={{ color: chat.textSecondary }}>
          Our team will reply within one business day with availability and next steps.
        </p>
        {reference && (
          <p
            className="mt-5 rounded-[10px] border px-4 py-2 text-[13px]"
            style={{ borderColor: chat.border, color: chat.textMuted, backgroundColor: chat.surface }}
          >
            Reference: <span style={{ color: chat.text }}>{reference}</span>
          </p>
        )}
      </div>
    );
  }

  return (
    <div className={fullHeight ? "flex min-h-0 flex-1 flex-col" : "flex flex-col"}>
      <div className="flex min-h-0 flex-1">
        {/* Sidebar — quick prompts */}
        <aside
          className="hidden w-[168px] shrink-0 flex-col gap-1 border-r p-3 sm:flex"
          style={{ borderColor: chat.border, backgroundColor: chat.sidebar }}
        >
          <p
            className="mb-2 px-2 text-[11px] font-semibold uppercase tracking-[0.08em]"
            style={{ color: chat.textMuted }}
          >
            Quick start
          </p>
          {QUICK_PROMPTS.map((item) => (
            <button
              key={item.label}
              type="button"
              disabled={loading}
              onClick={() => sendMessage(item.message, item.intent)}
              className="rounded-[8px] border border-transparent px-2 py-2 text-left text-[13px] leading-snug transition-colors hover:border-[#E5E3DF] hover:bg-white/60 disabled:opacity-50"
              style={{ color: chat.textSecondary }}
            >
              {item.label}
            </button>
          ))}
        </aside>

        {/* Messages */}
        <div ref={scrollRef} className="min-h-0 flex-1 overflow-y-auto px-4 py-5 md:px-6">
          <div className="mx-auto max-w-xl space-y-6">
            {messages.map((msg, i) =>
              msg.role === "assistant" ? (
                <div
                  key={`${msg.role}-${i}`}
                  className="text-[15px] font-normal leading-[1.6]"
                  style={{ color: chat.text }}
                >
                  {msg.content}
                </div>
              ) : (
                <div key={`${msg.role}-${i}`} className="flex justify-end">
                  <div
                    className="max-w-[88%] rounded-[18px] px-4 py-3 text-[15px] font-[450] leading-[1.6]"
                    style={{ backgroundColor: chat.userBubble, color: chat.text }}
                  >
                    {msg.content}
                  </div>
                </div>
              )
            )}
            {loading && (
              <p className="text-[15px]" style={{ color: chat.textMuted }}>
                {SAHWIRA_NAME} is thinking…
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Input */}
      <div
        className="shrink-0 border-t px-4 py-4 md:px-6"
        style={{ borderColor: chat.border, backgroundColor: chat.bg }}
      >
        {readyToSubmit && (
          <button
            type="button"
            onClick={submitEnquiry}
            disabled={submitting}
            className="mb-3 w-full min-h-[44px] rounded-[10px] border text-[14px] font-medium transition-opacity hover:opacity-90 disabled:opacity-50"
            style={{
              borderColor: chat.accent,
              color: chat.surface,
              backgroundColor: chat.accent,
            }}
          >
            {submitting ? "Sending enquiry…" : "Send enquiry to our team"}
          </button>
        )}

        <div
          className="relative rounded-[16px] border"
          style={{ borderColor: chat.inputBorder, backgroundColor: chat.surface }}
        >
          <textarea
            ref={textareaRef}
            rows={1}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={`Message ${SAHWIRA_NAME}…`}
            disabled={loading}
            className="max-h-32 min-h-[52px] w-full resize-none bg-transparent px-4 py-3.5 pr-12 text-[15px] leading-[1.6] outline-none placeholder:opacity-60"
            style={{ color: chat.text }}
            onFocus={(e) => {
              e.currentTarget.parentElement!.style.borderColor = chat.inputFocus;
            }}
            onBlur={(e) => {
              e.currentTarget.parentElement!.style.borderColor = chat.inputBorder;
            }}
          />
          <button
            type="button"
            disabled={loading || !input.trim()}
            onClick={() => sendMessage(input)}
            className="absolute bottom-2.5 right-2.5 flex h-9 w-9 items-center justify-center rounded-[10px] border transition-opacity disabled:opacity-30"
            style={{
              borderColor: chat.border,
              backgroundColor: chat.sidebar,
              color: chat.text,
            }}
            aria-label="Send message"
          >
            {loading ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <ArrowUp className="h-4 w-4" />
            )}
          </button>
        </div>
        <p className="mt-2 text-center text-[12px]" style={{ color: chat.textMuted }}>
          {SAHWIRA_NAME} can help with stays, events, and gatherings
        </p>
      </div>
    </div>
  );
}
