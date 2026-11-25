import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { PRODUCTS } from '../data/products';

const StoreContext = createContext(null);

const CART_KEY = 'divibes_luxury_cart_v1';
const WISHLIST_KEY = 'divibes_luxury_wishlist_v1';

export function StoreProvider({ children }) {
  const [cart, setCart] = useState(() => {
    try {
      const saved = localStorage.getItem(CART_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [wishlist, setWishlist] = useState(() => {
    try {
      const saved = localStorage.getItem(WISHLIST_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [quickViewProduct, setQuickViewProduct] = useState(null);
  const [toast, setToast] = useState(null);

  useEffect(() => {
    try {
      localStorage.setItem(CART_KEY, JSON.stringify(cart));
    } catch {
      // ignore storage errors
    }
  }, [cart]);

  useEffect(() => {
    try {
      localStorage.setItem(WISHLIST_KEY, JSON.stringify(wishlist));
    } catch {
      // ignore storage errors
    }
  }, [wishlist]);

  const showToast = (message) => {
    setToast({ id: Date.now(), message });
    setTimeout(() => {
      setToast((prev) => (prev && Date.now() - prev.id >= 2700 ? null : prev));
    }, 2800);
  };

  const addToCart = (productId, quantity = 1, openDrawer = true) => {
    const product = PRODUCTS.find((p) => p.id === productId);
    if (!product) return;

    setCart((prev) => {
      const existing = prev.find((item) => item.id === productId);
      if (existing) {
        return prev.map((item) =>
          item.id === productId
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prev, { id: productId, quantity }];
    });

    if (openDrawer) {
      setIsCartOpen(true);
    } else {
      showToast(`${product.name} added to your bag`);
    }
  };

  const updateCartQuantity = (productId, quantity) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setCart((prev) =>
      prev.map((item) => (item.id === productId ? { ...item, quantity } : item))
    );
  };

  const removeFromCart = (productId) => {
    setCart((prev) => prev.filter((item) => item.id !== productId));
  };

  const clearCart = () => setCart([]);

  const toggleWishlist = (productId) => {
    const product = PRODUCTS.find((p) => p.id === productId);
    setWishlist((prev) => {
      const exists = prev.includes(productId);
      if (exists) {
        showToast(`${product?.name || 'Fragrance'} removed from wishlist`);
        return prev.filter((id) => id !== productId);
      }
      showToast(`${product?.name || 'Fragrance'} saved to wishlist`);
      return [...prev, productId];
    });
  };

  const isInWishlist = (productId) => wishlist.includes(productId);

  const cartItems = useMemo(() => {
    return cart
      .map((entry) => {
        const product = PRODUCTS.find((p) => p.id === entry.id);
        return product ? { ...product, quantity: entry.quantity } : null;
      })
      .filter(Boolean);
  }, [cart]);

  const wishlistItems = useMemo(() => {
    return wishlist
      .map((id) => PRODUCTS.find((p) => p.id === id))
      .filter(Boolean);
  }, [wishlist]);

  const cartCount = useMemo(
    () => cartItems.reduce((acc, item) => acc + item.quantity, 0),
    [cartItems]
  );

  const cartSubtotal = useMemo(
    () => cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0),
    [cartItems]
  );

  const value = {
    cartItems,
    cartCount,
    cartSubtotal,
    wishlistItems,
    wishlistCount: wishlistItems.length,
    addToCart,
    updateCartQuantity,
    removeFromCart,
    clearCart,
    toggleWishlist,
    isInWishlist,
    isCartOpen,
    setIsCartOpen,
    isWishlistOpen,
    setIsWishlistOpen,
    isSearchOpen,
    setIsSearchOpen,
    quickViewProduct,
    setQuickViewProduct,
    toast,
    showToast,
  };

  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>;
}

export const useStore = () => {
  const ctx = useContext(StoreContext);
  if (!ctx) throw new Error('useStore must be used inside StoreProvider');
  return ctx;
};
