import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
}) => {
  if (totalPages <= 1) return null;

  const getPageNumbers = () => {
    const pages: (number | string)[] = [];
    const maxVisible = 5;

    if (totalPages <= maxVisible) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      pages.push(1);

      if (currentPage > 3) {
        pages.push('...');
      }

      const start = Math.max(2, currentPage - 1);
      const end = Math.min(totalPages - 1, currentPage + 1);

      for (let i = start; i <= end; i++) {
        if (!pages.includes(i)) pages.push(i);
      }

      if (currentPage < totalPages - 2) {
        pages.push('...');
      }

      if (!pages.includes(totalPages)) {
        pages.push(totalPages);
      }
    }

    return pages;
  };

  return (
    <nav
      aria-label="Catalogue pagination"
      className="flex items-center justify-center gap-1.5 pt-8 pb-4"
    >
      <button
        type="button"
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage <= 1}
        aria-label="Previous page"
        className={`p-2 rounded-xl border text-xs font-semibold flex items-center justify-center transition-colors ${
          currentPage <= 1
            ? 'border-slate-200 text-slate-300 cursor-not-allowed bg-slate-50'
            : 'border-slate-300 text-slate-700 hover:bg-slate-100 hover:border-slate-400 bg-white cursor-pointer'
        }`}
      >
        <ChevronLeft size={16} />
      </button>

      {getPageNumbers().map((item, idx) => {
        if (item === '...') {
          return (
            <span
              key={`dots-${idx}`}
              className="w-9 h-9 flex items-center justify-center text-xs text-slate-400 select-none"
            >
              ...
            </span>
          );
        }

        const pageNum = item as number;
        const isActive = pageNum === currentPage;

        return (
          <button
            key={pageNum}
            type="button"
            onClick={() => onPageChange(pageNum)}
            aria-current={isActive ? 'page' : undefined}
            aria-label={`Page ${pageNum}`}
            className={`w-9 h-9 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              isActive
                ? 'bg-violet-700 text-white shadow-xs'
                : 'bg-white border border-slate-300 text-slate-700 hover:bg-slate-100'
            }`}
          >
            {pageNum}
          </button>
        );
      })}

      <button
        type="button"
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage >= totalPages}
        aria-label="Next page"
        className={`p-2 rounded-xl border text-xs font-semibold flex items-center justify-center transition-colors ${
          currentPage >= totalPages
            ? 'border-slate-200 text-slate-300 cursor-not-allowed bg-slate-50'
            : 'border-slate-300 text-slate-700 hover:bg-slate-100 hover:border-slate-400 bg-white cursor-pointer'
        }`}
      >
        <ChevronRight size={16} />
      </button>
    </nav>
  );
};
