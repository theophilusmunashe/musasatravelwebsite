import { foot, footerItems } from "@/data/data";
import { Mail, PhoneCall } from "lucide-react";
import Link from "next/link";
import React from "react";

import logoimg from "@/assets/whitelogo.png";
import Image from "next/image";
import { FaFacebook, FaInstagram } from "react-icons/fa";

const Footer = () => {
  return (
    <div className="  min-h-96 text-white bg-[#111] flex justify-center flex-col md:items-center">
      <div className="flex md:flex-row gap-8 flex-col p-4 sm:p-8 md:p-12 pt-20 items-center">
        <div className="w-64 flex flex-col items-center text-center">
          <Image
            src={logoimg}
            alt="logo"
            width={200}
            height={150}
            className="object-contain"
          />
          <p className=" text-lg sm:text-xl font-medium text-center">
            Rooted in Africa.  <br /> Reaching the World.
          </p>
        </div>
        <div className="flex-1 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {footerItems.map((item, i: number) => (
            <div key={i}>
              <h4 className="text-lg font-bold">{item.title}</h4>
              <ul className="space-y-2">
                {item.links.map((link, i: number) => (
                  <li
                    key={i}
                    className="text-sm md:text-base hover:underline transition-all"
                  >
                    <Link href={`${link.url}`}>{link.name}</Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
          <div className="space-y-3">
            <a
              className="flex items-center gap-3"
              href="mailto:Info@capturegroup.com.au"
            >
              <Mail size={20} />
              Info@musasatravel.com
            </a>

            <p className="text-lg font-bold">Our Social Pages</p>
            <div className="flex gap-3 items-center">
              <a
                href="https://www.instagram.com/captureprojects.syd/?fbclid=IwAR2l1zXJZLHybSsKJ3u2"
                className="bg-white rounded-full p-2 flex items-center transition-all hover:scale-95 hover:bg-black/90"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaInstagram color="red" size={20} />{" "}
              </a>
              <a
                href="https://www.facebook.com/profile.php?id=61552623605653"
                className="bg-white rounded-full p-2 flex items-center transition-all hover:scale-95 hover:bg-black/90"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaFacebook color="blue" size={20} />
              </a>
            </div>
          </div>
        </div>
      </div>
      <hr className="bg-white w-full h-0.5 mt-16" />
      <div className="border-t border-black w-full py-0">
        <p className="text-center text-sm">
          &copy; Musasa Travel & Tours Copyright 2026.
        </p>
      </div>
    </div>
  );
};

export default Footer;
