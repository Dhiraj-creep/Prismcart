import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck, Truck, ArrowRight } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { formatINR } from '../../utils/currency';
import { SHIPPING_CONFIG } from '../../data/coupon';
import { CouponInput } from './CouponInput';

interface OrderSummaryCardProps {
  showCheckoutButton?: boolean;
}

export const OrderSummaryCard: React.FC<OrderSummaryCardProps> = ({
  showCheckoutButton = true,
}) => {
  const { summary } = useCart();
  const { subtotal, shipping, discount, total, itemCount } = summary;

  const freeShippingThreshold = SHIPPING_CONFIG.FREE_SHIPPING_THRESHOLD;
  const isFreeShipping = subtotal >= freeShippingThreshold;
  const amountNeededForFreeShipping = Math.max(0, freeShippingThreshold - subtotal);
  const freeShippingProgress = Math.min(100, Math.round((subtotal / freeShippingThreshold) * 100));

  return (
    <div className="bg-white rounded-2xl border border-slate-200/90 shadow-sm p-5 sm:p-6 space-y-5">
      <h3 className="text-base font-bold text-slate-900 pb-3 border-b border-slate-100">
        Order Summary ({itemCount} {itemCount === 1 ? 'item' : 'items'})
      </h3>

      {/* Free Shipping Milestone Indicator */}
      {subtotal > 0 && (
        <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/80 space-y-2">
          <div className="flex items-center justify-between text-xs">
            <span className="font-semibold text-slate-700 flex items-center gap-1.5">
              <Truck size={15} className={isFreeShipping ? 'text-emerald-600' : 'text-violet-600'} />
              {isFreeShipping ? (
                <span className="text-emerald-700 font-bold">You qualify for FREE Delivery!</span>
              ) : (
                <span>
                  Add <strong className="text-slate-900">{formatINR(amountNeededForFreeShipping)}</strong> for free shipping
                </span>
              )}
            </span>
            <span className="font-bold text-slate-500">{freeShippingProgress}%</span>
          </div>
          <div className="w-full h-2 bg-slate-200 rounded-full overflow-hidden">
            <div
              className={`h-full transition-all duration-500 ${
                isFreeShipping ? 'bg-emerald-500' : 'bg-violet-600'
              }`}
              style={{ width: `${freeShippingProgress}%` }}
            />
          </div>
        </div>
      )}

      {/* Pricing Breakdown */}
      <div className="space-y-2.5 text-xs sm:text-sm text-slate-600">
        <div className="flex justify-between">
          <span>Subtotal</span>
          <span className="font-semibold text-slate-900">{formatINR(subtotal)}</span>
        </div>

        {discount > 0 && (
          <div className="flex justify-between text-emerald-600 font-medium">
            <span>Coupon Discount</span>
            <span>-{formatINR(discount)}</span>
          </div>
        )}

        <div className="flex justify-between">
          <span>Estimated Shipping</span>
          {subtotal === 0 ? (
            <span className="font-semibold text-slate-400">₹0</span>
          ) : isFreeShipping ? (
            <span className="font-bold text-emerald-600 uppercase text-xs">FREE</span>
          ) : (
            <span className="font-semibold text-slate-900">{formatINR(shipping)}</span>
          )}
        </div>

        <div className="pt-3 border-t border-slate-200 flex justify-between items-baseline">
          <span className="text-sm sm:text-base font-bold text-slate-900">Total</span>
          <span className="text-xl sm:text-2xl font-black text-slate-900">
            {formatINR(total)}
          </span>
        </div>
      </div>

      {/* Coupon section */}
      <div className="pt-2 border-t border-slate-100">
        <CouponInput />
      </div>

      {/* Checkout Button */}
      {showCheckoutButton && (
        <div className="pt-2">
          {itemCount === 0 ? (
            <button
              type="button"
              disabled
              className="w-full py-3 px-4 rounded-xl bg-slate-200 text-slate-400 font-bold text-sm cursor-not-allowed text-center"
            >
              Cart is Empty
            </button>
          ) : (
            <Link
              to="/checkout"
              className="w-full py-3.5 px-4 rounded-xl bg-violet-700 hover:bg-violet-800 text-white font-bold text-sm shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2"
            >
              <span>Proceed to Demo Checkout</span>
              <ArrowRight size={16} />
            </Link>
          )}
        </div>
      )}

      <div className="flex items-center justify-center gap-1.5 text-[11px] text-slate-400 pt-1">
        <ShieldCheck size={14} className="text-emerald-500" />
        <span>Simulated demo checkout • No payment charged</span>
      </div>
    </div>
  );
};
