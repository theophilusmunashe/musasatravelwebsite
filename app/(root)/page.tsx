import dynamic from "next/dynamic";

import FormComponent from "../../components/FormComponent";
import Hero from "../../components/Hero";
import Industry from "../../components/Industry";
import Offers from "../../components/Offers";
import Recents from "../../components/Recents";
import Vision from "../../components/Vision";

import type { Metadata } from "next";
import Note from "../../components/Note";

import ColumnContainer from "../../components/ColumnContainer";
import Example from "../../components/Hori";
import Service from "../../components/Services";
import Cta from "../../components/Collab";

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
  return (
    <main className="h-full">
      <Hero />

      <Note />

      <Service />
      {/* <Example data={category} /> */}
      <Industry />
      <Recents />
      <FormComponent />
    </main>
  );
}
