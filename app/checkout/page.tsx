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
  Tag,
  Lock,
  ArrowRight,
  Check,
} from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { ShippingAddress } from '@/types';
import { INITIAL_SETTINGS } from '@/lib/data/settings';
import { compressImageToDataUrl } from '@/lib/utils/imageCompress';

type PaymentOption = 'razorpay';

export default function CheckoutPage() {
  const router = useRouter();
  const {
    items,
    subtotal,
    shippingFee,
    discountAmount,
    totalAmount,
    appliedCoupon,
    applyCoupon,
    removeCoupon,
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

  const [paymentMethod, setPaymentMethod] = useState<PaymentOption>('razorpay');
  const [orderNotes, setOrderNotes] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Razorpay Simulator Modal State (for smooth testing before user inputs live API keys)
  const [showSimModal, setShowSimModal] = useState(false);
  const [simOrderInfo, setSimOrderInfo] = useState<{
    orderId: string;
    razorpayOrderId: string;
    amount: number;
  } | null>(null);

  // Helper to dynamically load Razorpay Checkout script
  const loadRazorpayScript = (): Promise<boolean> => {
    return new Promise((resolve) => {
      if (typeof window === 'undefined') return resolve(false);
      if ((window as any).Razorpay) return resolve(true);

      const script = document.createElement('script');
      script.src = 'https://checkout.razorpay.com/v1/checkout.js';
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  // Coupon Application State
  const [couponInput, setCouponInput] = useState('');
  const [applyingCoupon, setApplyingCoupon] = useState(false);
  const [couponFeedback, setCouponFeedback] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

  const handleApplyCoupon = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!couponInput.trim()) return;

    setApplyingCoupon(true);
    setCouponFeedback(null);

    const customerId = formData.mobile?.trim() || formData.email?.trim() || undefined;
    const res = await applyCoupon(couponInput.trim().toUpperCase(), customerId);

    if (res.success) {
      setCouponFeedback({
        type: 'success',
        message: res.message || `Coupon applied successfully! You saved ₹${res.discountAmount || discountAmount}.`,
      });
      setCouponInput('');
    } else {
      setCouponFeedback({
        type: 'error',
        message: res.message || 'Invalid or expired coupon code.',
      });
    }
    setApplyingCoupon(false);
  };

  const handleRemoveCoupon = () => {
    removeCoupon();
    setCouponFeedback(null);
  };

  const finalPayable = totalAmount;

  if (items.length === 0) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-20 text-center space-y-4 bg-white min-h-[60vh] flex flex-col items-center justify-center">
        <div className="w-16 h-16 rounded-full bg-stone-100 text-stone-900 border border-amber-300 flex items-center justify-center mx-auto shadow-xs">
          <ShoppingBag className="w-7 h-7 text-amber-600" />
        </div>
        <h2 className="font-serif font-bold text-2xl text-stone-900">Your Cart is Empty</h2>
        <p className="text-xs text-stone-600 max-w-sm mx-auto">
          Please select an acrylic photo frame or sacred artwork to proceed with your order.
        </p>
        <div className="pt-2">
          <Link
            href="/shop"
            className="inline-flex items-center gap-2 bg-[#FEE815] hover:bg-[#FFF04B] text-stone-950 text-xs font-bold px-7 py-3.5 rounded-full shadow-md transition-all uppercase tracking-wider cursor-pointer"
          >
            <span>Explore Photo Frames</span>
            <Sparkles className="w-4 h-4 text-stone-950" />
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
      // Ensure all custom photos (base64) are uploaded to the server
      const preparedItems = await Promise.all(
        items.map(async (item) => {
          const updatedItem = { ...item };
          const imgToUpload =
            (item.customization?.previewUrl?.startsWith('data:') && item.customization.previewUrl) ||
            (item.image?.startsWith('data:') && item.image);

          if (imgToUpload) {
            try {
              const compressed = await compressImageToDataUrl(imgToUpload);
              const res = await fetch('/api/upload-photo', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ image: compressed }),
              });
              const uploadData = await res.json();
              const fullUrl = uploadData?.cdnUrl || (uploadData?.url ? `${window.location.origin}${uploadData.url}` : null);
              if (fullUrl) {
                updatedItem.image = fullUrl;
                updatedItem.customization = {
                  ...(updatedItem.customization || {}),
                  previewUrl: fullUrl,
                };
              }
            } catch (err) {
              console.warn('Could not upload base64 image during checkout:', err);
            }
          }

          // Also upload any base64 photos in photoUrls array if present
          if (updatedItem.customization?.photoUrls && updatedItem.customization.photoUrls.length > 0) {
            const uploadedUrls = await Promise.all(
              updatedItem.customization.photoUrls.map(async (pUrl) => {
                if (pUrl && pUrl.startsWith('data:')) {
                  try {
                    const compressed = await compressImageToDataUrl(pUrl);
                    const res = await fetch('/api/upload-photo', {
                      method: 'POST',
                      headers: { 'Content-Type': 'application/json' },
                      body: JSON.stringify({ image: compressed }),
                    });
                    const uploadData = await res.json();
                    return uploadData?.cdnUrl || (uploadData?.url ? `${window.location.origin}${uploadData.url}` : pUrl);
                  } catch {
                    return pUrl;
                  }
                }
                return pUrl;
              })
            );
            updatedItem.customization = {
              ...updatedItem.customization,
              photoUrls: uploadedUrls,
            };
          }

          return updatedItem;
        })
      );

      // 1. Record order in backend
      let createdOrderId = `AG-2026-${Math.floor(10000 + Math.random() * 90000)}`;
      try {
        const res = await fetch('/api/orders', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            customer: formData,
            items: preparedItems,
            couponCode: appliedCoupon?.code,
            paymentMethod: 'Razorpay',
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

      // If Razorpay Online Payment selected:
      if (paymentMethod === 'razorpay') {
        try {
          const rzpOrderRes = await fetch('/api/razorpay/create-order', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              amount: finalPayable,
              receipt: createdOrderId,
              notes: {
                customerName: formData.fullName,
                mobile: formData.mobile,
                orderId: createdOrderId,
              },
            }),
          });
          const rzpData = await rzpOrderRes.json();

          if (!rzpData.success) {
            throw new Error(rzpData.error || 'Failed to initiate Razorpay order.');
          }

          // If simulator mode (keys not provided yet):
          if (rzpData.isMock || !rzpData.keyId || rzpData.keyId.includes('placeholder')) {
            setSimOrderInfo({
              orderId: createdOrderId,
              razorpayOrderId: rzpData.orderId,
              amount: finalPayable,
            });
            setShowSimModal(true);
            setSubmitting(false);
            return;
          }

          // Live Razorpay SDK checkout flow
          const scriptLoaded = await loadRazorpayScript();
          if (!scriptLoaded) {
            // Fallback to simulator modal if script blocked
            setSimOrderInfo({
              orderId: createdOrderId,
              razorpayOrderId: rzpData.orderId,
              amount: finalPayable,
            });
            setShowSimModal(true);
            setSubmitting(false);
            return;
          }

          const options = {
            key: rzpData.keyId,
            amount: rzpData.amount,
            currency: rzpData.currency || 'INR',
            name: "Abhi's Gifts",
            description: `Order #${createdOrderId} - Luxury Wall Art`,
            order_id: rzpData.orderId,
            prefill: {
              name: formData.fullName,
              contact: formData.mobile,
              email: formData.email || '',
            },
            theme: {
              color: '#000000',
            },
            modal: {
              ondismiss: () => {
                setSubmitting(false);
              },
            },
            handler: async (resp: any) => {
              try {
                const verifyRes = await fetch('/api/razorpay/verify-payment', {
                  method: 'POST',
                  headers: { 'Content-Type': 'application/json' },
                  body: JSON.stringify({
                    razorpayOrderId: resp.razorpay_order_id,
                    razorpayPaymentId: resp.razorpay_payment_id,
                    razorpaySignature: resp.razorpay_signature,
                    orderId: createdOrderId,
                  }),
                });
                const verifyData = await verifyRes.json();
                if (verifyData.success) {
                  clearCart();
                  router.push(`/order-confirmation/${createdOrderId}`);
                } else {
                  setErrorMessage('Payment verification error. Please contact store support.');
                  setSubmitting(false);
                }
              } catch (vErr: any) {
                setErrorMessage('Error verifying payment: ' + vErr.message);
                setSubmitting(false);
              }
            },
          };

          const razorpay = new (window as any).Razorpay(options);
          razorpay.on('payment.failed', (resp: any) => {
            setErrorMessage(resp.error?.description || 'Payment was unsuccessful. Please try again.');
            setSubmitting(false);
          });
          razorpay.open();
        } catch (err: any) {
          console.error('Razorpay flow error:', err);
          setSimOrderInfo({
            orderId: createdOrderId,
            razorpayOrderId: `order_sim_${Date.now()}`,
            amount: finalPayable,
          });
          setShowSimModal(true);
          setSubmitting(false);
        }
      }
    } catch (err: any) {
      setErrorMessage(err.message || 'An error occurred while creating your order. Please try again.');
      setSubmitting(false);
    }
  };

  // Handler for Razorpay Simulator Modal
  const handleSimulateSuccess = async (methodLabel: string) => {
    if (!simOrderInfo) return;
    setSubmitting(true);
    try {
      const simPaymentId = `pay_sim_${Date.now()}_${Math.floor(1000 + Math.random() * 9000)}`;
      const res = await fetch('/api/razorpay/verify-payment', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          razorpayOrderId: simOrderInfo.razorpayOrderId,
          razorpayPaymentId: simPaymentId,
          orderId: simOrderInfo.orderId,
        }),
      });
      const data = await res.json();
      if (data.success) {
        clearCart();
        setShowSimModal(false);
        router.push(`/order-confirmation/${simOrderInfo.orderId}`);
      } else {
        setErrorMessage(data.error || 'Payment confirmation error.');
        setSubmitting(false);
      }
    } catch (err: any) {
      setErrorMessage(err.message || 'Payment simulation error.');
      setSubmitting(false);
    }
  };

  return (
    <div className="w-full max-w-[1760px] mx-auto px-4 sm:px-8 lg:px-12 xl:px-16 py-8 sm:py-12 space-y-8 bg-white text-stone-900">
      {/* Checkout Header */}
      <div className="flex items-center justify-between border-b border-stone-200 pb-4">
        <div>
          <span className="text-xs uppercase tracking-widest font-bold text-stone-900 flex items-center gap-1.5">
            <ShieldCheck className="w-3.5 h-3.5 text-amber-600" />
            <span>Secure 100% Verified Checkout</span>
          </span>
          <h1 className="font-serif font-bold text-2xl sm:text-3xl text-stone-900 mt-1 tracking-tight">
            Delivery Details &amp; Payment Options
          </h1>
        </div>
        <Link
          href="/shop"
          className="text-xs font-bold text-stone-700 hover:text-amber-700 flex items-center gap-1 transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Continue Shopping</span>
        </Link>
      </div>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* LEFT COLUMN: Address & Payment Selection (7 Cols) */}
        <div className="lg:col-span-7 space-y-6">
          {/* 1. Shipping Address Card */}
          <div className="bg-white p-6 sm:p-7 rounded-3xl border border-stone-200 shadow-sm space-y-4">
            <h3 className="font-serif font-bold text-lg text-stone-900 flex items-center gap-2">
              <Truck className="w-5 h-5 text-amber-600" />
              <span>1. Delivery Address</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="sm:col-span-2">
                <label className="text-xs font-semibold text-stone-900 block mb-1">
                  Full Name *
                </label>
                <input
                  type="text"
                  name="fullName"
                  required
                  placeholder="e.g. Vikramaditya Rao"
                  value={formData.fullName}
                  onChange={handleInputChange}
                  className="w-full px-3.5 py-2.5 text-xs min-h-[44px] bg-white border border-stone-300 rounded-xl outline-none focus:border-amber-500 text-stone-900"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-stone-900 block mb-1">
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
                  className="w-full px-3.5 py-2.5 text-xs min-h-[44px] bg-white border border-stone-300 rounded-xl outline-none focus:border-amber-500 text-stone-900 font-mono"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-stone-900 block mb-1">
                  Email Address (Optional)
                </label>
                <input
                  type="email"
                  name="email"
                  placeholder="name@example.com"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full px-3.5 py-2.5 text-xs min-h-[44px] bg-white border border-stone-300 rounded-xl outline-none focus:border-amber-500 text-stone-900"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="text-xs font-semibold text-stone-900 block mb-1">
                  Street Address (House No, Flat, Street) *
                </label>
                <input
                  type="text"
                  name="streetAddress"
                  required
                  placeholder="e.g. Flat 402, Sri Krishna Residency, Temple Road"
                  value={formData.streetAddress}
                  onChange={handleInputChange}
                  className="w-full px-3.5 py-2.5 text-xs min-h-[44px] bg-white border border-stone-300 rounded-xl outline-none focus:border-amber-500 text-stone-900"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-stone-900 block mb-1">
                  Landmark (Optional)
                </label>
                <input
                  type="text"
                  name="landmark"
                  placeholder="Near Metro Pillar / Temple Landmark"
                  value={formData.landmark}
                  onChange={handleInputChange}
                  className="w-full px-3.5 py-2.5 text-xs min-h-[44px] bg-white border border-stone-300 rounded-xl outline-none focus:border-amber-500 text-stone-900"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-stone-900 block mb-1">
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
                  className="w-full px-3.5 py-2.5 text-xs min-h-[44px] bg-white border border-stone-300 rounded-xl outline-none focus:border-amber-500 text-stone-900 font-mono"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-stone-900 block mb-1">
                  City *
                </label>
                <input
                  type="text"
                  name="city"
                  required
                  placeholder="e.g. Hyderabad / Bengaluru / Chennai"
                  value={formData.city}
                  onChange={handleInputChange}
                  className="w-full px-3.5 py-2.5 text-xs min-h-[44px] bg-white border border-stone-300 rounded-xl outline-none focus:border-amber-500 text-stone-900"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-stone-900 block mb-1">
                  State *
                </label>
                <input
                  type="text"
                  name="state"
                  required
                  placeholder="e.g. Telangana / Andhra Pradesh / Karnataka"
                  value={formData.state}
                  onChange={handleInputChange}
                  className="w-full px-3.5 py-2.5 text-xs min-h-[44px] bg-white border border-stone-300 rounded-xl outline-none focus:border-amber-500 text-stone-900"
                />
              </div>
            </div>

            <div>
              <label className="text-xs font-semibold text-stone-900 block mb-1">
                Special Delivery Notes / Inscriptions (Optional)
              </label>
              <textarea
                rows={2}
                placeholder="e.g. Preferred delivery timing, gift wrap request, or custom inscription notes."
                value={orderNotes}
                onChange={(e) => setOrderNotes(e.target.value)}
                className="w-full px-3.5 py-2 text-xs bg-white border border-stone-300 rounded-xl outline-none focus:border-amber-500 text-stone-900"
              />
            </div>
          </div>

          {/* 2. Payment & Checkout Method */}
          <div className="bg-white p-6 sm:p-7 rounded-3xl border border-stone-200 shadow-sm space-y-4">
            <div className="flex items-center justify-between flex-wrap gap-2">
              <h3 className="font-serif font-bold text-lg text-stone-900 flex items-center gap-2">
                <CreditCard className="w-5 h-5 text-amber-600" />
                <span>2. Payment Method</span>
              </h3>
              <span className="text-[11px] text-emerald-800 bg-emerald-50 border border-emerald-200 px-2.5 py-0.5 rounded-full font-bold flex items-center gap-1">
                <Lock className="w-3 h-3 text-emerald-600" />
                <span>256-Bit SSL Secure</span>
              </span>
            </div>

            <div className="space-y-3">
              {/* Online Payment (Razorpay) */}
              <div className="flex items-start gap-3.5 p-4 sm:p-5 rounded-2xl border-2 border-amber-500 bg-amber-50/30 ring-2 ring-amber-400/20 shadow-xs">
                <input
                  type="radio"
                  name="paymentMethod"
                  value="razorpay"
                  checked={true}
                  readOnly
                  className="mt-1 accent-amber-600 w-4 h-4 cursor-pointer"
                />
                <div className="flex-1 space-y-1.5">
                  <div className="flex items-center justify-between flex-wrap gap-2">
                    <span className="font-bold text-sm text-stone-900 flex items-center gap-2">
                      <span>Online Payment (Razorpay)</span>
                      <span className="text-[10px] font-bold text-amber-900 bg-amber-100 border border-amber-300 px-2 py-0.5 rounded-full">
                        100% Secure
                      </span>
                    </span>
                    <span className="text-[10.5px] font-semibold text-emerald-700">
                      Zero Processing Fee
                    </span>
                  </div>
                  <p className="text-xs text-stone-600 leading-relaxed">
                    Pay securely with any UPI app (Google Pay, PhonePe, Paytm, BHIM), Credit/Debit Cards (Visa, MasterCard, RuPay), NetBanking (50+ Banks), or Wallets.
                  </p>
                  <div className="flex items-center gap-2 pt-1 flex-wrap">
                    <span className="px-2 py-0.5 bg-stone-100 border border-stone-200 rounded text-[10px] font-bold text-stone-700">UPI</span>
                    <span className="px-2 py-0.5 bg-stone-100 border border-stone-200 rounded text-[10px] font-bold text-stone-700">Cards</span>
                    <span className="px-2 py-0.5 bg-stone-100 border border-stone-200 rounded text-[10px] font-bold text-stone-700">NetBanking</span>
                    <span className="px-2 py-0.5 bg-stone-100 border border-stone-200 rounded text-[10px] font-bold text-stone-700">Wallets</span>
                  </div>
                </div>
              </div>
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
        <div className="lg:col-span-5 bg-white p-6 sm:p-7 rounded-3xl border border-stone-200 shadow-sm space-y-6">
          <div className="flex items-center justify-between border-b border-stone-200 pb-3">
            <h3 className="font-serif font-bold text-lg text-stone-900">
              Review Your Cart ({items.length} items)
            </h3>
            <span className="text-[11px] text-amber-700 font-bold">100% Insured</span>
          </div>

          {/* Cart Item Updates with Quantity Changer */}
          <div className="space-y-3 max-h-72 overflow-y-auto pr-1 divide-y divide-stone-100 text-xs">
            {items.map((it) => (
              <div key={it.id} className="pt-3 first:pt-0 flex gap-3 items-center">
                <img
                  src={it.customization?.previewUrl || it.image}
                  alt={it.title}
                  className="w-14 h-14 object-cover rounded-xl border border-stone-200 shrink-0 bg-stone-100"
                />
                <div className="flex-1 min-w-0">
                  <p className="font-bold text-stone-900 truncate">{it.title}</p>
                  <p className="text-[11px] text-stone-500">
                    {it.selectedModel ? (
                      <span className="font-bold text-stone-900 bg-stone-100 px-1.5 py-0.5 rounded border border-stone-200 mr-1.5">
                        {it.selectedModel}
                      </span>
                    ) : null}
                    {it.size} {it.lighting ? `• ${it.lighting}` : ''}
                  </p>
                  <div className="flex items-center gap-2 mt-1.5">
                    {/* Quantity Controls */}
                    <div className="flex items-center border border-stone-300 rounded-lg overflow-hidden bg-stone-50">
                      <button
                        type="button"
                        onClick={() => updateQuantity(it.id, Math.max(1, it.quantity - 1))}
                        className="px-2 py-0.5 hover:bg-stone-200 text-stone-700 font-bold text-xs cursor-pointer"
                        aria-label="Decrease quantity"
                      >
                        <Minus className="w-2.5 h-2.5" />
                      </button>
                      <span className="px-2 font-bold text-[11px] text-stone-900">{it.quantity}</span>
                      <button
                        type="button"
                        onClick={() => updateQuantity(it.id, it.quantity + 1)}
                        className="px-2 py-0.5 hover:bg-stone-200 text-stone-700 font-bold text-xs cursor-pointer"
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
                {it.size?.toLowerCase().includes('custom size') || it.variantId?.toLowerCase().includes('custom-size') ? (
                  <span className="font-bold text-stone-950 bg-[#FEE815] px-2 py-0.5 rounded-full shrink-0 text-xs">
                    Custom Sizing
                  </span>
                ) : (
                  <span className="font-bold text-stone-900 shrink-0 text-sm">
                    ₹{(it.unitPrice * it.quantity).toLocaleString('en-IN')}
                  </span>
                )}
              </div>
            ))}
          </div>

          {/* ══════════════════════════════════════
              COUPON APPLICATION SECTION
             ══════════════════════════════════════ */}
          <div className="p-4 bg-stone-50 border border-stone-200 rounded-2xl space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-stone-900 flex items-center gap-1.5">
                <Tag className="w-3.5 h-3.5 text-amber-600" />
                <span>Promotional Coupon</span>
              </span>
              {appliedCoupon && (
                <span className="text-[10px] font-bold text-emerald-800 bg-emerald-100 border border-emerald-300 px-2 py-0.5 rounded-full">
                  Applied
                </span>
              )}
            </div>

            {appliedCoupon ? (
              <div className="flex items-center justify-between p-3 bg-emerald-50 border border-emerald-200 rounded-xl text-xs">
                <div className="space-y-0.5">
                  <div className="flex items-center gap-2">
                    <span className="font-mono font-extrabold text-emerald-900 text-sm tracking-wider">
                      {appliedCoupon.code}
                    </span>
                    <span className="text-[10.5px] font-bold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded-md border border-emerald-300">
                      {appliedCoupon.discountType === 'percentage'
                        ? `${appliedCoupon.discountValue}% OFF`
                        : `₹${appliedCoupon.discountValue} FLAT OFF`}
                    </span>
                  </div>
                  <p className="text-[11px] text-emerald-700 font-medium">
                    You saved ₹{discountAmount.toLocaleString('en-IN')} on this order!
                  </p>
                </div>

                <button
                  type="button"
                  onClick={handleRemoveCoupon}
                  className="px-2.5 py-1 text-[11px] font-bold text-rose-700 hover:text-rose-900 hover:bg-rose-100/70 rounded-lg transition-colors cursor-pointer border border-rose-200"
                >
                  Remove
                </button>
              </div>
            ) : (
              <div className="space-y-2">
                <div className="flex gap-2">
                  <div className="relative flex-1">
                    <input
                      type="text"
                      value={couponInput}
                      onChange={(e) => setCouponInput(e.target.value.toUpperCase())}
                      placeholder="Coupon Code: e.g. ABHIS10"
                      className="w-full px-3.5 py-2.5 bg-white border border-stone-300 rounded-xl outline-none font-mono text-xs uppercase font-bold text-amber-950 focus:border-amber-500 placeholder:normal-case placeholder:font-normal placeholder-stone-400"
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                          e.preventDefault();
                          handleApplyCoupon(e);
                        }
                      }}
                    />
                  </div>
                  <button
                    type="button"
                    onClick={handleApplyCoupon}
                    disabled={applyingCoupon || !couponInput.trim()}
                    className="px-5 py-2.5 bg-[#FEE815] hover:bg-[#FFF04B] disabled:bg-stone-200 text-stone-950 disabled:text-stone-400 font-extrabold text-xs rounded-xl shadow-xs transition-all uppercase tracking-wider cursor-pointer shrink-0"
                  >
                    {applyingCoupon ? 'Checking...' : 'APPLY'}
                  </button>
                </div>
              </div>
            )}

            {/* Success or Error Feedback Message */}
            {couponFeedback && (
              <div
                className={`p-2.5 rounded-xl text-xs font-medium flex items-start gap-2 ${
                  couponFeedback.type === 'success'
                    ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                    : 'bg-rose-50 text-rose-800 border border-rose-200'
                }`}
              >
                {couponFeedback.type === 'success' ? (
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                ) : (
                  <AlertCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
                )}
                <span className="leading-tight">{couponFeedback.message}</span>
              </div>
            )}
          </div>

          {/* Itemized Pricing Summary */}
          <div className="space-y-2 text-xs text-stone-600 border-t border-stone-200 pt-3">
            <div className="flex justify-between">
              <span>Items Subtotal</span>
              <span className="font-semibold text-stone-900">₹{subtotal.toLocaleString('en-IN')}</span>
            </div>

            {appliedCoupon && discountAmount > 0 && (
              <div className="flex justify-between text-emerald-700 font-semibold">
                <div className="flex flex-col">
                  <span>Coupon Discount ({appliedCoupon.code})</span>
                  <span className="text-[10px] text-emerald-600 font-normal">
                    {appliedCoupon.discountType === 'percentage'
                      ? `${appliedCoupon.discountValue}% Percentage Discount`
                      : `Flat ₹${appliedCoupon.discountValue} Off`}
                  </span>
                </div>
                <span className="font-bold">-₹{discountAmount.toLocaleString('en-IN')}</span>
              </div>
            )}

            <div className="flex justify-between text-base font-serif font-bold text-stone-900 pt-3 border-t border-stone-200">
              <span>Final Total Payable</span>
              <span className="font-extrabold text-xl text-stone-900">
                ₹{finalPayable.toLocaleString('en-IN')}
              </span>
            </div>
          </div>

          {/* Order Completion CTA Button */}
          <div className="space-y-3 pt-2">
            <button
              type="submit"
              disabled={submitting}
              className={`w-full py-4 rounded-2xl font-black text-sm sm:text-base shadow-md transition-all flex items-center justify-center gap-2.5 cursor-pointer uppercase tracking-wider ${
                submitting
                  ? 'bg-stone-300 text-stone-500 cursor-not-allowed'
                  : 'bg-[#FEE815] hover:bg-[#FFF04B] text-stone-950 shadow-lg shadow-[#FEE815]/30 hover:scale-[1.01]'
              }`}
            >
              {submitting ? (
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-stone-900 border-t-transparent rounded-full animate-spin" />
                  <span>Processing Order...</span>
                </div>
              ) : (
                <>
                  <Lock className="w-4 h-4 text-stone-950" />
                  <span>Buy Now • ₹{finalPayable.toLocaleString('en-IN')}</span>
                </>
              )}
            </button>

            <div className="flex items-center justify-center gap-2 text-[11px] text-stone-500 text-center font-medium">
              <span className="inline-block w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>UPI (GPay / PhonePe / Paytm) • Credit / Debit Cards • NetBanking • Wallets</span>
            </div>

            <div className="flex items-center justify-center gap-1.5 text-[11px] text-stone-500 text-center">
              <ShieldCheck className="w-3.5 h-3.5 text-amber-600" />
              <span>Multi-Layer Protective Packaging • Handcrafted in Hyderabad</span>
            </div>
          </div>
        </div>
      </form>

      {/* Razorpay Sandbox / Simulator Modal */}
      {showSimModal && simOrderInfo && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-xs p-4 animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl max-w-md w-full shadow-2xl border border-stone-200 overflow-hidden">
            {/* Modal Header mimicking Razorpay Checkout */}
            <div className="bg-gradient-to-r from-blue-700 via-indigo-700 to-blue-800 p-5 text-white">
              <div className="flex items-center justify-between">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-extrabold text-base tracking-tight font-serif">Abhi's Gifts</span>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-blue-500/40 text-blue-100 border border-blue-400/30 uppercase tracking-wider">
                      Razorpay Gateway
                    </span>
                  </div>
                  <p className="text-xs text-blue-200 mt-0.5">Order #{simOrderInfo.orderId.slice(-8).toUpperCase()}</p>
                </div>
                <div className="text-right">
                  <span className="text-xs text-blue-200 uppercase font-semibold">Payable</span>
                  <p className="text-xl font-extrabold text-white">₹{simOrderInfo.amount.toLocaleString('en-IN')}</p>
                </div>
              </div>
            </div>

            {/* Modal Body */}
            <div className="p-6 space-y-4">
              <div className="bg-amber-50 border border-amber-200/80 rounded-2xl p-3.5 text-xs text-amber-900 space-y-1">
                <div className="flex items-center gap-1.5 font-bold text-amber-950">
                  <Sparkles className="w-4 h-4 text-amber-600" />
                  <span>Razorpay Test / Simulation Mode</span>
                </div>
                <p className="text-[11.5px] leading-relaxed text-stone-700">
                  Your Razorpay API keys are pending setup. Once you add <code className="bg-amber-100 px-1 py-0.5 rounded font-mono text-[10.5px]">RAZORPAY_KEY_ID</code> to your environment, the official Razorpay popup opens automatically.
                </p>
              </div>

              <div className="space-y-2">
                <p className="text-xs font-bold text-stone-700 uppercase tracking-wider">
                  Select payment test action:
                </p>

                <button
                  type="button"
                  onClick={() => handleSimulateSuccess('UPI')}
                  disabled={submitting}
                  className="w-full p-3.5 rounded-xl border border-stone-200 hover:border-blue-500 hover:bg-blue-50/50 transition-all flex items-center justify-between text-left group cursor-pointer"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-lg bg-emerald-100 text-emerald-800 font-bold flex items-center justify-center text-xs">
                      UPI
                    </div>
                    <div>
                      <p className="text-sm font-bold text-stone-900 group-hover:text-blue-700">
                        Simulate Instant UPI (GPay / PhonePe)
                      </p>
                      <p className="text-[11px] text-stone-500">Auto-verifies signature &amp; marks order as Paid</p>
                    </div>
                  </div>
                  <ArrowRight className="w-4 h-4 text-stone-400 group-hover:text-blue-600" />
                </button>

                <button
                  type="button"
                  onClick={() => handleSimulateSuccess('Card')}
                  disabled={submitting}
                  className="w-full p-3.5 rounded-xl border border-stone-200 hover:border-blue-500 hover:bg-blue-50/50 transition-all flex items-center justify-between text-left group cursor-pointer"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-lg bg-blue-100 text-blue-800 font-bold flex items-center justify-center text-xs">
                      <CreditCard className="w-4 h-4 text-blue-700" />
                    </div>
                    <div>
                      <p className="text-sm font-bold text-stone-900 group-hover:text-blue-700">
                        Simulate Credit / Debit Card Payment
                      </p>
                      <p className="text-[11px] text-stone-500">Visa, Mastercard, RuPay test transaction</p>
                    </div>
                  </div>
                  <ArrowRight className="w-4 h-4 text-stone-400 group-hover:text-blue-600" />
                </button>
              </div>

              <div className="pt-2 flex items-center justify-between border-t border-stone-100">
                <button
                  type="button"
                  onClick={() => setShowSimModal(false)}
                  className="text-xs font-semibold text-stone-500 hover:text-stone-800 py-1 transition-colors cursor-pointer"
                >
                  Cancel / Return
                </button>
                <div className="flex items-center gap-1 text-[11px] text-stone-400">
                  <Lock className="w-3 h-3 text-emerald-600" />
                  <span>256-Bit SSL Encrypted</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
