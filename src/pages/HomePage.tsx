import React from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowRight,
  Sparkles,
  ShoppingBag,
  Zap,
  ShieldCheck,
  Tag,
  Compass,
  CheckCircle2,
} from 'lucide-react';
import { PRODUCTS } from '../data/products';
import { CATEGORIES } from '../data/categories';
import { ProductCard } from '../components/catalogue/ProductCard';
import { CategoryCard } from '../components/catalogue/CategoryCard';
import { ImageWithFallback } from '../components/common/ImageWithFallback';

export const HomePage: React.FC = () => {
  // Curated product slices
  const featuredProducts = PRODUCTS.filter((p) => p.badge === 'Featured').slice(0, 4);
  const bestsellers = PRODUCTS.filter((p) => p.badge === 'Bestseller').slice(0, 4);
  const newArrivals = PRODUCTS.filter((p) => p.badge === 'New').slice(0, 4);

  return (
    <div className="space-y-16 sm:space-y-24 pb-16">
      {/* 1. Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-slate-900 via-[#14213D] to-slate-950 text-white pt-12 pb-20 sm:pt-20 sm:pb-28">
        {/* Subtle decorative glowing background shapes */}
        <div className="absolute top-1/4 -left-20 w-96 h-96 bg-violet-600/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-10 -right-20 w-96 h-96 bg-teal-500/15 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Hero Content */}
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-violet-500/20 border border-violet-400/30 text-violet-300 text-xs font-bold uppercase tracking-wider">
                <Sparkles size={14} className="text-amber-400" />
                <span>The 2026 Curated E-Commerce Showcase</span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white leading-[1.1]">
                Discover Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 via-teal-300 to-amber-300">Everyday</span> Essentials
              </h1>

              <p className="text-base sm:text-lg text-slate-300 max-w-2xl mx-auto lg:mx-0 leading-relaxed font-normal">
                Explore an intentionally designed product catalogue with 60 distinct items across 8 categories. Fast multi-parameter filtering, instant search, persistent wishlist, and simulated checkout.
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3.5 pt-2">
                <Link
                  to="/catalogue"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl bg-violet-600 hover:bg-violet-700 text-white font-bold text-sm shadow-lg shadow-violet-600/30 transition-all hover:scale-102"
                >
                  <ShoppingBag size={18} />
                  <span>Shop Collection</span>
                  <ArrowRight size={16} />
                </Link>

                <Link
                  to="/about"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-slate-800/80 hover:bg-slate-800 text-slate-200 font-semibold text-sm border border-slate-700 hover:border-slate-600 transition-all"
                >
                  <Compass size={18} />
                  <span>Explore Architecture</span>
                </Link>
              </div>

              {/* Key Highlights row */}
              <div className="grid grid-cols-3 gap-4 pt-6 border-t border-slate-800/80 text-left">
                <div>
                  <div className="text-2xl font-black text-white">60+</div>
                  <div className="text-xs text-slate-400 font-medium">Distinct Products</div>
                </div>
                <div>
                  <div className="text-2xl font-black text-teal-400">8</div>
                  <div className="text-xs text-slate-400 font-medium">Curated Niches</div>
                </div>
                <div>
                  <div className="text-2xl font-black text-amber-400">100%</div>
                  <div className="text-xs text-slate-400 font-medium">Client-Side Demo</div>
                </div>
              </div>
            </div>

            {/* Right Hero Product Feature */}
            <div className="lg:col-span-5 relative">
              <div className="relative mx-auto max-w-sm sm:max-w-md rounded-3xl p-3 bg-gradient-to-b from-white/15 to-white/5 border border-white/10 shadow-2xl backdrop-blur-md">
                <div className="rounded-2xl overflow-hidden aspect-[4/3] bg-slate-800 relative">
                  <ImageWithFallback
                    src="/images/hero.jpg"
                    alt="PrismCart curated modern lifestyle storefront display"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent flex items-end p-5">
                    <div>
                      <span className="px-2 py-0.5 rounded text-[11px] font-bold bg-amber-400 text-slate-950 inline-block mb-1">
                        DEMO SHOWCASE
                      </span>
                      <h3 className="text-white font-bold text-lg">
                        PrismCart Lifestyle Store
                      </h3>
                      <p className="text-xs text-slate-300">
                        Zero server dependencies • Fully responsive
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Categories Grid (All 8 Categories) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
          <div>
            <div className="text-xs font-bold uppercase tracking-wider text-violet-700 mb-1">
              Organized Discovery
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              Explore by Category
            </h2>
          </div>
          <Link
            to="/catalogue"
            className="inline-flex items-center gap-1.5 text-sm font-bold text-violet-700 hover:text-violet-900 hover:underline"
          >
            <span>View All Categories</span>
            <ArrowRight size={16} />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {CATEGORIES.map((category) => (
            <CategoryCard key={category.id} category={category} />
          ))}
        </div>
      </section>

      {/* 3. Featured Products Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
          <div>
            <div className="text-xs font-bold uppercase tracking-wider text-violet-700 mb-1">
              Hand-Selected
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              Featured Products
            </h2>
          </div>
          <Link
            to="/catalogue?sort=featured"
            className="inline-flex items-center gap-1.5 text-sm font-bold text-violet-700 hover:text-violet-900 hover:underline"
          >
            <span>See more featured</span>
            <ArrowRight size={16} />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* 4. Promotional Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-violet-900 via-indigo-900 to-slate-900 text-white p-8 sm:p-12 shadow-xl border border-violet-800/40">
          <div className="relative z-10 max-w-2xl space-y-4">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-400 text-slate-950 font-bold text-xs">
              <Tag size={12} />
              Presentation Demo Coupon
            </span>

            <h3 className="text-2xl sm:text-4xl font-black tracking-tight text-white">
              Enjoy 10% Off Your Demo Basket
            </h3>

            <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
              Use code <strong className="text-amber-300 font-mono tracking-wider bg-white/10 px-2 py-0.5 rounded">WELCOME10</strong> in the cart to test our coupon validation engine. Automatically applies a 10% discount capped at ₹500.
            </p>

            <div className="pt-2 flex flex-wrap items-center gap-4">
              <Link
                to="/catalogue"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white text-slate-900 hover:bg-slate-100 font-bold text-sm shadow-md transition-colors"
              >
                <span>Try It in Catalogue</span>
                <ArrowRight size={16} />
              </Link>
              <span className="text-xs text-slate-400 flex items-center gap-1.5">
                <CheckCircle2 size={15} className="text-emerald-400" />
                Validated real-time with zero backend calls
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Bestsellers & New Arrivals Tabs/Sections */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
          <div>
            <div className="text-xs font-bold uppercase tracking-wider text-amber-600 mb-1">
              Top Performers
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              Customer Bestsellers
            </h2>
          </div>
          <Link
            to="/catalogue"
            className="inline-flex items-center gap-1.5 text-sm font-bold text-violet-700 hover:text-violet-900 hover:underline"
          >
            <span>View all bestsellers</span>
            <ArrowRight size={16} />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {bestsellers.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* 6. New Arrivals */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
          <div>
            <div className="text-xs font-bold uppercase tracking-wider text-teal-600 mb-1">
              Fresh Inventory
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              New Arrivals
            </h2>
          </div>
          <Link
            to="/catalogue"
            className="inline-flex items-center gap-1.5 text-sm font-bold text-violet-700 hover:text-violet-900 hover:underline"
          >
            <span>Explore all new items</span>
            <ArrowRight size={16} />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {newArrivals.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* 7. Why PrismCart Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="text-xs font-bold uppercase tracking-wider text-violet-700 mb-2">
            Engineered For Excellence
          </div>
          <h2 className="text-3xl font-black text-slate-900 tracking-tight mb-3">
            Why PrismCart?
          </h2>
          <p className="text-sm text-slate-600">
            A comprehensive frontend architecture demonstrating state persistence, accessible navigation, and multi-faceted product discovery.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="p-6 rounded-2xl bg-white border border-slate-200/90 shadow-xs space-y-3">
            <div className="w-12 h-12 rounded-xl bg-violet-50 text-violet-700 flex items-center justify-center font-bold">
              <Zap size={24} />
            </div>
            <h3 className="text-lg font-bold text-slate-900">Instant Client-Side Filtering</h3>
            <p className="text-sm text-slate-600 leading-relaxed">
              Query 60 items across name, category, brand, and tags in milliseconds. Synchronized with browser URL parameters for shareable views.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white border border-slate-200/90 shadow-xs space-y-3">
            <div className="w-12 h-12 rounded-xl bg-teal-50 text-teal-700 flex items-center justify-center font-bold">
              <ShieldCheck size={24} />
            </div>
            <h3 className="text-lg font-bold text-slate-900">Deterministic Calculations</h3>
            <p className="text-sm text-slate-600 leading-relaxed">
              Monetary values computed using integer paise logic. Free shipping thresholds, discount caps, and stock limits stay strictly consistent.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white border border-slate-200/90 shadow-xs space-y-3">
            <div className="w-12 h-12 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center font-bold">
              <Sparkles size={24} />
            </div>
            <h3 className="text-lg font-bold text-slate-900">Presentation Ready & Offline</h3>
            <p className="text-sm text-slate-600 leading-relaxed">
              All 60 authentic product photos and data structures reside directly inside the local build. No third-party network outages during judging.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};
