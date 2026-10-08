import { describe, it, expect } from 'vitest';
import { PRODUCTS } from '../data/products';
import { filterProducts, sortProducts } from '../utils/filterProducts';
import { FilterState } from '../types/filter';

const defaultFilters: FilterState = {
  search: '',
  category: 'all',
  minPrice: 0,
  maxPrice: 100000,
  minRating: 0,
  inStockOnly: false,
  sortBy: 'featured',
  page: 1,
};

describe('filterProducts', () => {
  it('should return all 60 products with default filters', () => {
    const results = filterProducts(PRODUCTS, defaultFilters);
    expect(results.length).toBe(60);
  });

  it('should filter correctly by category', () => {
    const results = filterProducts(PRODUCTS, { ...defaultFilters, category: 'electronics' });
    expect(results.length).toBe(8);
    expect(results.every((p) => p.categoryId === 'electronics')).toBe(true);
  });

  it('should search across product name', () => {
    const results = filterProducts(PRODUCTS, { ...defaultFilters, search: 'headphones' });
    expect(results.length).toBeGreaterThanOrEqual(1);
    expect(results.some((p) => p.slug === 'sonic-shield-anc-headphones')).toBe(true);
  });

  it('should search across brand name', () => {
    const results = filterProducts(PRODUCTS, { ...defaultFilters, search: 'AuraSound' });
    expect(results.length).toBeGreaterThanOrEqual(1);
    expect(results.every((p) => p.brand.toLowerCase().includes('aurasound'))).toBe(true);
  });

  it('should search across tags', () => {
    const results = filterProducts(PRODUCTS, { ...defaultFilters, search: 'bluetooth' });
    expect(results.length).toBeGreaterThanOrEqual(1);
    expect(results.some((p) => p.tags.includes('bluetooth'))).toBe(true);
  });

  it('should filter by price range', () => {
    const results = filterProducts(PRODUCTS, {
      ...defaultFilters,
      minPrice: 1000,
      maxPrice: 3000,
    });
    expect(results.length).toBeGreaterThan(0);
    expect(results.every((p) => p.price >= 1000 && p.price <= 3000)).toBe(true);
  });

  it('should filter by minimum rating', () => {
    const results = filterProducts(PRODUCTS, {
      ...defaultFilters,
      minRating: 4.8,
    });
    expect(results.length).toBeGreaterThan(0);
    expect(results.every((p) => p.rating >= 4.8)).toBe(true);
  });

  it('should filter in-stock only items', () => {
    const results = filterProducts(PRODUCTS, {
      ...defaultFilters,
      inStockOnly: true,
    });
    expect(results.every((p) => p.stock > 0)).toBe(true);
  });

  it('should combine multiple filters simultaneously', () => {
    const results = filterProducts(PRODUCTS, {
      ...defaultFilters,
      category: 'fashion',
      minPrice: 2000,
      maxPrice: 5000,
      minRating: 4.5,
      inStockOnly: true,
    });

    expect(results.length).toBeGreaterThan(0);
    expect(
      results.every(
        (p) =>
          p.categoryId === 'fashion' &&
          p.price >= 2000 &&
          p.price <= 5000 &&
          p.rating >= 4.5 &&
          p.stock > 0
      )
    ).toBe(true);
  });
});

describe('sortProducts', () => {
  it('should sort price low to high', () => {
    const sorted = sortProducts(PRODUCTS, 'price-asc');
    for (let i = 0; i < sorted.length - 1; i++) {
      expect(sorted[i].price).toBeLessThanOrEqual(sorted[i + 1].price);
    }
  });

  it('should sort price high to low', () => {
    const sorted = sortProducts(PRODUCTS, 'price-desc');
    for (let i = 0; i < sorted.length - 1; i++) {
      expect(sorted[i].price).toBeGreaterThanOrEqual(sorted[i + 1].price);
    }
  });

  it('should sort highest rated first', () => {
    const sorted = sortProducts(PRODUCTS, 'rating-desc');
    for (let i = 0; i < sorted.length - 1; i++) {
      expect(sorted[i].rating).toBeGreaterThanOrEqual(sorted[i + 1].rating);
    }
  });

  it('should sort name alphabetically A-Z', () => {
    const sorted = sortProducts(PRODUCTS, 'name-asc');
    for (let i = 0; i < sorted.length - 1; i++) {
      expect(sorted[i].name.localeCompare(sorted[i + 1].name)).toBeLessThanOrEqual(0);
    }
  });
});
