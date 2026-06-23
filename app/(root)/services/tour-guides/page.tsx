import TourGuidesClient from "./components/TourGuidesClient";
import type { Metadata } from "next";
import { SITE_NAME } from "@/lib/site";

export const metadata: Metadata = {
  title: "Expert Tour Guides",
  description:
    `Explore with passionate, certified local experts through ${SITE_NAME} — specialising in wildlife, adventure and cultural experiences.`,
  keywords: [
    "kumusha ekhayalethu tour guides",
    "estate tour guides",
    "local expert guides",
  ],
  openGraph: {
    title: `Expert Tour Guides | ${SITE_NAME}`,
    description:
      "Certified local guides specialising in wildlife, adventure and cultural experiences across Southern Africa.",
    url: "/services/tour-guides",
  },
};

export default function TourGuidesPage() {
  return <TourGuidesClient />;
}
