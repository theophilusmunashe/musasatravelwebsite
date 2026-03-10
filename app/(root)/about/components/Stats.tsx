"use client";
import React from "react";
import CountUp from "react-countup";

const Stats = () => {
  return (
    <div className="bg-[#212121] text-white p-4 sm:p-8 lg:px-12 py-20 md:py-32">
      <div className="flex items-center justify-center lg:gap-16 md:gap-8 md:flex-row flex-col gap-4">
        <div className="text-center">
          <h4 className="capitalize text-2xl lg:text-5xl font-medium">
            <CountUp start={100} end={183} duration={3} />
            {/* 11,000  */}
          
          </h4>
          <p className="text-[#979DAC] mt-4 text-base md:text-lg">
           Global travelers sheltered by our canopy
          </p>
        </div>

        <div className="text-center">
          <h4 className="capitalize text-2xl lg:text-5xl font-medium">
            <CountUp start={0} end={20} duration={3} />
            {/* 70  */}
            <span className="text-[#979DAC]">+</span>{" "}
          </h4>
          <p className="text-[#979DAC] mt-4 text-base md:text-lg">
            Unique landmarks and hidden gems curated
          </p>
        </div>

        <div className="text-center">
          <h4 className="capitalize text-2xl lg:text-5xl font-medium">
            <CountUp start={0} end={12} duration={3} />
            {/* 65  */}
            <span className="text-[#979DAC]">+</span>{" "}
          </h4>
          <p className="text-[#979DAC] mt-4 text-base md:text-lg">
            Countries across Africa and the Islands
          </p>
        </div>
      </div>
    </div>
  );
};

export default Stats;
