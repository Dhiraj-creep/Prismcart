import React, { useState } from 'react';
import { Tag, Check, X } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { useToast } from '../../context/ToastContext';

export const CouponInput: React.FC = () => {
  const { appliedCoupon, applyCoupon, removeCoupon } = useCart();
  const { showToast } = useToast();
  const [couponCode, setCouponCode] = useState('');

  const handleApply = (e: React.FormEvent) => {
    e.preventDefault();
    if (!couponCode.trim()) return;

    const result = applyCoupon(couponCode);
    if (result.success) {
      showToast(result.message, 'success');
      setCouponCode('');
    } else {
      showToast(result.message, 'error');
    }
  };

  const handleRemove = () => {
    removeCoupon();
    showToast('Coupon removed from cart.', 'info');
  };

  if (appliedCoupon) {
    return (
      <div className="flex items-center justify-between p-3 rounded-xl bg-emerald-50 border border-emerald-200">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0">
            <Check size={16} />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-900">
                {appliedCoupon.code}
              </span>
              <span className="text-[10px] font-semibold px-1.5 py-0.5 rounded bg-emerald-200 text-emerald-800">
                10% OFF
              </span>
            </div>
            <p className="text-[11px] text-emerald-700">
              {appliedCoupon.description}
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={handleRemove}
          aria-label="Remove coupon"
          className="text-xs font-semibold text-rose-600 hover:text-rose-800 p-1 flex items-center gap-0.5 cursor-pointer"
        >
          <X size={14} />
          <span>Remove</span>
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-2">
      <form onSubmit={handleApply} className="flex gap-2">
        <div className="relative flex-1">
          <Tag
            size={16}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
          />
          <input
            type="text"
            value={couponCode}
            onChange={(e) => setCouponCode(e.target.value.toUpperCase())}
            placeholder="Try WELCOME10"
            aria-label="Discount coupon code"
            className="w-full pl-9 pr-3 py-2 text-xs uppercase font-medium bg-slate-50 border border-slate-300 rounded-xl focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-violet-500/20 focus:border-violet-600"
          />
        </div>
        <button
          type="submit"
          disabled={!couponCode.trim()}
          className="px-4 py-2 bg-slate-900 hover:bg-slate-800 disabled:bg-slate-300 text-white font-bold text-xs rounded-xl transition-colors cursor-pointer"
        >
          Apply
        </button>
      </form>
      <p className="text-[11px] text-slate-500">
        Demo Tip: Enter <strong className="text-violet-700">WELCOME10</strong> for 10% off (up to ₹500).
      </p>
    </div>
  );
};
