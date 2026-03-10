"use client";
import React, { useState, useMemo } from "react";
import { MotionDiv } from "../../../../../lib/framer";
import AccommodationCard from "./AccommodationCard";
import AccommodationFilters from "./AccommodationFilters";
import { AnimatePresence } from "framer-motion";

interface AccommodationSectionsProps {
  data: any[];
}

export default function AccommodationSections({ data }: AccommodationSectionsProps) {
  const [filters, setFilters] = useState({
    price: '',
    country: '',
    type: '',
  });

  // Enhanced accommodation data with price, country, and type
  const enhancedData = data.map((item, index) => ({
    ...item,
    price: index % 3 === 0 ? '$80/night' : index % 3 === 1 ? '$250/night' : '$450/night',
    location: index % 5 === 0 ? 'Zimbabwe' : index % 5 === 1 ? 'South Africa' : index % 5 === 2 ? 'Botswana' : index % 5 === 3 ? 'Namibia' : 'Zambia',
    type: index % 6 === 0 ? 'budget' : index % 6 === 1 ? 'mid-range' : index % 6 === 2 ? 'luxury' : index % 6 === 3 ? 'eco-lodge' : index % 6 === 4 ? 'safari-lodge' : 'boutique',
    numericPrice: index % 3 === 0 ? 80 : index % 3 === 1 ? 250 : 450,
  }));

  // Filter logic
  const filteredData = useMemo(() => {
    return enhancedData.filter(item => {
      // Price filter
      if (filters.price) {
        if (filters.price === 'budget' && item.numericPrice > 100) return false;
        if (filters.price === 'mid-range' && (item.numericPrice < 100 || item.numericPrice > 300)) return false;
        if (filters.price === 'luxury' && item.numericPrice < 300) return false;
      }
      
      // Country filter
      if (filters.country && item.location.toLowerCase() !== filters.country.replace('-', ' ')) {
        return false;
      }
      
      // Type filter
      if (filters.type && item.type !== filters.type) {
        return false;
      }
      
      return true;
    });
  }, [enhancedData, filters]);

  const handleFilterChange = (newFilters: any) => {
    setFilters(newFilters);
  };

  return (
    <>
      {/* Filters Component */}
      <AccommodationFilters onFilterChange={handleFilterChange} />
      
      {/* Results Count */}
      <div className="max-w-6xl mx-auto px-4 mb-4">
        <p className="text-gray-600">
          Showing {filteredData.length} of {enhancedData.length} accommodations
        </p>
      </div>

      {/* Accommodation Cards */}
      <div className="max-w-6xl mx-auto px-4 pb-8">
        <div className="row navigation-active isotope-navigation portfolio-v1 gutter-y-default">
          <AnimatePresence>
            {filteredData.map((item: any, i: number) => (
              <MotionDiv
                key={item._id}
                className="col-lg-4 col-md-6 col-sm-11 "
                layout
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0 }}
                transition={{ delay: i * 0.1 }}
              >
                <AccommodationCard data={item} />
              </MotionDiv>
            ))}
          </AnimatePresence>
        </div>
        
        {filteredData.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No accommodations found matching your filters.</p>
            <p className="text-gray-400 mt-2">Try adjusting your filter criteria.</p>
          </div>
        )}
      </div>
    </>
  );
}
