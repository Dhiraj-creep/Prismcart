import React, { createContext, useContext, useState, useEffect, useMemo, useCallback } from 'react';
import { CartItem, CartSummary, Coupon } from '../types/cart';
import { Product } from '../types/product';
import { PRODUCTS } from '../data/products';
import { DEMO_COUPON, SHIPPING_CONFIG } from '../data/coupon';
import {
  getStoredCart,
  setStoredCart,
  getStoredCoupon,
  setStoredCoupon,
  StoredCartItem,
} from '../utils/storage';
import { toPaise, toRupees } from '../utils/currency';

interface CartContextType {
  items: CartItem[];
  summary: CartSummary;
  appliedCoupon: Coupon | null;
  addToCart: (product: Product, quantity?: number) => { success: boolean; message: string };
  updateQuantity: (productId: string, quantity: number) => { success: boolean; message: string };
  removeFromCart: (productId: string) => void;
  clearCart: () => void;
  applyCoupon: (code: string) => { success: boolean; message: string };
  removeCoupon: () => void;
  getItemQuantity: (productId: string) => number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Load initial cart items matching current product catalog
  const [items, setItems] = useState<CartItem[]>(() => {
    const stored = getStoredCart();
    const validated: CartItem[] = [];

    for (const entry of stored) {
      const prod = PRODUCTS.find((p) => p.id === entry.productId);
      if (prod && prod.stock > 0) {
        // Enforce valid quantity within available stock
        const validQty = Math.max(1, Math.min(entry.quantity, prod.stock));
        validated.push({ product: prod, quantity: validQty });
      }
    }
    return validated;
  });

  // Load coupon from storage
  const [appliedCoupon, setAppliedCoupon] = useState<Coupon | null>(() => {
    const code = getStoredCoupon();
    if (code && code.toUpperCase() === DEMO_COUPON.code) {
      return DEMO_COUPON;
    }
    return null;
  });

  // Sync cart items to localStorage
  useEffect(() => {
    const storedData: StoredCartItem[] = items.map((item) => ({
      productId: item.product.id,
      quantity: item.quantity,
    }));
    setStoredCart(storedData);
  }, [items]);

  // Sync coupon to localStorage
  useEffect(() => {
    setStoredCoupon(appliedCoupon ? appliedCoupon.code : null);
  }, [appliedCoupon]);

  // Recalculate summary from product prices & quantities using integer paise
  const summary = useMemo<CartSummary>(() => {
    let subtotalPaise = 0;
    let itemCount = 0;

    for (const item of items) {
      subtotalPaise += toPaise(item.product.price) * item.quantity;
      itemCount += item.quantity;
    }

    const subtotal = toRupees(subtotalPaise);

    // Calculate discount
    let discountPaise = 0;
    if (appliedCoupon && subtotal > 0) {
      const calculatedDiscount = Math.round(
        (subtotalPaise * appliedCoupon.discountPercentage) / 100
      );
      const maxDiscountPaise = toPaise(appliedCoupon.maxDiscount);
      discountPaise = Math.min(calculatedDiscount, maxDiscountPaise);
    }
    const discount = toRupees(discountPaise);

    // Shipping rule
    let shipping = 0;
    if (subtotal > 0) {
      shipping =
        subtotal >= SHIPPING_CONFIG.FREE_SHIPPING_THRESHOLD
          ? 0
          : SHIPPING_CONFIG.STANDARD_SHIPPING_FEE;
    }

    const totalPaise = Math.max(0, subtotalPaise - discountPaise + toPaise(shipping));
    const total = toRupees(totalPaise);

    return {
      subtotal,
      shipping,
      discount,
      total,
      appliedCoupon,
      itemCount,
    };
  }, [items, appliedCoupon]);

  const getItemQuantity = useCallback(
    (productId: string): number => {
      const found = items.find((i) => i.product.id === productId);
      return found ? found.quantity : 0;
    },
    [items]
  );

  const addToCart = useCallback(
    (product: Product, quantityToAdd = 1): { success: boolean; message: string } => {
      if (product.stock <= 0) {
        return { success: false, message: `${product.name} is currently out of stock.` };
      }

      let outcome = { success: true, message: `Added ${product.name} to cart.` };

      setItems((prev) => {
        const existing = prev.find((item) => item.product.id === product.id);
        if (existing) {
          const newQty = existing.quantity + quantityToAdd;
          if (newQty > product.stock) {
            outcome = {
              success: false,
              message: `Cannot add more. Limit of ${product.stock} reached for ${product.name}.`,
            };
            return prev;
          }
          outcome = {
            success: true,
            message: `Updated quantity for ${product.name} to ${newQty}.`,
          };
          return prev.map((item) =>
            item.product.id === product.id ? { ...item, quantity: newQty } : item
          );
        } else {
          if (quantityToAdd > product.stock) {
            outcome = {
              success: false,
              message: `Only ${product.stock} units available in stock.`,
            };
            return prev;
          }
          return [...prev, { product, quantity: quantityToAdd }];
        }
      });

      return outcome;
    },
    []
  );

  const updateQuantity = useCallback(
    (productId: string, newQuantity: number): { success: boolean; message: string } => {
      let outcome = { success: true, message: 'Cart updated.' };

      setItems((prev) => {
        const target = prev.find((i) => i.product.id === productId);
        if (!target) return prev;

        if (newQuantity <= 0) {
          outcome = { success: true, message: `Removed ${target.product.name} from cart.` };
          return prev.filter((i) => i.product.id !== productId);
        }

        if (newQuantity > target.product.stock) {
          outcome = {
            success: false,
            message: `Cannot exceed available stock of ${target.product.stock} units.`,
          };
          return prev;
        }

        return prev.map((item) =>
          item.product.id === productId ? { ...item, quantity: newQuantity } : item
        );
      });

      return outcome;
    },
    []
  );

  const removeFromCart = useCallback((productId: string) => {
    setItems((prev) => prev.filter((i) => i.product.id !== productId));
  }, []);

  const clearCart = useCallback(() => {
    setItems([]);
  }, []);

  const applyCoupon = useCallback(
    (code: string): { success: boolean; message: string } => {
      const cleanCode = code.trim().toUpperCase();

      if (!cleanCode) {
        return { success: false, message: 'Please enter a coupon code.' };
      }

      if (appliedCoupon && appliedCoupon.code === cleanCode) {
        return { success: false, message: `Coupon "${cleanCode}" is already applied.` };
      }

      if (cleanCode === DEMO_COUPON.code) {
        setAppliedCoupon(DEMO_COUPON);
        return {
          success: true,
          message: `Coupon "${DEMO_COUPON.code}" applied! You save 10% (up to ₹500).`,
        };
      }

      return {
        success: false,
        message: `Invalid coupon code "${cleanCode}". Try WELCOME10 for demo discount.`,
      };
    },
    [appliedCoupon]
  );

  const removeCoupon = useCallback(() => {
    setAppliedCoupon(null);
  }, []);

  return (
    <CartContext.Provider
      value={{
        items,
        summary,
        appliedCoupon,
        addToCart,
        updateQuantity,
        removeFromCart,
        clearCart,
        applyCoupon,
        removeCoupon,
        getItemQuantity,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export function useCart(): CartContextType {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}
