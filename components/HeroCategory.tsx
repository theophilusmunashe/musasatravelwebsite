import Book from "./Book";
import { cn } from "../lib/utils";
import Image from "next/image";
import React from "react";
import { urlForImage } from "../sanity/lib/image";
import PortableBody from "./portable";

const HeroCategory = ({
  title,
  description,
  image,
  whats,
  list,
  body,
}: {
  title: string;
  description: string;
  image: any;
  list: any;
  whats: any;
  body: any;
}) => {
  return (
    <div className=" h-full max-w-6xl mx-auto  w-full flex justify-center flex-col p-4 md:p-8 items-center ">
      <div className="w-full grid  grid-cols-1  text-white ">
        <div className={cn("h-full w-full max-h-[500px] relative")}>
          <Image
            src={
              urlForImage(image) ||
              "https://res.cloudinary.com/dnir0cslk/image/upload/v1707266612/Welcome_c6i6xj.webp"
            }
            alt={title || "services"}
            width={600}
            height={600}
            className="w-full h-full relative object-contain md:object-cover"
          />
          {/* <div className="absolute top-0 bg-black/50 w-full h-full  space-y-4 px-4  md:px-8 lg:px-16 justify-center flex flex-col gap-8">
            <h4 className="text-3xl md:text-4xl lg:text-6xl text-[#fff] font-medium">
              {title}
            </h4>

            <p className="mt-8 text-base md:text-lg ">{description}</p>
          </div> */}
        </div>
        <div className="w-full h-full mt-8  space-y-4 pb-20 px-4 text-black  md:px-8 lg:px-16 justify-center flex flex-col">
          <h4 className="text-2xl md:text-3xl  font-medium">ABOUT SERVICE</h4>

          <p className="text-base md:text-lg ">{description}</p>
        </div>
        <br />
        <PortableBody value={body} />
        <br />

        <div className="w-full h-full mt-8  space-y-4 pb-20 px-4 text-black  md:px-8 lg:px-16 justify-center flex flex-col">
          <h4 className="text-2xl md:text-3xl  font-medium">
            WHAT&apos;S INCLUDED IN THIS SERVICE
          </h4>

          <p className="text-base md:text-lg ">{whats}</p>
          <br />
          <div className="px-4">
            <ul className="space-y-4">
              {list.map((item: any, i: number) => (
                <li key={i} className="text-sm list-disc">
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
        {/* <Book /> */}
      </div>
    </div>
  );
};

export default HeroCategory;
