/**
 * Safe localStorage wrapper with type safety and corrupted JSON fallback.
 */

const STORAGE_KEYS = {
  CART: 'prismcart_cart_v1',
  WISHLIST: 'prismcart_wishlist_v1',
  COUPON: 'prismcart_coupon_v1',
  ORDERS: 'prismcart_demo_orders_v1',
} as const;

export interface StoredCartItem {
  productId: string;
  quantity: number;
}

export function getStoredCart(): StoredCartItem[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.CART);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    // Validate schema
    return parsed.filter(
      (item): item is StoredCartItem =>
        typeof item === 'object' &&
        item !== null &&
        typeof item.productId === 'string' &&
        typeof item.quantity === 'number' &&
        item.quantity > 0
    );
  } catch {
    console.warn('Corrupted cart storage encountered, resetting cart.');
    return [];
  }
}

export function setStoredCart(items: StoredCartItem[]): void {
  try {
    localStorage.setItem(STORAGE_KEYS.CART, JSON.stringify(items));
  } catch (err) {
    console.error('Failed to save cart to localStorage', err);
  }
}

export function getStoredWishlist(): string[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.WISHLIST);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed.filter((id): id is string => typeof id === 'string');
  } catch {
    console.warn('Corrupted wishlist storage encountered, resetting wishlist.');
    return [];
  }
}

export function setStoredWishlist(productIds: string[]): void {
  try {
    localStorage.setItem(STORAGE_KEYS.WISHLIST, JSON.stringify(productIds));
  } catch (err) {
    console.error('Failed to save wishlist to localStorage', err);
  }
}

export function getStoredCoupon(): string | null {
  try {
    return localStorage.getItem(STORAGE_KEYS.COUPON);
  } catch {
    return null;
  }
}

export function setStoredCoupon(code: string | null): void {
  try {
    if (code) {
      localStorage.setItem(STORAGE_KEYS.COUPON, code);
    } else {
      localStorage.removeItem(STORAGE_KEYS.COUPON);
    }
  } catch (err) {
    console.error('Failed to save coupon to localStorage', err);
  }
}

export function getStoredOrders(): unknown[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.ORDERS);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export function addStoredOrder(order: unknown): void {
  try {
    const existing = getStoredOrders();
    localStorage.setItem(STORAGE_KEYS.ORDERS, JSON.stringify([order, ...existing]));
  } catch (err) {
    console.error('Failed to save order to localStorage', err);
  }
}

export function clearAllDemoStorage(): void {
  try {
    localStorage.removeItem(STORAGE_KEYS.CART);
    localStorage.removeItem(STORAGE_KEYS.WISHLIST);
    localStorage.removeItem(STORAGE_KEYS.COUPON);
    localStorage.removeItem(STORAGE_KEYS.ORDERS);
  } catch (err) {
    console.error('Failed to clear demo storage', err);
  }
}
