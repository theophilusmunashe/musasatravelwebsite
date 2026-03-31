import ShuttleClient from "./components/ShuttleClient";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Shuttle Services & Transfers - Musasa Travel",
  description:
    "Airport transfers, cross-border shuttles to Livingstone and Kasane, private safari vehicles, and group charters. Professional transfers across Zimbabwe, Zambia, and Botswana.",
};

export default function ShuttleServicesPage() {
  return <ShuttleClient />;
}
