import { notFound } from "next/navigation";
import type { Metadata } from "next";
import AccommodationDetailClient from "./AccommodationDetailClient";
import { getStayBySlug, getStaySlugs } from "@/lib/services-cms";

export const revalidate = 300;

type Props = { params: { slug: string } };

export async function generateStaticParams() {
  const slugs = await getStaySlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const stay = await getStayBySlug(params.slug);
  if (!stay) {
    return { title: "Accommodation not found" };
  }
  const location = `${stay.location}, ${stay.country}`;
  return {
    title: `${stay.name} — ${location}`,
    description: stay.description,
    openGraph: {
      title: `${stay.name} | Musasa Travel & Tours`,
      description: stay.tagline,
      url: `/services/accommodation/${stay.id}`,
    },
  };
}

export default async function AccommodationDetailPage({ params }: Props) {
  const stay = await getStayBySlug(params.slug);
  if (!stay) notFound();

  return (
    <AccommodationDetailClient
      accommodation={{
        _id: stay.id,
        title: stay.name,
        mainImage: stay.image,
        location: `${stay.location}, ${stay.country}`,
        price: stay.price,
        rating: stay.rating,
        reviews: stay.reviews,
        description: stay.description,
        amenities: stay.amenities,
        highlights: stay.highlights,
      }}
    />
  );
}
