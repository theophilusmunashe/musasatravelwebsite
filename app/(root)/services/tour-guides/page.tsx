import TourGuidesClient from "./components/TourGuidesClient";
import JsonLd from "../../../../components/JsonLd";
import { getGuides } from "@/lib/services-cms";
import { breadcrumbsJsonLd, pageMeta } from "@/lib/seo";

export const revalidate = 300;

export const metadata = pageMeta({
  title: "Victoria Falls Tour Guides",
  description:
    "Book licensed Victoria Falls tour guides with Musasa Travel. Local experts for wildlife, adventure and cultural tours around the Falls, Zambezi and Hwange.",
  path: "/services/tour-guides",
  keywords: [
    "Victoria Falls tour guide",
    "licensed safari guide Zimbabwe",
    "local guide Victoria Falls",
    "wildlife guide Hwange",
  ],
});

export default async function TourGuidesPage() {
  const guides = await getGuides();
  return (
    <>
      <JsonLd
        data={breadcrumbsJsonLd([
          { name: "Home", path: "/" },
          { name: "Services", path: "/services" },
          { name: "Victoria Falls tour guides", path: "/services/tour-guides" },
        ])}
      />
      <TourGuidesClient guides={guides} />
    </>
  );
}
