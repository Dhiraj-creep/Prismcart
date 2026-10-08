export type CategoryId =
  | 'electronics'
  | 'fashion'
  | 'footwear'
  | 'home-living'
  | 'beauty-personal-care'
  | 'sports-fitness'
  | 'books-stationery'
  | 'accessories';

export type ProductBadge = 'Bestseller' | 'Featured' | 'New' | null;

export interface ProductSpecification {
  [key: string]: string;
}

export interface Product {
  id: string;
  slug: string;
  name: string;
  brand: string;
  category: string;
  categoryId: CategoryId;
  price: number; // in INR
  originalPrice?: number; // in INR
  rating: number; // 1.0 - 5.0
  reviewCount: number;
  shortDescription: string;
  detailedDescription: string;
  specifications: ProductSpecification;
  stock: number;
  image: string;
  additionalImages?: string[];
  alt: string;
  tags: string[];
  badge: ProductBadge;
}

export interface Category {
  id: CategoryId;
  name: string;
  slug: string;
  description: string;
  accentColor: string; // Tailwind color class or hex
  accentBg: string;
  accentBorder: string;
  iconName: string;
  productCount: number;
  featuredImage: string;
}
