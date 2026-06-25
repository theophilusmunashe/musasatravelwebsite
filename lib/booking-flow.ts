import type { BookingIntent } from "@/lib/estate-tokens";

export type FormState = {
  checkIn: string;
  checkOut: string;
  guests: string;
  space: string;
  eventDate: string;
  eventType: string;
  headcount: string;
  event: string;
  tickets: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  message: string;
};

export const emptyForm: FormState = {
  checkIn: "",
  checkOut: "",
  guests: "",
  space: "",
  eventDate: "",
  eventType: "",
  headcount: "",
  event: "",
  tickets: "",
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  message: "",
};

export type BookingStep = {
  id: keyof FormState | "confirm";
  label: string;
  field?: keyof FormState;
  type?: string;
  options?: string[];
};

export type BookingLane = "chat" | "manual";

export const BOOKING_INTENTS: {
  id: BookingIntent;
  label: string;
  short: string;
  word: string;
}[] = [
  { id: "stay", label: "Stay with us", short: "Stay", word: "stay" },
  { id: "host", label: "Host an event", short: "Host", word: "host" },
  { id: "attend", label: "Attend a gathering", short: "Attend", word: "gathering" },
];

export function parseIntent(value: string | null): BookingIntent {
  if (value === "host" || value === "attend") return value;
  return "stay";
}

export function hasExplicitUrlIntent(value: string | null): value is BookingIntent {
  return value === "stay" || value === "host" || value === "attend";
}

export function parseLane(value: string | null): BookingLane {
  if (value === "manual") return "manual";
  return "chat";
}

export function stepsForIntent(intent: BookingIntent): BookingStep[] {
  const contact: BookingStep[] = [
    { id: "firstName", label: "First name", field: "firstName", type: "text" },
    { id: "lastName", label: "Last name", field: "lastName", type: "text" },
    { id: "email", label: "Email", field: "email", type: "email" },
    { id: "phone", label: "Phone", field: "phone", type: "tel" },
    { id: "message", label: "Anything else we should know?", field: "message", type: "textarea" },
  ];

  if (intent === "stay") {
    return [
      { id: "checkIn", label: "Check-in date", field: "checkIn", type: "date" },
      { id: "checkOut", label: "Check-out date", field: "checkOut", type: "date" },
      { id: "guests", label: "Number of guests", field: "guests", type: "select", options: ["1–4", "5–8", "9–12", "12+"] },
      {
        id: "space",
        label: "Space required",
        field: "space",
        type: "select",
        options: ["1 bedroom", "2 bedrooms", "3 bedrooms", "4 bedrooms", "5 bedrooms", "All 6 bedrooms", "Whole estate"],
      },
      ...contact,
    ];
  }

  if (intent === "host") {
    return [
      { id: "eventDate", label: "Event date", field: "eventDate", type: "date" },
      {
        id: "eventType",
        label: "Type of event",
        field: "eventType",
        type: "select",
        options: ["Wedding", "Conference", "Retreat", "Intimate celebration", "Private dining", "Other"],
      },
      {
        id: "space",
        label: "Preferred space",
        field: "space",
        type: "select",
        options: ["Garden & boma", "Main house", "Pool terrace", "Whole estate", "Not sure yet"],
      },
      { id: "headcount", label: "Expected guests", field: "headcount", type: "select", options: ["1–20", "21–50", "51–100", "100+"] },
      ...contact,
    ];
  }

  return [
    {
      id: "event",
      label: "Which event?",
      field: "event",
      type: "select",
      options: ["Wine tasting evening", "Sip & paint", "Estate open day", "Other upcoming event"],
    },
    { id: "tickets", label: "Number of tickets", field: "tickets", type: "select", options: ["1", "2", "3–5", "6–10", "10+"] },
    { id: "eventDate", label: "Preferred date", field: "eventDate", type: "date" },
    ...contact,
  ];
}

export function makeReference() {
  return `KE-${Date.now().toString(36).toUpperCase()}`;
}

export function intentLabel(intent: BookingIntent) {
  if (intent === "host") return "Host an event";
  if (intent === "attend") return "Attend an event";
  return "Stay with us";
}

export function intentWord(intent: BookingIntent) {
  return BOOKING_INTENTS.find((i) => i.id === intent)?.word ?? "visit";
}

export function buildSummary(form: FormState, intent: BookingIntent) {
  const lines: string[] = [`Intent: ${intentLabel(intent)}`];
  if (intent === "stay") {
    if (form.checkIn) lines.push(`Check-in: ${form.checkIn}`);
    if (form.checkOut) lines.push(`Check-out: ${form.checkOut}`);
    if (form.guests) lines.push(`Guests: ${form.guests}`);
    if (form.space) lines.push(`Space: ${form.space}`);
  } else if (intent === "host") {
    if (form.eventDate) lines.push(`Date: ${form.eventDate}`);
    if (form.eventType) lines.push(`Event: ${form.eventType}`);
    if (form.space) lines.push(`Space: ${form.space}`);
    if (form.headcount) lines.push(`Guests: ${form.headcount}`);
  } else {
    if (form.event) lines.push(`Event: ${form.event}`);
    if (form.tickets) lines.push(`Tickets: ${form.tickets}`);
    if (form.eventDate) lines.push(`Date: ${form.eventDate}`);
  }
  return lines;
}

export const MAP_LINK = "https://maps.google.com/?q=Victoria+Falls,Zimbabwe";

export function buildSubmitPayload(form: FormState, intent: BookingIntent) {
  return {
    intent,
    service: intentLabel(intent),
    accommodation: intent === "stay" ? form.space : form.space || "N/A",
    activities:
      intent === "attend"
        ? [form.event].filter(Boolean)
        : intent === "host"
          ? [form.eventType].filter(Boolean)
          : [],
    tourGuide: "N/A",
    transfers: "N/A",
    startDate: form.checkIn || form.eventDate,
    endDate: form.checkOut || form.eventDate,
    travelers: form.guests || form.headcount || form.tickets,
    firstName: form.firstName,
    lastName: form.lastName,
    email: form.email,
    phone: form.phone,
    specialRequests: form.message,
  };
}
