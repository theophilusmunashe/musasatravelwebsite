import ActivitiesClient from "./components/ActivitiesClient";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Safari Activities & Experiences",
  description:
    "Choose from 12 world-class experiences at Victoria Falls — white water rafting, safari game drives, bungee jumping, helicopter flights, cultural tours, sunset cruises and more. Build your perfect itinerary with Musasa Travel.",
  keywords: [
    "victoria falls activities",
    "safari activities zimbabwe",
    "white water rafting victoria falls",
    "bungee jumping victoria falls",
    "helicopter flight victoria falls",
    "game drive hwange",
    "sunset cruise zambezi",
    "cultural tours victoria falls",
  ],
  openGraph: {
    title: "Safari Activities & Experiences | Musasa Travel & Tours",
    description:
      "12 world-class African experiences — rafting, safaris, bungee jumping, helicopter flights and more at Victoria Falls.",
    url: "/services/activities",
  },
};

export default function ActivitiesPage() {
  return <ActivitiesClient />;
}
