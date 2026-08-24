import ItineraryClient from "./components/ItineraryClient";
import JsonLd from "../../../../components/JsonLd";
import { getItineraries } from "@/lib/services-cms";
import { breadcrumbsJsonLd, itemListJsonLd, pageMeta } from "@/lib/seo";

export const revalidate = 300;

export const metadata = pageMeta({
  title: "Custom Victoria Falls & Africa Itineraries",
  description:
    "Plan a custom Victoria Falls itinerary with Musasa Travel — from a 5-day Falls trip to a 14-day safari across Zimbabwe, Botswana, Zambia and beyond.",
  path: "/services/customized-itinerary",
  keywords: [
    "Victoria Falls itinerary",
    "custom Africa itinerary",
    "bespoke safari itinerary",
    "private Victoria Falls tour",
    "tailored Zimbabwe safari",
  ],
});

export default async function CustomizedItineraryPage() {
  const itineraries = await getItineraries();
  return (
    <>
      <JsonLd
        data={breadcrumbsJsonLd([
          { name: "Home", path: "/" },
          { name: "Services", path: "/services" },
          { name: "Custom itineraries", path: "/services/customized-itinerary" },
        ])}
      />
      {itineraries.length > 0 && (
        <JsonLd
          data={itemListJsonLd(
            "Custom Victoria Falls and Africa itineraries",
            itineraries.map((item) => ({
              name: item.name,
              path: "/services/customized-itinerary",
            }))
          )}
        />
      )}
      <ItineraryClient itineraries={itineraries} />
    </>
  );
}
