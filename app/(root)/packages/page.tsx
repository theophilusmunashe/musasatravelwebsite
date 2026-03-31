import PackagesClient from "./components/PackagesClient";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Packages - Musasa Travel",
  description:
    "Eight hand-crafted travel packages spanning Victoria Falls, Cape Town, Namibia, Botswana, Mozambique, and Mauritius. Every detail included, nothing left to chance.",
};

export default function PackagesPage() {
  return <PackagesClient />;
}
