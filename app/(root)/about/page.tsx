import React from "react";
import Hero from "./components/Hero";
import Stats from "./components/Stats";
import About from "./components/About";
import Smart from "./components/Smart";
import Other from "./components/Other";

import type { Metadata } from "next";
import { SITE_DESCRIPTION, SITE_NAME } from "@/lib/site";

export const metadata: Metadata = {
  title: "About",
  description: `Learn about ${SITE_NAME} — a private estate built on the meaning of home. Discover our story, vision, and commitment to refined living and hospitality.`,
  keywords: [
    "about kumusha ekhayalethu",
    "kumusha ekhayalethu private estate",
    "private estate living",
    "estate hospitality",
    "about private estate",
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
