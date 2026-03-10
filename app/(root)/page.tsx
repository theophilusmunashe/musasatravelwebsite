import dynamic from "next/dynamic";

import FormComponent from "../../components/FormComponent";
import Hero from "../../components/Hero";
import Industry from "../../components/Industry";
import Offers from "../../components/Offers";
import Recents from "../../components/Recents";
import Vision from "../../components/Vision";

import type { Metadata } from "next";
import Note from "../../components/Note";

import ColumnContainer from "../../components/ColumnContainer";
import Example from "../../components/Hori";
import Service from "../../components/Services";
import Cta from "../../components/Collab";

export const metadata: Metadata = {
  title: "Home Page - Musasa Travel & Tours",
  description:
    "Musasa Travel & Tours is a Victoria Falls based travel company that specializes in curated journeys across Africa and beyond. Experience luxury travel with expert local guidance.",
  keywords: [
    "musasa travel, victoria falls tours, africa travel, zimbabwe tours, luxury travel, curated journeys, safari tours, cape town travel, namibia tours, mozambique travel, zambia safaris, botswana travel, mauritius vacations, dubai travel",
  ],
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
