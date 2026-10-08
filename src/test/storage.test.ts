import { describe, it, expect, beforeEach } from 'vitest';
import {
  getStoredCart,
  setStoredCart,
  getStoredWishlist,
  setStoredWishlist,
  clearAllDemoStorage,
} from '../utils/storage';

// Mock localStorage
const mockStorage: Record<string, string> = {};

(globalThis as unknown as { localStorage: Storage }).localStorage = {
  getItem: (key: string) => mockStorage[key] || null,
  setItem: (key: string, value: string) => {
    mockStorage[key] = value;
  },
  removeItem: (key: string) => {
    delete mockStorage[key];
  },
  clear: () => {
    for (const k in mockStorage) delete mockStorage[k];
  },
  length: 0,
  key: () => null,
};

describe('Storage Resilience & Validation', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('should return empty array for non-existent cart', () => {
    expect(getStoredCart()).toEqual([]);
  });

  it('should store and retrieve valid cart items', () => {
    const items = [
      { productId: 'elec-01', quantity: 2 },
      { productId: 'fash-02', quantity: 1 },
    ];
    setStoredCart(items);
    expect(getStoredCart()).toEqual(items);
  });

  it('should gracefully handle corrupted JSON in cart storage', () => {
    localStorage.setItem('prismcart_cart_v1', '{invalid-json');
    expect(getStoredCart()).toEqual([]);
  });

  it('should filter out invalid schema entries in cart', () => {
    const mixed = [
      { productId: 'elec-01', quantity: 2 },
      { productId: 123, quantity: 1 }, // invalid id type
      { productId: 'fash-01', quantity: -1 }, // negative qty
      null,
      'just a string',
    ];
    localStorage.setItem('prismcart_cart_v1', JSON.stringify(mixed));
    const result = getStoredCart();
    expect(result.length).toBe(1);
    expect(result[0].productId).toBe('elec-01');
  });

  it('should store and retrieve wishlist', () => {
    setStoredWishlist(['elec-01', 'foot-01']);
    expect(getStoredWishlist()).toEqual(['elec-01', 'foot-01']);
  });

  it('should handle corrupted JSON in wishlist storage', () => {
    localStorage.setItem('prismcart_wishlist_v1', 'corrupted:{{{');
    expect(getStoredWishlist()).toEqual([]);
  });

  it('should clear all demo storage keys on reset', () => {
    setStoredCart([{ productId: 'elec-01', quantity: 1 }]);
    setStoredWishlist(['elec-01']);
    clearAllDemoStorage();
    expect(getStoredCart()).toEqual([]);
    expect(getStoredWishlist()).toEqual([]);
  });
});
