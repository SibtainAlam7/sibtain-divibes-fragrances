import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const LUXURY_EASE = [0.22, 1, 0.36, 1];

export default function HeroSection() {
  const imgRef = useRef(null);
  const [heroReady, setHeroReady] = useState(false);

  useEffect(() => {
    // If already decoded in browser cache, reveal immediately on first paint
    if (imgRef.current && imgRef.current.complete && imgRef.current.naturalWidth > 0) {
      setHeroReady(true);
      return;
    }
    // Safety fallback so hero copy never stays hidden on slow networks
    const fallback = setTimeout(() => setHeroReady(true), 1200);
    return () => clearTimeout(fallback);
  }, []);

  return (
    <section className="relative w-full overflow-hidden bg-[#292522] min-h-[82vh] md:min-h-[90vh] flex items-end md:items-center">
      {/* Subtle Warm Ambient Glow while Hero Decodes */}
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[radial-gradient(ellipse_at_75%_35%,rgba(184,154,114,0.16),transparent_65%)] pointer-events-none"
      />

      {/* Full-Bleed Studio Hero Image — Synchronized Cinematic Reveal */}
      <motion.img
        ref={imgRef}
        src="/NEWHERO.jpg"
        alt="DiVibes Fragrances — Corporate Aura 50ml Eau de Parfum"
        loading="eager"
        decoding="sync"
        fetchPriority="high"
        onLoad={() => setHeroReady(true)}
        onError={() => setHeroReady(true)}
        initial={{ opacity: 0, scale: 1.04 }}
        animate={heroReady ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 1.04 }}
        transition={{ duration: 0.85, ease: LUXURY_EASE }}
        className="absolute inset-0 w-full h-full object-cover object-[75%_25%] md:object-center select-none will-change-transform"
      />

      {/* Directional Gradient Scrim for Crisp Readability */}
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-gradient-to-t from-[#292522] via-[#292522]/80 to-transparent md:bg-gradient-to-r md:from-[#292522]/90 md:via-[#292522]/40 md:to-transparent pointer-events-none"
      />

      {/* Left-Side Editorial Typography Container — Synchronized with Hero Image */}
      <div className="relative z-10 max-w-7xl mx-auto w-full px-6 sm:px-8 lg:px-12 pb-6 pt-24 md:py-12 flex flex-col justify-end md:justify-center">
        <div className="max-w-xl space-y-4 md:space-y-6">
          {/* Eyebrow (Uppercase) — Muted Champagne (#B89A72), Manrope Medium */}
          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={heroReady ? { opacity: 1, y: 0 } : { opacity: 0, y: 14 }}
            transition={{ duration: 0.65, delay: 0.08, ease: LUXURY_EASE }}
            className="nav-text text-[11px] sm:text-xs uppercase tracking-[0.28em] text-[#B89A72]"
          >
            DIVIBES FRAGRANCES
          </motion.p>

          {/* Headline — Cormorant Garamond: text-4xl on mobile, full editorial scale on desktop */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={heroReady ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.75, delay: 0.16, ease: LUXURY_EASE }}
            className="font-serif font-normal text-4xl md:text-6xl lg:text-[72px] xl:text-[80px] leading-[1.04] tracking-[-0.01em]"
          >
            <span className="block text-[#F5F1EA] not-italic font-normal">
              Fragrance
            </span>
            <span className="block text-[#B89A72] italic font-normal mt-1">
              that defines your aura
            </span>
          </motion.h1>

          {/* Sub-headline — Manrope Regular (400), Warm Ivory / Soft Stone */}
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={heroReady ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
            transition={{ duration: 0.7, delay: 0.26, ease: LUXURY_EASE }}
            className="body-copy text-sm sm:text-base text-[#E8E0D5]/90 leading-relaxed max-w-md"
          >
            Discover our curated collection of long-lasting Extrait de Parfum
            impressions, crafted for a memorable presence.
          </motion.p>

          {/* Button — compact on mobile (< md), full editorial size on desktop */}
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={heroReady ? { opacity: 1, y: 0 } : { opacity: 0, y: 14 }}
            transition={{ duration: 0.7, delay: 0.34, ease: LUXURY_EASE }}
            className="pt-2"
          >
            <Link
              to="/shop"
              className="btn-text inline-flex items-center gap-3 bg-[#B89A72] text-[#292522] border border-[#B89A72] px-6 py-3.5 text-[11px] md:px-8 md:py-4 md:text-xs uppercase tracking-[0.2em] rounded-none hover:bg-[#F5F1EA] hover:border-[#F5F1EA] hover:text-[#292522] transition-all duration-300"
            >
              <span>EXPLORE COLLECTION</span>
              <span aria-hidden="true">→</span>
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
