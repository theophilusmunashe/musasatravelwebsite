import React from "react";
import Header from "./components/Header";

import { groq } from "next-sanity";
import { client } from "../../../sanity/lib/client";
import CardContainer from "./components/CardContainer";

import type { Metadata } from "next";
import { SITE_NAME } from "@/lib/site";
import HeroProject from "./components/HeroProject";

import "../../globals.scss";

export const metadata: Metadata = {
  title: "Packages",
  description: `Discover curated packages and experiences at ${SITE_NAME}`,
};

const query = groq`
  *[_type=="project"] {
    ...,
    "mainImage": mainImage.asset->url,
  } 
`;

export const revalidate = 3600;

const fetchPosts = async () => {
  try {
    const posts = await client.fetch(query);
    // Handle the fetched posts data
    return posts;
  } catch (error) {
    console.error("Error fetching posts:", error);
    return null;
  }
};

const Page = async () => {
  const posts = await fetchPosts();

  return (
    <div className="">
      <HeroProject />
      <div className="max-w-7xl mx-auto pb-32">
        <CardContainer projects={posts} />
      </div>
    </div>
  );
};

export default Page;
