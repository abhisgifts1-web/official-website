'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  ShieldCheck,
  CheckCircle2,
  ArrowLeft,
  Truck,
  Sparkles,
  MessageCircle,
  Clock,
  Send,
} from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { ShippingAddress } from '@/types';
import { getWhatsAppOrderUrl, getWhatsAppNumber } from '@/lib/whatsapp';

export default function CheckoutPage() {
  const { items, subtotal, shippingFee, discountAmount, totalAmount, appliedCoupon, clearCart } = useCart();

  const [formData, setFormData] = useState<ShippingAddress>({
    fullName: '',
    mobile: '',
    email: '',
    streetAddress: '',
    apartment: '',
    landmark: '',
    city: '',
    state: '',
    pincode: '',
  });

  const [orderNotes, setOrderNotes] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [redirectUrl, setRedirectUrl] = useState<string | null>(null);

  if (items.length === 0 && !redirectUrl) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-16 text-center space-y-4">
        <h2 className="font-serif font-bold text-2xl text-stone-900">No items selected</h2>
        <p className="text-xs text-stone-500">Please choose an artwork to proceed with WhatsApp ordering.</p>
        <Link
          href="/shop"
          className="inline-block bg-stone-900 text-white text-xs font-semibold px-6 py-2.5 rounded-full"
        >
          Explore Sacred Art →
        </Link>
      </div>
    );
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    // Validation
    if (!formData.fullName.trim() || !formData.mobile.trim() || !formData.streetAddress.trim() || !formData.pincode.trim()) {
      setErrorMessage('Please fill in all mandatory address fields marked with *');
      return;
    }

    if (!/^\d{10}$/.test(formData.mobile.replace(/\D/g, ''))) {
      setErrorMessage('Please enter a valid 10-digit mobile number for WhatsApp coordination.');
      return;
    }

    if (!/^\d{6}$/.test(formData.pincode.replace(/\D/g, ''))) {
      setErrorMessage('Please enter a valid 6-digit delivery pincode.');
      return;
    }

    setSubmitting(true);

    try {
      // 1. Record the order in database / admin panel
      let createdOrderId: string | undefined = undefined;
      try {
        const res = await fetch('/api/orders', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            customer: formData,
            items,
            couponCode: appliedCoupon?.code,
            paymentMethod: 'WhatsApp',
            notes: orderNotes,
          }),
        });

        const data = await res.json();
        if (data && data.order) {
          createdOrderId = data.order.id;
        }
      } catch (err) {
        console.warn('Could not record order to local API, proceeding to WhatsApp directly:', err);
      }

      // 2. Generate structured WhatsApp message with all selected product details
      const waUrl = getWhatsAppOrderUrl({
        orderId: createdOrderId,
        customer: formData,
        items,
        subtotal,
        discountAmount,
        couponCode: appliedCoupon?.code,
        shippingFee,
        totalAmount,
        notes: orderNotes,
      });

      setRedirectUrl(waUrl);

      // 3. Clear cart
      clearCart();

      // 4. Redirect immediately to WhatsApp
      window.location.href = waUrl;
    } catch (err: any) {
      setErrorMessage(err.message || 'An error occurred while preparing your WhatsApp order.');
      setSubmitting(false);
    }
  };

  return (
    <div className="w-full max-w-[1760px] mx-auto px-4 sm:px-8 lg:px-12 xl:px-16 py-8 sm:py-12 space-y-8">
      {/* Checkout Header */}
      <div className="flex items-center justify-between border-b border-stone-200 pb-4">
        <div>
          <span className="text-xs uppercase tracking-widest font-bold text-[#641E2E] flex items-center gap-1.5">
            <MessageCircle className="w-3.5 h-3.5 text-[#B88A35]" /> Direct WhatsApp Order
          </span>
          <h1 className="font-serif font-bold text-2xl sm:text-3xl text-stone-900 mt-1">
            Delivery Details &amp; WhatsApp Order
          </h1>
        </div>
        <Link href="/shop" className="text-xs font-semibold text-amber-800 hover:underline flex items-center gap-1">
          <ArrowLeft className="w-3.5 h-3.5" /> Continue Shopping
        </Link>
      </div>

      {redirectUrl && (
        <div className="p-6 bg-[#FCE7EA] border border-[#E8D5BD] rounded-2xl text-center space-y-3">
          <div className="w-12 h-12 bg-[#FCE7EA] text-[#795D58] rounded-full flex items-center justify-center mx-auto">
            <MessageCircle className="w-6 h-6" />
          </div>
          <h3 className="font-serif font-bold text-lg text-[#641E2E]">Redirecting to WhatsApp...</h3>
          <p className="text-xs text-stone-600 max-w-md mx-auto">
            Your order details are prepared. If WhatsApp didn’t open automatically, click the button below to send your order.
          </p>
          <a
            href={redirectUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-[#641E2E] hover:bg-[#32151D] text-white font-bold text-xs px-6 py-3 rounded-full shadow-md transition-all"
          >
            <Send className="w-4 h-4" />
            <span>Open WhatsApp Now</span>
          </a>
        </div>
      )}

      <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* LEFT: Address & Direct WhatsApp Order Info (7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          {/* Shipping Address Card */}
          <div className="bg-white p-6 sm:p-7 rounded-3xl border border-stone-200 shadow-sm space-y-4">
            <h3 className="font-serif font-bold text-lg text-stone-900 flex items-center gap-2">
              <Truck className="w-5 h-5 text-amber-800" />
              <span>1. Delivery Address</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="sm:col-span-2">
                <label className="text-xs font-semibold text-stone-700 block mb-1">
                  Full Name *
                </label>
                <input
                  type="text"
                  name="fullName"
                  required
                  placeholder="e.g. Venkatraman Iyer"
                  value={formData.fullName}
                  onChange={handleInputChange}
                  className="w-full px-3.5 py-2.5 text-sm sm:text-xs min-h-[44px] bg-stone-50 border border-stone-300 rounded-xl outline-none focus:border-[#B88A35] focus:bg-white"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-stone-700 block mb-1">
                  Mobile / WhatsApp Number *
                </label>
                <input
                  type="tel"
                  name="mobile"
                  required
                  placeholder="10-digit WhatsApp (e.g. 9845012345)"
                  maxLength={10}
                  value={formData.mobile}
                  onChange={handleInputChange}
                  className="w-full px-3.5 py-2.5 text-sm sm:text-xs min-h-[44px] bg-stone-50 border border-stone-300 rounded-xl outline-none focus:border-[#B88A35] focus:bg-white"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-stone-700 block mb-1">
                  Email Address (Optional)
                </label>
                <input
                  type="email"
                  name="email"
                  placeholder="name@example.com"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full px-3.5 py-2.5 text-sm sm:text-xs min-h-[44px] bg-stone-50 border border-stone-300 rounded-xl outline-none focus:border-[#B88A35] focus:bg-white"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="text-xs font-semibold text-stone-700 block mb-1">
                  Street Address (House No, Building, Road) *
                </label>
                <input
                  type="text"
                  name="streetAddress"
                  required
                  placeholder="e.g. Flat 302, Sri Krishna Heights, Temple Road"
                  value={formData.streetAddress}
                  onChange={handleInputChange}
                  className="w-full px-3.5 py-2.5 text-sm sm:text-xs min-h-[44px] bg-stone-50 border border-stone-300 rounded-xl outline-none focus:border-[#B88A35] focus:bg-white"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-stone-700 block mb-1">
                  Landmark (Optional)
                </label>
                <input
                  type="text"
                  name="landmark"
                  placeholder="Near Metro Pillar / City Landmark"
                  value={formData.landmark}
                  onChange={handleInputChange}
                  className="w-full px-3.5 py-2.5 text-sm sm:text-xs min-h-[44px] bg-stone-50 border border-stone-300 rounded-xl outline-none focus:border-[#B88A35] focus:bg-white"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-stone-700 block mb-1">
                  Pincode *
                </label>
                <input
                  type="text"
                  name="pincode"
                  required
                  placeholder="6-digit pincode"
                  maxLength={6}
                  value={formData.pincode}
                  onChange={handleInputChange}
                  className="w-full px-3.5 py-2.5 text-sm sm:text-xs min-h-[44px] bg-stone-50 border border-stone-300 rounded-xl outline-none focus:border-[#B88A35] focus:bg-white"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-stone-700 block mb-1">
                  City *
                </label>
                <input
                  type="text"
                  name="city"
                  required
                  placeholder="e.g. Hyderabad / Chennai / Bengaluru"
                  value={formData.city}
                  onChange={handleInputChange}
                  className="w-full px-3.5 py-2.5 text-sm sm:text-xs min-h-[44px] bg-stone-50 border border-stone-300 rounded-xl outline-none focus:border-[#B88A35] focus:bg-white"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-stone-700 block mb-1">
                  State *
                </label>
                <input
                  type="text"
                  name="state"
                  required
                  placeholder="e.g. Andhra Pradesh / Tamil Nadu / Karnataka"
                  value={formData.state}
                  onChange={handleInputChange}
                  className="w-full px-3.5 py-2.5 text-sm sm:text-xs min-h-[44px] bg-stone-50 border border-stone-300 rounded-xl outline-none focus:border-[#B88A35] focus:bg-white"
                />
              </div>
            </div>

            <div>
              <label className="text-xs font-semibold text-stone-700 block mb-1">
                Order Notes / Custom Sizing Requests (Optional)
              </label>
              <textarea
                rows={2}
                placeholder="e.g. Custom wall size, mandir placement notes, or preferred delivery timing."
                value={orderNotes}
                onChange={(e) => setOrderNotes(e.target.value)}
                className="w-full px-3.5 py-2 text-xs bg-stone-50 border border-stone-300 rounded-xl outline-none focus:border-[#B88A35] focus:bg-white"
              />
            </div>
          </div>

          {/* Direct WhatsApp Order Guarantee Card */}
          <div className="bg-gradient-to-br from-[#FFF7ED] via-[#F7FCF9] to-amber-50/50 p-6 sm:p-7 rounded-3xl border border-[#E8D5BD] shadow-xs space-y-3">
            <div className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-2xl bg-[#641E2E] text-white flex items-center justify-center shrink-0 shadow-xs">
                <MessageCircle className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-serif font-bold text-base sm:text-lg text-[#641E2E]">
                  Direct WhatsApp Ordering — Zero Gateway Hassle
                </h3>
                <p className="text-xs text-stone-600">
                  No online payment gateway or credit card required on this site.
                </p>
              </div>
            </div>

            <p className="text-xs text-stone-600 leading-relaxed font-sans pt-1">
              When you click <strong>Order via WhatsApp</strong>, you will be redirected straight to WhatsApp with your full order details (artwork name, dimensions, finish, quantity, price, and address) pre-filled. Our master artisan team will confirm your order and provide simple direct payment (GPay, PhonePe, Paytm, or UPI) and dispatch updates.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 pt-2">
              <div className="bg-white/80 border border-[#E8D5BD] rounded-xl p-2.5 flex items-center gap-2 text-[11px] text-stone-700 font-medium">
                <CheckCircle2 className="w-4 h-4 text-[#B88A35] shrink-0" />
                <span>Instant Confirmation</span>
              </div>
              <div className="bg-white/80 border border-[#E8D5BD] rounded-xl p-2.5 flex items-center gap-2 text-[11px] text-stone-700 font-medium">
                <Clock className="w-4 h-4 text-[#B88A35] shrink-0" />
                <span>Artisan Direct Chat</span>
              </div>
              <div className="bg-white/80 border border-[#E8D5BD] rounded-xl p-2.5 flex items-center gap-2 text-[11px] text-stone-700 font-medium">
                <ShieldCheck className="w-4 h-4 text-[#B88A35] shrink-0" />
                <span>100% Transit Safe</span>
              </div>
            </div>
          </div>

          {errorMessage && (
            <div className="p-3.5 bg-red-50 text-red-700 border border-red-200 rounded-xl text-xs font-medium">
              {errorMessage}
            </div>
          )}
        </div>

        {/* RIGHT: Order Review & Direct WhatsApp Confirmation CTA (5 cols) */}
        <div className="lg:col-span-5 bg-white p-6 sm:p-7 rounded-3xl border border-stone-200 shadow-sm space-y-6">
          <h3 className="font-serif font-bold text-lg text-stone-900 border-b pb-3">
            Review Your Order ({items.length} items)
          </h3>

          <div className="space-y-3 max-h-72 overflow-y-auto pr-1 divide-y divide-stone-100 text-xs">
            {items.map((it) => (
              <div key={it.id} className="pt-3 first:pt-0 flex gap-3 items-center">
                <img
                  src={it.customization?.previewUrl || it.image}
                  alt={it.title}
                  className="w-14 h-14 object-cover rounded-xl border border-stone-200 shrink-0"
                />
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-stone-900 truncate">{it.title}</p>
                  <p className="text-[11px] text-stone-500">
                    {it.shape ? `${it.shape.toUpperCase()} • ` : ''}{it.size} • Qty: {it.quantity}
                  </p>
                  {it.customization?.customText && (
                    <p className="text-[10px] text-amber-900 italic font-serif truncate">
                      &ldquo;{it.customization.customText}&rdquo;
                    </p>
                  )}
                </div>
                <span className="font-bold text-stone-900 shrink-0">
                  ₹{(it.unitPrice * it.quantity).toLocaleString('en-IN')}
                </span>
              </div>
            ))}
          </div>

          {/* Pricing Summary */}
          <div className="space-y-2 text-xs text-stone-600 border-t border-stone-100 pt-3">
            <div className="flex justify-between">
              <span>Items Subtotal</span>
              <span className="font-semibold text-stone-900">₹{subtotal.toLocaleString('en-IN')}</span>
            </div>

            {discountAmount > 0 && (
              <div className="flex justify-between text-[#795D58] font-semibold">
                <span>Coupon ({appliedCoupon?.code})</span>
                <span>-₹{discountAmount.toLocaleString('en-IN')}</span>
              </div>
            )}

            <div className="flex justify-between">
              <span>Pan-India Delivery</span>
              <span>
                {shippingFee === 0 ? <strong className="text-[#795D58] font-bold">FREE Express</strong> : `₹${shippingFee}`}
              </span>
            </div>

            <div className="flex justify-between text-base font-serif font-bold text-[#641E2E] pt-3 border-t border-[#E8D5BD]">
              <span>Total Payable</span>
              <span className="text-[#641E2E] font-extrabold text-lg">₹{totalAmount.toLocaleString('en-IN')}</span>
            </div>
          </div>

          {/* Place Order CTA */}
          <div className="space-y-3 pt-2">
            <button
              type="submit"
              disabled={submitting}
              className="w-full bg-[#641E2E] hover:bg-[#32151D] active:scale-[0.99] disabled:opacity-50 text-[#FFF7ED] border border-[#B88A35]/60 py-4 rounded-xl font-bold text-sm sm:text-base shadow-[0_4px_20px_rgba(101,30,45,0.35)] flex items-center justify-center gap-2 transition-all cursor-pointer hover:scale-[1.01]"
            >
              <MessageCircle className="w-5 h-5 text-[#B88A35]" />
              {submitting ? (
                <span>Opening WhatsApp...</span>
              ) : (
                <span>Order via WhatsApp • ₹{totalAmount.toLocaleString('en-IN')}</span>
              )}
            </button>

            <div className="flex items-center justify-center gap-1.5 text-[11px] text-[#795D58] text-center">
              <ShieldCheck className="w-3.5 h-3.5 text-[#B88A35]" />
              <span>100% Transit Safe Guarantee • Replacement if Damaged</span>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
