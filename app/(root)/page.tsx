import dynamic from "next/dynamic";

import FormComponent from "../../components/FormComponent";
import Hero from "../../components/Hero";
import Industry from "../../components/Industry";
import Offers from "../../components/Offers";
import Recents from "../../components/Recents";
import Vision from "../../components/Vision";

import type { Metadata } from "next";
import Note from "../../components/Note";
import { SITE_DESCRIPTION, SITE_FULL_NAME, SITE_NAME } from "../../lib/site";

import ColumnContainer from "../../components/ColumnContainer";
import Example from "../../components/Hori";
import Service from "../../components/Services";
import Cta from "../../components/Collab";

export const metadata: Metadata = {
  title: SITE_FULL_NAME,
  description: SITE_DESCRIPTION,
  keywords: [
    "kumusha ekhayalethu",
    "private estate",
    "luxury estate living",
    "estate accommodation",
    "estate hospitality",
    "curated estate experiences",
  ],
  openGraph: {
    title: SITE_FULL_NAME,
    description: SITE_DESCRIPTION,
    url: "/",
    type: "website",
  },
  alternates: {
    canonical: "/",
  },
};

export default async function Home() {
  return (
    <main className="h-full">
      <Hero />

      <Note />

      <Service />
      {/* <Example data={category} /> */}
      <Industry />
      <Recents />
      <FormComponent />
    </main>
  );
}
