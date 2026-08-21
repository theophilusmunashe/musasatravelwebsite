"use client";
import { useState } from "react";
import { ArrowLeft } from "lucide-react";
import { useCartStore } from "@/lib/cartStore";
import { BOOKING_DESTINATIONS, type BookingDestinationId } from "@/lib/booking-destinations";
import type { EnquiryFormData } from "@/lib/enquiry-templates";
import BookingBanner from "./components/BookingBanner";
import BookingForm from "./components/BookingForm";
import BookingCart from "./components/BookingCart";
import DestinationPicker from "./components/DestinationPicker";

export default function BookingsPage() {
  const [destinationId, setDestinationId] = useState<BookingDestinationId | null>(null);
  const [formData, setFormData] = useState<EnquiryFormData>({});
  const [cartStep, setCartStep] = useState(0);
  const clearCart = useCartStore((s) => s.clearCart);

  const destination = destinationId ? BOOKING_DESTINATIONS[destinationId] : null;

  const handleLeaveDestination = () => {
    clearCart();
    setDestinationId(null);
    setFormData({});
    setCartStep(0);
  };

  if (!destination) {
    return (
      <div className="min-h-screen bg-[#070707] relative">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_30%_0%,rgba(245,158,11,0.12),transparent_55%)]" />
        <DestinationPicker onSelect={setDestinationId} />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#070707]">
      <div className="sticky top-0 z-40 border-b border-white/[0.06] bg-[#070707]/90 backdrop-blur-md">
        <div className="max-w-6xl mx-auto px-4 md:px-8 py-3 flex items-center justify-between gap-4">
          <button
            type="button"
            onClick={handleLeaveDestination}
            className="inline-flex items-center gap-2 text-sm font-semibold text-white/55 hover:text-amber-300 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Choose another destination
          </button>
          <span className="text-[11px] font-bold uppercase tracking-widest text-amber-400/80 truncate">{destination.label}</span>
        </div>
      </div>

      <BookingBanner destination={destination} />

      <div className="max-w-6xl mx-auto px-4 md:px-8 py-12 pb-36">
        <div className="mb-12 max-w-2xl">
          <p className="text-amber-400/90 text-xs font-bold uppercase tracking-[0.28em] mb-3">{destination.listPageKicker}</p>
          <h2 className="text-3xl md:text-4xl font-black text-white tracking-tight leading-[1.1]">
            Curate your trip in one flowing flow
          </h2>
          <p className="mt-4 text-sm text-white/45 leading-relaxed">
            Tap experiences, pick a stay or budget, then send your {destination.label} enquiry by email and WhatsApp in one step.
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-10 lg:gap-12 items-start">
          <div className="flex-1 min-w-0 w-full">
            <div className="relative rounded-[32px] bg-zinc-950/35 ring-1 ring-white/[0.08] backdrop-blur-xl px-5 py-8 sm:px-8 sm:py-10 md:px-10 md:py-12">
              <div className="pointer-events-none absolute inset-0 rounded-[32px] bg-[radial-gradient(ellipse_at_top_right,rgba(245,158,11,0.08),transparent_50%)]" />
              <div className="relative z-[1] isolate">
                <BookingForm key={destination.id} destination={destination} onDataChange={setFormData} onSectionChange={setCartStep} />
              </div>
            </div>
          </div>

          <aside className="w-full lg:w-[360px] shrink-0 lg:sticky lg:top-28">
            <BookingCart destination={destination} formData={formData} currentStep={cartStep} />
          </aside>
        </div>
      </div>
    </div>
  );
}
