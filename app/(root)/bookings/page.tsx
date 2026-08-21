import type { Metadata } from "next";
import BookingsPageClient from "./BookingsPageClient";

export const metadata: Metadata = {
  title: "Book Your Trip",
  description:
    "Plan Victoria Falls, Cape Town, Namibia, Botswana, Zambia, or Mauritius with Musasa Travel & Tours. Choose your destination, build your itinerary, then send your enquiry by email and WhatsApp.",
  keywords: [
    "book safari zimbabwe",
    "victoria falls booking",
    "cape town travel booking",
    "botswana safari booking",
    "musasa travel booking",
    "african trip reservation",
    "safari booking online",
  ],
  openGraph: {
    title: "Book Your Trip | Musasa Travel & Tours",
    description:
      "Review your cart and complete your African safari booking with Musasa Travel & Tours.",
    url: "/bookings",
  },
  robots: {
    index: false,
    follow: false,
  },
};

export default function BookingsPage() {
  return <BookingsPageClient />;
}
