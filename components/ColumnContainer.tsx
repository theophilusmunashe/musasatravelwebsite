"use client";
import { useEffect, useRef } from "react";
import { useTransform, useScroll } from "framer-motion";
import Lenis from "@studio-freight/lenis";
import useDimension from "../hooks/useDimension";
import Column from "./Column";

// Array of image URLs

const ColumnContainer = ({ data }: any) => {
  // Create a reference for the columnContainer element
  const columnContainer = useRef(null);
  // Get the height value property from the dimension state
  const { height } = useDimension();
  // Get scrollYProgress using the useScroll hook on the columnContainer element
  const { scrollYProgress } = useScroll({
    target: columnContainer,
    //Start tracking at the bottom of the window and top of the columnContainer and stop tracking at the top of the window and bottom of the columnContainer
    offset: ["start end", "end start"],
  });

  // Calculate transformations based on scrollYProgress and height
  const y = useTransform(scrollYProgress, [0, 1], [0, height * 2]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, height * 3.3]);
  const y3 = useTransform(scrollYProgress, [0, 1], [0, height * 1.25]);
  const y4 = useTransform(scrollYProgress, [0, 1], [0, height * 3]);

  useEffect(() => {
    const lenis = new Lenis();

    // Define a recursive animation function using requestAnimationFrame
    function raf(time: any) {
      lenis.raf(time); // Update the Lenis instance with the current time
      requestAnimationFrame(raf); // Request the next animation frame
    }

    requestAnimationFrame(raf); // Start the animation loop by calling requestAnimationFrame with raf
  }, []);

  return (
    <div
      ref={columnContainer}
      className="bg-slate-950 h-[175vh] relative flex gap-[2vw] p-[2vw] overflow-hidden"
    >
      <Column y={y} data={[data[0], data[1], data[2]]} />
      <Column y={y2} data={[data[3], data[4], data[5]]} />
      <Column y={y3} data={[data[5], data[3], data[0]]} />
      <Column y={y4} data={[data[2], data[1], data[5]]} />
    </div>
  );
};
export default ColumnContainer;
