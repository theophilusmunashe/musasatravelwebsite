import ContactClient from "./components/ContactClient";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Us - Musasa Travel",
  description:
    "Get in touch with the Musasa Travel team in Victoria Falls, Zimbabwe. We respond to all enquiries within 24 hours.",
};

export default function ContactPage() {
  return <ContactClient />;
}
