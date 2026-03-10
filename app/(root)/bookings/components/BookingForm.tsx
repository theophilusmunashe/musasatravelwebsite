"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Calendar, Users, MapPin, Clock, ChevronRight, Check } from "lucide-react";

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
  const [formData, setFormData] = useState<FormData>({
    service: "",
    accommodation: "",
    activities: [],
    tourGuide: "",
    transfers: "",
    startDate: "",
    endDate: "",
    travelers: "",
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    specialRequests: "",
  });

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
    // Send email function
    try {
      const response = await fetch('/api/send-booking-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      
      if (response.ok) {
        setShowSuccess(true);
      }
    } catch (error) {
      console.error('Error sending booking:', error);
    }
  };

  const renderField = (field: FieldConfig) => {
    const value = formData[field.id];

    switch (field.type) {
      case "select":
        return (
          <select
            value={value}
            onChange={(e) => updateFormData(field.id, e.target.value)}
            className="w-full px-4 py-3 border border-yellow-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent bg-white"
          >
            <option value="">Select an option</option>
            {field.options?.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        );

      case "multiselect":
        return (
          <div className="space-y-2">
            {field.options?.map((option) => (
              <label key={option} className="flex items-center space-x-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={(value as string[]).includes(option)}
                  onChange={(e) => {
                    const currentValues = value as string[];
                    if (e.target.checked) {
                      updateFormData(field.id, [...currentValues, option]);
                    } else {
                      updateFormData(field.id, currentValues.filter(v => v !== option));
                    }
                  }}
                  className="w-5 h-5 text-amber-600 border-amber-300 rounded focus:ring-amber-500"
                />
                <span className="text-gray-700">{option}</span>
              </label>
            ))}
          </div>
        );

      case "date":
        return (
          <input
            type="date"
            value={value}
            onChange={(e) => updateFormData(field.id, e.target.value)}
            className="w-full px-4 py-3 border border-yellow-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent bg-white"
          />
        );

      case "number":
        return (
          <input
            type="number"
            value={value}
            onChange={(e) => updateFormData(field.id, e.target.value)}
            className="w-full px-4 py-3 border border-yellow-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent bg-white"
          />
        );

      case "textarea":
        return (
          <textarea
            value={value}
            onChange={(e) => updateFormData(field.id, e.target.value)}
            placeholder={field.placeholder}
            rows={4}
            className="w-full px-4 py-3 border border-yellow-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent bg-white resize-none"
          />
        );

      default:
        return (
          <input
            type="text"
            value={value}
            onChange={(e) => updateFormData(field.id, e.target.value)}
            placeholder={field.placeholder}
            className="w-full px-4 py-3 border border-yellow-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent bg-white"
          />
        );
    }
  };

  if (showSuccess) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white rounded-2xl shadow-xl p-8 text-center"
      >
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <Check className="w-8 h-8 text-green-600" />
        </div>
        <h3 className="text-2xl font-bold text-gray-900 mb-4">
          We&apos;ve received your request!
        </h3>
        <p className="text-gray-600 mb-6">
          Our Vic Falls team is currently checking live availability under our canopy. Expect a confirmation in 5 minutes on your email.
        </p>
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
          <p className="text-sm text-yellow-800">
            A confirmation email has been sent to {formData.email}
          </p>
        </div>
      </motion.div>
    );
  }

  return (
    <div className="bg-white rounded-2xl shadow-xl p-8">
      <div className="mb-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-3xl font-bold text-gray-900">Create Your Booking</h2>
          <span className="text-lg font-bold text-yellow-600">Custom Quote</span>
          <span className="text-sm text-gray-500">
            Step {currentStep + 1} of {fields.length}
          </span>
        </div>
        
        {/* Progress Bar */}
        <div className="w-full bg-gray-200 rounded-full h-2">
          <motion.div
            className="bg-yellow-500 h-2 rounded-full"
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
              <div className="p-3 bg-yellow-100 rounded-lg text-yellow-600">
                {fields[currentStep].icon}
              </div>
              <span className="text-lg font-semibold text-yellow-900">
                {fields[currentStep].label}
              </span>
            </div>
            {renderField(fields[currentStep])}
          </div>

          <div className="flex justify-between">
            <button
              onClick={prevStep}
              disabled={currentStep === 0}
              className="px-6 py-3 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              Previous
            </button>

            {currentStep === fields.length - 1 ? (
              <button
                onClick={handleSubmit}
                className="px-8 py-3 bg-amber-500 text-white rounded-lg hover:bg-amber-600 transition-colors flex items-center space-x-2"
              >
                <span>Check Availability</span>
                <ChevronRight className="w-5 h-5" />
              </button>
            ) : (
              <button
                onClick={nextStep}
                disabled={!formData[fields[currentStep].id]}
                className="px-6 py-3 bg-amber-500 text-white rounded-lg hover:bg-amber-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center space-x-2"
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
