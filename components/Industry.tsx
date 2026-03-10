"use client";
import Image from "next/image";
import React from "react";

import Link from "next/link";

import { motion } from "framer-motion";
import Reveal from "./Reveal";
import { MotionDiv } from "../lib/framer";

const Industry = () => {
  // Static data for destinations
  const destinations = [
    { _id: '1', slug: { current: 'zimbabwe' }, mainImage: '/image/zimbabwe.jpg', name: 'Zimbabwe' },
    { _id: '2', slug: { current: 'south-africa' }, mainImage: '/image/south-africa.jpg', name: 'South Africa' },
    { _id: '3', slug: { current: 'namibia' }, mainImage: '/image/namibia.jpg', name: 'Namibia' },
    { _id: '4', slug: { current: 'mozambique' }, mainImage: '/image/mozambique.jpg', name: 'Mozambique' },
    { _id: '5', slug: { current: 'zambia' }, mainImage: '/image/zambia.jpg', name: 'Zambia' },
    { _id: '6', slug: { current: 'botswana' }, mainImage: '/image/botswana.jpg', name: 'Botswana' },
  ];

  return (
    <div className="min-h-screen flex-col flex justify-center py-20">
      <Reveal width="100%">
        <div className=" p-4 sm:p-6 md:p-8 py-16  w-full">
          <motion.div className="max-w-7xl mx-auto w-full h-full">
            <h1 className=" text-2xl sm:text-3xl text-black lg:text-5xl capitalize">
              Popular Destinations
            </h1>
            <div className="mt-4 w-full">
              <div className="grid grid-cols-1 lg:grid-cols-6 gap-4 font-medium w-full">
                {destinations.map((item: any) => (
                  <Link
                    href={`/category/${item.slug.current}`}
                    className="relative h-96  md:h-[450px] overflow-hidden group transition-all w-full"
                    key={item._id}
                  >
                    <Image
                      src={item.mainImage}
                      alt={item.name}
                      fill
                      className="w-full h-full group-hover:scale-150 duration-300 object-cover transition-all"
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
