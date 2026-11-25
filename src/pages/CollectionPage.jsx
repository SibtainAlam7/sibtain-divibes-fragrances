import React, { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  ArrowRight,
  Clock,
  Grid2x2,
  LayoutGrid,
  Search,
  ShieldCheck,
  ShoppingBag,
  SlidersHorizontal,
  Sparkles,
  Truck,
  X,
} from 'lucide-react';
import { PRODUCTS, formatPKR, getProductBySlug } from '../data/products';
import { CUSTOMER_REVIEWS } from '../data/siteData';
import ProductCard from '../components/ProductCard';
import ReviewCard from '../components/ReviewCard';
import { useStore } from '../context/StoreContext';

const MOOD_FILTERS = [
  'All Moods',
  'Office & Executive',
  'Evening & Date',
  'Fresh & Citrus',
  'Floral & Romantic',
  'Oud, Leather & Amber',
  'Woody & Earthy',
];

const PRICE_TIERS = [
  { id: 'all', label: 'All Prices' },
  { id: '3499', label: 'Rs 3,499' },
  { id: '3999', label: 'Rs 3,999' },
  { id: '4499', label: 'Rs 4,499' },
];

export default function CollectionPage({ presetGender = 'all' }) {
  const [genderFilter, setGenderFilter] = useState(presetGender);
  const [moodFilter, setMoodFilter] = useState('All Moods');
  const [priceFilter, setPriceFilter] = useState('all');
  const [sortBy, setSortBy] = useState('featured');
  const [query, setQuery] = useState('');
  const [gridCols, setGridCols] = useState(4); // 3 (editorial) | 4 (catalog)
  const { addToCart } = useStore();

  const isGenderCollection = presetGender === 'men' || presetGender === 'women';

  React.useEffect(() => {
    setGenderFilter(presetGender);
    setMoodFilter('All Moods');
    setPriceFilter('all');
    setQuery('');
  }, [presetGender]);

  const filtered = useMemo(() => {
    let list = PRODUCTS.filter((p) => {
      if (genderFilter !== 'all' && p.gender !== genderFilter) return false;
      if (moodFilter !== 'All Moods' && !p.moodTags.includes(moodFilter)) return false;
      if (priceFilter !== 'all' && String(p.price) !== priceFilter) return false;
      if (query.trim()) {
        const q = query.toLowerCase();
        return (
          p.fullTitle.toLowerCase().includes(q) ||
          p.specs.inspiration.toLowerCase().includes(q) ||
          p.specs.keyNotes.toLowerCase().includes(q)
        );
      }
      return true;
    });

    if (sortBy === 'price-asc') list = [...list].sort((a, b) => a.price - b.price);
    if (sortBy === 'price-desc') list = [...list].sort((a, b) => b.price - a.price);
    if (sortBy === 'name-asc')
      list = [...list].sort((a, b) => a.name.localeCompare(b.name));

    return list;
  }, [genderFilter, moodFilter, priceFilter, sortBy, query]);

  const hasActiveFilters =
    (!isGenderCollection && genderFilter !== 'all') ||
    moodFilter !== 'All Moods' ||
    priceFilter !== 'all' ||
    query.trim() !== '';

  const resetAllFilters = () => {
    setGenderFilter(presetGender);
    setMoodFilter('All Moods');
    setPriceFilter('all');
    setQuery('');
    setSortBy('featured');
  };

  /* ==========================================================================
     DEDICATED LUXURY /shop FLAGSHIP CATALOG EXPERIENCE
     ========================================================================== */
  if (!isGenderCollection) {
    return (
      <div className="bg-[#F5F1EA] min-h-screen text-[#292522]">
        {/* 1. Editorial Shop Header — Deep Espresso (#292522) */}
        <section className="py-12 sm:py-16 bg-[#292522] text-[#F5F1EA] border-b border-[#B89A72]/35">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10">
            <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8">
              <div className="space-y-3 max-w-2xl">
                <p className="luxury-eyebrow">The Complete Wardrobe · 18 Scents</p>
                <h1 className="font-serif font-medium text-4xl sm:text-5xl lg:text-6xl leading-[1.06] text-[#F5F1EA]">
                  Shop All{' '}
                  <span className="italic font-normal text-[#B89A72]">
                    Fragrances
                  </span>
                </h1>
                <p className="body-copy text-sm sm:text-[15px] text-[#E8E0D5]/80 leading-relaxed">
                  High-concentration 50ml Eau de Parfum impressions crafted with fine
                  oils for 8–12 hours longevity — delivered free across Pakistan.
                </p>
              </div>

              {/* Clean Segmented Gender Switcher */}
              <div className="inline-flex self-start lg:self-end rounded-full bg-[#F5F1EA]/[0.06] border border-[#B89A72]/35 p-1">
                {[
                  { id: 'all', label: 'All', count: 18 },
                  { id: 'men', label: 'Men', count: 10 },
                  { id: 'women', label: 'Women', count: 8 },
                ].map((g) => {
                  const active = genderFilter === g.id;
                  return (
                    <button
                      key={g.id}
                      type="button"
                      onClick={() => setGenderFilter(g.id)}
                      className={`btn-text relative rounded-full px-5 py-2.5 text-xs uppercase tracking-[0.14em] transition-colors duration-300 ${
                        active
                          ? 'text-[#292522]'
                          : 'text-[#E8E0D5]/80 hover:text-[#F5F1EA]'
                      }`}
                    >
                      {active && (
                        <motion.span
                          layoutId="shopGenderPill"
                          transition={{ type: 'spring', stiffness: 400, damping: 32 }}
                          className="absolute inset-0 rounded-full bg-[#B89A72]"
                        />
                      )}
                      <span className="relative z-10 inline-flex items-center gap-1.5">
                        <span>{g.label}</span>
                        <span
                          className={`text-[10px] ${
                            active ? 'text-[#292522]/75' : 'text-[#B89A72]'
                          }`}
                        >
                          {g.count}
                        </span>
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </section>

        {/* 2. Calm, Clutter-Free Toolbar & Filter Strip */}
        <section className="border-b border-[#B89A72]/25 bg-[#F5F1EA]/95 backdrop-blur-md sticky top-[64px] sm:top-[72px] z-30">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 py-4 space-y-3.5">
            {/* Top Controls Row */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-3.5">
              {/* Search + Result Count */}
              <div className="flex items-center gap-4 flex-1">
                <div className="relative flex-1 max-w-sm">
                  <Search className="w-4 h-4 text-[#B89A72] absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Search scent, note, or inspiration..."
                    className="body-copy w-full rounded-full bg-[#FFFFFF] border border-[#B89A72]/35 pl-10 pr-9 py-2.5 text-xs sm:text-sm text-[#292522] placeholder:text-[#292522]/45 focus:outline-none focus:border-[#B89A72] transition-colors"
                  />
                  {query && (
                    <button
                      type="button"
                      onClick={() => setQuery('')}
                      aria-label="Clear search"
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-[#292522]/45 hover:text-[#292522]"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>

                <span className="hidden sm:inline-block body-copy text-xs text-[#292522]/65 whitespace-nowrap">
                  <strong className="nav-text text-[#292522]">{filtered.length}</strong>{' '}
                  {filtered.length === 1 ? 'fragrance' : 'fragrances'}
                </span>
              </div>

              {/* Right Controls: Price Tiers + Sort + Grid Density */}
              <div className="flex flex-wrap items-center justify-between md:justify-end gap-2.5">
                {/* Price Tier Dropdown */}
                <div className="inline-flex items-center gap-2 rounded-full bg-[#FFFFFF] border border-[#B89A72]/35 px-3.5 py-2">
                  <span className="text-[11px] text-[#B89A72] nav-text uppercase tracking-wider">
                    Price
                  </span>
                  <select
                    value={priceFilter}
                    onChange={(e) => setPriceFilter(e.target.value)}
                    className="nav-text bg-transparent text-xs text-[#292522] focus:outline-none cursor-pointer"
                  >
                    {PRICE_TIERS.map((tier) => (
                      <option key={tier.id} value={tier.id}>
                        {tier.label}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Sort Dropdown */}
                <div className="inline-flex items-center gap-2 rounded-full bg-[#FFFFFF] border border-[#B89A72]/35 px-3.5 py-2">
                  <SlidersHorizontal className="w-3.5 h-3.5 text-[#B89A72]" />
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="nav-text bg-transparent text-xs text-[#292522] focus:outline-none cursor-pointer"
                  >
                    <option value="featured">Featured</option>
                    <option value="price-asc">Price: Low to High</option>
                    <option value="price-desc">Price: High to Low</option>
                    <option value="name-asc">Name: A–Z</option>
                  </select>
                </div>

                {/* Desktop Grid Density Toggle */}
                <div className="hidden lg:inline-flex items-center rounded-full bg-[#FFFFFF] border border-[#B89A72]/35 p-1">
                  <button
                    type="button"
                    onClick={() => setGridCols(3)}
                    aria-label="3 column editorial view"
                    className={`p-1.5 rounded-full transition-colors ${
                      gridCols === 3
                        ? 'bg-[#292522] text-[#F5F1EA]'
                        : 'text-[#292522]/55 hover:text-[#292522]'
                    }`}
                  >
                    <Grid2x2 className="w-3.5 h-3.5" />
                  </button>
                  <button
                    type="button"
                    onClick={() => setGridCols(4)}
                    aria-label="4 column catalog view"
                    className={`p-1.5 rounded-full transition-colors ${
                      gridCols === 4
                        ? 'bg-[#292522] text-[#F5F1EA]'
                        : 'text-[#292522]/55 hover:text-[#292522]'
                    }`}
                  >
                    <LayoutGrid className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>

            {/* Bottom Olfactory Mood Strip + Active Clear */}
            <div className="flex items-center justify-between gap-4">
              <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-0.5">
                {MOOD_FILTERS.map((mood) => {
                  const active = moodFilter === mood;
                  return (
                    <button
                      key={mood}
                      type="button"
                      onClick={() => setMoodFilter(mood)}
                      className={`btn-text rounded-full px-3.5 py-1.5 text-[11px] uppercase tracking-[0.12em] whitespace-nowrap border transition-all duration-300 ${
                        active
                          ? 'bg-[#292522] border-[#292522] text-[#F5F1EA]'
                          : 'bg-[#FFFFFF] border-[#B89A72]/30 text-[#292522]/75 hover:border-[#B89A72] hover:text-[#292522]'
                      }`}
                    >
                      {mood}
                    </button>
                  );
                })}
              </div>

              {hasActiveFilters && (
                <button
                  type="button"
                  onClick={resetAllFilters}
                  className="nav-text shrink-0 text-[11px] uppercase tracking-[0.14em] text-[#B89A72] hover:text-[#292522] transition-colors"
                >
                  Clear All
                </button>
              )}
            </div>
          </div>
        </section>

        {/* 3. Breathable Luxury Product Grid */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 py-12 sm:py-16">
          {filtered.length === 0 ? (
            <div className="rounded-2xl bg-[#FFFFFF] border border-[#B89A72]/30 p-14 text-center max-w-lg mx-auto space-y-4">
              <p className="heading-section text-3xl text-[#292522]">
                No matching fragrances
              </p>
              <p className="body-copy text-sm text-[#292522]/70">
                Adjust your search or clear active mood and price filters to view all
                18 DiVibes creations.
              </p>
              <button
                type="button"
                onClick={resetAllFilters}
                className="btn-text rounded-full bg-[#292522] text-[#F5F1EA] hover:bg-[#B89A72] hover:text-[#292522] px-7 py-3 text-xs uppercase tracking-[0.16em] transition-colors"
              >
                Show All 18 Scents
              </button>
            </div>
          ) : (
            <div
              className={`grid grid-cols-1 sm:grid-cols-2 gap-x-6 sm:gap-x-7 gap-y-10 sm:gap-y-12 ${
                gridCols === 3 ? 'lg:grid-cols-3' : 'md:grid-cols-3 lg:grid-cols-4'
              }`}
            >
              {filtered.map((product, idx) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  index={idx}
                  variant="light"
                />
              ))}
            </div>
          )}
        </section>

        {/* 4. Minimalist Service Assurance Bar */}
        <section className="border-t border-[#B89A72]/25 bg-[#F5F1EA]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 py-10 grid grid-cols-1 sm:grid-cols-3 gap-6 text-center sm:text-left">
            {[
              {
                icon: Truck,
                title: 'Free Nationwide Delivery',
                sub: 'Complimentary shipping on every order across Pakistan.',
              },
              {
                icon: Clock,
                title: '8–12 Hours Longevity',
                sub: 'High-concentration fine oils built for outdoor wear.',
              },
              {
                icon: ShieldCheck,
                title: '7-Day Easy Exchange',
                sub: 'Hassle-free exchange assurance with COD & Bank Transfer.',
              },
            ].map((item) => (
              <div
                key={item.title}
                className="flex flex-col sm:flex-row items-center sm:items-start gap-3.5"
              >
                <div className="w-10 h-10 rounded-full bg-[#FFFFFF] border border-[#B89A72]/35 flex items-center justify-center shrink-0">
                  <item.icon className="w-4 h-4 text-[#B89A72]" />
                </div>
                <div>
                  <p className="nav-text text-xs uppercase tracking-[0.14em] text-[#292522]">
                    {item.title}
                  </p>
                  <p className="body-copy text-xs text-[#292522]/70 mt-0.5 leading-relaxed">
                    {item.sub}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    );
  }

  /* ==========================================================================
     MEN (/men) & WOMEN (/women) DEDICATED COLLECTION PAGES
     ========================================================================== */
  const pageMeta =
    presetGender === 'men'
      ? {
          eyebrow: '10 Eau de Parfum Creations',
          title: "Men's Collection",
          desc: 'Commanding oud, crisp executive bergamot, smoky leather, and vibrant coastal citrus — crafted for 8–12 hours of refined masculine presence.',
          bestSeller: getProductBySlug('sacred-musk-men'),
          bestSellerHeading: "Men's Best Seller",
          reviews: CUSTOMER_REVIEWS.men,
        }
      : {
          eyebrow: '8 Eau de Parfum Creations',
          title: "Women's Collection",
          desc: 'Luminous florals, sparkling citrus, Madagascar vanilla, and timeless Parisian elegance — designed to linger gracefully from morning to evening.',
          bestSeller: getProductBySlug('floral-vibes-women'),
          bestSellerHeading: "Women's Best Seller",
          reviews: CUSTOMER_REVIEWS.women,
        };

  return (
    <div className="bg-[#F5F1EA] min-h-screen">
      {/* 1. Collection Hero Header — Deep Espresso (#292522) */}
      <section className="py-14 sm:py-20 border-b border-[#B89A72]/35 bg-[#292522] text-[#F5F1EA]">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
          <span className="inline-block px-3.5 py-1 bg-[#B89A72]/15 border border-[#B89A72]/50 luxury-eyebrow">
            {pageMeta.eyebrow}
          </span>
          <h1 className="font-serif font-medium text-4xl sm:text-6xl leading-[1.08] text-[#F5F1EA]">
            {pageMeta.title}
          </h1>
          <p className="body-copy text-sm sm:text-base text-[#E8E0D5]/85 leading-relaxed">
            {pageMeta.desc}
          </p>
        </div>
      </section>

      {/* 2. Editorial Best Seller Spotlight on Warm Ivory (#F5F1EA) */}
      {pageMeta.bestSeller && (
        <section className="py-14 sm:py-20 bg-[#F5F1EA]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
              className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center"
            >
              <div className="lg:col-span-5">
                <div className="relative group rounded-2xl overflow-hidden bg-[#E8E0D5] aspect-[3/4] max-w-md mx-auto">
                  <Link
                    to={`/product/${pageMeta.bestSeller.slug}`}
                    className="block w-full h-full"
                  >
                    <img
                      src={pageMeta.bestSeller.images[0]}
                      alt={pageMeta.bestSeller.fullTitle}
                      className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                    />
                  </Link>

                  <div className="absolute top-4 left-4 right-4 flex items-center justify-between gap-2 pointer-events-none">
                    <span className="btn-text inline-flex items-center gap-1.5 rounded-full bg-[#292522] text-[#F5F1EA] px-3.5 py-1.5 text-[10px] uppercase tracking-[0.18em]">
                      <Sparkles className="w-3 h-3 text-[#B89A72]" />
                      {pageMeta.bestSellerHeading}
                    </span>
                    <span className="nav-text inline-flex items-center gap-1 rounded-full bg-[#FFFFFF]/90 text-[#292522] px-3 py-1.5 text-[10px] uppercase tracking-[0.14em]">
                      <Clock className="w-3 h-3 text-[#B89A72]" />
                      8–12h
                    </span>
                  </div>
                </div>
              </div>

              <div className="lg:col-span-7 space-y-6">
                <div className="space-y-2.5">
                  <p className="luxury-eyebrow">
                    No. 01 Signature Icon · Inspired by{' '}
                    {pageMeta.bestSeller.specs.inspiration}
                  </p>
                  <h2 className="heading-section text-4xl sm:text-5xl lg:text-[54px] text-[#292522]">
                    {pageMeta.bestSeller.name} —{' '}
                    <span className="italic font-normal text-[#B89A72]">
                      {pageMeta.bestSeller.subtitle}
                    </span>
                  </h2>
                  <p className="price-text text-xl text-[#292522] pt-1">
                    {formatPKR(pageMeta.bestSeller.price)}{' '}
                    <span className="body-copy text-xs text-[#292522]/60 ml-1.5">
                      · {pageMeta.bestSeller.specs.size}{' '}
                      {pageMeta.bestSeller.specs.fragranceType} · Free Delivery
                    </span>
                  </p>
                </div>

                <p className="body-copy text-sm sm:text-base text-[#292522]/80 leading-relaxed max-w-2xl">
                  {pageMeta.bestSeller.verbatimParagraphs[0]}
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 pt-1">
                  {[
                    { label: 'Top Notes', list: pageMeta.bestSeller.pyramid.top },
                    { label: 'Heart Notes', list: pageMeta.bestSeller.pyramid.heart },
                    { label: 'Base Notes', list: pageMeta.bestSeller.pyramid.base },
                  ].map((tier) => (
                    <div
                      key={tier.label}
                      className="rounded-xl bg-[#FFFFFF] border border-[#B89A72]/30 p-4 hover:border-[#B89A72] transition-colors duration-300"
                    >
                      <p className="luxury-eyebrow text-[10px]">{tier.label}</p>
                      <p className="product-title text-lg text-[#292522] mt-1">
                        {tier.list.join(', ')}
                      </p>
                    </div>
                  ))}
                </div>

                <div className="flex flex-wrap items-center gap-4 pt-2">
                  <button
                    type="button"
                    onClick={() => addToCart(pageMeta.bestSeller.id, 1, true)}
                    className="btn-text inline-flex items-center gap-2.5 rounded-full bg-[#292522] text-[#F5F1EA] hover:bg-[#B89A72] hover:text-[#292522] px-8 py-4 text-xs uppercase tracking-[0.16em] transition-all duration-300 active:scale-[0.98]"
                  >
                    <ShoppingBag className="w-4 h-4" />
                    Add Best Seller — {formatPKR(pageMeta.bestSeller.price)}
                  </button>
                  <Link
                    to={`/product/${pageMeta.bestSeller.slug}`}
                    className="nav-text inline-flex items-center gap-2 text-xs uppercase tracking-[0.18em] text-[#292522] border-b border-[#292522] pb-1 hover:text-[#B89A72] hover:border-[#B89A72] transition-colors duration-300"
                  >
                    Explore Details
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            </motion.div>
          </div>
        </section>
      )}

      {/* 3. Dark Deep Espresso (#292522) Products Section */}
      <section className="py-14 sm:py-20 bg-[#292522] text-[#F5F1EA] border-y border-[#B89A72]/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 mb-8">
            <div>
              <p className="luxury-eyebrow">Curated Lineup</p>
              <h2 className="font-serif font-medium text-3xl sm:text-4xl text-[#F5F1EA] mt-1">
                Explore All {pageMeta.title}
              </h2>
            </div>
            <span className="body-copy text-xs text-[#E8E0D5]/70">
              Showing{' '}
              <strong className="nav-text text-[#B89A72]">
                {filtered.length}
              </strong>{' '}
              signature fragrances
            </span>
          </div>

          <div className="rounded-2xl p-4 sm:p-5 mb-10 space-y-4 bg-[#F5F1EA]/[0.05] border border-[#B89A72]/30">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
              <div className="relative flex-1 sm:max-w-xs">
                <Search className="w-4 h-4 text-[#B89A72] absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search by note or inspiration..."
                  className="body-copy w-full rounded-full pl-10 pr-4 py-2.5 text-xs bg-[#292522] border border-[#B89A72]/35 text-[#F5F1EA] placeholder:text-[#E8E0D5]/45 focus:outline-none focus:border-[#B89A72]"
                />
              </div>

              <div className="inline-flex items-center gap-2 rounded-full px-4 py-2 border border-[#B89A72]/35 bg-[#292522] self-start lg:self-auto">
                <SlidersHorizontal className="w-3.5 h-3.5 text-[#B89A72]" />
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="nav-text bg-transparent text-xs text-[#F5F1EA] focus:outline-none"
                >
                  <option value="featured" className="text-[#292522]">
                    Sort: Featured
                  </option>
                  <option value="price-asc" className="text-[#292522]">
                    Price: Low to High
                  </option>
                  <option value="price-desc" className="text-[#292522]">
                    Price: High to Low
                  </option>
                  <option value="name-asc" className="text-[#292522]">
                    Alphabetical: A–Z
                  </option>
                </select>
              </div>
            </div>

            <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pt-3 border-t border-[#F5F1EA]/12">
              {MOOD_FILTERS.map((mood) => {
                const active = moodFilter === mood;
                return (
                  <button
                    key={mood}
                    type="button"
                    onClick={() => setMoodFilter(mood)}
                    className={`btn-text rounded-full px-4 py-1.5 text-[11px] uppercase tracking-[0.12em] whitespace-nowrap border transition-all duration-300 ${
                      active
                        ? 'border-[#B89A72] bg-[#B89A72] text-[#292522]'
                        : 'border-[#B89A72]/30 bg-transparent text-[#E8E0D5]/80 hover:border-[#B89A72] hover:text-[#F5F1EA]'
                    }`}
                  >
                    {mood}
                  </button>
                );
              })}
            </div>
          </div>

          {filtered.length === 0 ? (
            <div className="rounded-2xl p-14 text-center space-y-4 border bg-[#F5F1EA]/[0.04] border-[#B89A72]/30">
              <p className="font-serif text-3xl text-[#F5F1EA]">
                No matching fragrances found
              </p>
              <p className="body-copy text-sm text-[#E8E0D5]/70">
                Try clearing your active search or selecting another olfactory mood.
              </p>
              <button
                type="button"
                onClick={resetAllFilters}
                className="btn-text rounded-full bg-[#B89A72] text-[#292522] px-7 py-3 text-xs uppercase tracking-[0.16em] hover:bg-[#F5F1EA] transition-colors"
              >
                Reset Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 sm:gap-7">
              {filtered.map((product, idx) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  index={idx}
                  variant="dark"
                />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* 4. Customers' Reviews Section — Light Warm Ivory (#F5F1EA) */}
      {pageMeta.reviews && (
        <section className="py-16 sm:py-20 bg-[#F5F1EA]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-xl mx-auto mb-12 space-y-2">
              <p className="luxury-eyebrow">Customers’ Reviews</p>
              <h2 className="heading-section text-3xl sm:text-4xl text-[#292522]">
                Patron Impressions
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-7">
              {pageMeta.reviews.map((rev, idx) => (
                <ReviewCard
                  key={rev.author}
                  quote={rev.quote}
                  author={rev.author}
                  city={rev.city}
                  product={rev.product}
                  variant="light"
                  index={idx}
                />
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
