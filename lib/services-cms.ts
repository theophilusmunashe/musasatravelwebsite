import { groq } from "next-sanity";
import { client } from "@/sanity/lib/client";
import { safeUrlSlug } from "@/lib/safe-slug";

const fetchOptions = { next: { revalidate: 300, tags: ["services-cms"] } };

async function fetchList<T>(query: string): Promise<T[]> {
  try {
    const rows = await client.fetch<T[]>(query, {}, fetchOptions);
    return rows ?? [];
  } catch (error) {
    console.error("Sanity services fetch failed:", error);
    return [];
  }
}

async function fetchOne<T>(query: string, slug: string): Promise<T | null> {
  try {
    return (await client.fetch<T | null>(query, { slug }, fetchOptions)) ?? null;
  } catch (error) {
    console.error("Sanity services fetch failed:", error);
    return null;
  }
}

export type ActivityCategory = "adventure" | "wildlife" | "culture" | "water" | "aerial";

export interface ServiceActivity {
  id: string;
  name: string;
  tagline: string;
  category: ActivityCategory;
  image: string;
  gallery: string[];
  duration: string;
  groupSize: string;
  price: string;
  priceNum: number;
  rating: number;
  reviews: number;
  difficulty: { label: string; color: string };
  highlights: string[];
  description: string;
  badge?: string;
}

export type StayCategory =
  | "musasa"
  | "luxury"
  | "safari-lodge"
  | "eco-lodge"
  | "boutique"
  | "resort";

export interface ServiceStay {
  id: string;
  name: string;
  tagline: string;
  category: StayCategory;
  image: string;
  gallery: string[];
  location: string;
  country: string;
  price: string;
  priceNum: number;
  rating: number;
  reviews: number;
  nights: string;
  guests: string;
  badge?: string;
  amenities: string[];
  highlights: string[];
  description: string;
}

export interface ServiceItinerary {
  id: string;
  name: string;
  tagline: string;
  image: string;
  gallery: string[];
  days: number;
  filter: "short" | "medium" | "extended";
  destinations: string[];
  price: string;
  priceNum: number;
  groupSize: string;
  badge?: string;
  highlights: string[];
  description: string;
}

export interface ServiceGuide {
  id: string;
  name: string;
  role: string;
  specialty: "wildlife" | "adventure" | "culture";
  image: string;
  gallery: string[];
  experience: string;
  languages: string[];
  rating: number;
  reviews: number;
  badge?: string;
  certifications: string[];
  highlights: string[];
  bio: string;
}

export interface ServiceTransfer {
  id: string;
  name: string;
  tagline: string;
  type: "airport" | "cross-border" | "private" | "group";
  image: string;
  gallery: string[];
  price: string;
  priceNum: number;
  duration: string;
  capacity: string;
  badge?: string;
  amenities: string[];
  routes: string[];
  highlights: string[];
  description: string;
}

const activityProjection = groq`{
  "id": slug.current,
  name, tagline, category,
  "image": image.asset->url,
  "gallery": coalesce(gallery[].asset->url, []),
  duration, groupSize, price, priceNum,
  "rating": coalesce(rating, 4.9),
  "reviews": coalesce(reviews, 0),
  "difficulty": {
    "label": coalesce(difficultyLabel, "Easy"),
    "color": coalesce(difficultyColor, "text-green-400")
  },
  "highlights": coalesce(highlights, []),
  description, badge
}`;

const stayProjection = groq`{
  "id": slug.current,
  name, tagline, category,
  "image": image.asset->url,
  "gallery": coalesce(gallery[].asset->url, []),
  location, country, price, priceNum,
  "rating": coalesce(rating, 4.9),
  "reviews": coalesce(reviews, 0),
  nights, guests, badge,
  "amenities": coalesce(amenities, []),
  "highlights": coalesce(highlights, []),
  description
}`;

const itineraryProjection = groq`{
  "id": slug.current,
  name, tagline,
  "image": image.asset->url,
  "gallery": coalesce(gallery[].asset->url, []),
  days, filter,
  "destinations": coalesce(destinations, []),
  price, priceNum, groupSize, badge,
  "highlights": coalesce(highlights, []),
  description
}`;

const guideProjection = groq`{
  "id": slug.current,
  name, role, specialty,
  "image": image.asset->url,
  "gallery": coalesce(gallery[].asset->url, []),
  experience,
  "languages": coalesce(languages, []),
  "rating": coalesce(rating, 4.9),
  "reviews": coalesce(reviews, 0),
  badge,
  "certifications": coalesce(certifications, []),
  "highlights": coalesce(highlights, []),
  bio
}`;

const transferProjection = groq`{
  "id": slug.current,
  name, tagline, type,
  "image": image.asset->url,
  "gallery": coalesce(gallery[].asset->url, []),
  price, priceNum, duration, capacity, badge,
  "amenities": coalesce(amenities, []),
  "routes": coalesce(routes, []),
  "highlights": coalesce(highlights, []),
  description
}`;

export const getActivities = () =>
  fetchList<ServiceActivity>(
    groq`*[_type == "activity" && defined(slug.current) && defined(image.asset)] | order(displayOrder asc, name asc) ${activityProjection}`
  );

function withSafeStayId(stay: ServiceStay): ServiceStay {
  return { ...stay, id: safeUrlSlug(stay.id) || stay.id };
}

export const getStays = async () => {
  const rows = await fetchList<ServiceStay>(
    groq`*[_type == "stay" && defined(slug.current) && defined(image.asset)] | order(displayOrder asc, name asc) ${stayProjection}`
  );
  return rows.map(withSafeStayId);
};

export const getStayBySlug = async (slug: string) => {
  const want = safeUrlSlug(slug);
  if (!want) return null;
  const exact = await fetchOne<ServiceStay>(
    groq`*[_type == "stay" && slug.current == $slug && defined(image.asset)][0] ${stayProjection}`,
    slug
  );
  if (exact && safeUrlSlug(exact.id) === want) return withSafeStayId(exact);
  const all = await getStays();
  return all.find((s) => s.id === want) ?? null;
};

export const getStaySlugs = async () => {
  const rows = await fetchList<{ id: string }>(
    groq`*[_type == "stay" && defined(slug.current)]{ "id": slug.current }`
  );
  return [...new Set(rows.map((r) => safeUrlSlug(r.id)).filter(Boolean))];
};

export const getItineraries = () =>
  fetchList<ServiceItinerary>(
    groq`*[_type == "itinerary" && defined(slug.current) && defined(image.asset)] | order(displayOrder asc, name asc) ${itineraryProjection}`
  );

export const getGuides = () =>
  fetchList<ServiceGuide>(
    groq`*[_type == "tourGuide" && defined(slug.current) && defined(image.asset)] | order(displayOrder asc, name asc) ${guideProjection}`
  );

export const getTransfers = () =>
  fetchList<ServiceTransfer>(
    groq`*[_type == "transfer" && defined(slug.current) && defined(image.asset)] | order(displayOrder asc, name asc) ${transferProjection}`
  );
