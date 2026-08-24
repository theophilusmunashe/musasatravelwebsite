import ItineraryClient from "./components/ItineraryClient";
import type { Metadata } from "next";
import { getItineraries } from "@/lib/services-cms";

export const revalidate = 300;

export const metadata: Metadata = {
  title: "Customized Travel Itineraries",
  description:
    "No two travellers are alike. Musasa Travel crafts bespoke African journeys tailored to your pace and passions — from 5-day Victoria Falls expeditions to 14-day cross-continent epics through Zimbabwe, Botswana and beyond.",
  keywords: [
    "custom africa itinerary",
    "bespoke safari itinerary",
    "victoria falls itinerary",
    "personalised africa travel",
    "tailored zimbabwe tour",
    "private safari package",
    "cross-continent africa trip",
  ],
  openGraph: {
    title: "Customized Travel Itineraries | Musasa Travel & Tours",
    description:
      "Bespoke African journeys crafted around your pace and passions — from 5 to 14 days across Southern Africa.",
    url: "/services/customized-itinerary",
  },
};

export default async function CustomizedItineraryPage() {
  const itineraries = await getItineraries();
  return <ItineraryClient itineraries={itineraries} />;
}
