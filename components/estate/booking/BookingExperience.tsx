"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useSearchParams } from "next/navigation";
import toast from "react-hot-toast";
import { cn } from "@/lib/utils";
import { chat } from "@/lib/sahwira-chat-theme";
import { SITE_ENQUIRIES_EMAIL } from "@/lib/site";
import { SAHWIRA_NAME } from "@/lib/sahwira";
import type { BookingIntent } from "@/lib/estate-tokens";
import type { SahwiraMessage } from "@/lib/sahwira";
import {
  buildSubmitPayload,
  buildSummary,
  emptyForm,
  makeReference,
  parseIntent,
  stepsForIntent,
  type FormState,
} from "@/lib/booking-flow";
import {
  buildChatGreeting,
  buildContextSummary,
  formHasAnyData,
  mergeFormPatch,
  mockSahwiraChat,
} from "@/lib/sahwira-client";
import BookingLaneSwitch, { carryOverHint, useBookingLane } from "./BookingLaneSwitch";
import BookingSuccessView from "./BookingSuccessView";
import SahwiraChatLane from "./SahwiraChatLane";
import ManualBookingView from "./ManualBookingView";
import type { BookingExperienceProps } from "./booking-types";

type BookingExperienceOptions = {
  manualOnly?: boolean;
};

export default function BookingExperience({ manualOnly = false }: BookingExperienceOptions) {
  const searchParams = useSearchParams();
  const urlIntentParam = searchParams.get("intent");
  const [mode, setModeRaw] = useBookingLane("chat");

  const [intent, setIntent] = useState<BookingIntent>(() => parseIntent(urlIntentParam));
  const [step, setStep] = useState(0);
  const [form, setForm] = useState<FormState>(emptyForm);
  const [messages, setMessages] = useState<SahwiraMessage[]>(() => [
    { role: "assistant", content: buildChatGreeting(emptyForm, parseIntent(null)) },
  ]);
  const [chatLoading, setChatLoading] = useState(false);
  const [chatStreaming, setChatStreaming] = useState<string | null>(null);
  const [done, setDone] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [reference, setReference] = useState("");

  const chatBooted = useRef(true);
  const prevMode = useRef(mode);
  const formRef = useRef(form);
  const intentRef = useRef(intent);
  formRef.current = form;
  intentRef.current = intent;

  useEffect(() => {
    const urlIntent = parseIntent(urlIntentParam);
    setIntent(urlIntent);
  }, [urlIntentParam]);

  useEffect(() => {
    if (manualOnly) return;

    const switchedToChat = prevMode.current !== "chat" && mode === "chat";
    prevMode.current = mode;

    if (mode !== "chat") return;

    if (!chatBooted.current) {
      chatBooted.current = true;
      setMessages([
        { role: "assistant", content: buildChatGreeting(formRef.current, intentRef.current) },
      ]);
      return;
    }

    if (switchedToChat && formHasAnyData(formRef.current)) {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: `I've picked up what you entered in the form. ${buildContextSummary(formRef.current, intentRef.current)} Tell me if anything needs changing.`,
        },
      ]);
    }
  }, [mode, manualOnly]);

  const steps = useMemo(() => stepsForIntent(intent), [intent]);
  const summary = useMemo(() => buildSummary(form, intent), [form, intent]);

  const setMode = useCallback(
    (next: typeof mode) => {
      prevMode.current = mode;
      setModeRaw(next);
    },
    [mode, setModeRaw]
  );

  const syncIntentUrl = (next: BookingIntent) => {
    const url = new URL(window.location.href);
    url.searchParams.set("intent", next);
    window.history.replaceState({}, "", url.toString());
  };

  const switchIntent = (next: BookingIntent) => {
    setIntent(next);
    setStep(0);
    setForm(emptyForm);
    syncIntentUrl(next);
  };

  const setField = (field: keyof FormState, value: string) => {
    setForm((f) => ({ ...f, [field]: value }));
  };

  const applyPatch = useCallback((patch: Partial<FormState>, nextIntent?: BookingIntent) => {
    setForm((f) => mergeFormPatch(f, patch));
    if (nextIntent) {
      setIntent(nextIntent);
      syncIntentUrl(nextIntent);
    }
  }, []);

  const sendMessage = useCallback(
    async (text: string) => {
      const trimmed = text.trim();
      if (!trimmed || chatLoading) return;

      const nextMessages: SahwiraMessage[] = [...messages, { role: "user", content: trimmed }];
      setMessages(nextMessages);
      setChatLoading(true);
      setChatStreaming(null);

      try {
        const result = await mockSahwiraChat(
          nextMessages,
          form,
          intent,
          (partial) => setChatStreaming(partial)
        );

        applyPatch(result.patch, result.intent);
        setChatStreaming(null);
        setMessages((prev) => [...prev, { role: "assistant", content: result.reply }]);
      } catch {
        toast.error(`${SAHWIRA_NAME} couldn't respond. Try again or switch to manual booking.`);
      } finally {
        setChatLoading(false);
        setChatStreaming(null);
      }
    },
    [messages, form, intent, chatLoading, applyPatch]
  );

  const goBack = () => setStep((s) => Math.max(0, s - 1));
  const goNext = () => setStep((s) => Math.min(steps.length - 1, s + 1));

  const submit = useCallback(async () => {
    setSubmitting(true);
    const payload = buildSubmitPayload(form, intent);

    try {
      const res = await fetch("/api/send-booking-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (!res.ok || !data.success) throw new Error("failed");
      setReference(makeReference());
      setDone(true);
    } catch {
      toast.error(`Something went wrong. Email us at ${SITE_ENQUIRIES_EMAIL}`);
    } finally {
      setSubmitting(false);
    }
  }, [form, intent]);

  const viewProps: BookingExperienceProps = {
    mode,
    intent,
    step,
    steps,
    form,
    messages,
    chatLoading,
    chatStreaming,
    done,
    submitting,
    reference,
    summary,
    embedded: !manualOnly,
    setField,
    switchIntent,
    goBack,
    goNext,
    submit,
    sendMessage,
    setMode,
  };

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
