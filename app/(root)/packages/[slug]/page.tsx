import React from "react";
import { client } from "../../../../sanity/lib/client";
import { groq } from "next-sanity";
import SlugComponent from "./SlugComponent";
import Header from "../components/Header";

import { Metadata } from "next";

const fetchArticleData = async (slug: string) => {
  const result = await client.fetch(
    groq`
      *[_type == "project" && slug.current == $slug][0]{
        ...,
        "mainImage": mainImage.asset->url,
        "planImage": planImage.asset->url,
        "designImage": designImage.asset->url,
        "constructImage": constructImage.asset->url,
      }`,
    { slug }
  );
  return result;
};

export async function generateMetadata({
  params: { slug },
}: any): Promise<Metadata> {
  const post = await fetchArticleData(slug);
  // const post = await response.json();

  return {
    title: post?.title,
    description: post?.description,
  };
}

async function getDataProjects() {
  const query = `
  *[_type == 'project'] | order(_createdAt desc) {
    ...
  }`;

  const data = await client.fetch(query);
  return data;
}

type Props = {
  params: { slug: string };
};

const Page = async ({ params }: Props) => {
  const data = await fetchArticleData(params.slug);
  const dataprojects = await getDataProjects();

  function shuffle(array: any[]) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }

  // Original dataprojects array

  // Shuffle the dataprojects array
  const shuffledProjects = shuffle(dataprojects.slice());

  // Select the first 4 elements from the shuffled array
  const projects = shuffledProjects.slice(0, 4);

  return (
    <div className="min-h-screen md:mt-0 mt-32">
      {/* <div className='h-16 bg-[#5f5f5f] text-black w-full' /> */}
      <SlugComponent data={data} projects={projects} />
    </div>
  );
};

export default Page;
