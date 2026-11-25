import React from 'react';
import { motion } from 'framer-motion';
import { BadgeCheck, Quote, Star } from 'lucide-react';

export default function ReviewCard({
  quote,
  author,
  city,
  product,
  rating = 5,
  date,
  variant = 'light', // 'light' | 'dark'
  index = 0,
  className = '',
}) {
  const isDark = variant === 'dark';
  const initial = (author || 'D').trim().charAt(0).toUpperCase();

  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-30px' }}
      transition={{
        duration: 0.55,
        delay: Math.min(index * 0.08, 0.25),
        ease: [0.22, 1, 0.36, 1],
      }}
      className={`group relative overflow-hidden rounded-2xl p-6 sm:p-7 flex flex-col justify-between transition-all duration-500 hover:-translate-y-1.5 ${
        isDark
          ? 'bg-[#F5F1EA]/[0.06] border border-[#B89A72]/30 hover:border-[#B89A72] hover:bg-[#F5F1EA]/[0.09] shadow-luxury'
          : 'bg-[#FFFFFF] border border-[#B89A72]/30 hover:border-[#B89A72] shadow-luxury hover:shadow-luxury-lg'
      } ${className}`}
    >
      {/* Subtle Top Champagne Accent Glow Line on Hover */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-0 inset-x-8 h-[2px] bg-gradient-to-r from-transparent via-[#B89A72] to-transparent opacity-40 group-hover:opacity-100 transition-opacity duration-500"
      />

      {/* Soft Decorative Quote Watermark */}
      <Quote
        aria-hidden="true"
        className={`pointer-events-none absolute top-5 right-5 w-10 h-10 transition-transform duration-500 group-hover:scale-110 ${
          isDark ? 'text-[#B89A72]/15' : 'text-[#B89A72]/15'
        }`}
      />

      <div>
        {/* Top Row: 5-Star Champagne Rating + Verified Badge */}
        <div className="flex items-center justify-between gap-2 mb-4">
          <div className="flex items-center gap-0.5 text-[#B89A72]">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`w-3.5 h-3.5 ${
                  i < rating ? 'fill-[#B89A72] text-[#B89A72]' : 'text-[#B89A72]/30'
                }`}
              />
            ))}
          </div>

          <span
            className={`inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-[10px] nav-text uppercase tracking-[0.14em] ${
              isDark
                ? 'bg-[#B89A72]/15 text-[#B89A72] border border-[#B89A72]/30'
                : 'bg-[#F5F1EA] text-[#292522]/75 border border-[#B89A72]/35'
            }`}
          >
            <BadgeCheck className="w-3 h-3 text-[#B89A72]" />
            Verified
          </span>
        </div>

        {/* Review Quote in Cormorant Garamond */}
        <p
          className={`font-serif font-medium text-xl sm:text-[22px] leading-relaxed pr-4 ${
            isDark ? 'text-[#F5F1EA]' : 'text-[#292522]'
          }`}
        >
          “{quote}”
        </p>
      </div>

      {/* Author & Fragrance Footer */}
      <div
        className={`mt-6 pt-4 border-t flex items-center justify-between gap-3 ${
          isDark ? 'border-[#F5F1EA]/12' : 'border-[#E8E0D5]'
        }`}
      >
        <div className="flex items-center gap-3 min-w-0">
          {/* Monogram Avatar */}
          <div
            className={`w-9 h-9 rounded-full flex items-center justify-center shrink-0 font-serif font-semibold text-base transition-colors duration-300 ${
              isDark
                ? 'bg-[#B89A72]/20 text-[#B89A72] border border-[#B89A72]/45 group-hover:bg-[#B89A72] group-hover:text-[#292522]'
                : 'bg-[#292522] text-[#F5F1EA] group-hover:bg-[#B89A72] group-hover:text-[#292522]'
            }`}
          >
            {initial}
          </div>

          <div className="min-w-0">
            <p
              className={`btn-text text-xs uppercase tracking-[0.12em] truncate ${
                isDark ? 'text-[#F5F1EA]' : 'text-[#292522]'
              }`}
            >
              {author}
            </p>
            <p
              className={`body-copy text-[11px] truncate ${
                isDark ? 'text-[#E8E0D5]/65' : 'text-[#292522]/60'
              }`}
            >
              {city || date || 'Pakistan'}
            </p>
          </div>
        </div>

        {product && (
          <span
            className={`shrink-0 rounded-full px-3 py-1 text-[10px] nav-text uppercase tracking-[0.14em] transition-colors duration-300 ${
              isDark
                ? 'bg-[#292522] text-[#B89A72] border border-[#B89A72]/40 group-hover:bg-[#B89A72] group-hover:text-[#292522]'
                : 'bg-[#F5F1EA] text-[#B89A72] border border-[#B89A72]/35 group-hover:bg-[#292522] group-hover:text-[#F5F1EA] group-hover:border-[#292522]'
            }`}
          >
            {product}
          </span>
        )}
      </div>
    </motion.article>
  );
}
