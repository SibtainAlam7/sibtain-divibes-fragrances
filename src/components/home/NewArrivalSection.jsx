import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Clock, ShoppingBag, Sparkles } from 'lucide-react';
import { getProductBySlug, formatPKR } from '../../data/products';
import { HOMEPAGE_COPY } from '../../data/siteData';
import { useStore } from '../../context/StoreContext';

export default function NewArrivalSection() {
  const product = getProductBySlug(HOMEPAGE_COPY.newArrival.productSlug);
  const { addToCart } = useStore();

  if (!product) return null;

  const noteTiers = [
    { label: 'Top Notes', value: 'Blackcurrant, Citron, Lemon, Mint' },
    { label: 'Heart Notes', value: 'Apricot, Basil, Coriander' },
    { label: 'Base Notes', value: 'Ambrette, Dates' },
  ];

  return (
    <section className="py-14 sm:py-20 bg-[#292522] text-[#F5F1EA] border-y border-[#B89A72]/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
          className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center"
        >
          {/* Left: Clean Sculptural Soft Stone (#E8E0D5) Portrait Frame (No Clunky Outer Box) */}
          <div className="lg:col-span-5">
            <div className="relative group rounded-2xl overflow-hidden bg-[#E8E0D5] aspect-[3/4] max-w-md mx-auto">
              <Link to={`/product/${product.slug}`} className="block w-full h-full">
                <img
                  src={product.images[0]}
                  alt={product.fullTitle}
                  className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />
              </Link>

              <div className="absolute top-4 left-4 right-4 flex items-center justify-between gap-2 pointer-events-none">
                <span className="btn-text inline-flex items-center gap-1.5 rounded-full bg-[#292522] text-[#F5F1EA] px-3.5 py-1.5 text-[10px] uppercase tracking-[0.18em]">
                  <Sparkles className="w-3 h-3 text-[#B89A72]" />
                  New Arrival
                </span>
                <span className="nav-text inline-flex items-center gap-1 rounded-full bg-[#FFFFFF]/90 text-[#292522] px-3 py-1.5 text-[10px] uppercase tracking-[0.14em]">
                  <Clock className="w-3 h-3 text-[#B89A72]" />
                  8–12h
                </span>
              </div>
            </div>
          </div>

          {/* Right: Concise Editorial Spotlight + Compact 3-Column Notes Strip */}
          <div className="lg:col-span-7 space-y-6">
            <div className="space-y-2.5">
              <p className="luxury-eyebrow">
                New Arrival · Inspired by {product.specs.inspiration}
              </p>
              <h2 className="font-serif font-medium text-4xl sm:text-5xl lg:text-[54px] leading-[1.08] text-[#F5F1EA]">
                {product.name} —{' '}
                <span className="italic font-normal text-[#B89A72]">
                  {product.subtitle}
                </span>
              </h2>
              <p className="font-sans font-medium text-xl text-[#F5F1EA] pt-1">
                {formatPKR(product.price)}{' '}
                <span className="body-copy text-xs text-[#E8E0D5]/65 ml-1.5">
                  · 50ml Eau de Parfum · Free Delivery
                </span>
              </p>
            </div>

            {/* Concise Punchy 2-Line Description */}
            <p className="body-copy text-sm sm:text-base text-[#E8E0D5]/80 leading-relaxed max-w-xl">
              Bright, refreshing, and effortlessly uplifting — a crisp citrus and
              mint opening layered over apricot, basil, and warm ambrette.
            </p>

            {/* Compact 3-Column Horizontal Scent Notes Strip */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 pt-1">
              {noteTiers.map((tier) => (
                <div
                  key={tier.label}
                  className="rounded-xl bg-[#F5F1EA]/[0.05] border border-[#B89A72]/30 p-4 hover:border-[#B89A72] transition-colors duration-300"
                >
                  <p className="luxury-eyebrow text-[10px]">{tier.label}</p>
                  <p className="font-serif font-medium text-lg text-[#F5F1EA] mt-1 leading-snug">
                    {tier.value}
                  </p>
                </div>
              ))}
            </div>

            {/* Sleek Pill Primary CTA + Editorial Link */}
            <div className="flex flex-wrap items-center gap-5 pt-2">
              <button
                type="button"
                onClick={() => addToCart(product.id, 1, true)}
                className="btn-text inline-flex items-center gap-2.5 rounded-full bg-[#B89A72] text-[#292522] hover:bg-[#F5F1EA] px-8 py-4 text-xs uppercase tracking-[0.16em] transition-all duration-300 active:scale-[0.98]"
              >
                <ShoppingBag className="w-4 h-4" />
                Add Coastal Chill — {formatPKR(product.price)}
              </button>
              <Link
                to={`/product/${product.slug}`}
                className="nav-text inline-flex items-center gap-2 text-xs uppercase tracking-[0.18em] text-[#F5F1EA] border-b border-[#B89A72] pb-1 hover:text-[#B89A72] transition-colors duration-300"
              >
                Explore Details
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
