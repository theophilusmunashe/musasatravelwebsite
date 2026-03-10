import React from "react";
import Stats from "../../about/components/Stats";
import Sections from "../components/Sections";
import Faq from "../components/Faq";
import Service from "../../../../components/Services";
import FormComponent from "../../../../components/FormComponent";
import Header from "../../projects/components/Header";

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Tour Guides - Musasa Travel",
  description: "Explore through the eyes of passionate experts who breathe life into every landmark and hidden trail.",
};

// Mock category data for sections - replace with actual data as needed
const mockCategoryData = [
  {
    _id: '1',
    title: 'Expert Local Guide',
    mainImage: 'https://res.cloudinary.com/dwx3y9j1d/image/upload/v1772711417/victoria-falls_kzd1kp.jpg',
    slug: { current: 'expert-local-guide' }
  },
  {
    _id: '2',
    title: 'Wildlife Specialist Guide',
    mainImage: 'https://res.cloudinary.com/dwx3y9j1d/image/upload/v1772711419/south-africa_fv8tky.jpg',
    slug: { current: 'wildlife-specialist-guide' }
  },
  {
    _id: '3',
    title: 'Cultural Heritage Guide',
    mainImage: 'https://res.cloudinary.com/dwx3y9j1d/image/upload/v1772711385/bernd-dittrich-F4IdzUgXwa4-unsplash_qidgzk.jpg',
    slug: { current: 'cultural-heritage-guide' }
  },
];

const Page = async () => {
  return (
    <div>
      <Header title="Tour Guides" />
      <Sections data={mockCategoryData} />
      <Stats />
      <Service />
      <FormComponent />
      <Faq />
    </div>
  );
};

export default Page;
