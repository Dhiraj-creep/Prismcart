import { Product } from '../types/product';
import { FilterState } from '../types/filter';

export function filterProducts(products: Product[], filters: FilterState): Product[] {
  const searchTerm = filters.search.trim().toLowerCase();

  return products.filter((product) => {
    // 1. Search filter: across name, category, brand, and tags
    if (searchTerm) {
      const matchName = product.name.toLowerCase().includes(searchTerm);
      const matchBrand = product.brand.toLowerCase().includes(searchTerm);
      const matchCategory = product.category.toLowerCase().includes(searchTerm);
      const matchTags = product.tags.some((tag) => tag.toLowerCase().includes(searchTerm));

      if (!matchName && !matchBrand && !matchCategory && !matchTags) {
        return false;
      }
    }

    // 2. Category filter
    if (filters.category && filters.category !== 'all') {
      if (product.categoryId !== filters.category) {
        return false;
      }
    }

    // 3. Price range filter
    if (typeof filters.minPrice === 'number' && product.price < filters.minPrice) {
      return false;
    }
    if (typeof filters.maxPrice === 'number' && product.price > filters.maxPrice) {
      return false;
    }

    // 4. Minimum rating filter
    if (typeof filters.minRating === 'number' && filters.minRating > 0) {
      if (product.rating < filters.minRating) {
        return false;
      }
    }

    // 5. In-stock-only filter
    if (filters.inStockOnly && product.stock <= 0) {
      return false;
    }

    return true;
  });
}

export function sortProducts(products: Product[], sortBy: FilterState['sortBy']): Product[] {
  const list = [...products];

  switch (sortBy) {
    case 'price-asc':
      return list.sort((a, b) => a.price - b.price);

    case 'price-desc':
      return list.sort((a, b) => b.price - a.price);

    case 'rating-desc':
      return list.sort((a, b) => {
        if (b.rating !== a.rating) {
          return b.rating - a.rating;
        }
        return b.reviewCount - a.reviewCount;
      });

    case 'name-asc':
      return list.sort((a, b) => a.name.localeCompare(b.name));

    case 'featured':
    default:
      // Featured / Bestseller priority, then rating
      return list.sort((a, b) => {
        const score = (p: Product) => {
          if (p.badge === 'Featured') return 3;
          if (p.badge === 'Bestseller') return 2;
          if (p.badge === 'New') return 1;
          return 0;
        };
        const scoreDiff = score(b) - score(a);
        if (scoreDiff !== 0) return scoreDiff;
        return b.rating - a.rating;
      });
  }
}
