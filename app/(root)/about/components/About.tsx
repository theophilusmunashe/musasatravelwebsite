import Image from "next/image";
import Link from "next/link";

import "../../../globals.scss";
import story from "@/assets/aboutmain.webp";
import { ArrowUpRight } from "lucide-react";

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
              The Canopy Of Care.
            </h2>
            <br />
            <p className="sm:text-lg md:text-xl leading-relaxed max-w-none md:max-w-4xl">
              Headquartered in the thundering &quot;Adventure Capital&quot; of Victoria Falls, Zimbabwe, Musasa Travel & Tours was born from a vision of creating a travel experience that mimics the resilient Musasa tree. In the African wild, the Musasa is celebrated for its vast, protective shade and its incredibly deep, stabilizing roots. We carry this metaphor into everything we do: our &quot;roots&quot; allow us to navigate the complexities of global travel with stability, while our &quot;canopy&quot; provides a safe, seamless covering for our clients from the moment they leave home.
              <br />
              <br />
              While our heart remains firmly planted in Southern African soil, our reach is intentionally global. We specialize in connecting the world to the soul of Africa—from the desert dunes of Namibia and the vineyards of Cape Town to the turquoise waters of Mauritius and Mozambique. As a registered and locally-based entity, we offer the &quot;home-ground&quot; advantage, providing insider access and 24/7 support that only a true local can guarantee. At Musasa, we don&apos;t just book trips; we plant the seeds for lifelong memories, ensuring you are grounded in comfort and covered by excellence every step of the way.
            </p>
          </div>
          <br />
          <div className="flex justify-center items-center md:justify-start md:items-start">
            <Link href="/services" className="btn btn-primary hvr-fill-black">
              Our Services
              <ArrowUpRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
