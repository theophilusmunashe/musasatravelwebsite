"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Calendar, Users, MapPin, Clock, ChevronRight, Check, ShoppingBag, MessageCircle } from "lucide-react";
import { useCartStore } from "@/lib/cartStore";
import { WA_NUMBER, buildWhatsAppMessage } from "./WhatsAppButton";

interface FormData {
  service: string;
  accommodation: string;
  activities: string[];
  tourGuide: string;
  transfers: string;
  startDate: string;
  endDate: string;
  travelers: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  specialRequests: string;
}

interface FieldConfig {
  id: keyof FormData;
  label: string;
  type: "select" | "multiselect" | "date" | "number" | "text" | "textarea";
  options?: string[];
  icon: React.ReactNode;
  placeholder?: string;
}

interface BookingFormProps {
  onDataChange?: (data: FormData) => void;
}

export default function BookingForm({ onDataChange }: BookingFormProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const cartItems = useCartStore((s) => s.items);

  // Pre-fill activities from the cart store
  const cartActivityNames = cartItems
    .filter((i) => i.category === "activity")
    .map((i) => i.name);

  const cartAccommodation = cartItems.find((i) => i.category === "accommodation");
  const cartTransfer = cartItems.find((i) => i.category === "transfer");
  const cartGuide = cartItems.find((i) => i.category === "guide");

  const [formData, setFormData] = useState<FormData>({
    service: cartActivityNames.length > 0 ? "Activities" : "",
    accommodation: cartAccommodation ? cartAccommodation.name : "",
    activities: cartActivityNames,
    tourGuide: cartGuide ? "Yes - Expert Guide" : "",
    transfers: cartTransfer ? "Yes - Round trip" : "",
    startDate: "",
    endDate: "",
    travelers: "",
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    specialRequests: "",
  });

  const clearCart = useCartStore((s) => s.clearCart);
  const [showSuccess, setShowSuccess] = useState(false);

  const fields: FieldConfig[] = [
    {
      id: "service",
      label: "What service are you interested in?",
      type: "select",
      options: ["Accommodation", "Activities", "Customized Itinerary", "Tour Guides", "Shuttle Services & Transfers"],
      icon: <MapPin className="w-5 h-5" />,
    },
    {
      id: "accommodation",
      label: "Preferred accommodation type?",
      type: "select",
      options: ["Luxury Safari Lodge", "Boutique Hotel", "Eco Lodge", "Budget Friendly", "No accommodation needed"],
      icon: <Users className="w-5 h-5" />,
    },
    {
      id: "activities",
      label: "Select activities you're interested in:",
      type: "multiselect",
      options: ["Victoria Falls Tour", "Wildlife Safari", "Cultural Experience", "Adventure Sports", "Photography Tour", "Bird Watching"],
      icon: <MapPin className="w-5 h-5" />,
    },
    {
      id: "tourGuide",
      label: "Do you need a tour guide?",
      type: "select",
      options: ["Yes - Expert Guide", "Yes - Basic Guide", "No, self-guided", "Not sure"],
      icon: <Users className="w-5 h-5" />,
    },
    {
      id: "transfers",
      label: "Airport transfers required?",
      type: "select",
      options: ["Yes - Round trip", "Yes - One way", "No, arranged separately", "Not sure"],
      icon: <Clock className="w-5 h-5" />,
    },
    {
      id: "startDate",
      label: "When would you like to start your journey?",
      type: "date",
      icon: <Calendar className="w-5 h-5" />,
    },
    {
      id: "endDate",
      label: "When would you like to end your journey?",
      type: "date",
      icon: <Calendar className="w-5 h-5" />,
    },
    {
      id: "travelers",
      label: "How many travelers?",
      type: "select",
      options: ["1", "2", "3-4", "5-8", "9+"],
      icon: <Users className="w-5 h-5" />,
    },
    {
      id: "firstName",
      label: "First Name",
      type: "text",
      icon: <Users className="w-5 h-5" />,
      placeholder: "Enter your first name",
    },
    {
      id: "lastName",
      label: "Last Name",
      type: "text",
      icon: <Users className="w-5 h-5" />,
      placeholder: "Enter your last name",
    },
    {
      id: "email",
      label: "Email Address",
      type: "text",
      icon: <Users className="w-5 h-5" />,
      placeholder: "your.email@example.com",
    },
    {
      id: "phone",
      label: "Phone Number",
      type: "text",
      icon: <Users className="w-5 h-5" />,
      placeholder: "+27 12 345 6789",
    },
    {
      id: "specialRequests",
      label: "Any special requests or requirements?",
      type: "textarea",
      icon: <Users className="w-5 h-5" />,
      placeholder: "Tell us about any special requirements, dietary needs, or preferences...",
    },
  ];

  const updateFormData = (field: keyof FormData, value: any) => {
    const newData = { ...formData, [field]: value };
    setFormData(newData);
    if (onDataChange) {
      onDataChange(newData);
    }
  };

  const nextStep = () => {
    if (currentStep < fields.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = async () => {
    const msg = buildWhatsAppMessage(cartItems, formData);
    window.open(`https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(msg)}`, "_blank");
    clearCart();
    setShowSuccess(true);
  };

  const renderField = (field: FieldConfig) => {
    const value = formData[field.id];

    switch (field.type) {
      case "select":
        return (
          <select
            value={value}
            onChange={(e) => updateFormData(field.id, e.target.value)}
            className="w-full px-4 py-3 border border-white/15 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-amber-500 bg-white/5 text-white [&>option]:bg-[#1a1a1a] [&>option]:text-white"
          >
            <option value="">Select an option</option>
            {field.options?.map((option) => (
              <option key={option} value={option}>{option}</option>
            ))}
          </select>
        );

      case "multiselect":
        return (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {field.options?.map((option) => {
              const checked = (value as string[]).includes(option);
              return (
                <label key={option} className={`flex items-center gap-3 px-4 py-3 rounded-xl border cursor-pointer transition-all duration-200 ${checked ? "border-amber-500/60 bg-amber-500/10" : "border-white/10 bg-white/5 hover:border-white/20"}`}>
                  <input
                    type="checkbox"
                    checked={checked}
                    onChange={(e) => {
                      const currentValues = value as string[];
                      updateFormData(field.id, e.target.checked ? [...currentValues, option] : currentValues.filter(v => v !== option));
                    }}
                    className="w-4 h-4 accent-amber-500"
                  />
                  <span className={`text-sm ${checked ? "text-amber-300" : "text-white/70"}`}>{option}</span>
                </label>
              );
            })}
          </div>
        );

      case "date":
        return (
          <input
            type="date"
            value={value}
            onChange={(e) => updateFormData(field.id, e.target.value)}
            className="w-full px-4 py-3 border border-white/15 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-amber-500 bg-white/5 text-white [color-scheme:dark]"
          />
        );

      case "number":
        return (
          <input
            type="number"
            value={value}
            onChange={(e) => updateFormData(field.id, e.target.value)}
            className="w-full px-4 py-3 border border-white/15 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-amber-500 bg-white/5 text-white"
          />
        );

      case "textarea":
        return (
          <textarea
            value={value}
            onChange={(e) => updateFormData(field.id, e.target.value)}
            placeholder={field.placeholder}
            rows={4}
            className="w-full px-4 py-3 border border-white/15 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-amber-500 bg-white/5 text-white placeholder-white/30 resize-none"
          />
        );

      default:
        return (
          <input
            type="text"
            value={value}
            onChange={(e) => updateFormData(field.id, e.target.value)}
            placeholder={field.placeholder}
            className="w-full px-4 py-3 border border-white/15 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-amber-500 bg-white/5 text-white placeholder-white/30"
          />
        );
    }
  };

  if (showSuccess) {
    const msg = buildWhatsAppMessage(cartItems, formData);
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-[#111] border border-white/10 rounded-2xl p-8 text-center"
      >
        <div className="w-16 h-16 bg-[#25D366]/20 border border-[#25D366]/30 rounded-full flex items-center justify-center mx-auto mb-6">
          <Check className="w-8 h-8 text-[#25D366]" />
        </div>
        <h3 className="text-2xl font-bold text-white mb-3">
          Your booking has been sent!
        </h3>
        <p className="text-white/60 mb-6 leading-relaxed">
          Your trip selection was sent directly to our team via WhatsApp. We typically confirm within minutes during business hours.
        </p>
        <div className="bg-[#25D366]/10 border border-[#25D366]/30 rounded-xl p-4 mb-4">
          <div className="flex items-center justify-center gap-2 mb-2">
            <MessageCircle className="w-4 h-4 text-[#25D366]" />
            <p className="text-sm font-semibold text-[#25D366]">Sent to +263 77 609 3268</p>
          </div>
          <p className="text-white/40 text-xs">
            If WhatsApp didn&apos;t open automatically, tap the button below to resend.
          </p>
        </div>
        <button
          onClick={() => window.open(`https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(msg)}`, "_blank")}
          className="w-full bg-[#25D366] hover:bg-[#20bb5a] text-white font-bold py-3.5 rounded-xl flex items-center justify-center gap-2 transition-colors"
        >
          <MessageCircle className="w-5 h-5" />
          <span>Resend on WhatsApp</span>
        </button>
      </motion.div>
    );
  }

  return (
    <div className="bg-[#111] border border-white/10 rounded-2xl p-6 md:p-8">
      {/* Cart pre-fill notice */}
      {cartItems.length > 0 && (
        <div className="mb-6 bg-amber-500/10 border border-amber-500/30 rounded-xl p-4">
          <div className="flex items-center gap-2 mb-2">
            <ShoppingBag className="w-4 h-4 text-amber-400" />
            <span className="text-sm font-semibold text-amber-300">
              {cartItems.length} item{cartItems.length !== 1 ? "s" : ""} pre-loaded from your trip selection
            </span>
          </div>
          <div className="flex flex-wrap gap-2">
            {cartItems.map((item) => (
              <span key={item.id} className="bg-amber-500/20 text-amber-300 text-xs px-2.5 py-1 rounded-full">
                {item.name}
              </span>
            ))}
          </div>
        </div>
      )}

      <div className="mb-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-white">Create Your Booking</h2>
          <span className="text-sm text-white/40">Step {currentStep + 1} of {fields.length}</span>
        </div>
        {/* Progress Bar */}
        <div className="w-full bg-white/10 rounded-full h-1.5">
          <motion.div
            className="bg-amber-500 h-1.5 rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${((currentStep + 1) / fields.length) * 100}%` }}
            transition={{ duration: 0.3 }}
          />
        </div>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={currentStep}
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -50 }}
          transition={{ duration: 0.3 }}
        >
          <div className="mb-6">
            <div className="flex items-center space-x-3 mb-4">
              <div className="p-3 bg-amber-500/10 border border-amber-500/20 rounded-xl text-amber-400">
                {fields[currentStep].icon}
              </div>
              <span className="text-base font-semibold text-white">
                {fields[currentStep].label}
              </span>
            </div>
            {renderField(fields[currentStep])}
          </div>

          <div className="flex justify-between">
            <button
              onClick={prevStep}
              disabled={currentStep === 0}
              className="px-6 py-3 border border-white/15 rounded-xl text-white/60 hover:border-white/30 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
            >
              Previous
            </button>

            {currentStep === fields.length - 1 ? (
              <button
                onClick={handleSubmit}
                className="px-8 py-3 bg-amber-500 hover:bg-amber-400 text-black font-bold rounded-xl transition-colors flex items-center space-x-2"
              >
                <span>Check Availability</span>
                <ChevronRight className="w-5 h-5" />
              </button>
            ) : (
              <button
                onClick={nextStep}
                disabled={!formData[fields[currentStep].id]}
                className="px-6 py-3 bg-amber-500 hover:bg-amber-400 text-black font-bold rounded-xl disabled:opacity-40 disabled:cursor-not-allowed transition-colors flex items-center space-x-2"
              >
                <span>Next</span>
                <ChevronRight className="w-5 h-5" />
              </button>
            )}
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
