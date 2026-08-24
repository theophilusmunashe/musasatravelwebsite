import { notFound } from "next/navigation";
import AccommodationDetailClient from "./AccommodationDetailClient";
import JsonLd from "../../../../../components/JsonLd";
import { getStayBySlug, getStaySlugs } from "@/lib/services-cms";
import {
  breadcrumbsJsonLd,
  lodgingJsonLd,
  pageMeta,
  truncateMeta,
} from "@/lib/seo";

export const revalidate = 300;

type Props = { params: { slug: string } };

export async function generateStaticParams() {
  const slugs = await getStaySlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props) {
  const stay = await getStayBySlug(params.slug);
  if (!stay) {
    return { title: "Accommodation not found" };
  }
  const location = `${stay.location}, ${stay.country}`;
  return pageMeta({
    title: `${stay.name} — ${location}`,
    description: truncateMeta(
      stay.description ||
        `Book ${stay.name} in ${location} with Musasa Travel. Victoria Falls accommodation and safari lodges.`
    ),
    path: `/services/accommodation/${stay.id}`,
    keywords: [
      stay.name,
      "Victoria Falls accommodation",
      location,
      "safari lodge",
      "Musasa Travel",
    ],
    image: stay.image,
  });
}

export default async function AccommodationDetailPage({ params }: Props) {
  const stay = await getStayBySlug(params.slug);
  if (!stay) notFound();

  return (
    <>
      <JsonLd
        data={breadcrumbsJsonLd([
          { name: "Home", path: "/" },
          { name: "Accommodation", path: "/services/accommodation" },
          { name: stay.name, path: `/services/accommodation/${stay.id}` },
        ])}
      />
      <JsonLd data={lodgingJsonLd(stay)} />
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
    </>
  );
}
