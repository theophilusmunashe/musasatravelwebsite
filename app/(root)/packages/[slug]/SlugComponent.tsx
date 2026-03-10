"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import urlFor from "../../../../sanity/lib/urlFor";
import PersonalStats from "./PersonalStats";
import Plans from "./Plans";
import { Swiper } from "../../../../components/Swiper";
import ContactLink from "../../../../components/ContactLink";

const SlugComponent = ({ data, projects }: any) => {
  const [isLoading, setLoading] = useState(true);
  return (
    <div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:pl-24 overflow-hidden p-2">
        <div className="space-y-4 md:min-h-[600px] mt-32 px-0 md:px-16 py-4 flex flex-col justify-center h-full">
          <h4 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-medium">
            {data?.title}
          </h4>
          <p className="text-base md:text-lg md:leading-8">
            {data?.description}
          </p>
        </div>
        <div className="max-h-[600px]">
          <Image
            src={data?.mainImage}
            alt={data?.title}
            width={600}
            height={600}
            className={`object-cover w-full h-full hover:opacity-90  transition
                        duration-300 ease-in-out group-hover:opacity-75
                        ${
                          isLoading
                            ? "scale-110 blur-2xl grayscale"
                            : "scale-100 blur-0 grayscale-0"
                        })`}
            onLoad={() => setLoading(false)}
            loading="lazy"
          />
        </div>
      </div>
      <div className="w-32 md:w-44 bg-[#111] mb-0.5 h-4" />
      <PersonalStats
        size={data?.size}
        duration={data?.duration}
        location={data?.location}
      />
      <Plans data={data} />
      <ContactLink />
      <Swiper data={projects} title={"Suggested"} />
    </div>
  );
};

export default SlugComponent;
