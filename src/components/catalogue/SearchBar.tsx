import React from 'react';
import { Search, X } from 'lucide-react';

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
}

export const SearchBar: React.FC<SearchBarProps> = ({
  value,
  onChange,
  placeholder = 'Search by name, category, brand, or tags...',
  className = '',
}) => {
  return (
    <div className={`relative flex items-center ${className}`}>
      <Search
        size={18}
        className="absolute left-3.5 text-slate-400 pointer-events-none"
      />
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        aria-label="Search products"
        className="w-full pl-10 pr-9 py-2.5 bg-white border border-slate-300 hover:border-slate-400 focus:border-violet-600 rounded-xl text-sm text-slate-900 placeholder-slate-400 focus:outline-hidden focus:ring-2 focus:ring-violet-500/20 shadow-2xs transition-all"
      />
      {value && (
        <button
          type="button"
          onClick={() => onChange('')}
          aria-label="Clear search input"
          className="absolute right-3 text-slate-400 hover:text-slate-600 p-0.5 rounded-full"
        >
          <X size={16} />
        </button>
      )}
    </div>
  );
};
