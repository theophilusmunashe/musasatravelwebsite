import AccommodationClient from "./components/AccommodationClient";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Accommodation - Musasa Travel",
  description:
    "Nine hand-picked safari lodges, eco-lodges, boutique hotels and luxury resorts across Zimbabwe, Botswana, and Zambia. Add your perfect sanctuary to your trip and book seamlessly.",
};

export default function AccommodationPage() {
  return <AccommodationClient />;
}
