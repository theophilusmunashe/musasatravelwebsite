import React from "react";
import AccommodationBanner from "./components/AccommodationBanner";
import AccommodationSections from "./components/AccommodationSections";
import Faq from "../components/Faq";

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Accommodation - Musasa Travel",
  description: "From luxury safari lodges to boutique coastal retreats, we hand-pick your sanctuary for every night of your journey.",
};

// 9 accommodation project cards with Cloudinary images
const mockCategoryData = [
  {
    _id: '1',
    title: 'Luxury Safari Lodge',
    mainImage: 'https://res.cloudinary.com/dwx3y9j1d/image/upload/v1772711417/victoria-falls_kzd1kp.jpg',
    slug: { current: 'luxury-safari-lodge' }
  },
  {
    _id: '2',
    title: 'Boutique Coastal Retreat',
    mainImage: 'https://res.cloudinary.com/dwx3y9j1d/image/upload/v1772711419/south-africa_fv8tky.jpg',
    slug: { current: 'boutique-coastal-retreat' }
  },
  {
    _id: '3',
    title: 'Mountain View Cabin',
    mainImage: 'https://res.cloudinary.com/dwx3y9j1d/image/upload/v1772711385/bernd-dittrich-F4IdzUgXwa4-unsplash_qidgzk.jpg',
    slug: { current: 'mountain-view-cabin' }
  },
  {
    _id: '4',
    title: 'Safari Tent Camp',
    mainImage: 'https://res.cloudinary.com/dwx3y9j1d/image/upload/v1772711417/victoria-falls_kzd1kp.jpg',
    slug: { current: 'safari-tent-camp' }
  },
  {
    _id: '5',
    title: 'Beachfront Villa',
    mainImage: 'https://res.cloudinary.com/dwx3y9j1d/image/upload/v1772711419/south-africa_fv8tky.jpg',
    slug: { current: 'beachfront-villa' }
  },
  {
    _id: '6',
    title: 'Eco Lodge',
    mainImage: 'https://res.cloudinary.com/dwx3y9j1d/image/upload/v1772711385/bernd-dittrich-F4IdzUgXwa4-unsplash_qidgzk.jpg',
    slug: { current: 'eco-lodge' }
  },
  {
    _id: '7',
    title: 'River View Cottage',
    mainImage: 'https://res.cloudinary.com/dwx3y9j1d/image/upload/v1772711417/victoria-falls_kzd1kp.jpg',
    slug: { current: 'river-view-cottage' }
  },
  {
    _id: '8',
    title: 'Desert Camp',
    mainImage: 'https://res.cloudinary.com/dwx3y9j1d/image/upload/v1772711419/south-africa_fv8tky.jpg',
    slug: { current: 'desert-camp' }
  },
  {
    _id: '9',
    title: 'Forest Retreat',
    mainImage: 'https://res.cloudinary.com/dwx3y9j1d/image/upload/v1772711385/bernd-dittrich-F4IdzUgXwa4-unsplash_qidgzk.jpg',
    slug: { current: 'forest-retreat' }
  },
];

const Page = async () => {
  return (
    <div>
      <AccommodationBanner />
      <AccommodationSections data={mockCategoryData} />
      <Faq />
    </div>
  );
};

export default Page;
