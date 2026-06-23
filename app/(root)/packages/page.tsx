import PackagesClient from "./components/PackagesClient";
import type { Metadata } from "next";
import { SITE_NAME } from "@/lib/site";

export const metadata: Metadata = {
  title: "Estate Packages",
  description:
    `Curated packages and experiences at ${SITE_NAME} — thoughtfully designed for residents and guests.`,
  keywords: [
    "kumusha ekhayalethu packages",
    "private estate packages",
    "estate experiences",
  ],
  openGraph: {
    title: `Estate Packages | ${SITE_NAME}`,
    description:
      "Eight curated African packages — Victoria Falls, Cape Town, Namibia, Botswana, Mozambique and Mauritius.",
    url: "/packages",
  },
};

export default function PackagesPage() {
  return <PackagesClient />;
}
