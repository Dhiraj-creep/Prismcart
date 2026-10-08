import { Category } from '../types/product';

export const CATEGORIES: Category[] = [
  {
    id: 'electronics',
    name: 'Electronics',
    slug: 'electronics',
    description: 'High-performance audio, smart wearables, monitors, and productivity gear.',
    accentColor: '#2563EB', // Blue
    accentBg: 'bg-blue-50 text-blue-700 border-blue-200',
    accentBorder: 'border-blue-500',
    iconName: 'Tv',
    productCount: 8,
    featuredImage: '/images/products/sonic-shield-anc-headphones.jpg',
  },
  {
    id: 'fashion',
    name: 'Fashion',
    slug: 'fashion',
    description: 'Contemporary apparel, tailored blazers, seasonal knitwear, and classic denim.',
    accentColor: '#E11D48', // Rose/Coral
    accentBg: 'bg-rose-50 text-rose-700 border-rose-200',
    accentBorder: 'border-rose-500',
    iconName: 'Shirt',
    productCount: 8,
    featuredImage: '/images/products/tailored-linen-blazer.jpg',
  },
  {
    id: 'footwear',
    name: 'Footwear',
    slug: 'footwear',
    description: 'Engineered running shoes, classic leather brogues, and trail-ready boots.',
    accentColor: '#EA580C', // Amber-Orange
    accentBg: 'bg-orange-50 text-orange-700 border-orange-200',
    accentBorder: 'border-orange-500',
    iconName: 'Footprints',
    productCount: 8,
    featuredImage: '/images/products/pro-cushion-running-shoes.jpg',
  },
  {
    id: 'home-living',
    name: 'Home & Living',
    slug: 'home-living',
    description: 'Artisanal homeware, mood lighting, ceramic essentials, and organic textiles.',
    accentColor: '#059669', // Emerald
    accentBg: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    accentBorder: 'border-emerald-500',
    iconName: 'Home',
    productCount: 8,
    featuredImage: '/images/products/ceramic-pour-over-carafe.jpg',
  },
  {
    id: 'beauty-personal-care',
    name: 'Beauty & Personal Care',
    slug: 'beauty-personal-care',
    description: 'Dermatologist-tested skincare, nourishing hair elixirs, and sonic grooming.',
    accentColor: '#9333EA', // Violet/Purple
    accentBg: 'bg-purple-50 text-purple-700 border-purple-200',
    accentBorder: 'border-purple-500',
    iconName: 'Sparkles',
    productCount: 7,
    featuredImage: '/images/products/vitamin-c-glow-serum.jpg',
  },
  {
    id: 'sports-fitness',
    name: 'Sports & Fitness',
    slug: 'sports-fitness',
    description: 'Gym equipment, high-density yoga gear, hydration bottles, and smart trackers.',
    accentColor: '#0284C7', // Sky
    accentBg: 'bg-sky-50 text-sky-700 border-sky-200',
    accentBorder: 'border-sky-500',
    iconName: 'Dumbbell',
    productCount: 7,
    featuredImage: '/images/products/pro-grip-alignment-yoga-mat.jpg',
  },
  {
    id: 'books-stationery',
    name: 'Books & Stationery',
    slug: 'books-stationery',
    description: 'Archival journals, precision drafting pens, ergonomic stands, and desk organization.',
    accentColor: '#4F46E5', // Indigo
    accentBg: 'bg-indigo-50 text-indigo-700 border-indigo-200',
    accentBorder: 'border-indigo-500',
    iconName: 'BookOpen',
    productCount: 7,
    featuredImage: '/images/products/hardbound-dot-grid-bullet-journal.jpg',
  },
  {
    id: 'accessories',
    name: 'Accessories',
    slug: 'accessories',
    description: 'Handcrafted leather goods, polarized eyewear, chronograph watches, and tech organizers.',
    accentColor: '#D97706', // Amber
    accentBg: 'bg-amber-50 text-amber-700 border-amber-200',
    accentBorder: 'border-amber-500',
    iconName: 'Watch',
    productCount: 7,
    featuredImage: '/images/products/top-grain-leather-bifold-wallet.jpg',
  },
];
