import type { Metadata } from "next";
import BookingsPageClient from "./BookingsPageClient";
import JsonLd from "../../../components/JsonLd";
import { breadcrumbsJsonLd, pageMeta } from "@/lib/seo";

export const metadata: Metadata = pageMeta({
  title: "Book Victoria Falls Tours Online",
  description:
    "Book Victoria Falls tours, safari packages, lodges and transfers online with Musasa Travel. Choose your destination, build your trip, then confirm by email or WhatsApp.",
  path: "/bookings",
  keywords: [
    "book Victoria Falls",
    "Victoria Falls booking",
    "book safari Zimbabwe",
    "Musasa Travel booking",
    "Victoria Falls tour reservation",
  ],
});

export default function BookingsPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbsJsonLd([
          { name: "Home", path: "/" },
          { name: "Book Victoria Falls tours", path: "/bookings" },
        ])}
      />
      <BookingsPageClient />
    </>
  );
}
