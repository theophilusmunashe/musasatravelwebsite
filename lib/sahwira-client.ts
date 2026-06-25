import type { BookingIntent } from "@/lib/estate-tokens";
import { SAHWIRA_NAME } from "@/lib/sahwira";
import type { FormState } from "./booking-flow";
import { intentLabel, stepsForIntent } from "./booking-flow";

export type FormStatePatch = Partial<FormState>;

/** Merge patch into form — never overwrite a filled field with empty. */
export function mergeFormPatch(form: FormState, patch: FormStatePatch): FormState {
  const next = { ...form };
  (Object.keys(patch) as (keyof FormState)[]).forEach((key) => {
    const value = patch[key]?.trim();
    if (value) next[key] = value;
  });
  return next;
}

export function formHasAnyData(form: FormState): boolean {
  return Object.values(form).some((v) => v.trim().length > 0);
}

export function getRequiredFields(intent: BookingIntent): (keyof FormState)[] {
  const steps = stepsForIntent(intent);
  return steps
    .filter((s) => s.field && s.field !== "message")
    .map((s) => s.field!);
}

const FIELD_LABELS: Record<keyof FormState, string> = {
  checkIn: "Check-in date",
  checkOut: "Check-out date",
  guests: "Number of guests",
  space: "Space",
  eventDate: "Date",
  eventType: "Event type",
  headcount: "Guest count",
  event: "Event",
  tickets: "Tickets",
  firstName: "First name",
  lastName: "Last name",
  email: "Email",
  phone: "Phone",
  message: "Notes",
};

export function getMissingFieldLabels(form: FormState, intent: BookingIntent): string[] {
  return getRequiredFields(intent)
    .filter((field) => !form[field]?.trim())
    .map((field) => FIELD_LABELS[field]);
}

export function getCapturedFieldLabels(form: FormState, intent: BookingIntent): { field: keyof FormState; label: string; value: string }[] {
  const fields = [...getRequiredFields(intent), "message" as keyof FormState];
  const seen = new Set<string>();
  const captured: { field: keyof FormState; label: string; value: string }[] = [];

  fields.forEach((field) => {
    const value = form[field]?.trim();
    if (value && !seen.has(field)) {
      seen.add(field);
      captured.push({ field, label: FIELD_LABELS[field], value });
    }
  });

  if (intent === "stay" || intent === "host") {
    const space = form.space?.trim();
    if (space && !seen.has("space")) {
      captured.push({ field: "space", label: FIELD_LABELS.space, value: space });
    }
  }

  return captured;
}

export function isBookingComplete(form: FormState, intent: BookingIntent): boolean {
  return getMissingFieldLabels(form, intent).length === 0;
}

export function buildContextSummary(form: FormState, intent: BookingIntent): string {
  const captured = getCapturedFieldLabels(form, intent);
  if (captured.length === 0) return "";
  const lines = captured.map((c) => `${c.label}: ${c.value}`).join("; ");
  return `I can see you've already shared: ${lines}.`;
}

export function buildChatGreeting(form: FormState, intent: BookingIntent): string {
  const context = buildContextSummary(form, intent);
  const base = `Welcome — I'm ${SAHWIRA_NAME}, your concierge at Kumusha. Are you looking to stay with us, host an event, or attend a gathering?`;
  if (!context) return base;
  return `${base}\n\n${context} Tell me anything else you'd like to add, or ask me a question.`;
}

export function intentFromText(text: string): BookingIntent | undefined {
  const lower = text.toLowerCase();
  if (/\bhost|wedding|conference|celebrat|retreat\b/.test(lower)) return "host";
  if (/\battend|ticket|wine tasting|sip.?&.?paint|gathering\b/.test(lower)) return "attend";
  if (/\bstay|room|bedroom|visit|accommodation|night|nights\b/.test(lower)) return "stay";
  return undefined;
}

function parseIsoDate(day: number, month: number, year: number): string {
  const y = year < 100 ? 2000 + year : year;
  const m = String(month).padStart(2, "0");
  const d = String(day).padStart(2, "0");
  return `${y}-${m}-${d}`;
}

function addDays(iso: string, days: number): string {
  const dt = new Date(iso + "T12:00:00");
  dt.setDate(dt.getDate() + days);
  return dt.toISOString().slice(0, 10);
}

/** Parse natural-language stay dates e.g. "14th for 4 nights", "March 14 for four nights". */
export function parseStayDates(text: string): { checkIn?: string; checkOut?: string } {
  const lower = text.toLowerCase();
  const now = new Date();
  let year = now.getFullYear();

  const isoMatch = text.match(/\b(20\d{2})-(\d{2})-(\d{2})\b/);
  if (isoMatch) {
    const checkIn = `${isoMatch[1]}-${isoMatch[2]}-${isoMatch[3]}`;
    const nightsMatch = lower.match(/(\d+)\s*nights?/);
    if (nightsMatch) {
      return { checkIn, checkOut: addDays(checkIn, parseInt(nightsMatch[1], 10)) };
    }
    return { checkIn };
  }

  const months: Record<string, number> = {
    jan: 1, january: 1, feb: 2, february: 2, mar: 3, march: 3, apr: 4, april: 4,
    may: 5, jun: 6, june: 6, jul: 7, july: 7, aug: 8, august: 8, sep: 9, september: 9,
    oct: 10, october: 10, nov: 11, november: 11, dec: 12, december: 12,
  };

  let month = now.getMonth() + 1;
  for (const [name, num] of Object.entries(months)) {
    if (lower.includes(name)) {
      month = num;
      break;
    }
  }

  const dayMatch = lower.match(/\b(\d{1,2})(?:st|nd|rd|th)?\b/);
  const nightsMatch = lower.match(/(\d+|one|two|three|four|five|six|seven|eight|nine|ten)\s*nights?/);
  const wordNights: Record<string, number> = {
    one: 1, two: 2, three: 3, four: 4, five: 5, six: 6, seven: 7, eight: 8, nine: 9, ten: 10,
  };

  if (dayMatch) {
    const day = parseInt(dayMatch[1], 10);
    const checkIn = parseIsoDate(day, month, year);
    if (nightsMatch) {
      const n = wordNights[nightsMatch[1]] ?? parseInt(nightsMatch[1], 10);
      if (!Number.isNaN(n)) {
        return { checkIn, checkOut: addDays(checkIn, n) };
      }
    }
    return { checkIn };
  }

  return {};
}

export function extractSlotsFromMessage(
  text: string,
  form: FormState,
  intent: BookingIntent
): { patch: FormStatePatch; intent?: BookingIntent } {
  const patch: FormStatePatch = {};
  let nextIntent = intentFromText(text) ?? intent;

  const email = text.match(/[\w.+-]+@[\w.-]+\.\w+/)?.[0];
  if (email) patch.email = email;

  const phone = text.match(/\+?\d[\d\s-]{7,}/)?.[0]?.trim();
  if (phone) patch.phone = phone;

  if (!form.firstName && !email) {
    const parts = text.trim().split(/\s+/);
    if (parts.length >= 2 && !/\d/.test(parts[0])) {
      patch.firstName = parts[0];
      if (parts.length > 1 && !parts[1].includes("@")) {
        patch.lastName = parts.slice(1).join(" ");
      }
    }
  }

  const guestMatch = text.match(/\b(\d+)\s*(guests?|people|pax|of us)\b/i);
  if (guestMatch) patch.guests = guestMatch[1];

  const ticketMatch = text.match(/\b(\d+)\s*tickets?\b/i);
  if (ticketMatch) patch.tickets = ticketMatch[1];

  if (nextIntent === "stay" || intent === "stay") {
    const dates = parseStayDates(text);
    if (dates.checkIn) patch.checkIn = dates.checkIn;
    if (dates.checkOut) patch.checkOut = dates.checkOut;

    if (/whole estate|all 6|6 bedroom/i.test(text)) patch.space = "Whole estate";
    else if (/(\d)\s*bedroom/i.test(text)) {
      const n = text.match(/(\d)\s*bedroom/i)?.[1];
      if (n) patch.space = `${n} bedroom${n === "1" ? "" : "s"}`;
    }
  }

  if (nextIntent === "host" || intent === "host") {
    if (/\bwedding\b/i.test(text)) patch.eventType = "Wedding";
    else if (/\bconference\b/i.test(text)) patch.eventType = "Conference";
    else if (/\bretreat\b/i.test(text)) patch.eventType = "Retreat";
    else if (/\bcelebrat/i.test(text)) patch.eventType = "Intimate celebration";

    const dates = parseStayDates(text);
    if (dates.checkIn) patch.eventDate = dates.checkIn;

    const head = text.match(/\b(\d+)\s*(guests?|people)\b/i);
    if (head) {
      const n = parseInt(head[1], 10);
      patch.headcount = n <= 20 ? "1–20" : n <= 50 ? "21–50" : n <= 100 ? "51–100" : "100+";
    }
  }

  if (nextIntent === "attend" || intent === "attend") {
    if (/wine tasting/i.test(text)) patch.event = "Wine tasting evening";
    else if (/sip.?&.?paint/i.test(text)) patch.event = "Sip & paint";
    else if (/open day/i.test(text)) patch.event = "Estate open day";
  }

  return { patch, intent: nextIntent !== intent ? nextIntent : intentFromText(text) };
}

export function buildMockReply(
  text: string,
  form: FormState,
  intent: BookingIntent
): string {
  const missing = getMissingFieldLabels(form, intent);

  if (missing.length === 0) {
    return "I have everything I need. When you're ready, tap Review & send enquiry below — nothing is booked until you confirm.";
  }

  const detected = intentFromText(text);
  if (detected && !form.checkIn && !form.eventDate && !form.event) {
    if (detected === "stay") {
      return "Wonderful — a stay with us. What dates are you thinking? You can say something like \"14 March for 4 nights\".";
    }
    if (detected === "host") {
      return "I'd love to help you host. What kind of event is it, and when are you hoping to hold it?";
    }
    return "Lovely — which gathering interests you, and how many tickets would you like?";
  }

  const next = missing[0];
  const prompts: Record<string, string> = {
    "Check-in date": "When would you like to arrive? A date like \"14th for 4 nights\" works perfectly.",
    "Check-out date": "And when are you planning to leave?",
    "Number of guests": "How many guests will be joining you?",
    Space: "Would you like a bedroom, several rooms, or the whole estate?",
    Date: "What date works for you?",
    "Event type": "What kind of event are you planning?",
    "Guest count": "Roughly how many guests are you expecting?",
    Event: "Which gathering would you like to join?",
    Tickets: "How many tickets would you like?",
    "First name": "May I have your first name?",
    "Last name": "And your surname?",
    Email: "What's the best email for our team to reach you?",
    Phone: "A phone number helps us reach you quickly — what works best?",
  };

  const captured = getCapturedFieldLabels(form, intent);
  if (captured.length > 0) {
    const latest = captured[captured.length - 1];
    return `Got it — I've noted ${latest.label.toLowerCase()}: ${latest.value}. ${prompts[next] ?? `Could you share your ${next.toLowerCase()}?`}`;
  }

  return prompts[next] ?? `Could you tell me your ${next.toLowerCase()}?`;
}

/** Client-side mock — simulates network + optional streaming. */
export async function mockSahwiraChat(
  messages: { role: "user" | "assistant"; content: string }[],
  form: FormState,
  intent: BookingIntent,
  onToken?: (partial: string) => void
): Promise<{ reply: string; patch: FormStatePatch; intent?: BookingIntent }> {
  const lastUser = [...messages].reverse().find((m) => m.role === "user")?.content ?? "";
  const { patch, intent: detectedIntent } = extractSlotsFromMessage(lastUser, form, intent);
  const merged = mergeFormPatch(form, patch);
  const activeIntent = detectedIntent ?? intent;
  const reply = buildMockReply(lastUser, merged, activeIntent);

  if (onToken) {
    const words = reply.split(" ");
    let acc = "";
    for (let i = 0; i < words.length; i++) {
      acc += (i === 0 ? "" : " ") + words[i];
      onToken(acc);
      await new Promise((r) => setTimeout(r, 18));
    }
  } else {
    await new Promise((r) => setTimeout(r, 400));
  }

  return { reply, patch, intent: detectedIntent };
}

export { intentLabel };
