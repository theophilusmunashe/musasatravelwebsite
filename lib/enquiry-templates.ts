import type { CartItem } from "@/lib/cartStore";
import {
  BOOKING_PRICING_NOTE,
  CUSTOM_ACCOMMODATION_ID,
  OPEN_STAY_ID,
  type GuestTier,
  getAccommodationByIdIn,
  getActivityByIdIn,
} from "@/lib/bookings-data";
import {
  BOOKING_DESTINATIONS,
  formatGuestPriceForDestination,
  guestTierTitleForDestination,
  type BookingDestination,
  type BookingDestinationId,
} from "@/lib/booking-destinations";

export type EnquiryFormData = {
  /** Selected planner destination — drives activities, stays, and copy */
  destinationId?: BookingDestinationId;
  service?: string;
  accommodation?: string;
  activities?: string[];
  /** New planner: selected activity ids */
  activityIds?: string[];
  guestTier?: GuestTier;
  accommodationId?: string;
  accommodationBudget?: string;
  /** True when guest has not locked activities/stay but still wants contact */
  stillExploring?: boolean;
  tourGuide?: string;
  transfers?: string;
  startDate?: string;
  endDate?: string;
  travelers?: string;
  firstName?: string;
  lastName?: string;
  email?: string;
  phone?: string;
  specialRequests?: string;
};

function formatDate(d?: string) {
  if (!d) return "";
  const dt = new Date(d);
  if (Number.isNaN(dt.getTime())) return d;
  return dt.toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" });
}

function uniqStrings(items: (string | undefined | null)[]) {
  const out: string[] = [];
  const seen = new Set<string>();
  for (const raw of items) {
    const v = (raw ?? "").trim();
    if (!v) continue;
    const k = v.toLowerCase();
    if (seen.has(k)) continue;
    seen.add(k);
    out.push(v);
  }
  return out;
}

function resolveDestination(formData?: EnquiryFormData): BookingDestination {
  const id = formData?.destinationId;
  const d = id ? BOOKING_DESTINATIONS[id] : undefined;
  return d ?? BOOKING_DESTINATIONS["victoria-falls"];
}

function resolveAccommodationLine(formData: EnquiryFormData | undefined, dest: BookingDestination): string {
  const id = formData?.accommodationId?.trim();
  if (!id) return (formData?.accommodation ?? "").trim();
  if (id === OPEN_STAY_ID) return "Stay: open — Musasa to propose matching options";
  if (id === CUSTOM_ACCOMMODATION_ID) {
    const b = (formData?.accommodationBudget ?? "").trim();
    return b ? `Custom lodging budget: ${b}` : "Custom lodging budget (amount to be confirmed)";
  }
  const a = getAccommodationByIdIn(dest.accommodations, id);
  if (!a) return id;
  return `${a.name} — from ~$${a.fromUsd}/night (${a.area})`;
}

function resolveActivityLines(
  formData: EnquiryFormData | undefined,
  tier: GuestTier,
  cartItems: CartItem[],
  dest: BookingDestination
) {
  const fromIds = (formData?.activityIds ?? [])
    .map((id) => {
      const a = getActivityByIdIn(dest.activities, id);
      if (!a) return "";
      return `${a.name} — ${formatGuestPriceForDestination(a, tier, dest)}`;
    })
    .filter(Boolean);

  const cartActivityNames = cartItems.filter((i) => i.category === "activity").map((i) => i.name);

  return uniqStrings([...fromIds, ...(formData?.activities ?? []), ...cartActivityNames]);
}

export function buildEnquiryModel(cartItems: CartItem[], formData?: EnquiryFormData) {
  const dest = resolveDestination(formData);
  const tier: GuestTier = formData?.guestTier ?? "international";

  const activities = resolveActivityLines(formData, tier, cartItems, dest);

  const accommodationLine = resolveAccommodationLine(formData, dest);
  const accommodation = accommodationLine;

  const accommodationFromCart = cartItems.find((i) => i.category === "accommodation")?.name;
  const accommodationDisplay =
    accommodation || (accommodationFromCart ? `${accommodationFromCart} (from trip cart)` : "");

  const transfersFromCart = cartItems.find((i) => i.category === "transfer")?.name;
  const transfers = uniqStrings([formData?.transfers, transfersFromCart])[0] ?? "";

  const guideFromCart = cartItems.find((i) => i.category === "guide")?.name;
  const tourGuide = uniqStrings([formData?.tourGuide, guideFromCart])[0] ?? "";

  const service = (formData?.service ?? "").trim();
  const travelers = (formData?.travelers ?? "").trim();

  const guestName = `${formData?.firstName ?? ""} ${formData?.lastName ?? ""}`.trim();
  const email = (formData?.email ?? "").trim();
  const phone = (formData?.phone ?? "").trim();
  const specialRequests = (formData?.specialRequests ?? "").trim();

  const startDate = (formData?.startDate ?? "").trim();
  const endDate = (formData?.endDate ?? "").trim();

  return {
    guestName,
    email,
    phone,
    service,
    guestTier: tier,
    guestTierLabel: guestTierTitleForDestination(dest, tier),
    accommodation: accommodationDisplay,
    activities,
    tourGuide,
    transfers,
    startDate,
    endDate,
    travelers,
    specialRequests,
    cartItems,
    pricingNote: BOOKING_PRICING_NOTE,
    stillExploring: !!formData?.stillExploring,
    destinationLabel: dest.label,
    destinationRegion: dest.region,
    emailHtmlTitle: dest.emailHtmlTitle,
    emailSubjectName: dest.emailSubjectName,
  };
}

export function buildWhatsAppEnquiryMessage(cartItems: CartItem[], formData?: EnquiryFormData): string {
  const m = buildEnquiryModel(cartItems, formData);
  const lines: string[] = [];

  lines.push("NEW BOOKING / ENQUIRY — MUSASA TRAVEL");
  lines.push("-------------------------------------");
  lines.push(`Destination: ${m.destinationLabel} (${m.destinationRegion})`);
  lines.push("");

  if (m.guestName) lines.push(`Guest: ${m.guestName}`);
  if (m.email) lines.push(`Email: ${m.email}`);
  if (m.phone) lines.push(`Phone: ${m.phone}`);
  lines.push(`Pricing tier: ${m.guestTierLabel}`);
  if (m.startDate || m.endDate) lines.push(`Dates: ${formatDate(m.startDate)} → ${formatDate(m.endDate)}`.trim());
  if (m.travelers) lines.push(`Travellers: ${m.travelers}`);

  const preferenceLines: string[] = [];
  if (m.service) preferenceLines.push(`- Service focus: ${m.service}`);
  if (m.stillExploring) preferenceLines.push(`- Note: Still exploring — please advise on stays and experiences`);
  if (m.accommodation) preferenceLines.push(`- Stay: ${m.accommodation}`);
  if (m.activities.length > 0) preferenceLines.push(`- Activities:\n${m.activities.map((x) => `  - ${x}`).join("\n")}`);
  if (m.tourGuide) preferenceLines.push(`- Tour guide: ${m.tourGuide}`);
  if (m.transfers) preferenceLines.push(`- Transfers: ${m.transfers}`);

  if (preferenceLines.length > 0) {
    lines.push("");
    lines.push("TRIP PLAN");
    lines.push(...preferenceLines);
  }

  if (m.cartItems.length > 0) {
    lines.push("");
    lines.push("TRIP CART");
    m.cartItems.forEach((item) => {
      const qty = item.quantity > 1 ? ` (x${item.quantity})` : "";
      lines.push(`- [${item.category}] ${item.name}${qty} — ${item.price}`);
    });
  }

  if (m.specialRequests) {
    lines.push("");
    lines.push(`Special requests: ${m.specialRequests}`);
  }

  lines.push("");
  lines.push(`Note: ${m.pricingNote}`);
  lines.push("");
  lines.push("Please confirm availability and advise next steps. Thank you.");

  return lines.join("\n");
}

export function buildEnquiryEmailSubject(cartItems: CartItem[], formData?: EnquiryFormData) {
  const m = buildEnquiryModel(cartItems, formData);
  const who = m.guestName || m.email || m.phone || "Website enquiry";
  const when = m.startDate ? ` · ${formatDate(m.startDate)}` : "";
  return `New ${m.emailSubjectName} enquiry — ${who}${when}`;
}

export function buildEnquiryEmailText(cartItems: CartItem[], formData?: EnquiryFormData) {
  const m = buildEnquiryModel(cartItems, formData);
  const parts: string[] = [];
  parts.push("NEW BOOKING / ENQUIRY — MUSASA TRAVEL");
  parts.push("====================================");
  parts.push(`Destination: ${m.destinationLabel} (${m.destinationRegion})`);
  parts.push("");
  if (m.guestName) parts.push(`Guest: ${m.guestName}`);
  if (m.email) parts.push(`Email: ${m.email}`);
  if (m.phone) parts.push(`Phone: ${m.phone}`);
  parts.push(`Pricing tier: ${m.guestTierLabel}`);
  if (m.startDate || m.endDate) parts.push(`Dates: ${formatDate(m.startDate)} → ${formatDate(m.endDate)}`.trim());
  if (m.travelers) parts.push(`Travellers: ${m.travelers}`);
  parts.push("");
  parts.push("TRIP PLAN");
  parts.push("---------");
  if (m.service) parts.push(`Service focus: ${m.service}`);
  if (m.stillExploring) parts.push("Planning: Still exploring — please advise on stays and experiences");
  if (m.accommodation) parts.push(`Stay: ${m.accommodation}`);
  if (m.activities.length > 0) {
    parts.push("Activities:");
    for (const a of m.activities) parts.push(`  - ${a}`);
  }
  if (m.tourGuide) parts.push(`Tour guide: ${m.tourGuide}`);
  if (m.transfers) parts.push(`Transfers: ${m.transfers}`);
  parts.push("");
  parts.push("TRIP CART (if any)");
  parts.push("------------------");
  if (m.cartItems.length === 0) {
    parts.push("(none)");
  } else {
    for (const item of m.cartItems) {
      const qty = item.quantity > 1 ? ` (x${item.quantity})` : "";
      parts.push(`- ${item.category}: ${item.name}${qty} — ${item.price}`);
    }
  }
  if (m.specialRequests) {
    parts.push("");
    parts.push("SPECIAL REQUESTS");
    parts.push("----------------");
    parts.push(m.specialRequests);
  }
  parts.push("");
  parts.push(`Note: ${m.pricingNote}`);
  parts.push("");
  parts.push("Submitted from musasatravel.com bookings page.");
  return parts.join("\n");
}

export function buildEnquiryEmailHtml(cartItems: CartItem[], formData?: EnquiryFormData) {
  const m = buildEnquiryModel(cartItems, formData);
  const esc = (s: string) =>
    s
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;")
      .replaceAll("'", "&#039;");

  const kv = (label: string, value?: string) =>
    value
      ? `<div style="display:flex;gap:12px;padding:10px 0;border-bottom:1px solid #e5e7eb;">
          <div style="min-width:120px;color:#6b7280;font-size:12px;font-weight:700;text-transform:uppercase;letter-spacing:0.04em;">${esc(label)}</div>
          <div style="flex:1;color:#111827;font-size:14px;line-height:1.5;">${esc(value)}</div>
        </div>`
      : "";

  const activityBlock =
    m.activities.length === 0
      ? `<p style="margin:0;color:#6b7280;font-size:14px;">No activities selected in the planner.</p>`
      : `<ul style="margin:0;padding-left:18px;">${m.activities.map((a) => `<li style="margin:8px 0;color:#111827;font-size:14px;line-height:1.45;">${esc(a)}</li>`).join("")}</ul>`;

  const cartBlock =
    m.cartItems.length === 0
      ? `<p style="margin:0;color:#6b7280;font-size:14px;">(none)</p>`
      : `<ul style="margin:0;padding-left:18px;">${m.cartItems
          .map((item) => {
            const qty = item.quantity > 1 ? ` (×${item.quantity})` : "";
            return `<li style="margin:8px 0;color:#111827;font-size:14px;line-height:1.45;">${esc(`${item.category}: ${item.name}${qty} — ${item.price}`)}</li>`;
          })
          .join("")}</ul>`;

  return `
  <div style="background:#0f172a;padding:28px 12px;font-family:ui-sans-serif,system-ui,-apple-system,Segoe UI,Roboto,Helvetica,Arial;">
    <div style="max-width:640px;margin:0 auto;background:#ffffff;border-radius:20px;overflow:hidden;box-shadow:0 25px 50px rgba(0,0,0,0.25);">
      <div style="padding:22px 24px;background:linear-gradient(135deg,#0f172a 0%,#1e293b 55%,#b45309 180%);">
        <div style="color:#fbbf24;font-weight:800;font-size:11px;letter-spacing:0.14em;text-transform:uppercase;">New enquiry</div>
        <div style="color:#ffffff;font-size:22px;font-weight:900;margin-top:8px;line-height:1.15;">${esc(m.emailHtmlTitle)}</div>
        <div style="color:rgba(255,255,255,0.72);font-size:13px;margin-top:8px;line-height:1.5;">Musasa Travel &amp; Tours · bookings@musasatravel.com</div>
      </div>

      <div style="padding:22px 24px 26px;">
        <div style="border:1px solid #e5e7eb;border-radius:16px;padding:14px 16px;background:#fafafa;">
          ${kv("Destination", `${m.destinationLabel} — ${m.destinationRegion}`)}
          ${kv("Guest", m.guestName)}
          ${kv("Email", m.email)}
          ${kv("Phone", m.phone)}
          ${kv("Tier", m.guestTierLabel)}
          ${kv("Dates", (m.startDate || m.endDate) ? `${formatDate(m.startDate)} → ${formatDate(m.endDate)}`.trim() : "")}
          ${kv("Travellers", m.travelers)}
        </div>

        <div style="margin-top:18px;border:1px solid #fde68a;border-radius:16px;padding:16px 18px;background:linear-gradient(180deg,#fffbeb 0%,#ffffff 100%);">
          <div style="font-weight:900;color:#92400e;font-size:11px;letter-spacing:0.12em;text-transform:uppercase;">Trip plan</div>
          ${
            m.stillExploring
              ? `<p style="margin:10px 0 0;padding:10px 12px;border-radius:12px;background:#ede9fe;color:#5b21b6;font-size:13px;line-height:1.5;border:1px solid #ddd6fe;">
                  <strong>Still exploring</strong> — guest asked Musasa to advise on stays &amp; experiences.
                </p>`
              : ""
          }
          ${m.service ? `<p style="margin:10px 0 0;color:#111827;font-size:14px;"><span style="color:#92400e;font-weight:800;">Focus:</span> ${esc(m.service)}</p>` : ""}
          ${m.accommodation ? `<p style="margin:10px 0 0;color:#111827;font-size:14px;line-height:1.55;"><span style="color:#92400e;font-weight:800;">Stay:</span> ${esc(m.accommodation)}</p>` : ""}
          <div style="margin-top:12px;font-weight:800;color:#111827;font-size:13px;">Activities</div>
          <div style="margin-top:8px;">${activityBlock}</div>
          ${m.tourGuide ? `<p style="margin:12px 0 0;color:#111827;font-size:14px;"><span style="color:#92400e;font-weight:800;">Guide:</span> ${esc(m.tourGuide)}</p>` : ""}
          ${m.transfers ? `<p style="margin:8px 0 0;color:#111827;font-size:14px;"><span style="color:#92400e;font-weight:800;">Transfers:</span> ${esc(m.transfers)}</p>` : ""}
        </div>

        <div style="margin-top:18px;border:1px solid #e5e7eb;border-radius:16px;padding:16px 18px;">
          <div style="font-weight:900;color:#0f172a;font-size:11px;letter-spacing:0.12em;text-transform:uppercase;">Trip cart</div>
          <div style="margin-top:10px;">${cartBlock}</div>
        </div>

        ${
          m.specialRequests
            ? `
        <div style="margin-top:18px;border:1px solid #e5e7eb;border-radius:16px;padding:16px 18px;background:#f8fafc;">
          <div style="font-weight:900;color:#0f172a;font-size:11px;letter-spacing:0.12em;text-transform:uppercase;">Special requests</div>
          <div style="margin-top:10px;color:#111827;font-size:14px;line-height:1.6;white-space:pre-wrap;">${esc(m.specialRequests)}</div>
        </div>`
            : ""
        }

        <div style="margin-top:18px;padding:14px 16px;border-radius:14px;background:#0f172a;color:rgba(255,255,255,0.88);font-size:12px;line-height:1.55;">
          <span style="color:#fbbf24;font-weight:900;">Note:</span> ${esc(m.pricingNote)}
        </div>

        <div style="margin-top:16px;color:#64748b;font-size:12px;line-height:1.5;">
          Submitted from the Musasa Travel website · ${esc(new Date().toISOString())}
        </div>
      </div>
    </div>
  </div>
  `.trim();
}
