import React, { useEffect, useMemo, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import {
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Clock,
  Heart,
  Minus,
  Plus,
  RefreshCw,
  ShieldCheck,
  ShoppingBag,
  Sparkles,
  Star,
  Truck,
} from 'lucide-react';
import { PRODUCTS, formatPKR, getProductBySlug } from '../data/products';
import { BRAND_INFO } from '../data/siteData';
import { useStore } from '../context/StoreContext';
import ProductCard from '../components/ProductCard';
import ReviewCard from '../components/ReviewCard';

export default function ProductDetailPage() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const product = getProductBySlug(slug);
  const { addToCart, toggleWishlist, isInWishlist, showToast } = useStore();

  const [activeSlide, setActiveSlide] = useState(0); // 3-slot gallery: 0, 1, 2
  const [slot2Available, setSlot2Available] = useState(true);
  const [slot3Available, setSlot3Available] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [openAccordion, setOpenAccordion] = useState('story'); // 'story' | 'specs' | 'shipping' | 'question' | null

  // Local interactive Reviews & Questions state
  const [reviews, setReviews] = useState([]);
  const [reviewForm, setReviewForm] = useState({ name: '', rating: 5, comment: '' });
  const [questions, setQuestions] = useState([]);
  const [questionForm, setQuestionForm] = useState({ name: '', email: '', question: '' });

  useEffect(() => {
    setActiveSlide(0);
    setSlot2Available(true);
    setSlot3Available(true);
    setQuantity(1);
    setOpenAccordion('story');
  }, [slug]);

  const relatedProducts = useMemo(() => {
    if (!product) return [];
    return PRODUCTS.filter(
      (p) => p.gender === product.gender && p.id !== product.id
    ).slice(0, 4);
  }, [product]);

  if (!product) {
    return (
      <div className="min-h-[65vh] flex flex-col items-center justify-center text-center px-4 bg-[#F5F1EA]">
        <p className="luxury-eyebrow">404 · Fragrance Not Found</p>
        <h1 className="heading-section text-4xl text-[#292522] mt-2">
          We couldn’t locate that scent
        </h1>
        <Link to="/shop" className="btn-espresso mt-6">
          Return to All Fragrances
        </Link>
      </div>
    );
  }

  const wished = isInWishlist(product.id);

  const handleBuyNow = () => {
    addToCart(product.id, quantity, false);
    navigate('/checkout');
  };

  const handleReviewSubmit = (e) => {
    e.preventDefault();
    if (!reviewForm.name.trim() || !reviewForm.comment.trim()) return;
    setReviews((prev) => [
      {
        id: Date.now(),
        name: reviewForm.name,
        rating: reviewForm.rating,
        comment: reviewForm.comment,
        date: 'Just now',
      },
      ...prev,
    ]);
    setReviewForm({ name: '', rating: 5, comment: '' });
    showToast('Thank you — your review has been posted.');
  };

  const handleQuestionSubmit = (e) => {
    e.preventDefault();
    if (!questionForm.name.trim() || !questionForm.question.trim()) return;
    setQuestions((prev) => [
      {
        id: Date.now(),
        name: questionForm.name,
        question: questionForm.question,
        date: 'Just now',
      },
      ...prev,
    ]);
    setQuestionForm({ name: '', email: '', question: '' });
    showToast('Your question has been sent to DiVibes Concierge.');
  };

  const toggleAccordion = (key) => {
    setOpenAccordion((prev) => (prev === key ? null : key));
  };

  return (
    <div className="bg-[#F5F1EA] min-h-screen">
      {/* Clean Breadcrumb Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 pt-6 pb-4">
        <nav className="flex items-center gap-2 text-xs nav-text text-[#292522]/60">
          <Link to="/" className="hover:text-[#B89A72] transition-colors">
            Home
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-[#B89A72]" />
          <Link
            to={product.gender === 'men' ? '/men' : '/women'}
            className="hover:text-[#B89A72] transition-colors"
          >
            {product.category}
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-[#B89A72]" />
          <span className="text-[#292522] truncate">{product.name}</span>
        </nav>
      </div>

      {/* MAIN PRODUCT SECTION — Calm, Airy Luxury Split */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 pt-2 pb-16 sm:pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
          {/* LEFT: Clean Sticky 3-Slot Studio Gallery */}
          <div className="lg:col-span-6 lg:sticky lg:top-28 space-y-4">
            {/* Main Rounded Soft Stone (#E8E0D5) Image Stage */}
            <div className="relative group rounded-2xl overflow-hidden bg-[#E8E0D5] aspect-[3/4] max-h-[680px] w-full">
              <AnimatePresence mode="wait">
                {activeSlide === 0 && (
                  <motion.img
                    key="pdp-slide-0"
                    src={product.images[0]}
                    alt={product.fullTitle}
                    initial={{ opacity: 0, scale: 1.03 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                    className="w-full h-full object-cover"
                  />
                )}

                {activeSlide === 1 &&
                  (slot2Available ? (
                    <motion.img
                      key="pdp-slide-1-file"
                      src={product.images[1]}
                      alt={`${product.fullTitle} — View 2`}
                      onError={() => setSlot2Available(false)}
                      initial={{ opacity: 0, scale: 1.03 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.4 }}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <motion.div
                      key="pdp-slide-1-macro"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.4 }}
                      className="w-full h-full relative overflow-hidden bg-[#E8E0D5]"
                    >
                      <img
                        src={product.images[0]}
                        alt={`${product.name} Flacon Detail`}
                        className="w-full h-full object-cover scale-[1.48] translate-y-2"
                      />
                    </motion.div>
                  ))}

                {activeSlide === 2 &&
                  (slot3Available ? (
                    <motion.img
                      key="pdp-slide-2-file"
                      src={product.images[2]}
                      alt={`${product.fullTitle} — View 3`}
                      onError={() => setSlot3Available(false)}
                      initial={{ opacity: 0, scale: 1.03 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.4 }}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <motion.div
                      key="pdp-slide-2-notes"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.4 }}
                      className="w-full h-full p-8 sm:p-12 flex flex-col justify-between bg-[#292522] text-[#F5F1EA]"
                    >
                      <div className="flex items-center justify-between border-b border-[#B89A72]/35 pb-4">
                        <span className="luxury-eyebrow">Olfactory Dossier</span>
                        <span className="nav-text text-xs uppercase tracking-[0.18em] text-[#E8E0D5]/70">
                          {product.specs.size} · EDP
                        </span>
                      </div>

                      <div className="space-y-6 my-auto py-6">
                        <div>
                          <p className="luxury-eyebrow text-[10px]">Inspired By</p>
                          <p className="font-serif text-3xl sm:text-4xl text-[#F5F1EA] mt-1">
                            {product.specs.inspiration}
                          </p>
                        </div>

                        <div className="space-y-4">
                          {[
                            { label: 'Top Notes', items: product.pyramid.top },
                            { label: 'Heart Notes', items: product.pyramid.heart },
                            { label: 'Base Notes', items: product.pyramid.base },
                          ].map((tier) => (
                            <div
                              key={tier.label}
                              className="border-l-2 border-[#B89A72] pl-4 py-0.5"
                            >
                              <p className="luxury-eyebrow text-[10px]">
                                {tier.label}
                              </p>
                              <p className="font-serif text-xl text-[#F5F1EA] mt-0.5">
                                {tier.items.join(' · ')}
                              </p>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="pt-4 border-t border-[#B89A72]/35 flex items-center justify-between text-xs body-copy text-[#E8E0D5]/75">
                        <span>Longevity: {product.specs.longevity}</span>
                        <span className="nav-text text-[#B89A72]">
                          DiVibes Fragrances
                        </span>
                      </div>
                    </motion.div>
                  ))}
              </AnimatePresence>

              {/* Subtle Hover Left/Right Gallery Arrows */}
              <button
                type="button"
                onClick={() => setActiveSlide((prev) => (prev + 2) % 3)}
                aria-label="Previous image"
                className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-[#FFFFFF]/90 text-[#292522] flex items-center justify-center shadow-md opacity-80 sm:opacity-0 sm:group-hover:opacity-100 hover:bg-[#292522] hover:text-[#F5F1EA] transition-all duration-300"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                type="button"
                onClick={() => setActiveSlide((prev) => (prev + 1) % 3)}
                aria-label="Next image"
                className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-[#FFFFFF]/90 text-[#292522] flex items-center justify-center shadow-md opacity-80 sm:opacity-0 sm:group-hover:opacity-100 hover:bg-[#292522] hover:text-[#F5F1EA] transition-all duration-300"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>

            {/* Clean 3-Slot Thumbnail Strip Below Main Image */}
            <div className="grid grid-cols-3 gap-3.5 max-w-sm">
              {[
                { idx: 0, label: 'Flacon' },
                { idx: 1, label: 'Detail' },
                { idx: 2, label: 'Notes' },
              ].map(({ idx, label }) => {
                const isSelected = activeSlide === idx;
                return (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setActiveSlide(idx)}
                    className={`relative rounded-xl aspect-[4/4] bg-[#E8E0D5] overflow-hidden border-2 transition-all duration-300 ${
                      isSelected
                        ? 'border-[#B89A72] opacity-100'
                        : 'border-transparent opacity-65 hover:opacity-100'
                    }`}
                  >
                    {idx === 0 && (
                      <img
                        src={product.images[0]}
                        alt={`${product.name} ${label}`}
                        className="w-full h-full object-cover"
                      />
                    )}
                    {idx === 1 &&
                      (slot2Available ? (
                        <img
                          src={product.images[1]}
                          alt={`${product.name} ${label}`}
                          onError={() => setSlot2Available(false)}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <img
                          src={product.images[0]}
                          alt={`${product.name} macro`}
                          className="w-full h-full object-cover scale-[1.55]"
                        />
                      ))}
                    {idx === 2 &&
                      (slot3Available ? (
                        <img
                          src={product.images[2]}
                          alt={`${product.name} ${label}`}
                          onError={() => setSlot3Available(false)}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full bg-[#292522] flex flex-col items-center justify-center text-[#F5F1EA] p-2">
                          <Sparkles className="w-4 h-4 text-[#B89A72] mb-1" />
                          <span className="nav-text text-[10px] uppercase tracking-[0.16em]">
                            Notes
                          </span>
                        </div>
                      ))}
                  </button>
                );
              })}
            </div>
          </div>

          {/* RIGHT: Uncluttered, Calm Luxury Buy Box */}
          <div className="lg:col-span-6 lg:pl-4 space-y-7">
            {/* Title, Price & Inspiration */}
            <div className="space-y-3 pb-6 border-b border-[#B89A72]/30">
              <div className="flex items-center justify-between gap-4">
                <span className="luxury-eyebrow">
                  {product.category} · {product.stockStatus}
                </span>

                <button
                  type="button"
                  onClick={() => toggleWishlist(product.id)}
                  aria-label="Save to wishlist"
                  className={`w-10 h-10 rounded-full border flex items-center justify-center transition-all duration-300 hover:scale-105 ${
                    wished
                      ? 'bg-[#292522] border-[#292522] text-[#B89A72]'
                      : 'bg-[#FFFFFF] border-[#B89A72]/40 text-[#292522] hover:border-[#292522]'
                  }`}
                >
                  <Heart className={`w-4 h-4 ${wished ? 'fill-[#B89A72]' : ''}`} />
                </button>
              </div>

              <div>
                <h1 className="heading-section text-4xl sm:text-5xl text-[#292522]">
                  {product.name}
                </h1>
                <p className="font-serif italic text-2xl sm:text-[26px] text-[#B89A72] mt-0.5">
                  {product.subtitle}
                </p>
              </div>

              <div className="flex flex-wrap items-center justify-between gap-4 pt-2">
                <div className="flex items-baseline gap-3">
                  <span className="price-text text-2xl sm:text-3xl text-[#292522]">
                    {formatPKR(product.price)}
                  </span>
                  <span className="body-copy text-xs text-[#292522]/60">
                    {product.specs.size} {product.specs.fragranceType}
                  </span>
                </div>

                <a
                  href="#pdp-reviews"
                  className="body-copy inline-flex items-center gap-1.5 text-xs text-[#292522]/70 hover:text-[#292522] transition-colors"
                >
                  <div className="flex items-center text-[#B89A72]">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-3.5 h-3.5 ${
                          reviews.length > 0 ? 'fill-[#B89A72]' : ''
                        }`}
                      />
                    ))}
                  </div>
                  <span>({reviews.length} reviews)</span>
                </a>
              </div>

              <p className="body-copy text-sm text-[#292522]/75 pt-1">
                Inspired by{' '}
                <span className="nav-text text-[#292522]">
                  {product.specs.inspiration}
                </span>
              </p>
            </div>

            {/* Clean, Breathable Summary Paragraph */}
            <p className="body-copy text-[15px] text-[#292522]/80 leading-[1.75]">
              {product.verbatimParagraphs[0]}
            </p>

            {/* Minimalist Typographic Scent Notes Strip (No Cluttered Nested Boxes) */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 py-5 border-y border-[#B89A72]/25">
              {[
                { tier: 'Top Notes', items: product.pyramid.top },
                { tier: 'Heart Notes', items: product.pyramid.heart },
                { tier: 'Base Notes', items: product.pyramid.base },
              ].map((row) => (
                <div key={row.tier}>
                  <p className="luxury-eyebrow text-[10px]">{row.tier}</p>
                  <p className="font-serif font-medium text-lg text-[#292522] mt-1 leading-snug">
                    {row.items.join(', ')}
                  </p>
                </div>
              ))}
            </div>

            {/* Modern Pill Purchase Controls */}
            <div className="space-y-3.5">
              <div className="flex items-center gap-3">
                <div className="inline-flex items-center justify-between bg-[#FFFFFF] border border-[#B89A72]/40 rounded-full px-2 py-1.5 w-32 shrink-0">
                  <button
                    type="button"
                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                    aria-label="Decrease quantity"
                    className="w-8 h-8 rounded-full flex items-center justify-center text-[#292522]/75 hover:bg-[#F5F1EA] hover:text-[#292522] transition-colors"
                  >
                    <Minus className="w-3.5 h-3.5" />
                  </button>
                  <span className="price-text text-sm text-[#292522]">
                    {quantity}
                  </span>
                  <button
                    type="button"
                    onClick={() => setQuantity((q) => q + 1)}
                    aria-label="Increase quantity"
                    className="w-8 h-8 rounded-full flex items-center justify-center text-[#292522]/75 hover:bg-[#F5F1EA] hover:text-[#292522] transition-colors"
                  >
                    <Plus className="w-3.5 h-3.5" />
                  </button>
                </div>

                <button
                  type="button"
                  onClick={() => addToCart(product.id, quantity, true)}
                  className="btn-text flex-1 inline-flex items-center justify-center gap-2.5 rounded-full bg-[#292522] text-[#F5F1EA] hover:bg-[#B89A72] hover:text-[#292522] py-4 px-6 text-xs uppercase tracking-[0.16em] transition-all duration-300 active:scale-[0.98]"
                >
                  <ShoppingBag className="w-4 h-4" />
                  Add To Cart
                </button>
              </div>

              <button
                type="button"
                onClick={handleBuyNow}
                className="btn-text w-full rounded-full bg-[#B89A72] text-[#292522] hover:bg-[#292522] hover:text-[#F5F1EA] py-4 px-6 text-xs uppercase tracking-[0.16em] transition-all duration-300 active:scale-[0.98]"
              >
                Buy It Now — {formatPKR(product.price * quantity)}
              </button>
            </div>

            {/* Subtle Inline Trust Row */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-1 text-xs body-copy text-[#292522]/75">
              <div className="flex items-center gap-2">
                <Truck className="w-4 h-4 text-[#B89A72] shrink-0" />
                <span>Free Delivery PK</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-[#B89A72] shrink-0" />
                <span>{product.specs.longevity}</span>
              </div>
              <div className="flex items-center gap-2 col-span-2 sm:col-span-1">
                <ShieldCheck className="w-4 h-4 text-[#B89A72] shrink-0" />
                <span>7-Day Easy Exchange</span>
              </div>
            </div>

            {/* Clean Luxury Accordions — Keeps Details Organized & Never Overcrowded */}
            <div className="pt-4 border-t border-[#B89A72]/30 divide-y divide-[#B89A72]/25">
              {/* Accordion 1: Fragrance Story */}
              <div>
                <button
                  type="button"
                  onClick={() => toggleAccordion('story')}
                  className="w-full py-4 flex items-center justify-between text-left group"
                >
                  <span className="nav-text text-xs uppercase tracking-[0.18em] text-[#292522] group-hover:text-[#B89A72] transition-colors">
                    Fragrance Story & Details
                  </span>
                  <ChevronDown
                    className={`w-4 h-4 text-[#B89A72] transition-transform duration-300 ${
                      openAccordion === 'story' ? 'rotate-180' : ''
                    }`}
                  />
                </button>
                <AnimatePresence initial={false}>
                  {openAccordion === 'story' && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <div className="pb-5 space-y-3 body-copy text-sm text-[#292522]/80 leading-relaxed">
                        {product.verbatimParagraphs.slice(1).map((para, i) => (
                          <p key={i}>{para}</p>
                        ))}
                        {product.verbatimParagraphs.length === 1 && (
                          <p>{product.verbatimParagraphs[0]}</p>
                        )}
                        {product.closingLine && (
                          <p className="font-serif italic text-lg text-[#292522] pt-1">
                            {product.closingLine}
                          </p>
                        )}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Accordion 2: Specifications */}
              <div>
                <button
                  type="button"
                  onClick={() => toggleAccordion('specs')}
                  className="w-full py-4 flex items-center justify-between text-left group"
                >
                  <span className="nav-text text-xs uppercase tracking-[0.18em] text-[#292522] group-hover:text-[#B89A72] transition-colors">
                    Specifications & Occasions
                  </span>
                  <ChevronDown
                    className={`w-4 h-4 text-[#B89A72] transition-transform duration-300 ${
                      openAccordion === 'specs' ? 'rotate-180' : ''
                    }`}
                  />
                </button>
                <AnimatePresence initial={false}>
                  {openAccordion === 'specs' && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <dl className="pb-5 space-y-2.5 text-sm">
                        {[
                          ['Fragrance Type', product.specs.fragranceType],
                          ['Size', product.specs.size],
                          ['Inspiration', product.specs.inspiration],
                          ['Key Notes', product.specs.keyNotes],
                          ['Occasions', product.specs.occasions],
                          ['Longevity', product.specs.longevity],
                        ].map(([label, val]) => (
                          <div
                            key={label}
                            className="grid grid-cols-3 gap-3 items-baseline"
                          >
                            <dt className="nav-text text-xs text-[#292522]/60">
                              {label}
                            </dt>
                            <dd className="col-span-2 body-copy text-[#292522]">
                              {val}
                            </dd>
                          </div>
                        ))}
                      </dl>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Accordion 3: Delivery & Exchange */}
              <div>
                <button
                  type="button"
                  onClick={() => toggleAccordion('shipping')}
                  className="w-full py-4 flex items-center justify-between text-left group"
                >
                  <span className="nav-text text-xs uppercase tracking-[0.18em] text-[#292522] group-hover:text-[#B89A72] transition-colors">
                    Delivery & 7-Day Exchange
                  </span>
                  <ChevronDown
                    className={`w-4 h-4 text-[#B89A72] transition-transform duration-300 ${
                      openAccordion === 'shipping' ? 'rotate-180' : ''
                    }`}
                  />
                </button>
                <AnimatePresence initial={false}>
                  {openAccordion === 'shipping' && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <div className="pb-5 space-y-2.5 body-copy text-sm text-[#292522]/80 leading-relaxed">
                        <p>
                          <strong className="nav-text text-[#292522]">
                            Free Nationwide Delivery:
                          </strong>{' '}
                          Delivered within {product.estimatedDelivery}. Cash on
                          Delivery & Direct Bank Transfer available.
                        </p>
                        <p>
                          <strong className="nav-text text-[#292522]">
                            7-Day Exchange Policy:
                          </strong>{' '}
                          Exchange within 7 days of delivery if at least 90% of the
                          perfume remains unused. Damaged or incorrect items are
                          replaced at our cost.
                        </p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Accordion 4: Ask a Question */}
              <div>
                <button
                  type="button"
                  onClick={() => toggleAccordion('question')}
                  className="w-full py-4 flex items-center justify-between text-left group"
                >
                  <span className="nav-text text-xs uppercase tracking-[0.18em] text-[#292522] group-hover:text-[#B89A72] transition-colors">
                    Ask a Question {questions.length > 0 && `(${questions.length})`}
                  </span>
                  <ChevronDown
                    className={`w-4 h-4 text-[#B89A72] transition-transform duration-300 ${
                      openAccordion === 'question' ? 'rotate-180' : ''
                    }`}
                  />
                </button>
                <AnimatePresence initial={false}>
                  {openAccordion === 'question' && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <div className="pb-5 space-y-4">
                        {questions.map((q) => (
                          <div
                            key={q.id}
                            className="rounded-xl bg-[#FFFFFF] border border-[#B89A72]/25 p-3.5 text-xs space-y-1"
                          >
                            <p className="nav-text text-[#292522]">
                              Q: {q.question}
                            </p>
                            <p className="body-copy text-[#292522]/55">
                              {q.name} · {q.date}
                            </p>
                          </div>
                        ))}
                        <form onSubmit={handleQuestionSubmit} className="space-y-3">
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            <input
                              type="text"
                              required
                              placeholder="Your Name *"
                              value={questionForm.name}
                              onChange={(e) =>
                                setQuestionForm((f) => ({
                                  ...f,
                                  name: e.target.value,
                                }))
                              }
                              className="body-copy rounded-xl bg-[#FFFFFF] border border-[#B89A72]/35 px-3.5 py-2.5 text-xs text-[#292522] focus:outline-none focus:border-[#B89A72]"
                            />
                            <input
                              type="email"
                              required
                              placeholder="Your Email *"
                              value={questionForm.email}
                              onChange={(e) =>
                                setQuestionForm((f) => ({
                                  ...f,
                                  email: e.target.value,
                                }))
                              }
                              className="body-copy rounded-xl bg-[#FFFFFF] border border-[#B89A72]/35 px-3.5 py-2.5 text-xs text-[#292522] focus:outline-none focus:border-[#B89A72]"
                            />
                          </div>
                          <textarea
                            rows={2}
                            required
                            placeholder={`Ask about ${product.name}...`}
                            value={questionForm.question}
                            onChange={(e) =>
                              setQuestionForm((f) => ({
                                ...f,
                                question: e.target.value,
                              }))
                            }
                            className="body-copy w-full rounded-xl bg-[#FFFFFF] border border-[#B89A72]/35 px-3.5 py-2.5 text-xs text-[#292522] focus:outline-none focus:border-[#B89A72]"
                          />
                          <div className="flex flex-wrap items-center gap-3">
                            <button
                              type="submit"
                              className="btn-text rounded-full bg-[#292522] text-[#F5F1EA] hover:bg-[#B89A72] hover:text-[#292522] px-6 py-2.5 text-[11px] uppercase tracking-[0.16em] transition-colors"
                            >
                              Send Question
                            </button>
                            <a
                              href={BRAND_INFO.whatsappLink}
                              target="_blank"
                              rel="noreferrer"
                              className="nav-text text-xs text-[#B89A72] hover:text-[#292522] transition-colors"
                            >
                              Or chat on WhatsApp →
                            </a>
                          </div>
                        </form>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* DEDICATED CUSTOMER REVIEWS SECTION — Deep Espresso (#292522) */}
      <section
        id="pdp-reviews"
        className="py-16 sm:py-20 bg-[#292522] text-[#F5F1EA] border-y border-[#B89A72]/30"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            <div className="lg:col-span-6 space-y-5">
              <div className="flex items-center justify-between">
                <div>
                  <p className="luxury-eyebrow">Patron Feedback</p>
                  <h2 className="font-serif font-medium text-3xl sm:text-4xl text-[#F5F1EA] mt-1">
                    Customer Reviews
                  </h2>
                </div>
                <span className="rounded-full border border-[#B89A72]/45 bg-[#B89A72]/15 px-3.5 py-1 text-[11px] nav-text text-[#B89A72]">
                  {reviews.length} {reviews.length === 1 ? 'Review' : 'Reviews'}
                </span>
              </div>

              {reviews.length === 0 ? (
                <div className="rounded-2xl bg-[#F5F1EA]/[0.05] border border-[#B89A72]/30 p-8 text-center space-y-2">
                  <div className="flex justify-center gap-1 text-[#B89A72]/60 mb-2">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4" />
                    ))}
                  </div>
                  <p className="font-serif text-2xl text-[#F5F1EA]">
                    Be the first to review {product.name}
                  </p>
                  <p className="body-copy text-xs sm:text-sm text-[#E8E0D5]/70">
                    Share your impression of the notes and 8–12 hour longevity.
                  </p>
                </div>
              ) : (
                <div className="space-y-4">
                  {reviews.map((r, idx) => (
                    <ReviewCard
                      key={r.id}
                      quote={r.comment}
                      author={r.name}
                      date={r.date}
                      rating={r.rating}
                      product={product.name}
                      variant="dark"
                      index={idx}
                    />
                  ))}
                </div>
              )}
            </div>

            <form
              onSubmit={handleReviewSubmit}
              className="lg:col-span-6 rounded-2xl bg-[#FFFFFF] border border-[#B89A72]/35 p-6 sm:p-8 space-y-5 shadow-luxury"
            >
              <div>
                <p className="luxury-eyebrow text-[10px]">Share Your Experience</p>
                <h3 className="heading-section text-3xl text-[#292522] mt-1">
                  Write a Review
                </h3>
              </div>

              <div>
                <label className="btn-text block text-xs uppercase tracking-wider text-[#292522]/75 mb-2">
                  Your Rating *
                </label>
                <div className="inline-flex items-center gap-1.5 bg-[#F5F1EA] border border-[#B89A72]/35 rounded-full px-3.5 py-2">
                  {[1, 2, 3, 4, 5].map((starVal) => (
                    <button
                      key={starVal}
                      type="button"
                      onClick={() =>
                        setReviewForm((f) => ({ ...f, rating: starVal }))
                      }
                      aria-label={`Rate ${starVal} stars`}
                      className="p-0.5 transition-transform duration-200 hover:scale-125"
                    >
                      <Star
                        className={`w-4 h-4 ${
                          starVal <= reviewForm.rating
                            ? 'fill-[#B89A72] text-[#B89A72]'
                            : 'text-[#292522]/25'
                        }`}
                      />
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="btn-text block text-xs uppercase tracking-wider text-[#292522]/75 mb-1.5">
                  Your Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Ashad from Karachi"
                  value={reviewForm.name}
                  onChange={(e) =>
                    setReviewForm((f) => ({ ...f, name: e.target.value }))
                  }
                  className="body-copy w-full rounded-xl bg-[#F5F1EA] border border-[#B89A72]/35 px-4 py-3 text-sm text-[#292522] placeholder:text-[#292522]/45 focus:outline-none focus:border-[#B89A72]"
                />
              </div>

              <div>
                <label className="btn-text block text-xs uppercase tracking-wider text-[#292522]/75 mb-1.5">
                  Your Impression *
                </label>
                <textarea
                  rows={3}
                  required
                  placeholder="Tell others about the scent profile, projection, and longevity..."
                  value={reviewForm.comment}
                  onChange={(e) =>
                    setReviewForm((f) => ({ ...f, comment: e.target.value }))
                  }
                  className="body-copy w-full rounded-xl bg-[#F5F1EA] border border-[#B89A72]/35 px-4 py-3 text-sm text-[#292522] placeholder:text-[#292522]/45 focus:outline-none focus:border-[#B89A72]"
                />
              </div>

              <button
                type="submit"
                className="btn-text w-full sm:w-auto rounded-full bg-[#292522] text-[#F5F1EA] hover:bg-[#B89A72] hover:text-[#292522] px-8 py-3.5 text-xs uppercase tracking-[0.16em] transition-all duration-300"
              >
                Submit Review
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* CURATED RELATED FRAGRANCES — Warm Ivory (#F5F1EA) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 py-16 sm:py-20">
        <div className="flex items-end justify-between mb-8">
          <div>
            <p className="luxury-eyebrow">Complementary Scents</p>
            <h2 className="heading-section text-3xl sm:text-4xl text-[#292522] mt-1">
              You May Also Like
            </h2>
          </div>
          <Link
            to={product.gender === 'men' ? '/men' : '/women'}
            className="nav-text text-xs uppercase tracking-[0.18em] text-[#292522] border-b border-[#292522] pb-0.5 hover:text-[#B89A72] hover:border-[#B89A72] transition-colors"
          >
            View All →
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {relatedProducts.map((rel, idx) => (
            <ProductCard key={rel.id} product={rel} index={idx} />
          ))}
        </div>
      </section>
    </div>
  );
}
