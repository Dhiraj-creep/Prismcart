import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, RotateCcw, ShieldCheck, Truck, RefreshCw, Headphones } from 'lucide-react';
import { CATEGORIES } from '../../data/categories';
import { ResetDemoModal } from './ResetDemoModal';

export const Footer: React.FC = () => {
  const [isResetModalOpen, setIsResetModalOpen] = useState(false);

  return (
    <>
      {/* Service Highlights Strip */}
      <section className="bg-white border-t border-slate-200 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="flex items-center gap-3.5">
              <div className="w-12 h-12 rounded-xl bg-violet-50 text-violet-700 flex items-center justify-center shrink-0">
                <Truck size={24} />
              </div>
              <div>
                <h4 className="text-sm font-bold text-slate-900">Free Fast Delivery</h4>
                <p className="text-xs text-slate-500">On all orders over ₹999</p>
              </div>
            </div>

            <div className="flex items-center gap-3.5">
              <div className="w-12 h-12 rounded-xl bg-teal-50 text-teal-700 flex items-center justify-center shrink-0">
                <ShieldCheck size={24} />
              </div>
              <div>
                <h4 className="text-sm font-bold text-slate-900">Demo Order Flow</h4>
                <p className="text-xs text-slate-500">100% offline-safe checkout</p>
              </div>
            </div>

            <div className="flex items-center gap-3.5">
              <div className="w-12 h-12 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center shrink-0">
                <RefreshCw size={24} />
              </div>
              <div>
                <h4 className="text-sm font-bold text-slate-900">State Persistence</h4>
                <p className="text-xs text-slate-500">localStorage sync & reset</p>
              </div>
            </div>

            <div className="flex items-center gap-3.5">
              <div className="w-12 h-12 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center shrink-0">
                <Headphones size={24} />
              </div>
              <div>
                <h4 className="text-sm font-bold text-slate-900">60 Curated Items</h4>
                <p className="text-xs text-slate-500">8 distinct product niches</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Dark Navy Footer */}
      <footer className="bg-[#14213D] text-slate-300 pt-12 pb-8 border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 pb-10 border-b border-slate-800">
            {/* Brand column */}
            <div className="lg:col-span-2 space-y-4">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-violet-600 to-teal-400 flex items-center justify-center text-white shadow-md">
                  <Sparkles size={20} />
                </div>
                <span className="text-2xl font-black tracking-tight text-white">
                  Prism<span className="text-violet-400">Cart</span>
                </span>
              </div>
              <p className="text-sm text-slate-400 max-w-sm leading-relaxed">
                PrismCart is a comprehensive, presentation-ready e-commerce product catalogue built for intuitive multi-category product discovery, filtering, and simulated checkout.
              </p>
              <div className="flex items-center gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setIsResetModalOpen(true)}
                  className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-amber-300 border border-slate-700 transition-colors cursor-pointer"
                >
                  <RotateCcw size={14} />
                  Reset Demo Data
                </button>
              </div>
            </div>

            {/* Catalogue Categories Column */}
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-4">
                Categories
              </h4>
              <ul className="space-y-2 text-sm">
                {CATEGORIES.slice(0, 4).map((cat) => (
                  <li key={cat.id}>
                    <Link
                      to={`/catalogue?category=${cat.id}`}
                      className="hover:text-white transition-colors"
                    >
                      {cat.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* More Categories Column */}
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-4">
                More Categories
              </h4>
              <ul className="space-y-2 text-sm">
                {CATEGORIES.slice(4).map((cat) => (
                  <li key={cat.id}>
                    <Link
                      to={`/catalogue?category=${cat.id}`}
                      className="hover:text-white transition-colors"
                    >
                      {cat.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Quick Links Column */}
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-4">
                Quick Navigation
              </h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link to="/catalogue" className="hover:text-white transition-colors">
                    Explore All 60 Products
                  </Link>
                </li>
                <li>
                  <Link to="/wishlist" className="hover:text-white transition-colors">
                    My Wishlist
                  </Link>
                </li>
                <li>
                  <Link to="/cart" className="hover:text-white transition-colors">
                    Shopping Cart
                  </Link>
                </li>
                <li>
                  <Link to="/about" className="hover:text-white transition-colors">
                    About Project & Tech
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
            <p>
              PrismCart &copy; 2026. Academic frontend demonstration. No actual payments or order transmission.
            </p>
            <div className="flex items-center gap-1">
              <span>Engineered with React 19, TypeScript & Tailwind CSS</span>
            </div>
          </div>
        </div>
      </footer>

      {/* Reset Modal */}
      <ResetDemoModal
        isOpen={isResetModalOpen}
        onClose={() => setIsResetModalOpen(false)}
      />
    </>
  );
};
