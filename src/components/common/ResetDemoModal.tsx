import React, { useEffect, useRef } from 'react';
import { RotateCcw, X, AlertTriangle } from 'lucide-react';
import { clearAllDemoStorage } from '../../utils/storage';
import { useCart } from '../../context/CartContext';
import { useWishlist } from '../../context/WishlistContext';
import { useToast } from '../../context/ToastContext';

interface ResetDemoModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ResetDemoModal: React.FC<ResetDemoModalProps> = ({ isOpen, onClose }) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const { clearCart } = useCart();
  const { clearWishlist } = useWishlist();
  const { showToast } = useToast();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
      // Focus modal
      setTimeout(() => {
        modalRef.current?.focus();
      }, 50);
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleReset = () => {
    clearAllDemoStorage();
    clearCart();
    clearWishlist();
    showToast('Demo state reset successfully. All items and orders cleared.', 'info');
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs transition-opacity"
      role="dialog"
      aria-modal="true"
      aria-labelledby="reset-modal-title"
    >
      <div
        ref={modalRef}
        tabIndex={-1}
        className="w-full max-w-md bg-white rounded-2xl shadow-2xl border border-slate-200 p-6 focus:outline-hidden"
      >
        <div className="flex items-start justify-between mb-4">
          <div className="w-12 h-12 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center border border-amber-200">
            <AlertTriangle size={24} />
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close dialog"
            className="text-slate-400 hover:text-slate-600 p-1 rounded-lg transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        <h3 id="reset-modal-title" className="text-xl font-bold text-slate-900 mb-2">
          Reset Demo Presentation State?
        </h3>

        <p className="text-sm text-slate-600 mb-6 leading-relaxed">
          This will clear your shopping cart, saved wishlist items, applied coupons, and demo order history in localStorage. This allows you to re-run your college presentation from a clean state.
        </p>

        <div className="flex items-center justify-end gap-3">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-sm font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-xl transition-colors cursor-pointer"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleReset}
            className="inline-flex items-center gap-2 px-5 py-2 text-sm font-semibold text-white bg-rose-600 hover:bg-rose-700 rounded-xl shadow-xs transition-colors cursor-pointer"
          >
            <RotateCcw size={16} />
            Reset Demo State
          </button>
        </div>
      </div>
    </div>
  );
};
