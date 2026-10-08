import React from 'react';
import { Link } from 'react-router-dom';
import { Trash2 } from 'lucide-react';
import { CartItem } from '../../types/cart';
import { ImageWithFallback } from '../common/ImageWithFallback';
import { QuantitySelector } from '../common/QuantitySelector';
import { formatINR } from '../../utils/currency';
import { useCart } from '../../context/CartContext';
import { useToast } from '../../context/ToastContext';

interface CartItemRowProps {
  item: CartItem;
}

export const CartItemRow: React.FC<CartItemRowProps> = ({ item }) => {
  const { updateQuantity, removeFromCart } = useCart();
  const { showToast } = useToast();
  const { product, quantity } = item;

  const lineTotal = product.price * quantity;

  const handleQuantityChange = (newQty: number) => {
    const res = updateQuantity(product.id, newQty);
    if (!res.success) {
      showToast(res.message, 'warning');
    }
  };

  const handleRemove = () => {
    removeFromCart(product.id);
    showToast(`Removed "${product.name}" from cart.`, 'info');
  };

  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 py-4 border-b border-slate-200/80">
      {/* Product Image & Title */}
      <div className="flex items-center gap-4 flex-1 min-w-0">
        <Link
          to={`/product/${product.slug}`}
          className="w-20 h-20 rounded-xl overflow-hidden bg-slate-100 border border-slate-200 shrink-0 block"
        >
          <ImageWithFallback
            src={product.image}
            alt={product.alt}
            className="w-full h-full object-cover"
          />
        </Link>

        <div className="min-w-0 flex-1">
          <span className="text-[11px] font-bold text-violet-700 uppercase tracking-wider block">
            {product.brand}
          </span>
          <Link
            to={`/product/${product.slug}`}
            className="text-sm font-bold text-slate-900 hover:text-violet-700 transition-colors line-clamp-1 block"
          >
            {product.name}
          </Link>
          <div className="flex items-center gap-2 mt-1">
            <span className="text-xs font-semibold text-slate-600">
              Unit: {formatINR(product.price)}
            </span>
            {product.stock <= 5 && (
              <span className="text-[10px] font-bold text-amber-700 bg-amber-50 px-1.5 py-0.5 rounded border border-amber-200">
                Only {product.stock} available
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Quantity & Line Total */}
      <div className="flex items-center justify-between sm:justify-end gap-6 w-full sm:w-auto pt-2 sm:pt-0 border-t sm:border-0 border-slate-100">
        <QuantitySelector
          quantity={quantity}
          max={product.stock}
          min={1}
          onChange={handleQuantityChange}
          size="sm"
        />

        {/* Line Total */}
        <div className="text-right min-w-[90px]">
          <span className="text-xs text-slate-500 block">Total</span>
          <span className="text-sm sm:text-base font-extrabold text-slate-900">
            {formatINR(lineTotal)}
          </span>
        </div>

        {/* Delete Item */}
        <button
          type="button"
          onClick={handleRemove}
          aria-label={`Remove ${product.name} from cart`}
          className="p-2 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-xl transition-colors cursor-pointer"
        >
          <Trash2 size={18} />
        </button>
      </div>
    </div>
  );
};
