import React from "react";
import Stats from "../about/components/Stats";
import Faq from "./components/Faq";
import Service from "../../../components/Services";
import FormComponent from "../../../components/FormComponent";
import PageHeader from "../../../components/PageHeader";
import JsonLd from "../../../components/JsonLd";
import { faqItems } from "@/data/data";
import { breadcrumbsJsonLd, faqJsonLd, pageMeta } from "@/lib/seo";

export const metadata = pageMeta({
  title: "Victoria Falls Travel Services",
  description:
    "Book Victoria Falls tours, safari lodges, custom itineraries, licensed tour guides and airport transfers with Musasa Travel in Victoria Falls, Zimbabwe.",
  path: "/services",
  keywords: [
    "Victoria Falls travel services",
    "Victoria Falls tours",
    "Victoria Falls accommodation",
    "Victoria Falls tour guides",
    "Victoria Falls airport transfer",
    "custom Africa itinerary",
  ],
});

const Page = () => {
  return (
    <div>
      <JsonLd
        data={breadcrumbsJsonLd([
          { name: "Home", path: "/" },
          { name: "Victoria Falls travel services", path: "/services" },
        ])}
      />
      <JsonLd
        data={faqJsonLd(
          faqItems.map((item: { Question: string; Answer: string }) => ({
            question: item.Question,
            answer: item.Answer,
          }))
        )}
      />
      <PageHeader title="Victoria Falls Travel Services" />
      <Service />
      <Stats />
      <FormComponent />
      <Faq />
    </div>
  );
};

export default Page;
