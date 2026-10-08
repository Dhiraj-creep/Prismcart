import React from 'react';
import { Link } from 'react-router-dom';
import {
  Database,
  Search,
  SlidersHorizontal,
  ShieldCheck,
  Sparkles,
  Layers,
  ArrowRight,
} from 'lucide-react';
import { Breadcrumbs } from '../components/common/Breadcrumbs';

export const AboutPage: React.FC = () => {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12">
      <Breadcrumbs items={[{ label: 'About Project' }]} />

      {/* Hero Header */}
      <div className="space-y-4">
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-violet-50 text-violet-700 border border-violet-200">
          <Sparkles size={14} />
          Academic College Demonstration Project
        </span>
        <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
          About PrismCart — Architecture & Problem Statement
        </h1>
        <p className="text-base text-slate-600 max-w-3xl leading-relaxed">
          PrismCart is a fully implemented, presentation-ready e-commerce product catalogue built to solve the modern challenge of multi-dimensional product discovery.
        </p>
      </div>

      {/* 1. Problem Statement */}
      <section className="bg-white rounded-3xl border border-slate-200/90 shadow-2xs p-6 sm:p-8 space-y-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-violet-100 text-violet-700 flex items-center justify-center font-bold">
            01
          </div>
          <h2 className="text-xl font-bold text-slate-900">Problem Statement</h2>
        </div>
        <blockquote className="border-l-4 border-violet-600 pl-4 py-1 italic text-slate-700 font-medium text-base">
          “E-Commerce Product Catalogue with Categories — Create an attractive, responsive product catalogue that helps users discover products through categories, search, filters, sorting, and detailed product pages. Include a wishlist and shopping cart to demonstrate a complete browsing-to-checkout journey.”
        </blockquote>
        <p className="text-sm text-slate-600 leading-relaxed">
          Online shoppers frequently abandon storefronts when navigation is cumbersome, filters are sluggish, or search fails to query attributes like brands, tags, and category taxonomies. PrismCart addresses this through a synchronous, client-side indexing model that keeps search, category narrowing, price sliders, rating thresholds, and sorting in strict harmony.
        </p>
      </section>

      {/* 2. How Discovery Is Improved */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-3xl border border-slate-200/90 shadow-2xs p-6 space-y-3">
          <div className="w-10 h-10 rounded-xl bg-teal-50 text-teal-700 flex items-center justify-center">
            <Search size={20} />
          </div>
          <h3 className="text-base font-bold text-slate-900">Multi-Field Search</h3>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            Search evaluates product names, brand identifiers, category labels, and descriptive hashtags. Entering queries like “wireless”, “denim”, “coffee”, or “camera” instantly extracts matching products.
          </p>
        </div>

        <div className="bg-white rounded-3xl border border-slate-200/90 shadow-2xs p-6 space-y-3">
          <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center">
            <SlidersHorizontal size={20} />
          </div>
          <h3 className="text-base font-bold text-slate-900">Compound Faceted Filtering</h3>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            Users can simultaneously restrict categories, set custom min/max price boundaries, isolate 4.5+ star rated products, and filter for in-stock inventory. Active filter chips allow single-click removals.
          </p>
        </div>

        <div className="bg-white rounded-3xl border border-slate-200/90 shadow-2xs p-6 space-y-3">
          <div className="w-10 h-10 rounded-xl bg-rose-50 text-rose-700 flex items-center justify-center">
            <Layers size={20} />
          </div>
          <h3 className="text-base font-bold text-slate-900">URL Query Persistence</h3>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            Filter and pagination parameters sync with browser URL search params (<code className="text-xs bg-slate-100 px-1 py-0.5 rounded text-violet-700">?category=electronics&minPrice=1000&sort=price-asc</code>), ensuring bookmarks and browser back/forward navigation work seamlessly.
          </p>
        </div>

        <div className="bg-white rounded-3xl border border-slate-200/90 shadow-2xs p-6 space-y-3">
          <div className="w-10 h-10 rounded-xl bg-violet-50 text-violet-700 flex items-center justify-center">
            <Database size={20} />
          </div>
          <h3 className="text-base font-bold text-slate-900">State Persistence & Hygiene</h3>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            Shopping cart, wishlist bookmarks, and simulated orders persist in localStorage. Totals are always dynamically recalculated from active catalog prices rather than trusted blindly from storage.
          </p>
        </div>
      </section>

      {/* 3. Technology Stack */}
      <section className="bg-white rounded-3xl border border-slate-200/90 shadow-2xs p-6 sm:p-8 space-y-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-violet-100 text-violet-700 flex items-center justify-center font-bold">
            02
          </div>
          <h2 className="text-xl font-bold text-slate-900">Technology Stack</h2>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
            <span className="text-xs font-bold text-violet-700 uppercase">Frontend Framework</span>
            <h4 className="text-sm font-bold text-slate-900">React 19</h4>
            <p className="text-xs text-slate-500">Component architecture</p>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
            <span className="text-xs font-bold text-violet-700 uppercase">Build Tool</span>
            <h4 className="text-sm font-bold text-slate-900">Vite 8</h4>
            <p className="text-xs text-slate-500">Sub-second HMR & bundler</p>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
            <span className="text-xs font-bold text-violet-700 uppercase">Type Safety</span>
            <h4 className="text-sm font-bold text-slate-900">TypeScript 5+</h4>
            <p className="text-xs text-slate-500">Strict compile checks</p>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
            <span className="text-xs font-bold text-violet-700 uppercase">Styling Engine</span>
            <h4 className="text-sm font-bold text-slate-900">Tailwind CSS v4</h4>
            <p className="text-xs text-slate-500">Design tokens & utilities</p>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
            <span className="text-xs font-bold text-violet-700 uppercase">Client Routing</span>
            <h4 className="text-sm font-bold text-slate-900">React Router 7</h4>
            <p className="text-xs text-slate-500">Declarative SPA navigation</p>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
            <span className="text-xs font-bold text-violet-700 uppercase">Iconography</span>
            <h4 className="text-sm font-bold text-slate-900">Lucide React</h4>
            <p className="text-xs text-slate-500">Accessible SVG icons</p>
          </div>
        </div>
      </section>

      {/* 4. Demonstration Disclaimer */}
      <section className="bg-amber-50 rounded-3xl border border-amber-200/90 p-6 sm:p-8 space-y-4">
        <div className="flex items-center gap-2.5 text-amber-900">
          <ShieldCheck size={24} className="text-amber-700 shrink-0" />
          <h2 className="text-lg font-bold">Presentation Demonstration Disclaimer</h2>
        </div>
        <p className="text-xs sm:text-sm text-amber-950 leading-relaxed">
          All product names, prices in INR, reviews, customer ratings, coupon codes, and shipping rules depicted within PrismCart are strictly simulated data created for this academic exhibition. The checkout process does not collect banking card details or transmit orders to external fulfillment providers. The entire application operates completely offline without paid cloud services.
        </p>
      </section>

      {/* CTA */}
      <div className="text-center pt-4">
        <Link
          to="/catalogue"
          className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl bg-violet-700 hover:bg-violet-800 text-white font-bold text-sm shadow-md transition-all"
        >
          <span>Explore 60 Curated Products</span>
          <ArrowRight size={16} />
        </Link>
      </div>
    </div>
  );
};
