import { CategoryId } from './product';

export type SortOption =
  | 'featured'
  | 'price-asc'
  | 'price-desc'
  | 'rating-desc'
  | 'name-asc';

export interface FilterState {
  search: string;
  category: CategoryId | 'all';
  minPrice: number;
  maxPrice: number;
  minRating: number;
  inStockOnly: boolean;
  sortBy: SortOption;
  page: number;
}
