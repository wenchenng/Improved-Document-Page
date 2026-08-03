import React, { useState, useRef, useEffect } from 'react';
import { CategoryFilter, DateRangePreset } from '../types';
import { ChevronDown, Calendar, Check, X } from 'lucide-react';

interface FilterSectionProps {
  selectedCategory: CategoryFilter;
  setSelectedCategory: (cat: CategoryFilter) => void;
  selectedDateRange: DateRangePreset;
  setSelectedDateRange: (range: DateRangePreset) => void;
}

const CATEGORIES: CategoryFilter[] = [
  'All Products',
  'Deposit Accounts',
  'Credit Cards',
  'Loans & Mortgages',
  'Investments & Insurance',
];

const DATE_RANGES: DateRangePreset[] = [
  'Aug 2026 to Aug 2026',
  'May 2026 to Aug 2026',
  'Jan 2026 to Aug 2026',
  'Year 2025',
  'Custom Date Range',
];

export const FilterSection: React.FC<FilterSectionProps> = ({
  selectedCategory,
  setSelectedCategory,
  selectedDateRange,
  setSelectedDateRange,
}) => {
  const [isCategoryOpen, setIsCategoryOpen] = useState(false);
  const [isDateOpen, setIsDateOpen] = useState(false);
  const [showCustomDatePicker, setShowCustomDatePicker] = useState(false);
  const [customStart, setCustomStart] = useState('2026-08-01');
  const [customEnd, setCustomEnd] = useState('2026-08-31');

  const categoryRef = useRef<HTMLDivElement>(null);
  const dateRef = useRef<HTMLDivElement>(null);

  // Close dropdowns on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (categoryRef.current && !categoryRef.current.contains(event.target as Node)) {
        setIsCategoryOpen(false);
      }
      if (dateRef.current && !dateRef.current.contains(event.target as Node)) {
        setIsDateOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="space-y-6 mb-12">
      {/* Category Filter Box */}
      <div className="max-w-2xl relative" ref={categoryRef}>
        <div
          onClick={() => {
            setIsCategoryOpen(!isCategoryOpen);
            setIsDateOpen(false);
          }}
          className="border border-[#E0E0E0] rounded p-4 bg-[#F9F9F9] relative cursor-pointer hover:border-gray-400 transition-colors shadow-2xs"
        >
          <label className="block text-xs text-gray-500 mb-1 pointer-events-none">Filter by category</label>
          <div className="flex justify-between items-center">
            <span className="text-lg font-medium text-gray-900">{selectedCategory}</span>
            <ChevronDown
              className={`w-6 h-6 text-gray-400 transition-transform duration-200 ${
                isCategoryOpen ? 'rotate-180 text-gray-700' : ''
              }`}
            />
          </div>
        </div>

        {/* Category Dropdown Menu */}
        {isCategoryOpen && (
          <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-md shadow-lg z-20 overflow-hidden py-1">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => {
                  setSelectedCategory(cat);
                  setIsCategoryOpen(false);
                }}
                className={`w-full text-left px-4 py-3 text-sm flex items-center justify-between hover:bg-gray-50 transition-colors ${
                  selectedCategory === cat ? 'bg-blue-50/60 font-semibold text-blue-800' : 'text-gray-700'
                }`}
              >
                <span>{cat}</span>
                {selectedCategory === cat && <Check className="w-4 h-4 text-blue-600" />}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Date Range Filter Box */}
      <div className="max-w-2xl relative" ref={dateRef}>
        <div
          onClick={() => {
            setIsDateOpen(!isDateOpen);
            setIsCategoryOpen(false);
          }}
          className="border border-[#E0E0E0] rounded p-4 bg-[#F9F9F9] relative cursor-pointer hover:border-gray-400 transition-colors shadow-2xs"
        >
          <label className="block text-xs text-gray-500 mb-1 pointer-events-none">Filter by date range</label>
          <div className="flex justify-between items-center">
            <span className="text-lg font-medium text-gray-900">{selectedDateRange}</span>
            <Calendar className="w-6 h-6 text-gray-500" />
          </div>
        </div>

        {/* Date Dropdown Menu */}
        {isDateOpen && (
          <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-md shadow-lg z-20 overflow-hidden py-1">
            {DATE_RANGES.map((range) => (
              <button
                key={range}
                onClick={() => {
                  if (range === 'Custom Date Range') {
                    setShowCustomDatePicker(true);
                  } else {
                    setSelectedDateRange(range);
                  }
                  setIsDateOpen(false);
                }}
                className={`w-full text-left px-4 py-3 text-sm flex items-center justify-between hover:bg-gray-50 transition-colors ${
                  selectedDateRange === range ? 'bg-blue-50/60 font-semibold text-blue-800' : 'text-gray-700'
                }`}
              >
                <span>{range}</span>
                {selectedDateRange === range && <Check className="w-4 h-4 text-blue-600" />}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Custom Date Range Picker Dialog */}
      {showCustomDatePicker && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-xs flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6 space-y-4">
            <div className="flex items-center justify-between border-b pb-3">
              <h3 className="font-bold text-gray-900 text-lg">Select Custom Date Range</h3>
              <button
                onClick={() => setShowCustomDatePicker(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4 pt-2">
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1">From Date</label>
                <input
                  type="date"
                  value={customStart}
                  onChange={(e) => setCustomStart(e.target.value)}
                  className="w-full border border-gray-300 rounded p-2.5 text-sm focus:ring-2 focus:ring-[#ED1C24] focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1">To Date</label>
                <input
                  type="date"
                  value={customEnd}
                  onChange={(e) => setCustomEnd(e.target.value)}
                  className="w-full border border-gray-300 rounded p-2.5 text-sm focus:ring-2 focus:ring-[#ED1C24] focus:outline-none"
                />
              </div>
            </div>

            <div className="flex justify-end space-x-3 pt-4 border-t">
              <button
                onClick={() => setShowCustomDatePicker(false)}
                className="px-4 py-2 text-sm text-gray-600 hover:text-gray-900 font-medium"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  setSelectedDateRange('Custom Date Range');
                  setShowCustomDatePicker(false);
                }}
                className="px-5 py-2 text-sm bg-[#ED1C24] hover:bg-[#d61920] text-white font-medium rounded shadow-xs"
              >
                Apply Range
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
