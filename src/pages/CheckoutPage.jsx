import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import {
  ArrowLeft,
  ArrowRight,
  Banknote,
  Building2,
  Check,
  CheckCircle2,
  FileText,
  Lock,
  MessageCircle,
  Minus,
  Plus,
  RefreshCw,
  ShieldCheck,
  ShoppingBag,
  Tag,
  Trash2,
  Truck,
} from 'lucide-react';
import { formatPKR } from '../data/products';
import { BRAND_INFO, PAKISTAN_PROVINCES } from '../data/siteData';
import { useStore } from '../context/StoreContext';

const inputClasses =
  'body-copy w-full rounded-xl bg-[#F5F1EA] border border-[#E8E0D5] px-4 py-3 text-sm text-[#292522] placeholder:text-[#292522]/40 transition-all duration-200 focus:outline-none focus:bg-[#FFFFFF] focus:border-[#B89A72] focus:ring-2 focus:ring-[#B89A72]/20';

const labelClasses =
  'nav-text block text-[11px] uppercase tracking-[0.14em] text-[#292522]/75 mb-1.5';

export default function CheckoutPage() {
  const {
    cartItems,
    cartCount,
    cartSubtotal,
    updateCartQuantity,
    removeFromCart,
    clearCart,
  } = useStore();

  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    country: 'Pakistan',
    streetAddress: '',
    apartment: '',
    city: '',
    state: 'Sindh',
    postcode: '',
    phone: '',
    email: '',
    shipDifferent: false,
    shippingAddress: '',
    shippingCity: '',
    orderNote: '',
    paymentMethod: 'cod',
  });

  const [showNoteBox, setShowNoteBox] = useState(false);
  const [showCouponBox, setShowCouponBox] = useState(false);
  const [couponCode, setCouponCode] = useState('');
  const [couponMessage, setCouponMessage] = useState('');
  const [placedOrder, setPlacedOrder] = useState(null);

  const handleChange = (field) => (e) => {
    const val = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
    setForm((prev) => ({ ...prev, [field]: val }));
  };

  const handleApplyCoupon = (e) => {
    e.preventDefault();
    if (!couponCode.trim()) return;
    setCouponMessage(
      'Coupon checked — Complimentary Nationwide Delivery is already applied to your order.'
    );
  };

  const handlePlaceOrder = (e) => {
    e.preventDefault();
    if (cartItems.length === 0) return;

    const orderNumber = `DV-${Math.floor(100000 + Math.random() * 900000)}`;
    const snapshot = {
      orderNumber,
      items: cartItems,
      total: cartSubtotal,
      customer: form,
    };
    setPlacedOrder(snapshot);
    clearCart();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  /* ==========================================================================
     ORDER CONFIRMATION VIEW
     ========================================================================== */
  if (placedOrder) {
    const waText = encodeURIComponent(
      `Assalam-o-Alaikum DiVibes Fragrances! I have placed Order #${placedOrder.orderNumber}.\n` +
        `Name: ${placedOrder.customer.firstName} ${placedOrder.customer.lastName}\n` +
        `Address: ${placedOrder.customer.streetAddress}, ${placedOrder.customer.city}, ${placedOrder.customer.state}\n` +
        `Phone: ${placedOrder.customer.phone}\n` +
        `Items: ${placedOrder.items
          .map((i) => `${i.name} x${i.quantity}`)
          .join(', ')}\n` +
        `Total: ${formatPKR(placedOrder.total)} (${
          placedOrder.customer.paymentMethod === 'cod'
            ? 'Cash on delivery'
            : 'Direct bank transfer'
        })`
    );

    return (
      <div className="bg-[#F5F1EA] min-h-[82vh] pb-20 text-[#292522]">
        <section className="py-10 bg-[#292522] text-[#F5F1EA] border-b border-[#B89A72]/35">
          <div className="max-w-3xl mx-auto px-4 text-center">
            <p className="luxury-eyebrow">Order Confirmed · {placedOrder.orderNumber}</p>
            <h1 className="font-serif font-medium text-4xl sm:text-5xl text-[#F5F1EA] mt-2">
              Thank You, {placedOrder.customer.firstName}
            </h1>
          </div>
        </section>

        <div className="max-w-2xl mx-auto px-4 sm:px-6 -mt-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            className="bg-[#FFFFFF] rounded-2xl border border-[#E8E0D5] p-8 sm:p-11 shadow-luxury space-y-8"
          >
            <div className="text-center space-y-3">
              <motion.div
                initial={{ scale: 0.7, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.12, type: 'spring', stiffness: 260, damping: 20 }}
                className="w-16 h-16 rounded-full bg-[#F5F1EA] border border-[#B89A72]/45 flex items-center justify-center mx-auto"
              >
                <CheckCircle2 className="w-8 h-8 text-[#B89A72]" />
              </motion.div>
              <p className="body-copy text-sm sm:text-base text-[#292522]/75 max-w-md mx-auto leading-relaxed">
                Your DiVibes Fragrances order has been registered with{' '}
                <span className="nav-text text-[#292522]">
                  Free Nationwide Delivery
                </span>
                .
              </p>
            </div>

            {/* Shipping & Payment Snapshot */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 rounded-xl bg-[#F5F1EA] border border-[#E8E0D5] p-5 text-sm">
              <div className="space-y-1">
                <p className="nav-text text-[10px] uppercase tracking-[0.18em] text-[#B89A72]">
                  Delivering To
                </p>
                <p className="nav-text text-[#292522]">
                  {placedOrder.customer.firstName} {placedOrder.customer.lastName}
                </p>
                <p className="body-copy text-xs text-[#292522]/70 leading-relaxed">
                  {placedOrder.customer.streetAddress}
                  {placedOrder.customer.apartment
                    ? `, ${placedOrder.customer.apartment}`
                    : ''}
                  <br />
                  {placedOrder.customer.city}, {placedOrder.customer.state}{' '}
                  {placedOrder.customer.postcode}
                </p>
              </div>
              <div className="space-y-1 sm:border-l sm:border-[#E8E0D5] sm:pl-5">
                <p className="nav-text text-[10px] uppercase tracking-[0.18em] text-[#B89A72]">
                  Payment & Contact
                </p>
                <p className="nav-text text-[#292522]">
                  {placedOrder.customer.paymentMethod === 'cod'
                    ? 'Cash on Delivery'
                    : 'Direct Bank Transfer'}
                </p>
                <p className="body-copy text-xs text-[#292522]/70">
                  {placedOrder.customer.phone}
                  <br />
                  {placedOrder.customer.email}
                </p>
              </div>
            </div>

            {/* Itemized Receipt */}
            <div className="space-y-3">
              <p className="nav-text text-[11px] uppercase tracking-[0.18em] text-[#292522]/60">
                Order Items
              </p>
              <div className="divide-y divide-[#E8E0D5] border-y border-[#E8E0D5]">
                {placedOrder.items.map((item) => (
                  <div
                    key={item.id}
                    className="py-3.5 flex items-center justify-between gap-4"
                  >
                    <div className="flex items-center gap-3.5 min-w-0">
                      <div className="w-12 h-14 rounded-lg bg-[#E8E0D5] p-1 shrink-0 overflow-hidden">
                        <img
                          src={item.images[0]}
                          alt={item.name}
                          className="w-full h-full object-contain"
                        />
                      </div>
                      <div className="min-w-0">
                        <p className="font-serif font-medium text-lg text-[#292522] truncate">
                          {item.name}
                        </p>
                        <p className="body-copy text-xs text-[#292522]/60">
                          50ml EDP · Qty {item.quantity}
                        </p>
                      </div>
                    </div>
                    <span className="price-text text-sm text-[#292522] shrink-0">
                      {formatPKR(item.price * item.quantity)}
                    </span>
                  </div>
                ))}
              </div>

              <div className="pt-2 space-y-1.5 text-sm">
                <div className="flex justify-between text-[#292522]/70 body-copy">
                  <span>Shipping</span>
                  <span className="nav-text text-[#B89A72]">Free</span>
                </div>
                <div className="flex justify-between items-baseline pt-2">
                  <span className="nav-text text-base text-[#292522]">Total</span>
                  <span className="price-text text-2xl text-[#292522]">
                    {formatPKR(placedOrder.total)}
                  </span>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row justify-center gap-3 pt-2">
              <a
                href={`https://wa.me/${BRAND_INFO.whatsappNumber}?text=${waText}`}
                target="_blank"
                rel="noreferrer"
                className="btn-text inline-flex items-center justify-center gap-2 rounded-full bg-[#292522] text-[#F5F1EA] hover:bg-[#B89A72] hover:text-[#292522] px-7 py-3.5 text-xs uppercase tracking-[0.16em] transition-colors"
              >
                <MessageCircle className="w-4 h-4" />
                Confirm Fast Dispatch on WhatsApp
              </a>
              <Link
                to="/shop"
                className="btn-text inline-flex items-center justify-center gap-2 rounded-full border border-[#292522]/25 text-[#292522] hover:border-[#292522] px-7 py-3.5 text-xs uppercase tracking-[0.16em] transition-colors"
              >
                Continue Exploring
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    );
  }

  /* ==========================================================================
     MAIN CHECKOUT FLOW
     ========================================================================== */
  return (
    <div className="bg-[#F5F1EA] min-h-screen pb-24 text-[#292522]">
      {/* Focused Deep Espresso Header (#292522) */}
      <section className="py-10 sm:py-12 bg-[#292522] text-[#F5F1EA] border-b border-[#B89A72]/35">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <Link
              to="/shop"
              className="inline-flex items-center gap-2 nav-text text-xs uppercase tracking-[0.16em] text-[#E8E0D5]/80 hover:text-[#B89A72] transition-colors w-fit"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              Back to Collection
            </Link>

            <div className="md:text-center">
              <h1 className="font-serif font-medium text-4xl sm:text-5xl text-[#F5F1EA] leading-none">
                Checkout
              </h1>
              {/* Clean Step Indicator */}
              <div className="mt-3 flex flex-wrap md:justify-center items-center gap-3 text-[11px] nav-text uppercase tracking-[0.15em]">
                <span className="inline-flex items-center gap-1.5 text-[#B89A72]">
                  <span className="w-4 h-4 rounded-full bg-[#B89A72] text-[#292522] inline-flex items-center justify-center text-[10px]">
                    1
                  </span>
                  Details
                </span>
                <span className="text-[#E8E0D5]/30">·</span>
                <span className="inline-flex items-center gap-1.5 text-[#E8E0D5]/85">
                  <span className="w-4 h-4 rounded-full border border-[#B89A72]/60 text-[#B89A72] inline-flex items-center justify-center text-[10px]">
                    2
                  </span>
                  Payment
                </span>
                <span className="text-[#E8E0D5]/30">·</span>
                <span className="inline-flex items-center gap-1.5 text-[#E8E0D5]/45">
                  <span className="w-4 h-4 rounded-full border border-[#E8E0D5]/25 text-[#E8E0D5]/50 inline-flex items-center justify-center text-[10px]">
                    3
                  </span>
                  Confirmation
                </span>
              </div>
            </div>

            <div className="hidden md:inline-flex items-center gap-2 nav-text text-xs uppercase tracking-[0.15em] text-[#E8E0D5]/75">
              <Lock className="w-3.5 h-3.5 text-[#B89A72]" />
              Secure Checkout
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 pt-10 sm:pt-12">
        {cartItems.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-[#FFFFFF] rounded-2xl border border-[#E8E0D5] p-10 sm:p-14 text-center max-w-xl mx-auto space-y-5 shadow-luxury"
          >
            <div className="w-16 h-16 rounded-full bg-[#F5F1EA] border border-[#E8E0D5] flex items-center justify-center mx-auto">
              <ShoppingBag className="w-7 h-7 text-[#B89A72]" />
            </div>
            <div className="space-y-2">
              <h2 className="font-serif font-medium text-3xl sm:text-4xl text-[#292522]">
                Your bag is currently empty
              </h2>
              <p className="body-copy text-sm text-[#292522]/70 max-w-sm mx-auto leading-relaxed">
                Explore our 18 signature Eau de Parfum creations and add your favorites before checking out.
              </p>
            </div>
            <div className="flex flex-wrap justify-center gap-3 pt-2">
              <Link
                to="/shop"
                className="btn-text inline-flex items-center gap-2 rounded-full bg-[#292522] text-[#F5F1EA] hover:bg-[#B89A72] hover:text-[#292522] px-7 py-3.5 text-xs uppercase tracking-[0.16em] transition-colors"
              >
                Explore All Fragrances
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
              <Link
                to="/men"
                className="btn-text rounded-full border border-[#292522]/20 text-[#292522] hover:border-[#292522] px-6 py-3.5 text-xs uppercase tracking-[0.16em] transition-colors"
              >
                Men
              </Link>
              <Link
                to="/women"
                className="btn-text rounded-full border border-[#292522]/20 text-[#292522] hover:border-[#292522] px-6 py-3.5 text-xs uppercase tracking-[0.16em] transition-colors"
              >
                Women
              </Link>
            </div>
          </motion.div>
        ) : (
          <form
            onSubmit={handlePlaceOrder}
            className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start"
          >
            {/* LEFT COLUMN (7 cols): Contact, Delivery & Payment */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="lg:col-span-7 space-y-6"
            >
              {/* STEP 01: Contact Information */}
              <div className="bg-[#FFFFFF] rounded-2xl border border-[#E8E0D5] p-6 sm:p-8 shadow-sm space-y-5">
                <div className="flex items-center justify-between border-b border-[#E8E0D5] pb-4">
                  <div className="flex items-center gap-3">
                    <span className="w-7 h-7 rounded-full bg-[#292522] text-[#F5F1EA] nav-text text-xs flex items-center justify-center">
                      01
                    </span>
                    <h2 className="font-serif font-medium text-2xl sm:text-3xl text-[#292522]">
                      Contact Information
                    </h2>
                  </div>
                  <span className="body-copy text-xs text-[#292522]/50">
                    For order updates
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className={labelClasses}>Phone Number *</label>
                    <input
                      type="tel"
                      required
                      placeholder="+92 3XX XXXXXXX"
                      value={form.phone}
                      onChange={handleChange('phone')}
                      className={inputClasses}
                    />
                  </div>
                  <div>
                    <label className={labelClasses}>Email Address *</label>
                    <input
                      type="email"
                      required
                      placeholder="you@example.com"
                      value={form.email}
                      onChange={handleChange('email')}
                      className={inputClasses}
                    />
                  </div>
                </div>
              </div>

              {/* STEP 02: Delivery Address */}
              <div className="bg-[#FFFFFF] rounded-2xl border border-[#E8E0D5] p-6 sm:p-8 shadow-sm space-y-5">
                <div className="flex items-center justify-between border-b border-[#E8E0D5] pb-4">
                  <div className="flex items-center gap-3">
                    <span className="w-7 h-7 rounded-full bg-[#292522] text-[#F5F1EA] nav-text text-xs flex items-center justify-center">
                      02
                    </span>
                    <h2 className="font-serif font-medium text-2xl sm:text-3xl text-[#292522]">
                      Delivery Address
                    </h2>
                  </div>
                  <span className="nav-text text-[11px] uppercase tracking-[0.14em] text-[#B89A72]">
                    Free Nationwide Shipping
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className={labelClasses}>First Name *</label>
                    <input
                      type="text"
                      required
                      placeholder="First name"
                      value={form.firstName}
                      onChange={handleChange('firstName')}
                      className={inputClasses}
                    />
                  </div>
                  <div>
                    <label className={labelClasses}>Last Name *</label>
                    <input
                      type="text"
                      required
                      placeholder="Last name"
                      value={form.lastName}
                      onChange={handleChange('lastName')}
                      className={inputClasses}
                    />
                  </div>
                </div>

                <div>
                  <label className={labelClasses}>Country / Region *</label>
                  <select
                    value={form.country}
                    onChange={handleChange('country')}
                    className={inputClasses}
                  >
                    <option value="Pakistan">Pakistan</option>
                  </select>
                </div>

                <div className="space-y-3">
                  <label className={labelClasses}>Street Address *</label>
                  <input
                    type="text"
                    required
                    placeholder="House number, street name, block / sector"
                    value={form.streetAddress}
                    onChange={handleChange('streetAddress')}
                    className={inputClasses}
                  />
                  <input
                    type="text"
                    placeholder="Apartment, suite, landmark, etc. (optional)"
                    value={form.apartment}
                    onChange={handleChange('apartment')}
                    className={inputClasses}
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className={labelClasses}>Town / City *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Karachi"
                      value={form.city}
                      onChange={handleChange('city')}
                      className={inputClasses}
                    />
                  </div>
                  <div>
                    <label className={labelClasses}>Province *</label>
                    <select
                      value={form.state}
                      onChange={handleChange('state')}
                      className={inputClasses}
                    >
                      {PAKISTAN_PROVINCES.map((prov) => (
                        <option key={prov} value={prov}>
                          {prov}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className={labelClasses}>Postcode / ZIP *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. 75500"
                      value={form.postcode}
                      onChange={handleChange('postcode')}
                      className={inputClasses}
                    />
                  </div>
                </div>

                {/* Optional Ship to Different Address */}
                <div className="pt-2 border-t border-[#E8E0D5]/80">
                  <label className="inline-flex items-center gap-3 cursor-pointer select-none group">
                    <span
                      className={`w-5 h-5 rounded-md border flex items-center justify-center transition-colors ${
                        form.shipDifferent
                          ? 'bg-[#292522] border-[#292522] text-[#F5F1EA]'
                          : 'bg-[#F5F1EA] border-[#292522]/30 group-hover:border-[#B89A72]'
                      }`}
                    >
                      {form.shipDifferent && <Check className="w-3.5 h-3.5" />}
                    </span>
                    <input
                      type="checkbox"
                      checked={form.shipDifferent}
                      onChange={handleChange('shipDifferent')}
                      className="sr-only"
                    />
                    <span className="body-copy text-sm text-[#292522]/85">
                      Ship to a different address?
                    </span>
                  </label>

                  <AnimatePresence initial={false}>
                    {form.shipDifferent && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.25 }}
                        className="overflow-hidden"
                      >
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
                          <div>
                            <label className={labelClasses}>
                              Recipient Street Address *
                            </label>
                            <input
                              type="text"
                              required
                              placeholder="Recipient street address"
                              value={form.shippingAddress}
                              onChange={handleChange('shippingAddress')}
                              className={inputClasses}
                            />
                          </div>
                          <div>
                            <label className={labelClasses}>
                              Recipient Town / City *
                            </label>
                            <input
                              type="text"
                              required
                              placeholder="Recipient city"
                              value={form.shippingCity}
                              onChange={handleChange('shippingCity')}
                              className={inputClasses}
                            />
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>

              {/* STEP 03: Payment Method */}
              <div className="bg-[#FFFFFF] rounded-2xl border border-[#E8E0D5] p-6 sm:p-8 shadow-sm space-y-5">
                <div className="flex items-center justify-between border-b border-[#E8E0D5] pb-4">
                  <div className="flex items-center gap-3">
                    <span className="w-7 h-7 rounded-full bg-[#292522] text-[#F5F1EA] nav-text text-xs flex items-center justify-center">
                      03
                    </span>
                    <h2 className="font-serif font-medium text-2xl sm:text-3xl text-[#292522]">
                      Payment Method
                    </h2>
                  </div>
                  <span className="inline-flex items-center gap-1.5 body-copy text-xs text-[#292522]/55">
                    <ShieldCheck className="w-3.5 h-3.5 text-[#B89A72]" />
                    Safe & Verified
                  </span>
                </div>

                <div className="space-y-3">
                  {/* Cash on Delivery */}
                  <div
                    className={`rounded-xl border transition-all duration-200 overflow-hidden ${
                      form.paymentMethod === 'cod'
                        ? 'border-[#B89A72] bg-[#F5F1EA]/70 shadow-sm'
                        : 'border-[#E8E0D5] bg-[#FFFFFF] hover:border-[#B89A72]/50'
                    }`}
                  >
                    <label className="flex items-center justify-between p-4 sm:p-5 cursor-pointer">
                      <div className="flex items-center gap-3.5">
                        <span
                          className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-colors ${
                            form.paymentMethod === 'cod'
                              ? 'border-[#292522]'
                              : 'border-[#292522]/30'
                          }`}
                        >
                          {form.paymentMethod === 'cod' && (
                            <span className="w-2.5 h-2.5 rounded-full bg-[#292522]" />
                          )}
                        </span>
                        <input
                          type="radio"
                          name="paymentMethod"
                          value="cod"
                          checked={form.paymentMethod === 'cod'}
                          onChange={handleChange('paymentMethod')}
                          className="sr-only"
                        />
                        <div>
                          <span className="nav-text text-sm text-[#292522] block">
                            Cash on Delivery (COD)
                          </span>
                          <span className="body-copy text-xs text-[#292522]/60">
                            Most popular across Pakistan
                          </span>
                        </div>
                      </div>
                      <Banknote className="w-5 h-5 text-[#B89A72] shrink-0" />
                    </label>

                    <AnimatePresence initial={false}>
                      {form.paymentMethod === 'cod' && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.2 }}
                          className="overflow-hidden"
                        >
                          <p className="body-copy text-xs text-[#292522]/75 px-5 pb-4 pt-0 leading-relaxed border-t border-[#E8E0D5]/70 mt-1 pt-3">
                            Pay conveniently with cash at your doorstep when your DiVibes parcel arrives.
                          </p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                  {/* Direct Bank Transfer */}
                  <div
                    className={`rounded-xl border transition-all duration-200 overflow-hidden ${
                      form.paymentMethod === 'bacs'
                        ? 'border-[#B89A72] bg-[#F5F1EA]/70 shadow-sm'
                        : 'border-[#E8E0D5] bg-[#FFFFFF] hover:border-[#B89A72]/50'
                    }`}
                  >
                    <label className="flex items-center justify-between p-4 sm:p-5 cursor-pointer">
                      <div className="flex items-center gap-3.5">
                        <span
                          className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-colors ${
                            form.paymentMethod === 'bacs'
                              ? 'border-[#292522]'
                              : 'border-[#292522]/30'
                          }`}
                        >
                          {form.paymentMethod === 'bacs' && (
                            <span className="w-2.5 h-2.5 rounded-full bg-[#292522]" />
                          )}
                        </span>
                        <input
                          type="radio"
                          name="paymentMethod"
                          value="bacs"
                          checked={form.paymentMethod === 'bacs'}
                          onChange={handleChange('paymentMethod')}
                          className="sr-only"
                        />
                        <div>
                          <span className="nav-text text-sm text-[#292522] block">
                            Direct Bank Transfer
                          </span>
                          <span className="body-copy text-xs text-[#292522]/60">
                            IBFT / Online Banking
                          </span>
                        </div>
                      </div>
                      <Building2 className="w-5 h-5 text-[#B89A72] shrink-0" />
                    </label>

                    <AnimatePresence initial={false}>
                      {form.paymentMethod === 'bacs' && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.2 }}
                          className="overflow-hidden"
                        >
                          <p className="body-copy text-xs text-[#292522]/75 px-5 pb-4 leading-relaxed border-t border-[#E8E0D5]/70 mt-1 pt-3">
                            Make your payment directly into our bank account. Our team will share account details via WhatsApp/Email immediately upon order confirmation.
                          </p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* RIGHT COLUMN (5 cols): Sticky Order Summary */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
              className="lg:col-span-5 lg:sticky lg:top-28 space-y-5"
            >
              <div className="bg-[#FFFFFF] rounded-2xl border border-[#E8E0D5] p-6 sm:p-8 shadow-luxury space-y-6">
                <div className="flex items-center justify-between border-b border-[#E8E0D5] pb-4">
                  <h2 className="font-serif font-medium text-2xl sm:text-3xl text-[#292522]">
                    Order Summary
                  </h2>
                  <span className="nav-text text-xs px-3 py-1 rounded-full bg-[#F5F1EA] border border-[#E8E0D5] text-[#292522]">
                    {cartCount} {cartCount === 1 ? 'item' : 'items'}
                  </span>
                </div>

                {/* Cart Items List */}
                <div className="space-y-4 max-h-80 overflow-y-auto pr-1">
                  <AnimatePresence initial={false}>
                    {cartItems.map((item) => (
                      <motion.div
                        key={item.id}
                        layout
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, height: 0, marginBottom: 0 }}
                        transition={{ duration: 0.22 }}
                        className="flex items-center justify-between gap-3.5 pb-4 border-b border-[#E8E0D5]/80 last:border-b-0 last:pb-0"
                      >
                        <div className="flex items-center gap-3.5 min-w-0">
                          <div className="relative w-14 h-16 rounded-xl bg-[#E8E0D5] p-1.5 shrink-0">
                            <img
                              src={item.images[0]}
                              alt={item.name}
                              className="w-full h-full object-contain"
                            />
                            <span className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-[#292522] text-[#F5F1EA] nav-text text-[10px] flex items-center justify-center">
                              {item.quantity}
                            </span>
                          </div>
                          <div className="min-w-0 space-y-1">
                            <Link
                              to={`/product/${item.slug}`}
                              className="font-serif font-medium text-lg text-[#292522] hover:text-[#B89A72] transition-colors block truncate leading-tight"
                            >
                              {item.name}
                            </Link>
                            <p className="body-copy text-[11px] text-[#292522]/55">
                              50ml Eau de Parfum
                            </p>
                            {/* Subtle Inline Quantity Controls */}
                            <div className="inline-flex items-center gap-1 rounded-full bg-[#F5F1EA] border border-[#E8E0D5] px-1.5 py-0.5">
                              <button
                                type="button"
                                onClick={() =>
                                  updateCartQuantity(item.id, item.quantity - 1)
                                }
                                aria-label={`Decrease quantity of ${item.name}`}
                                className="w-5 h-5 rounded-full flex items-center justify-center text-[#292522]/70 hover:text-[#292522] hover:bg-[#E8E0D5]/70 transition-colors"
                              >
                                <Minus className="w-3 h-3" />
                              </button>
                              <span className="nav-text text-[11px] w-5 text-center text-[#292522]">
                                {item.quantity}
                              </span>
                              <button
                                type="button"
                                onClick={() =>
                                  updateCartQuantity(item.id, item.quantity + 1)
                                }
                                aria-label={`Increase quantity of ${item.name}`}
                                className="w-5 h-5 rounded-full flex items-center justify-center text-[#292522]/70 hover:text-[#292522] hover:bg-[#E8E0D5]/70 transition-colors"
                              >
                                <Plus className="w-3 h-3" />
                              </button>
                            </div>
                          </div>
                        </div>

                        <div className="text-right shrink-0 space-y-2">
                          <p className="price-text text-sm text-[#292522]">
                            {formatPKR(item.price * item.quantity)}
                          </p>
                          <button
                            type="button"
                            onClick={() => removeFromCart(item.id)}
                            aria-label={`Remove ${item.name}`}
                            className="inline-flex items-center justify-center text-[#292522]/40 hover:text-[#292522] transition-colors"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>

                {/* Note & Coupon Toggles */}
                <div className="grid grid-cols-2 gap-2.5 pt-2 border-t border-[#E8E0D5]">
                  <button
                    type="button"
                    onClick={() => setShowNoteBox((s) => !s)}
                    className={`nav-text flex items-center justify-center gap-2 rounded-xl border py-2.5 text-xs transition-colors ${
                      showNoteBox
                        ? 'border-[#B89A72] bg-[#F5F1EA] text-[#292522]'
                        : 'border-[#E8E0D5] bg-[#FFFFFF] text-[#292522]/75 hover:border-[#B89A72]/60'
                    }`}
                  >
                    <FileText className="w-3.5 h-3.5 text-[#B89A72]" />
                    Order Note
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowCouponBox((s) => !s)}
                    className={`nav-text flex items-center justify-center gap-2 rounded-xl border py-2.5 text-xs transition-colors ${
                      showCouponBox
                        ? 'border-[#B89A72] bg-[#F5F1EA] text-[#292522]'
                        : 'border-[#E8E0D5] bg-[#FFFFFF] text-[#292522]/75 hover:border-[#B89A72]/60'
                    }`}
                  >
                    <Tag className="w-3.5 h-3.5 text-[#B89A72]" />
                    Promo Code
                  </button>
                </div>

                <AnimatePresence initial={false}>
                  {showNoteBox && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.22 }}
                      className="overflow-hidden"
                    >
                      <textarea
                        rows={2}
                        placeholder="Add delivery instructions or a personal gift note..."
                        value={form.orderNote}
                        onChange={handleChange('orderNote')}
                        className={`${inputClasses} text-xs resize-none`}
                      />
                    </motion.div>
                  )}
                </AnimatePresence>

                <AnimatePresence initial={false}>
                  {showCouponBox && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.22 }}
                      className="overflow-hidden space-y-2"
                    >
                      <div className="flex gap-2">
                        <input
                          type="text"
                          placeholder="Enter coupon code"
                          value={couponCode}
                          onChange={(e) => setCouponCode(e.target.value)}
                          className={`${inputClasses} py-2.5 text-xs`}
                        />
                        <button
                          type="button"
                          onClick={handleApplyCoupon}
                          className="btn-text shrink-0 rounded-xl bg-[#292522] text-[#F5F1EA] hover:bg-[#B89A72] hover:text-[#292522] px-5 py-2.5 text-xs uppercase tracking-[0.14em] transition-colors"
                        >
                          Apply
                        </button>
                      </div>
                      {couponMessage && (
                        <p className="body-copy text-xs text-[#B89A72]">
                          {couponMessage}
                        </p>
                      )}
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Price Breakdown */}
                <div className="space-y-3 pt-4 border-t border-[#E8E0D5] text-sm">
                  <div className="flex justify-between body-copy text-[#292522]/75">
                    <span>Subtotal</span>
                    <span className="price-text text-[#292522]">
                      {formatPKR(cartSubtotal)}
                    </span>
                  </div>
                  <div className="flex justify-between body-copy text-[#292522]/75">
                    <span>Nationwide Shipping</span>
                    <span className="nav-text text-[#B89A72]">Free</span>
                  </div>
                  <div className="pt-3.5 border-t border-[#E8E0D5] flex justify-between items-baseline">
                    <span className="nav-text text-base text-[#292522]">Total</span>
                    <div className="text-right">
                      <span className="price-text text-2xl sm:text-3xl text-[#292522]">
                        {formatPKR(cartSubtotal)}
                      </span>
                      <p className="body-copy text-[11px] text-[#292522]/50">
                        Inclusive of all taxes
                      </p>
                    </div>
                  </div>
                </div>

                {/* Primary Place Order Button */}
                <motion.button
                  type="submit"
                  whileTap={{ scale: 0.99 }}
                  className="btn-text w-full rounded-full bg-[#292522] text-[#F5F1EA] hover:bg-[#B89A72] hover:text-[#292522] py-4 px-6 text-xs uppercase tracking-[0.18em] inline-flex items-center justify-center gap-2.5 transition-colors duration-300 shadow-sm"
                >
                  <span>Place Order · {formatPKR(cartSubtotal)}</span>
                  <ArrowRight className="w-4 h-4" />
                </motion.button>

                <p className="body-copy text-[11px] text-[#292522]/60 leading-relaxed text-center">
                  By placing your order, you agree to our{' '}
                  <Link
                    to="/exchange-policy"
                    className="underline text-[#292522] hover:text-[#B89A72] transition-colors"
                  >
                    7-Day Exchange Policy
                  </Link>
                  .
                </p>
              </div>

              {/* Clean Trust Reassurance Strip */}
              <div className="grid grid-cols-3 gap-3 text-center">
                <div className="rounded-xl bg-[#FFFFFF] border border-[#E8E0D5] p-3.5 space-y-1.5">
                  <Truck className="w-4 h-4 text-[#B89A72] mx-auto" />
                  <p className="nav-text text-[10px] uppercase tracking-[0.12em] text-[#292522]">
                    Free Delivery
                  </p>
                </div>
                <div className="rounded-xl bg-[#FFFFFF] border border-[#E8E0D5] p-3.5 space-y-1.5">
                  <RefreshCw className="w-4 h-4 text-[#B89A72] mx-auto" />
                  <p className="nav-text text-[10px] uppercase tracking-[0.12em] text-[#292522]">
                    7-Day Exchange
                  </p>
                </div>
                <div className="rounded-xl bg-[#FFFFFF] border border-[#E8E0D5] p-3.5 space-y-1.5">
                  <ShieldCheck className="w-4 h-4 text-[#B89A72] mx-auto" />
                  <p className="nav-text text-[10px] uppercase tracking-[0.12em] text-[#292522]">
                    COD & Bank
                  </p>
                </div>
              </div>
            </motion.div>
          </form>
        )}
      </div>
    </div>
  );
}
