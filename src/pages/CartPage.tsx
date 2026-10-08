import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingBag, ArrowLeft, Trash2 } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { CartItemRow } from '../components/cart/CartItemRow';
import { OrderSummaryCard } from '../components/cart/OrderSummaryCard';
import { EmptyState } from '../components/common/EmptyState';
import { Breadcrumbs } from '../components/common/Breadcrumbs';

export const CartPage: React.FC = () => {
  const { items, clearCart } = useCart();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
      <Breadcrumbs items={[{ label: 'Shopping Cart' }]} />

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight flex items-center gap-2.5">
            <ShoppingBag size={26} className="text-violet-700" />
            <span>Shopping Cart</span>
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Review your selected products and verify calculations before demo checkout.
          </p>
        </div>

        {items.length > 0 && (
          <button
            type="button"
            onClick={clearCart}
            className="inline-flex items-center gap-1.5 text-xs font-bold text-rose-600 hover:text-rose-700 hover:underline cursor-pointer"
          >
            <Trash2 size={14} />
            <span>Empty Cart</span>
          </button>
        )}
      </div>

      {items.length === 0 ? (
        <EmptyState
          icon={ShoppingBag}
          title="Your shopping cart is empty"
          description="Looks like you haven't added any products to your cart yet. Explore our 60 curated items."
          actionText="Start Shopping"
          actionHref="/catalogue"
        />
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Cart Items List */}
          <div className="lg:col-span-8 bg-white rounded-2xl border border-slate-200/90 shadow-2xs p-5 sm:p-6 space-y-4">
            <div className="hidden sm:flex items-center justify-between text-xs font-bold uppercase tracking-wider text-slate-600 pb-3 border-b border-slate-100">
              <span>Product Details</span>
              <span className="pr-12">Quantity & Total</span>
            </div>

            <div className="divide-y divide-slate-100">
              {items.map((item) => (
                <CartItemRow key={item.product.id} item={item} />
              ))}
            </div>

            <div className="pt-4 flex items-center justify-between">
              <Link
                to="/catalogue"
                className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-violet-700 hover:text-violet-900 hover:underline"
              >
                <ArrowLeft size={16} />
                <span>Continue Shopping</span>
              </Link>
            </div>
          </div>

          {/* Order Summary Sidebar */}
          <div className="lg:col-span-4 sticky top-24">
            <OrderSummaryCard showCheckoutButton={true} />
          </div>
        </div>
      )}
    </div>
  );
};
