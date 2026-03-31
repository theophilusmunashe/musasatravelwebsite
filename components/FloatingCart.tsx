"use client";
import { motion, AnimatePresence } from "framer-motion";
import { ShoppingBag } from "lucide-react";
import { useCartStore } from "@/lib/cartStore";

export default function FloatingCart() {
  const { toggleCart, getTotalItems } = useCartStore();
  const count = getTotalItems();

  return (
    <AnimatePresence>
      {count > 0 && (
        <motion.button
          key="floating-cart"
          initial={{ scale: 0, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0, opacity: 0, y: 20 }}
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.95 }}
          onClick={toggleCart}
          className="fixed bottom-8 right-6 z-50 flex items-center gap-3 bg-amber-500 hover:bg-amber-400 text-black font-bold px-5 py-3.5 rounded-full shadow-2xl shadow-amber-500/40 transition-colors"
          aria-label="View your trip cart"
        >
          <ShoppingBag className="w-5 h-5" />
          <span className="text-sm">Your Trip</span>
          <span className="bg-black text-amber-400 text-xs font-black w-5 h-5 rounded-full flex items-center justify-center">
            {count > 9 ? "9+" : count}
          </span>
        </motion.button>
      )}
    </AnimatePresence>
  );
}
