import Book from "../../../../components/Book";
import React from "react";

import logo from "@/assets/Capture Projects Logo Design - (05-10-2023)-01-01 2.svg";
import Image from "next/image";

const Hero = () => {
  return (
    <div className=" h-full relative w-full flex justify-center flex-col items-center">
      <div className="w-full grid min-h-screen md:min-h-[700px] grid-cols-1 lg:grid-cols-2 text-white">
        <div className="h-full book w-full min-h-[600px] ">
          <div className="bg-black/30 w-full h-full  space-y-4 px-4  md:px-8 lg:px-16 justify-center flex flex-col gap-8">
            <h4 className="text-3xl md:text-4xl lg:text-6xl text-[#fff] font-medium">
              Experience the difference <br /> build with <br />
            </h4>
            <Image src={logo} alt="capture logo" width={250} height={150} />

            <p className="mt-8 text-base md:text-lg ">
              Transform your Sydney office, fitness, beauty, retail or
              hospitality space with our expert design and construct fitout
              services
            </p>
          </div>
        </div>
        <Book />
      </div>
    </div>
  );
};

export default Hero;
