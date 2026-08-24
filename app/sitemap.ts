import { MetadataRoute } from "next";
import { getTravelPackageSlugs } from "@/lib/travel-packages";
import { getStaySlugs } from "@/lib/services-cms";

const BASE_URL =
  process.env.NEXT_PUBLIC_BASE_URL || "https://www.musasatravelandtours.com";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  let packageEntries: MetadataRoute.Sitemap = [];
  let stayEntries: MetadataRoute.Sitemap = [];

  try {
    const slugs = await getTravelPackageSlugs();
    packageEntries = slugs.map((slug) => ({
      url: `${BASE_URL}/packages/${slug}`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.8,
    }));
  } catch {
    // skip
  }

  try {
    const slugs = await getStaySlugs();
    stayEntries = slugs.map((slug) => ({
      url: `${BASE_URL}/services/accommodation/${slug}`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.7,
    }));
  } catch {
    // skip
  }

  const now = new Date();

  return [
    {
      url: BASE_URL,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${BASE_URL}/about`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/services`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/services/activities`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/services/accommodation`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/services/customized-itinerary`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/services/tour-guides`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/services/shuttle-services`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${BASE_URL}/packages`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/bookings`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/contact`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/privacy-policy`,
      lastModified: now,
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: `${BASE_URL}/terms-and-conditions`,
      lastModified: now,
      changeFrequency: "yearly",
      priority: 0.3,
    },
    ...packageEntries,
    ...stayEntries,
  ];
}
