"use client";
import { useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import {
  X,
  Plus,
  Minus,
  Trash2,
  ShoppingBag,
  ArrowRight,
  Sparkles,
  Home,
  Utensils,
  Car,
  UserCheck,
  MessageCircle,
} from "lucide-react";
import { WA_NUMBER, buildWhatsAppMessage } from "@/app/(root)/bookings/components/WhatsAppButton";
import Image from "next/image";
import { useCartStore, CartItem } from "@/lib/cartStore";
import toast from "react-hot-toast";

const UPSELLS = [
  {
    id: "upsell-accommodation",
    name: "Luxury Lodge Stay",
    category: "accommodation" as const,
    price: "From $150/night",
    priceNum: 150,
    image:
      "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=400&q=80",
    description: "Award-winning safari lodges with all meals & game drives",
    icon: <Home className="w-4 h-4" />,
    href: "/services/accommodation",
  },
  {
    id: "upsell-meals",
    name: "Bush Dining Experience",
    category: "meal" as const,
    price: "From $65/person",
    priceNum: 65,
    image:
      "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=400&q=80",
    description: "Private bush dinners under the African stars",
    icon: <Utensils className="w-4 h-4" />,
  },
  {
    id: "upsell-transfer",
    name: "Airport Transfers",
    category: "transfer" as const,
    price: "From $80 return",
    priceNum: 80,
    image:
      "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=400&q=80",
    description: "Private vehicle transfers to/from Victoria Falls Airport",
    icon: <Car className="w-4 h-4" />,
  },
  {
    id: "upsell-guide",
    name: "Expert Tour Guide",
    category: "guide" as const,
    price: "From $50/day",
    priceNum: 50,
    image:
      "https://images.unsplash.com/photo-1500835556837-99ac94a94552?w=400&q=80",
    description: "Seasoned local guide with insider knowledge of the region",
    icon: <UserCheck className="w-4 h-4" />,
  },
];

export default function CartDrawer() {
  const { items, isOpen, closeCart, removeItem, updateQuantity, addItem, clearCart, getTotalItems, getTotalPrice } =
    useCartStore();
  const router = useRouter();
  const overlayRef = useRef<HTMLDivElement>(null);

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === overlayRef.current) closeCart();
  };

  const handleCheckout = () => {
    closeCart();
    router.push("/bookings");
  };

  const handleAddUpsell = (upsell: (typeof UPSELLS)[0]) => {
    addItem({
      id: upsell.id,
      name: upsell.name,
      category: upsell.category,
      price: upsell.price,
      priceNum: upsell.priceNum,
      image: upsell.image,
      description: upsell.description,
    });
    toast.success(`${upsell.name} added to your trip!`, {
      icon: "✨",
      style: {
        background: "#1a1a1a",
        color: "#fff",
        border: "1px solid #F59E0B",
      },
    });
  };

  const activities = items.filter((i) => i.category === "activity");
  const extras = items.filter((i) => i.category !== "activity");
  const total = getTotalPrice();
  const totalItems = getTotalItems();

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            ref={overlayRef}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[60]"
            onClick={handleOverlayClick}
          />

          <motion.aside
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
            className="fixed right-0 top-0 h-full w-full max-w-md bg-[#0f0f0f] z-[70] flex flex-col shadow-2xl"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-5 border-b border-white/10">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-amber-500 rounded-full flex items-center justify-center">
                  <ShoppingBag className="w-4 h-4 text-black" />
                </div>
                <div>
                  <h2 className="text-white font-bold text-lg leading-none">
                    Your Trip
                  </h2>
                  <p className="text-white/40 text-xs mt-0.5">
                    {totalItems} {totalItems === 1 ? "item" : "items"} selected
                  </p>
                </div>
              </div>
              <button
                onClick={closeCart}
                className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
              >
                <X className="w-4 h-4 text-white" />
              </button>
            </div>

            {/* Scrollable content */}
            <div className="flex-1 overflow-y-auto">
              {items.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-64 px-6">
                  <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center mb-4">
                    <ShoppingBag className="w-7 h-7 text-white/30" />
                  </div>
                  <p className="text-white/50 text-center text-sm">
                    Your trip is empty. Browse activities and start building
                    your adventure.
                  </p>
                </div>
              ) : (
                <div className="px-6 py-4 space-y-3">
                  {/* Activities */}
                  {activities.length > 0 && (
                    <div>
                      <p className="text-white/40 text-xs uppercase tracking-widest mb-3">
                        Activities
                      </p>
                      <div className="space-y-3">
                        {activities.map((item) => (
                          <CartItemRow
                            key={item.id}
                            item={item}
                            onRemove={removeItem}
                            onUpdate={updateQuantity}
                          />
                        ))}
                      </div>
                    </div>
                  )}
                  {/* Extras */}
                  {extras.length > 0 && (
                    <div className="mt-4">
                      <p className="text-white/40 text-xs uppercase tracking-widest mb-3">
                        Added Extras
                      </p>
                      <div className="space-y-3">
                        {extras.map((item) => (
                          <CartItemRow
                            key={item.id}
                            item={item}
                            onRemove={removeItem}
                            onUpdate={updateQuantity}
                          />
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* Upsells */}
              <div className="px-6 pb-6">
                <div className="flex items-center gap-2 mb-4 mt-4">
                  <Sparkles className="w-4 h-4 text-amber-400" />
                  <p className="text-amber-400 text-xs uppercase tracking-widest font-semibold">
                    Enhance Your Trip
                  </p>
                </div>
                <div className="space-y-3">
                  {UPSELLS.filter(
                    (u) => !items.find((i) => i.id === u.id)
                  ).map((upsell) => (
                    <UpsellCard
                      key={upsell.id}
                      upsell={upsell}
                      onAdd={handleAddUpsell}
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* Footer */}
            {items.length > 0 && (
              <div className="border-t border-white/10 px-6 py-5 space-y-3 bg-[#111]">
                {total > 0 && (
                  <div className="flex justify-between items-center">
                    <span className="text-white/60 text-sm">
                      Estimated from
                    </span>
                    <span className="text-amber-400 font-bold text-lg">
                      ${total.toLocaleString()}
                    </span>
                  </div>
                )}
                <p className="text-white/30 text-xs">
                  Final pricing confirmed after availability check
                </p>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleCheckout}
                  className="w-full bg-amber-500 hover:bg-amber-400 text-black font-bold py-4 rounded-xl flex items-center justify-center gap-2 transition-colors"
                >
                  <span>Complete Booking</span>
                  <ArrowRight className="w-5 h-5" />
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => {
                    const msg = buildWhatsAppMessage(items);
                    window.open(`https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(msg)}`, "_blank");
                    clearCart();
                    closeCart();
                  }}
                  className="w-full bg-[#25D366] hover:bg-[#20bb5a] text-white font-bold py-3.5 rounded-xl flex items-center justify-center gap-2 transition-colors"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Send to WhatsApp</span>
                </motion.button>
              </div>
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}

function CartItemRow({
  item,
  onRemove,
  onUpdate,
}: {
  item: CartItem;
  onRemove: (id: string) => void;
  onUpdate: (id: string, q: number) => void;
}) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      className="flex gap-3 bg-white/5 rounded-xl p-3 hover:bg-white/8 transition-colors"
    >
      <div className="relative w-14 h-14 rounded-lg overflow-hidden flex-shrink-0">
        <Image
          src={item.image}
          alt={item.name}
          fill
          className="object-cover"
          sizes="56px"
          unoptimized
        />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-white text-sm font-medium leading-tight line-clamp-2">
          {item.name}
        </p>
        <p className="text-amber-400 text-xs mt-1">{item.price}</p>
        <div className="flex items-center gap-2 mt-2">
          <button
            onClick={() => onUpdate(item.id, item.quantity - 1)}
            className="w-5 h-5 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
          >
            <Minus className="w-3 h-3 text-white" />
          </button>
          <span className="text-white text-xs w-4 text-center">
            {item.quantity}
          </span>
          <button
            onClick={() => onUpdate(item.id, item.quantity + 1)}
            className="w-5 h-5 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
          >
            <Plus className="w-3 h-3 text-white" />
          </button>
        </div>
      </div>
      <button
        onClick={() => onRemove(item.id)}
        className="self-start mt-1 p-1 rounded hover:bg-red-500/20 text-white/30 hover:text-red-400 transition-colors"
      >
        <Trash2 className="w-4 h-4" />
      </button>
    </motion.div>
  );
}

function UpsellCard({
  upsell,
  onAdd,
}: {
  upsell: (typeof UPSELLS)[0];
  onAdd: (u: (typeof UPSELLS)[0]) => void;
}) {
  return (
    <div className="flex gap-3 bg-white/5 border border-white/10 rounded-xl p-3 hover:border-amber-500/30 transition-colors">
      <div className="relative w-12 h-12 rounded-lg overflow-hidden flex-shrink-0">
        <Image
          src={upsell.image}
          alt={upsell.name}
          fill
          className="object-cover"
          sizes="48px"
          unoptimized
        />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-white text-sm font-medium">{upsell.name}</p>
        <p className="text-white/40 text-xs mt-0.5 line-clamp-1">
          {upsell.description}
        </p>
        <p className="text-amber-400 text-xs mt-1">{upsell.price}</p>
      </div>
      <button
        onClick={() => onAdd(upsell)}
        className="self-center flex-shrink-0 w-7 h-7 rounded-full bg-amber-500 hover:bg-amber-400 flex items-center justify-center transition-colors"
      >
        <Plus className="w-4 h-4 text-black" />
      </button>
    </div>
  );
}
