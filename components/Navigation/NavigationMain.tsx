"use client";
import { isParentActive } from "../../lib/is-menu-active";
import { ChevronDown } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { navigationServices, navLinks } from "@/data/data";

export default function Navigation({ components }: any) {
  const path = usePathname();

  const comp = navigationServices.map((item: any) => {
    return {
      label: item.title,
      url: item.url,
    };
  });

  const navigation = [
    {
      label: "Home",
      url: "/",
    },
    {
      label: "About",
      url: "/about",
    },
    {
      label: "Services",
      url: "/services",
      dropdown: comp,
    },
    {
      label: "Packages",
      url: "/packages",
    },
    {
      label: "Bookings",
      url: "/bookings",
    },
    {
      label: "Contact",
      url: "/contact",
    },
  ];

  return (
    <>
      <ul className="site-menu-main">
        {navigation?.map((item, i) => (
          <li key={i} className="nav-item nav-item-has-children">
            {!item.dropdown ? (
              <Link
                href={item.url}
                className={`nav-link-item drop-trigger ${
                  path === item.url ? "ui-nav-active" : ""
                }`}
              >
                {item.label}
              </Link>
            ) : (
              <>
                <a
                  className={`nav-link-item drop-trigger ${
                    isParentActive(item, path) ? "ui-nav-active" : ""
                  }`}
                >
                  {item.label}
                  {item.dropdown ? (
                    <ChevronDown className="h-4 w-4 ml-3" />
                  ) : null}
                </a>
                <div className="sub-menu" id="submenu-3">
                  <ul className="sub-menu_list">
                    {item.dropdown?.map((item2: any, i2: any) => (
                      <li key={i2} className="sub-menu_item">
                        <Link href={item2.url || "/services"}>
                          <span
                            className={`menu-item-text ${
                              item2.url === path ? "active" : ""
                            }`}
                          >
                            {item2.label}
                          </span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </>
            )}
          </li>
        ))}
      </ul>
    </>
  );
}
