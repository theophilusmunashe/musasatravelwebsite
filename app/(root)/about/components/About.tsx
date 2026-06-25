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
              Tucked away on 2.5 hectares of serene land, {SITE_NAME} is a private estate where
              nature, elegance, and privacy come together in perfect harmony. With 6 beautifully
              designed en-suite bedrooms and versatile entertainment spaces, Kumusha is the perfect
              setting for weddings, conferences, intimate celebrations, or simply a peaceful escape.
              <br />
              <br />
              The name weaves together Shona, Ndebele, and Zulu — <em>Kumusha</em> and{" "}
              <em>Ekhayalethu</em>, our home. From wine tasting evenings to sip and paint events
              overlooking Victoria Falls in the far distance, every detail reflects our commitment
              to creating a sanctuary where you truly belong.
            </p>
          </div>
          <br />
          <div className="flex justify-center items-center md:justify-start md:items-start">
            <Link href="/bookings" className="btn btn-primary hvr-fill-black">
              Plan Your Visit
              <ArrowUpRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
