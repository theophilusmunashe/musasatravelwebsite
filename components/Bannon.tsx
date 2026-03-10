"use client";
import { useAnimations } from "../hooks/useFramer";
import React from "react";
import { motion } from "framer-motion";
import { cn } from "../lib/utils";

export const Bannon = ({
  title,
  className,
}: {
  className: string;
  title: string;
}) => {
  const { transition, textReveal } = useAnimations();

  return (
    <motion.h1
      variants={textReveal}
      initial="bananin"
      whileInView="bananon"
      viewport={{ once: true }}
      transition={{ ...transition }}
      className={cn(className)}
    >
      {title}
    </motion.h1>
  );
};
