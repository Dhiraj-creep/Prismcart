import { Coupon } from '../types/cart';

export const DEMO_COUPON: Coupon = {
  code: 'WELCOME10',
  discountPercentage: 10,
  maxDiscount: 500, // in INR
  description: '10% off product subtotal, capped at ₹500',
};

export const SHIPPING_CONFIG = {
  FREE_SHIPPING_THRESHOLD: 999, // in INR
  STANDARD_SHIPPING_FEE: 79,   // in INR
};
