"use client";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, X } from "lucide-react";
import { useState } from "react";
import { useCartStore } from "@/lib/cartStore";
import { buildWhatsAppEnquiryMessage, type EnquiryFormData } from "@/lib/enquiry-templates";

export const WA_NUMBER = "263776093268";
export const WA_RAW = "+263 77 609 3268";

/** Build a full WhatsApp booking message from cart items + optional form data */
export function buildWhatsAppMessage(
  cartItems: ReturnType<typeof useCartStore.getState>["items"],
  formData?: EnquiryFormData
): string {
  return buildWhatsAppEnquiryMessage(cartItems, formData);
}

export default function WhatsAppButton() {
  const [isOpen, setIsOpen] = useState(false);
  const cartItems = useCartStore((s) => s.items);
  const hasCart = cartItems.length > 0;

  const quickLinks = [
    { emoji: "🏨", text: "Accommodation options", msg: "Hi! I'd like to know about accommodation options at Musasa Travel." },
    { emoji: "🎯", text: "Activities & Tours", msg: "Hi! I'd like to know about activities and tours available." },
    { emoji: "📅", text: "Help with booking", msg: "Hi! I need help completing a booking with Musasa Travel." },
    { emoji: "💰", text: "Get a custom quote", msg: "Hi! I'd like a custom travel quote from Musasa Travel." },
  ];

  const openWa = (msg: string) =>
    window.open(`https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(msg)}`, "_blank");

  const openCartBooking = () => {
    const msg = buildWhatsAppMessage(cartItems);
    openWa(msg);
    setIsOpen(false);
  };

  return (
    <>
      {/* Floating WhatsApp bubble — bottom LEFT so it doesn't clash with cart (bottom right) */}
      <motion.button
        onClick={() => setIsOpen((o) => !o)}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.95 }}
        className="fixed bottom-8 left-6 z-50 flex items-center gap-2.5 bg-[#25D366] hover:bg-[#20bb5a] text-white font-bold px-4 py-3.5 rounded-full shadow-2xl shadow-green-500/30 transition-colors"
        aria-label="Chat on WhatsApp"
      >
        <MessageCircle className="w-5 h-5" />
        <span className="text-sm">WhatsApp</span>
        {hasCart && (
          <span className="bg-white text-green-600 text-xs font-black w-5 h-5 rounded-full flex items-center justify-center">
            {cartItems.length}
          </span>
        )}
      </motion.button>

      {/* Chat popup */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 16, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.95 }}
            transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
            className="fixed bottom-24 left-6 z-50 w-80 bg-[#111] border border-white/10 rounded-2xl shadow-2xl overflow-hidden"
          >
            {/* Header */}
            <div className="bg-[#25D366] text-white px-5 py-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 bg-white/20 rounded-full flex items-center justify-center">
                  <MessageCircle className="w-5 h-5" />
                </div>
                <div>
                  <p className="font-bold text-sm leading-none">Musasa Travel</p>
                  <p className="text-white/70 text-xs mt-0.5">{WA_RAW} · Instant reply</p>
                </div>
              </div>
              <button onClick={() => setIsOpen(false)} className="p-1 hover:bg-white/20 rounded-lg transition-colors">
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Body */}
            <div className="p-4 space-y-3">
              <p className="text-white/60 text-sm leading-relaxed">
                👋 Hi! Our team in Victoria Falls is ready to help. Chat instantly via WhatsApp.
              </p>

              {/* Cart booking shortcut */}
              {hasCart && (
                <button onClick={openCartBooking}
                  className="w-full text-left p-3.5 bg-[#25D366]/10 border border-[#25D366]/30 hover:border-[#25D366]/60 rounded-xl text-sm text-white transition-colors">
                  <span className="font-semibold text-green-400">📋 Send my current trip selection</span>
                  <p className="text-white/40 text-xs mt-1">{cartItems.length} item{cartItems.length !== 1 ? "s" : ""} — tap to send full details to our team</p>
                </button>
              )}

              {/* Quick links */}
              <div className="space-y-2">
                {quickLinks.map((l) => (
                  <button key={l.text} onClick={() => openWa(l.msg)}
                    className="w-full text-left p-3 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 rounded-xl text-sm text-white/70 hover:text-white transition-all">
                    {l.emoji} {l.text}
                  </button>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
