import React from "react";
import Header from "./components/Header";
import CardContainer from "./components/CardContainer";
import HeroProject from "./components/HeroProject";

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Packages - Musasa Travel",
  description: "Discover our curated travel packages and African adventure experiences",
};

// Hardcoded package data
const packageData = [
  {
    _id: '1',
    title: 'Victoria Falls Adventure',
    mainImage: 'https://res.cloudinary.com/dwx3y9j1d/image/upload/v1772611294/nam_cfqi1a.jpg',
    slug: { current: 'victoria-falls' }
  },
  {
    _id: '2',
    title: 'Cape Town Explorer',
    mainImage: 'https://res.cloudinary.com/dwx3y9j1d/image/upload/v1772611294/cape-town.jpg',
    slug: { current: 'cape-town' }
  },
  {
    _id: '3',
    title: 'Namibia Desert Safari',
    mainImage: 'https://res.cloudinary.com/dwx3y9j1d/image/upload/v1772611294/namibia.jpg',
    slug: { current: 'namibia' }
  },
  {
    _id: '4',
    title: 'Zimbabwe Wildlife Safari',
    mainImage: 'https://res.cloudinary.com/dwx3y9j1d/image/upload/v1772611294/zimbabwe.jpg',
    slug: { current: 'zimbabwe' }
  },
  {
    _id: '5',
    title: 'Mozambique Beach Escape',
    mainImage: 'https://res.cloudinary.com/dwx3y9j1d/image/upload/v1772611294/mozambique.jpg',
    slug: { current: 'mozambique' }
  },
  {
    _id: '6',
    title: 'Botswana Luxury Safari',
    mainImage: 'https://res.cloudinary.com/dwx3y9j1d/image/upload/v1772611294/botswana.jpg',
    slug: { current: 'botswana' }
  },
];

const Page = async () => {
  return (
    <div className="">
      <HeroProject />
      <div className="max-w-7xl mx-auto pb-32">
        <CardContainer projects={packageData} />
      </div>
    </div>
  );
};

export default Page;
