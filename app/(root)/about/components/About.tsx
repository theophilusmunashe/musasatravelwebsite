import Image from "next/image";
import Link from "next/link";

import "../../../globals.scss";
import story from "@/assets/aboutmain.webp";
import { ArrowUpRight } from "lucide-react";
import { SITE_NAME } from "@/lib/site";

export default function About() {
  return (
    <div className="a fix-hero min-h-screen">
      <div className="bg-neutral-800/80 text-white h-full min-h-screen w-full flex flex-col justify-center items-center p-4">
        <div
          className="max-w-5xl mx-auto flex flex-col justify-center h-full w-full"
          data-aos-duration={1000}
          data-aos="fade-left"
        >
          <div className="content-text-block text-center md:text-left">
            <span className="subtitle">Our Story & Vision</span>
            <h2 className="content-title heading-md text-2xl md:text-3xl lg:text-4xl">
              Home Is Ours.
            </h2>
            <br />
            <p className="sm:text-lg md:text-xl leading-relaxed max-w-none md:max-w-4xl">
              {SITE_NAME} was born from a simple but powerful idea: that everyone deserves a place
              they can truly call home. The name weaves together Shona, Ndebele, and Zulu —{" "}
              <em>Kumusha</em> and <em>Ekhayalethu</em>, our home.
              <br />
              <br />
              As a private estate, we offer more than residences. We offer a way of living rooted in
              community, security, and refined hospitality. From thoughtfully designed homes to curated
              on-estate experiences, every element reflects our commitment to creating a sanctuary where
              residents and guests feel they truly belong. At {SITE_NAME}, we don&apos;t just provide
              accommodation — we cultivate a shared sense of home.
            </p>
          </div>
          <br />
          <div className="flex justify-center items-center md:justify-start md:items-start">
            <Link href="/services/customized-itinerary" className="btn btn-primary hvr-fill-black">
              Our Services
              <ArrowUpRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
