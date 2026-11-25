import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Eye, Heart } from 'lucide-react';
import { formatPKR } from '../data/products';
import { useStore } from '../context/StoreContext';

export default function ProductCard({ product, index = 0, variant = 'light' }) {
  const { addToCart, toggleWishlist, isInWishlist, setQuickViewProduct } = useStore();
  const wished = isInWishlist(product.id);
  const isDark = variant === 'dark';

  return (
    <motion.article
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.05 }}
      transition={{
        duration: 0.55,
        delay: Math.min(index * 0.05, 0.25),
        ease: [0.22, 1, 0.36, 1],
      }}
      className={`group relative flex flex-col transition-all duration-500 ${
        isDark
          ? 'rounded-2xl bg-[#F5F1EA]/[0.06] border border-[#B89A72]/30 hover:border-[#B89A72] p-3.5 hover:-translate-y-1 shadow-sm'
          : 'bg-transparent'
      }`}
    >
      {/* Portrait Studio Image Container — Soft Stone (#E8E0D5) */}
      <div
        className={`relative aspect-[3/4] w-full overflow-hidden bg-[#E8E0D5] ${
          isDark ? 'rounded-xl' : ''
        }`}
      >
        <Link to={`/product/${product.slug}`} className="block w-full h-full">
          <img
            src={product.images[0]}
            alt={product.fullTitle}
            loading="lazy"
            decoding="async"
            className="w-full h-full object-cover object-center transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.08]"
          />
        </Link>

        {/* Subtle Dark Vignette Veil on Hover */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-[#292522]/0 group-hover:bg-[#292522]/10 transition-colors duration-500"
        />

        {/* Editorial Corner Tag (New Arrival / Best Seller) */}
        {(product.isNewArrival || product.isBestSeller) && (
          <div className="absolute top-3 left-3 pointer-events-none">
            <span
              className={`btn-text inline-block px-2.5 py-1 text-[10px] uppercase tracking-[0.16em] ${
                isDark ? 'rounded-full' : ''
              } ${
                product.isNewArrival
                  ? 'bg-[#292522] text-[#F5F1EA]'
                  : 'bg-[#B89A72] text-[#292522]'
              }`}
            >
              {product.isNewArrival
                ? 'New Arrival'
                : product.bestSellerLabel || 'Best Seller'}
            </span>
          </div>
        )}

        {/* Centered Bottom Hover Action Buttons: Add to Wishlist + Quick View */}
        <div className="absolute inset-x-0 bottom-5 flex items-center justify-center gap-3 z-10 opacity-100 sm:opacity-0 sm:translate-y-4 sm:group-hover:opacity-100 sm:group-hover:translate-y-0 transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]">
          {/* Add to Wishlist */}
          <button
            type="button"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              toggleWishlist(product.id);
            }}
            aria-label={wished ? 'Remove from wishlist' : 'Add to wishlist'}
            title={wished ? 'Saved in Wishlist' : 'Add to Wishlist'}
            className={`group/btn relative w-11 h-11 rounded-full flex items-center justify-center transition-all duration-300 shadow-md hover:scale-110 active:scale-95 ${
              wished
                ? 'bg-[#B89A72] text-[#292522]'
                : 'bg-[#292522] text-[#F5F1EA] hover:bg-[#B89A72] hover:text-[#292522]'
            }`}
          >
            <Heart
              className={`w-[18px] h-[18px] transition-transform duration-300 ${
                wished ? 'fill-[#292522]' : ''
              }`}
            />
            <span className="pointer-events-none hidden sm:block absolute -top-9 left-1/2 -translate-x-1/2 whitespace-nowrap bg-[#292522] text-[#F5F1EA] text-[10px] nav-text tracking-wider px-2.5 py-1 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-200">
              {wished ? 'Saved' : 'Add to Wishlist'}
            </span>
          </button>

          {/* Quick View */}
          <button
            type="button"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              setQuickViewProduct(product);
            }}
            aria-label={`Quick view ${product.name}`}
            title="Quick View"
            className="group/btn relative w-11 h-11 rounded-full bg-[#292522] text-[#F5F1EA] hover:bg-[#B89A72] hover:text-[#292522] flex items-center justify-center transition-all duration-300 shadow-md hover:scale-110 active:scale-95"
          >
            <Eye className="w-[18px] h-[18px]" />
            <span className="pointer-events-none hidden sm:block absolute -top-9 left-1/2 -translate-x-1/2 whitespace-nowrap bg-[#292522] text-[#F5F1EA] text-[10px] nav-text tracking-wider px-2.5 py-1 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-200">
              Quick View
            </span>
          </button>
        </div>
      </div>

      {/* Typography & Pill Add To Cart Button Below Image */}
      <div className={`pt-4 flex-1 flex flex-col justify-between ${isDark ? 'px-1 pb-1' : ''}`}>
        <div>
          <div className="flex items-center justify-between gap-2 text-[11px] nav-text uppercase tracking-[0.16em] text-[#B89A72]">
            <span>{product.category}</span>
            <span className={isDark ? 'text-[#E8E0D5]/80' : 'text-[#292522]/60'}>
              50ml EDP
            </span>
          </div>

          <Link to={`/product/${product.slug}`} className="block mt-1.5 group/title">
            <h3
              className={`font-serif font-medium leading-[1.2] text-[22px] sm:text-2xl group-hover/title:text-[#B89A72] transition-colors duration-300 truncate ${
                isDark ? 'text-[#F5F1EA]' : 'text-[#292522]'
              }`}
            >
              {product.name}
            </h3>
            <p
              className={`body-copy text-xs sm:text-[13px] mt-1 truncate ${
                isDark ? 'text-[#E8E0D5]/85' : 'text-[#292522]/70'
              }`}
            >
              {product.subtitle} · Insp. {product.specs.inspiration}
            </p>
          </Link>

          <p
            className={`font-sans font-medium text-base mt-2.5 ${
              isDark ? 'text-[#F5F1EA]' : 'text-[#292522]'
            }`}
          >
            {formatPKR(product.price)}
          </p>
        </div>

        {/* Full-Width Rounded Pill Add To Cart Button */}
        <button
          type="button"
          onClick={() => addToCart(product.id, 1, true)}
          className={`btn-text mt-4 w-full py-3.5 px-6 rounded-full text-xs tracking-[0.14em] uppercase transition-all duration-300 active:scale-[0.98] ${
            isDark
              ? 'bg-[#B89A72] text-[#292522] border border-[#B89A72] hover:bg-[#F5F1EA] hover:border-[#F5F1EA] hover:text-[#292522]'
              : 'bg-[#292522] text-[#F5F1EA] border border-[#292522] hover:bg-[#B89A72] hover:border-[#B89A72] hover:text-[#292522]'
          }`}
        >
          Add To Cart
        </button>
      </div>
    </motion.article>
  );
}
