import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import {
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  Heart,
  Minus,
  Plus,
  Search,
  ShoppingBag,
  Sparkles,
  Trash2,
  Truck,
  X,
} from 'lucide-react';
import { PRODUCTS, formatPKR } from '../data/products';
import { useStore } from '../context/StoreContext';

export default function DrawersAndModals() {
  const {
    cartItems,
    cartCount,
    cartSubtotal,
    updateCartQuantity,
    removeFromCart,
    isCartOpen,
    setIsCartOpen,
    wishlistItems,
    toggleWishlist,
    isInWishlist,
    isWishlistOpen,
    setIsWishlistOpen,
    isSearchOpen,
    setIsSearchOpen,
    quickViewProduct,
    setQuickViewProduct,
    addToCart,
    toast,
    showToast,
  } = useStore();

  const [searchQuery, setSearchQuery] = useState('');
  const [searchScope, setSearchScope] = useState('all');
  const [qvQty, setQvQty] = useState(1);
  const [qvSlide, setQvSlide] = useState(0);
  const [qvSlot2Available, setQvSlot2Available] = useState(true);
  const [qvSlot3Available, setQvSlot3Available] = useState(true);
  const [agreedTerms, setAgreedTerms] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  // Mobile Back-Button (Android) & Swipe-Back (iOS) Support for All Overlays
  const anyOverlayOpen =
    isCartOpen || isWishlistOpen || isSearchOpen || Boolean(quickViewProduct);
  const overlayHistoryPushedRef = useRef(false);
  const closingViaBackRef = useRef(false);
  const overlayOpenPathRef = useRef(location.pathname);

  useEffect(() => {
    if (anyOverlayOpen && !overlayHistoryPushedRef.current) {
      overlayOpenPathRef.current = location.pathname;
      window.history.pushState(
        { ...(window.history.state || {}), divibesOverlay: true },
        ''
      );
      overlayHistoryPushedRef.current = true;
    } else if (!anyOverlayOpen && overlayHistoryPushedRef.current) {
      overlayHistoryPushedRef.current = false;
      if (closingViaBackRef.current) {
        closingViaBackRef.current = false;
      } else if (location.pathname === overlayOpenPathRef.current) {
        window.history.back();
      }
    }
  }, [anyOverlayOpen, location.pathname]);

  useEffect(() => {
    if (!anyOverlayOpen) return undefined;
    const handlePopState = () => {
      if (overlayHistoryPushedRef.current) {
        closingViaBackRef.current = true;
        overlayHistoryPushedRef.current = false;
        setIsCartOpen(false);
        setIsWishlistOpen(false);
        setIsSearchOpen(false);
        setQuickViewProduct(null);
      }
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, [
    anyOverlayOpen,
    setIsCartOpen,
    setIsWishlistOpen,
    setIsSearchOpen,
    setQuickViewProduct,
  ]);

  // Close search overlay on Escape key
  useEffect(() => {
    if (!isSearchOpen) return;
    const onKeyDown = (e) => {
      if (e.key === 'Escape') setIsSearchOpen(false);
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [isSearchOpen, setIsSearchOpen]);

  // Reset Quick View local state when switching products
  useEffect(() => {
    setQvQty(1);
    setQvSlide(0);
    setQvSlot2Available(true);
    setQvSlot3Available(true);
    setAgreedTerms(false);
  }, [quickViewProduct?.id]);

  const QUICK_SEARCH_TAGS = [
    'Oud',
    'Louis Vuitton',
    'Vanilla',
    'Office',
    'Floral',
    'Chanel',
    'Citrus',
    'Leather',
  ];

  const searchResults = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    const scoped =
      searchScope === 'all'
        ? PRODUCTS
        : PRODUCTS.filter((p) => p.gender === searchScope);

    if (!q) return scoped.slice(0, 6);
    return scoped.filter(
      (p) =>
        p.fullTitle.toLowerCase().includes(q) ||
        p.name.toLowerCase().includes(q) ||
        p.subtitle.toLowerCase().includes(q) ||
        p.specs.inspiration.toLowerCase().includes(q) ||
        p.specs.keyNotes.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q) ||
        p.moodTags.some((tag) => tag.toLowerCase().includes(q))
    );
  }, [searchQuery, searchScope]);

  const wishlistTotal = useMemo(
    () => wishlistItems.reduce((sum, item) => sum + item.price, 0),
    [wishlistItems]
  );

  const handleMoveAllWishlistToBag = () => {
    if (wishlistItems.length === 0) return;
    wishlistItems.forEach((item) => addToCart(item.id, 1, false));
    setIsWishlistOpen(false);
    setIsCartOpen(true);
    showToast(`${wishlistItems.length} saved fragrances added to your bag`);
  };

  const closeQuickView = () => {
    setQuickViewProduct(null);
  };

  const handleQuickBuyNow = () => {
    if (!quickViewProduct) return;
    if (!agreedTerms) {
      showToast('Please agree with Terms & Conditions before proceeding.');
      return;
    }
    const prodId = quickViewProduct.id;
    closeQuickView();
    addToCart(prodId, qvQty, false);
    navigate('/checkout');
  };

  return (
    <>
      {/* 1. BESPOKE LUXURY SHOPPING BAG DRAWER */}
      <AnimatePresence>
        {isCartOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsCartOpen(false)}
              className="fixed inset-0 z-50 bg-[#292522]/55 backdrop-blur-sm"
            />
            <motion.aside
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'tween', duration: 0.38, ease: [0.22, 1, 0.36, 1] }}
              className="fixed inset-y-0 right-0 z-50 w-full max-w-md bg-[#F5F1EA] border-l border-[#B89A72]/40 flex flex-col shadow-luxury-lg"
            >
              {/* Deep Espresso Header (#292522) */}
              <div className="px-6 py-5 bg-[#292522] text-[#F5F1EA] flex items-center justify-between">
                <div>
                  <p className="nav-text text-[10px] uppercase tracking-[0.22em] text-[#B89A72]">
                    Your Selection
                  </p>
                  <div className="flex items-center gap-2.5 mt-1">
                    <h2 className="font-serif font-medium text-3xl text-[#F5F1EA] leading-none">
                      Shopping Bag
                    </h2>
                    {cartCount > 0 && (
                      <span className="nav-text rounded-full bg-[#B89A72] text-[#292522] px-2.5 py-0.5 text-[11px]">
                        {cartCount}
                      </span>
                    )}
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setIsCartOpen(false)}
                  aria-label="Close bag"
                  className="w-9 h-9 rounded-full border border-[#B89A72]/35 text-[#F5F1EA]/80 hover:border-[#B89A72] hover:text-[#B89A72] flex items-center justify-center transition-all duration-300 hover:rotate-90"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Signature Muted Champagne Accent Ribbon (#B89A72) */}
              <div className="px-6 py-2.5 bg-[#B89A72] text-[#292522] flex items-center gap-2 text-xs body-copy">
                <Truck className="w-3.5 h-3.5 shrink-0" />
                <span>
                  Complimentary <strong>Free Delivery</strong> unlocked across Pakistan.
                </span>
              </div>

              {/* Cart Items Body */}
              <div className="flex-1 overflow-y-auto px-5 py-6 space-y-4">
                {cartItems.length === 0 ? (
                  <div className="h-full flex flex-col items-center justify-center text-center py-12 px-4">
                    <div className="w-16 h-16 rounded-full bg-[#FFFFFF] border border-[#B89A72]/50 flex items-center justify-center mb-5 shadow-sm">
                      <ShoppingBag className="w-6 h-6 text-[#B89A72]" />
                    </div>
                    <h3 className="font-serif font-medium text-3xl text-[#292522]">
                      Your bag is empty
                    </h3>
                    <p className="body-copy text-sm text-[#292522]/70 mt-2 max-w-xs leading-relaxed">
                      Explore our 18 signature Eau de Parfum impressions crafted for 8–12 hours longevity.
                    </p>
                    <div className="mt-6 flex flex-col w-full max-w-[240px] gap-2.5">
                      <Link
                        to="/shop"
                        onClick={() => setIsCartOpen(false)}
                        className="btn-text rounded-full bg-[#292522] text-[#F5F1EA] hover:bg-[#B89A72] hover:text-[#292522] py-3.5 px-6 text-xs uppercase tracking-[0.16em] transition-colors text-center"
                      >
                        Explore All Scents
                      </Link>
                      <div className="grid grid-cols-2 gap-2.5">
                        <Link
                          to="/men"
                          onClick={() => setIsCartOpen(false)}
                          className="btn-text rounded-full border border-[#B89A72]/60 text-[#292522] hover:bg-[#B89A72] py-2.5 text-[11px] uppercase tracking-[0.14em] transition-colors text-center"
                        >
                          For Him
                        </Link>
                        <Link
                          to="/women"
                          onClick={() => setIsCartOpen(false)}
                          className="btn-text rounded-full border border-[#B89A72]/60 text-[#292522] hover:bg-[#B89A72] py-2.5 text-[11px] uppercase tracking-[0.14em] transition-colors text-center"
                        >
                          For Her
                        </Link>
                      </div>
                    </div>
                  </div>
                ) : (
                  <AnimatePresence initial={false}>
                    {cartItems.map((item) => (
                      <motion.div
                        key={item.id}
                        layout
                        initial={{ opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, x: 40 }}
                        transition={{ duration: 0.25 }}
                        className="group rounded-2xl bg-[#FFFFFF] border border-[#E8E0D5] hover:border-[#B89A72] p-3.5 transition-all duration-300 shadow-sm"
                      >
                        <div className="flex gap-4">
                          <Link
                            to={`/product/${item.slug}`}
                            onClick={() => setIsCartOpen(false)}
                            className="w-20 h-24 rounded-xl bg-[#E8E0D5] p-1.5 shrink-0 overflow-hidden block"
                          >
                            <img
                              src={item.images[0]}
                              alt={item.name}
                              className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-500"
                            />
                          </Link>

                          <div className="flex-1 min-w-0 flex flex-col justify-between">
                            <div className="flex items-start justify-between gap-2">
                              <div className="min-w-0">
                                <p className="nav-text text-[10px] uppercase tracking-[0.16em] text-[#B89A72]">
                                  {item.category}
                                </p>
                                <Link
                                  to={`/product/${item.slug}`}
                                  onClick={() => setIsCartOpen(false)}
                                  className="font-serif font-medium text-xl text-[#292522] hover:text-[#B89A72] transition-colors block truncate leading-tight mt-0.5"
                                >
                                  {item.name}
                                </Link>
                                <p className="body-copy text-xs text-[#292522]/65 truncate mt-0.5">
                                  50ml EDP · Insp. {item.specs.inspiration}
                                </p>
                              </div>
                              <button
                                type="button"
                                onClick={() => removeFromCart(item.id)}
                                aria-label={`Remove ${item.name}`}
                                className="w-7 h-7 rounded-full flex items-center justify-center text-[#292522]/45 hover:text-[#292522] hover:bg-[#F5F1EA] transition-colors shrink-0"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </div>

                            <div className="flex items-center justify-between gap-3 pt-2.5 mt-2 border-t border-[#E8E0D5]/80">
                              {/* Rounded Pill Quantity Stepper */}
                              <div className="inline-flex items-center rounded-full bg-[#F5F1EA] border border-[#E8E0D5] px-1 py-0.5">
                                <button
                                  type="button"
                                  onClick={() =>
                                    updateCartQuantity(item.id, item.quantity - 1)
                                  }
                                  className="w-6 h-6 rounded-full flex items-center justify-center text-[#292522]/75 hover:text-[#292522] hover:bg-[#E8E0D5]/70 transition-colors"
                                  aria-label="Decrease quantity"
                                >
                                  <Minus className="w-3 h-3" />
                                </button>
                                <span className="w-7 text-center text-xs price-text text-[#292522]">
                                  {item.quantity}
                                </span>
                                <button
                                  type="button"
                                  onClick={() =>
                                    updateCartQuantity(item.id, item.quantity + 1)
                                  }
                                  className="w-6 h-6 rounded-full flex items-center justify-center text-[#292522]/75 hover:text-[#292522] hover:bg-[#E8E0D5]/70 transition-colors"
                                  aria-label="Increase quantity"
                                >
                                  <Plus className="w-3 h-3" />
                                </button>
                              </div>

                              <span className="price-text text-sm text-[#292522]">
                                {formatPKR(item.price * item.quantity)}
                              </span>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                )}
              </div>

              {/* Sticky Deep Espresso Checkout Footer (#292522) */}
              {cartItems.length > 0 && (
                <div className="p-6 bg-[#292522] text-[#F5F1EA] border-t border-[#B89A72]/35 space-y-4">
                  <div className="space-y-2 text-sm body-copy">
                    <div className="flex justify-between text-[#E8E0D5]/80">
                      <span>Subtotal</span>
                      <span className="price-text text-[#F5F1EA]">
                        {formatPKR(cartSubtotal)}
                      </span>
                    </div>
                    <div className="flex justify-between text-[#E8E0D5]/80">
                      <span>Nationwide Shipping</span>
                      <span className="nav-text text-[#B89A72]">Free</span>
                    </div>
                    <div className="pt-2.5 border-t border-[#F5F1EA]/15 flex justify-between items-baseline">
                      <span className="nav-text text-xs uppercase tracking-[0.16em] text-[#E8E0D5]/85">
                        Total
                      </span>
                      <span className="price-text text-2xl text-[#F5F1EA]">
                        {formatPKR(cartSubtotal)}
                      </span>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => {
                      setIsCartOpen(false);
                      navigate('/checkout');
                    }}
                    className="btn-text w-full rounded-full bg-[#B89A72] text-[#292522] hover:bg-[#F5F1EA] py-3.5 px-6 text-xs uppercase tracking-[0.18em] inline-flex items-center justify-center gap-2 transition-colors"
                  >
                    <span>Proceed to Checkout</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              )}
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      {/* 2. BESPOKE LUXURY WISHLIST DRAWER */}
      <AnimatePresence>
        {isWishlistOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsWishlistOpen(false)}
              className="fixed inset-0 z-50 bg-[#292522]/55 backdrop-blur-sm"
            />
            <motion.aside
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'tween', duration: 0.38, ease: [0.22, 1, 0.36, 1] }}
              className="fixed inset-y-0 right-0 z-50 w-full max-w-md bg-[#F5F1EA] border-l border-[#B89A72]/40 flex flex-col shadow-luxury-lg"
            >
              {/* Deep Espresso Header (#292522) */}
              <div className="px-6 py-5 bg-[#292522] text-[#F5F1EA] flex items-center justify-between">
                <div>
                  <p className="nav-text text-[10px] uppercase tracking-[0.22em] text-[#B89A72]">
                    Your Scent Wardrobe
                  </p>
                  <div className="flex items-center gap-2.5 mt-1">
                    <h2 className="font-serif font-medium text-3xl text-[#F5F1EA] leading-none">
                      Wishlist
                    </h2>
                    {wishlistItems.length > 0 && (
                      <span className="nav-text rounded-full bg-[#B89A72] text-[#292522] px-2.5 py-0.5 text-[11px]">
                        {wishlistItems.length}
                      </span>
                    )}
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setIsWishlistOpen(false)}
                  aria-label="Close wishlist"
                  className="w-9 h-9 rounded-full border border-[#B89A72]/35 text-[#F5F1EA]/80 hover:border-[#B89A72] hover:text-[#B89A72] flex items-center justify-center transition-all duration-300 hover:rotate-90"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Signature Muted Champagne Accent Ribbon (#B89A72) */}
              <div className="px-6 py-2.5 bg-[#B89A72] text-[#292522] flex items-center gap-2 text-xs body-copy">
                <Sparkles className="w-3.5 h-3.5 shrink-0" />
                <span>
                  Complimentary <strong>Free Delivery</strong> on all saved scents across Pakistan.
                </span>
              </div>

              {/* Saved Fragrances Body */}
              <div className="flex-1 overflow-y-auto px-5 py-6 space-y-4">
                {wishlistItems.length === 0 ? (
                  <div className="h-full flex flex-col items-center justify-center text-center py-12 px-4">
                    <div className="w-16 h-16 rounded-full bg-[#FFFFFF] border border-[#B89A72]/50 flex items-center justify-center mb-5 shadow-sm">
                      <Heart className="w-6 h-6 text-[#B89A72]" />
                    </div>
                    <h3 className="font-serif font-medium text-3xl text-[#292522]">
                      Your wardrobe is empty
                    </h3>
                    <p className="body-copy text-sm text-[#292522]/70 mt-2 max-w-xs leading-relaxed">
                      Save your favorite Eau de Parfum impressions here to revisit or move to your bag anytime.
                    </p>
                    <div className="mt-6 flex flex-col w-full max-w-[240px] gap-2.5">
                      <Link
                        to="/shop"
                        onClick={() => setIsWishlistOpen(false)}
                        className="btn-text rounded-full bg-[#292522] text-[#F5F1EA] hover:bg-[#B89A72] hover:text-[#292522] py-3.5 px-6 text-xs uppercase tracking-[0.16em] transition-colors text-center"
                      >
                        Explore All Scents
                      </Link>
                      <div className="grid grid-cols-2 gap-2.5">
                        <Link
                          to="/men"
                          onClick={() => setIsWishlistOpen(false)}
                          className="btn-text rounded-full border border-[#B89A72]/60 text-[#292522] hover:bg-[#B89A72] py-2.5 text-[11px] uppercase tracking-[0.14em] transition-colors text-center"
                        >
                          For Him
                        </Link>
                        <Link
                          to="/women"
                          onClick={() => setIsWishlistOpen(false)}
                          className="btn-text rounded-full border border-[#B89A72]/60 text-[#292522] hover:bg-[#B89A72] py-2.5 text-[11px] uppercase tracking-[0.14em] transition-colors text-center"
                        >
                          For Her
                        </Link>
                      </div>
                    </div>
                  </div>
                ) : (
                  <AnimatePresence initial={false}>
                    {wishlistItems.map((item) => (
                      <motion.div
                        key={item.id}
                        layout
                        initial={{ opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, x: 40 }}
                        transition={{ duration: 0.25 }}
                        className="group rounded-2xl bg-[#FFFFFF] border border-[#E8E0D5] hover:border-[#B89A72] p-3.5 transition-all duration-300 shadow-sm"
                      >
                        <div className="flex gap-4">
                          <Link
                            to={`/product/${item.slug}`}
                            onClick={() => setIsWishlistOpen(false)}
                            className="w-20 h-24 rounded-xl bg-[#E8E0D5] p-1.5 shrink-0 overflow-hidden block"
                          >
                            <img
                              src={item.images[0]}
                              alt={item.name}
                              className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-500"
                            />
                          </Link>

                          <div className="flex-1 min-w-0 flex flex-col justify-between">
                            <div className="flex items-start justify-between gap-2">
                              <div className="min-w-0">
                                <p className="nav-text text-[10px] uppercase tracking-[0.16em] text-[#B89A72]">
                                  {item.category}
                                </p>
                                <Link
                                  to={`/product/${item.slug}`}
                                  onClick={() => setIsWishlistOpen(false)}
                                  className="font-serif font-medium text-xl text-[#292522] hover:text-[#B89A72] transition-colors block truncate leading-tight mt-0.5"
                                >
                                  {item.name}
                                </Link>
                                <p className="body-copy text-xs text-[#292522]/65 truncate mt-0.5">
                                  Insp. {item.specs.inspiration}
                                </p>
                              </div>
                              <button
                                type="button"
                                onClick={() => toggleWishlist(item.id)}
                                aria-label={`Remove ${item.name} from wishlist`}
                                className="w-7 h-7 rounded-full flex items-center justify-center text-[#292522]/45 hover:text-[#292522] hover:bg-[#F5F1EA] transition-colors shrink-0"
                              >
                                <X className="w-4 h-4" />
                              </button>
                            </div>

                            <div className="flex items-center justify-between gap-3 pt-2.5 mt-2 border-t border-[#E8E0D5]/80">
                              <span className="price-text text-sm text-[#292522]">
                                {formatPKR(item.price)}
                              </span>
                              <button
                                type="button"
                                onClick={() => {
                                  setIsWishlistOpen(false);
                                  addToCart(item.id, 1, true);
                                }}
                                className="btn-text inline-flex items-center gap-1.5 rounded-full bg-[#B89A72] text-[#292522] hover:bg-[#292522] hover:text-[#F5F1EA] px-4 py-1.5 text-[11px] uppercase tracking-[0.14em] transition-colors"
                              >
                                <ShoppingBag className="w-3 h-3" />
                                Move to Bag
                              </button>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                )}
              </div>

              {/* Sticky Espresso Footer when items exist */}
              {wishlistItems.length > 0 && (
                <div className="p-6 bg-[#292522] text-[#F5F1EA] border-t border-[#B89A72]/35 space-y-4">
                  <div className="flex items-baseline justify-between">
                    <span className="nav-text text-xs uppercase tracking-[0.16em] text-[#E8E0D5]/80">
                      Saved Selection ({wishlistItems.length})
                    </span>
                    <span className="price-text text-xl text-[#F5F1EA]">
                      {formatPKR(wishlistTotal)}
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={handleMoveAllWishlistToBag}
                    className="btn-text w-full rounded-full bg-[#B89A72] text-[#292522] hover:bg-[#F5F1EA] py-3.5 px-6 text-xs uppercase tracking-[0.18em] inline-flex items-center justify-center gap-2 transition-colors"
                  >
                    <span>Add All to Bag</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              )}
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      {/* 3. FULL-WIDTH EDITORIAL LUXURY SEARCH DRAWER (Top Slide-Down) */}
      <AnimatePresence>
        {isSearchOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              onClick={() => setIsSearchOpen(false)}
              className="fixed inset-0 z-50 bg-[#292522]/60 backdrop-blur-sm"
            />
            <motion.div
              initial={{ y: '-100%' }}
              animate={{ y: 0 }}
              exit={{ y: '-100%' }}
              transition={{ type: 'tween', duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              onClick={(e) => e.stopPropagation()}
              className="fixed inset-x-0 top-0 z-50 bg-[#F5F1EA] border-b-2 border-[#B89A72] shadow-luxury-lg flex flex-col max-h-[88vh]"
            >
              {/* Deep Espresso Editorial Search Bar (#292522) */}
              <div className="bg-[#292522] text-[#F5F1EA] border-b border-[#B89A72]/35">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 py-6 sm:py-8">
                  <div className="flex items-center justify-between gap-4 mb-5">
                    <p className="nav-text text-[11px] uppercase tracking-[0.24em] text-[#B89A72]">
                      Search The Collection
                    </p>
                    <button
                      type="button"
                      onClick={() => setIsSearchOpen(false)}
                      aria-label="Close search"
                      className="w-9 h-9 rounded-full border border-[#B89A72]/40 text-[#F5F1EA]/85 hover:border-[#B89A72] hover:text-[#B89A72] flex items-center justify-center transition-all duration-300 hover:rotate-90"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>

                  {/* Large Cormorant Garamond Underline Input */}
                  <div className="flex items-center gap-4 pb-3 border-b border-[#B89A72]/60 focus-within:border-[#B89A72] transition-colors">
                    <Search className="w-5 h-5 sm:w-6 sm:h-6 text-[#B89A72] shrink-0" />
                    <input
                      type="text"
                      autoFocus
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="Search by scent, note, or inspiration..."
                      className="font-serif font-normal flex-1 bg-transparent text-2xl sm:text-3xl lg:text-4xl text-[#F5F1EA] placeholder:text-[#E8E0D5]/40 focus:outline-none"
                    />
                    {searchQuery && (
                      <button
                        type="button"
                        onClick={() => setSearchQuery('')}
                        className="nav-text text-xs uppercase tracking-[0.16em] text-[#B89A72] hover:text-[#F5F1EA] transition-colors shrink-0"
                      >
                        Clear
                      </button>
                    )}
                  </div>

                  {/* Clean Architectural Scope Tabs */}
                  <div className="mt-5 flex items-center gap-6">
                    {[
                      { id: 'all', label: 'All Scents (18)' },
                      { id: 'men', label: 'For Him (10)' },
                      { id: 'women', label: 'For Her (8)' },
                    ].map((scope) => {
                      const active = searchScope === scope.id;
                      return (
                        <button
                          key={scope.id}
                          type="button"
                          onClick={() => setSearchScope(scope.id)}
                          className={`nav-text pb-1.5 text-xs uppercase tracking-[0.16em] border-b-2 transition-colors ${
                            active
                              ? 'border-[#B89A72] text-[#B89A72]'
                              : 'border-transparent text-[#E8E0D5]/70 hover:text-[#F5F1EA]'
                          }`}
                        >
                          {scope.label}
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* Warm Ivory Editorial Results Split (#F5F1EA) */}
              <div className="flex-1 overflow-y-auto">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 py-7 sm:py-9">
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10">
                    {/* Left Editorial Column: Notes & Inspirations Index */}
                    <div className="lg:col-span-3 lg:border-r lg:border-[#E8E0D5] lg:pr-8">
                      <p className="nav-text text-[11px] uppercase tracking-[0.2em] text-[#B89A72] mb-4">
                        Notes & Houses
                      </p>
                      <div className="flex flex-wrap lg:flex-col gap-2 lg:gap-1">
                        {QUICK_SEARCH_TAGS.map((tag) => {
                          const isSelected =
                            searchQuery.trim().toLowerCase() === tag.toLowerCase();
                          return (
                            <button
                              key={tag}
                              type="button"
                              onClick={() => setSearchQuery(isSelected ? '' : tag)}
                              className={`text-left transition-colors rounded-full lg:rounded-lg px-3.5 lg:px-3 py-1.5 lg:py-2 text-xs sm:text-sm flex items-center justify-between gap-2 ${
                                isSelected
                                  ? 'bg-[#B89A72] text-[#292522] nav-text'
                                  : 'bg-[#FFFFFF] lg:bg-transparent border border-[#E8E0D5] lg:border-transparent text-[#292522]/80 hover:text-[#292522] hover:bg-[#E8E0D5]/55 body-copy'
                              }`}
                            >
                              <span>{tag}</span>
                              <ArrowRight
                                className={`w-3.5 h-3.5 hidden lg:block transition-opacity ${
                                  isSelected ? 'opacity-100' : 'opacity-0'
                                }`}
                              />
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    {/* Right Showcase Column: Editorial Bottle Grid */}
                    <div className="lg:col-span-9">
                      <div className="flex items-center justify-between gap-4 mb-5">
                        <p className="nav-text text-[11px] uppercase tracking-[0.2em] text-[#292522]/70">
                          {searchQuery.trim()
                            ? `${searchResults.length} ${
                                searchResults.length === 1 ? 'Fragrance' : 'Fragrances'
                              } Matching “${searchQuery.trim()}”`
                            : searchScope === 'men'
                            ? 'Signature Men’s Selections'
                            : searchScope === 'women'
                            ? 'Signature Women’s Selections'
                            : 'Featured Creations'}
                        </p>
                        <Link
                          to="/shop"
                          onClick={() => setIsSearchOpen(false)}
                          className="nav-text text-xs uppercase tracking-[0.16em] text-[#B89A72] hover:text-[#292522] border-b border-[#B89A72]/60 pb-0.5 transition-colors"
                        >
                          View All 18 →
                        </Link>
                      </div>

                      {searchResults.length === 0 ? (
                        <div className="rounded-2xl bg-[#FFFFFF] border border-[#E8E0D5] p-10 text-center space-y-3">
                          <h3 className="font-serif font-medium text-3xl text-[#292522]">
                            No scents matched “{searchQuery}”
                          </h3>
                          <p className="body-copy text-sm text-[#292522]/70 max-w-md mx-auto">
                            Try selecting one of the scent notes or inspiration houses on the left, or explore our full 18-scent collection.
                          </p>
                          <div className="pt-2">
                            <button
                              type="button"
                              onClick={() => {
                                setSearchQuery('');
                                setSearchScope('all');
                              }}
                              className="btn-text rounded-full bg-[#B89A72] text-[#292522] hover:bg-[#292522] hover:text-[#F5F1EA] px-6 py-2.5 text-xs uppercase tracking-[0.16em] transition-colors"
                            >
                              Reset Search
                            </button>
                          </div>
                        </div>
                      ) : (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                          {searchResults.map((item) => (
                            <div
                              key={item.id}
                              className="group rounded-2xl bg-[#FFFFFF] border border-[#E8E0D5] hover:border-[#B89A72] p-3 transition-all duration-300 flex flex-col justify-between shadow-sm"
                            >
                              <div className="flex sm:flex-col gap-3.5 sm:gap-3">
                                <Link
                                  to={`/product/${item.slug}`}
                                  onClick={() => setIsSearchOpen(false)}
                                  className="w-20 h-24 sm:w-full sm:aspect-[4/3] rounded-xl bg-[#E8E0D5] p-2 shrink-0 overflow-hidden block"
                                >
                                  <img
                                    src={item.images[0]}
                                    alt={item.name}
                                    className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-500"
                                  />
                                </Link>

                                <div className="min-w-0 flex-1">
                                  <p className="nav-text text-[10px] uppercase tracking-[0.16em] text-[#B89A72]">
                                    {item.category}
                                  </p>
                                  <Link
                                    to={`/product/${item.slug}`}
                                    onClick={() => setIsSearchOpen(false)}
                                    className="font-serif font-medium text-xl text-[#292522] group-hover:text-[#B89A72] transition-colors block truncate leading-tight mt-0.5"
                                  >
                                    {item.name}
                                  </Link>
                                  <p className="body-copy text-xs text-[#292522]/65 truncate mt-0.5">
                                    Insp. {item.specs.inspiration}
                                  </p>
                                </div>
                              </div>

                              <div className="flex items-center justify-between gap-2 pt-3 mt-3 border-t border-[#E8E0D5]/80">
                                <span className="price-text text-sm text-[#292522]">
                                  {formatPKR(item.price)}
                                </span>
                                <button
                                  type="button"
                                  onClick={() => addToCart(item.id, 1, false)}
                                  className="btn-text rounded-full bg-[#B89A72] text-[#292522] hover:bg-[#292522] hover:text-[#F5F1EA] px-4 py-1.5 text-[10px] uppercase tracking-[0.14em] transition-colors"
                                >
                                  Add to Bag
                                </button>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* 4. REDESIGNED LUXURY QUICK VIEW MODAL (Interactive 3-Slide Gallery + Pill Controls + Terms + Buy It Now + View Full Details) */}
      <AnimatePresence>
        {quickViewProduct && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={closeQuickView}
            className="fixed inset-0 z-50 bg-[#292522]/55 backdrop-blur-sm flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ opacity: 0, y: 28, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 18, scale: 0.96 }}
              transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-4xl bg-[#FFFFFF] border border-[#D8CEC1] shadow-luxury-lg grid grid-cols-1 md:grid-cols-2 overflow-hidden max-h-[92vh]"
            >
              {/* Floating Top-Right Close Button */}
              <button
                type="button"
                onClick={closeQuickView}
                aria-label="Close quick view"
                className="absolute top-4 right-4 z-20 w-9 h-9 rounded-full bg-[#FFFFFF]/90 md:bg-transparent flex items-center justify-center text-[#292522]/70 hover:text-[#292522] hover:rotate-90 transition-all duration-300"
              >
                <X className="w-5 h-5" />
              </button>

              {/* LEFT COLUMN: Interactive Product Image Slider on Soft Stone (#E8E0D5) */}
              <div className="relative bg-[#E8E0D5] aspect-[4/4] md:aspect-auto md:min-h-[540px] overflow-hidden group/qvimg">
                <AnimatePresence mode="wait">
                  {qvSlide === 0 && (
                    <motion.img
                      key="qv-0"
                      src={quickViewProduct.images[0]}
                      alt={quickViewProduct.fullTitle}
                      initial={{ opacity: 0, scale: 1.04 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.35 }}
                      className="w-full h-full object-cover"
                    />
                  )}

                  {qvSlide === 1 &&
                    (qvSlot2Available ? (
                      <motion.img
                        key="qv-1-img"
                        src={quickViewProduct.images[1]}
                        alt={`${quickViewProduct.fullTitle} detail`}
                        onError={() => setQvSlot2Available(false)}
                        initial={{ opacity: 0, scale: 1.04 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.35 }}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <motion.div
                        key="qv-1-macro"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.35 }}
                        className="w-full h-full overflow-hidden bg-[#E8E0D5]"
                      >
                        <img
                          src={quickViewProduct.images[0]}
                          alt={`${quickViewProduct.name} close-up`}
                          className="w-full h-full object-cover scale-[1.45] translate-y-2"
                        />
                      </motion.div>
                    ))}

                  {qvSlide === 2 &&
                    (qvSlot3Available ? (
                      <motion.img
                        key="qv-2-img"
                        src={quickViewProduct.images[2]}
                        alt={`${quickViewProduct.fullTitle} notes`}
                        onError={() => setQvSlot3Available(false)}
                        initial={{ opacity: 0, scale: 1.04 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.35 }}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <motion.div
                        key="qv-2-dossier"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.35 }}
                        className="w-full h-full p-7 sm:p-9 flex flex-col justify-between bg-[#E8E0D5]"
                      >
                        <div className="flex items-center justify-between border-b border-[#B89A72]/40 pb-3">
                          <span className="luxury-eyebrow">Olfactory Profile</span>
                          <span className="nav-text text-[11px] uppercase tracking-widest text-[#292522]">
                            50ml · EDP
                          </span>
                        </div>
                        <div className="space-y-3 my-auto py-4">
                          {[
                            { tier: 'Top Notes', list: quickViewProduct.pyramid.top },
                            { tier: 'Heart Notes', list: quickViewProduct.pyramid.heart },
                            { tier: 'Base Notes', list: quickViewProduct.pyramid.base },
                          ].map((row) => (
                            <div
                              key={row.tier}
                              className="bg-[#FFFFFF] border border-[#D8CEC1] p-3.5"
                            >
                              <p className="luxury-eyebrow text-[10px]">{row.tier}</p>
                              <p className="product-title text-lg text-[#292522] mt-0.5">
                                {row.list.join(' · ')}
                              </p>
                            </div>
                          ))}
                        </div>
                        <p className="body-copy text-xs text-[#292522]/75 border-t border-[#B89A72]/40 pt-3">
                          Longevity: {quickViewProduct.specs.longevity}
                        </p>
                      </motion.div>
                    ))}
                </AnimatePresence>

                {/* Left / Right Circular Slider Arrows */}
                <button
                  type="button"
                  onClick={() => setQvSlide((prev) => (prev + 2) % 3)}
                  aria-label="Previous image"
                  className="absolute left-3.5 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-[#FFFFFF]/90 text-[#292522] flex items-center justify-center shadow-md hover:bg-[#292522] hover:text-[#F5F1EA] transition-all duration-300"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button
                  type="button"
                  onClick={() => setQvSlide((prev) => (prev + 1) % 3)}
                  aria-label="Next image"
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-[#FFFFFF]/90 text-[#292522] flex items-center justify-center shadow-md hover:bg-[#292522] hover:text-[#F5F1EA] transition-all duration-300"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>

                {/* Bottom Slide Indicator Dots */}
                <div className="absolute bottom-4 inset-x-0 flex items-center justify-center gap-2">
                  {[0, 1, 2].map((idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => setQvSlide(idx)}
                      aria-label={`View slide ${idx + 1}`}
                      className={`h-2 rounded-full transition-all duration-300 ${
                        qvSlide === idx
                          ? 'w-6 bg-[#292522]'
                          : 'w-2 bg-[#292522]/35 hover:bg-[#B89A72]'
                      }`}
                    />
                  ))}
                </div>
              </div>

              {/* RIGHT COLUMN: Clean Editorial Details, Quantity + Add To Cart + Wishlist, Terms, Buy It Now, View Full Details */}
              <div className="p-6 sm:p-8 md:p-9 flex flex-col justify-between overflow-y-auto max-h-[54vh] md:max-h-[90vh] bg-[#FFFFFF]">
                <div className="space-y-4">
                  <div className="pr-8">
                    <p className="luxury-eyebrow text-[10px]">
                      {quickViewProduct.category}
                    </p>
                    <h3 className="product-title text-3xl sm:text-[34px] text-[#292522] mt-1">
                      {quickViewProduct.fullTitle}
                    </h3>
                    <p className="price-text text-2xl text-[#292522] mt-2">
                      {formatPKR(quickViewProduct.price)}
                    </p>
                  </div>

                  {/* Concise Key Attributes List */}
                  <div className="space-y-1 text-xs sm:text-sm body-copy text-[#292522]/75">
                    <p>
                      <span className="nav-text text-[#292522]">Inspiration:</span>{' '}
                      {quickViewProduct.specs.inspiration}
                    </p>
                    <p>
                      <span className="nav-text text-[#292522]">Key Notes:</span>{' '}
                      {quickViewProduct.specs.keyNotes}
                    </p>
                    <p>
                      <span className="nav-text text-[#292522]">Details:</span>{' '}
                      {quickViewProduct.specs.size} {quickViewProduct.specs.fragranceType} · Longevity {quickViewProduct.specs.longevity}
                    </p>
                  </div>

                  {/* Verbatim Story Paragraph */}
                  <p className="body-copy text-sm text-[#292522]/80 leading-relaxed">
                    {quickViewProduct.verbatimParagraphs[0]}
                  </p>
                  <p className="body-copy text-xs text-[#B89A72] font-medium">
                    Free delivery on all orders — all over Pakistan.
                  </p>
                </div>

                {/* Action Controls Area */}
                <div className="pt-6 mt-5 border-t border-[#D8CEC1]/70 space-y-4">
                  {/* Row 1: Pill Quantity + Add To Cart + Circular Wishlist */}
                  <div className="flex items-center gap-3">
                    <div className="inline-flex items-center justify-between bg-[#F5F1EA] border border-[#D8CEC1] rounded-full px-2 py-1.5 w-28 sm:w-32 shrink-0">
                      <button
                        type="button"
                        onClick={() => setQvQty((q) => Math.max(1, q - 1))}
                        aria-label="Decrease quantity"
                        className="w-8 h-8 rounded-full flex items-center justify-center text-[#292522]/75 hover:bg-[#D8CEC1]/50 hover:text-[#292522] transition-colors"
                      >
                        <Minus className="w-3.5 h-3.5" />
                      </button>
                      <span className="price-text text-sm text-[#292522]">
                        {qvQty}
                      </span>
                      <button
                        type="button"
                        onClick={() => setQvQty((q) => q + 1)}
                        aria-label="Increase quantity"
                        className="w-8 h-8 rounded-full flex items-center justify-center text-[#292522]/75 hover:bg-[#D8CEC1]/50 hover:text-[#292522] transition-colors"
                      >
                        <Plus className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <button
                      type="button"
                      onClick={() => {
                        const prodId = quickViewProduct.id;
                        closeQuickView();
                        addToCart(prodId, qvQty, true);
                      }}
                      className="btn-text flex-1 py-3.5 px-5 rounded-full bg-[#292522] text-[#F5F1EA] border border-[#292522] text-xs uppercase tracking-[0.15em] hover:bg-[#B89A72] hover:border-[#B89A72] hover:text-[#292522] transition-all duration-300 active:scale-[0.98]"
                    >
                      Add To Cart
                    </button>

                    <button
                      type="button"
                      onClick={() => toggleWishlist(quickViewProduct.id)}
                      aria-label="Save to wishlist"
                      className={`w-12 h-12 rounded-full border flex items-center justify-center shrink-0 transition-all duration-300 hover:scale-105 ${
                        isInWishlist(quickViewProduct.id)
                          ? 'bg-[#292522] border-[#292522] text-[#B89A72]'
                          : 'bg-[#FFFFFF] border-[#D8CEC1] text-[#292522] hover:border-[#292522]'
                      }`}
                    >
                      <Heart
                        className={`w-[18px] h-[18px] ${
                          isInWishlist(quickViewProduct.id) ? 'fill-[#B89A72]' : ''
                        }`}
                      />
                    </button>
                  </div>

                  {/* Row 2: Terms & Conditions Checkbox */}
                  <label className="inline-flex items-center gap-2.5 text-xs sm:text-sm body-copy text-[#292522]/80 cursor-pointer select-none">
                    <input
                      type="checkbox"
                      checked={agreedTerms}
                      onChange={(e) => setAgreedTerms(e.target.checked)}
                      className="w-4 h-4 accent-[#292522] cursor-pointer"
                    />
                    <span>
                      I agree with{' '}
                      <Link
                        to="/exchange-policy"
                        onClick={closeQuickView}
                        className="nav-text text-[#292522] underline underline-offset-2 hover:text-[#B89A72] transition-colors"
                      >
                        Terms & Conditions
                      </Link>
                    </span>
                  </label>

                  {/* Row 3: Full-Width Pill Buy It Now Button (Theme Champagne #B89A72 -> Espresso #292522 on hover) */}
                  <button
                    type="button"
                    onClick={handleQuickBuyNow}
                    className={`btn-text w-full py-3.5 px-6 rounded-full text-xs uppercase tracking-[0.16em] transition-all duration-300 ${
                      agreedTerms
                        ? 'bg-[#B89A72] text-[#292522] hover:bg-[#292522] hover:text-[#F5F1EA] cursor-pointer active:scale-[0.98]'
                        : 'bg-[#B89A72]/45 text-[#292522]/60 cursor-not-allowed'
                    }`}
                  >
                    Buy It Now
                  </button>

                  {/* Row 4: View Full Details » */}
                  <div className="pt-1">
                    <Link
                      to={`/product/${quickViewProduct.slug}`}
                      onClick={closeQuickView}
                      className="nav-text inline-flex items-center gap-1.5 text-xs sm:text-sm text-[#292522] hover:text-[#B89A72] transition-colors duration-300 group/link"
                    >
                      <span>View Full Details</span>
                      <span
                        aria-hidden="true"
                        className="inline-block transition-transform duration-300 group-hover/link:translate-x-1"
                      >
                        »
                      </span>
                    </Link>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 5. LUXURY TOAST NOTIFICATION */}
      <AnimatePresence>
        {toast && (
          <motion.div
            key={toast.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 12 }}
            className="fixed bottom-6 left-6 z-50 inline-flex items-center gap-2.5 bg-espresso text-ivory border border-champagne px-4 py-3 shadow-luxury-lg text-xs nav-text tracking-wide"
          >
            <Sparkles className="w-3.5 h-3.5 text-champagne" />
            <span>{toast.message}</span>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
