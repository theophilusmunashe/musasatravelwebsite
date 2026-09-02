"use client";
import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import Image from "next/image";
import {
  Mail, Phone, MapPin, MessageSquare, Send,
  Clock, Check, ChevronDown, Instagram, Facebook,
} from "lucide-react";
import { submitContact } from "@/lib/submit-contact";
import toast from "react-hot-toast";

/* ─── Contact Info Cards ─────────────────────────────────────────────── */
const INFO = [
  {
    icon: <Phone className="w-5 h-5" />,
    label: "Call or WhatsApp",
    value: "+263 77 609 3268",
    sub: "Mon – Sun · 6am – 9pm CAT",
    href: "tel:+263776093268",
  },
  {
    icon: <Mail className="w-5 h-5" />,
    label: "Email Us",
    value: "enquiries@musasatravel.com",
    sub: "We reply within 24 hours",
    href: "mailto:enquiries@musasatravel.com",
  },
  {
    icon: <MapPin className="w-5 h-5" />,
    label: "Find Us",
    value: "Victoria Falls, Zimbabwe",
    sub: "Adventure Capital of Africa",
    href: "https://maps.google.com/?q=Victoria+Falls+Zimbabwe",
  },
  {
    icon: <Clock className="w-5 h-5" />,
    label: "Quote Turnaround",
    value: "Within 24–48 hours",
    sub: "Booking confirmations in 5 min",
    href: null,
  },
];

/* ─── Hero ───────────────────────────────────────────────────────────── */
function Hero() {
  return (
    <section className="relative min-h-[60vh] flex flex-col justify-end overflow-hidden">
      <div className="absolute inset-0">
        <Image
          src="https://images.unsplash.com/photo-1489824904134-891ab64532f1?w=1800&q=85"
          alt="Victoria Falls sunset"
          fill priority className="object-cover" sizes="100vw" unoptimized
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/50 to-black/90" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-transparent to-transparent" />
      </div>
      <div className="relative z-10 px-6 md:px-16 pb-14 max-w-7xl mx-auto w-full">
        <motion.p
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.1 }}
          className="text-amber-400 text-sm font-semibold uppercase tracking-[0.3em] mb-3"
        >
          We&apos;re Right Here
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="text-4xl md:text-5xl lg:text-6xl font-black text-white leading-[1.05] tracking-tight mb-4"
        >
          <span className="block">Contact Musasa Travel</span>
          <span className="block text-amber-400">in Victoria Falls</span>
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35, duration: 0.6 }}
          className="text-white/60 text-lg max-w-lg leading-relaxed"
        >
          Based in the heart of Victoria Falls, Zimbabwe — we are available
          around the clock to answer questions, build itineraries, and make
          your African dream a reality.
        </motion.p>
      </div>
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1 }} className="absolute bottom-5 right-8">
        <motion.div animate={{ y: [0, 6, 0] }} transition={{ repeat: Infinity, duration: 1.5 }}>
          <ChevronDown className="w-5 h-5 text-white/40" />
        </motion.div>
      </motion.div>
    </section>
  );
}

/* ─── Info Cards ─────────────────────────────────────────────────────── */
function InfoCards() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true });
  return (
    <div ref={ref} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-16">
      {INFO.map((item, i) => (
        <motion.div
          key={item.label}
          initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: i * 0.08, duration: 0.5 }}
        >
          {item.href ? (
            <a href={item.href} target={item.href.startsWith("http") ? "_blank" : undefined} rel="noreferrer"
              className="group flex flex-col gap-3 bg-[#111] border border-white/5 hover:border-amber-500/40 rounded-2xl p-5 transition-all duration-300 h-full">
              <div className="w-11 h-11 bg-amber-500/10 border border-amber-500/20 rounded-xl flex items-center justify-center text-amber-400 group-hover:bg-amber-500 group-hover:text-black transition-all duration-300">
                {item.icon}
              </div>
              <div>
                <p className="text-white/40 text-xs uppercase tracking-wider mb-1">{item.label}</p>
                <p className="text-white font-semibold text-sm group-hover:text-amber-400 transition-colors">{item.value}</p>
                <p className="text-white/30 text-xs mt-1">{item.sub}</p>
              </div>
            </a>
          ) : (
            <div className="flex flex-col gap-3 bg-[#111] border border-white/5 rounded-2xl p-5 h-full">
              <div className="w-11 h-11 bg-amber-500/10 border border-amber-500/20 rounded-xl flex items-center justify-center text-amber-400">
                {item.icon}
              </div>
              <div>
                <p className="text-white/40 text-xs uppercase tracking-wider mb-1">{item.label}</p>
                <p className="text-white font-semibold text-sm">{item.value}</p>
                <p className="text-white/30 text-xs mt-1">{item.sub}</p>
              </div>
            </div>
          )}
        </motion.div>
      ))}
    </div>
  );
}

/* ─── Contact Form ───────────────────────────────────────────────────── */
function ContactForm() {
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true });

  const inputClass = "w-full px-4 py-3 bg-white/5 border border-white/15 rounded-xl text-white placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-colors";

  if (sent) {
    return (
      <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
        className="flex flex-col items-center justify-center py-16 text-center">
        <div className="w-16 h-16 bg-green-500/20 border border-green-500/30 rounded-full flex items-center justify-center mb-5">
          <Check className="w-8 h-8 text-green-400" />
        </div>
        <h3 className="text-2xl font-bold text-white mb-3">Message Received!</h3>
        <p className="text-white/50 max-w-sm">Our team in Victoria Falls will be in touch within 24 hours. Thank you for reaching out.</p>
        <button onClick={() => setSent(false)} className="mt-8 text-amber-400 text-sm hover:text-amber-300 transition-colors">Send another message</button>
      </motion.div>
    );
  }

  return (
    <motion.div ref={ref} initial={{ opacity: 0, x: 40 }} animate={inView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}>
      <div className="mb-8">
        <p className="text-amber-400 text-sm uppercase tracking-[0.3em] mb-2">Get In Touch</p>
        <h2 className="text-3xl font-black text-white">Send Us a Message</h2>
      </div>

      <form
        className="space-y-5"
        onSubmit={async (e) => {
          e.preventDefault();
          setLoading(true);
          const form = e.currentTarget;
          const formData = new FormData(form);
          const { error } = await submitContact({
            firstName: String(formData.get("firstName") || ""),
            senderEmail: String(formData.get("senderEmail") || ""),
            phoneNumber: String(formData.get("phoneNumber") || ""),
            message: String(formData.get("message") || ""),
          });
          setLoading(false);
          if (error) {
            toast.error(error);
            return;
          }
          setSent(true);
        }}
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="text-white/50 text-xs uppercase tracking-wider mb-2 block">Your Name</label>
            <input name="firstName" required maxLength={500} placeholder="John Smith" className={inputClass} />
          </div>
          <div>
            <label className="text-white/50 text-xs uppercase tracking-wider mb-2 block">Phone Number</label>
            <input name="phoneNumber" type="tel" required maxLength={500} placeholder="+27 12 345 6789" className={inputClass} />
          </div>
        </div>

        <div>
          <label className="text-white/50 text-xs uppercase tracking-wider mb-2 block">Email Address</label>
          <input name="senderEmail" type="email" required maxLength={500} placeholder="you@example.com" className={inputClass} />
        </div>

        <div>
          <label className="text-white/50 text-xs uppercase tracking-wider mb-2 block">Your Message</label>
          <textarea name="message" required maxLength={5000} rows={5} placeholder="Tell us about your dream trip — destinations, dates, group size, and anything else you have in mind..." className={`${inputClass} resize-none`} />
        </div>

        <motion.button
          type="submit"
          disabled={loading}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="w-full bg-amber-500 hover:bg-amber-400 disabled:opacity-50 text-black font-bold py-4 rounded-xl flex items-center justify-center gap-2 transition-colors"
        >
          {loading ? (
            <span className="flex items-center gap-2"><span className="w-4 h-4 border-2 border-black/30 border-t-black rounded-full animate-spin" />Sending…</span>
          ) : (
            <><Send className="w-4 h-4" />Send Message</>
          )}
        </motion.button>
      </form>
    </motion.div>
  );
}

/* ─── Side Panel ─────────────────────────────────────────────────────── */
function SidePanel() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true });
  return (
    <motion.div ref={ref} initial={{ opacity: 0, x: -40 }} animate={inView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className="flex flex-col gap-6">

      {/* About blurb */}
      <div className="bg-[#111] border border-white/10 rounded-2xl p-6">
        <div className="w-10 h-10 bg-amber-500/10 border border-amber-500/20 rounded-xl flex items-center justify-center text-amber-400 mb-4">
          <MessageSquare className="w-5 h-5" />
        </div>
        <h3 className="text-white font-bold text-lg mb-3">Based in Victoria Falls</h3>
        <p className="text-white/50 text-sm leading-relaxed">
          We&apos;re not a call centre. We&apos;re a team of passionate travel experts who live, work, and breathe Africa every day from our base in Victoria Falls. When you contact us, you speak directly to the people who will design and manage your journey.
        </p>
      </div>

      {/* Response promise */}
      <div className="bg-amber-500/10 border border-amber-500/30 rounded-2xl p-6">
        <h3 className="text-amber-300 font-bold text-base mb-3">Our Response Promise</h3>
        <div className="space-y-3">
          {[
            { time: "5 minutes", desc: "Booking availability confirmations" },
            { time: "24 hours", desc: "General enquiries & custom quotes" },
            { time: "48 hours", desc: "Complex multi-country itineraries" },
          ].map((p) => (
            <div key={p.time} className="flex items-start gap-3">
              <div className="w-1.5 h-1.5 bg-amber-400 rounded-full mt-1.5 flex-shrink-0" />
              <div>
                <span className="text-amber-300 font-bold text-sm">{p.time}</span>
                <span className="text-white/50 text-sm"> — {p.desc}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Social */}
      <div className="bg-[#111] border border-white/10 rounded-2xl p-6">
        <p className="text-white/40 text-xs uppercase tracking-widest mb-4">Follow Our Journey</p>
        <div className="flex gap-3">
          {[
            { icon: <Instagram className="w-5 h-5" />, label: "Instagram", href: "https://instagram.com" },
            { icon: <Facebook className="w-5 h-5" />, label: "Facebook", href: "https://facebook.com" },
          ].map((s) => (
            <a key={s.label} href={s.href} target="_blank" rel="noreferrer"
              className="flex items-center gap-2 bg-white/5 border border-white/10 hover:border-amber-500/40 hover:text-amber-400 text-white/60 text-sm px-4 py-2.5 rounded-xl transition-all duration-300">
              {s.icon}{s.label}
            </a>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

/* ─── Main Export ────────────────────────────────────────────────────── */
export default function ContactClient() {
  return (
    <div className="bg-[#0a0a0a] min-h-screen">
      <Hero />

      <div className="max-w-7xl mx-auto px-6 md:px-16 py-20">
        <InfoCards />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          <SidePanel />
          <ContactForm />
        </div>
      </div>

      <div className="h-16" />
    </div>
  );
}
