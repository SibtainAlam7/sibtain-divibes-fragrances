import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { PRODUCTS } from '../../data/products';
import { HOMEPAGE_COPY } from '../../data/siteData';
import ProductCard from '../ProductCard';

const FILTER_TABS = [
  { id: 'all', label: 'All Scents', count: 18 },
  { id: 'men', label: 'Men', count: 10 },
  { id: 'women', label: 'Women', count: 8 },
  { id: 'Office & Executive', label: 'Office' },
  { id: 'Evening & Date', label: 'Evening' },
  { id: 'Fresh & Citrus', label: 'Fresh' },
  { id: 'Oud, Leather & Amber', label: 'Oud & Leather' },
];

export default function OurProductsSection() {
  const [activeFilter, setActiveFilter] = useState('all');
  const [activePage, setActivePage] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const sliderRef = useRef(null);

  const filteredProducts = useMemo(() => {
    if (activeFilter === 'all') return PRODUCTS;
    if (activeFilter === 'men') return PRODUCTS.filter((p) => p.gender === 'men');
    if (activeFilter === 'women') return PRODUCTS.filter((p) => p.gender === 'women');
    return PRODUCTS.filter((p) => p.moodTags.includes(activeFilter));
  }, [activeFilter]);

  const totalDots = Math.max(1, Math.ceil(filteredProducts.length / 4));

  const scrollToPage = (pageIdx) => {
    const el = sliderRef.current;
    if (!el) return;
    const clamped =
      pageIdx < 0 ? totalDots - 1 : pageIdx >= totalDots ? 0 : pageIdx;
    const maxScroll = el.scrollWidth - el.clientWidth;
    const target = totalDots <= 1 ? 0 : (maxScroll / (totalDots - 1)) * clamped;
    el.scrollTo({ left: target, behavior: 'smooth' });
    setActivePage(clamped);
  };

  useEffect(() => {
    if (isPaused || totalDots <= 1) return undefined;
    const timer = setInterval(() => {
      setActivePage((prev) => {
        const next = (prev + 1) % totalDots;
        const el = sliderRef.current;
        if (el) {
          const maxScroll = el.scrollWidth - el.clientWidth;
          const target = (maxScroll / (totalDots - 1)) * next;
          el.scrollTo({ left: target, behavior: 'smooth' });
        }
        return next;
      });
    }, 5200);
    return () => clearInterval(timer);
  }, [isPaused, totalDots]);

  const handleScroll = () => {
    const el = sliderRef.current;
    if (!el) return;
    const maxScroll = el.scrollWidth - el.clientWidth;
    if (maxScroll <= 0) {
      setActivePage(0);
      return;
    }
    const ratio = el.scrollLeft / maxScroll;
    setActivePage(Math.round(ratio * (totalDots - 1)));
  };

  return (
    <section
      id="our-products"
      className="pt-12 pb-16 sm:pt-16 sm:pb-24 bg-[#F5F1EA]"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Clean Editorial Header Bar — Left Heading + Right View All (No Clutter Paragraph) */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-5 border-b border-[#B89A72]/35">
          <div className="space-y-1.5">
            <p className="luxury-eyebrow">Signature Collection</p>
            <h2 className="heading-section text-4xl sm:text-5xl text-[#292522]">
              {HOMEPAGE_COPY.ourProducts.heading}
            </h2>
          </div>

          <Link
            to="/shop"
            className="nav-text self-start sm:self-end text-xs uppercase tracking-[0.2em] text-[#292522] border-b border-[#292522] pb-1 hover:text-[#B89A72] hover:border-[#B89A72] transition-colors duration-300 shrink-0"
          >
            View All →
          </Link>
        </div>

        {/* Luxury Editorial Filter Bar — Sharp Architectural Tabs in Theme Colors & Manrope */}
        <div className="mt-6 flex items-center gap-2 sm:gap-2.5 overflow-x-auto no-scrollbar pb-1">
          {FILTER_TABS.map((tab) => {
            const active = activeFilter === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => {
                  setActiveFilter(tab.id);
                  setActivePage(0);
                  if (sliderRef.current) {
                    sliderRef.current.scrollTo({ left: 0, behavior: 'smooth' });
                  }
                }}
                className={`btn-text relative px-4 sm:px-5 py-2.5 text-[11px] uppercase tracking-[0.16em] whitespace-nowrap transition-all duration-300 border ${
                  active
                    ? 'border-[#292522] text-[#F5F1EA]'
                    : 'border-[#B89A72]/35 bg-[#FFFFFF] text-[#292522]/80 hover:border-[#B89A72] hover:text-[#292522] hover:-translate-y-0.5'
                }`}
              >
                {active && (
                  <motion.span
                    layoutId="ourProductsLuxuryTab"
                    transition={{ type: 'spring', stiffness: 400, damping: 34 }}
                    className="absolute inset-0 bg-[#292522]"
                  />
                )}
                <span className="relative z-10 inline-flex items-center gap-1.5">
                  <span>{tab.label}</span>
                  {tab.count && (
                    <span
                      className={`text-[10px] ${
                        active ? 'text-[#B89A72]' : 'text-[#B89A72]'
                      }`}
                    >
                      {tab.count}
                    </span>
                  )}
                </span>
              </button>
            );
          })}
        </div>

        {/* Smooth Sliding 4-Column Product Carousel */}
        <div className="relative mt-8 group/carousel">
          {totalDots > 1 && (
            <>
              <button
                type="button"
                onClick={() => scrollToPage(activePage - 1)}
                aria-label="Previous fragrances"
                className="hidden md:flex absolute -left-4 top-[36%] -translate-y-1/2 z-20 w-11 h-11 rounded-full bg-[#FFFFFF] border border-[#B89A72]/50 text-[#292522] items-center justify-center shadow-luxury opacity-0 group-hover/carousel:opacity-100 hover:bg-[#292522] hover:text-[#F5F1EA] hover:border-[#292522] transition-all duration-300"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>

              <button
                type="button"
                onClick={() => scrollToPage(activePage + 1)}
                aria-label="Next fragrances"
                className="hidden md:flex absolute -right-4 top-[36%] -translate-y-1/2 z-20 w-11 h-11 rounded-full bg-[#FFFFFF] border border-[#B89A72]/50 text-[#292522] items-center justify-center shadow-luxury opacity-0 group-hover/carousel:opacity-100 hover:bg-[#292522] hover:text-[#F5F1EA] hover:border-[#292522] transition-all duration-300"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </>
          )}

          {/* Horizontal Smooth Track */}
          <div
            ref={sliderRef}
            onScroll={handleScroll}
            className="flex gap-6 overflow-x-auto no-scrollbar snap-x snap-mandatory pb-2 scroll-smooth"
          >
            {filteredProducts.map((product, index) => (
              <div
                key={product.id}
                className="snap-start shrink-0 w-[76vw] sm:w-[45vw] md:w-[31vw] lg:w-[calc(25%-18px)]"
              >
                <ProductCard product={product} index={index} />
              </div>
            ))}
          </div>

          {/* Centered Minimalist Ring Pagination Dots */}
          {totalDots > 1 && (
            <div className="mt-10 flex items-center justify-center gap-3">
              {Array.from({ length: totalDots }).map((_, idx) => {
                const isCurrent = activePage === idx;
                return (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => scrollToPage(idx)}
                    aria-label={`Slide ${idx + 1}`}
                    className={`w-7 h-7 rounded-full flex items-center justify-center transition-all duration-300 ${
                      isCurrent
                        ? 'border border-[#292522]'
                        : 'border border-transparent hover:border-[#B89A72]/60'
                    }`}
                  >
                    <span
                      className={`rounded-full transition-all duration-300 ${
                        isCurrent
                          ? 'w-1.5 h-1.5 bg-[#292522]'
                          : 'w-1.5 h-1.5 bg-[#292522]/30 hover:bg-[#B89A72]'
                      }`}
                    />
                  </button>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
