import ActivitiesClient from "./components/ActivitiesClient";
import type { Metadata } from "next";
import { SITE_NAME } from "@/lib/site";

export const metadata: Metadata = {
  title: "Activities & Experiences",
  description:
    `Discover curated activities and experiences at ${SITE_NAME} — from on-estate leisure to nearby adventures.`,
  keywords: [
    "kumusha ekhayalethu activities",
    "private estate experiences",
    "estate activities",
  ],
  openGraph: {
    title: `Activities & Experiences | ${SITE_NAME}`,
    description:
      "12 world-class African experiences — rafting, safaris, bungee jumping, helicopter flights and more at Victoria Falls.",
    url: "/services/activities",
  },
};

export default function ActivitiesPage() {
  return <ActivitiesClient />;
}
