import ContactClient from "./components/ContactClient";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Us",
  description:
    "Get in touch with Musasa Travel & Tours in Victoria Falls, Zimbabwe. We respond to all enquiries within 24 hours. Call +263 77 609 3268 or send us a message.",
  keywords: [
    "contact musasa travel",
    "victoria falls travel enquiry",
    "musasa travel phone",
    "travel agency contact zimbabwe",
  ],
  openGraph: {
    title: "Contact Musasa Travel & Tours",
    description:
      "Reach the Musasa Travel team in Victoria Falls. We respond within 24 hours.",
    url: "/contact",
  },
};

export default function ContactPage() {
  return <ContactClient />;
}
