"use client";
import React from "react";

import Link from "next/link";

import { motion } from "framer-motion";
import Reveal from "./Reveal";
import { MotionDiv } from "../lib/framer";

import imgBotswana from "../public/image/botswana.jpg";
import imgMozambique from "../public/image/mozambique.jpg";
import imgNamibia from "../public/image/namibia.jpg";
import imgSouthAfrica from "../public/image/south-africa.jpg";
import imgZambia from "../public/image/zambia.jpg";
import imgZimbabwe from "../public/image/zimbabwe.jpg";

const Industry = () => {
  // Bundled like logo — avoids relying on /public on cPanel standalone
  const destinations = [
    { _id: "1", slug: { current: "zimbabwe" }, mainImage: imgZimbabwe, name: "Zimbabwe" },
    {
      _id: "2",
      slug: { current: "south-africa" },
      mainImage: imgSouthAfrica,
      name: "South Africa",
    },
    { _id: "3", slug: { current: "namibia" }, mainImage: imgNamibia, name: "Namibia" },
    {
      _id: "4",
      slug: { current: "mozambique" },
      mainImage: imgMozambique,
      name: "Mozambique",
    },
    { _id: "5", slug: { current: "zambia" }, mainImage: imgZambia, name: "Zambia" },
    { _id: "6", slug: { current: "botswana" }, mainImage: imgBotswana, name: "Botswana" },
  ];

  return (
    <div className="min-h-screen flex-col flex justify-center py-20">
      <Reveal width="100%">
        <div className=" p-4 sm:p-6 md:p-8 py-16  w-full">
          <motion.div className="max-w-7xl mx-auto w-full h-full">
            <h2 className=" text-2xl sm:text-3xl text-black lg:text-5xl capitalize">
              Victoria Falls &amp; Southern Africa Destinations
            </h2>
            <div className="mt-4 w-full">
              <div className="grid grid-cols-1 lg:grid-cols-6 gap-4 font-medium w-full">
                {destinations.map((item: any) => (
                  <Link
                    href="/packages"
                    className="relative h-96  md:h-[450px] overflow-hidden group transition-all w-full"
                    key={item._id}
                  >
                    <img
                      src={item.mainImage.src}
                      alt={`${item.name} tours and safaris with Musasa Travel`}
                      width={item.mainImage.width}
                      height={item.mainImage.height}
                      className="absolute inset-0 h-full w-full object-cover transition-all duration-300 group-hover:scale-150"
                    />
                    <MotionDiv
                      initial={{ opacity: 0, transform: "translateY(-100%)" }}
                      animate={{ opacity: 1, transform: "translateY(0%)" }}
                      className=" bg-black/50 hover:bg-black/40 transition-all cursor-pointer absolute top-0 w-full h-full justify-center items-center flex text-white text-xs text-center uppercase"
                    >
                      <h4>{item.name}</h4>
                    </MotionDiv>
                  </Link>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </Reveal>
    </div>
  );
};

export default Industry;
