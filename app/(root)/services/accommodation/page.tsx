import AccommodationClient from "./components/AccommodationClient";
import type { Metadata } from "next";
import { getStays } from "@/lib/services-cms";

export const revalidate = 300;

export const metadata: Metadata = {
  title: "Luxury Accommodation & Safari Lodges",
  description:
    "Hand-picked safari lodges, eco-lodges, boutique hotels and luxury resorts across Zimbabwe, Botswana, Zambia and beyond — including exclusive Musasa custom accommodations.",
  keywords: [
    "victoria falls accommodation",
    "luxury safari lodge zimbabwe",
    "musasa exclusive accommodation",
    "matetsi water lodge",
    "chobe bush lodge",
    "gorges lodge victoria falls",
    "zambezi lodge",
    "safari lodge botswana",
    "livingstone hotel zambia",
  ],
  openGraph: {
    title: "Luxury Accommodation | Musasa Travel & Tours",
    description:
      "Safari lodges, boutique hotels and Musasa Exclusive stays across Southern Africa.",
    url: "/services/accommodation",
  },
};

export default async function AccommodationPage() {
  const stays = await getStays();
  return <AccommodationClient stays={stays} />;
}
