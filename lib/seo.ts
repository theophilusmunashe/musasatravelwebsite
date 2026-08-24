import type { Metadata } from "next";
import { PRIMARY_KEYWORDS, SITE } from "./site";

export function truncateMeta(text: string, max = 158) {
  const clean = (text || "").replace(/\s+/g, " ").trim();
  if (clean.length <= max) return clean;
  return `${clean.slice(0, max - 1).trimEnd()}…`;
}

type PageMetaInput = {
  title: string;
  description: string;
  path: string;
  keywords?: string[];
  image?: string;
  noIndex?: boolean;
};

export function absoluteUrl(path: string) {
  if (!path || path === "/") return SITE.url;
  return `${SITE.url}${path.startsWith("/") ? path : `/${path}`}`;
}

export function pageMeta({
  title,
  description,
  path,
  keywords = PRIMARY_KEYWORDS,
  image,
  noIndex = false,
}: PageMetaInput): Metadata {
  const canonical = path.startsWith("http") ? path : path || "/";
  const ogImage = image || SITE.ogImage;
  const fullTitle = title.includes(SITE.shortName) ? title : `${title} | ${SITE.name}`;

  return {
    title,
    description,
    keywords,
    alternates: { canonical },
    openGraph: {
      title: fullTitle,
      description,
      url: canonical,
      siteName: SITE.name,
      locale: "en_ZW",
      type: "website",
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: `${title} — ${SITE.name}, Victoria Falls, Zimbabwe`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      images: [ogImage],
    },
    robots: noIndex
      ? { index: false, follow: false }
      : {
          index: true,
          follow: true,
          googleBot: {
            index: true,
            follow: true,
            "max-image-preview": "large",
            "max-snippet": -1,
          },
        },
  };
}

export function breadcrumbsJsonLd(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}

export function itemListJsonLd(
  name: string,
  items: { name: string; path: string }[]
) {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name,
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      url: absoluteUrl(item.path),
    })),
  };
}

export function organizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": ["TravelAgency", "LocalBusiness"],
    "@id": `${SITE.url}/#organization`,
    name: SITE.name,
    alternateName: ["Musasa Travel", "Musasa Tours", "Musasa Travel Victoria Falls"],
    url: SITE.url,
    logo: absoluteUrl(SITE.logoPath),
    image: SITE.ogImage,
    description:
      "Local Victoria Falls travel agency for safari tours, activities, lodges, custom itineraries, licensed guides and airport transfers.",
    telephone: SITE.phoneE164,
    email: SITE.email,
    priceRange: "$$",
    currenciesAccepted: "USD",
    paymentAccepted: "Cash, Credit Card, Bank Transfer",
    address: {
      "@type": "PostalAddress",
      addressLocality: SITE.address.locality,
      addressRegion: SITE.address.region,
      addressCountry: SITE.address.country,
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: SITE.geo.latitude,
      longitude: SITE.geo.longitude,
    },
    hasMap: `https://www.google.com/maps/search/?api=1&query=${SITE.geo.latitude},${SITE.geo.longitude}`,
    openingHoursSpecification: {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
        "Sunday",
      ],
      opens: "06:00",
      closes: "21:00",
    },
    sameAs: [SITE.social.instagram, SITE.social.facebook, SITE.social.tiktok],
    areaServed: [
      { "@type": "City", name: "Victoria Falls" },
      { "@type": "Country", name: "Zimbabwe" },
      { "@type": "Country", name: "Zambia" },
      { "@type": "Country", name: "Botswana" },
      { "@type": "Country", name: "South Africa" },
      { "@type": "Country", name: "Namibia" },
      { "@type": "Country", name: "Mozambique" },
    ],
    knowsAbout: [
      "Victoria Falls tours",
      "Victoria Falls safari",
      "Victoria Falls activities",
      "Victoria Falls accommodation",
      "Victoria Falls airport transfers",
      "Hwange National Park safari",
      "Zambezi River cruises",
    ],
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Victoria Falls travel services",
      itemListElement: [
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Victoria Falls tours and activities",
            url: absoluteUrl("/services/activities"),
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Victoria Falls accommodation",
            url: absoluteUrl("/services/accommodation"),
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Custom African itineraries",
            url: absoluteUrl("/services/customized-itinerary"),
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Licensed Victoria Falls tour guides",
            url: absoluteUrl("/services/tour-guides"),
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Victoria Falls airport transfers",
            url: absoluteUrl("/services/shuttle-services"),
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "TouristTrip",
            name: "Victoria Falls safari packages",
            url: absoluteUrl("/packages"),
          },
        },
      ],
    },
  };
}

export function faqJsonLd(faqs: { question: string; answer: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: { "@type": "Answer", text: faq.answer },
    })),
  };
}

export function packageTripJsonLd(pkg: {
  name: string;
  slug: string;
  tagline: string;
  description: string;
  image: string;
  days: number;
  destinations: string[];
}) {
  return {
    "@context": "https://schema.org",
    "@type": "TouristTrip",
    name: pkg.name,
    description: pkg.description || pkg.tagline,
    image: pkg.image,
    url: absoluteUrl(`/packages/${pkg.slug}`),
    touristType: "Safari and adventure travellers",
    itinerary: {
      "@type": "ItemList",
      name: `${pkg.days}-day ${pkg.name} itinerary`,
      itemListElement: (pkg.destinations || []).map((name, index) => ({
        "@type": "ListItem",
        position: index + 1,
        name,
      })),
    },
    provider: {
      "@type": "TravelAgency",
      name: SITE.name,
      url: SITE.url,
    },
  };
}

export function lodgingJsonLd(stay: {
  id: string;
  name: string;
  tagline: string;
  description: string;
  image: string;
  location: string;
  country: string;
  price: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "LodgingBusiness",
    name: stay.name,
    description: stay.description || stay.tagline,
    image: stay.image,
    url: absoluteUrl(`/services/accommodation/${stay.id}`),
    address: {
      "@type": "PostalAddress",
      addressLocality: stay.location,
      addressCountry: stay.country,
    },
    priceRange: stay.price,
    provider: {
      "@type": "TravelAgency",
      name: SITE.name,
      url: SITE.url,
    },
  };
}
