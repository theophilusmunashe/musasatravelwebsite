import React from "react";
import PageHeader from "../../../components/PageHeader";
import { client } from "../../../sanity/lib/client";
import PortableBody from "../../../components/portable";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({
  title: "Terms & Conditions",
  description:
    "Review the terms and conditions for booking Victoria Falls tours, lodges and transfers with Musasa Travel & Tours.",
  path: "/terms-and-conditions",
});

async function getData() {
  const query = `
    *[_type == 'terms'] {
      ...
    }`;

  const data = await client.fetch(query);
  return data;
}

export const revalidate = 360000;

const Page = async () => {
  const data = await getData();
  return (
    <div>
      <div className="h-16 bg-[#F7F4ED] text-black w-full" />
      <PageHeader title="Terms and Conditions" />

      <div className="max-w-4xl mx-auto pb-20">
        <PortableBody value={data.body} />
      </div>
    </div>
  );
};

export default Page;
