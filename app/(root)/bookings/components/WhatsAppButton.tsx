"use client";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { useState } from "react";
import { useCartStore } from "@/lib/cartStore";
import { SITE_NAME } from "@/lib/site";

export const WA_NUMBER = "263776093268";
export const WA_RAW = "+263 77 609 3268";

function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden>
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.435 9.884-9.884 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  );
}

/** Build a full WhatsApp booking message from cart items + optional form data */
export function buildWhatsAppMessage(cartItems: ReturnType<typeof useCartStore.getState>["items"], formData?: Record<string, any>): string {
  const lines: string[] = [];

  lines.push(`🏡 *NEW BOOKING REQUEST – ${SITE_NAME.toUpperCase()}*`);
  lines.push("━━━━━━━━━━━━━━━━━━━━━━");

  if (formData?.firstName || formData?.lastName) {
    lines.push(`👤 *Guest:* ${formData.firstName ?? ""} ${formData.lastName ?? ""}`.trim());
  }
  if (formData?.email) lines.push(`📧 *Email:* ${formData.email}`);
  if (formData?.phone) lines.push(`📱 *Phone:* ${formData.phone}`);
  if (formData?.startDate && formData?.endDate) {
    lines.push(`📅 *Dates:* ${new Date(formData.startDate).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" })} → ${new Date(formData.endDate).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" })}`);
  }
  if (formData?.travelers) lines.push(`👥 *Travellers:* ${formData.travelers}`);

  if (cartItems.length > 0) {
    lines.push("");
    lines.push("🛒 *SELECTED ITEMS:*");
    cartItems.forEach((item) => {
      const qty = item.quantity > 1 ? ` (×${item.quantity})` : "";
      const typeEmoji = item.category === "accommodation" ? "🏨" : item.category === "guide" ? "🧭" : item.category === "transfer" ? "🚗" : item.category === "meal" ? "🍽️" : "✅";
      lines.push(`${typeEmoji} ${item.name}${qty} — ${item.price}`);
    });
  }

  if (formData?.specialRequests) {
    lines.push("");
    lines.push(`💬 *Special Requests:* ${formData.specialRequests}`);
  }

  lines.push("");
  lines.push("Please confirm availability. Thank you! 🙏");

  return lines.join("\n");
}

const quickLinks = [
  { emoji: "🏨", text: "Accommodation options", msg: (name: string) => `Hi! I'd like to know about accommodation options at ${name}.` },
  { emoji: "🎯", text: "Activities & Tours", msg: () => "Hi! I'd like to know about activities and tours available." },
  { emoji: "📅", text: "Help with booking", msg: (name: string) => `Hi! I need help completing a booking with ${name}.` },
  { emoji: "💰", text: "Get a custom quote", msg: (name: string) => `Hi! I'd like a custom quote from ${name}.` },
];

function ChatTimestamp() {
  const now = new Date();
  const time = now.toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit" });
  return <span className="text-[11px] text-[#667781]">{time}</span>;
}

function IncomingBubble({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex justify-start">
      <div className="relative max-w-[85%] rounded-lg rounded-tl-none bg-white px-3 py-2 shadow-sm">
        <div className="absolute -left-2 top-0 h-0 w-0 border-r-[8px] border-t-[8px] border-r-white border-t-transparent" />
        <div className="text-[14px] leading-[1.35] text-[#111b21]">{children}</div>
        <div className="mt-1 flex justify-end">
          <ChatTimestamp />
        </div>
      </div>
    </div>
  );
}

export default function WhatsAppButton() {
  const [isOpen, setIsOpen] = useState(false);
  const cartItems = useCartStore((s) => s.items);
  const hasCart = cartItems.length > 0;

  const openWa = (msg: string) => {
    window.open(`https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(msg)}`, "_blank");
    setIsOpen(false);
  };

  const openCartBooking = () => {
    openWa(buildWhatsAppMessage(cartItems));
  };

  return (
    <>
      {/* Icon-only floating button — bottom left, away from cart */}
      <motion.button
        onClick={() => setIsOpen((o) => !o)}
        whileHover={{ scale: 1.06 }}
        whileTap={{ scale: 0.94 }}
        className="fixed bottom-8 left-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg shadow-black/20 transition-colors hover:bg-[#20bd5a]"
        aria-label="Chat on WhatsApp"
      >
        <WhatsAppIcon className="h-7 w-7" />
        {hasCart && (
          <span className="absolute -right-0.5 -top-0.5 flex h-5 min-w-5 items-center justify-center rounded-full border-2 border-white bg-[#ea0038] px-1 text-[10px] font-bold text-white">
            {cartItems.length > 9 ? "9+" : cartItems.length}
          </span>
        )}
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <>
            {/* Tap-outside backdrop */}
            <motion.button
              type="button"
              aria-label="Close chat"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 z-40 bg-black/20"
            />

            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.96 }}
              transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
              className="fixed bottom-24 left-6 z-50 w-[340px] overflow-hidden rounded-xl shadow-2xl shadow-black/25"
            >
              {/* WhatsApp header */}
              <div className="flex items-center gap-3 bg-[#075E54] px-3 py-2.5">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#dfe5e7]">
                  <WhatsAppIcon className="h-6 w-6 text-[#075E54]" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-[15px] font-medium leading-tight text-white">{SITE_NAME}</p>
                  <p className="text-[12px] text-[#ffffffb3]">online</p>
                </div>
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  className="rounded-full p-1.5 text-white/90 transition-colors hover:bg-white/10"
                  aria-label="Close"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              {/* Chat wallpaper area */}
              <div
                className="max-h-[420px] overflow-y-auto px-3 py-4"
                style={{
                  backgroundColor: "#e5ddd5",
                  backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23d1cbc3' fill-opacity='0.35'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
                }}
              >
                <div className="space-y-3">
                  <IncomingBubble>
                    <p>
                      Hi there! 👋 Welcome to <strong>{SITE_NAME}</strong>.
                    </p>
                    <p className="mt-1.5">How can we help you today? Tap an option below to start chatting on WhatsApp.</p>
                  </IncomingBubble>

                  {hasCart && (
                    <IncomingBubble>
                      <p>
                        You have <strong>{cartItems.length}</strong> item{cartItems.length !== 1 ? "s" : ""} in your trip. Send your selection directly to our team?
                      </p>
                    </IncomingBubble>
                  )}

                  {/* WhatsApp list-message style quick replies */}
                  <div className="flex justify-start">
                    <div className="w-full max-w-[85%] overflow-hidden rounded-lg bg-white shadow-sm">
                      {hasCart && (
                        <>
                          <button
                            type="button"
                            onClick={openCartBooking}
                            className="flex w-full items-center gap-2.5 px-4 py-3 text-left text-[14px] font-medium text-[#027eb5] transition-colors hover:bg-[#f5f6f6]"
                          >
                            <span aria-hidden>📋</span>
                            Send my trip selection
                          </button>
                          <div className="mx-4 border-t border-[#e9edef]" />
                        </>
                      )}
                      {quickLinks.map((link, i) => (
                        <div key={link.text}>
                          <button
                            type="button"
                            onClick={() => openWa(link.msg(SITE_NAME))}
                            className="flex w-full items-center gap-2.5 px-4 py-3 text-left text-[14px] text-[#027eb5] transition-colors hover:bg-[#f5f6f6]"
                          >
                            <span aria-hidden>{link.emoji}</span>
                            {link.text}
                          </button>
                          {i < quickLinks.length - 1 && <div className="mx-4 border-t border-[#e9edef]" />}
                        </div>
                      ))}
                    </div>
                  </div>

                  <IncomingBubble>
                    <p className="text-[13px] text-[#667781]">
                      We typically reply within a few minutes · {WA_RAW}
                    </p>
                  </IncomingBubble>
                </div>
              </div>

              {/* Input bar mimic (decorative — opens full WA on tap) */}
              <button
                type="button"
                onClick={() => openWa(`Hi! I'd like to chat with ${SITE_NAME}.`)}
                className="flex w-full items-center gap-2 border-t border-[#d1d7db] bg-[#f0f2f5] px-3 py-2.5 text-left transition-colors hover:bg-[#e9edef]"
              >
                <span className="flex-1 rounded-full bg-white px-4 py-2 text-[14px] text-[#667781]">
                  Type a message
                </span>
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#25D366] text-white">
                  <WhatsAppIcon className="h-5 w-5" />
                </span>
              </button>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
