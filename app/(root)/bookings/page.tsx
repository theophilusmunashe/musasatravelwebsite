import type { Metadata } from "next";
import BookingsPageClient from "./BookingsPageClient";

export const metadata: Metadata = {
  title: "Book Your Trip",
  description:
    "Complete your African adventure booking with Musasa Travel & Tours. Review your selected activities, accommodation, and services, then send your booking directly via WhatsApp for instant confirmation.",
  keywords: [
    "book safari zimbabwe",
    "victoria falls booking",
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
