import React from "react";
import { PortableText } from "@portabletext/react";
import Image from "next/image";
import { client } from "../../../../sanity/lib/client";
import urlFor from "../../../../sanity/lib/urlFor";
import Header from "../components/Header";

import { Metadata } from "next";
import PortableBody from "../../../../components/portable";
import { Swiper } from "../../../../components/Swiper";
import ContactLink from "../../../../components/ContactLink";

import noimage from "@/assets/noimage.png";

export const revalidate = 360;

async function getData(slug: string) {
  const query = `
    *[_type == 'post' && slug.current == '${slug}'] {
        ...
      }[0]
    `;

  const data = await client.fetch(query);
  return data;
}

export async function generateMetadata({
  params: { slug },
}: any): Promise<Metadata> {
  const post = await getData(slug);
  // const post = await response.json();

  return {
    title: post.title,
    description: post.description,
  };
}

async function getDataProjects() {
  const query = `
  *[_type == 'project'] | order(_createdAt desc) {
    ...,
    "mainImage": mainImage.asset->url

  }`;

  const data = await client.fetch(query);
  return data;
}

export default async function Page({ params }: { params: { slug: string } }) {
  const data = await getData(params.slug);
  const dataprojects = await getDataProjects();

  const projects = dataprojects.filter((_: any, i: number) => i < 6);

  return (
    <div className="w-full">
      <div className="h-16 bg- w-full" />
      <Header title={data.title} />

      <div className="max-w-4xl mx-auto pb-20 p-4">
        <Image
          src={data.mainImage || noimage}
          alt="Title Image"
          width={800}
          height={800}
          priority
          className="rounded-lg mt-7 max-h-[60vh] object-contain w-full border"
        />

        <div className="mt-16 prose prose-blue prose-lg dark:prose-invert prose-li:marker:text-primary prose-a:text-primary">
          <PortableBody value={data.body} />
        </div>
      </div>
      <ContactLink />
      <Swiper data={projects} title="Recent" />
    </div>
  );
}
