import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  ArrowRight,
  Calendar,
  Check,
  Clock,
  Mail,
  MapPin,
  MessageCircle,
  RefreshCw,
  ShieldCheck,
  ShoppingBag,
  Sparkles,
  Tag,
  User,
} from 'lucide-react';
import {
  ABOUT_US_COPY,
  BLOG_POSTS,
  BRAND_INFO,
  CONTACT_COPY,
  EXCHANGE_POLICY_COPY,
} from '../data/siteData';
import { formatPKR, getProductBySlug } from '../data/products';
import { useStore } from '../context/StoreContext';

/* ============================================================================
   1. ABOUT US PAGE (/about) — Editorial Magazine Storytelling
   ============================================================================ */
export function AboutPage() {
  const featured = getProductBySlug('tuscany-noir-men');

  return (
    <div className="bg-[#F5F1EA] min-h-screen text-[#292522]">
      {/* Hero Band — Deep Espresso (#292522) */}
      <section className="py-16 sm:py-20 bg-[#292522] text-[#F5F1EA] border-b border-[#B89A72]/35">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-10 text-center space-y-4">
          <p className="luxury-eyebrow">Divine Vibes · Our Philosophy</p>
          <h1 className="font-serif font-medium text-5xl sm:text-6xl leading-[1.06] text-[#F5F1EA]">
            {ABOUT_US_COPY.heading}
          </h1>
          <p className="font-serif italic text-2xl sm:text-3xl text-[#B89A72] max-w-2xl mx-auto pt-1">
            “Luxury should be felt, not just seen — and never with a luxury price tag.”
          </p>
        </div>
      </section>

      {/* Asymmetrical Editorial Story Split — Warm Ivory (#F5F1EA) */}
      <section className="py-16 sm:py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Sculptural Visual */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.65 }}
            className="lg:col-span-5"
          >
            <div className="relative rounded-2xl overflow-hidden bg-[#E8E0D5] aspect-[3/4] max-w-md mx-auto shadow-luxury">
              <img
                src={featured?.images[0] || '/products/Tuscany%20Noir%201.webp'}
                alt="DiVibes Fragrances Craftsmanship"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-x-4 bottom-4 rounded-xl bg-[#292522]/90 backdrop-blur-md border border-[#B89A72]/35 px-4 py-3 flex items-center justify-between text-xs">
                <span className="nav-text uppercase tracking-[0.16em] text-[#B89A72]">
                  Divine Vibes
                </span>
                <span className="body-copy text-[#F5F1EA]/90">
                  Karachi, Pakistan
                </span>
              </div>
            </div>
          </motion.div>

          {/* Right Clean Editorial Copy (No Clunky Box) */}
          <div className="lg:col-span-7 space-y-6">
            <p className="luxury-eyebrow">Crafted Without Compromise</p>
            <h2 className="heading-section text-3xl sm:text-5xl text-[#292522]">
              Not Just Smelling Good —{' '}
              <span className="italic font-normal text-[#B89A72]">
                Feeling Unforgettable.
              </span>
            </h2>

            <div className="space-y-5 pt-2">
              {ABOUT_US_COPY.paragraphs.map((p, idx) => (
                <motion.p
                  key={idx}
                  initial={{ opacity: 0, y: 14 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.07 }}
                  className="body-copy text-[15px] sm:text-base text-[#292522]/80 leading-[1.8]"
                >
                  {p}
                </motion.p>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Craftsmanship Pillars — Deep Espresso (#292522) */}
      <section className="py-16 sm:py-20 bg-[#292522] text-[#F5F1EA] border-t border-[#B89A72]/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                stat: '99%',
                title: 'Iconic Scent Similarity',
                desc: 'Faithful impressions capturing the exact character, feel, and sophistication of world-renowned scents.',
              },
              {
                stat: '8–12h',
                title: 'Outdoor Longevity',
                desc: 'Formulated with expert-recommended fine oil concentrations that linger effortlessly from morning to night.',
              },
              {
                stat: '50ml',
                title: 'Eau de Parfum',
                desc: 'Every bottle is crafted with premium-grade ingredients — accessible luxury without compromise.',
              },
            ].map((item, idx) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="rounded-2xl bg-[#F5F1EA]/[0.05] border border-[#B89A72]/30 p-7 sm:p-8 space-y-3 hover:border-[#B89A72] transition-colors duration-300"
              >
                <p className="font-serif font-medium text-5xl text-[#B89A72]">
                  {item.stat}
                </p>
                <h3 className="nav-text text-xs uppercase tracking-[0.18em] text-[#F5F1EA]">
                  {item.title}
                </h3>
                <p className="body-copy text-sm text-[#E8E0D5]/75 leading-relaxed">
                  {item.desc}
                </p>
              </motion.div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <Link
              to="/shop"
              className="btn-text inline-flex items-center gap-2.5 rounded-full bg-[#B89A72] text-[#292522] hover:bg-[#F5F1EA] px-8 py-4 text-xs uppercase tracking-[0.18em] transition-all duration-300"
            >
              Explore All 18 Fragrances
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

/* ============================================================================
   2. EXCHANGE POLICY PAGE (/exchange-policy) — Clear 3-Step Client Assurance
   ============================================================================ */
export function ExchangePolicyPage() {
  const icons = [Sparkles, Clock, ShieldCheck];
  const badges = ['≥ 90% Unused · 7 Days', '3–7 Working Days', '100% Covered By Us'];

  return (
    <div className="bg-[#F5F1EA] min-h-screen text-[#292522]">
      {/* Hero Band — Deep Espresso (#292522) */}
      <section className="py-16 sm:py-20 bg-[#292522] text-[#F5F1EA] border-b border-[#B89A72]/35 text-center px-4">
        <div className="max-w-3xl mx-auto space-y-4">
          <p className="luxury-eyebrow">Client Assurance</p>
          <h1 className="font-serif font-medium text-4xl sm:text-6xl text-[#F5F1EA]">
            {EXCHANGE_POLICY_COPY.heading}
          </h1>
          <p className="body-copy text-sm sm:text-base text-[#E8E0D5]/80 max-w-xl mx-auto leading-relaxed">
            {EXCHANGE_POLICY_COPY.intro}
          </p>
        </div>
      </section>

      {/* 3-Step Visual Policy Cards */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-10 py-16 sm:py-20 space-y-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-7">
          {EXCHANGE_POLICY_COPY.rules.map((rule, idx) => {
            const Icon = icons[idx] || RefreshCw;
            return (
              <motion.div
                key={rule.number}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="group relative rounded-2xl bg-[#FFFFFF] border border-[#B89A72]/30 hover:border-[#B89A72] p-7 sm:p-8 flex flex-col justify-between shadow-luxury transition-all duration-500 hover:-translate-y-1"
              >
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute top-0 inset-x-8 h-[2px] bg-gradient-to-r from-transparent via-[#B89A72] to-transparent opacity-40 group-hover:opacity-100 transition-opacity duration-500"
                />

                <div>
                  <div className="flex items-center justify-between mb-6">
                    <span className="w-11 h-11 rounded-full bg-[#292522] text-[#B89A72] font-serif text-xl flex items-center justify-center">
                      {rule.number}
                    </span>
                    <Icon className="w-5 h-5 text-[#B89A72]" />
                  </div>

                  <span className="inline-block rounded-full bg-[#F5F1EA] border border-[#B89A72]/30 px-3 py-1 text-[10px] nav-text uppercase tracking-[0.14em] text-[#B89A72] mb-3">
                    {badges[idx]}
                  </span>

                  <h2 className="heading-section text-2xl sm:text-[26px] text-[#292522] mb-3">
                    {rule.title}
                  </h2>

                  <p className="body-copy text-sm text-[#292522]/80 leading-relaxed">
                    {rule.body}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Concierge Action Banner — Deep Espresso (#292522) Rounded Card */}
        <div className="rounded-2xl bg-[#292522] text-[#F5F1EA] border border-[#B89A72]/35 p-8 sm:p-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <p className="luxury-eyebrow">Need Assistance?</p>
            <h3 className="font-serif font-medium text-3xl text-[#F5F1EA]">
              Lodge an Exchange Request in Minutes
            </h3>
            <p className="body-copy text-xs sm:text-sm text-[#E8E0D5]/75 leading-relaxed">
              {EXCHANGE_POLICY_COPY.note}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <a
              href={BRAND_INFO.whatsappLink}
              target="_blank"
              rel="noreferrer"
              className="btn-text inline-flex items-center gap-2 rounded-full bg-[#B89A72] text-[#292522] hover:bg-[#F5F1EA] px-7 py-3.5 text-xs uppercase tracking-[0.16em] transition-all duration-300"
            >
              <MessageCircle className="w-4 h-4" />
              WhatsApp Support
            </a>
            <Link
              to="/contact"
              className="btn-text inline-flex items-center gap-2 rounded-full border border-[#B89A72]/50 text-[#F5F1EA] hover:border-[#B89A72] hover:text-[#B89A72] px-6 py-3.5 text-xs uppercase tracking-[0.16em] transition-all duration-300"
            >
              Contact Form
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

/* ============================================================================
   3. BLOGS / JOURNAL PAGE (/blogs) — Clean Editorial Reading Experience
   ============================================================================ */
export function BlogsPage() {
  const post = BLOG_POSTS[0];
  const relatedProduct = getProductBySlug(post.relatedProductSlug);
  const { addToCart, showToast } = useStore();
  const [comments, setComments] = useState([]);
  const [commentForm, setCommentForm] = useState({
    name: '',
    email: '',
    comment: '',
  });

  const handleComment = (e) => {
    e.preventDefault();
    if (!commentForm.name.trim() || !commentForm.comment.trim()) return;
    setComments((prev) => [
      ...prev,
      {
        id: Date.now(),
        name: commentForm.name,
        comment: commentForm.comment,
        date: 'Just now',
      },
    ]);
    setCommentForm({ name: '', email: '', comment: '' });
    showToast('Your comment has been published.');
  };

  return (
    <div className="bg-[#F5F1EA] min-h-screen text-[#292522]">
      {/* Editorial Article Header — Deep Espresso (#292522) */}
      <section className="py-16 sm:py-20 bg-[#292522] text-[#F5F1EA] border-b border-[#B89A72]/35 text-center px-4">
        <div className="max-w-4xl mx-auto space-y-4">
          <p className="luxury-eyebrow">The Fragrance Journal · {post.category}</p>
          <h1 className="font-serif font-medium text-4xl sm:text-5xl lg:text-6xl leading-[1.08] text-[#F5F1EA]">
            {post.title}
          </h1>
          <div className="pt-2 flex flex-wrap items-center justify-center gap-5 text-xs nav-text text-[#E8E0D5]/80">
            <span className="inline-flex items-center gap-1.5">
              <User className="w-3.5 h-3.5 text-[#B89A72]" />
              By {post.author}
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5 text-[#B89A72]" />
              {post.date}
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-[#B89A72]" />
              {post.readTime}
            </span>
          </div>
        </div>
      </section>

      {/* Reading Split Layout */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 py-14 sm:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Main Article Column */}
          <article className="lg:col-span-8 space-y-8">
            <div className="rounded-2xl overflow-hidden bg-[#E8E0D5] aspect-[16/10] shadow-luxury">
              <img
                src={post.image}
                alt={post.title}
                className="w-full h-full object-cover"
              />
            </div>

            <div className="space-y-6">
              {post.paragraphs.map((para, idx) => (
                <p
                  key={idx}
                  className="body-copy text-base sm:text-[17px] text-[#292522]/85 leading-[1.85]"
                >
                  {para}
                </p>
              ))}
            </div>

            {/* Editorial Pull-Quote */}
            <blockquote className="border-l-2 border-[#B89A72] pl-6 py-2 my-6">
              <p className="font-serif italic text-2xl sm:text-3xl text-[#292522] leading-snug">
                “Discover the art of timeless fragrance with a touch of luxury —
                crafted to linger for hours.”
              </p>
            </blockquote>

            {/* Tags */}
            <div className="pt-5 border-t border-[#B89A72]/30 flex flex-wrap items-center gap-2.5">
              <Tag className="w-4 h-4 text-[#B89A72]" />
              {post.tags.map((t) => (
                <span
                  key={t}
                  className="rounded-full px-3.5 py-1 bg-[#FFFFFF] border border-[#B89A72]/35 text-xs nav-text text-[#292522]/80"
                >
                  {t}
                </span>
              ))}
            </div>

            {/* Leave a Comment Card */}
            <div className="rounded-2xl bg-[#FFFFFF] border border-[#B89A72]/30 p-7 sm:p-9 shadow-luxury space-y-5">
              <div>
                <p className="luxury-eyebrow text-[10px]">Join the Conversation</p>
                <h2 className="heading-section text-3xl text-[#292522] mt-1">
                  Leave a Comment
                </h2>
                <p className="body-copy text-xs text-[#292522]/60 mt-1">
                  Your email address will not be published. Required fields are marked *
                </p>
              </div>

              {comments.length > 0 && (
                <div className="space-y-3">
                  {comments.map((c) => (
                    <div
                      key={c.id}
                      className="rounded-xl bg-[#F5F1EA] border border-[#B89A72]/25 p-4 space-y-1"
                    >
                      <div className="flex justify-between text-xs">
                        <strong className="btn-text text-[#292522]">{c.name}</strong>
                        <span className="body-copy text-[#292522]/55">{c.date}</span>
                      </div>
                      <p className="body-copy text-sm text-[#292522]/80">
                        {c.comment}
                      </p>
                    </div>
                  ))}
                </div>
              )}

              <form onSubmit={handleComment} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <input
                    type="text"
                    required
                    placeholder="Name *"
                    value={commentForm.name}
                    onChange={(e) =>
                      setCommentForm((f) => ({ ...f, name: e.target.value }))
                    }
                    className="body-copy rounded-xl bg-[#F5F1EA] border border-[#B89A72]/35 px-4 py-3 text-sm text-[#292522] placeholder:text-[#292522]/45 focus:outline-none focus:border-[#B89A72]"
                  />
                  <input
                    type="email"
                    required
                    placeholder="Email *"
                    value={commentForm.email}
                    onChange={(e) =>
                      setCommentForm((f) => ({ ...f, email: e.target.value }))
                    }
                    className="body-copy rounded-xl bg-[#F5F1EA] border border-[#B89A72]/35 px-4 py-3 text-sm text-[#292522] placeholder:text-[#292522]/45 focus:outline-none focus:border-[#B89A72]"
                  />
                </div>
                <textarea
                  rows={4}
                  required
                  placeholder="Comment *"
                  value={commentForm.comment}
                  onChange={(e) =>
                    setCommentForm((f) => ({ ...f, comment: e.target.value }))
                  }
                  className="body-copy w-full rounded-xl bg-[#F5F1EA] border border-[#B89A72]/35 px-4 py-3 text-sm text-[#292522] placeholder:text-[#292522]/45 focus:outline-none focus:border-[#B89A72]"
                />
                <button
                  type="submit"
                  className="btn-text rounded-full bg-[#292522] text-[#F5F1EA] hover:bg-[#B89A72] hover:text-[#292522] px-8 py-3.5 text-xs uppercase tracking-[0.16em] transition-all duration-300"
                >
                  Post Comment
                </button>
              </form>
            </div>
          </article>

          {/* Sticky Featured Fragrance Sidebar */}
          {relatedProduct && (
            <aside className="lg:col-span-4 lg:sticky lg:top-28 rounded-2xl bg-[#FFFFFF] border border-[#B89A72]/30 p-6 space-y-5 shadow-luxury">
              <p className="luxury-eyebrow">Featured In This Story</p>
              <Link
                to={`/product/${relatedProduct.slug}`}
                className="block rounded-xl aspect-[3/4] bg-[#E8E0D5] overflow-hidden"
              >
                <img
                  src={relatedProduct.images[0]}
                  alt={relatedProduct.fullTitle}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                />
              </Link>
              <div className="space-y-1.5">
                <h3 className="product-title text-2xl text-[#292522]">
                  {relatedProduct.fullTitle}
                </h3>
                <p className="price-text text-lg text-[#292522]">
                  {formatPKR(relatedProduct.price)}
                </p>
                <p className="body-copy text-xs text-[#292522]/70">
                  Inspired by {relatedProduct.specs.inspiration} · 8–12h Longevity
                </p>
              </div>
              <div className="space-y-2.5 pt-1">
                <button
                  type="button"
                  onClick={() => addToCart(relatedProduct.id, 1, true)}
                  className="btn-text w-full inline-flex items-center justify-center gap-2 rounded-full bg-[#292522] text-[#F5F1EA] hover:bg-[#B89A72] hover:text-[#292522] py-3.5 text-xs uppercase tracking-[0.16em] transition-all duration-300"
                >
                  <ShoppingBag className="w-4 h-4" />
                  Add To Cart
                </button>
                <Link
                  to={`/product/${relatedProduct.slug}`}
                  className="nav-text block text-center text-xs uppercase tracking-[0.16em] text-[#B89A72] hover:text-[#292522] py-1 transition-colors"
                >
                  Explore Full Details →
                </Link>
              </div>
            </aside>
          )}
        </div>
      </section>
    </div>
  );
}

/* ============================================================================
   4. CONTACT US PAGE (/contact) — Calm Luxury Concierge Experience
   ============================================================================ */
export function ContactPage() {
  const [form, setForm] = useState({ name: '', email: '', comment: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name.trim() || !form.email.trim() || !form.comment.trim()) return;
    setSubmitted(true);
    setForm({ name: '', email: '', comment: '' });
  };

  return (
    <div className="bg-[#F5F1EA] min-h-screen text-[#292522]">
      {/* Hero Band — Deep Espresso (#292522) */}
      <section className="py-16 sm:py-20 bg-[#292522] text-[#F5F1EA] border-b border-[#B89A72]/35 text-center px-4">
        <div className="max-w-3xl mx-auto space-y-4">
          <p className="luxury-eyebrow">Concierge & Inquiries</p>
          <h1 className="font-serif font-medium text-4xl sm:text-6xl text-[#F5F1EA]">
            {CONTACT_COPY.heading}
          </h1>
          <p className="body-copy text-sm sm:text-base text-[#E8E0D5]/80 max-w-2xl mx-auto leading-relaxed">
            {CONTACT_COPY.intro}
          </p>
        </div>
      </section>

      {/* Main Split Contact Experience */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-10 py-14 sm:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
          {/* Left: Clean Message Form Card */}
          <div className="lg:col-span-7 rounded-2xl bg-[#FFFFFF] border border-[#B89A72]/30 p-7 sm:p-10 shadow-luxury">
            <div className="mb-7">
              <p className="luxury-eyebrow text-[10px]">Direct Inquiry</p>
              <h2 className="heading-section text-3xl sm:text-4xl text-[#292522] mt-1">
                Send Us a Message
              </h2>
            </div>

            {submitted ? (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="rounded-xl p-6 bg-[#F5F1EA] border border-[#B89A72] space-y-3"
              >
                <div className="btn-text inline-flex items-center gap-2 text-[#B89A72] text-xs uppercase tracking-[0.18em]">
                  <Check className="w-4 h-4" />
                  Message Received
                </div>
                <p className="body-copy text-sm text-[#292522]/85 leading-relaxed">
                  Thank you for reaching out to DiVibes Fragrances. Our team member
                  will respond within 24 hours.
                </p>
                <button
                  type="button"
                  onClick={() => setSubmitted(false)}
                  className="nav-text text-xs uppercase tracking-[0.16em] text-[#292522] border-b border-[#292522] pb-0.5 hover:text-[#B89A72] hover:border-[#B89A72] transition-colors"
                >
                  Send another message
                </button>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="nav-text block text-xs uppercase tracking-[0.14em] text-[#292522]/75 mb-1.5">
                      Your Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Full Name"
                      value={form.name}
                      onChange={(e) =>
                        setForm((f) => ({ ...f, name: e.target.value }))
                      }
                      className="body-copy w-full rounded-xl bg-[#F5F1EA] border border-[#B89A72]/35 px-4 py-3.5 text-sm text-[#292522] placeholder:text-[#292522]/45 focus:outline-none focus:border-[#B89A72]"
                    />
                  </div>
                  <div>
                    <label className="nav-text block text-xs uppercase tracking-[0.14em] text-[#292522]/75 mb-1.5">
                      Your Email *
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="name@example.com"
                      value={form.email}
                      onChange={(e) =>
                        setForm((f) => ({ ...f, email: e.target.value }))
                      }
                      className="body-copy w-full rounded-xl bg-[#F5F1EA] border border-[#B89A72]/35 px-4 py-3.5 text-sm text-[#292522] placeholder:text-[#292522]/45 focus:outline-none focus:border-[#B89A72]"
                    />
                  </div>
                </div>

                <div>
                  <label className="nav-text block text-xs uppercase tracking-[0.14em] text-[#292522]/75 mb-1.5">
                    Comment *
                  </label>
                  <textarea
                    rows={5}
                    required
                    placeholder="Tell us how we can assist with your fragrance selection or order..."
                    value={form.comment}
                    onChange={(e) =>
                      setForm((f) => ({ ...f, comment: e.target.value }))
                    }
                    className="body-copy w-full rounded-xl bg-[#F5F1EA] border border-[#B89A72]/35 px-4 py-3.5 text-sm text-[#292522] placeholder:text-[#292522]/45 focus:outline-none focus:border-[#B89A72]"
                  />
                </div>

                <button
                  type="submit"
                  className="btn-text rounded-full bg-[#292522] text-[#F5F1EA] hover:bg-[#B89A72] hover:text-[#292522] px-9 py-4 text-xs uppercase tracking-[0.18em] transition-all duration-300 active:scale-[0.98]"
                >
                  Submit Now
                </button>
              </form>
            )}
          </div>

          {/* Right: Deep Espresso (#292522) Atelier Concierge Card */}
          <div className="lg:col-span-5 rounded-2xl bg-[#292522] text-[#F5F1EA] border border-[#B89A72]/35 p-7 sm:p-9 space-y-7 shadow-luxury">
            <div>
              <p className="luxury-eyebrow">Direct Concierge</p>
              <h3 className="font-serif font-medium text-3xl text-[#F5F1EA] mt-1">
                Ways To Reach Us
              </h3>
            </div>

            <div className="space-y-4">
              <a
                href={BRAND_INFO.whatsappLink}
                target="_blank"
                rel="noreferrer"
                className="group flex items-center justify-between rounded-xl p-4 bg-[#B89A72]/15 border border-[#B89A72]/45 hover:bg-[#B89A72] transition-all duration-300"
              >
                <div className="flex items-center gap-3.5">
                  <MessageCircle className="w-5 h-5 text-[#B89A72] group-hover:text-[#292522] transition-colors" />
                  <div>
                    <p className="nav-text text-[10px] uppercase tracking-[0.16em] text-[#B89A72] group-hover:text-[#292522]/80">
                      WhatsApp · Fastest Response
                    </p>
                    <p className="font-sans font-medium text-sm text-[#F5F1EA] group-hover:text-[#292522]">
                      {BRAND_INFO.phone}
                    </p>
                  </div>
                </div>
                <ArrowRight className="w-4 h-4 text-[#B89A72] group-hover:text-[#292522] group-hover:translate-x-1 transition-all" />
              </a>

              <a
                href={`mailto:${BRAND_INFO.email}`}
                className="group flex items-center justify-between rounded-xl p-4 bg-[#F5F1EA]/[0.05] border border-[#F5F1EA]/15 hover:border-[#B89A72] transition-all duration-300"
              >
                <div className="flex items-center gap-3.5 min-w-0">
                  <Mail className="w-5 h-5 text-[#B89A72] shrink-0" />
                  <div className="min-w-0">
                    <p className="nav-text text-[10px] uppercase tracking-[0.16em] text-[#E8E0D5]/60">
                      Official Email
                    </p>
                    <p className="nav-text text-sm text-[#F5F1EA] truncate">
                      {BRAND_INFO.email}
                    </p>
                  </div>
                </div>
                <ArrowRight className="w-4 h-4 text-[#E8E0D5]/50 group-hover:text-[#B89A72] group-hover:translate-x-1 transition-all shrink-0" />
              </a>
            </div>

            <div className="pt-6 border-t border-[#F5F1EA]/15 space-y-2">
              <p className="luxury-eyebrow text-[10px]">Karachi Address</p>
              <div className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-[#B89A72] shrink-0 mt-1" />
                <p className="body-copy text-sm text-[#E8E0D5]/85 leading-relaxed">
                  {BRAND_INFO.address}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
