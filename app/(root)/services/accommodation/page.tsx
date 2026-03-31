import AccommodationClient from "./components/AccommodationClient";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Luxury Accommodation & Safari Lodges",
  description:
    "Hand-picked safari lodges, eco-lodges, boutique hotels and luxury resorts across Zimbabwe, Botswana, Zambia and beyond — including three exclusive Musasa custom accommodations from $120/night.",
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
      "Safari lodges, boutique hotels and Musasa Exclusive stays across Southern Africa. From $120/night.",
    url: "/services/accommodation",
  },
};

export default function AccommodationPage() {
  return <AccommodationClient />;
}
