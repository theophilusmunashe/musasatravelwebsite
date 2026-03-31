import ItineraryClient from "./components/ItineraryClient";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Customized Itinerary - Musasa Travel",
  description:
    "No two travellers are alike. We craft bespoke journeys tailored specifically to your unique pace and passions — from 5-day Victoria Falls expeditions to 14-day cross-continent epics.",
};

export default function CustomizedItineraryPage() {
  return <ItineraryClient />;
}
