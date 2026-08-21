/**
 * Shared types & helpers for multi-destination booking planners.
 * Final tariffs are always confirmed when you book with Musasa.
 */
export const BOOKING_PRICING_NOTE =
  "Rates shown are indicative (public / typical retail tiers) for planning only. Final pricing is confirmed when you book with Musasa.";

export type GuestTier = "zimbabwe" | "sadc" | "international";

export type ActivityCategory =
  | "falls"
  | "adventure"
  | "wildlife"
  | "aerial"
  | "cruise"
  | "cultural"
  | "daytrip"
  | "city"
  | "beach"
  | "wine"
  | "safari"
  | "desert"
  | "island";

export interface ActivityDef {
  id: string;
  name: string;
  short: string;
  category: ActivityCategory;
  /** Zimbabwe resident–style tier (often ZWL or USD resident rate at gate) */
  zimUsd: number;
  /** SADC passport holders at published SADC tier where applicable */
  sadcUsd: number;
  /** General international visitor */
  intlUsd: number;
}

export function priceForTier(a: ActivityDef, tier: GuestTier): number {
  if (tier === "zimbabwe") return a.zimUsd;
  if (tier === "sadc") return a.sadcUsd;
  return a.intlUsd;
}

export function formatDualPrice(a: ActivityDef): string {
  return `Resident-style ~$${a.zimUsd} · Regional ~$${a.sadcUsd} · International ~$${a.intlUsd}`;
}

export function formatGuestPrice(a: ActivityDef, tier: GuestTier): string {
  const t =
    tier === "zimbabwe" ? "Zimbabwe resident" : tier === "sadc" ? "SADC visitor" : "International visitor";
  return `${t}: ~$${priceForTier(a, tier)}`;
}

export type StayTier = "iconic" | "lodge" | "hotel" | "guesthouse";

export interface AccommodationDef {
  id: string;
  name: string;
  area: string;
  tier: StayTier;
  /** Rough positioning only */
  fromUsd: number;
  blurb: string;
}

export const CUSTOM_ACCOMMODATION_ID = "custom-budget";

/** Guest wants Musasa to propose stays — no specific property picked */
export const OPEN_STAY_ID = "open-stay";

export function getActivityByIdIn(activities: ActivityDef[], id: string): ActivityDef | undefined {
  return activities.find((a) => a.id === id);
}

export function getAccommodationByIdIn(accommodations: AccommodationDef[], id: string): AccommodationDef | undefined {
  return accommodations.find((a) => a.id === id);
}
