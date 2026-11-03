'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  ShieldCheck,
  CheckCircle2,
  ArrowLeft,
  Truck,
  Sparkles,
  MessageCircle,
  Clock,
  Send,
  CreditCard,
  Banknote,
  AlertCircle,
  ShoppingBag,
  Plus,
  Minus,
  Trash2,
} from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { ShippingAddress } from '@/types';
import { getWhatsAppOrderUrl } from '@/lib/whatsapp';
import { INITIAL_SETTINGS } from '@/lib/data/settings';

type PaymentOption = 'whatsapp' | 'online' | 'cod';

export default function CheckoutPage() {
  const router = useRouter();
  const {
    items,
    subtotal,
    shippingFee,
    discountAmount,
    totalAmount,
    appliedCoupon,
    updateQuantity,
    removeFromCart,
    clearCart,
  } = useCart();

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

  const [paymentMethod, setPaymentMethod] = useState<PaymentOption>('whatsapp');
  const [orderNotes, setOrderNotes] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [redirectUrl, setRedirectUrl] = useState<string | null>(null);

  // COD fee handling
  const codFee = paymentMethod === 'cod' ? (INITIAL_SETTINGS.codFee || 99) : 0;
  const finalPayable = totalAmount + codFee;

  if (items.length === 0 && !redirectUrl) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-20 text-center space-y-4">
        <div className="w-16 h-16 rounded-full bg-[#FFF7EC] text-[#511B2A] border border-[#D6AA55] flex items-center justify-center mx-auto shadow-sm">
          <ShoppingBag className="w-7 h-7 text-[#D6AA55]" />
        </div>
        <h2 className="font-serif font-bold text-2xl text-[#511B2A]">Your Cart is Empty</h2>
        <p className="text-xs text-[#533C36] max-w-sm mx-auto">
          Please select an acrylic photo frame or sacred artwork to proceed with your order.
        </p>
        <div className="pt-2">
          <Link
            href="/shop"
            className="inline-flex items-center gap-2 bg-[#511B2A] hover:bg-[#3D1420] text-[#FFF7EC] text-xs font-bold px-7 py-3.5 rounded-full shadow-md transition-all"
          >
            <span>Explore Photo Frames</span>
            <Sparkles className="w-4 h-4 text-[#D6AA55]" />
          </Link>
        </div>
      </div>
    );
  }

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    // Validation
    if (
      !formData.fullName.trim() ||
      !formData.mobile.trim() ||
      !formData.streetAddress.trim() ||
      !formData.city.trim() ||
      !formData.state.trim() ||
      !formData.pincode.trim()
    ) {
      setErrorMessage('Please fill in all mandatory delivery fields marked with *');
      return;
    }

    const cleanMobile = formData.mobile.replace(/\D/g, '');
    if (cleanMobile.length !== 10) {
      setErrorMessage('Please enter a valid 10-digit mobile number for order updates.');
      return;
    }

    const cleanPin = formData.pincode.replace(/\D/g, '');
    if (cleanPin.length !== 6) {
      setErrorMessage('Please enter a valid 6-digit delivery pincode.');
      return;
    }

    setSubmitting(true);

    try {
      // 1. Record order in backend
      let createdOrderId = `AG-2026-${Math.floor(10000 + Math.random() * 90000)}`;
      try {
        const res = await fetch('/api/orders', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            customer: formData,
            items,
            couponCode: appliedCoupon?.code,
            paymentMethod: paymentMethod === 'whatsapp' ? 'WhatsApp' : paymentMethod === 'cod' ? 'COD' : 'Online',
            notes: orderNotes,
          }),
        });

        const data = await res.json();
        if (data && data.order) {
          createdOrderId = data.order.id;
        }
      } catch (err) {
        console.warn('Could not record order to local API, proceeding with generated Order ID:', err);
      }

      // If WhatsApp order chosen:
      if (paymentMethod === 'whatsapp') {
        const waUrl = getWhatsAppOrderUrl({
          orderId: createdOrderId,
          customer: formData,
          items,
          subtotal,
          discountAmount,
          couponCode: appliedCoupon?.code,
          shippingFee,
          totalAmount: finalPayable,
          notes: orderNotes,
        });

        setRedirectUrl(waUrl);
        clearCart();
        window.location.href = waUrl;
      } else {
        // Direct Online or COD Order Confirmation Page
        clearCart();
        router.push(`/order-confirmation/${createdOrderId}`);
      }
    } catch (err: any) {
      setErrorMessage(err.message || 'An error occurred while creating your order. Please try again.');
      setSubmitting(false);
    }
  };

  return (
    <div className="w-full max-w-[1760px] mx-auto px-4 sm:px-8 lg:px-12 xl:px-16 py-8 sm:py-12 space-y-8">
      {/* Checkout Header */}
      <div className="flex items-center justify-between border-b border-[#E8D5BD] pb-4">
        <div>
          <span className="text-xs uppercase tracking-widest font-bold text-[#511B2A] flex items-center gap-1.5">
            <ShieldCheck className="w-3.5 h-3.5 text-[#D6AA55]" />
            <span>Secure 100% Verified Checkout</span>
          </span>
          <h1 className="font-serif font-bold text-2xl sm:text-3xl text-[#511B2A] mt-1 tracking-tight">
            Delivery Details &amp; Payment Options
          </h1>
        </div>
        <Link
          href="/shop"
          className="text-xs font-bold text-[#511B2A] hover:text-[#D6AA55] flex items-center gap-1 transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Continue Shopping</span>
        </Link>
      </div>

      {redirectUrl && (
        <div className="p-6 bg-[#FFF7EC] border border-[#D6AA55] rounded-3xl text-center space-y-3 shadow-sm">
          <div className="w-12 h-12 bg-[#25D366]/10 text-[#25D366] rounded-full flex items-center justify-center mx-auto">
            <MessageCircle className="w-6 h-6 fill-current" />
          </div>
          <h3 className="font-serif font-bold text-lg text-[#511B2A]">Redirecting to WhatsApp...</h3>
          <p className="text-xs text-[#533C36] max-w-md mx-auto">
            Your order details have been securely prepared. If WhatsApp didn’t open automatically, click below to open your chat.
          </p>
          <a
            href={redirectUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-[#25D366] hover:bg-[#20BD5A] text-white font-bold text-xs px-6 py-3 rounded-full shadow-md transition-all"
          >
            <Send className="w-4 h-4 fill-white" />
            <span>Open WhatsApp Now</span>
          </a>
        </div>
      )}

      <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* LEFT COLUMN: Address & Payment Selection (7 Cols) */}
        <div className="lg:col-span-7 space-y-6">
          {/* 1. Shipping Address Card */}
          <div className="bg-white p-6 sm:p-7 rounded-3xl border border-[#E8D5BD] shadow-sm space-y-4">
            <h3 className="font-serif font-bold text-lg text-[#511B2A] flex items-center gap-2">
              <Truck className="w-5 h-5 text-[#D6AA55]" />
              <span>1. Delivery Address</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="sm:col-span-2">
                <label className="text-xs font-semibold text-[#511B2A] block mb-1">
                  Full Name *
                </label>
                <input
                  type="text"
                  name="fullName"
                  required
                  placeholder="e.g. Vikramaditya Rao"
                  value={formData.fullName}
                  onChange={handleInputChange}
                  className="w-full px-3.5 py-2.5 text-xs min-h-[44px] bg-[#FFFBF5] border border-[#E8D5BD] rounded-xl outline-none focus:border-[#D6AA55] text-[#511B2A]"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-[#511B2A] block mb-1">
                  Mobile / WhatsApp Number *
                </label>
                <input
                  type="tel"
                  name="mobile"
                  required
                  placeholder="10-digit number (e.g. 9845012345)"
                  maxLength={10}
                  value={formData.mobile}
                  onChange={handleInputChange}
                  className="w-full px-3.5 py-2.5 text-xs min-h-[44px] bg-[#FFFBF5] border border-[#E8D5BD] rounded-xl outline-none focus:border-[#D6AA55] text-[#511B2A] font-mono"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-[#511B2A] block mb-1">
                  Email Address (Optional)
                </label>
                <input
                  type="email"
                  name="email"
                  placeholder="name@example.com"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full px-3.5 py-2.5 text-xs min-h-[44px] bg-[#FFFBF5] border border-[#E8D5BD] rounded-xl outline-none focus:border-[#D6AA55] text-[#511B2A]"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="text-xs font-semibold text-[#511B2A] block mb-1">
                  Street Address (House No, Flat, Street) *
                </label>
                <input
                  type="text"
                  name="streetAddress"
                  required
                  placeholder="e.g. Flat 402, Sri Krishna Residency, Temple Road"
                  value={formData.streetAddress}
                  onChange={handleInputChange}
                  className="w-full px-3.5 py-2.5 text-xs min-h-[44px] bg-[#FFFBF5] border border-[#E8D5BD] rounded-xl outline-none focus:border-[#D6AA55] text-[#511B2A]"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-[#511B2A] block mb-1">
                  Landmark (Optional)
                </label>
                <input
                  type="text"
                  name="landmark"
                  placeholder="Near Metro Pillar / Temple Landmark"
                  value={formData.landmark}
                  onChange={handleInputChange}
                  className="w-full px-3.5 py-2.5 text-xs min-h-[44px] bg-[#FFFBF5] border border-[#E8D5BD] rounded-xl outline-none focus:border-[#D6AA55] text-[#511B2A]"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-[#511B2A] block mb-1">
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
                  className="w-full px-3.5 py-2.5 text-xs min-h-[44px] bg-[#FFFBF5] border border-[#E8D5BD] rounded-xl outline-none focus:border-[#D6AA55] text-[#511B2A] font-mono"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-[#511B2A] block mb-1">
                  City *
                </label>
                <input
                  type="text"
                  name="city"
                  required
                  placeholder="e.g. Hyderabad / Bengaluru / Chennai"
                  value={formData.city}
                  onChange={handleInputChange}
                  className="w-full px-3.5 py-2.5 text-xs min-h-[44px] bg-[#FFFBF5] border border-[#E8D5BD] rounded-xl outline-none focus:border-[#D6AA55] text-[#511B2A]"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-[#511B2A] block mb-1">
                  State *
                </label>
                <input
                  type="text"
                  name="state"
                  required
                  placeholder="e.g. Telangana / Andhra Pradesh / Karnataka"
                  value={formData.state}
                  onChange={handleInputChange}
                  className="w-full px-3.5 py-2.5 text-xs min-h-[44px] bg-[#FFFBF5] border border-[#E8D5BD] rounded-xl outline-none focus:border-[#D6AA55] text-[#511B2A]"
                />
              </div>
            </div>

            <div>
              <label className="text-xs font-semibold text-[#511B2A] block mb-1">
                Special Delivery Notes / Inscriptions (Optional)
              </label>
              <textarea
                rows={2}
                placeholder="e.g. Preferred delivery timing, gift wrap request, or custom inscription notes."
                value={orderNotes}
                onChange={(e) => setOrderNotes(e.target.value)}
                className="w-full px-3.5 py-2 text-xs bg-[#FFFBF5] border border-[#E8D5BD] rounded-xl outline-none focus:border-[#D6AA55] text-[#511B2A]"
              />
            </div>
          </div>

          {/* 2. Payment Method Selector */}
          <div className="bg-white p-6 sm:p-7 rounded-3xl border border-[#E8D5BD] shadow-sm space-y-4">
            <h3 className="font-serif font-bold text-lg text-[#511B2A] flex items-center gap-2">
              <CreditCard className="w-5 h-5 text-[#D6AA55]" />
              <span>2. Choose Payment Method</span>
            </h3>

            <div className="space-y-3">
              {/* Option A: WhatsApp Priority Order */}
              <label
                className={`flex items-start gap-3.5 p-4 rounded-2xl border transition-all cursor-pointer ${
                  paymentMethod === 'whatsapp'
                    ? 'border-[#25D366] bg-[#25D366]/5 ring-1 ring-[#25D366]/40'
                    : 'border-[#E8D5BD] bg-white hover:border-[#D6AA55]'
                }`}
              >
                <input
                  type="radio"
                  name="paymentMethod"
                  value="whatsapp"
                  checked={paymentMethod === 'whatsapp'}
                  onChange={() => setPaymentMethod('whatsapp')}
                  className="mt-1 accent-[#25D366]"
                />
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-xs sm:text-sm text-[#511B2A]">
                      Direct WhatsApp Order &amp; Proofing
                    </span>
                    <span className="text-[10px] font-bold text-[#25D366] bg-[#25D366]/10 px-2 py-0.5 rounded-full">
                      Recommended
                    </span>
                  </div>
                  <p className="text-xs text-[#533C36] mt-1 leading-relaxed">
                    Instantly forwards your order details to our WhatsApp team. Get a 1:1 digital proof from our designers and pay via UPI (GPay/PhonePe/Paytm).
                  </p>
                </div>
              </label>

              {/* Option B: Online Payment */}
              <label
                className={`flex items-start gap-3.5 p-4 rounded-2xl border transition-all cursor-pointer ${
                  paymentMethod === 'online'
                    ? 'border-[#511B2A] bg-[#FFF7EC] ring-1 ring-[#511B2A]/40'
                    : 'border-[#E8D5BD] bg-white hover:border-[#D6AA55]'
                }`}
              >
                <input
                  type="radio"
                  name="paymentMethod"
                  value="online"
                  checked={paymentMethod === 'online'}
                  onChange={() => setPaymentMethod('online')}
                  className="mt-1 accent-[#511B2A]"
                />
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-xs sm:text-sm text-[#511B2A]">
                      Online Payment (UPI, Credit/Debit Cards, NetBanking)
                    </span>
                  </div>
                  <p className="text-xs text-[#533C36] mt-1 leading-relaxed">
                    100% secure payment with automated receipt and order tracking.
                  </p>
                </div>
              </label>

              {/* Option C: Cash on Delivery */}
              <label
                className={`flex items-start gap-3.5 p-4 rounded-2xl border transition-all cursor-pointer ${
                  paymentMethod === 'cod'
                    ? 'border-[#511B2A] bg-[#FFF7EC] ring-1 ring-[#511B2A]/40'
                    : 'border-[#E8D5BD] bg-white hover:border-[#D6AA55]'
                }`}
              >
                <input
                  type="radio"
                  name="paymentMethod"
                  value="cod"
                  checked={paymentMethod === 'cod'}
                  onChange={() => setPaymentMethod('cod')}
                  className="mt-1 accent-[#511B2A]"
                />
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-xs sm:text-sm text-[#511B2A]">
                      Cash on Delivery (Pay at Doorstep)
                    </span>
                    <span className="text-[10px] font-bold text-[#8C7A70] bg-[#FFFBF5] border border-[#E8D5BD] px-2 py-0.5 rounded-full">
                      +₹{INITIAL_SETTINGS.codFee || 99} COD Fee
                    </span>
                  </div>
                  <p className="text-xs text-[#533C36] mt-1 leading-relaxed">
                    Pay with cash or UPI QR upon courier delivery.
                  </p>
                </div>
              </label>
            </div>
          </div>

          {errorMessage && (
            <div className="p-4 bg-rose-50 text-rose-800 border border-rose-200 rounded-2xl text-xs font-medium flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
              <span>{errorMessage}</span>
            </div>
          )}
        </div>

        {/* RIGHT COLUMN: Order Review & Instant Price Calculation (5 Cols) */}
        <div className="lg:col-span-5 bg-white p-6 sm:p-7 rounded-3xl border border-[#E8D5BD] shadow-sm space-y-6">
          <div className="flex items-center justify-between border-b border-[#E8D5BD] pb-3">
            <h3 className="font-serif font-bold text-lg text-[#511B2A]">
              Review Your Cart ({items.length} items)
            </h3>
            <span className="text-[11px] text-[#A06E28] font-bold">100% Insured</span>
          </div>

          {/* Cart Item Updates with Quantity Changer */}
          <div className="space-y-3 max-h-72 overflow-y-auto pr-1 divide-y divide-[#E8D5BD]/60 text-xs">
            {items.map((it) => (
              <div key={it.id} className="pt-3 first:pt-0 flex gap-3 items-center">
                <img
                  src={it.customization?.previewUrl || it.image}
                  alt={it.title}
                  className="w-14 h-14 object-cover rounded-xl border border-[#E8D5BD] shrink-0 bg-stone-100"
                />
                <div className="flex-1 min-w-0">
                  <p className="font-bold text-[#511B2A] truncate">{it.title}</p>
                  <p className="text-[11px] text-[#8C7A70]">
                    {it.size} {it.lighting ? `• ${it.lighting}` : ''}
                  </p>
                  <div className="flex items-center gap-2 mt-1.5">
                    {/* Quantity Controls */}
                    <div className="flex items-center border border-[#E8D5BD] rounded-lg overflow-hidden bg-[#FFFBF5]">
                      <button
                        type="button"
                        onClick={() => updateQuantity(it.id, Math.max(1, it.quantity - 1))}
                        className="px-2 py-0.5 hover:bg-[#FFF7EC] text-[#511B2A] font-bold text-xs cursor-pointer"
                        aria-label="Decrease quantity"
                      >
                        <Minus className="w-2.5 h-2.5" />
                      </button>
                      <span className="px-2 font-bold text-[11px] text-[#511B2A]">{it.quantity}</span>
                      <button
                        type="button"
                        onClick={() => updateQuantity(it.id, it.quantity + 1)}
                        className="px-2 py-0.5 hover:bg-[#FFF7EC] text-[#511B2A] font-bold text-xs cursor-pointer"
                        aria-label="Increase quantity"
                      >
                        <Plus className="w-2.5 h-2.5" />
                      </button>
                    </div>

                    <button
                      type="button"
                      onClick={() => removeFromCart(it.id)}
                      className="text-stone-400 hover:text-rose-600 transition-colors p-1 cursor-pointer"
                      title="Remove item"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
                <span className="font-bold text-[#511B2A] shrink-0 text-sm">
                  ₹{(it.unitPrice * it.quantity).toLocaleString('en-IN')}
                </span>
              </div>
            ))}
          </div>

          {/* Itemized Pricing Summary */}
          <div className="space-y-2 text-xs text-[#533C36] border-t border-[#E8D5BD] pt-3">
            <div className="flex justify-between">
              <span>Items Subtotal</span>
              <span className="font-semibold text-[#511B2A]">₹{subtotal.toLocaleString('en-IN')}</span>
            </div>

            {discountAmount > 0 && (
              <div className="flex justify-between text-emerald-700 font-semibold">
                <span>Coupon Discount ({appliedCoupon?.code})</span>
                <span>-₹{discountAmount.toLocaleString('en-IN')}</span>
              </div>
            )}

            <div className="flex justify-between">
              <span>Express Insured Shipping</span>
              <span>
                {shippingFee === 0 ? (
                  <strong className="text-emerald-700 font-bold">FREE Express</strong>
                ) : (
                  `₹${shippingFee}`
                )}
              </span>
            </div>

            {paymentMethod === 'cod' && (
              <div className="flex justify-between text-amber-900 font-medium">
                <span>COD Handling Fee</span>
                <span>₹{codFee}</span>
              </div>
            )}

            <div className="flex justify-between text-base font-serif font-bold text-[#511B2A] pt-3 border-t border-[#E8D5BD]">
              <span>Final Total Payable</span>
              <span className="font-extrabold text-xl text-[#511B2A]">
                ₹{finalPayable.toLocaleString('en-IN')}
              </span>
            </div>
          </div>

          {/* Order Completion CTA Button */}
          <div className="space-y-3 pt-2">
            <button
              type="submit"
              disabled={submitting}
              className={`w-full py-4 rounded-2xl font-bold text-sm sm:text-base shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer ${
                submitting
                  ? 'bg-stone-300 text-stone-500 cursor-not-allowed'
                  : paymentMethod === 'whatsapp'
                  ? 'bg-[#25D366] hover:bg-[#20BD5A] text-white hover:scale-[1.01]'
                  : 'bg-[#511B2A] hover:bg-[#3D1420] text-[#FFF7EC] hover:scale-[1.01]'
              }`}
            >
              {submitting ? (
                <span>Confirming Order...</span>
              ) : paymentMethod === 'whatsapp' ? (
                <>
                  <MessageCircle className="w-5 h-5 fill-white" />
                  <span>Order via WhatsApp • ₹{finalPayable.toLocaleString('en-IN')}</span>
                </>
              ) : (
                <>
                  <ShieldCheck className="w-5 h-5 text-[#D6AA55]" />
                  <span>Complete Purchase • ₹{finalPayable.toLocaleString('en-IN')}</span>
                </>
              )}
            </button>

            <div className="flex items-center justify-center gap-1.5 text-[11px] text-[#8C7A70] text-center">
              <ShieldCheck className="w-3.5 h-3.5 text-[#D6AA55]" />
              <span>100% Transit Safe Guarantee • Instant Free Replacement if Damaged</span>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
