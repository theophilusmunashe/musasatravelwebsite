"use client";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, X } from "lucide-react";
import { useState } from "react";

export default function WhatsAppButton() {
  const [isOpen, setIsOpen] = useState(false);

  const whatsappNumber = "+27781234567"; // Replace with actual WhatsApp number
  const message = encodeURIComponent("Hi! I'd like to inquire about booking a trip with Musasa Travel.");

  return (
    <>
      {/* WhatsApp Button */}
      <motion.a
        href={`https://wa.me/${whatsappNumber.replace(/[^0-9]/g, '')}?text=${message}`}
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-50 bg-green-500 text-white p-4 rounded-full shadow-lg hover:bg-green-600 transition-colors"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(false)}
      >
        <MessageCircle className="w-6 h-6" />
      </motion.a>

      {/* Chat Popup */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            className="fixed bottom-24 right-6 z-50 w-80 bg-white rounded-2xl shadow-2xl overflow-hidden"
          >
            {/* Header */}
            <div className="bg-green-500 text-white p-4 flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                  <MessageCircle className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-semibold">Musasa Travel</h3>
                  <p className="text-xs text-green-100">Typically replies instantly</p>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1 hover:bg-white/20 rounded"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Message */}
            <div className="p-4">
              <p className="text-gray-700 text-sm mb-4">
                Hello! 👋 Welcome to Musasa Travel. I&apos;m here to help you plan your perfect African adventure. How can I assist you today?
              </p>
              
              <div className="space-y-2">
                <button
                  onClick={() => window.open(`https://wa.me/${whatsappNumber.replace(/[^0-9]/g, '')}?text=${encodeURIComponent("I'm interested in accommodation options")}`, '_blank')}
                  className="w-full text-left p-3 bg-gray-50 hover:bg-gray-100 rounded-lg text-sm transition-colors"
                >
                  🏨 Accommodation options
                </button>
                <button
                  onClick={() => window.open(`https://wa.me/${whatsappNumber.replace(/[^0-9]/g, '')}?text=${encodeURIComponent("I want to know about activities")}`, '_blank')}
                  className="w-full text-left p-3 bg-gray-50 hover:bg-gray-100 rounded-lg text-sm transition-colors"
                >
                  🎯 Activities & Tours
                </button>
                <button
                  onClick={() => window.open(`https://wa.me/${whatsappNumber.replace(/[^0-9]/g, '')}?text=${encodeURIComponent("I need help with booking")}`, '_blank')}
                  className="w-full text-left p-3 bg-gray-50 hover:bg-gray-100 rounded-lg text-sm transition-colors"
                >
                  📅 Help with booking
                </button>
                <button
                  onClick={() => window.open(`https://wa.me/${whatsappNumber.replace(/[^0-9]/g, '')}?text=${encodeURIComponent("I'd like a custom quote")}`, '_blank')}
                  className="w-full text-left p-3 bg-gray-50 hover:bg-gray-100 rounded-lg text-sm transition-colors"
                >
                  💰 Get a quote
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Prompt */}
      {!isOpen && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="fixed bottom-24 right-6 z-40 bg-white rounded-lg shadow-lg p-3 max-w-[200px]"
        >
          <p className="text-xs text-gray-700">
            💬 Chat with our travel experts for instant help!
          </p>
        </motion.div>
      )}
    </>
  );
}
