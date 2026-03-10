"use client";
import { useState } from "react";
import { ChevronDown } from "lucide-react";

interface FilterProps {
  onFilterChange: (filters: any) => void;
}

export default function AccommodationFilters({ onFilterChange }: FilterProps) {
  const [isOpen, setIsOpen] = useState({
    price: false,
    country: false,
    type: false,
  });

  const [filters, setFilters] = useState({
    price: '',
    country: '',
    type: '',
  });

  const priceRanges = [
    { value: 'budget', label: 'Budget ($0-$100)', min: 0, max: 100 },
    { value: 'mid-range', label: 'Mid-Range ($100-$300)', min: 100, max: 300 },
    { value: 'luxury', label: 'Luxury ($300+)', min: 300, max: Infinity },
  ];

  const countries = [
    { value: 'zimbabwe', label: 'Zimbabwe' },
    { value: 'south-africa', label: 'South Africa' },
    { value: 'botswana', label: 'Botswana' },
    { value: 'namibia', label: 'Namibia' },
    { value: 'zambia', label: 'Zambia' },
  ];

  const types = [
    { value: 'budget', label: 'Budget' },
    { value: 'mid-range', label: 'Mid-Range' },
    { value: 'luxury', label: 'Luxury' },
    { value: 'eco-lodge', label: 'Eco Lodge' },
    { value: 'safari-lodge', label: 'Safari Lodge' },
    { value: 'boutique', label: 'Boutique' },
  ];

  const handleFilterChange = (filterType: string, value: string) => {
    const newFilters = { ...filters, [filterType]: value };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  const toggleDropdown = (type: 'price' | 'country' | 'type') => {
    setIsOpen(prev => ({ ...prev, [type]: !prev[type] }));
  };

  return (
    <div className="max-w-6xl mx-auto p-4 mb-8">
      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-lg font-semibold mb-4">Filter Accommodations</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Price Filter */}
          <div className="relative">
            <button
              onClick={() => toggleDropdown('price')}
              className="w-full text-left px-4 py-2 border border-gray-300 rounded-lg flex justify-between items-center hover:bg-gray-50"
            >
              <span>{filters.price ? priceRanges.find(p => p.value === filters.price)?.label : 'Price Range'}</span>
              <ChevronDown className={`w-4 h-4 transition-transform ${isOpen.price ? 'rotate-180' : ''}`} />
            </button>
            {isOpen.price && (
              <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg">
                {priceRanges.map((range) => (
                  <button
                    key={range.value}
                    onClick={() => {
                      handleFilterChange('price', range.value);
                      toggleDropdown('price');
                    }}
                    className="w-full text-left px-4 py-2 hover:bg-gray-100 first:rounded-t-lg last:rounded-b-lg"
                  >
                    {range.label}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Country Filter */}
          <div className="relative">
            <button
              onClick={() => toggleDropdown('country')}
              className="w-full text-left px-4 py-2 border border-gray-300 rounded-lg flex justify-between items-center hover:bg-gray-50"
            >
              <span>{filters.country ? countries.find(c => c.value === filters.country)?.label : 'Country'}</span>
              <ChevronDown className={`w-4 h-4 transition-transform ${isOpen.country ? 'rotate-180' : ''}`} />
            </button>
            {isOpen.country && (
              <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg">
                {countries.map((country) => (
                  <button
                    key={country.value}
                    onClick={() => {
                      handleFilterChange('country', country.value);
                      toggleDropdown('country');
                    }}
                    className="w-full text-left px-4 py-2 hover:bg-gray-100 first:rounded-t-lg last:rounded-b-lg"
                  >
                    {country.label}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Type Filter */}
          <div className="relative">
            <button
              onClick={() => toggleDropdown('type')}
              className="w-full text-left px-4 py-2 border border-gray-300 rounded-lg flex justify-between items-center hover:bg-gray-50"
            >
              <span>{filters.type ? types.find(t => t.value === filters.type)?.label : 'Type'}</span>
              <ChevronDown className={`w-4 h-4 transition-transform ${isOpen.type ? 'rotate-180' : ''}`} />
            </button>
            {isOpen.type && (
              <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg">
                {types.map((type) => (
                  <button
                    key={type.value}
                    onClick={() => {
                      handleFilterChange('type', type.value);
                      toggleDropdown('type');
                    }}
                    className="w-full text-left px-4 py-2 hover:bg-gray-100 first:rounded-t-lg last:rounded-b-lg"
                  >
                    {type.label}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Clear Filters Button */}
        <div className="mt-4 flex justify-end">
          <button
            onClick={() => {
              setFilters({ price: '', country: '', type: '' });
              onFilterChange({ price: '', country: '', type: '' });
            }}
            className="px-4 py-2 text-sm text-gray-600 hover:text-gray-800 underline"
          >
            Clear all filters
          </button>
        </div>
      </div>
    </div>
  );
}
