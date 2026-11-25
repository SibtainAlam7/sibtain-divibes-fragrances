import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Check } from 'lucide-react';
import { BRAND_INFO } from '../data/siteData';

const COLLECTION_LINKS = [
  { label: 'All Products', to: '/shop' },
  { label: 'Men', to: '/men' },
  { label: 'Women', to: '/women' },
];

const INFO_LINKS = [
  { label: 'About Us', to: '/about' },
  { label: 'Exchange Policy', to: '/exchange-policy' },
  { label: 'Blogs', to: '/blogs' },
  { label: 'Contact Us', to: '/contact' },
];

export default function Footer() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (!email.trim()) return;
    setSubscribed(true);
    setEmail('');
  };

  return (
    <footer className="bg-[#292522] text-[#F5F1EA] border-t border-[#B89A72]/40">
      {/* BAND 1: Compact JOIN THE INNER CIRCLE Newsletter Strip */}
      <div className="border-b border-[#B89A72]/35">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 py-5">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
            <h2 className="font-serif font-medium text-2xl sm:text-[26px] tracking-[0.06em] uppercase text-[#F5F1EA] shrink-0">
              JOIN THE INNER CIRCLE
            </h2>

            {subscribed ? (
              <div className="inline-flex items-center gap-2.5 border border-[#B89A72] px-4 py-2.5 text-xs nav-text tracking-[0.12em] uppercase text-[#B89A72]">
                <Check className="w-4 h-4" />
                Welcome to the DiVibes Inner Circle
              </div>
            ) : (
              <form
                onSubmit={handleSubscribe}
                className="flex flex-col sm:flex-row sm:items-end gap-4 w-full lg:max-w-xl"
              >
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="body-copy flex-1 bg-transparent border-b border-[#F5F1EA]/45 focus:border-[#B89A72] pb-2 pt-1 text-sm text-[#F5F1EA] placeholder:text-[#F5F1EA]/55 focus:outline-none transition-colors duration-300"
                />
                <button
                  type="submit"
                  className="btn-text rounded-none border border-[#F5F1EA]/75 bg-transparent text-[#F5F1EA] px-7 py-2.5 text-[11px] uppercase tracking-[0.22em] hover:bg-[#B89A72] hover:border-[#B89A72] hover:text-[#292522] transition-all duration-300 shrink-0"
                >
                  SUBSCRIBE
                </button>
              </form>
            )}
          </div>
        </div>
      </div>

      {/* BAND 2: Compact 4-Column Editorial Footer Grid */}
      <div className="border-b border-[#B89A72]/35">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 py-7 lg:py-9">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-8">
            {/* Column 1: OUR STORY */}
            <div className="lg:col-span-4 space-y-3">
              <p className="nav-text text-xs uppercase tracking-[0.2em] text-[#B89A72]">
                OUR STORY
              </p>

              <Link
                to="/"
                className="inline-block group focus:outline-none"
                aria-label="DiVibes Fragrances Home"
              >
                <img
                  src="/LOGO.svg"
                  alt="DiVibes Fragrances"
                  className="h-11 w-auto object-contain transition-transform duration-300 group-hover:scale-[1.03]"
                />
              </Link>

              <p className="body-copy text-xs sm:text-sm text-[#F5F1EA]/75 leading-relaxed max-w-xs">
                Premium quality perfume impressions crafted with fine oils for
                8–12 hours longevity. Luxury felt in every trail.
              </p>

              {/* Social Icons: Instagram, Facebook, WhatsApp */}
              <div className="flex items-center gap-4 pt-1">
                <a
                  href={BRAND_INFO.socials.instagram}
                  target="_blank"
                  rel="noreferrer"
                  aria-label="DiVibes Fragrances on Instagram"
                  className="text-[#F5F1EA]/85 hover:text-[#B89A72] hover:-translate-y-0.5 transition-all duration-300"
                >
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.75"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="w-5 h-5"
                    aria-hidden="true"
                  >
                    <rect x="2.5" y="2.5" width="19" height="19" rx="5" />
                    <circle cx="12" cy="12" r="4.2" />
                    <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
                  </svg>
                </a>

                <a
                  href={BRAND_INFO.socials.facebook}
                  target="_blank"
                  rel="noreferrer"
                  aria-label="DiVibes Fragrances on Facebook"
                  className="text-[#F5F1EA]/85 hover:text-[#B89A72] hover:-translate-y-0.5 transition-all duration-300"
                >
                  <svg
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="w-5 h-5"
                    aria-hidden="true"
                  >
                    <path d="M13.5 21v-7.5h2.55l.45-3H13.5V8.6c0-.87.24-1.46 1.49-1.46H16.6V4.45c-.28-.04-1.24-.12-2.36-.12-2.34 0-3.94 1.43-3.94 4.05V10.5H7.75v3h2.55V21h3.2z" />
                  </svg>
                </a>

                <a
                  href={BRAND_INFO.socials.whatsapp}
                  target="_blank"
                  rel="noreferrer"
                  aria-label="DiVibes Fragrances on WhatsApp"
                  className="text-[#F5F1EA]/85 hover:text-[#B89A72] hover:-translate-y-0.5 transition-all duration-300"
                >
                  <svg
                    viewBox="0 0 32 32"
                    fill="currentColor"
                    className="w-[21px] h-[21px]"
                    aria-hidden="true"
                  >
                    <path d="M16.004 2.667C8.64 2.667 2.667 8.64 2.667 16.004c0 2.352.615 4.648 1.783 6.671L2.667 29.333l6.827-1.751a13.28 13.28 0 0 0 6.51 1.703h.005c7.363 0 13.324-5.973 13.324-13.333 0-3.563-1.387-6.912-3.904-9.429a13.24 13.24 0 0 0-9.425-3.856zm7.749 18.893c-.325.917-1.915 1.755-2.64 1.861-.677.101-1.531.144-2.469-.155-.568-.181-1.301-.421-2.235-.827-3.931-1.696-6.496-5.653-6.693-5.915-.197-.261-1.6-2.128-1.6-4.059s1.013-2.88 1.373-3.275c.36-.395.787-.493 1.048-.493.261 0 .523.003.752.013.24.011.563-.091.88.672.325.784 1.109 2.715 1.205 2.912.096.197.16.427.032.688-.128.261-.192.427-.384.656-.192.229-.405.512-.579.688-.192.192-.392.4-.168.784.224.384.997 1.645 2.141 2.667 1.472 1.312 2.712 1.72 3.096 1.912.384.192.608.16.832-.096.224-.256.96-1.12 1.216-1.504.256-.384.512-.32.864-.192.352.128 2.235 1.056 2.619 1.248.384.192.64.288.736.448.096.16.096.928-.229 1.845z" />
                  </svg>
                </a>
              </div>
            </div>

            {/* Column 2: COLLECTIONS (All Products, Men, Women) */}
            <div className="lg:col-span-2 space-y-3">
              <p className="nav-text text-xs uppercase tracking-[0.2em] text-[#B89A72]">
                COLLECTIONS
              </p>
              <ul className="space-y-2">
                {COLLECTION_LINKS.map((item) => (
                  <li key={item.to}>
                    <Link
                      to={item.to}
                      className="body-copy inline-block text-sm text-[#F5F1EA]/85 hover:text-[#B89A72] hover:translate-x-1 transition-all duration-300"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Column 3: INFORMATION (Matches About Us, Exchange Policy, Blogs, Contact Us) */}
            <div className="lg:col-span-3 space-y-3">
              <p className="nav-text text-xs uppercase tracking-[0.2em] text-[#B89A72]">
                INFORMATION
              </p>
              <ul className="space-y-2">
                {INFO_LINKS.map((item) => (
                  <li key={item.to}>
                    <Link
                      to={item.to}
                      className="body-copy inline-block text-sm text-[#F5F1EA]/85 hover:text-[#B89A72] hover:translate-x-1 transition-all duration-300"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Column 4: VISIT US */}
            <div className="lg:col-span-3 space-y-3">
              <p className="nav-text text-xs uppercase tracking-[0.2em] text-[#B89A72]">
                VISIT US
              </p>
              <div className="space-y-0.5 body-copy text-sm text-[#F5F1EA]/85 leading-relaxed">
                <p>B-1-B/1 South Seaview Avenue,</p>
                <p>Phase 2, DHA, Karachi, Pakistan</p>
              </div>

              <div className="pt-1 space-y-1.5 flex flex-col items-start">
                <a
                  href={BRAND_INFO.whatsappLink}
                  target="_blank"
                  rel="noreferrer"
                  className="body-copy inline-block text-sm text-[#F5F1EA]/85 hover:text-[#B89A72] hover:translate-x-1 transition-all duration-300"
                >
                  WhatsApp: {BRAND_INFO.phone}
                </a>
                <a
                  href={`mailto:${BRAND_INFO.email}`}
                  className="body-copy inline-block text-sm text-[#F5F1EA]/85 hover:text-[#B89A72] hover:translate-x-1 transition-all duration-300"
                >
                  {BRAND_INFO.email}
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* BAND 3: Clean Centered Copyright Bar */}
      <div className="max-w-7xl mx-auto px-6 lg:px-12 py-4">
        <p className="body-copy text-xs text-center text-[#F5F1EA]/70">
          {BRAND_INFO.copyright}
        </p>
      </div>

      {/* Floating Official Green WhatsApp Button — clean circular icon on mobile, full pill on desktop */}
      <a
        href={BRAND_INFO.whatsappLink}
        target="_blank"
        rel="noreferrer"
        aria-label="Contact on WhatsApp"
        className="btn-text fixed bottom-5 right-5 z-30 group inline-flex items-center justify-center md:gap-2.5 w-12 h-12 md:w-auto md:h-auto rounded-full bg-[#25D366] text-white md:pl-3.5 md:pr-4 md:py-2.5 shadow-luxury-lg hover:bg-[#1ebe5d] hover:scale-[1.03] transition-all duration-300"
      >
        <svg
          viewBox="0 0 32 32"
          fill="currentColor"
          className="w-6 h-6 md:w-5 md:h-5 shrink-0"
          aria-hidden="true"
        >
          <path d="M16.004 2.667C8.64 2.667 2.667 8.64 2.667 16.004c0 2.352.615 4.648 1.783 6.671L2.667 29.333l6.827-1.751a13.28 13.28 0 0 0 6.51 1.703h.005c7.363 0 13.324-5.973 13.324-13.333 0-3.563-1.387-6.912-3.904-9.429a13.24 13.24 0 0 0-9.425-3.856zm7.749 18.893c-.325.917-1.915 1.755-2.64 1.861-.677.101-1.531.144-2.469-.155-.568-.181-1.301-.421-2.235-.827-3.931-1.696-6.496-5.653-6.693-5.915-.197-.261-1.6-2.128-1.6-4.059s1.013-2.88 1.373-3.275c.36-.395.787-.493 1.048-.493.261 0 .523.003.752.013.24.011.563-.091.88.672.325.784 1.109 2.715 1.205 2.912.096.197.16.427.032.688-.128.261-.192.427-.384.656-.192.229-.405.512-.579.688-.192.192-.392.4-.168.784.224.384.997 1.645 2.141 2.667 1.472 1.312 2.712 1.72 3.096 1.912.384.192.608.16.832-.096.224-.256.96-1.12 1.216-1.504.256-.384.512-.32.864-.192.352.128 2.235 1.056 2.619 1.248.384.192.64.288.736.448.096.16.096.928-.229 1.845z" />
        </svg>
        <span className="hidden md:inline text-xs tracking-wide">
          Contact on WhatsApp
        </span>
      </a>
    </footer>
  );
}
