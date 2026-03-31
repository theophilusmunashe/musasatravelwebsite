"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Calendar, Users, ChevronRight, X, Check } from "lucide-react";

interface AccommodationQuickBookProps {
  accommodationName: string;
  price: string;
  onClose: () => void;
}

interface BookingData {
  checkIn: string;
  checkOut: string;
  guests: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
}

export default function AccommodationQuickBook({
  accommodationName,
  price,
  onClose,
}: AccommodationQuickBookProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [showSuccess, setShowSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [bookingData, setBookingData] = useState<BookingData>({
    checkIn: "",
    checkOut: "",
    guests: "1",
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
  });

  const steps = [
    {
      title: "Select Dates",
      icon: "📅",
      fields: ["checkIn", "checkOut"],
    },
    {
      title: "Guest Details",
      icon: "👤",
      fields: ["guests", "firstName", "lastName"],
    },
    {
      title: "Contact Info",
      icon: "📞",
      fields: ["email", "phone"],
    },
  ];

  const updateField = (field: keyof BookingData, value: string) => {
    setBookingData((prev) => ({ ...prev, [field]: value }));
  };

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      handleSubmit();
    }
  };

  const handleSubmit = async () => {
    setIsLoading(true);
    try {
      const response = await fetch("/api/send-booking-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          accommodation: accommodationName,
          price,
          ...bookingData,
        }),
      });

      if (response.ok) {
        setShowSuccess(true);
        setTimeout(() => {
          onClose();
        }, 3000);
      }
    } catch (error) {
      console.error("Error submitting booking:", error);
    } finally {
      setIsLoading(false);
    }
  };

  if (showSuccess) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4"
      >
        <motion.div
          initial={{ y: 20 }}
          animate={{ y: 0 }}
          className="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full text-center"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring" }}
            className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4"
          >
            <Check className="w-8 h-8 text-green-600" />
          </motion.div>
          <h3 className="text-2xl font-bold text-gray-900 mb-3">
            Booking Request Received!
          </h3>
          <p className="text-gray-600 mb-6">
            Our team is preparing your reservation. Check your email for confirmation details.
          </p>
          <p className="text-sm text-gray-500">
            Redirecting you back to the accommodation...
          </p>
        </motion.div>
      </motion.div>
    );
  }

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          onClick={(e) => e.stopPropagation()}
          className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
        >
          {/* Header */}
          <div className="bg-gradient-to-r from-amber-500 to-yellow-500 text-white p-6 flex justify-between items-center sticky top-0 z-10">
            <div>
              <p className="text-sm opacity-90">Booking</p>
              <h2 className="text-2xl font-bold">{accommodationName}</h2>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-white/20 rounded-lg transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Content */}
          <div className="p-8">
            {/* Progress */}
            <div className="mb-8">
              <div className="flex justify-between items-center mb-4">
                {steps.map((step, index) => (
                  <motion.div
                    key={index}
                    className={`flex flex-col items-center ${
                      index < steps.length - 1 ? "flex-1" : ""
                    }`}
                  >
                    <motion.div
                      className={`w-10 h-10 rounded-full flex items-center justify-center font-bold mb-2 transition-all duration-200 ${
                        index <= currentStep
                          ? "bg-amber-500 text-white"
                          : "bg-gray-200 text-gray-600"
                      }`}
                    >
                      {step.icon}
                    </motion.div>
                    <p className="text-sm font-semibold text-gray-700">
                      {step.title}
                    </p>
                    {index < steps.length - 1 && (
                      <div
                        className={`absolute h-1 w-12 top-5 left-[60px] transition-all duration-200 ${
                          index < currentStep
                            ? "bg-amber-500"
                            : "bg-gray-200"
                        }`}
                      />
                    )}
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Step Content */}
            <AnimatePresence mode="wait">
              <motion.div
                key={currentStep}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="space-y-4"
              >
                {currentStep === 0 && (
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-semibold text-gray-900 mb-2">
                        <Calendar className="w-4 h-4 inline mr-2" />
                        Check-In Date
                      </label>
                      <input
                        type="date"
                        value={bookingData.checkIn}
                        onChange={(e) =>
                          updateField("checkIn", e.target.value)
                        }
                        className="w-full px-4 py-3 border border-amber-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-900 mb-2">
                        <Calendar className="w-4 h-4 inline mr-2" />
                        Check-Out Date
                      </label>
                      <input
                        type="date"
                        value={bookingData.checkOut}
                        onChange={(e) =>
                          updateField("checkOut", e.target.value)
                        }
                        className="w-full px-4 py-3 border border-amber-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                      />
                    </div>
                  </div>
                )}

                {currentStep === 1 && (
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-semibold text-gray-900 mb-2">
                        <Users className="w-4 h-4 inline mr-2" />
                        Number of Guests
                      </label>
                      <select
                        value={bookingData.guests}
                        onChange={(e) =>
                          updateField("guests", e.target.value)
                        }
                        className="w-full px-4 py-3 border border-amber-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                      >
                        {["1", "2", "3", "4", "5", "6", "7", "8+"].map(
                          (num) => (
                            <option key={num} value={num}>
                              {num} {num === "1" ? "Guest" : "Guests"}
                            </option>
                          )
                        )}
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-900 mb-2">
                        First Name
                      </label>
                      <input
                        type="text"
                        value={bookingData.firstName}
                        onChange={(e) =>
                          updateField("firstName", e.target.value)
                        }
                        placeholder="John"
                        className="w-full px-4 py-3 border border-amber-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-900 mb-2">
                        Last Name
                      </label>
                      <input
                        type="text"
                        value={bookingData.lastName}
                        onChange={(e) =>
                          updateField("lastName", e.target.value)
                        }
                        placeholder="Doe"
                        className="w-full px-4 py-3 border border-amber-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                      />
                    </div>
                  </div>
                )}

                {currentStep === 2 && (
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-semibold text-gray-900 mb-2">
                        Email Address
                      </label>
                      <input
                        type="email"
                        value={bookingData.email}
                        onChange={(e) =>
                          updateField("email", e.target.value)
                        }
                        placeholder="john@example.com"
                        className="w-full px-4 py-3 border border-amber-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-900 mb-2">
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        value={bookingData.phone}
                        onChange={(e) =>
                          updateField("phone", e.target.value)
                        }
                        placeholder="+27 12 345 6789"
                        className="w-full px-4 py-3 border border-amber-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                      />
                    </div>

                    {/* Price Summary */}
                    <div className="bg-gradient-to-r from-amber-50 to-yellow-50 border border-amber-200 rounded-lg p-4 mt-6">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-gray-700">Accommodation</span>
                        <span className="font-semibold text-gray-900">
                          {accommodationName}
                        </span>
                      </div>
                      <div className="flex justify-between items-center border-t border-amber-200 pt-2 mt-2">
                        <span className="font-semibold text-gray-900">Rate</span>
                        <span className="text-lg font-bold text-amber-600">
                          {price}
                        </span>
                      </div>
                    </div>
                  </div>
                )}
              </motion.div>
            </AnimatePresence>

            {/* Buttons */}
            <div className="flex gap-4 mt-8">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  if (currentStep > 0) {
                    setCurrentStep(currentStep - 1);
                  } else {
                    onClose();
                  }
                }}
                className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-semibold"
              >
                {currentStep === 0 ? "Cancel" : "Previous"}
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleNext}
                disabled={
                  isLoading ||
                  (currentStep === 0 && (!bookingData.checkIn || !bookingData.checkOut)) ||
                  (currentStep === 1 &&
                    (!bookingData.firstName || !bookingData.lastName)) ||
                  (currentStep === 2 &&
                    (!bookingData.email || !bookingData.phone))
                }
                className="flex-1 bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-600 hover:to-yellow-600 text-white py-3 rounded-lg font-semibold transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {isLoading ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Processing...
                  </>
                ) : currentStep === steps.length - 1 ? (
                  <>
                    Complete Booking <Check className="w-5 h-5" />
                  </>
                ) : (
                  <>
                    Next <ChevronRight className="w-5 h-5" />
                  </>
                )}
              </motion.button>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
