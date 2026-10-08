import React from 'react';
import { FilterState } from '../../types/filter';
import { CategoryId } from '../../types/product';
import { CATEGORIES } from '../../data/categories';
import { RotateCcw, Check, Star } from 'lucide-react';

interface FilterSidebarProps {
  filters: FilterState;
  onChange: (newFilters: Partial<FilterState>) => void;
  onReset: () => void;
  totalProductsCount: number;
  filteredProductsCount: number;
}

export const FilterSidebar: React.FC<FilterSidebarProps> = ({
  filters,
  onChange,
  onReset,
  totalProductsCount,
  filteredProductsCount,
}) => {
  const priceRanges = [
    { label: 'All Prices', min: 0, max: 100000 },
    { label: 'Under ₹1,000', min: 0, max: 1000 },
    { label: '₹1,000 – ₹2,500', min: 1000, max: 2500 },
    { label: '₹2,500 – ₹5,000', min: 2500, max: 5000 },
    { label: '₹5,000 – ₹10,000', min: 5000, max: 10000 },
    { label: 'Above ₹10,000', min: 10000, max: 100000 },
  ];

  const ratingOptions = [
    { label: 'All Ratings', value: 0 },
    { label: '4.5 & above', value: 4.5 },
    { label: '4.7 & above', value: 4.7 },
    { label: '4.8 & above', value: 4.8 },
  ];

  const isFiltered =
    filters.search !== '' ||
    filters.category !== 'all' ||
    filters.minPrice > 0 ||
    filters.maxPrice < 100000 ||
    filters.minRating > 0 ||
    filters.inStockOnly;

  return (
    <aside className="w-full space-y-6" aria-label="Product filters">
      {/* Header with Results count & Clear action */}
      <div className="flex items-center justify-between pb-4 border-b border-slate-200">
        <div>
          <h2 className="text-base font-bold text-slate-900">Filters</h2>
          <p className="text-xs text-slate-500">
            Showing <strong className="text-slate-800">{filteredProductsCount}</strong> of {totalProductsCount} products
          </p>
        </div>

        {isFiltered && (
          <button
            type="button"
            onClick={onReset}
            className="inline-flex items-center gap-1 text-xs font-semibold text-violet-700 hover:text-violet-900 hover:underline cursor-pointer"
          >
            <RotateCcw size={12} />
            Reset all
          </button>
        )}
      </div>

      {/* 1. Category Filter */}
      <div className="space-y-3">
        <h3 className="text-xs font-bold uppercase tracking-wider text-slate-600">
          Category
        </h3>
        <div className="space-y-1">
          <button
            type="button"
            onClick={() => onChange({ category: 'all', page: 1 })}
            className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-semibold transition-colors cursor-pointer ${
              filters.category === 'all'
                ? 'bg-violet-700 text-white'
                : 'text-slate-700 hover:bg-slate-100'
            }`}
          >
            <span>All Categories</span>
            <span
              className={`text-[11px] px-1.5 py-0.5 rounded-full ${
                filters.category === 'all' ? 'bg-violet-800 text-violet-100' : 'bg-slate-200 text-slate-600'
              }`}
            >
              {totalProductsCount}
            </span>
          </button>

          {CATEGORIES.map((cat) => {
            const isSelected = filters.category === cat.id;
            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => onChange({ category: cat.id as CategoryId, page: 1 })}
                className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-semibold transition-colors cursor-pointer ${
                  isSelected
                    ? 'bg-violet-700 text-white'
                    : 'text-slate-700 hover:bg-slate-100'
                }`}
              >
                <span className="truncate">{cat.name}</span>
                <span
                  className={`text-[11px] px-1.5 py-0.5 rounded-full ${
                    isSelected ? 'bg-violet-800 text-violet-100' : 'bg-slate-200 text-slate-600'
                  }`}
                >
                  {cat.productCount}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* 2. Price Range */}
      <div className="space-y-3 pt-4 border-t border-slate-200">
        <h3 className="text-xs font-bold uppercase tracking-wider text-slate-600">
          Price Range
        </h3>
        <div className="space-y-1.5">
          {priceRanges.map((range, idx) => {
            const isSelected =
              filters.minPrice === range.min && filters.maxPrice === range.max;
            return (
              <label
                key={idx}
                className="flex items-center gap-2.5 px-2 py-1.5 rounded-lg text-xs font-medium text-slate-700 hover:bg-slate-50 cursor-pointer"
              >
                <input
                  type="radio"
                  name="price-bracket"
                  checked={isSelected}
                  onChange={() =>
                    onChange({ minPrice: range.min, maxPrice: range.max, page: 1 })
                  }
                  className="w-4 h-4 text-violet-700 border-slate-300 focus:ring-violet-500"
                />
                <span>{range.label}</span>
              </label>
            );
          })}
        </div>

        {/* Custom price inputs */}
        <div className="pt-2 flex items-center gap-2">
          <div className="flex-1">
            <span className="text-[10px] text-slate-600 block mb-0.5">Min (₹)</span>
            <input
              type="number"
              min="0"
              max={filters.maxPrice}
              value={filters.minPrice === 0 ? '' : filters.minPrice}
              placeholder="0"
              onChange={(e) => {
                const val = e.target.value === '' ? 0 : Math.max(0, Number(e.target.value));
                onChange({ minPrice: val, page: 1 });
              }}
              className="w-full px-2.5 py-1.5 text-xs bg-slate-50 border border-slate-300 rounded-lg focus:bg-white focus:outline-hidden focus:ring-1 focus:ring-violet-500"
            />
          </div>
          <span className="text-slate-400 mt-3">-</span>
          <div className="flex-1">
            <span className="text-[10px] text-slate-600 block mb-0.5">Max (₹)</span>
            <input
              type="number"
              min={filters.minPrice}
              value={filters.maxPrice === 100000 ? '' : filters.maxPrice}
              placeholder="50000"
              onChange={(e) => {
                const val = e.target.value === '' ? 100000 : Math.max(filters.minPrice, Number(e.target.value));
                onChange({ maxPrice: val, page: 1 });
              }}
              className="w-full px-2.5 py-1.5 text-xs bg-slate-50 border border-slate-300 rounded-lg focus:bg-white focus:outline-hidden focus:ring-1 focus:ring-violet-500"
            />
          </div>
        </div>
      </div>

      {/* 3. Minimum Rating */}
      <div className="space-y-3 pt-4 border-t border-slate-200">
        <h3 className="text-xs font-bold uppercase tracking-wider text-slate-600">
          Customer Rating
        </h3>
        <div className="space-y-1">
          {ratingOptions.map((opt) => {
            const isSelected = filters.minRating === opt.value;
            return (
              <button
                key={opt.value}
                type="button"
                onClick={() => onChange({ minRating: opt.value, page: 1 })}
                className={`w-full flex items-center justify-between px-3 py-1.5 rounded-lg text-xs font-medium transition-colors cursor-pointer ${
                  isSelected
                    ? 'bg-amber-50 text-amber-900 border border-amber-300 font-semibold'
                    : 'text-slate-700 hover:bg-slate-50'
                }`}
              >
                <div className="flex items-center gap-1.5">
                  <Star
                    size={14}
                    className={opt.value > 0 ? 'fill-amber-400 text-amber-400' : 'text-slate-400'}
                  />
                  <span>{opt.label}</span>
                </div>
                {isSelected && <Check size={14} className="text-amber-700" />}
              </button>
            );
          })}
        </div>
      </div>

      {/* 4. Stock Availability */}
      <div className="pt-4 border-t border-slate-200">
        <label className="flex items-center gap-2.5 px-1 py-1 rounded-lg text-xs font-semibold text-slate-800 cursor-pointer select-none">
          <input
            type="checkbox"
            checked={filters.inStockOnly}
            onChange={(e) => onChange({ inStockOnly: e.target.checked, page: 1 })}
            className="w-4 h-4 text-violet-700 border-slate-300 rounded focus:ring-violet-500"
          />
          <span>In Stock Only</span>
        </label>
      </div>
    </aside>
  );
};
