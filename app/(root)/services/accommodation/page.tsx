import AccommodationClient from "./components/AccommodationClient";
import type { Metadata } from "next";
import { SITE_NAME } from "@/lib/site";

export const metadata: Metadata = {
  title: "Luxury Accommodation",
  description:
    `Estate residences, guest suites, and exclusive stays at ${SITE_NAME} — refined living in a private estate setting.`,
  keywords: [
    "kumusha ekhayalethu accommodation",
    "private estate accommodation",
    "estate exclusive stays",
  ],
  openGraph: {
    title: `Luxury Accommodation | ${SITE_NAME}`,
    description:
      `Estate residences and exclusive stays at ${SITE_NAME}.`,
    url: "/services/accommodation",
  },
};

export default function AccommodationPage() {
  return <AccommodationClient />;
}
