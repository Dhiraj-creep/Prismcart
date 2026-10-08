import React from 'react';
import { SortOption } from '../../types/filter';
import { ArrowDownUp } from 'lucide-react';

interface SortDropdownProps {
  value: SortOption;
  onChange: (sort: SortOption) => void;
}

export const SortDropdown: React.FC<SortDropdownProps> = ({ value, onChange }) => {
  return (
    <div className="flex items-center gap-2">
      <label htmlFor="sort-dropdown" className="text-xs font-semibold text-slate-500 whitespace-nowrap hidden sm:inline flex items-center gap-1">
        <ArrowDownUp size={13} />
        <span>Sort by:</span>
      </label>
      <div className="relative">
        <select
          id="sort-dropdown"
          value={value}
          onChange={(e) => onChange(e.target.value as SortOption)}
          aria-label="Sort products by"
          className="appearance-none bg-white border border-slate-300 hover:border-slate-400 focus:border-violet-600 rounded-xl px-3.5 py-2 pr-8 text-xs sm:text-sm font-medium text-slate-800 focus:outline-hidden focus:ring-2 focus:ring-violet-500/20 shadow-2xs transition-all cursor-pointer"
        >
          <option value="featured">Featured / Popular</option>
          <option value="price-asc">Price: Low to High</option>
          <option value="price-desc">Price: High to Low</option>
          <option value="rating-desc">Highest Rated</option>
          <option value="name-asc">Name: A to Z</option>
        </select>
        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-slate-500">
          <svg className="fill-current h-4 w-4" viewBox="0 0 20 20">
            <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
          </svg>
        </div>
      </div>
    </div>
  );
};
