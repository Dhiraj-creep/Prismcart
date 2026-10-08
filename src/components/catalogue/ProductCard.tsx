import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, ShoppingBag, Check } from 'lucide-react';
import { Product } from '../../types/product';
import { ImageWithFallback } from '../common/ImageWithFallback';
import { RatingDisplay } from '../common/RatingDisplay';
import { PriceDisplay } from '../common/PriceDisplay';
import { Badge } from '../common/Badge';
import { useWishlist } from '../../context/WishlistContext';
import { useCart } from '../../context/CartContext';
import { useToast } from '../../context/ToastContext';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { isInWishlist, toggleWishlist } = useWishlist();
  const { addToCart, getItemQuantity } = useCart();
  const { showToast } = useToast();

  const isSaved = isInWishlist(product.id);
  const qtyInCart = getItemQuantity(product.id);
  const isOutOfStock = product.stock <= 0;
  const isLowStock = product.stock > 0 && product.stock <= 5;

  const handleWishlistToggle = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const saved = toggleWishlist(product);
    if (saved) {
      showToast(`Saved "${product.name}" to your wishlist.`, 'success');
    } else {
      showToast(`Removed "${product.name}" from your wishlist.`, 'info');
    }
  };

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    const result = addToCart(product, 1);
    if (result.success) {
      showToast(result.message, 'success');
    } else {
      showToast(result.message, 'warning');
    }
  };

  return (
    <div className="group relative bg-white rounded-2xl border border-slate-200/80 shadow-xs hover:shadow-xl hover:border-slate-300 transition-all duration-300 flex flex-col h-full overflow-hidden">
      {/* Image container */}
      <Link
        to={`/product/${product.slug}`}
        className="relative block aspect-square w-full overflow-hidden bg-slate-50"
      >
        <ImageWithFallback
          src={product.image}
          alt={product.alt}
          fallbackText={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
        />

        {/* Top Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-1 z-10">
          <Badge type={product.badge} />
          {isLowStock && (
            <span className="px-2 py-0.5 rounded-full text-[11px] font-bold bg-amber-100 text-amber-800 border border-amber-300">
              Only {product.stock} left
            </span>
          )}
          {isOutOfStock && (
            <span className="px-2 py-0.5 rounded-full text-[11px] font-bold bg-slate-800 text-white">
              Out of Stock
            </span>
          )}
        </div>

        {/* Wishlist Button */}
        <button
          type="button"
          onClick={handleWishlistToggle}
          aria-label={isSaved ? 'Remove from wishlist' : 'Add to wishlist'}
          className={`absolute top-3 right-3 z-10 w-9 h-9 rounded-full flex items-center justify-center transition-all cursor-pointer shadow-md ${
            isSaved
              ? 'bg-rose-50 text-rose-500 hover:bg-rose-100'
              : 'bg-white/90 backdrop-blur-xs text-slate-600 hover:text-rose-500 hover:bg-white'
          }`}
        >
          <Heart
            size={18}
            className={`transition-transform duration-200 active:scale-125 ${
              isSaved ? 'fill-rose-500' : ''
            }`}
          />
        </button>
      </Link>

      {/* Product Details Content */}
      <div className="p-4 sm:p-5 flex flex-col flex-1">
        {/* Category & Brand */}
        <div className="flex items-center justify-between gap-2 mb-1.5">
          <span className="text-xs font-semibold text-violet-700 tracking-wide uppercase truncate">
            {product.brand}
          </span>
          <span className="text-[11px] font-medium text-slate-600 px-2 py-0.5 rounded-md bg-slate-100 truncate">
            {product.category}
          </span>
        </div>

        {/* Title */}
        <Link
          to={`/product/${product.slug}`}
          className="text-sm sm:text-base font-bold text-slate-900 group-hover:text-violet-700 transition-colors line-clamp-2 mb-2 leading-snug"
        >
          {product.name}
        </Link>

        {/* Rating */}
        <div className="mb-3">
          <RatingDisplay rating={product.rating} reviewCount={product.reviewCount} size="sm" />
        </div>

        {/* Price & Action row pushed to bottom */}
        <div className="mt-auto pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
          <PriceDisplay price={product.price} originalPrice={product.originalPrice} size="md" />

          {/* Add to Cart button */}
          <button
            type="button"
            onClick={handleAddToCart}
            disabled={isOutOfStock}
            aria-label={`Add ${product.name} to cart`}
            className={`inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              isOutOfStock
                ? 'bg-slate-100 text-slate-400 cursor-not-allowed'
                : qtyInCart > 0
                ? 'bg-emerald-50 text-emerald-700 border border-emerald-300 hover:bg-emerald-100'
                : 'bg-violet-700 hover:bg-violet-800 text-white shadow-xs hover:shadow'
            }`}
          >
            {qtyInCart > 0 ? (
              <>
                <Check size={14} className="text-emerald-600" />
                <span>In Cart ({qtyInCart})</span>
              </>
            ) : (
              <>
                <ShoppingBag size={14} />
                <span>{isOutOfStock ? 'Sold Out' : 'Add'}</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
