import ShuttleClient from "./components/ShuttleClient";
import JsonLd from "../../../../components/JsonLd";
import { getTransfers } from "@/lib/services-cms";
import { breadcrumbsJsonLd, itemListJsonLd, pageMeta } from "@/lib/seo";
import { pageRevalidate } from "@/lib/page-revalidate";

export const revalidate = pageRevalidate;

export const metadata = pageMeta({
  title: "Victoria Falls Airport Transfers & Shuttles",
  description:
    "Book Victoria Falls Airport (VFA) transfers, Livingstone and Kasane shuttles, and private safari vehicles with Musasa Travel across Zimbabwe, Zambia and Botswana.",
  path: "/services/shuttle-services",
  keywords: [
    "Victoria Falls airport transfer",
    "VFA shuttle",
    "Livingstone transfer",
    "Kasane shuttle",
    "cross border transfer Victoria Falls",
  ],
});

export default async function ShuttleServicesPage() {
  const transfers = await getTransfers();
  return (
    <>
      <JsonLd
        data={breadcrumbsJsonLd([
          { name: "Home", path: "/" },
          { name: "Services", path: "/services" },
          { name: "Victoria Falls airport transfers", path: "/services/shuttle-services" },
        ])}
      />
      {transfers.length > 0 && (
        <JsonLd
          data={itemListJsonLd(
            "Victoria Falls airport transfers and shuttles",
            transfers.map((transfer) => ({
              name: transfer.name,
              path: "/services/shuttle-services",
            }))
          )}
        />
      )}
      <ShuttleClient transfers={transfers} />
    </>
  );
}
