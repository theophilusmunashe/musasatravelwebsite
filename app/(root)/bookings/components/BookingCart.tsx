"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Plus, Minus, Calendar, Users, MapPin, Clock } from "lucide-react";

interface CartItem {
  id: string;
  name: string;
  price: string;
  quantity: number;
  icon: React.ReactNode;
}

interface BookingCartProps {
  formData?: any;
}

export default function BookingCart({ formData }: BookingCartProps) {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  // Update cart items when formData changes
  useEffect(() => {
    const items: CartItem[] = [];
    
    if (formData?.service) {
      items.push({
        id: 'service',
        name: formData.service,
        price: 'Custom Quote',
        quantity: 1,
        icon: <MapPin className="w-4 h-4" />
      });
    }
    
    if (formData?.accommodation && formData.accommodation !== 'No accommodation needed') {
      items.push({
        id: 'accommodation',
        name: formData.accommodation,
        price: 'From $150/night',
        quantity: 1,
        icon: <Users className="w-4 h-4" />
      });
    }
    
    if (formData?.activities && formData.activities.length > 0) {
      formData.activities.forEach((activity: string, index: number) => {
        items.push({
          id: `activity-${index}`,
          name: activity,
          price: '$75/person',
          quantity: parseInt(formData.travelers) || 1,
          icon: <MapPin className="w-4 h-4" />
        });
      });
    }
    
    if (formData?.tourGuide && formData.tourGuide.includes('Guide')) {
      items.push({
        id: 'guide',
        name: formData.tourGuide,
        price: '$50/day',
        quantity: 1,
        icon: <Users className="w-4 h-4" />
      });
    }
    
    if (formData?.transfers && formData.transfers.includes('Yes')) {
      items.push({
        id: 'transfers',
        name: formData.transfers,
        price: '$80',
        quantity: formData.transfers.includes('Round trip') ? 2 : 1,
        icon: <Clock className="w-4 h-4" />
      });
    }
    
    setCartItems(items);
  }, [formData]);

  const removeItem = (id: string) => {
    setCartItems(prev => prev.filter(item => item.id !== id));
  };

  const updateQuantity = (id: string, change: number) => {
    setCartItems(prev => prev.map(item => 
      item.id === id 
        ? { ...item, quantity: Math.max(1, item.quantity + change) }
        : item
    ));
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-2xl shadow-xl p-6"
    >
      <div className="mb-6">
        <h3 className="text-xl font-bold text-gray-900 mb-2">Your Selection</h3>
        <p className="text-sm text-gray-600">Review your booking details</p>
      </div>

      {/* Date Summary */}
      {formData?.startDate && formData?.endDate && (
        <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mb-6">
          <div className="flex items-center space-x-2 mb-2">
            <Calendar className="w-4 h-4 text-amber-600" />
            <span className="text-sm font-semibold text-amber-800">Travel Dates</span>
          </div>
          <p className="text-sm text-amber-700">
            {new Date(formData.startDate).toLocaleDateString()} - {new Date(formData.endDate).toLocaleDateString()}
          </p>
          {formData.travelers && (
            <div className="flex items-center space-x-2 mt-2">
              <Users className="w-4 h-4 text-amber-600" />
              <span className="text-sm text-amber-700">{formData.travelers} {parseInt(formData.travelers) === 1 ? 'Traveler' : 'Travelers'}</span>
            </div>
          )}
        </div>
      )}

      {/* Cart Items */}
      <div className="space-y-3 mb-6">
        <AnimatePresence>
          {cartItems.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-8"
            >
              <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <MapPin className="w-6 h-6 text-gray-400" />
              </div>
              <p className="text-gray-500 text-sm">Your cart is empty</p>
              <p className="text-gray-400 text-xs mt-1">Start adding services to see them here</p>
            </motion.div>
          ) : (
            cartItems.map((item) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="bg-gray-50 rounded-lg p-3"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3 flex-1">
                    <div className="p-2 bg-amber-100 rounded text-amber-600">
                      {item.icon}
                    </div>
                    <div className="flex-1">
                      <h4 className="text-sm font-medium text-gray-900">{item.name}</h4>
                      <p className="text-xs text-gray-600">{item.price}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    {item.quantity > 1 && (
                      <div className="flex items-center space-x-1 bg-white rounded border border-gray-200">
                        <button
                          onClick={() => updateQuantity(item.id, -1)}
                          className="p-1 hover:bg-gray-100 rounded-l"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="px-2 text-sm font-medium">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.id, 1)}
                          className="p-1 hover:bg-gray-100 rounded-r"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>
                    )}
                    
                    <button
                      onClick={() => removeItem(item.id)}
                      className="p-1 hover:bg-gray-200 rounded text-gray-400 hover:text-gray-600"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))
          )}
        </AnimatePresence>
      </div>

      {/* Contact Info Summary */}
      {formData?.firstName && formData?.lastName && (
        <div className="border-t pt-4">
          <h4 className="text-sm font-semibold text-gray-700 mb-3">Contact Information</h4>
          <div className="space-y-2 text-sm">
            <p className="text-gray-600">
              <span className="font-medium">Name:</span> {formData.firstName} {formData.lastName}
            </p>
            {formData.email && (
              <p className="text-gray-600">
                <span className="font-medium">Email:</span> {formData.email}
              </p>
            )}
            {formData.phone && (
              <p className="text-gray-600">
                <span className="font-medium">Phone:</span> {formData.phone}
              </p>
            )}
          </div>
        </div>
      )}

      {/* Special Requests */}
      {formData?.specialRequests && (
        <div className="border-t pt-4 mt-4">
          <h4 className="text-sm font-semibold text-gray-700 mb-2">Special Requests</h4>
          <p className="text-sm text-gray-600 italic">{formData.specialRequests}</p>
        </div>
      )}

      {/* Total */}
      {cartItems.length > 0 && (
        <div className="border-t pt-4 mt-4">
          <div className="flex justify-between items-center">
            <span className="text-lg font-semibold text-gray-900">Estimated Total</span>
            <span className="text-lg font-bold text-amber-600">Custom Quote</span>
          </div>
          <p className="text-xs text-gray-500 mt-1">
            Final price will be confirmed after availability check
          </p>
        </div>
      )}
    </motion.div>
  );
}
