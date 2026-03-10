"use client"
import React from 'react'


import {motion, useScroll, useTransform } from "framer-motion"


const HeroProject = () => {
  let {scrollYProgress } = useScroll()
  let y = useTransform(scrollYProgress, [0, 1], ["0%", "80%"])

  return (
    <motion.div 
      style={{ y }}
      className='blog-hero h-[400px]' >
           <div className='w-full h-full  bg-black/60 flex justify-center flex-col items-center'>
      <div className='flex h-full w-full justify-center items-center max-w-6xl mx-auto p-4'>
        <div className='flex h-full w-full flex-col  justify-center  gap-4 md:gap-8'>
          <h1 className='text-center text-3xl md:text-5xl lg:text-7xl text-[#fff] '>
            Our Latest Blogs
          </h1>
           
        </div>

      </div>
      </div>
    </motion.div>
  )
}

export default HeroProject