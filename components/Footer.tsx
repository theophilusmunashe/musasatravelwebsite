"use client";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { Mail, Phone, MapPin, ArrowUpRight, MessageCircle } from "lucide-react";
import { FaFacebook, FaInstagram } from "react-icons/fa";
import logoimg from "@/assets/whitelogo.png";
import { WA_NUMBER, WA_RAW } from "@/app/(root)/bookings/components/WhatsAppButton";

const services = [
  { name: "Accommodation", href: "/services/accommodation" },
  { name: "Activities & Tours", href: "/services/activities" },
  { name: "Customized Itinerary", href: "/services/customized-itinerary" },
  { name: "Tour Guides", href: "/services/tour-guides" },
  { name: "Shuttle & Transfers", href: "/services/shuttle-services" },
];

const company = [
  { name: "About Us", href: "/about" },
  { name: "Packages", href: "/packages" },
  { name: "Bookings", href: "/bookings" },
  { name: "Contact", href: "/contact" },
  { name: "Blog", href: "/blogs" },
];

const socials = [
  {
    label: "Instagram",
    icon: <FaInstagram size={16} />,
    href: "https://www.instagram.com/musasatravelandtours/",
    color: "hover:border-pink-500/60 hover:text-pink-400",
  },
  {
    label: "Facebook",
    icon: <FaFacebook size={16} />,
    href: "https://www.facebook.com/profile.php?id=61587802886735",
    color: "hover:border-blue-500/60 hover:text-blue-400",
  },
  {
    label: "WhatsApp",
    icon: <MessageCircle size={16} />,
    href: `https://wa.me/${WA_NUMBER}`,
    color: "hover:border-green-500/60 hover:text-green-400",
  },
];

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.07, duration: 0.5, ease: [0.22, 1, 0.36, 1] },
  }),
};

export default function Footer() {
  return (
    <footer className="relative bg-[#080808] border-t border-white/8 overflow-hidden">
      {/* Subtle amber glow top-left */}
      <div className="pointer-events-none absolute -top-32 -left-32 w-96 h-96 rounded-full bg-amber-500/5 blur-3xl" />
      <div className="pointer-events-none absolute bottom-0 right-0 w-80 h-80 rounded-full bg-amber-500/4 blur-3xl" />

      <div className="relative max-w-7xl mx-auto px-6 md:px-10 pt-20 pb-10">

        {/* Top row */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 pb-16 border-b border-white/8">

          {/* Brand column */}
          <motion.div
            variants={fadeUp} custom={0} initial="hidden" whileInView="show" viewport={{ once: true }}
            className="lg:col-span-4 flex flex-col gap-6"
          >
            <Image src={logoimg} alt="Musasa Travel" width={160} height={60} className="object-contain" />
            <p className="text-white/50 text-sm leading-relaxed max-w-xs">
              Victoria Falls&apos; premier travel experience. We craft unforgettable African adventures — from thundering falls to silent savannahs.
            </p>
            <p className="text-amber-400/80 text-xs font-semibold uppercase tracking-[0.25em]">
              Rooted in Africa. Reaching the World.
            </p>

            {/* Contact info */}
            <div className="space-y-3 mt-2">
              <a href={`https://wa.me/${WA_NUMBER}`} target="_blank" rel="noopener noreferrer"
                className="flex items-center gap-3 text-white/50 hover:text-white text-sm transition-colors group">
                <Phone className="w-4 h-4 text-amber-400 flex-shrink-0" />
                <span>{WA_RAW}</span>
              </a>
              <a href="mailto:info@musasatravel.com"
                className="flex items-center gap-3 text-white/50 hover:text-white text-sm transition-colors">
                <Mail className="w-4 h-4 text-amber-400 flex-shrink-0" />
                <span>info@musasatravel.com</span>
              </a>
              <div className="flex items-start gap-3 text-white/50 text-sm">
                <MapPin className="w-4 h-4 text-amber-400 flex-shrink-0 mt-0.5" />
                <span>Victoria Falls, Zimbabwe</span>
              </div>
            </div>
          </motion.div>

          {/* Links columns */}
          <div className="lg:col-span-8 grid grid-cols-2 md:grid-cols-3 gap-10">

            <motion.div variants={fadeUp} custom={1} initial="hidden" whileInView="show" viewport={{ once: true }}>
              <h5 className="text-white font-bold text-sm uppercase tracking-[0.2em] mb-5">Services</h5>
              <ul className="space-y-3">
                {services.map((s) => (
                  <li key={s.name}>
                    <Link href={s.href}
                      className="text-white/45 hover:text-amber-400 text-sm transition-colors flex items-center gap-1.5 group">
                      <span className="w-1 h-1 rounded-full bg-amber-500/40 group-hover:bg-amber-400 transition-colors flex-shrink-0" />
                      {s.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.div>

            <motion.div variants={fadeUp} custom={2} initial="hidden" whileInView="show" viewport={{ once: true }}>
              <h5 className="text-white font-bold text-sm uppercase tracking-[0.2em] mb-5">Company</h5>
              <ul className="space-y-3">
                {company.map((c) => (
                  <li key={c.name}>
                    <Link href={c.href}
                      className="text-white/45 hover:text-amber-400 text-sm transition-colors flex items-center gap-1.5 group">
                      <span className="w-1 h-1 rounded-full bg-amber-500/40 group-hover:bg-amber-400 transition-colors flex-shrink-0" />
                      {c.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* CTA card */}
            <motion.div variants={fadeUp} custom={3} initial="hidden" whileInView="show" viewport={{ once: true }}
              className="col-span-2 md:col-span-1">
              <h5 className="text-white font-bold text-sm uppercase tracking-[0.2em] mb-5">Plan Your Trip</h5>
              <div className="bg-gradient-to-br from-amber-500/10 to-amber-500/5 border border-amber-500/20 rounded-2xl p-5 space-y-4">
                <p className="text-white/60 text-sm leading-relaxed">
                  Ready to experience the magic of Victoria Falls?
                </p>
                <Link href="/bookings"
                  className="inline-flex items-center gap-2 bg-amber-500 hover:bg-amber-400 text-black font-bold text-sm px-5 py-2.5 rounded-xl transition-colors">
                  Start Booking
                  <ArrowUpRight className="w-4 h-4" />
                </Link>
                <div className="pt-2 border-t border-white/8">
                  <p className="text-white/30 text-xs mb-3">Follow our adventures</p>
                  <div className="flex gap-2">
                    {socials.map((s) => (
                      <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer" aria-label={s.label}
                        className={`w-8 h-8 rounded-lg border border-white/10 bg-white/5 flex items-center justify-center text-white/40 transition-all duration-200 ${s.color}`}>
                        {s.icon}
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>

          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-white/25 text-xs">
            &copy; {new Date().getFullYear()} Musasa Travel &amp; Tours. All rights reserved.
          </p>
          <div className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse" />
            <p className="text-white/25 text-xs">Victoria Falls, Zimbabwe</p>
          </div>
        </div>

      </div>
    </footer>
  );
}
