import React from "react";
import Hero from "./components/Hero";
import Stats from "./components/Stats";
import About from "./components/About";
import Smart from "./components/Smart";
import Other from "./components/Other";
import JsonLd from "../../../components/JsonLd";
import { getTravelPackages } from "@/lib/travel-packages";
import { breadcrumbsJsonLd, pageMeta } from "@/lib/seo";

export const revalidate = 300;

export const metadata = pageMeta({
  title: "About Musasa Travel in Victoria Falls",
  description:
    "Musasa Travel & Tours is a Victoria Falls travel agency offering safari tours, lodges, licensed guides and airport transfers across Zimbabwe and Southern Africa.",
  path: "/about",
  keywords: [
    "Musasa Travel",
    "Victoria Falls travel agency",
    "about Musasa Travel",
    "Zimbabwe safari company",
    "Victoria Falls tours",
  ],
});

const Page = async () => {
  const packages = (await getTravelPackages()).slice(0, 3);

  return (
    <div>
      <JsonLd
        data={breadcrumbsJsonLd([
          { name: "Home", path: "/" },
          { name: "About Musasa Travel", path: "/about" },
        ])}
      />
      <Hero />
      <Stats />
      <About />
      <Smart />
      <Other data={packages} />
    </div>
  );
};

export default Page;
