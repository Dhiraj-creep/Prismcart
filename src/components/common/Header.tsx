import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import {
  Search,
  Heart,
  ShoppingBag,
  Menu,
  X,
  RotateCcw,
  Sparkles,
  ChevronDown,
  Tv,
  Shirt,
  Footprints,
  Home as HomeIcon,
  BookOpen,
  Watch,
  Dumbbell,
  Tag,
} from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { useWishlist } from '../../context/WishlistContext';
import { CATEGORIES } from '../../data/categories';
import { formatINR } from '../../utils/currency';
import { ResetDemoModal } from './ResetDemoModal';
import { api } from '../../services/api';

const categoryIcons: Record<string, React.ReactNode> = {
  electronics: <Tv size={16} />,
  fashion: <Shirt size={16} />,
  footwear: <Footprints size={16} />,
  'home-living': <HomeIcon size={16} />,
  'beauty-personal-care': <Sparkles size={16} />,
  'sports-fitness': <Dumbbell size={16} />,
  'books-stationery': <BookOpen size={16} />,
  accessories: <Watch size={16} />,
};

export const Header: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { summary } = useCart();
  const { count: wishlistCount } = useWishlist();

  const [searchQuery, setSearchQuery] = useState('');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isCategoriesDropdownOpen, setIsCategoriesDropdownOpen] = useState(false);
  const [isResetModalOpen, setIsResetModalOpen] = useState(false);
  const [isBackendLive, setIsBackendLive] = useState<boolean | null>(null);

  useEffect(() => {
    api.checkHealth().then((live) => setIsBackendLive(live));
    const interval = setInterval(() => {
      api.checkHealth().then((live) => setIsBackendLive(live));
    }, 15000);
    return () => clearInterval(interval);
  }, []);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/catalogue?search=${encodeURIComponent(searchQuery.trim())}`);
      setIsMobileMenuOpen(false);
    } else {
      navigate('/catalogue');
    }
  };

  const isLinkActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <>
      {/* Announcement Strip */}
      <aside aria-label="Announcement" className="bg-[#14213D] text-slate-200 text-xs py-2 px-4 border-b border-slate-800">
        <div className="max-w-7xl mx-auto flex items-center justify-between flex-wrap gap-2 text-center">
          <div className="flex items-center gap-2 mx-auto sm:mx-0">
            <span className="inline-flex items-center gap-1 font-semibold px-2 py-0.5 rounded bg-violet-600/30 text-violet-300 border border-violet-500/30">
              <Tag size={12} /> DEMO OFFER
            </span>
            <span>
              Use coupon <strong className="text-amber-300 tracking-wider">WELCOME10</strong> for 10% off (up to ₹500)
            </span>
            <span className="hidden md:inline text-slate-400">• Free shipping on orders ₹999+</span>
          </div>

          <div className="hidden sm:flex items-center gap-3 text-slate-300 text-xs">
            {isBackendLive === true && (
              <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[11px] font-semibold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                Live Spring Boot API (:8088)
              </span>
            )}
            {isBackendLive === false && (
              <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[11px] font-semibold bg-slate-700/60 text-slate-300 border border-slate-600/50">
                <span className="w-1.5 h-1.5 rounded-full bg-violet-400" />
                Offline Demo Ready
              </span>
            )}
            <button
              type="button"
              onClick={() => setIsResetModalOpen(true)}
              className="inline-flex items-center gap-1 text-slate-300 hover:text-white transition-colors cursor-pointer"
              title="Reset Demo State"
            >
              <RotateCcw size={12} />
              Reset Demo
            </button>
          </div>
        </div>
      </aside>

      {/* Main Header */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20 gap-4">
            {/* Logo */}
            <Link
              to="/"
              className="flex items-center gap-2.5 focus:outline-hidden focus:ring-2 focus:ring-violet-500 rounded-lg shrink-0"
            >
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-violet-700 via-indigo-600 to-teal-500 flex items-center justify-center text-white shadow-md shadow-violet-500/20">
                <Sparkles size={22} className="text-white" />
              </div>
              <div className="flex flex-col">
                <span className="text-2xl font-black tracking-tight text-[#14213D] leading-none">
                  Prism<span className="text-violet-700">Cart</span>
                </span>
                <span className="text-[10px] uppercase font-bold tracking-widest text-slate-600 mt-1">
                  Discover Your Everyday
                </span>
              </div>
            </Link>

            {/* Desktop Navigation Links */}
            <nav className="hidden lg:flex items-center gap-1 text-sm font-semibold text-slate-700">
              <Link
                to="/"
                className={`px-3 py-2 rounded-lg transition-colors ${
                  isLinkActive('/') ? 'text-violet-700 bg-violet-50' : 'hover:text-slate-900 hover:bg-slate-50'
                }`}
              >
                Home
              </Link>

              <Link
                to="/catalogue"
                className={`px-3 py-2 rounded-lg transition-colors ${
                  isLinkActive('/catalogue') ? 'text-violet-700 bg-violet-50' : 'hover:text-slate-900 hover:bg-slate-50'
                }`}
              >
                All Products
              </Link>

              {/* Categories Dropdown */}
              <div
                className="relative"
                onMouseEnter={() => setIsCategoriesDropdownOpen(true)}
                onMouseLeave={() => setIsCategoriesDropdownOpen(false)}
              >
                <button
                  type="button"
                  onClick={() => setIsCategoriesDropdownOpen(!isCategoriesDropdownOpen)}
                  aria-expanded={isCategoriesDropdownOpen}
                  className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg hover:text-slate-900 hover:bg-slate-50 transition-colors cursor-pointer"
                >
                  Categories
                  <ChevronDown
                    size={14}
                    className={`transition-transform duration-200 ${
                      isCategoriesDropdownOpen ? 'rotate-180 text-violet-700' : 'text-slate-400'
                    }`}
                  />
                </button>

                {isCategoriesDropdownOpen && (
                  <div className="absolute top-full left-0 w-72 bg-white rounded-2xl shadow-xl border border-slate-200/80 p-2 py-3 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                    <div className="text-xs font-bold uppercase tracking-wider text-slate-600 px-3 py-1 mb-1">
                      Browse by Category
                    </div>
                    <div className="space-y-0.5">
                      {CATEGORIES.map((cat) => (
                        <Link
                          key={cat.id}
                          to={`/catalogue?category=${cat.id}`}
                          onClick={() => setIsCategoriesDropdownOpen(false)}
                          className="flex items-center justify-between px-3 py-2 rounded-xl text-sm font-medium text-slate-700 hover:bg-violet-50 hover:text-violet-700 transition-colors group"
                        >
                          <div className="flex items-center gap-2.5">
                            <span className="p-1 rounded-md bg-slate-100 group-hover:bg-violet-100 text-slate-600 group-hover:text-violet-700 transition-colors">
                              {categoryIcons[cat.id] || <Tag size={16} />}
                            </span>
                            <span>{cat.name}</span>
                          </div>
                          <span className="text-xs font-semibold text-slate-600 group-hover:text-violet-600">
                            {cat.productCount}
                          </span>
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <Link
                to="/about"
                className={`px-3 py-2 rounded-lg transition-colors ${
                  isLinkActive('/about') ? 'text-violet-700 bg-violet-50' : 'hover:text-slate-900 hover:bg-slate-50'
                }`}
              >
                About Project
              </Link>
            </nav>

            {/* Search Bar */}
            <form
              onSubmit={handleSearchSubmit}
              className="hidden md:flex items-center flex-1 max-w-xs lg:max-w-sm relative"
            >
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search across 60 products, brands, tags..."
                className="w-full pl-9 pr-4 py-2 text-sm bg-slate-50 hover:bg-slate-100/80 focus:bg-white border border-slate-300 focus:border-violet-500 rounded-full focus:outline-hidden focus:ring-2 focus:ring-violet-500/20 transition-all"
              />
              <Search
                size={16}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                >
                  <X size={14} />
                </button>
              )}
            </form>

            {/* Actions: Wishlist, Cart & Mobile Menu */}
            <div className="flex items-center gap-2 sm:gap-3">
              {/* Wishlist Icon Button */}
              <Link
                to="/wishlist"
                aria-label={`Wishlist with ${wishlistCount} items`}
                className="relative p-2.5 rounded-xl text-slate-700 hover:text-violet-700 hover:bg-violet-50 transition-colors"
              >
                <Heart size={20} className={wishlistCount > 0 ? 'fill-rose-500 text-rose-500' : ''} />
                {wishlistCount > 0 && (
                  <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-rose-500 text-white text-[10px] font-bold flex items-center justify-center shadow-xs">
                    {wishlistCount}
                  </span>
                )}
              </Link>

              {/* Cart Button */}
              <Link
                to="/cart"
                aria-label={`Shopping cart with ${summary.itemCount} items, total ${formatINR(
                  summary.total
                )}`}
                className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-violet-700 hover:bg-violet-800 text-white text-sm font-semibold transition-all shadow-sm hover:shadow"
              >
                <div className="relative">
                  <ShoppingBag size={18} />
                  {summary.itemCount > 0 && (
                    <span className="absolute -top-2 -right-2.5 w-4 h-4 rounded-full bg-amber-400 text-slate-900 text-[10px] font-black flex items-center justify-center">
                      {summary.itemCount}
                    </span>
                  )}
                </div>
                <span className="hidden sm:inline font-bold">
                  {summary.itemCount > 0 ? formatINR(summary.total) : 'Cart'}
                </span>
              </Link>

              {/* Mobile menu toggle */}
              <button
                type="button"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                aria-label="Toggle Navigation Menu"
                className="p-2 rounded-xl text-slate-700 hover:bg-slate-100 lg:hidden"
              >
                {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Search & Menu Drawer */}
        {isMobileMenuOpen && (
          <div className="lg:hidden bg-white border-t border-slate-200 px-4 pt-3 pb-6 space-y-4 animate-in fade-in duration-200">
            <form onSubmit={handleSearchSubmit} className="relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search 60 products, brands, tags..."
                className="w-full pl-9 pr-4 py-2.5 text-sm bg-slate-50 border border-slate-300 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-violet-500/20 focus:border-violet-500"
              />
              <Search
                size={16}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
              />
            </form>

            <div className="grid grid-cols-2 gap-2 text-sm font-medium">
              <Link
                to="/"
                onClick={() => setIsMobileMenuOpen(false)}
                className="p-2.5 rounded-xl bg-slate-50 text-slate-800 hover:bg-violet-50 hover:text-violet-700"
              >
                Home
              </Link>
              <Link
                to="/catalogue"
                onClick={() => setIsMobileMenuOpen(false)}
                className="p-2.5 rounded-xl bg-slate-50 text-slate-800 hover:bg-violet-50 hover:text-violet-700"
              >
                All Products (60)
              </Link>
              <Link
                to="/wishlist"
                onClick={() => setIsMobileMenuOpen(false)}
                className="p-2.5 rounded-xl bg-slate-50 text-slate-800 hover:bg-violet-50 hover:text-violet-700"
              >
                Wishlist ({wishlistCount})
              </Link>
              <Link
                to="/about"
                onClick={() => setIsMobileMenuOpen(false)}
                className="p-2.5 rounded-xl bg-slate-50 text-slate-800 hover:bg-violet-50 hover:text-violet-700"
              >
                About Project
              </Link>
            </div>

            <div>
              <div className="text-xs font-bold uppercase tracking-wider text-slate-600 mb-2">
                Categories
              </div>
              <div className="grid grid-cols-2 gap-1.5">
                {CATEGORIES.map((cat) => (
                  <Link
                    key={cat.id}
                    to={`/catalogue?category=${cat.id}`}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="flex items-center gap-2 p-2 rounded-lg text-xs font-semibold text-slate-700 hover:bg-slate-100"
                  >
                    <span className="p-1 rounded bg-slate-100 text-slate-600">
                      {categoryIcons[cat.id] || <Tag size={12} />}
                    </span>
                    <span className="truncate">{cat.name}</span>
                  </Link>
                ))}
              </div>
            </div>

            <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
              <button
                type="button"
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  setIsResetModalOpen(true);
                }}
                className="text-xs text-rose-600 hover:text-rose-700 font-semibold flex items-center gap-1.5"
              >
                <RotateCcw size={14} />
                Reset Demo State
              </button>
            </div>
          </div>
        )}
      </header>

      {/* Reset Demo Modal */}
      <ResetDemoModal
        isOpen={isResetModalOpen}
        onClose={() => setIsResetModalOpen(false)}
      />
    </>
  );
};
