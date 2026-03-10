"use client";

import "../app/globals.scss";
import HeroBanner from "./HeroBanner";

const nav = [
  "01. Home Renovation",
  "02. Home Renovation",
  "03. Home Renovation",
];

export default function Hero() {
  const item = {
    background:
      "https://res.cloudinary.com/dnir0cslk/image/upload/v1708504257/Home_Page_01_ayf9jv.jpg",
    title: "Musasa Travel & Tours",
    subtitle: "Curated Journeys",
    description: "Lifetime Experiences",
  };

  return (
    <div className="hero-section-02">
      <div className="hero-fluid-slider">
        <HeroBanner data={item} />
      </div>
    </div>
  );
}

// "use client"
// import React from 'react'

// import imagehero from "@/assets/Welcome.svg"
// import Image from 'next/image'
// import { Button } from './ui/button'
// import { useRouter } from 'next/navigation'

// import { motion } from 'framer-motion'

// const Hero = () => {
//   const router = useRouter()
//   return (
//     <div className='h-screen  relative hero w-full flex flex-col justify-center items-center'>
//       <div className='w-full  h-screen  bg-black/40 flex justify-center flex-col items-center'>
//       <div className='flex h-full w-full justify-center items-center max-w-6xl mx-auto p-4'>
//         <div className='flex h-full w-full flex-col mt-20 items-center px-2 justify-center  gap-8'>
//           <h1 className='font-medium text-center text-[2rem] sm:text-5xl lg:text-[5rem] leading-none text-[#fff] '>
//           <motion.span
//               initial={{opacity: 0, y: 20}}
//               animate={{opacity: 1, y: 0}}
//               transition={{duration: 0.8, easing: 'ease'}}>
//             Your partner in design &amp; commercial transformations.

//           </motion.span>
//             </h1>
//             <motion.p
//                initial={{opacity: 0, transform: 'translateX(-100%)'}}
//                animate={{opacity: 1, transform: 'translateY(0%)'}}
//                transition={{duration: 0.3, easing: 'ease'}}
//               className='text-lg sm:text-xl md:text-2xl text-[#fff] '>
//               Uniquely Designed Spaces For Your Business
//             </motion.p>
//             <motion.button
//               initial={{opacity: 0, transform: 'translateX(-100%)'}}
//               animate={{opacity: 1, transform: 'translateY(0%)'}}
//               transition={{duration: 0.3, easing: 'ease'}}
//               className='hero-btn w-32 md:w-40  h-12 md:h-16 text-lg sm:text-xl md:text-2xl' onClick={() => router.push("/contact")}>
//               Get In Touch
//             </motion.button>
//         </div>

//       </div>
//       </div>
//     </div>
//   )
// }

// export default Hero
