"use client";
import Link from "next/link";
import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { useAnimations } from "../hooks/useFramer";
import { MotionDiv } from "../lib/framer";

export default function HeroBanner({
  data,
}: {
  data: { title: string; subtitle?: string; subtitle2?: string };
}) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const { transition, textReveal } = useAnimations();

  useEffect(() => {
    const video = videoRef.current;

    const handleVideoEnd = () => {
      if (video) {
        video.pause();
        video.currentTime = 0;
        setTimeout(() => {
          if (video) {
            video.play();
          }
        }, 100);
      }
    };

    if (video) {
      video.addEventListener("ended", handleVideoEnd);
    }

    return () => {
      if (video) {
        video.removeEventListener("ended", handleVideoEnd);
      }
    };
  }, []);

  return (
    <div className="relative h-full w-full">
      <video
        id="myVideo"
        className="video"
        ref={videoRef}
        autoPlay
        loop
        muted
        playsInline
        controls={false}
      >
        <source
          src="https://res.cloudinary.com/dnir0cslk/video/upload/v1711011338/Office_-_Main_Page_e8pd2v_1_jibiqf.mp4"
          type="video/mp4"
        />
        <source
          src="https://res.cloudinary.com/dmxrtcszc/video/upload/v1710929534/Office_-_Main_Page_e8pd2v.webm"
          type="video/webm"
        />
        Your browser does not support the video tag.
      </video>

      <div className="absolute top-0 left-0 bg-black/40 w-full h-full flex justify-center flex-col">
        <div className="row justify-content-center mt-10 align-items-center text-white">
          <div className="col-xxl-10 col-md-9">
            <div className="hero-content">
              <div className="hero-content_text-block">
                <motion.h1
                  variants={textReveal}
                  initial="bananin"
                  whileInView="bananon"
                  viewport={{ once: true }}
                  transition={{ ...transition }}
                  className="hero-content__title heading-lg text-white max-w-[92vw] sm:max-w-none whitespace-normal sm:whitespace-nowrap break-words leading-tight"
                >
                  {data.title}
                </motion.h1>
                {data.subtitle && (
                  <motion.h2
                    variants={textReveal}
                    initial="bananin"
                    whileInView="bananon"
                    viewport={{ once: true }}
                    transition={{ ...transition, delay: 0.2 }}
                    className="hero-content__subtitle heading-md text-white mt-2 max-w-[92vw] sm:max-w-none whitespace-normal break-words leading-snug"
                  >
                    {data.subtitle}
                  </motion.h2>
                )}
                {data.subtitle2 && (
                  <motion.p
                    variants={textReveal}
                    initial="bananin"
                    whileInView="bananon"
                    viewport={{ once: true }}
                    transition={{ ...transition, delay: 0.3 }}
                    className="hero-content__subtitle2 heading-md text-white mt-2 max-w-[92vw] sm:max-w-none whitespace-normal break-words leading-snug"
                  >
                    {data.subtitle2}
                  </motion.p>
                )}
              </div>
              <MotionDiv
                initial="bananin"
                whileInView="bananon"
                viewport={{ once: true }}
                transition={{ ...transition, delay: 0.4 }}
                className="hero-content_button-group p-2"
              >
                <Link
                  href="/bookings"
                  className="btn btn-primary hvr-fill-black"
                >
                  Book Victoria Falls
                  <ArrowUpRight className="w-4 h-4" />
                </Link>
                <Link
                  href="/packages"
                  className="btn btn-white hvr-white-primary"
                >
                  View Safari Packages
                  <ArrowUpRight className="w-4 h-4" />
                </Link>
              </MotionDiv>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
