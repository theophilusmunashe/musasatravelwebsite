import { groq } from "next-sanity";
import { client } from "@/sanity/lib/client";

export type TravelPackageRegion =
  | "zimbabwe"
  | "southern-africa"
  | "beach"
  | "luxury";

export interface TravelPackage {
  id: string;
  slug: string;
  name: string;
  tagline: string;
  region: TravelPackageRegion;
  image: string;
  imageAlt: string;
  days: number;
  destinations: string[];
  groupSize: string;
  badge?: string;
  includes: string[];
  highlights: string[];
  description: string;
  pricing?: string;
  pricingNote?: string;
  rating: number;
  displayOrder: number;
}

const fetchOptions = { next: { revalidate: 300, tags: ["travel-packages"] } };

const packageProjection = groq`{
  "id": slug.current,
  "slug": slug.current,
  name,
  tagline,
  region,
  "image": image.asset->url,
  "imageAlt": coalesce(image.alt, name),
  days,
  destinations,
  groupSize,
  badge,
  includes,
  highlights,
  description,
  pricing,
  pricingNote,
  "rating": coalesce(rating, 4.9),
  displayOrder
}`;

const listQuery = groq`
  *[_type == "travelPackage" && defined(slug.current)] | order(displayOrder asc, name asc)
  ${packageProjection}
`;

const bySlugQuery = groq`
  *[_type == "travelPackage" && slug.current == $slug][0]
  ${packageProjection}
`;

const slugsQuery = groq`
  *[_type == "travelPackage" && defined(slug.current)]{ "slug": slug.current }
`;

function isTravelPackage(value: unknown): value is TravelPackage {
  if (!value || typeof value !== "object") return false;
  const v = value as Record<string, unknown>;
  return typeof v.id === "string" && typeof v.name === "string" && typeof v.image === "string";
}

export async function getTravelPackages(): Promise<TravelPackage[]> {
  try {
    const rows = await client.fetch<unknown[]>(listQuery, {}, fetchOptions);
    return (rows ?? []).filter(isTravelPackage);
  } catch (error) {
    console.error("Failed to fetch travel packages:", error);
    return [];
  }
}

export async function getTravelPackageBySlug(
  slug: string
): Promise<TravelPackage | null> {
  try {
    const row = await client.fetch<unknown>(bySlugQuery, { slug }, fetchOptions);
    return isTravelPackage(row) ? row : null;
  } catch (error) {
    console.error("Failed to fetch travel package:", error);
    return null;
  }
}

export async function getTravelPackageSlugs(): Promise<string[]> {
  try {
    const rows = await client.fetch<{ slug?: string }[]>(slugsQuery, {}, fetchOptions);
    return (rows ?? []).map((r) => r.slug).filter((s): s is string => Boolean(s));
  } catch {
    return [];
  }
}

export function parseTravelPackage(value: unknown): TravelPackage | null {
  return isTravelPackage(value) ? value : null;
}

export function packageHasPricing(pkg: Pick<TravelPackage, "pricing" | "pricingNote">): boolean {
  return Boolean(pkg.pricing?.trim() || pkg.pricingNote?.trim());
}

export function packagePriceLabel(pkg: Pick<TravelPackage, "pricing">): string {
  return pkg.pricing?.trim() || "Price on request";
}

export { listQuery, bySlugQuery };

export async function getRelatedTravelPackages(
  slug: string,
  region: TravelPackageRegion,
  limit = 3
): Promise<TravelPackage[]> {
  const all = await getTravelPackages();
  return all.filter((p) => p.slug !== slug && p.region === region).slice(0, limit);
}
