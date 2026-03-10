"use client"
import { motion, useTransform, useScroll } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import Reveal from "./Reveal";

const Example = ({data}: any) => {
  return (
   <Reveal width="100%">
     <div className="bg-neutral-900">

      <HorizontalScrollCarousel  data={data} />

      </div>
   </Reveal>
  );
};

const HorizontalScrollCarousel = ({data}: any) => {
  const targetRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
    smooth: 5
  });

  const x = useTransform(scrollYProgress, [0, 1], ["1%", "-85%"]);

  return (
    <section ref={targetRef} className="relative h-[110vh] bg-neutral-900">
        <h1 className='mx-4 md:mx-24 py-4  md:py-8 text-2xl sm:text-3xl text-white lg:text-5xl capitalize'>
        Industries
        </h1>  
      <div className="sticky top-0 flex h-screenv items-center overflow-hidden">
        <motion.div style={{ x }} className="flex gap-4">
          {data.map((card: any) => {
            return <Card card={card} key={card._id} />;
          })}
        </motion.div>
      </div>
    </section>
  );
};

const Card = ({ card }:any) => {
  return (
    <div
    key={card._id}
      className="group relative h-[450px] flex justify-center w-80 md:w-[450px] overflow-hidden "
    >
         <Link href={`/category/${card.slug.current}`} className=' h-96 md:h-[450px] overflow-hidden group transition-all w-full' >
                <Image src={card.mainImage} alt='office' fill className='w-full h-full group-hover:scale-110 object-cover transition-all' />
            <div className=' bg-black/50 hover:bg-black/20 transition-all cursor-pointer absolute top-0 w-full h-full justify-center items-center flex text-white text-sm md:text-lg uppercase'>
                <h4 className="font-medium text-2xl">
                    {card.title}
                </h4>
            </div>
        </Link>  
    </div>
  );
};

export default Example;

