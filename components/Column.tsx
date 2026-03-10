"use client";
import { MotionValue, motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

type ColumnProps = {
  data: any[];
  y: MotionValue<number>;
};

const Column: React.FC<ColumnProps> = ({ data, y }) => {
    const [hidden, setHidden] = useState(false);

  return (
    <motion.div
      style={{ y }}
      className="var-position w-1/4 h-full relative flex flex-col gap-[2vw] min-w-[250px] cursor-pointer"
    >
      {data?.map((image, index) => {
        return (
          <Link
            href={`/projects/${image?.slug?.current}`}
            key={index}
            className="w-full h-full relative rounded-[1vw] overflow-hidden group transition-all"
            onMouseOver={() => setHidden(true)}
            onMouseOut={() => setHidden(false)}
          >
            <Image
              src={image.mainImage}
              alt="text-pic"
              fill
              className="object-cover group-hover:scale-110 transition-all"
              quality={100}
              priority={true}
            />
             <motion.div 
                    variants={{
                      visible: { y: 0},
                      hidden: {y: "100%"}
                    }}
                    animate={!hidden ? "hidden" : "visible"}
                    transition={{ duration: 0.35, ease: "easeInOut"}}
              className='hidden group-hover:flex transition-all duration-75  absolute bg-black/50 text-center text-white w-full h-full top-0 left-0  items-center flex-col justify-center'>
                <h4 className='transition-all text-lg sm:text-xl font-medium'>{image?.title || "Name withheld"}</h4>
                <p className='transition-all uppercase text-sm'>{image?.location || "Australia"}</p>
            </motion.div>
          </Link>
        );
      })}
    </motion.div>
  );
};
export default Column;