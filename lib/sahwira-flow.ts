import {
  SAHWIRA_GREETING,
  SAHWIRA_NAME,
  type SahwiraCollected,
  type SahwiraMessage,
} from "./sahwira";

function lastUserMessage(messages: SahwiraMessage[]) {
  return [...messages].reverse().find((m) => m.role === "user")?.content.trim() ?? "";
}

function parseIntent(text: string): SahwiraCollected["intent"] | undefined {
  const lower = text.toLowerCase();
  if (/\bhost|wedding|conference|celebrat|event\b/.test(lower)) return "host";
  if (/\battend|ticket|wine tasting|sip.?&.?paint|gathering\b/.test(lower)) return "attend";
  if (/\bstay|room|bedroom|visit|accommodation\b/.test(lower)) return "stay";
  return undefined;
}

function hasContact(collected: SahwiraCollected) {
  return Boolean(collected.firstName && collected.email);
}

function readyToSubmit(collected: SahwiraCollected) {
  if (!collected.intent || !hasContact(collected)) return false;
  if (collected.intent === "stay") {
    return Boolean(collected.checkIn && collected.guests);
  }
  if (collected.intent === "host") {
    return Boolean(collected.eventDate && collected.eventType);
  }
  return Boolean(collected.event || collected.eventDate);
}

export function runSahwiraFlow(
  messages: SahwiraMessage[],
  collected: SahwiraCollected
): { reply: string; collected: SahwiraCollected; readyToSubmit: boolean } {
  const next = { ...collected };

  if (messages.length === 0) {
    return { reply: SAHWIRA_GREETING, collected: next, readyToSubmit: false };
  }

  const latest = lastUserMessage(messages);

  if (!next.intent) {
    const intent = parseIntent(latest);
    if (intent) {
      next.intent = intent;
      if (intent === "stay") {
        return {
          reply:
            "Wonderful — a stay with us. What dates are you thinking? Share check-in and check-out if you can.",
          collected: next,
          readyToSubmit: false,
        };
      }
      if (intent === "host") {
        return {
          reply:
            "I'd love to help you host. What kind of event is it, and do you have a date in mind?",
          collected: next,
          readyToSubmit: false,
        };
      }
      return {
        reply:
          "Lovely — which gathering interests you, or do you have a preferred date for an upcoming event?",
        collected: next,
        readyToSubmit: false,
      };
    }
    return {
      reply:
        "I can help with all three — would you like to stay, host an event, or attend one of our gatherings?",
      collected: next,
      readyToSubmit: false,
    };
  }

  if (next.intent === "stay") {
    if (!next.checkIn && /\d{4}-\d{2}-\d{2}|\d{1,2}[\/\-]\d{1,2}/.test(latest)) {
      next.checkIn = latest;
    }
    if (next.checkIn && !next.checkOut && messages.filter((m) => m.role === "user").length >= 2) {
      const dates = latest.match(/\d{4}-\d{2}-\d{2}/g);
      if (dates?.[1]) next.checkOut = dates[1];
      else if (latest.length > 3 && !next.guests) next.checkOut = latest;
    }
    if (!next.guests && /\d+|guest|people|couple|family/i.test(latest) && next.checkIn) {
      next.guests = latest;
    }
    if (!next.space && next.guests && /bedroom|estate|whole|room/i.test(latest)) {
      next.space = latest;
    }
    if (!next.guests) {
      return {
        reply: "How many guests will be joining you?",
        collected: next,
        readyToSubmit: false,
      };
    }
    if (!next.space) {
      return {
        reply:
          "Would you like a single bedroom, several rooms, or the whole estate?",
        collected: next,
        readyToSubmit: false,
      };
    }
  }

  if (next.intent === "host") {
    if (!next.eventType) next.eventType = latest;
    if (next.eventType && !next.eventDate) {
      if (/\d{4}-\d{2}-\d{2}|\d{1,2}[\/\-]\d{1,2}|jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec/i.test(latest)) {
        next.eventDate = latest;
      } else {
        return {
          reply: "When are you hoping to hold the event?",
          collected: next,
          readyToSubmit: false,
        };
      }
    }
    if (!next.headcount && /\d+|guest|people/i.test(latest)) {
      next.headcount = latest;
    }
    if (!next.headcount) {
      return {
        reply: "Roughly how many guests are you expecting?",
        collected: next,
        readyToSubmit: false,
      };
    }
  }

  if (next.intent === "attend") {
    if (!next.event) next.event = latest;
    if (!next.tickets && /\d+|ticket|people/i.test(latest)) {
      next.tickets = latest;
    }
    if (!next.tickets) {
      return {
        reply: "How many tickets would you like?",
        collected: next,
        readyToSubmit: false,
      };
    }
  }

  if (!next.firstName && !next.email) {
    if (/@/.test(latest)) {
      next.email = latest.match(/[\w.+-]+@[\w.-]+\.\w+/)?.[0] ?? latest;
    } else if (!next.firstName && latest.split(" ").length >= 1) {
      const parts = latest.trim().split(/\s+/);
      next.firstName = parts[0];
      if (parts[1]) next.lastName = parts.slice(1).join(" ");
    }
    if (!next.email) {
      return {
        reply: "Almost there — may I have your name and email so our team can reply?",
        collected: next,
        readyToSubmit: false,
      };
    }
  }

  if (!next.phone && /\+?\d[\d\s-]{7,}/.test(latest)) {
    next.phone = latest;
  }

  if (!next.phone && next.email && !next.message) {
    return {
      reply: "A phone number helps us reach you quickly — what works best?",
      collected: next,
      readyToSubmit: false,
    };
  }

  if (!next.message && next.phone) {
    next.message = latest.length > 10 ? latest : `Enquiry via ${SAHWIRA_NAME} concierge`;
  }

  const submit = readyToSubmit(next);
  if (submit) {
    return {
      reply: `Thank you — I have everything I need. Tap "Send enquiry" below and our team will reply within one business day with availability and next steps.`,
      collected: next,
      readyToSubmit: true,
    };
  }

  return {
    reply: "Tell me a little more about what you're planning, and I'll guide you from here.",
    collected: next,
    readyToSubmit: false,
  };
}
