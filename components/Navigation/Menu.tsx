"use client";

import Link from "next/link";
import { navLinks } from "@/data/data";
import { cn } from "../../lib/utils";

export function Menu({ toggle }: { toggle?: () => void }) {
  return (
    <nav className="menu" aria-label="menu">
      <ul>
        {navLinks.map((link) => (
          <li key={link.name}>
            <Link
              href={link.url}
              onClick={toggle}
              className={cn("capitalize font-normal text-xl")}
            >
              {link.name}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
