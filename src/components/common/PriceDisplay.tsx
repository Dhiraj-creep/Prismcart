import React from 'react';
import { formatINR, calculateDiscountPercentage } from '../../utils/currency';

interface PriceDisplayProps {
  price: number;
  originalPrice?: number;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showDiscountBadge?: boolean;
}

export const PriceDisplay: React.FC<PriceDisplayProps> = ({
  price,
  originalPrice,
  size = 'md',
  showDiscountBadge = true,
}) => {
  const discountPercent = calculateDiscountPercentage(price, originalPrice);

  const priceSizes = {
    sm: 'text-base font-semibold text-slate-900',
    md: 'text-lg font-bold text-slate-900',
    lg: 'text-2xl font-extrabold text-slate-900',
    xl: 'text-3xl font-extrabold text-slate-900',
  };

  const originalSizes = {
    sm: 'text-xs text-slate-500 line-through',
    md: 'text-sm text-slate-500 line-through',
    lg: 'text-base text-slate-500 line-through',
    xl: 'text-lg text-slate-500 line-through',
  };

  return (
    <div className="flex items-baseline gap-2 flex-wrap">
      <span className={priceSizes[size]}>{formatINR(price)}</span>

      {originalPrice && originalPrice > price && (
        <span className={originalSizes[size]}>
          {formatINR(originalPrice)}
        </span>
      )}

      {showDiscountBadge && discountPercent > 0 && (
        <span className="inline-flex items-center px-1.5 py-0.5 rounded text-xs font-bold bg-rose-50 text-rose-600 border border-rose-200">
          {discountPercent}% OFF
        </span>
      )}
    </div>
  );
};
