"use client";

import Image from "next/image";
import React from "react";

import visionimg from "@/assets/yousef.webp";

import { motion } from "framer-motion";
import Reveal from "./Reveal";

const Vision = () => {
  return (
    <Reveal width="100%">
      <div className=" bg-[#b8b4ae]  h-full  flex flex-col justify-center items-center  p-4 sm:p-6 md:p-8 lg:p-12 lg:py-24 py-16">
        <div className="grid max-w-5xl mx-auto gap-12 md:gap-6 h-full place-items-center">
          <div>
            <h4 className="font-medium text-2xl md:text-3xl lg:text-5xl capitalize text-white">
              Commercial Design, Construction &amp; Refurbishment
            </h4>
            {/* <h4 className='font-medium text-2xl md:text-3xl lg:text-5xl capitalize text-[#fff] '>designing reality</h4> */}
            <p className="text-sm sm:text-base md:text-lg  text-white mt-8"></p>
          </div>
        </div>
      </div>
    </Reveal>
  );
};

export default Vision;
