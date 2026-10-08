import { Product } from './product';

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface Coupon {
  code: string;
  discountPercentage: number;
  maxDiscount: number; // in INR
  description: string;
}

export interface CartSummary {
  subtotal: number;
  shipping: number;
  discount: number;
  total: number;
  appliedCoupon: Coupon | null;
  itemCount: number;
}
