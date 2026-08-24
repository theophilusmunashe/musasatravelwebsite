import ActivitiesClient from "./components/ActivitiesClient";
import type { Metadata } from "next";
import { getActivities } from "@/lib/services-cms";

export const revalidate = 300;

export const metadata: Metadata = {
  title: "Safari Activities & Experiences",
  description:
    "Choose from world-class experiences at Victoria Falls — white water rafting, safari game drives, bungee jumping, helicopter flights, cultural tours, sunset cruises and more. Build your perfect itinerary with Musasa Travel.",
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
      "World-class African experiences — rafting, safaris, bungee jumping, helicopter flights and more at Victoria Falls.",
    url: "/services/activities",
  },
};

export default async function ActivitiesPage() {
  const activities = await getActivities();
  return <ActivitiesClient activities={activities} />;
}
