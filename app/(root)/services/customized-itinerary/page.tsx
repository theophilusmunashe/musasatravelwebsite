import ItineraryClient from "./components/ItineraryClient";
import type { Metadata } from "next";
import { SITE_NAME } from "@/lib/site";

export const metadata: Metadata = {
  title: "Customized Itineraries",
  description:
    `No two guests are alike. ${SITE_NAME} crafts bespoke itineraries tailored to your pace, interests, and preferences.`,
  keywords: [
    "kumusha ekhayalethu itinerary",
    "custom estate itinerary",
    "bespoke private estate experience",
  ],
  openGraph: {
    title: `Customized Itineraries | ${SITE_NAME}`,
    description:
      "Bespoke African journeys crafted around your pace and passions — from 5 to 14 days across Southern Africa.",
    url: "/services/customized-itinerary",
  },
};

export default function CustomizedItineraryPage() {
  return <ItineraryClient />;
}
