import ActivitiesClient from "./components/ActivitiesClient";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Activities - Musasa Travel",
  description:
    "Choose from 12 world-class experiences at Victoria Falls — white water rafting, safari, bungee jumping, helicopter flights, cultural tours and more. Build your perfect itinerary.",
};

export default function ActivitiesPage() {
  return <ActivitiesClient />;
}
