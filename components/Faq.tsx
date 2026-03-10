"use client";

import * as React from "react";

import { Button } from "./ui/button";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "./ui/collapsible";
import { FaChevronDown } from "react-icons/fa";
import Link from "next/link";
import { AnimatePresence } from "framer-motion";
import { navigationServices } from "@/data/data";

export function CollapsibleDemo({ components, toggle }: any) {
  const [isOpen, setIsOpen] = React.useState(false);
  const services = navigationServices;

  return (
    <Collapsible
      open={isOpen}
      onOpenChange={setIsOpen}
      className="w-full space-y-2"
    >
      <div className="flex items-center justify-between space-x-4 ">
        <p className="text-xl m-0">Services</p>
        <CollapsibleTrigger asChild>
          <Button variant="link" size="sm">
            <FaChevronDown className="h-4 w-4 text-white" />
            <span className="sr-only">Toggle</span>
          </Button>
        </CollapsibleTrigger>
      </div>
      <CollapsibleContent className="space-y-2">
        <AnimatePresence>
          <ul className="flex flex-col gap-4 service">
            {services?.map((service: any, i: number) => (
              <li key={i} className="p-0 text-sm">
                <Link
                  onClick={toggle}
                  href={service.url}
                >
                  {service.title}
                </Link>
              </li>
            ))}
          </ul>
        </AnimatePresence>
      </CollapsibleContent>
    </Collapsible>
  );
}
