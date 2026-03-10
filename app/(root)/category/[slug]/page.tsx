import React, { Suspense, cache } from "react";

import { groq } from "next-sanity";
import { client } from "../../../../sanity/lib/client";
import { Page } from "../../../../types/type";
import Header from "../../projects/components/Header";
import CardContainer from "../../projects/components/CardContainer";
import Back from "../../../../components/Back";
import { AlertTriangle } from "lucide-react";
import HeroCategory from "../../../../components/HeroCategory";
import Faq from "../../services/components/Faq";
import Stats from "../../about/components/Stats";
import Industry from "../../services/components/Industry";
import BlogSection from "../../../../components/BlogSection";
import Offers from "../../../../components/Offers";
import PortableBody from "../../../../components/portable";
import Service from "../../../../components/Services";
import FormComponent from "../../../../components/FormComponent";

type Props = {
  params: {
    slug: "string";
  };
};

export const revalidate = 360;

export async function generateStaticParams() {
  const query = groq`*[__type == "category"]
    {
      slug
    }`;

  const slugs = await client.fetch(query);
  const slugRoutes = slugs.map((slug: any) => slug.slug.current);

  return slugRoutes.map((slug: string) => ({
    slug,
  }));
}

async function getData() {
  const query = `
  *[_type == 'post'] | order(_createdAt desc) {
    ...,
    "mainImage": mainImage.asset->url
  }`;

  const data = await client.fetch(query);
  return data;
}

const Categorypage = async ({ params: { slug } }: Props) => {
  const query = groq`*[_type == "category" && slug.current == $slug ] {
        _id,
        title,
        description,
        whats,
        list,
        "mainImage": mainImage.asset->url,
        body,
        ...,

        
      }[0]`;

  const clientFetch = cache(client.fetch.bind(client));
  const tags = await clientFetch<Page>(query, { slug });
  const blogs = await getData();
  const blogPosts = blogs.filter((_: any, i: number) => i < 3);

  return (
    <div className="">
      {/* <div className='h-16 bg-[#F7F4ED] text-black w-full' /> */}
      <Header title={slug} />

      <HeroCategory
        title={tags.title}
        description={tags.description || ""}
        image={tags?.mainImage}
        whats={tags.whats}
        list={tags.list}
        body={tags.body}
      />
      {/* <Header title={slug} /> */}

      <Stats />

      <BlogSection data={blogPosts} />
      <Faq />
      <FormComponent />
    </div>
  );
};

export default Categorypage;
