"use client";
import { serviceItems, serviceItems2 } from "@/data/data";
import Image from "next/image";
import React from "react";

import { motion } from "framer-motion";

const container = {
  hidden: { opacity: 1, scale: 0 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      delayChildren: 0.3,
      staggerChildren: 0.2,
    },
  },
};

const itemList = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
  },
};

const Offers = () => {
  return (
    <div className="bg-[#111]">
      <motion.div
        initial={{ opacity: 0, transform: "translateY(-100%)" }}
        whileInView={{ opacity: 1, transform: "translateY(0%)" }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
        className="max-w-7xl mx-auto p-4 text-center py-12 relative transition-all overflow-hidden"
      >
        <h4 className="font-medium text-xl sm:text-3xl lg:text-4xl text-[#111] capitalize">
          Working with us
        </h4>
        <motion.ul
          className="my-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12"
          variants={container}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {serviceItems2.map((item, i: number) => (
            <motion.li key={i} className="space-y-4" variants={itemList}>
              <div className="mx-auto w-full flex flex-col justify-center items-center h-24">
                <Image
                  src={item.image}
                  alt="icon"
                  width={100}
                  height={100}
                  className=""
                />
              </div>
              <h4 className="text-center  text-lg sm:text-xl lg:text-2xl text-[#111]">
                {item.Service}
              </h4>
              <p className="text-sm md:text-base text-[#001233] text-center">
                {item.Description}
              </p>
            </motion.li>
          ))}
        </motion.ul>

        {/* <div className="absolute bottom-8 left-4 md:-left-6 w-[20px] md:w-[40px]">
        <Image src={Img1} alt='engine' className='animate-spin' />
      </div>

      <div className="absolute top-8 right-4 w-[30px] ">
        <Image src={Img2} alt='engine'  />
      </div> */}
      </motion.div>
    </div>
  );
};

export default Offers;
