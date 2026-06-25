"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { navLinks } from "@/data/data";
import { cn } from "../../lib/utils";

export default function Navigation() {
  const path = usePathname();

  return (
    <ul className="site-menu-main">
      {navLinks.map((item) => (
        <li key={item.name} className="nav-item">
          <Link
            href={item.url}
            className={cn(
              "nav-link-item drop-trigger",
              path === item.url || (item.url === "/bookings" && path.startsWith("/bookings"))
                ? "ui-nav-active"
                : ""
            )}
          >
            {item.name}
          </Link>
        </li>
      ))}
    </ul>
  );
}
