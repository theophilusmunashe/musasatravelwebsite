"use client";
import React from "react";
import CountUp from "react-countup";

import clock from "@/assets/clock.svg";

import area from "@/assets/area.svg.svg";

import locationImg from "@/assets/Group.svg";
import Image from "next/image";

interface PersonalStatsProps {
  size: string;
  duration: string;
  location: string;
}
const PersonalStats = ({ size, duration, location }: PersonalStatsProps) => {
  return (
    <div className="bg-[#111] text-white p-4 sm:p-8 lg:p-12 py-20">
      <div className="flex items-center justify-between md:justify-center lg:gap-16 gap-8 flex-col  sm:flex-row  ">
        <div className="text-center flex items-center gap-2">
          <Image
            src={area}
            width={80}
            height={50}
            className="w-8 h-6 sm:w-10 sm:h-8 md:w-16 md:h-10 object-contain"
            alt="area"
          />
          <h4 className="capitalize text-sm  md:text-2xl lg:text-3xl font-medium">
            {size}
            {/* 11,000  */}
            <span className="text-[#979DAC] lowercase">m2</span>{" "}
          </h4>
        </div>

        <div className="text-center flex items-center md:border-x-2 gap-2  md:px-2">
          <Image
            src={clock}
            width={80}
            height={50}
            className="w-8 h-6 sm:w-10 sm:h-8 md:w-16 md:h-10 object-contain"
            alt="area"
          />
          <h4 className="capitalize text-sm  md:text-2xl lg:text-3xl font-medium mr-2">
            {duration}
          </h4>
        </div>

        <div className="text-center flex items-center gap-2 ">
          <Image
            src={locationImg}
            width={80}
            height={50}
            className="w-8 h-6 sm:w-10 sm:h-8 md:w-16 md:h-10 object-contain"
            alt="area"
          />
          <h4 className="capitalize text-sm  md:text-2xl lg:text-3xl font-medium">
            {location}
          </h4>
        </div>
      </div>
    </div>
  );
};

export default PersonalStats;
