import React from "react";
import Stats from "../about/components/Stats";

import Sections from "./components/Sections";
import { groq } from "next-sanity";
import { client } from "../../../sanity/lib/client";
import Faq from "./components/Faq";

import type { Metadata } from "next";
import BlogSection from "../../../components/BlogSection";
import Service from "../../../components/Services";
import FormComponent from "../../../components/FormComponent";
import Header from "../projects/components/Header";

export const metadata: Metadata = {
  title: "Services - Capture",
  description: "Elevating Interiors With Precision",
};

const categoryquery = groq`
  *[_type=="category"] {
    ...,
    "mainImage": mainImage.asset->url,
  } 
`;

const fetchCategory = async () => {
  try {
    const posts = await client.fetch(categoryquery);
    // Handle the fetched posts data
    return posts;
  } catch (error) {
    console.error("Error fetching posts:", error);
    return null;
  }
};

async function getData() {
  const query = `
  *[_type == 'post'] | order(_createdAt desc) {
    ...,
    "mainImage": mainImage.asset->url
  }`;

  const data = await client.fetch(query);
  return data;
}

export const revalidate = 360;

const Page = async () => {
  const category = await fetchCategory();
  const blogs = await getData();
  const blogPosts = blogs.filter((_: any, i: number) => i < 3);

  return (
    <div>
      <Header title="Services" />
      <Sections data={category} />
      <Stats />
      <Service />
      <FormComponent />
      <BlogSection data={blogPosts} />
      <Faq />
    </div>
  );
};

export default Page;
