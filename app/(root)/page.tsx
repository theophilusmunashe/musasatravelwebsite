import FormComponent from "../../components/FormComponent";
import Hero from "../../components/Hero";
import Industry from "../../components/Industry";
import Recents from "../../components/Recents";

import type { Metadata } from "next";
import Note from "../../components/Note";
import { SITE_DESCRIPTION, SITE_FULL_NAME } from "../../lib/site";

import Service from "../../components/Services";
import HomeScrollToHash from "../../components/HomeScrollToHash";
import EstateWalkthrough from "../../components/EstateWalkthrough";

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
      <HomeScrollToHash />
      <Hero />
      <Note />
      <EstateWalkthrough />
      <Service />
      <Industry />
      <Recents />
      <FormComponent />
    </main>
  );
}
