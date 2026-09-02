import React from "react";
import PageHeader from "../../../components/PageHeader";
import { client } from "../../../sanity/lib/client";
import PortableBody from "../../../components/portable";
import { pageMeta } from "@/lib/seo";
import { legalRevalidate } from "@/lib/page-revalidate";

export const metadata = pageMeta({
  title: "Privacy Policy",
  description:
    "Read how Musasa Travel & Tours collects and protects personal information when you book Victoria Falls tours and travel services.",
  path: "/privacy-policy",
});

async function getData() {
  const query = `
    *[_type == 'terms'] {
      ...
    }`;

  const data = await client.fetch(query);
  return data;
}

export const revalidate = legalRevalidate;

const Page = async () => {
  const data = await getData();
  return (
    <div>
      <div className="h-16 bg-[#F7F4ED] text-black w-full" />
      <PageHeader title="Privacy Policy" />

      <div className="max-w-4xl mx-auto pb-20">
        <PortableBody value={data.body} />
      </div>
    </div>
  );
};

export default Page;
