import TourGuidesClient from "./components/TourGuidesClient";
import type { Metadata } from "next";
import { getGuides } from "@/lib/services-cms";

export const revalidate = 300;

export const metadata: Metadata = {
  title: "Expert African Tour Guides",
  description:
    "Explore Africa through the eyes of passionate, certified local experts. Musasa Travel's guides bring every landmark and hidden trail to life — specialising in wildlife, adventure and cultural experiences.",
  keywords: [
    "victoria falls tour guide",
    "safari guide zimbabwe",
    "expert wildlife guide africa",
    "certified tour guide victoria falls",
    "local guide zimbabwe",
    "adventure guide africa",
  ],
  openGraph: {
    title: "Expert African Tour Guides | Musasa Travel & Tours",
    description:
      "Certified local guides specialising in wildlife, adventure and cultural experiences across Southern Africa.",
    url: "/services/tour-guides",
  },
};

export default async function TourGuidesPage() {
  const guides = await getGuides();
  return <TourGuidesClient guides={guides} />;
}
