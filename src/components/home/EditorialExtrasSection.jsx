import React, { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { PRODUCTS } from '../../data/products';
import { CUSTOMER_REVIEWS } from '../../data/siteData';
import ProductCard from '../ProductCard';
import ReviewCard from '../ReviewCard';

const MOODS = [
  'Office & Executive',
  'Evening & Date',
  'Fresh & Citrus',
  'Floral & Romantic',
  'Oud, Leather & Amber',
];

export default function EditorialExtrasSection() {
  const [selectedGender, setSelectedGender] = useState('all');
  const [selectedMood, setSelectedMood] = useState('Evening & Date');

  const recommendations = useMemo(() => {
    const matches = PRODUCTS.filter((p) => {
      const genderOk = selectedGender === 'all' || p.gender === selectedGender;
      const moodOk = p.moodTags.includes(selectedMood);
      return genderOk && moodOk;
    });
    if (matches.length >= 3) return matches.slice(0, 3);
    const fallback = PRODUCTS.filter(
      (p) => selectedGender === 'all' || p.gender === selectedGender
    );
    return [...matches, ...fallback.filter((f) => !matches.includes(f))].slice(0, 3);
  }, [selectedGender, selectedMood]);

  const allReviews = [...CUSTOMER_REVIEWS.men, ...CUSTOMER_REVIEWS.women];

  const portals = [
    {
      to: '/men',
      badge: '10 Signature Scents',
      title: 'Men’s Collection',
      subtitle: 'Crisp bergamot, smoky oud, rich leather & Sacred Musk.',
      cta: 'Explore For Him',
      image: '/Men collection.jpg',
      alt: "Men's Collection — Sacred Musk",
    },
    {
      to: '/women',
      badge: '8 Signature Scents',
      title: 'Women’s Collection',
      subtitle: 'Luminous florals, Madagascar vanilla, citrus & Floral Vibes.',
      cta: 'Explore For Her',
      image: '/NEWFEMALECOLLECTION.jpg',
      alt: "Women's Collection — Floral Vibes",
    },
  ];

  return (
    <>
      {/* 1. Dual Editorial Collection Portals — Warm Ivory (#F5F1EA) */}
      <section className="py-16 sm:py-20 bg-[#F5F1EA]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 mb-10">
            <div>
              <p className="luxury-eyebrow">Shop By Collection</p>
              <h2 className="heading-section text-4xl sm:text-5xl text-[#292522] mt-1">
                Crafted For{' '}
                <span className="italic font-normal text-[#B89A72]">
                  Him & Her
                </span>
              </h2>
            </div>
            <Link
              to="/shop"
              className="nav-text self-start sm:self-end text-xs uppercase tracking-[0.2em] text-[#292522] border-b border-[#292522] pb-1 hover:text-[#B89A72] hover:border-[#B89A72] transition-colors duration-300"
            >
              Browse All 18 →
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-7 lg:gap-8">
            {portals.map((portal, idx) => (
              <motion.div
                key={portal.to}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.65,
                  delay: idx * 0.1,
                  ease: [0.22, 1, 0.36, 1],
                }}
              >
                <Link
                  to={portal.to}
                  className="group relative block rounded-2xl overflow-hidden bg-[#292522] aspect-square shadow-luxury"
                >
                  <img
                    src={portal.image}
                    alt={portal.alt}
                    className="w-full h-full object-cover object-center transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.04]"
                  />

                  {/* Subtle Bottom-Left Directional Scrim — Keeps Top-Right Bottle Crisp */}
                  <div
                    aria-hidden="true"
                    className="absolute inset-0 bg-gradient-to-tr from-[#292522]/90 via-[#292522]/25 to-transparent"
                  />
                  <div
                    aria-hidden="true"
                    className="absolute inset-x-0 bottom-0 h-2/5 bg-gradient-to-t from-[#292522]/85 via-[#292522]/30 to-transparent"
                  />

                  {/* Top-Left Scents Count Pill */}
                  <div className="absolute top-5 left-5 sm:top-6 sm:left-6">
                    <span className="nav-text inline-block rounded-full bg-[#292522]/80 backdrop-blur-sm border border-[#B89A72]/45 text-[#B89A72] px-3.5 py-1 text-[10px] uppercase tracking-[0.18em]">
                      {portal.badge}
                    </span>
                  </div>

                  {/* Bottom-Left Editorial Copy & Pill CTA */}
                  <div className="absolute inset-x-0 bottom-0 p-6 sm:p-8 lg:p-9">
                    <div className="max-w-[85%] sm:max-w-[78%] space-y-2.5">
                      <h3 className="font-serif font-medium text-3xl sm:text-4xl lg:text-[42px] text-[#F5F1EA] leading-[1.08]">
                        {portal.title}
                      </h3>
                      <p className="body-copy text-xs sm:text-sm text-[#E8E0D5]/90 leading-relaxed">
                        {portal.subtitle}
                      </p>
                      <div className="pt-2">
                        <span className="btn-text inline-flex items-center gap-2 rounded-full bg-[#B89A72] text-[#292522] group-hover:bg-[#F5F1EA] px-6 py-3 text-[11px] uppercase tracking-[0.16em] transition-all duration-300 shadow-sm">
                          <span>{portal.cta}</span>
                          <ArrowRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1" />
                        </span>
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 2. Curate Your Signature Vibe — Deep Espresso (#292522) Luxury Matcher */}
      <section className="py-16 sm:py-20 bg-[#292522] text-[#F5F1EA] border-y border-[#B89A72]/35">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Editorial Header Row — Synced with Homepage Sections */}
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-8 border-b border-[#F5F1EA]/15">
            <div className="space-y-2 max-w-xl">
              <h2 className="font-serif font-medium text-4xl sm:text-5xl text-[#F5F1EA] leading-[1.08]">
                Curate Your{' '}
                <span className="italic font-normal text-[#B89A72]">
                  Signature Vibe
                </span>
              </h2>
              <p className="body-copy text-sm sm:text-base text-[#E8E0D5]/85 leading-relaxed">
                Select a collection and mood to reveal tailored 50ml Eau de Parfum recommendations.
              </p>
            </div>

            {/* Collection Segmented Switcher */}
            <div className="inline-flex self-start lg:self-end rounded-full bg-[#F5F1EA]/[0.07] border border-[#B89A72]/40 p-1">
              {[
                { id: 'all', label: 'All Scents' },
                { id: 'men', label: 'For Him' },
                { id: 'women', label: 'For Her' },
              ].map((g) => {
                const isActive = selectedGender === g.id;
                return (
                  <button
                    key={g.id}
                    type="button"
                    onClick={() => setSelectedGender(g.id)}
                    className={`btn-text relative rounded-full px-4 sm:px-5 py-2.5 text-xs uppercase tracking-[0.14em] transition-colors duration-300 ${
                      isActive
                        ? 'text-[#292522]'
                        : 'text-[#F5F1EA]/85 hover:text-[#FFFFFF]'
                    }`}
                  >
                    {isActive && (
                      <motion.span
                        layoutId="vibeGenderPill"
                        transition={{ type: 'spring', stiffness: 400, damping: 32 }}
                        className="absolute inset-0 rounded-full bg-[#B89A72]"
                      />
                    )}
                    <span className="relative z-10">{g.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Mood Filter Bar + Active Context Link */}
          <div className="mt-7 flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex flex-wrap items-center gap-2.5">
              {MOODS.map((mood) => {
                const isActive = selectedMood === mood;
                return (
                  <button
                    key={mood}
                    type="button"
                    onClick={() => setSelectedMood(mood)}
                    className={`btn-text relative rounded-full px-4 sm:px-5 py-2.5 text-xs sm:text-[13px] transition-colors duration-300 border ${
                      isActive
                        ? 'border-[#F5F1EA] text-[#292522]'
                        : 'border-[#B89A72]/35 bg-[#F5F1EA]/[0.04] text-[#F5F1EA]/90 hover:border-[#B89A72] hover:text-[#FFFFFF]'
                    }`}
                  >
                    {isActive && (
                      <motion.span
                        layoutId="vibeMoodPill"
                        transition={{ type: 'spring', stiffness: 400, damping: 32 }}
                        className="absolute inset-0 rounded-full bg-[#F5F1EA]"
                      />
                    )}
                    <span className="relative z-10">{mood}</span>
                  </button>
                );
              })}
            </div>

            <Link
              to={
                selectedGender === 'men'
                  ? '/men'
                  : selectedGender === 'women'
                  ? '/women'
                  : '/shop'
              }
              className="nav-text shrink-0 self-start md:self-center text-xs uppercase tracking-[0.18em] text-[#B89A72] border-b border-[#B89A72]/70 pb-1 hover:text-[#F5F1EA] hover:border-[#F5F1EA] transition-colors"
            >
              View Full Selection →
            </Link>
          </div>

          {/* Animated Curated Recommendations Grid — Full max-w-7xl Alignment */}
          <AnimatePresence mode="wait">
            <motion.div
              key={`${selectedGender}-${selectedMood}`}
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              className="mt-9 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-7 lg:gap-8"
            >
              {recommendations.map((product, idx) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  index={idx}
                  variant="dark"
                />
              ))}
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      {/* 3. Verbatim Client Testimonials Across Pakistan — Warm Ivory (#F5F1EA) */}
      <section className="py-16 sm:py-20 bg-[#F5F1EA] overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-10 text-center space-y-3">
          <p className="luxury-eyebrow">Verified Impressions</p>
          <h2 className="heading-section text-4xl sm:text-5xl text-[#292522]">
            Loved Across Pakistan
          </h2>
          <p className="body-copy text-sm text-[#292522]/75">
            Real experiences from customers enjoying DiVibes Fragrances from morning to night.
          </p>
        </div>

        <div className="relative py-2">
          <div className="animate-marquee-slow gap-6 px-4">
            {[...allReviews, ...allReviews].map((rev, idx) => (
              <ReviewCard
                key={`${rev.author}-${idx}`}
                quote={rev.quote}
                author={rev.author}
                city={rev.city}
                product={rev.product}
                variant="light"
                className="w-[330px] sm:w-[390px] shrink-0"
              />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
