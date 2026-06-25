import type { Metadata, Viewport } from "next";
import { SITE_NAME } from "@/lib/site";
import { SAHWIRA_NAME } from "@/lib/sahwira";
import BookingsPageClient from "./BookingsPageClient";

export const metadata: Metadata = {
  title: `Join us — ${SAHWIRA_NAME} & booking`,
  description: `Stay, host, or attend at ${SITE_NAME}. Chat with ${SAHWIRA_NAME}, our AI concierge, or send a manual enquiry for private stays and events at Victoria Falls.`,
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export default function BookingsPage() {
  return <BookingsPageClient />;
}
