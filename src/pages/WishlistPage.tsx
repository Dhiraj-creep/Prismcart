import React from 'react';
import { Heart, Trash2, ShoppingBag } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useWishlist } from '../context/WishlistContext';
import { useCart } from '../context/CartContext';
import { useToast } from '../context/ToastContext';
import { ImageWithFallback } from '../components/common/ImageWithFallback';
import { PriceDisplay } from '../components/common/PriceDisplay';
import { RatingDisplay } from '../components/common/RatingDisplay';
import { EmptyState } from '../components/common/EmptyState';
import { Breadcrumbs } from '../components/common/Breadcrumbs';

export const WishlistPage: React.FC = () => {
  const { wishlistProducts, removeFromWishlist, clearWishlist } = useWishlist();
  const { addToCart } = useCart();
  const { showToast } = useToast();

  const handleMoveToCart = (product: typeof wishlistProducts[0]) => {
    if (product.stock <= 0) {
      showToast(`${product.name} is currently out of stock.`, 'warning');
      return;
    }

    const result = addToCart(product, 1);
    if (result.success) {
      removeFromWishlist(product.id);
      showToast(`Moved "${product.name}" from wishlist to your cart.`, 'success');
    } else {
      showToast(result.message, 'warning');
    }
  };

  const handleRemove = (productId: string, productName: string) => {
    removeFromWishlist(productId);
    showToast(`Removed "${productName}" from wishlist.`, 'info');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
      <Breadcrumbs items={[{ label: 'My Wishlist' }]} />

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight flex items-center gap-2.5">
            <Heart size={26} className="text-rose-500 fill-rose-500" />
            <span>My Saved Wishlist</span>
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            {wishlistProducts.length} {wishlistProducts.length === 1 ? 'item' : 'items'} saved for later
          </p>
        </div>

        {wishlistProducts.length > 0 && (
          <button
            type="button"
            onClick={clearWishlist}
            className="inline-flex items-center gap-1.5 text-xs font-bold text-rose-600 hover:text-rose-700 hover:underline cursor-pointer"
          >
            <Trash2 size={14} />
            <span>Clear Wishlist</span>
          </button>
        )}
      </div>

      {wishlistProducts.length === 0 ? (
        <EmptyState
          icon={Heart}
          title="Your wishlist is empty"
          description="You haven't saved any items yet. Tap the heart icon on any product to bookmark it for later."
          actionText="Explore Catalogue"
          actionHref="/catalogue"
        />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {wishlistProducts.map((product) => {
            const isOutOfStock = product.stock <= 0;

            return (
              <div
                key={product.id}
                className="bg-white rounded-2xl border border-slate-200/90 shadow-xs hover:shadow-lg transition-all flex flex-col overflow-hidden"
              >
                {/* Product Image */}
                <Link
                  to={`/product/${product.slug}`}
                  className="aspect-square w-full bg-slate-50 overflow-hidden block relative"
                >
                  <ImageWithFallback
                    src={product.image}
                    alt={product.alt}
                    className="w-full h-full object-cover"
                  />
                  {isOutOfStock && (
                    <div className="absolute inset-0 bg-slate-900/60 flex items-center justify-center">
                      <span className="px-3 py-1 bg-white text-slate-900 font-bold text-xs rounded-full shadow">
                        Out of Stock
                      </span>
                    </div>
                  )}
                </Link>

                {/* Details */}
                <div className="p-4 flex flex-col flex-1">
                  <div className="flex items-center justify-between text-xs text-slate-600 mb-1">
                    <span className="font-semibold text-violet-700 uppercase">
                      {product.brand}
                    </span>
                    <span>{product.category}</span>
                  </div>

                  <Link
                    to={`/product/${product.slug}`}
                    className="font-bold text-sm text-slate-900 hover:text-violet-700 transition-colors line-clamp-1 mb-1.5"
                  >
                    {product.name}
                  </Link>

                  <div className="mb-3">
                    <RatingDisplay rating={product.rating} reviewCount={product.reviewCount} size="sm" />
                  </div>

                  <div className="mt-auto pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
                    <PriceDisplay price={product.price} originalPrice={product.originalPrice} size="sm" />

                    <div className="flex items-center gap-1.5">
                      <button
                        type="button"
                        onClick={() => handleRemove(product.id, product.name)}
                        aria-label={`Remove ${product.name} from wishlist`}
                        className="p-2 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-xl transition-colors cursor-pointer"
                      >
                        <Trash2 size={16} />
                      </button>

                      <button
                        type="button"
                        onClick={() => handleMoveToCart(product)}
                        disabled={isOutOfStock}
                        aria-label={`Move ${product.name} to cart`}
                        className={`inline-flex items-center gap-1 px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                          isOutOfStock
                            ? 'bg-slate-100 text-slate-400 cursor-not-allowed'
                            : 'bg-violet-700 hover:bg-violet-800 text-white shadow-xs'
                        }`}
                      >
                        <ShoppingBag size={14} />
                        <span>Move to Cart</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
