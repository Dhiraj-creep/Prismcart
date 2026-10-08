import React from 'react';
import { ProductBadge } from '../../types/product';
import { Sparkles, TrendingUp, Flame } from 'lucide-react';

interface BadgeProps {
  type: ProductBadge;
  className?: string;
}

export const Badge: React.FC<BadgeProps> = ({ type, className = '' }) => {
  if (!type) return null;

  switch (type) {
    case 'Bestseller':
      return (
        <span
          className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold bg-amber-500 text-white shadow-sm ${className}`}
        >
          <Flame size={12} className="fill-white" />
          Bestseller
        </span>
      );

    case 'Featured':
      return (
        <span
          className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold bg-violet-700 text-white shadow-sm ${className}`}
        >
          <Sparkles size={12} className="fill-white" />
          Featured
        </span>
      );

    case 'New':
      return (
        <span
          className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold bg-teal-600 text-white shadow-sm ${className}`}
        >
          <TrendingUp size={12} />
          New Arrival
        </span>
      );

    default:
      return null;
  }
};
