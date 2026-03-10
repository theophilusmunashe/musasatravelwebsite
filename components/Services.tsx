"use client";
import { serviceItems2 } from "@/data/data";
import ServiceCard from "./ServiceCard";

import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";

import { Pagination } from "swiper/modules";

export default function Service() {
  const options = {
    arrows: false,
    dots: true,
    slidesToShow: 4,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1400,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 992,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 576,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };
  return (
    <div className="service-section bg-[#212121]  section-padding-140">
      <div className="container">
        <div className="section-heading text-center">
          <span className="subtitle">WHAT WE OFFER</span>
          <h2 className="section-heading__title text-white">
            A Full Covering for the Modern Traveler
          </h2>
        </div>
        <div className="">
          <Swiper
            slidesPerView={"auto"}
            spaceBetween={20}
            pagination={{
              clickable: true,
            }}
            modules={[Pagination]}
            className="mySwiper"
          >
            {serviceItems2?.map((item, i) => (
              <SwiperSlide key={i} className="single-slide w-auto">
                <ServiceCard data={item} />
              </SwiperSlide>
            ))}
          </Swiper>
          {/* service slider card start */}

          {/* service slider emd start */}
        </div>
        {/* <div className="row gutter-y-default justify-content-center justify-content-md-start">
          {serviceItems2?.map((item, i) => (
            <div
              key={i}
              className="col-lg-4 col-md-6 col-sm-10"
              data-aos="fade-up"
              data-aos-delay={item.animation}
            >
              <ServiceCard data={item} />
            </div>
          ))}
        </div> */}
        {/* <div className="section-note-text">
                    Do you have any project on your mind? Call Us:
                    <a>+123 456789</a>
                </div> */}
      </div>
    </div>
  );
}
