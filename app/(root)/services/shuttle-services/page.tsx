import React from "react";
import Stats from "../../about/components/Stats";
import Sections from "../components/Sections";
import Faq from "../components/Faq";
import Service from "../../../../components/Services";
import FormComponent from "../../../../components/FormComponent";
import Header from "../../projects/components/Header";

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Shuttle Services & Transfers - Musasa Travel",
  description: "Navigate the region with ease through our reliable network of air-conditioned, professional transfers and cross-border shuttles.",
};

// Mock category data for sections - replace with actual data as needed
const mockCategoryData = [
  {
    _id: '1',
    title: 'Airport Transfer Service',
    mainImage: 'https://res.cloudinary.com/dwx3y9j1d/image/upload/v1772711417/victoria-falls_kzd1kp.jpg',
    slug: { current: 'airport-transfer-service' }
  },
  {
    _id: '2',
    title: 'Cross Border Shuttle',
    mainImage: 'https://res.cloudinary.com/dwx3y9j1d/image/upload/v1772711419/south-africa_fv8tky.jpg',
    slug: { current: 'cross-border-shuttle' }
  },
  {
    _id: '3',
    title: 'Private Vehicle Transfer',
    mainImage: 'https://res.cloudinary.com/dwx3y9j1d/image/upload/v1772711385/bernd-dittrich-F4IdzUgXwa4-unsplash_qidgzk.jpg',
    slug: { current: 'private-vehicle-transfer' }
  },
];

const Page = async () => {
  return (
    <div>
      <Header title="Shuttle Services & Transfers" />
      <Sections data={mockCategoryData} />
      <Stats />
      <Service />
      <FormComponent />
      <Faq />
    </div>
  );
};

export default Page;
