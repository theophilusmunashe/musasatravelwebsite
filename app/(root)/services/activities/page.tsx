import React from "react";
import Stats from "../../about/components/Stats";
import Sections from "../components/Sections";
import Faq from "../components/Faq";
import Service from "../../../../components/Services";
import FormComponent from "../../../../components/FormComponent";
import Header from "../../projects/components/Header";

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Activities - Musasa Travel",
  description: "Dive into heart-pounding adventures or tranquil cultural immersions curated by those who know the land best.",
};

// Mock category data for sections - replace with actual data as needed
const mockCategoryData = [
  {
    _id: '1',
    title: 'Victoria Falls Adventure',
    mainImage: 'https://res.cloudinary.com/dwx3y9j1d/image/upload/v1772711417/victoria-falls_kzd1kp.jpg',
    slug: { current: 'victoria-falls-adventure' }
  },
  {
    _id: '2',
    title: 'Wildlife Safari',
    mainImage: 'https://res.cloudinary.com/dwx3y9j1d/image/upload/v1772711419/south-africa_fv8tky.jpg',
    slug: { current: 'wildlife-safari' }
  },
  {
    _id: '3',
    title: 'Cultural Tour',
    mainImage: 'https://res.cloudinary.com/dwx3y9j1d/image/upload/v1772711385/bernd-dittrich-F4IdzUgXwa4-unsplash_qidgzk.jpg',
    slug: { current: 'cultural-tour' }
  },
];

const Page = async () => {
  return (
    <div>
      <Header title="Activities" />
      <Sections data={mockCategoryData} />
      <Stats />
      <Service />
      <FormComponent />
      <Faq />
    </div>
  );
};

export default Page;
