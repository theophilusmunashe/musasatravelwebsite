import * as React from "react";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "./ui/carousel";
import Card from "../app/(root)/projects/components/Card";

export function Swiper({ data, title }: any) {
  return (
    <div className="max-w-6xl mx-auto py-10 space-y-8">
      <h4 className="text-2xl sm:text-3xl md:text-4xl  font-medium  capitalize relative mx-2">
        {title || "Suggested"} Packages
      </h4>
      <Carousel
        opts={{
          align: "start",
        }}
        className="w-full "
      >
        <CarouselContent>
          {data.map((item: any, index: number) => (
            <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
              <Card item={item} />
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  );
}
