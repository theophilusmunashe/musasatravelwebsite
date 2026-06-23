import ShuttleClient from "./components/ShuttleClient";
import type { Metadata } from "next";
import { SITE_NAME } from "@/lib/site";

export const metadata: Metadata = {
  title: "Shuttle Services & Transfers",
  description:
    `Reliable private transfers and shuttle services through ${SITE_NAME} — airport pickups, estate transfers, and group charters.`,
  keywords: [
    "kumusha ekhayalethu transfers",
    "private estate shuttle",
    "estate transfer services",
  ],
  openGraph: {
    title: `Shuttle Services & Transfers | ${SITE_NAME}`,
    description:
      "Airport transfers, cross-border shuttles and private safari vehicles across Zimbabwe, Zambia and Botswana.",
    url: "/services/shuttle-services",
  },
};

export default function ShuttleServicesPage() {
  return <ShuttleClient />;
}
