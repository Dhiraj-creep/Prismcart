/**
 * PrismCart API Service Layer
 * Supports seamless hybrid operation:
 * - When Spring Boot backend is running at http://localhost:8080, calls live REST endpoints.
 * - If backend is offline or unreachable, seamlessly and gracefully falls back to local data.
 */

import { Product } from '../types/product';
import { PRODUCTS } from '../data/products';
import { CATEGORIES } from '../data/categories';
import { DEMO_COUPON, SHIPPING_CONFIG } from '../data/coupon';
import { toPaise } from '../utils/currency';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8088/api';

export interface BackendOrderRequest {
  fullName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  pincode: string;
  couponCode?: string;
  items: {
    productSlug: string;
    quantity: number;
  }[];
}

export interface BackendOrderResponse {
  id: number;
  orderNumber: string;
  fullName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  pincode: string;
  subtotal: number; // in paise
  discount: number; // in paise
  shipping: number; // in paise
  total: number; // in paise
  appliedCoupon?: string;
  status: string;
  createdAt: string;
  items: {
    productSlug: string;
    productName: string;
    quantity: number;
    pricePerUnit: number;
    lineTotal: number;
    imageUrl?: string;
  }[];
}

class ApiService {
  private isOnline = false;
  private hasChecked = false;

  public async checkHealth(): Promise<boolean> {
    try {
      const controller = new AbortController();
      const id = setTimeout(() => controller.abort(), 1500);
      const res = await fetch(`${API_BASE_URL}/health`, {
        signal: controller.signal,
      });
      clearTimeout(id);
      this.isOnline = res.ok;
      this.hasChecked = true;
      return this.isOnline;
    } catch {
      this.isOnline = false;
      this.hasChecked = true;
      return false;
    }
  }

  public getOnlineStatus(): boolean {
    return this.isOnline;
  }

  public async getCategories() {
    try {
      const res = await fetch(`${API_BASE_URL}/categories`, {
        signal: AbortSignal.timeout(2000),
      });
      if (!res.ok) throw new Error('Failed to fetch categories');
      const data = await res.json();
      this.isOnline = true;
      return data;
    } catch {
      return CATEGORIES;
    }
  }

  public async getProducts(params?: Record<string, string | number | boolean | undefined>): Promise<Product[]> {
    try {
      const searchParams = new URLSearchParams();
      if (params) {
        Object.entries(params).forEach(([key, val]) => {
          if (val !== undefined && val !== null && val !== '') {
            searchParams.set(key, String(val));
          }
        });
      }

      const res = await fetch(`${API_BASE_URL}/products?${searchParams.toString()}`, {
        signal: AbortSignal.timeout(2500),
      });
      if (!res.ok) throw new Error('Failed to fetch products');
      const backendProducts = await res.json();
      this.isOnline = true;

      // Map backend products (price in paise) to frontend Product interface (price in Rupees)
      return backendProducts.map((bp: any) => ({
        id: String(bp.id),
        slug: bp.slug,
        name: bp.name,
        brand: bp.brand,
        category: bp.category?.name || 'General',
        categoryId: bp.category?.slug || 'electronics',
        price: bp.price / 100, // paise to rupees
        originalPrice: bp.originalPrice ? bp.originalPrice / 100 : undefined,
        rating: bp.rating,
        reviewCount: bp.reviewCount,
        shortDescription: bp.shortDescription,
        detailedDescription: bp.detailedDescription,
        specifications: bp.specifications || {},
        stock: bp.stockQuantity,
        image: bp.imageUrl,
        alt: bp.imageAltText,
        tags: bp.tags || [],
        badge: bp.badge || undefined,
      }));
    } catch {
      return PRODUCTS;
    }
  }

  public async getProductBySlug(slug: string): Promise<Product | undefined> {
    try {
      const res = await fetch(`${API_BASE_URL}/products/${slug}`, {
        signal: AbortSignal.timeout(2000),
      });
      if (!res.ok) throw new Error('Product not found');
      const bp = await res.json();
      this.isOnline = true;

      return {
        id: String(bp.id),
        slug: bp.slug,
        name: bp.name,
        brand: bp.brand,
        category: bp.category?.name || 'General',
        categoryId: bp.category?.slug || 'electronics',
        price: bp.price / 100,
        originalPrice: bp.originalPrice ? bp.originalPrice / 100 : undefined,
        rating: bp.rating,
        reviewCount: bp.reviewCount,
        shortDescription: bp.shortDescription,
        detailedDescription: bp.detailedDescription,
        specifications: bp.specifications || {},
        stock: bp.stockQuantity,
        image: bp.imageUrl,
        alt: bp.imageAltText,
        tags: bp.tags || [],
        badge: bp.badge || undefined,
      };
    } catch {
      return PRODUCTS.find((p) => p.slug === slug);
    }
  }

  public async validateCoupon(code: string, subtotalRupees: number) {
    try {
      const subtotalPaise = toPaise(subtotalRupees);
      const res = await fetch(
        `${API_BASE_URL}/coupons/validate?code=${encodeURIComponent(code)}&subtotalPaise=${subtotalPaise}`,
        { signal: AbortSignal.timeout(2000) }
      );
      if (!res.ok) throw new Error('Coupon validation request failed');
      const data = await res.json();
      this.isOnline = true;
      return {
        valid: data.valid,
        discountPercentage: data.discountPercentage,
        maxDiscountRupees: data.maxDiscount / 100,
        message: data.message,
      };
    } catch {
      // Local fallback
      if (code.toUpperCase() === DEMO_COUPON.code) {
        return {
          valid: true,
          discountPercentage: DEMO_COUPON.discountPercentage,
          maxDiscountRupees: DEMO_COUPON.maxDiscount,
          message: 'Coupon WELCOME10 applied! 10% discount capped at ₹500.',
        };
      }
      return {
        valid: false,
        discountPercentage: 0,
        maxDiscountRupees: 0,
        message: 'Invalid coupon code. Try WELCOME10',
      };
    }
  }

  public async submitOrder(orderData: BackendOrderRequest): Promise<BackendOrderResponse> {
    try {
      const res = await fetch(`${API_BASE_URL}/orders`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(orderData),
        signal: AbortSignal.timeout(3000),
      });

      if (!res.ok) {
        const errorText = await res.text();
        throw new Error(errorText || 'Server rejected order');
      }

      const responseData: BackendOrderResponse = await res.json();
      this.isOnline = true;
      return responseData;
    } catch (err: any) {
      // Offline fallback: generate mock order response
      console.warn('Backend unavailable, generating local simulated order response', err);
      const rand1 = Math.floor(100000 + Math.random() * 900000);
      const rand2 = Math.floor(1000 + Math.random() * 9000);
      const mockOrderNumber = `PRISM-${rand1}-${rand2}`;

      let subtotalPaise = 0;
      const orderItems = orderData.items.map((item) => {
        const prod = PRODUCTS.find((p) => p.slug === item.productSlug);
        const pricePaise = prod ? toPaise(prod.price) : 100000;
        const lineTotal = pricePaise * item.quantity;
        subtotalPaise += lineTotal;
        return {
          productSlug: item.productSlug,
          productName: prod ? prod.name : item.productSlug,
          quantity: item.quantity,
          pricePerUnit: pricePaise,
          lineTotal,
          imageUrl: prod?.image,
        };
      });

      let discountPaise = 0;
      if (orderData.couponCode && orderData.couponCode.toUpperCase() === DEMO_COUPON.code) {
        discountPaise = Math.min(
          Math.round((subtotalPaise * DEMO_COUPON.discountPercentage) / 100),
          toPaise(DEMO_COUPON.maxDiscount)
        );
      }

      const shippingPaise =
        subtotalPaise >= toPaise(SHIPPING_CONFIG.FREE_SHIPPING_THRESHOLD)
          ? 0
          : toPaise(SHIPPING_CONFIG.STANDARD_SHIPPING_FEE);

      const totalPaise = Math.max(0, subtotalPaise - discountPaise + shippingPaise);

      return {
        id: Date.now(),
        orderNumber: mockOrderNumber,
        fullName: orderData.fullName,
        email: orderData.email,
        phone: orderData.phone,
        address: orderData.address,
        city: orderData.city,
        state: orderData.state,
        pincode: orderData.pincode,
        subtotal: subtotalPaise,
        discount: discountPaise,
        shipping: shippingPaise,
        total: totalPaise,
        appliedCoupon: orderData.couponCode,
        status: 'CONFIRMED',
        createdAt: new Date().toISOString(),
        items: orderItems,
      };
    }
  }
}

export const api = new ApiService();
