import React, { useEffect, useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { Heart, Menu, Search, ShoppingBag, X } from 'lucide-react';
import BrandMark from './BrandMark';
import { useStore } from '../context/StoreContext';
import { BRAND_INFO } from '../data/siteData';

const HEADER_LINKS = [
  { label: 'Home', to: '/' },
  { label: 'Shop', to: '/shop' },
  { label: 'Men', to: '/men' },
  { label: 'Women', to: '/women' },
];

export default function Navbar() {
  const {
    cartCount,
    wishlistCount,
    setIsCartOpen,
    setIsWishlistOpen,
    setIsSearchOpen,
  } = useStore();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Navbar: Manrope Medium (500) on Deep Espresso (#292522)
  const navLinkClass = ({ isActive }) =>
    `nav-text whitespace-nowrap relative text-[13px] tracking-[0.12em] uppercase transition-colors duration-300 py-1 ${
      isActive
        ? 'text-[#B89A72] after:content-[""] after:absolute after:left-0 after:right-0 after:-bottom-0.5 after:h-[1.5px] after:bg-[#B89A72]'
        : 'text-[#F5F1EA]/90 hover:text-[#B89A72]'
    }`;

  return (
    <>
      {/* Top Announcement Bar — Muted Champagne (#B89A72) */}
      <div className="bg-[#B89A72] text-[#292522]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-9 flex items-center justify-center">
          <p className="nav-text text-[11px] sm:text-xs tracking-[0.16em] uppercase text-center text-[#292522]">
            {BRAND_INFO.announcement}
          </p>
        </div>
      </div>

      {/* Main Sticky Header — Deep Espresso (#292522) */}
      <header
        className={`sticky top-0 z-40 bg-[#292522] border-b border-[#B89A72]/25 transition-all duration-300 ${
          scrolled ? 'py-2.5' : 'py-3.5 sm:py-4'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-3 items-center">
            {/* Left: Mobile Hamburger + Desktop Store Navigation */}
            <div className="flex items-center gap-4 sm:gap-6">
              <button
                type="button"
                onClick={() => setMobileMenuOpen(true)}
                className="lg:hidden p-2 -ml-2 text-[#F5F1EA] hover:text-[#B89A72] transition-colors"
                aria-label="Open menu"
              >
                <Menu className="w-5 h-5" />
              </button>

              <button
                type="button"
                onClick={() => setIsSearchOpen(true)}
                className="lg:hidden p-2 text-[#F5F1EA] hover:text-[#B89A72] transition-colors"
                aria-label="Search fragrances"
              >
                <Search className="w-4 h-4" />
              </button>

              <nav className="hidden lg:flex items-center gap-8">
                {HEADER_LINKS.map((item) => (
                  <NavLink key={item.to} to={item.to} className={navLinkClass}>
                    {item.label}
                  </NavLink>
                ))}
              </nav>
            </div>

            {/* Center: Official DiVibes Logo */}
            <div className="flex justify-center">
              <BrandMark />
            </div>

            {/* Right: Search, Wishlist & Bag */}
            <div className="flex items-center justify-end gap-1.5 sm:gap-3">
              <button
                type="button"
                onClick={() => setIsSearchOpen(true)}
                className="hidden lg:inline-flex items-center gap-2 px-3 py-1.5 text-[#F5F1EA]/90 hover:text-[#B89A72] transition-colors nav-text text-xs uppercase tracking-[0.12em]"
                aria-label="Search fragrances"
              >
                <Search className="w-4 h-4" />
                <span>Search</span>
              </button>

              <button
                type="button"
                onClick={() => setIsWishlistOpen(true)}
                className="relative p-2 text-[#F5F1EA]/90 hover:text-[#B89A72] transition-colors"
                aria-label="Wishlist"
              >
                <Heart className="w-[19px] h-[19px]" />
                {wishlistCount > 0 && (
                  <span className="absolute top-1 right-0.5 min-w-[16px] h-4 px-1 bg-[#B89A72] text-[#292522] btn-text text-[10px] flex items-center justify-center">
                    {wishlistCount}
                  </span>
                )}
              </button>

              {/* Bag Button */}
              <button
                type="button"
                onClick={() => setIsCartOpen(true)}
                className="btn-text relative inline-flex items-center gap-2 px-3.5 py-2 border border-[#B89A72] bg-[#B89A72] text-[#292522] hover:bg-transparent hover:text-[#F5F1EA] transition-all duration-300"
                aria-label="Shopping bag"
              >
                <ShoppingBag className="w-4 h-4" />
                <span className="text-[11px] tracking-wider">{cartCount}</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Navigation Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileMenuOpen(false)}
              className="fixed inset-0 z-50 bg-[#292522]/60 backdrop-blur-sm"
            />
            <motion.aside
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'tween', duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
              className="fixed inset-y-0 left-0 z-50 w-[82%] max-w-xs bg-[#292522] text-[#F5F1EA] border-r border-[#B89A72]/25 p-6 flex flex-col justify-between overflow-y-auto"
            >
              <div>
                <div className="flex items-center justify-between pb-5 border-b border-[#F5F1EA]/15">
                  <BrandMark size="sm" />
                  <button
                    type="button"
                    onClick={() => setMobileMenuOpen(false)}
                    className="p-2 text-[#F5F1EA] hover:text-[#B89A72]"
                    aria-label="Close menu"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <div className="mt-7 space-y-2">
                  <p className="luxury-eyebrow mb-3">Shop</p>
                  {HEADER_LINKS.map((item) => (
                    <NavLink
                      key={item.to}
                      to={item.to}
                      className={({ isActive }) =>
                        `nav-text block py-2.5 text-sm uppercase tracking-[0.14em] transition-colors ${
                          isActive
                            ? 'text-[#B89A72]'
                            : 'text-[#F5F1EA]/90 hover:text-[#B89A72]'
                        }`
                      }
                    >
                      {item.label}
                    </NavLink>
                  ))}
                </div>
              </div>

              <div className="pt-5 border-t border-[#F5F1EA]/15 space-y-2 text-xs body-copy text-[#F5F1EA]/75">
                <p className="text-[#F5F1EA] font-medium">{BRAND_INFO.phone}</p>
                <p className="luxury-eyebrow text-[10px]">{BRAND_INFO.tagline}</p>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
