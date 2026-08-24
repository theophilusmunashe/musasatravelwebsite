import React from "react";
import Hero from "./components/Hero";
import Stats from "./components/Stats";
import About from "./components/About";
import Smart from "./components/Smart";
import Other from "./components/Other";
import type { Metadata } from "next";
import { getTravelPackages } from "@/lib/travel-packages";

export const revalidate = 300;

export const metadata: Metadata = {
  title: "About - Musasa",
  description:
    "Musasa Travel & Tours is your premier African travel partner, offering curated journeys through Victoria Falls, Zimbabwe, and beyond. Experience authentic adventures with local expertise and global reach.",
  keywords: [
    "about musasa travel, about musasa tours, about victoria falls, about zimbabwe travel, about african safari, about african adventure, about travel packages, about luxury travel, about guided tours, about musasa travel and tours, victoria falls tours, zimbabwe safari, african travel experiences",
  ],
};

const Page = async () => {
  const packages = (await getTravelPackages()).slice(0, 3);

  return (
    <div>
      <Hero />
      <Stats />
      <About />
      <Smart />
      <Other data={packages} />
    </div>
  );
};

export default Page;
