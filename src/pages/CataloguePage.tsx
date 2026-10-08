import React, { useMemo, useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { SlidersHorizontal, PackageOpen } from 'lucide-react';
import { PRODUCTS } from '../data/products';
import { CATEGORIES } from '../data/categories';
import { FilterState, SortOption } from '../types/filter';
import { CategoryId } from '../types/product';
import { filterProducts, sortProducts } from '../utils/filterProducts';
import { ProductCard } from '../components/catalogue/ProductCard';
import { FilterSidebar } from '../components/catalogue/FilterSidebar';
import { FilterDrawer } from '../components/catalogue/FilterDrawer';
import { ActiveFilterChips } from '../components/catalogue/ActiveFilterChips';
import { SortDropdown } from '../components/catalogue/SortDropdown';
import { SearchBar } from '../components/catalogue/SearchBar';
import { Pagination } from '../components/catalogue/Pagination';
import { EmptyState } from '../components/common/EmptyState';
import { Breadcrumbs } from '../components/common/Breadcrumbs';
import { api } from '../services/api';

const ITEMS_PER_PAGE = 12;

export const CataloguePage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [isMobileDrawerOpen, setIsMobileDrawerOpen] = useState(false);
  const [catalogProducts, setCatalogProducts] = useState(PRODUCTS);

  useEffect(() => {
    api.getProducts().then((data) => {
      if (data && data.length > 0) {
        setCatalogProducts(data);
      }
    });
  }, []);

  // Initialize filter state from URL query parameters
  const currentCategory = (searchParams.get('category') || 'all') as CategoryId | 'all';
  const currentSearch = searchParams.get('search') || '';
  const currentMinPrice = Number(searchParams.get('minPrice')) || 0;
  const currentMaxPrice = Number(searchParams.get('maxPrice')) || 100000;
  const currentRating = Number(searchParams.get('rating')) || 0;
  const currentInStock = searchParams.get('inStock') === 'true';
  const currentSort = (searchParams.get('sort') || 'featured') as SortOption;
  const currentPage = Number(searchParams.get('page')) || 1;

  const filters: FilterState = useMemo(
    () => ({
      search: currentSearch,
      category: currentCategory,
      minPrice: currentMinPrice,
      maxPrice: currentMaxPrice,
      minRating: currentRating,
      inStockOnly: currentInStock,
      sortBy: currentSort,
      page: currentPage,
    }),
    [
      currentSearch,
      currentCategory,
      currentMinPrice,
      currentMaxPrice,
      currentRating,
      currentInStock,
      currentSort,
      currentPage,
    ]
  );

  // Helper to update search params while preserving other filters
  const updateFilters = (newFilters: Partial<FilterState>) => {
    const updated = { ...filters, ...newFilters };
    const params = new URLSearchParams();

    if (updated.search) params.set('search', updated.search);
    if (updated.category && updated.category !== 'all') params.set('category', updated.category);
    if (updated.minPrice > 0) params.set('minPrice', updated.minPrice.toString());
    if (updated.maxPrice < 100000) params.set('maxPrice', updated.maxPrice.toString());
    if (updated.minRating > 0) params.set('rating', updated.minRating.toString());
    if (updated.inStockOnly) params.set('inStock', 'true');
    if (updated.sortBy && updated.sortBy !== 'featured') params.set('sort', updated.sortBy);
    if (updated.page && updated.page > 1) params.set('page', updated.page.toString());

    setSearchParams(params, { replace: true });
  };

  const handleResetFilters = () => {
    setSearchParams(new URLSearchParams(), { replace: true });
  };

  const handleRemoveSingleFilter = (key: keyof FilterState, defaultValue?: unknown) => {
    updateFilters({ [key]: defaultValue, page: 1 });
  };

  // 1. Filter products
  const filteredProducts = useMemo(() => {
    return filterProducts(catalogProducts, filters);
  }, [catalogProducts, filters]);

  // 2. Sort products
  const sortedProducts = useMemo(() => {
    return sortProducts(filteredProducts, filters.sortBy);
  }, [filteredProducts, filters.sortBy]);

  // 3. Paginate
  const totalPages = Math.ceil(sortedProducts.length / ITEMS_PER_PAGE);
  const paginatedProducts = useMemo(() => {
    const startIndex = (filters.page - 1) * ITEMS_PER_PAGE;
    return sortedProducts.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  }, [sortedProducts, filters.page]);

  // Category info for banner
  const activeCategory =
    filters.category !== 'all'
      ? CATEGORIES.find((c) => c.id === filters.category)
      : null;

  // Scroll to top on page change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [filters.page]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
      {/* Breadcrumbs */}
      <Breadcrumbs
        items={[
          { label: 'Catalogue', href: '/catalogue' },
          ...(activeCategory
            ? [{ label: activeCategory.name, href: `/catalogue?category=${activeCategory.id}` }]
            : []),
        ]}
      />

      {/* Category Header Banner if Category is filtered */}
      {activeCategory ? (
        <div
          className="relative overflow-hidden rounded-3xl p-6 sm:p-8 border shadow-xs transition-all"
          style={{
            borderColor: `${activeCategory.accentColor}40`,
            background: `linear-gradient(135deg, ${activeCategory.accentColor}12 0%, #FFFFFF 100%)`,
          }}
        >
          <div className="relative z-10 max-w-2xl">
            <span
              className="inline-block text-xs font-bold uppercase tracking-wider px-2.5 py-1 rounded-md mb-2"
              style={{
                backgroundColor: `${activeCategory.accentColor}20`,
                color: activeCategory.accentColor,
              }}
            >
              Category Collection
            </span>
            <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              {activeCategory.name}
            </h1>
            <p className="text-sm text-slate-600 mt-2 leading-relaxed">
              {activeCategory.description}
            </p>
          </div>
        </div>
      ) : (
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            Product Catalogue
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Discover 60 curated products across 8 categories with instant multi-facet filtering.
          </p>
        </div>
      )}

      {/* Search & Mobile Filter Bar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 pt-2">
        <div className="flex-1 max-w-lg">
          <SearchBar
            value={filters.search}
            onChange={(val) => updateFilters({ search: val, page: 1 })}
          />
        </div>

        <div className="flex items-center justify-between sm:justify-end gap-3">
          {/* Mobile Filter Trigger */}
          <button
            type="button"
            onClick={() => setIsMobileDrawerOpen(true)}
            className="lg:hidden inline-flex items-center gap-2 px-3.5 py-2.5 rounded-xl border border-slate-300 bg-white text-xs font-bold text-slate-700 hover:bg-slate-50 transition-colors shadow-2xs"
          >
            <SlidersHorizontal size={15} />
            <span>Filters</span>
            {filteredProducts.length !== PRODUCTS.length && (
              <span className="w-2 h-2 rounded-full bg-violet-600" />
            )}
          </button>

          {/* Sort Dropdown */}
          <SortDropdown
            value={filters.sortBy}
            onChange={(sort) => updateFilters({ sortBy: sort, page: 1 })}
          />
        </div>
      </div>

      {/* Active Filter Chips */}
      <ActiveFilterChips
        filters={filters}
        onRemoveFilter={handleRemoveSingleFilter}
        onClearAll={handleResetFilters}
        count={sortedProducts.length}
      />

      {/* Main Grid & Sidebar Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 items-start pt-2">
        {/* Desktop Sidebar */}
        <div className="hidden lg:block lg:col-span-1 bg-white p-5 rounded-2xl border border-slate-200/90 shadow-xs sticky top-24">
          <FilterSidebar
            filters={filters}
            onChange={updateFilters}
            onReset={handleResetFilters}
            totalProductsCount={PRODUCTS.length}
            filteredProductsCount={sortedProducts.length}
          />
        </div>

        {/* Product Grid Area */}
        <div className="lg:col-span-3">
          {sortedProducts.length === 0 ? (
            <EmptyState
              icon={PackageOpen}
              title="No products match your criteria"
              description="Try adjusting your search terms, removing filters, or resetting the price and rating brackets."
              actionText="Reset All Filters"
              onAction={handleResetFilters}
            />
          ) : (
            <div className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                {paginatedProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>

              {/* Pagination */}
              <Pagination
                currentPage={filters.page}
                totalPages={totalPages}
                onPageChange={(page) => updateFilters({ page })}
              />
            </div>
          )}
        </div>
      </div>

      {/* Mobile Filter Drawer */}
      <FilterDrawer
        isOpen={isMobileDrawerOpen}
        onClose={() => setIsMobileDrawerOpen(false)}
        filters={filters}
        onChange={updateFilters}
        onReset={handleResetFilters}
        totalProductsCount={PRODUCTS.length}
        filteredProductsCount={sortedProducts.length}
      />
    </div>
  );
};
