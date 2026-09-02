import AccommodationClient from "./components/AccommodationClient";
import JsonLd from "../../../../components/JsonLd";
import { getStays } from "@/lib/services-cms";
import { breadcrumbsJsonLd, itemListJsonLd, pageMeta } from "@/lib/seo";
import { pageRevalidate } from "@/lib/page-revalidate";

export const revalidate = pageRevalidate;

export const metadata = pageMeta({
  title: "Victoria Falls Accommodation & Safari Lodges",
  description:
    "Book Victoria Falls hotels, safari lodges and Musasa stays in Zimbabwe, Zambia and Botswana. Hand-picked properties near the Falls, Zambezi and Chobe.",
  path: "/services/accommodation",
  keywords: [
    "Victoria Falls accommodation",
    "Victoria Falls hotels",
    "safari lodge Victoria Falls",
    "Zambezi lodge",
    "Chobe bush lodge",
    "Livingstone hotel",
  ],
});

export default async function AccommodationPage() {
  const stays = await getStays();
  return (
    <>
      <JsonLd
        data={breadcrumbsJsonLd([
          { name: "Home", path: "/" },
          { name: "Services", path: "/services" },
          { name: "Victoria Falls accommodation", path: "/services/accommodation" },
        ])}
      />
      {stays.length > 0 && (
        <JsonLd
          data={itemListJsonLd(
            "Victoria Falls accommodation and safari lodges",
            stays.map((stay) => ({
              name: stay.name,
              path: `/services/accommodation/${stay.id}`,
            }))
          )}
        />
      )}
      <AccommodationClient stays={stays} />
    </>
  );
}
