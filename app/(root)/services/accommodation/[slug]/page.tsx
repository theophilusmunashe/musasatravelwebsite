import type { Metadata } from "next";
import AccommodationDetailClient from "./AccommodationDetailClient";

const nameMap: Record<string, string> = {
  "luxury-safari-lodge": "Luxury Safari Lodge",
  "boutique-coastal-retreat": "Boutique Coastal Retreat",
  "mountain-view-cabin": "Mountain View Cabin",
  "safari-tent-camp": "Safari Tent Camp",
  "beachfront-villa": "Beachfront Villa",
  "eco-lodge": "Eco Lodge",
  "river-view-cottage": "River View Cottage",
  "desert-camp": "Desert Camp",
  "forest-retreat": "Forest Retreat",
};

const locationMap: Record<string, string> = {
  "luxury-safari-lodge": "Victoria Falls, Zimbabwe",
  "boutique-coastal-retreat": "Cape Town, South Africa",
  "mountain-view-cabin": "Drakensberg Mountains, South Africa",
  "safari-tent-camp": "Okavango Delta, Botswana",
  "beachfront-villa": "Langebaan, South Africa",
  "eco-lodge": "Greater Limpopo, Mozambique",
  "river-view-cottage": "Livingstone, Zambia",
  "desert-camp": "Namib Desert, Namibia",
  "forest-retreat": "Eastern Cape, South Africa",
};

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const name = nameMap[params.slug] || "Luxury Accommodation";
  const location = locationMap[params.slug] || "Southern Africa";

  return {
    title: `${name} — ${location}`,
    description: `Book ${name} in ${location} with Musasa Travel & Tours. Exceptional service, stunning surroundings, and unforgettable African experiences await.`,
    openGraph: {
      title: `${name} | Musasa Travel & Tours`,
      description: `Experience ${name} in ${location}. Curated by Musasa Travel & Tours.`,
      url: `/services/accommodation/${params.slug}`,
    },
  };
}

export default function AccommodationDetailPage({
  params,
}: {
  params: { slug: string };
}) {
  return <AccommodationDetailClient params={params} />;
}
