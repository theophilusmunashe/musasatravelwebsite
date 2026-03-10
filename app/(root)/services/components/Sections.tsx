"use client";
import { industries } from "@/data/data";
import Image from "next/image";
import React from "react";

import Link from "next/link";
import { MotionDiv } from "../../../../lib/framer";
import ProjectCard from "../../../../components/ProjectCard";
import { AnimatePresence } from "framer-motion";

const Sections = ({ data }: any) => {
  return (
    <div className="max-w-6xl mx-auto ">
      <div className="p-4">
        <div className="row navigation-active isotope-navigation portfolio-v1 gutter-y-default">
          <AnimatePresence>
            {data.map((item: any, i: number) => (
              <MotionDiv
                key={i}
                className="col-lg-4 col-md-6 col-sm-11 "
                layout
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0 }}
              >
                <ProjectCard data={item} />
              </MotionDiv>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default Sections;
