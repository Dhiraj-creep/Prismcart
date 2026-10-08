import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import {
  Heart,
  ShoppingBag,
  ShieldCheck,
  Truck,
  RotateCcw,
  Package,
} from 'lucide-react';
import { PRODUCTS } from '../data/products';
import { ImageWithFallback } from '../components/common/ImageWithFallback';
import { RatingDisplay } from '../components/common/RatingDisplay';
import { PriceDisplay } from '../components/common/PriceDisplay';
import { QuantitySelector } from '../components/common/QuantitySelector';
import { Badge } from '../components/common/Badge';
import { Breadcrumbs } from '../components/common/Breadcrumbs';
import { ProductCard } from '../components/catalogue/ProductCard';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { useToast } from '../context/ToastContext';
import { NotFoundPage } from './NotFoundPage';
import { api } from '../services/api';
import { Product } from '../types/product';

export const ProductDetailPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const { addToCart, getItemQuantity } = useCart();
  const { isInWishlist, toggleWishlist } = useWishlist();
  const { showToast } = useToast();

  const [quantity, setQuantity] = useState(1);
  const fallbackProduct = PRODUCTS.find((p) => p.slug === slug);
  const [liveProduct, setLiveProduct] = useState<Product | undefined>(undefined);

  useEffect(() => {
    if (slug) {
      api.getProductBySlug(slug).then((prod) => {
        if (prod) setLiveProduct(prod);
      });
    }
  }, [slug]);

  const product = liveProduct || fallbackProduct;

  // If not found, render NotFoundPage
  if (!product) {
    return <NotFoundPage customMessage={`The product "${slug}" could not be found in our catalogue.`} />;
  }

  const isSaved = isInWishlist(product.id);
  const inCartQty = getItemQuantity(product.id);
  const isOutOfStock = product.stock <= 0;
  const maxCanAdd = Math.max(0, product.stock - inCartQty);

  // Related products from same category, excluding current product
  const relatedProducts = PRODUCTS.filter(
    (p) => p.categoryId === product.categoryId && p.id !== product.id
  ).slice(0, 4);

  const handleWishlistToggle = () => {
    const saved = toggleWishlist(product);
    if (saved) {
      showToast(`Added "${product.name}" to your wishlist.`, 'success');
    } else {
      showToast(`Removed "${product.name}" from your wishlist.`, 'info');
    }
  };

  const handleAddToCart = () => {
    if (isOutOfStock) return;
    const result = addToCart(product, quantity);
    if (result.success) {
      showToast(result.message, 'success');
      setQuantity(1);
    } else {
      showToast(result.message, 'warning');
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-12">
      {/* Breadcrumbs */}
      <Breadcrumbs
        items={[
          { label: 'Catalogue', href: '/catalogue' },
          { label: product.category, href: `/catalogue?category=${product.categoryId}` },
          { label: product.name },
        ]}
      />

      {/* Main Product Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
        {/* Left Column: Product Imagery */}
        <div className="lg:col-span-6 space-y-4">
          <div className="relative rounded-3xl overflow-hidden bg-slate-50 border border-slate-200/90 shadow-sm aspect-square">
            <ImageWithFallback
              src={product.image}
              alt={product.alt}
              fallbackText={product.name}
              className="w-full h-full object-cover"
            />

            {/* Badge */}
            <div className="absolute top-4 left-4 z-10 flex flex-col gap-1.5">
              <Badge type={product.badge} />
              {product.stock <= 5 && product.stock > 0 && (
                <span className="px-3 py-1 rounded-full text-xs font-bold bg-amber-400 text-slate-950 shadow-xs">
                  Only {product.stock} units left
                </span>
              )}
              {isOutOfStock && (
                <span className="px-3 py-1 rounded-full text-xs font-bold bg-slate-900 text-white shadow-xs">
                  Out of Stock
                </span>
              )}
            </div>

            {/* Wishlist Button */}
            <button
              type="button"
              onClick={handleWishlistToggle}
              aria-label={isSaved ? 'Remove from wishlist' : 'Add to wishlist'}
              className={`absolute top-4 right-4 z-10 w-11 h-11 rounded-full flex items-center justify-center shadow-lg transition-all cursor-pointer ${
                isSaved
                  ? 'bg-rose-50 text-rose-500 hover:bg-rose-100'
                  : 'bg-white/95 text-slate-600 hover:text-rose-500 hover:bg-white'
              }`}
            >
              <Heart
                size={22}
                className={isSaved ? 'fill-rose-500' : ''}
              />
            </button>
          </div>

          {/* Guaranteed Badges Strip */}
          <div className="grid grid-cols-3 gap-3 pt-2">
            <div className="flex items-center gap-2 p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs font-semibold text-slate-700">
              <Truck size={18} className="text-violet-600 shrink-0" />
              <span>Free Delivery &gt;₹999</span>
            </div>
            <div className="flex items-center gap-2 p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs font-semibold text-slate-700">
              <ShieldCheck size={18} className="text-teal-600 shrink-0" />
              <span>Verified Authenticity</span>
            </div>
            <div className="flex items-center gap-2 p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs font-semibold text-slate-700">
              <RotateCcw size={18} className="text-amber-600 shrink-0" />
              <span>7-Day Return Policy</span>
            </div>
          </div>
        </div>

        {/* Right Column: Product Info & Purchase Options */}
        <div className="lg:col-span-6 space-y-6">
          {/* Brand & Category */}
          <div className="flex items-center justify-between gap-2">
            <span className="text-sm font-bold text-violet-700 uppercase tracking-wider">
              {product.brand}
            </span>
            <Link
              to={`/catalogue?category=${product.categoryId}`}
              className="text-xs font-semibold px-3 py-1 rounded-full bg-slate-100 text-slate-700 hover:bg-slate-200 transition-colors"
            >
              {product.category}
            </Link>
          </div>

          {/* Title */}
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight leading-tight">
            {product.name}
          </h1>

          {/* Rating */}
          <div className="flex items-center gap-3">
            <RatingDisplay rating={product.rating} reviewCount={product.reviewCount} size="md" />
            <span className="text-xs text-slate-600 border-l border-slate-200 pl-3">
              Verified Sample Reviews
            </span>
          </div>

          {/* Price */}
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80">
            <PriceDisplay
              price={product.price}
              originalPrice={product.originalPrice}
              size="xl"
            />
            <p className="text-xs text-slate-500 mt-1">
              Inclusive of all taxes. Free delivery applied on checkout above ₹999.
            </p>
          </div>

          {/* Short Description */}
          <p className="text-sm sm:text-base text-slate-700 leading-relaxed font-normal">
            {product.shortDescription}
          </p>

          {/* Stock Status Indicator */}
          <div className="flex items-center gap-2 text-sm font-semibold">
            <Package
              size={18}
              className={isOutOfStock ? 'text-rose-500' : 'text-emerald-600'}
            />
            {isOutOfStock ? (
              <span className="text-rose-600">Currently Out of Stock</span>
            ) : product.stock <= 5 ? (
              <span className="text-amber-700">
                Hurry! Only {product.stock} units remaining in stock.
              </span>
            ) : (
              <span className="text-emerald-700">
                In Stock ({product.stock} units available)
              </span>
            )}
            {inCartQty > 0 && (
              <span className="text-xs font-semibold px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 ml-2">
                {inCartQty} already in cart
              </span>
            )}
          </div>

          {/* Purchase Actions */}
          <div className="space-y-4 pt-4 border-t border-slate-200">
            <div className="flex items-center gap-4">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-600">
                Quantity:
              </span>
              <QuantitySelector
                quantity={quantity}
                max={Math.min(product.stock, maxCanAdd > 0 ? maxCanAdd : product.stock)}
                min={1}
                onChange={setQuantity}
                disabled={isOutOfStock || maxCanAdd <= 0}
              />
              {maxCanAdd <= 0 && !isOutOfStock && (
                <span className="text-xs text-rose-600 font-semibold">
                  Max stock already in cart!
                </span>
              )}
            </div>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
              <button
                type="button"
                onClick={handleAddToCart}
                disabled={isOutOfStock || maxCanAdd <= 0}
                className={`flex-1 py-3.5 px-6 rounded-xl font-bold text-sm flex items-center justify-center gap-2 shadow-md transition-all cursor-pointer ${
                  isOutOfStock || maxCanAdd <= 0
                    ? 'bg-slate-200 text-slate-400 cursor-not-allowed shadow-none'
                    : 'bg-violet-700 hover:bg-violet-800 text-white shadow-violet-700/20'
                }`}
              >
                <ShoppingBag size={18} />
                <span>
                  {isOutOfStock
                    ? 'Out of Stock'
                    : maxCanAdd <= 0
                    ? 'Stock Limit In Cart'
                    : `Add to Cart • ${quantity}`}
                </span>
              </button>

              <button
                type="button"
                onClick={handleWishlistToggle}
                className={`px-5 py-3.5 rounded-xl font-bold text-sm border flex items-center justify-center gap-2 transition-colors cursor-pointer ${
                  isSaved
                    ? 'bg-rose-50 border-rose-200 text-rose-600 hover:bg-rose-100'
                    : 'bg-white border-slate-300 text-slate-700 hover:bg-slate-50'
                }`}
              >
                <Heart size={18} className={isSaved ? 'fill-rose-500' : ''} />
                <span>{isSaved ? 'In Wishlist' : 'Save'}</span>
              </button>
            </div>
          </div>

          {/* Product Tags */}
          <div className="pt-2">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-600 block mb-2">
              Tags:
            </span>
            <div className="flex flex-wrap gap-1.5">
              {product.tags.map((tag) => (
                <Link
                  key={tag}
                  to={`/catalogue?search=${tag}`}
                  className="px-2.5 py-1 rounded-md text-xs font-medium bg-slate-100 text-slate-700 hover:bg-violet-50 hover:text-violet-700 transition-colors"
                >
                  #{tag}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Specifications & Detailed Description */}
      <div className="pt-8 border-t border-slate-200 space-y-8">
        <div>
          <h2 className="text-xl font-bold text-slate-900 mb-3">
            Product Overview & Description
          </h2>
          <div className="prose prose-slate max-w-none text-sm sm:text-base text-slate-600 leading-relaxed space-y-3">
            <p>{product.detailedDescription}</p>
          </div>
        </div>

        {/* Specifications Table */}
        <div>
          <h2 className="text-xl font-bold text-slate-900 mb-4">
            Technical Specifications
          </h2>
          <div className="rounded-2xl border border-slate-200/90 overflow-hidden bg-white shadow-2xs">
            <table className="w-full text-left text-xs sm:text-sm">
              <tbody>
                {Object.entries(product.specifications).map(([key, value], idx) => (
                  <tr
                    key={key}
                    className={idx % 2 === 0 ? 'bg-slate-50/70' : 'bg-white'}
                  >
                    <th className="py-3 px-4 sm:px-6 font-semibold text-slate-800 w-1/3 border-b border-slate-200/60">
                      {key}
                    </th>
                    <td className="py-3 px-4 sm:px-6 text-slate-600 border-b border-slate-200/60">
                      {value}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Related Products from Same Category */}
      {relatedProducts.length > 0 && (
        <section className="pt-10 border-t border-slate-200 space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-xs font-bold uppercase tracking-wider text-violet-700 mb-1">
                More In {product.category}
              </div>
              <h2 className="text-2xl font-black text-slate-900 tracking-tight">
                Related Products
              </h2>
            </div>
            <Link
              to={`/catalogue?category=${product.categoryId}`}
              className="text-xs sm:text-sm font-bold text-violet-700 hover:text-violet-900 hover:underline"
            >
              View Category
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {relatedProducts.map((relProduct) => (
              <ProductCard key={relProduct.id} product={relProduct} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
};
