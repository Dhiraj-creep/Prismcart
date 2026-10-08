import React from 'react';
import { Minus, Plus } from 'lucide-react';

interface QuantitySelectorProps {
  quantity: number;
  max: number;
  min?: number;
  onChange: (newQuantity: number) => void;
  size?: 'sm' | 'md';
  disabled?: boolean;
}

export const QuantitySelector: React.FC<QuantitySelectorProps> = ({
  quantity,
  max,
  min = 1,
  onChange,
  size = 'md',
  disabled = false,
}) => {
  const isDecrementDisabled = disabled || quantity <= min;
  const isIncrementDisabled = disabled || quantity >= max;

  const btnSize = size === 'sm' ? 'w-7 h-7 text-xs' : 'w-9 h-9 text-sm';
  const inputSize = size === 'sm' ? 'w-10 text-xs' : 'w-12 text-sm font-semibold';

  return (
    <div className="inline-flex items-center border border-slate-300 rounded-lg bg-white overflow-hidden shadow-xs">
      <button
        type="button"
        onClick={() => onChange(Math.max(min, quantity - 1))}
        disabled={isDecrementDisabled}
        aria-label="Decrease quantity"
        className={`flex items-center justify-center transition-colors ${btnSize} ${
          isDecrementDisabled
            ? 'text-slate-300 bg-slate-50 cursor-not-allowed'
            : 'text-slate-700 hover:bg-slate-100 active:bg-slate-200'
        }`}
      >
        <Minus size={14} />
      </button>

      <span
        className={`flex items-center justify-center text-center select-none text-slate-800 ${inputSize}`}
        aria-live="polite"
        aria-label={`Current quantity ${quantity}`}
      >
        {quantity}
      </span>

      <button
        type="button"
        onClick={() => onChange(Math.min(max, quantity + 1))}
        disabled={isIncrementDisabled}
        aria-label="Increase quantity"
        className={`flex items-center justify-center transition-colors ${btnSize} ${
          isIncrementDisabled
            ? 'text-slate-300 bg-slate-50 cursor-not-allowed'
            : 'text-slate-700 hover:bg-slate-100 active:bg-slate-200'
        }`}
      >
        <Plus size={14} />
      </button>
    </div>
  );
};
