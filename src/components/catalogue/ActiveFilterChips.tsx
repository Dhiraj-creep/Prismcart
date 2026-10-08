import React from 'react';
import { FilterState } from '../../types/filter';
import { CATEGORIES } from '../../data/categories';
import { formatINR } from '../../utils/currency';
import { X } from 'lucide-react';

interface ActiveFilterChipsProps {
  filters: FilterState;
  onRemoveFilter: (key: keyof FilterState, value?: unknown) => void;
  onClearAll: () => void;
  count: number;
}

export const ActiveFilterChips: React.FC<ActiveFilterChipsProps> = ({
  filters,
  onRemoveFilter,
  onClearAll,
  count,
}) => {
  const chips: { label: string; onRemove: () => void }[] = [];

  // Search chip
  if (filters.search) {
    chips.push({
      label: `Search: "${filters.search}"`,
      onRemove: () => onRemoveFilter('search', ''),
    });
  }

  // Category chip
  if (filters.category && filters.category !== 'all') {
    const cat = CATEGORIES.find((c) => c.id === filters.category);
    chips.push({
      label: `Category: ${cat ? cat.name : filters.category}`,
      onRemove: () => onRemoveFilter('category', 'all'),
    });
  }

  // Price range chip
  if (filters.minPrice > 0 || filters.maxPrice < 100000) {
    let priceLabel = '';
    if (filters.minPrice > 0 && filters.maxPrice < 100000) {
      priceLabel = `${formatINR(filters.minPrice)} – ${formatINR(filters.maxPrice)}`;
    } else if (filters.minPrice > 0) {
      priceLabel = `Over ${formatINR(filters.minPrice)}`;
    } else {
      priceLabel = `Under ${formatINR(filters.maxPrice)}`;
    }
    chips.push({
      label: `Price: ${priceLabel}`,
      onRemove: () => {
        onRemoveFilter('minPrice', 0);
        onRemoveFilter('maxPrice', 100000);
      },
    });
  }

  // Rating chip
  if (filters.minRating > 0) {
    chips.push({
      label: `Rating: ${filters.minRating}★ & above`,
      onRemove: () => onRemoveFilter('minRating', 0),
    });
  }

  // In stock chip
  if (filters.inStockOnly) {
    chips.push({
      label: 'In Stock Only',
      onRemove: () => onRemoveFilter('inStockOnly', false),
    });
  }

  if (chips.length === 0) {
    return (
      <div className="text-xs font-medium text-slate-500 py-1">
        Showing all <strong className="text-slate-800">{count}</strong> products
      </div>
    );
  }

  return (
    <div className="flex items-center flex-wrap gap-2 py-1">
      <span className="text-xs font-semibold text-slate-500 mr-1">
        Active ({chips.length}):
      </span>

      {chips.map((chip, idx) => (
        <span
          key={idx}
          className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-violet-50 text-violet-800 border border-violet-200 shadow-2xs"
        >
          <span>{chip.label}</span>
          <button
            type="button"
            onClick={chip.onRemove}
            aria-label={`Remove filter ${chip.label}`}
            className="hover:bg-violet-200 text-violet-600 rounded-full p-0.5 transition-colors cursor-pointer"
          >
            <X size={12} />
          </button>
        </span>
      ))}

      <button
        type="button"
        onClick={onClearAll}
        className="text-xs font-bold text-rose-600 hover:text-rose-700 hover:underline px-2 py-1 ml-1 cursor-pointer"
      >
        Clear all
      </button>
    </div>
  );
};
