import React from 'react';
import { Link } from 'react-router-dom';
import {
  Tv,
  Shirt,
  Footprints,
  Home,
  Sparkles,
  Dumbbell,
  BookOpen,
  Watch,
  ArrowRight,
} from 'lucide-react';
import { Category } from '../../types/product';
import { ImageWithFallback } from '../common/ImageWithFallback';

interface CategoryCardProps {
  category: Category;
}

const iconMap: Record<string, React.ReactNode> = {
  electronics: <Tv size={22} />,
  fashion: <Shirt size={22} />,
  footwear: <Footprints size={22} />,
  'home-living': <Home size={22} />,
  'beauty-personal-care': <Sparkles size={22} />,
  'sports-fitness': <Dumbbell size={22} />,
  'books-stationery': <BookOpen size={22} />,
  accessories: <Watch size={22} />,
};

export const CategoryCard: React.FC<CategoryCardProps> = ({ category }) => {
  return (
    <Link
      to={`/catalogue?category=${category.id}`}
      className="group relative flex flex-col justify-between overflow-hidden rounded-2xl bg-white border border-slate-200/80 p-5 shadow-xs hover:shadow-xl hover:border-slate-300 transition-all duration-300"
    >
      {/* Category accent background glow */}
      <div
        className="absolute top-0 right-0 w-32 h-32 rounded-full opacity-10 blur-2xl transition-opacity group-hover:opacity-25 pointer-events-none"
        style={{ backgroundColor: category.accentColor }}
      />

      <div className="relative z-10 flex items-start justify-between gap-4 mb-4">
        {/* Category Icon */}
        <div
          className={`w-12 h-12 rounded-xl flex items-center justify-center border shadow-xs transition-transform group-hover:scale-110 duration-200 ${category.accentBg}`}
        >
          {iconMap[category.id] || <Sparkles size={22} />}
        </div>

        {/* Small thumbnail preview */}
        <div className="w-14 h-14 rounded-xl overflow-hidden border border-slate-200 shrink-0 bg-slate-100 shadow-xs">
          <ImageWithFallback
            src={category.featuredImage}
            alt={category.name}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
          />
        </div>
      </div>

      <div className="relative z-10">
        <div className="flex items-center justify-between mb-1">
          <h3 className="text-base font-bold text-slate-900 group-hover:text-violet-700 transition-colors">
            {category.name}
          </h3>
          <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-slate-100 text-slate-600">
            {category.productCount} items
          </span>
        </div>

        <p className="text-xs text-slate-500 line-clamp-2 mb-3 leading-relaxed">
          {category.description}
        </p>

        <div className="flex items-center gap-1.5 text-xs font-bold text-violet-700 group-hover:translate-x-1 transition-transform">
          <span>Explore Collection</span>
          <ArrowRight size={14} />
        </div>
      </div>
    </Link>
  );
};
