"use client";
import React from "react";
import CountUp from "react-countup";

const Stats = () => {
  return (
    <div className="bg-[#212121] text-white p-4 sm:p-8 lg:px-12 py-20 md:py-32">
      <div className="flex items-center justify-center lg:gap-16 md:gap-8 md:flex-row flex-col gap-4">
        <div className="text-center">
          <h4 className="capitalize text-2xl lg:text-5xl font-medium">
            <CountUp start={0} end={2.5} decimals={1} duration={3} />
          </h4>
          <p className="text-[#979DAC] mt-4 text-base md:text-lg">
            Hectares of serene private land
          </p>
        </div>

        <div className="text-center">
          <h4 className="capitalize text-2xl lg:text-5xl font-medium">
            <CountUp start={0} end={6} duration={3} />
          </h4>
          <p className="text-[#979DAC] mt-4 text-base md:text-lg">
            Beautifully designed en-suite bedrooms
          </p>
        </div>

        <div className="text-center">
          <h4 className="capitalize text-2xl lg:text-5xl font-medium">
            <CountUp start={0} end={1} duration={3} />
            <span className="text-[#979DAC]"> view</span>
          </h4>
          <p className="text-[#979DAC] mt-4 text-base md:text-lg">
            Victoria Falls shimmering in the far distance
          </p>
        </div>
      </div>
    </div>
  );
};

export default Stats;
