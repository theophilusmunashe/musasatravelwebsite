import React from "react";
import type { Metadata } from "next";
import { SITE_NAME } from "@/lib/site";
import Header from "../projects/components/Header";
import { client } from "../../../sanity/lib/client";
import PortableBody from "../../../components/portable";

export const metadata: Metadata = {
  title: "Terms & Conditions",
  description:
    `Review the terms and conditions governing the use of ${SITE_NAME} services, bookings, and website.`,
  robots: { index: true, follow: false },
};

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
      <Header title="Terms and Condition" />

      <div className="max-w-4xl mx-auto pb-20">
        <PortableBody value={data.body} />
      </div>
    </div>
  );
};

export default Page;
