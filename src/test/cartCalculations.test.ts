import { describe, it, expect } from 'vitest';
import { DEMO_COUPON, SHIPPING_CONFIG } from '../data/coupon';
import { toPaise, toRupees } from '../utils/currency';

function calculateCartTotals(
  items: { price: number; quantity: number }[],
  couponCode?: string | null
) {
  let subtotalPaise = 0;
  let itemCount = 0;

  for (const item of items) {
    subtotalPaise += toPaise(item.price) * item.quantity;
    itemCount += item.quantity;
  }

  const subtotal = toRupees(subtotalPaise);

  let discountPaise = 0;
  if (couponCode && couponCode.toUpperCase() === DEMO_COUPON.code && subtotal > 0) {
    const rawDiscount = Math.round(
      (subtotalPaise * DEMO_COUPON.discountPercentage) / 100
    );
    const maxDiscountPaise = toPaise(DEMO_COUPON.maxDiscount);
    discountPaise = Math.min(rawDiscount, maxDiscountPaise);
  }
  const discount = toRupees(discountPaise);

  let shipping = 0;
  if (subtotal > 0) {
    shipping =
      subtotal >= SHIPPING_CONFIG.FREE_SHIPPING_THRESHOLD
        ? 0
        : SHIPPING_CONFIG.STANDARD_SHIPPING_FEE;
  }

  const totalPaise = Math.max(0, subtotalPaise - discountPaise + toPaise(shipping));
  const total = toRupees(totalPaise);

  return { subtotal, discount, shipping, total, itemCount };
}

describe('Cart Monetary Calculations', () => {
  it('should return 0 for empty cart', () => {
    const summary = calculateCartTotals([]);
    expect(summary.subtotal).toBe(0);
    expect(summary.shipping).toBe(0);
    expect(summary.discount).toBe(0);
    expect(summary.total).toBe(0);
    expect(summary.itemCount).toBe(0);
  });

  it('should apply ₹79 shipping for orders under ₹999', () => {
    const summary = calculateCartTotals([{ price: 500, quantity: 1 }]);
    expect(summary.subtotal).toBe(500);
    expect(summary.shipping).toBe(79);
    expect(summary.total).toBe(579);
  });

  it('should apply free shipping for orders at or over ₹999', () => {
    const summary = calculateCartTotals([{ price: 999, quantity: 1 }]);
    expect(summary.subtotal).toBe(999);
    expect(summary.shipping).toBe(0);
    expect(summary.total).toBe(999);

    const summaryOver = calculateCartTotals([{ price: 1500, quantity: 1 }]);
    expect(summaryOver.shipping).toBe(0);
  });

  it('should calculate 10% coupon discount with WELCOME10', () => {
    const summary = calculateCartTotals([{ price: 2000, quantity: 1 }], 'WELCOME10');
    expect(summary.subtotal).toBe(2000);
    expect(summary.discount).toBe(200); // 10% of 2000
    expect(summary.shipping).toBe(0);
    expect(summary.total).toBe(1800);
  });

  it('should cap WELCOME10 coupon discount at ₹500', () => {
    // 10% of 8000 is 800, but capped at 500
    const summary = calculateCartTotals([{ price: 8000, quantity: 1 }], 'WELCOME10');
    expect(summary.subtotal).toBe(8000);
    expect(summary.discount).toBe(500);
    expect(summary.total).toBe(7500);
  });

  it('should not apply coupon discount if cart is empty', () => {
    const summary = calculateCartTotals([], 'WELCOME10');
    expect(summary.discount).toBe(0);
    expect(summary.total).toBe(0);
  });

  it('should ignore unrecognized coupon codes', () => {
    const summary = calculateCartTotals([{ price: 1200, quantity: 1 }], 'INVALID_CODE');
    expect(summary.discount).toBe(0);
    expect(summary.total).toBe(1200);
  });
});
