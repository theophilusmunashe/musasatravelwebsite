"use client";

import { Check, MapPin } from "lucide-react";
import { cn } from "@/lib/utils";
import { chat } from "@/lib/sahwira-chat-theme";
import { SITE_ENQUIRIES_EMAIL } from "@/lib/site";
import type { BookingIntent } from "@/lib/estate-tokens";
import type { FormState } from "@/lib/booking-flow";
import { MAP_LINK, intentLabel } from "@/lib/booking-flow";
import type { BookingLane } from "@/lib/booking-flow";

type BookingSuccessViewProps = {
  lane: BookingLane;
  intent: BookingIntent;
  form: FormState;
  reference: string;
  summary: string[];
};

export default function BookingSuccessView({
  lane,
  intent,
  form,
  reference,
  summary,
}: BookingSuccessViewProps) {
  if (lane === "chat") {
    return (
      <div className="mx-auto w-full max-w-xl space-y-4 py-1 sm:space-y-5 sm:py-2">
        <div className="text-[15px] leading-[1.6] sm:text-base" style={{ color: chat.text }}>
          <p className="font-medium">You&apos;re on the list.</p>
          <p className="mt-2" style={{ color: chat.textSecondary }}>
            Thank you — we&apos;ve received your enquiry for{" "}
            {intentLabel(intent).toLowerCase()}. Expect a personal reply within one business day.
          </p>
        </div>
        {reference && (
          <p
            className="inline-block max-w-full break-words rounded-[10px] border px-3 py-1.5 text-[13px]"
            style={{ borderColor: chat.border, color: chat.textMuted, backgroundColor: chat.surface }}
          >
            Reference: <span style={{ color: chat.text }}>{reference}</span>
          </p>
        )}
        <div className="space-y-3 border-t pt-4 text-[14px] leading-[1.6] sm:pt-5" style={{ borderColor: chat.border }}>
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.08em]" style={{ color: chat.textMuted }}>
              Your enquiry
            </p>
            <ul className="mt-2 space-y-1 break-words" style={{ color: chat.textSecondary }}>
              {summary.map((line) => (
                <li key={line}>{line}</li>
              ))}
              {form.firstName && (
                <li className="break-all sm:break-normal">
                  {form.firstName} {form.lastName} · {form.email}
                </li>
              )}
            </ul>
          </div>
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.08em]" style={{ color: chat.textMuted }}>
              What happens next
            </p>
            <ol className="mt-2 list-decimal space-y-1 pl-4" style={{ color: chat.textSecondary }}>
              <li>Our team reviews availability for your dates</li>
              <li>We reply with spaces, rates, and any questions</li>
              <li>Once confirmed, we share arrival details and directions</li>
            </ol>
          </div>
        </div>
        <div className="flex flex-col gap-2 pt-1 sm:flex-row sm:flex-wrap sm:gap-3">
          <a
            href={MAP_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-[44px] w-full items-center justify-center gap-2 rounded-[10px] border px-4 text-[14px] font-medium focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 sm:w-auto"
            style={{ borderColor: chat.border, color: chat.text, outlineColor: chat.accent }}
          >
            <MapPin className="h-4 w-4 shrink-0" style={{ color: chat.accent }} />
            View Victoria Falls on map
          </a>
          <a
            href={`mailto:${SITE_ENQUIRIES_EMAIL}`}
            className="inline-flex min-h-[44px] w-full items-center justify-center text-[14px] font-medium underline-offset-4 hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 sm:w-auto sm:justify-start"
            style={{ color: chat.accent, outlineColor: chat.accent }}
          >
            {SITE_ENQUIRIES_EMAIL}
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-[14px] border border-estate-border bg-estate-warm p-5 sm:p-8 md:p-12">
      <div className="mx-auto max-w-lg text-center">
        <div className="mx-auto mb-6 flex h-14 w-14 items-center justify-center rounded-full border border-estate-green bg-estate-chip-green text-estate-green">
          <Check className="h-7 w-7" />
        </div>
        <h2 className="font-display text-2xl text-estate-ink">You&apos;re on the list</h2>
        <p className="mx-auto mt-3 text-estate-muted">
          Thank you — we&apos;ve received your enquiry for{" "}
          <span className="font-medium text-estate-ink">{intentLabel(intent).toLowerCase()}</span>.
          Expect a personal reply within one business day.
        </p>
        {reference && (
          <p className="mt-6 inline-block rounded-full border border-estate-border bg-estate-ivory px-4 py-2 text-sm text-estate-muted">
            Reference: <span className="font-medium text-estate-ink">{reference}</span>
          </p>
        )}
      </div>

      <div className="mx-auto mt-10 grid max-w-lg gap-8 text-left md:grid-cols-2">
        <div>
          <p className="text-sm font-medium text-estate-ink">Your enquiry</p>
          <ul className="mt-3 space-y-1.5 text-sm text-estate-muted">
            {summary.map((line) => (
              <li key={line}>{line}</li>
            ))}
            {form.firstName && (
              <li>
                {form.firstName} {form.lastName} · {form.email}
              </li>
            )}
          </ul>
        </div>
        <div>
          <p className="text-sm font-medium text-estate-ink">What happens next</p>
          <ol className="mt-3 list-decimal space-y-2 pl-4 text-sm text-estate-muted">
            <li>Our team reviews availability for your dates</li>
            <li>We reply with spaces, rates, and any questions</li>
            <li>Once confirmed, we share arrival details and directions</li>
          </ol>
        </div>
      </div>

      <div className="mx-auto mt-10 flex max-w-lg flex-col items-center gap-4 border-t border-estate-border pt-8 sm:flex-row sm:justify-center">
        <a
          href={MAP_LINK}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex min-h-[44px] items-center gap-2 rounded-lg border border-estate-border px-5 text-sm font-medium text-estate-ink transition-colors hover:border-estate-terracotta/50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-estate-terracotta"
        >
          <MapPin className="h-4 w-4 text-estate-teal" />
          View Victoria Falls on map
        </a>
        <a
          href={`mailto:${SITE_ENQUIRIES_EMAIL}`}
          className="text-sm font-medium text-estate-terracotta hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-estate-terracotta"
        >
          {SITE_ENQUIRIES_EMAIL}
        </a>
      </div>
    </div>
  );
}
