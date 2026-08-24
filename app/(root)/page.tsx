import FormComponent from "../../components/FormComponent";
import Hero from "../../components/Hero";
import Industry from "../../components/Industry";
import FeaturedJourneys from "../../components/FeaturedJourneys";
import type { Metadata } from "next";
import Note from "../../components/Note";
import Service from "../../components/Services";
import { getTravelPackages } from "@/lib/travel-packages";

export const revalidate = 300;

export const metadata: Metadata = {
  title: "Musasa Travel & Tours — Rooted in Africa, Reaching the World",
  description:
    "Musasa Travel & Tours is a Victoria Falls-based travel company specialising in world-class African experiences — luxury safaris, custom itineraries, expert guides, and seamless transfers across Zimbabwe, Botswana, Zambia and beyond.",
  keywords: [
    "musasa travel",
    "victoria falls tours",
    "africa travel",
    "zimbabwe tours",
    "luxury safari",
    "custom itinerary africa",
    "safari tours",
    "cape town travel",
    "namibia tours",
    "mozambique travel",
    "zambia safaris",
    "botswana safari",
    "mauritius holidays",
    "travel agency victoria falls",
    "southern africa travel",
  ],
  openGraph: {
    title: "Musasa Travel & Tours — Rooted in Africa, Reaching the World",
    description:
      "World-class African experiences — luxury safaris, custom itineraries, expert guides and seamless transfers.",
    url: "/",
    type: "website",
  },
  alternates: {
    canonical: "/",
  },
};

export default async function Home() {
  const packages = await getTravelPackages();

  return (
    <main className="h-full">
      <Hero />
      <Note />
      <Service />
      <Industry />
      <FeaturedJourneys packages={packages.slice(0, 3)} />
      <FormComponent />
    </main>
  );
}
