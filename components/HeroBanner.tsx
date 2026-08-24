"use client";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { useAnimations } from "../hooks/useFramer";
import { MotionDiv } from "../lib/framer";
import { SITE } from "@/lib/site";

export default function HeroBanner({
  data,
}: {
  data: { title: string; subtitle?: string; subtitle2?: string };
}) {
  const { transition, textReveal } = useAnimations();

  return (
    <div className="relative w-full h-screen min-h-[100dvh]">
      <Image
        src={SITE.ogImage}
        alt="Victoria Falls, Zimbabwe — book tours, safaris and transfers with Musasa Travel"
        fill
        priority
        className="object-cover"
        sizes="100vw"
        unoptimized
      />

      <div className="absolute top-0 left-0 bg-black/45 w-full h-full flex justify-center flex-col">
        <div className="row justify-content-center mt-10 align-items-center text-white">
          <div className="col-xxl-10 col-md-9">
            <div className="hero-content">
              <div className="hero-content_text-block">
                <motion.h1
                  variants={textReveal}
                  initial="bananin"
                  whileInView="bananon"
                  viewport={{ once: true }}
                  transition={{ ...transition }}
                  className="hero-content__title heading-lg text-white max-w-[92vw] sm:max-w-4xl whitespace-normal break-words leading-tight"
                >
                  {data.title}
                </motion.h1>
                {data.subtitle && (
                  <motion.h2
                    variants={textReveal}
                    initial="bananin"
                    whileInView="bananon"
                    viewport={{ once: true }}
                    transition={{ ...transition, delay: 0.2 }}
                    className="hero-content__subtitle heading-md text-white mt-2 max-w-[92vw] sm:max-w-none whitespace-normal break-words leading-snug"
                  >
                    {data.subtitle}
                  </motion.h2>
                )}
                {data.subtitle2 && (
                  <motion.p
                    variants={textReveal}
                    initial="bananin"
                    whileInView="bananon"
                    viewport={{ once: true }}
                    transition={{ ...transition, delay: 0.3 }}
                    className="hero-content__subtitle2 heading-md text-white mt-2 max-w-[92vw] sm:max-w-3xl whitespace-normal break-words leading-snug"
                  >
                    {data.subtitle2}
                  </motion.p>
                )}
              </div>
              <MotionDiv
                initial="bananin"
                whileInView="bananon"
                viewport={{ once: true }}
                transition={{ ...transition, delay: 0.4 }}
                className="hero-content_button-group p-2"
              >
                <Link
                  href="/bookings"
                  className="btn btn-primary hvr-fill-black"
                >
                  Book Victoria Falls
                  <ArrowUpRight className="w-4 h-4" />
                </Link>
                <Link
                  href="/packages"
                  className="btn btn-white hvr-white-primary"
                >
                  View Safari Packages
                  <ArrowUpRight className="w-4 h-4" />
                </Link>
              </MotionDiv>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
