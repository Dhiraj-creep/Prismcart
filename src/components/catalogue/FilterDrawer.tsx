import React, { useEffect, useRef } from 'react';
import { X } from 'lucide-react';
import { FilterState } from '../../types/filter';
import { FilterSidebar } from './FilterSidebar';

interface FilterDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  filters: FilterState;
  onChange: (newFilters: Partial<FilterState>) => void;
  onReset: () => void;
  totalProductsCount: number;
  filteredProductsCount: number;
}

export const FilterDrawer: React.FC<FilterDrawerProps> = ({
  isOpen,
  onClose,
  filters,
  onChange,
  onReset,
  totalProductsCount,
  filteredProductsCount,
}) => {
  const drawerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
      drawerRef.current?.focus();
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex justify-end lg:hidden bg-slate-900/60 backdrop-blur-xs transition-opacity"
      role="dialog"
      aria-modal="true"
      aria-label="Filter products"
    >
      <div
        ref={drawerRef}
        tabIndex={-1}
        className="w-full max-w-xs sm:max-w-sm h-full bg-white shadow-2xl flex flex-col focus:outline-hidden animate-in slide-in-from-right duration-200"
      >
        {/* Drawer Header */}
        <div className="flex items-center justify-between p-4 border-b border-slate-200">
          <h2 className="text-base font-bold text-slate-900">Filter Catalogue</h2>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close filters drawer"
            className="p-1.5 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-100 transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {/* Drawer Body */}
        <div className="flex-1 overflow-y-auto p-5">
          <FilterSidebar
            filters={filters}
            onChange={onChange}
            onReset={onReset}
            totalProductsCount={totalProductsCount}
            filteredProductsCount={filteredProductsCount}
          />
        </div>

        {/* Drawer Footer */}
        <div className="p-4 border-t border-slate-200 bg-slate-50 flex items-center gap-3">
          <button
            type="button"
            onClick={onClose}
            className="w-full py-2.5 px-4 bg-violet-700 hover:bg-violet-800 text-white font-bold text-sm rounded-xl shadow-xs transition-colors"
          >
            Show {filteredProductsCount} Products
          </button>
        </div>
      </div>
    </div>
  );
};
