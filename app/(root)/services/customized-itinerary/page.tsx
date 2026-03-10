import React from "react";
import Stats from "../../about/components/Stats";
import Sections from "../components/Sections";
import Faq from "../components/Faq";
import Service from "../../../../components/Services";
import FormComponent from "../../../../components/FormComponent";
import Header from "../../projects/components/Header";

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Customized Itinerary - Musasa Travel",
  description: "No two travelers are alike, so we craft bespoke journeys tailored specifically to your unique pace and passions.",
};

// Mock category data for sections - replace with actual data as needed
const mockCategoryData = [
  {
    _id: '1',
    title: 'Bespoke Safari Journey',
    mainImage: 'https://res.cloudinary.com/dwx3y9j1d/image/upload/v1772711417/victoria-falls_kzd1kp.jpg',
    slug: { current: 'bespoke-safari-journey' }
  },
  {
    _id: '2',
    title: 'Custom Adventure Package',
    mainImage: 'https://res.cloudinary.com/dwx3y9j1d/image/upload/v1772711419/south-africa_fv8tky.jpg',
    slug: { current: 'custom-adventure-package' }
  },
  {
    _id: '3',
    title: 'Personalized Tour Experience',
    mainImage: 'https://res.cloudinary.com/dwx3y9j1d/image/upload/v1772711385/bernd-dittrich-F4IdzUgXwa4-unsplash_qidgzk.jpg',
    slug: { current: 'personalized-tour-experience' }
  },
];

const Page = async () => {
  return (
    <div>
      <Header title="Customized Itinerary" />
      <Sections data={mockCategoryData} />
      <Stats />
      <Service />
      <FormComponent />
      <Faq />
    </div>
  );
};

export default Page;
