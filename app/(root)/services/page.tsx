import React from "react";
import Stats from "../about/components/Stats";
import Faq from "./components/Faq";
import type { Metadata } from "next";
import Service from "../../../components/Services";
import FormComponent from "../../../components/FormComponent";
import PageHeader from "../../../components/PageHeader";

export const metadata: Metadata = {
  title: "Our Services",
  description:
    "Explore the full range of Musasa Travel & Tours services — curated safari activities, luxury accommodation, custom itineraries, expert tour guides, and seamless shuttle transfers across Zimbabwe, Botswana, Zambia and beyond.",
  keywords: [
    "musasa travel services",
    "africa safari services",
    "victoria falls activities",
    "zimbabwe accommodation",
    "custom african itinerary",
    "tour guides victoria falls",
    "shuttle transfers africa",
  ],
  openGraph: {
    title: "Our Services | Musasa Travel & Tours",
    description:
      "Safaris, luxury accommodation, custom itineraries, expert guides and transfers across Southern Africa.",
    url: "/services",
  },
};

const Page = () => {
  return (
    <div>
      <PageHeader title="Services" />
      <Service />
      <Stats />
      <FormComponent />
      <Faq />
    </div>
  );
};

export default Page;
