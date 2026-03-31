"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Shield, Check, X, ChevronDown, ChevronUp, ExternalLink } from "lucide-react";
import Link from "next/link";

const CONSENT_KEY = "musasa_privacy_consent_v1";

const COMPLIANCE_BADGES = [
  { label: "POPIA Compliant", hint: "South Africa Protection of Personal Information Act" },
  { label: "GDPR Aligned", hint: "EU General Data Protection Regulation" },
  { label: "Zim Data Protection Act", hint: "Zimbabwe Data Protection Act [Chapter 11:22]" },
  { label: "No Data Selling", hint: "Your data is never sold to third parties" },
];

export default function ConsentBanner() {
  const [visible, setVisible] = useState(false);
  const [expanded, setExpanded] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem(CONSENT_KEY);
    if (!stored) {
      const timer = setTimeout(() => setVisible(true), 5000);
      return () => clearTimeout(timer);
    }
  }, []);

  const accept = () => {
    localStorage.setItem(CONSENT_KEY, JSON.stringify({ decision: "accepted", date: new Date().toISOString() }));
    setVisible(false);
  };

  const decline = () => {
    localStorage.setItem(CONSENT_KEY, JSON.stringify({ decision: "declined", date: new Date().toISOString() }));
    setVisible(false);
  };

  return (
    <AnimatePresence>
      {visible && (
        <>
          {/* Subtle overlay to draw attention to banner */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="fixed inset-0 z-[8998] bg-black/30 backdrop-blur-[1px] pointer-events-none"
          />

          <motion.div
            initial={{ y: "100%", opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: "100%", opacity: 0 }}
            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
            className="fixed bottom-0 left-0 right-0 z-[8999] bg-[#0c0c0c] border-t border-white/10 shadow-[0_-20px_60px_rgba(0,0,0,0.5)]"
          >
            {/* Amber accent top edge */}
            <div className="h-[2px] w-full bg-gradient-to-r from-transparent via-amber-500/60 to-transparent" />

            <div className="max-w-7xl mx-auto px-5 md:px-10 py-5 md:py-6">

              {/* Main row */}
              <div className="flex flex-col lg:flex-row lg:items-center gap-5 lg:gap-8">

                {/* Icon */}
                <div className="flex-shrink-0">
                  <div className="w-11 h-11 rounded-xl bg-amber-500/10 border border-amber-500/25 flex items-center justify-center">
                    <Shield className="w-5 h-5 text-amber-400" />
                  </div>
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1.5">
                    <h3 className="text-white font-bold text-sm">Your Privacy & Data Rights</h3>
                    <span className="text-[10px] bg-amber-500/15 border border-amber-500/25 text-amber-400 px-2 py-0.5 rounded-full font-semibold">
                      Musasa Travel
                    </span>
                  </div>

                  <p className="text-white/50 text-xs leading-relaxed max-w-3xl">
                    Musasa Travel collects personal information — including your name, email address, phone number, and browsing activity — to deliver travel services, respond to your enquiries, and share relevant travel offers. We process your data lawfully and transparently, and you retain the right to access, correct, or request deletion of your data at any time.
                  </p>

                  {/* Expandable detail */}
                  <AnimatePresence>
                    {expanded && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                        className="overflow-hidden"
                      >
                        <div className="mt-3 pt-3 border-t border-white/8 grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-white/40 leading-relaxed max-w-3xl">
                          <div>
                            <p className="text-white/60 font-semibold mb-1">What we collect</p>
                            <ul className="space-y-0.5 list-disc list-inside">
                              <li>Contact details you submit via forms</li>
                              <li>Booking and itinerary preferences</li>
                              <li>Site usage analytics (anonymised)</li>
                              <li>WhatsApp communication records</li>
                            </ul>
                          </div>
                          <div>
                            <p className="text-white/60 font-semibold mb-1">How we use it</p>
                            <ul className="space-y-0.5 list-disc list-inside">
                              <li>Respond to enquiries and process bookings</li>
                              <li>Send relevant travel offers (opt-out anytime)</li>
                              <li>Improve our website and services</li>
                              <li>Comply with legal obligations</li>
                            </ul>
                          </div>
                        </div>
                        <p className="mt-3 text-[11px] text-white/30 max-w-3xl">
                          Your data is stored securely and never sold to third parties. To exercise your rights or withdraw consent, email{" "}
                          <a href="mailto:info@musasatravel.com" className="text-amber-400/70 hover:text-amber-400 transition-colors">
                            info@musasatravel.com
                          </a>
                          .
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Compliance badges + expand toggle */}
                  <div className="flex flex-wrap items-center gap-2 mt-3">
                    {COMPLIANCE_BADGES.map((b) => (
                      <span key={b.label} title={b.hint}
                        className="text-[10px] bg-white/4 border border-white/10 text-white/35 px-2.5 py-0.5 rounded-full cursor-default hover:border-amber-500/25 hover:text-white/50 transition-colors">
                        {b.label}
                      </span>
                    ))}
                    <button
                      onClick={() => setExpanded((e) => !e)}
                      className="flex items-center gap-1 text-[10px] text-amber-400/60 hover:text-amber-400 transition-colors ml-1"
                    >
                      {expanded ? <><ChevronUp className="w-3 h-3" /> Less detail</> : <><ChevronDown className="w-3 h-3" /> Full details</>}
                    </button>
                  </div>
                </div>

                {/* Action buttons */}
                <div className="flex items-center gap-3 flex-shrink-0">
                  <button
                    onClick={decline}
                    className="px-5 py-2.5 rounded-xl text-sm text-white/40 hover:text-white border border-white/10 hover:border-white/25 transition-all duration-200"
                  >
                    Decline
                  </button>
                  <motion.button
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={accept}
                    className="flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm bg-amber-500 hover:bg-amber-400 text-black font-bold transition-colors shadow-lg shadow-amber-500/20"
                  >
                    <Check className="w-4 h-4" />
                    Accept &amp; Continue
                  </motion.button>
                  <button
                    onClick={decline}
                    className="p-2 rounded-lg text-white/25 hover:text-white/60 hover:bg-white/8 transition-colors lg:hidden"
                    aria-label="Close"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Footer note */}
              <p className="mt-3 text-[10px] text-white/20 text-center lg:text-left">
                By accepting, you agree to our{" "}
                <Link href="/privacy" className="text-white/35 hover:text-amber-400 transition-colors underline underline-offset-2">
                  Privacy Policy
                </Link>
                {" "}and{" "}
                <Link href="/contact" className="text-white/35 hover:text-amber-400 transition-colors underline underline-offset-2">
                  Terms of Use
                </Link>
                . You can change your preferences at any time.
              </p>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
