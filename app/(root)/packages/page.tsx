import PackagesClient from "./components/PackagesClient";
import type { Metadata } from "next";
import { getTravelPackages } from "@/lib/travel-packages";

export const revalidate = 300;

export const metadata: Metadata = {
  title: "African Travel Packages",
  description:
    "Hand-crafted African travel packages spanning Victoria Falls, Cape Town, Namibia, Botswana, Mozambique and Mauritius — curated by Musasa Travel & Tours. Every detail included, nothing left to chance.",
  keywords: [
    "africa travel packages",
    "victoria falls travel package",
    "cape town tour package",
    "namibia desert safari package",
    "botswana safari package",
    "mozambique beach package",
    "mauritius holiday package",
    "hwange safari package",
    "musasa travel packages",
  ],
  openGraph: {
    title: "African Travel Packages | Musasa Travel & Tours",
    description:
      "Curated African packages — Victoria Falls, Cape Town, Namibia, Botswana, Mozambique and Mauritius.",
    url: "/packages",
  },
};

export default async function PackagesPage() {
  const packages = await getTravelPackages();
  return <PackagesClient packages={packages} />;
}
