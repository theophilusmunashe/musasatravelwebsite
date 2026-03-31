import React from "react";
import type { Metadata } from "next";
import Header from "../projects/components/Header";
import { client } from "../../../sanity/lib/client";
import PortableBody from "../../../components/portable";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "Read Musasa Travel & Tours' Privacy Policy to understand how we collect, use, and protect your personal information in compliance with POPIA, GDPR, and the Zimbabwe Data Protection Act.",
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
      <Header title="Privacy Policy" />

      <div className="max-w-4xl mx-auto pb-20">
        <PortableBody value={data.body} />
      </div>
    </div>
  );
};

export default Page;
