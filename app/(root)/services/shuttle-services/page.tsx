import ShuttleClient from "./components/ShuttleClient";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Shuttle Services & Transfers",
  description:
    "Airport transfers, cross-border shuttles to Livingstone and Kasane, private safari vehicles and group charters. Reliable professional transfers across Zimbabwe, Zambia and Botswana with Musasa Travel.",
  keywords: [
    "victoria falls airport transfer",
    "shuttle service victoria falls",
    "livingstone transfer",
    "kasane shuttle",
    "cross border transfer africa",
    "private safari vehicle zimbabwe",
    "group charter transfer africa",
  ],
  openGraph: {
    title: "Shuttle Services & Transfers | Musasa Travel & Tours",
    description:
      "Airport transfers, cross-border shuttles and private safari vehicles across Zimbabwe, Zambia and Botswana.",
    url: "/services/shuttle-services",
  },
};

export default function ShuttleServicesPage() {
  return <ShuttleClient />;
}
