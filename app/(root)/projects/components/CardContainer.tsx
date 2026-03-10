"use client";
import React from "react";
import Card from "./Card";

import "@/app/globals.scss";

import { AnimatePresence, motion } from "framer-motion";
import ProjectCard from "../../../../components/ProjectCard";

const CardContainer = ({ projects }: any) => {
  return (
    <div className="grid py-10 gap-4 px-4">
      <div className="row  navigation-active isotope-navigation portfolio-v1 gutter-y-default">
        <AnimatePresence>
          {projects.map((item: any) => (
            <motion.div
              key={item._id}
              className="col-lg-4 col-md-6 col-sm-11"
              layout
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0 }}
            >
              <ProjectCard data={item} />
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default CardContainer;
