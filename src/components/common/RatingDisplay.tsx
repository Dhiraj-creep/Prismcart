import React from 'react';
import { Star } from 'lucide-react';

interface RatingDisplayProps {
  rating: number;
  reviewCount?: number;
  size?: 'sm' | 'md' | 'lg';
  showCount?: boolean;
}

export const RatingDisplay: React.FC<RatingDisplayProps> = ({
  rating,
  reviewCount,
  size = 'sm',
  showCount = true,
}) => {
  const iconSize = size === 'lg' ? 18 : size === 'md' ? 16 : 14;
  const textSize = size === 'lg' ? 'text-base' : size === 'md' ? 'text-sm' : 'text-xs';

  return (
    <div
      className="inline-flex items-center gap-1.5"
      aria-label={`Rated ${rating.toFixed(1)} out of 5 stars${
        reviewCount ? ` across ${reviewCount} sample reviews` : ''
      }`}
    >
      <div className="flex items-center text-amber-400">
        {[1, 2, 3, 4, 5].map((starIndex) => {
          const isFilled = starIndex <= Math.round(rating);
          return (
            <Star
              key={starIndex}
              size={iconSize}
              className={`${
                isFilled ? 'fill-amber-400 text-amber-400' : 'text-slate-200 fill-slate-200'
              }`}
              aria-hidden="true"
            />
          );
        })}
      </div>
      <span className={`font-semibold text-slate-800 ${textSize}`}>
        {rating.toFixed(1)}
      </span>
      {showCount && typeof reviewCount === 'number' && (
        <span className={`text-slate-600 ${textSize}`}>
          ({reviewCount})
        </span>
      )}
    </div>
  );
};
