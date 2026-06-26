import ContactClient from "./components/ContactClient";
import type { Metadata } from "next";
import { SITE_NAME } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact Us",
  description:
    `Get in touch with ${SITE_NAME}. We respond to all enquiries within 24 hours. Call +263 78 271 4577 or send us a message.`,
  keywords: [
    "contact kumusha ekhayalethu",
    "private estate enquiry",
    "kumusha ekhayalethu contact",
  ],
  openGraph: {
    title: `Contact ${SITE_NAME}`,
    description:
      `Reach the ${SITE_NAME} team. We respond within 24 hours.`,
    url: "/contact",
  },
};

export default function ContactPage() {
  return <ContactClient />;
}
