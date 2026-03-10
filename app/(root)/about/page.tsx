import React from "react";
import Hero from "./components/Hero";
import Stats from "./components/Stats";
import About from "./components/About";
import Smart from "./components/Smart";
import Other from "./components/Other";

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About - Musasa",
  description:
    "Musasa Travel & Tours is your premier African travel partner, offering curated journeys through Victoria Falls, Zimbabwe, and beyond. Experience authentic adventures with local expertise and global reach.",
  keywords: [
    "about musasa travel, about musasa tours, about victoria falls, about zimbabwe travel, about african safari, about african adventure, about travel packages, about luxury travel, about guided tours, about musasa travel and tours, victoria falls tours, zimbabwe safari, african travel experiences",
  ],
};

// Hardcoded package data for Other section
const packageData = [
  {
    _id: '1',
    title: 'Victoria Falls Adventure',
    mainImage: 'https://res.cloudinary.com/dwx3y9j1d/image/upload/v1772711417/victoria-falls_kzd1kp.jpg',
    slug: { current: 'victoria-falls' }
  },
  {
    _id: '2',
    title: 'Cape Town Explorer',
    mainImage: 'https://res.cloudinary.com/dwx3y9j1d/image/upload/v1772711419/south-africa_fv8tky.jpg',
    slug: { current: 'cape-town' }
  },
  {
    _id: '3',
    title: 'Namibia Desert Safari',
    mainImage: 'https://res.cloudinary.com/dwx3y9j1d/image/upload/v1772711385/bernd-dittrich-F4IdzUgXwa4-unsplash_qidgzk.jpg',
    slug: { current: 'namibia' }
  },
];

const Page = async () => {
  return (
    <div>
      <Hero />
      <Stats />
      <About />
      <Smart />
      <Other data={packageData} />
      {/* <Recents data={data} /> */}
    </div>
  );
};

export default Page;
