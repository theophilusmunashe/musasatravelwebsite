"use client";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuIndicator,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  NavigationMenuViewport,
} from "./ui/navigation-menu";
import { cn } from "../lib/utils";
import Link from "next/link";
import { navigationServices } from "@/data/data";

import React from "react";

interface ServicesNavProps {
  components?: any;
  toggle?: any;
}

const ServicesNav = ({ components, toggle }: ServicesNavProps) => {
  const services = navigationServices;

  return (
    <NavigationMenu className="bg-transparent">
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger className="p-0 h-auto bg-transparent">
            <p className="font-normal text-lg m-0">Services</p>
          </NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid gap-3 grid-cols-2 p-4 w-[400px]">
              {services.map((service: any) => (
                <ListItem
                  key={service.title}
                  title={service.title}
                  href={service.url}
                ></ListItem>
              ))}
              <ListItem title="SERVICES" href="/services" />
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
};

const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            "block select-none space-y-1 rounded-md p-2 leading-none no-underline outline-none transition-colors hover:bg-accent text-[#111] hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className
          )}
          {...props}
        >
          <div className="text-sm font-medium capitalize  leading-none">
            {title}
          </div>
        </a>
      </NavigationMenuLink>
    </li>
  );
});
ListItem.displayName = "ListItem";

export default ServicesNav;
