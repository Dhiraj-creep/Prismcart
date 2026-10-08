import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { getStoredWishlist, setStoredWishlist } from '../utils/storage';
import { Product } from '../types/product';
import { PRODUCTS } from '../data/products';

interface WishlistContextType {
  wishlistIds: string[];
  wishlistProducts: Product[];
  isInWishlist: (productId: string) => boolean;
  toggleWishlist: (product: Product) => boolean;
  addToWishlist: (product: Product) => void;
  removeFromWishlist: (productId: string) => void;
  clearWishlist: () => void;
  count: number;
}

const WishlistContext = createContext<WishlistContextType | undefined>(undefined);

export const WishlistProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [wishlistIds, setWishlistIds] = useState<string[]>(() => getStoredWishlist());

  // Keep storage synced
  useEffect(() => {
    setStoredWishlist(wishlistIds);
  }, [wishlistIds]);

  const isInWishlist = useCallback(
    (productId: string): boolean => {
      return wishlistIds.includes(productId);
    },
    [wishlistIds]
  );

  const toggleWishlist = useCallback((product: Product): boolean => {
    let nowSaved = false;
    setWishlistIds((prev) => {
      if (prev.includes(product.id)) {
        nowSaved = false;
        return prev.filter((id) => id !== product.id);
      } else {
        nowSaved = true;
        return [...prev, product.id];
      }
    });
    return nowSaved;
  }, []);

  const addToWishlist = useCallback((product: Product) => {
    setWishlistIds((prev) => {
      if (!prev.includes(product.id)) {
        return [...prev, product.id];
      }
      return prev;
    });
  }, []);

  const removeFromWishlist = useCallback((productId: string) => {
    setWishlistIds((prev) => prev.filter((id) => id !== productId));
  }, []);

  const clearWishlist = useCallback(() => {
    setWishlistIds([]);
  }, []);

  // Compute actual product objects for saved IDs
  const wishlistProducts = wishlistIds
    .map((id) => PRODUCTS.find((p) => p.id === id))
    .filter((p): p is Product => p !== undefined);

  return (
    <WishlistContext.Provider
      value={{
        wishlistIds,
        wishlistProducts,
        isInWishlist,
        toggleWishlist,
        addToWishlist,
        removeFromWishlist,
        clearWishlist,
        count: wishlistProducts.length,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
};

export function useWishlist(): WishlistContextType {
  const context = useContext(WishlistContext);
  if (!context) {
    throw new Error('useWishlist must be used within a WishlistProvider');
  }
  return context;
}
