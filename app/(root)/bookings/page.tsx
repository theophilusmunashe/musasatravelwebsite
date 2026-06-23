import type { Metadata } from "next";
import BookingsPageClient from "./BookingsPageClient";
import { SITE_NAME } from "@/lib/site";

export const metadata: Metadata = {
  title: "Book Your Stay",
  description:
    `Complete your booking with ${SITE_NAME}. Review your selected accommodation and services, then send your booking directly via WhatsApp for confirmation.`,
  keywords: [
    "kumusha ekhayalethu booking",
    "private estate booking",
    "estate reservation",
  ],
  openGraph: {
    title: `Book Your Stay | ${SITE_NAME}`,
    description:
      `Review your cart and complete your booking with ${SITE_NAME}.`,
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
