'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  ShoppingBag,
  Trash2,
  Plus,
  Minus,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Tag,
  ArrowLeft,
} from 'lucide-react';
import { useCart } from '@/context/CartContext';

export default function CartPage() {
  const router = useRouter();
  const {
    items,
    subtotal,
    shippingFee,
    discountAmount,
    totalAmount,
    appliedCoupon,
    couponError,
    freeShippingThreshold,
    freeShippingProgress,
    removeFromCart,
    updateQuantity,
    applyCoupon,
    removeCoupon,
  } = useCart();

  const [couponInput, setCouponInput] = useState('');
  const [applying, setApplying] = useState(false);
  const [statusMessage, setStatusMessage] = useState<string | null>(null);

  const handleApplyCoupon = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!couponInput.trim()) return;
    setApplying(true);
    setStatusMessage(null);
    const result = await applyCoupon(couponInput);
    setApplying(false);
    setStatusMessage(result.message);
    if (result.success) setCouponInput('');
  };

  const amountNeeded = Math.max(0, freeShippingThreshold - subtotal);

  if (items.length === 0) {
    return (
      <div className="w-full max-w-[1760px] mx-auto px-4 sm:px-8 lg:px-12 xl:px-16 py-16 text-center space-y-6">
        <div className="w-20 h-20 rounded-full bg-stone-100 flex items-center justify-center mx-auto text-stone-400">
          <ShoppingBag className="w-10 h-10" />
        </div>
        <div>
          <h1 className="font-serif font-bold text-2xl sm:text-3xl text-stone-900">Your Shopping Bag is Empty</h1>
          <p className="text-xs sm:text-sm text-stone-500 mt-2 max-w-md mx-auto">
            You haven’t added any wall art yet. Explore our sacred devotional and illuminated LED collections.
          </p>
        </div>
        <Link
          href="/shop"
          className="inline-flex items-center gap-2 bg-stone-900 hover:bg-amber-800 text-white font-semibold text-xs sm:text-sm px-8 py-3.5 rounded-full shadow-warm transition-colors"
        >
          <span>Explore All Artworks</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    );
  }

  return (
    <div className="w-full max-w-[1760px] mx-auto px-4 sm:px-8 lg:px-12 xl:px-16 py-8 sm:py-12 space-y-8">
      <div className="flex items-center justify-between border-b border-stone-200 pb-4">
        <div>
          <h1 className="font-serif font-bold text-2xl sm:text-3xl text-stone-900">Shopping Bag</h1>
          <p className="text-xs text-stone-500 mt-0.5">{items.length} unique artwork selections</p>
        </div>
        <Link href="/shop" className="text-xs font-semibold text-amber-800 hover:underline flex items-center gap-1">
          <ArrowLeft className="w-3.5 h-3.5" /> Continue Shopping
        </Link>
      </div>

      {/* Free Shipping Alert */}
      <div className="p-4 bg-amber-50 rounded-2xl border border-amber-200 text-xs">
        {amountNeeded > 0 ? (
          <p className="text-stone-700 font-medium">
            Add <span className="font-bold text-amber-900">₹{amountNeeded.toLocaleString('en-IN')}</span> more to unlock <strong>FREE Pan-India Delivery</strong>!
          </p>
        ) : (
          <p className="text-[#641E2E] font-bold flex items-center gap-1.5">
            <Sparkles className="w-4 h-4 text-[#B88A35]" /> You’ve unlocked FREE Pan-India Delivery!
          </p>
        )}
        <div className="w-full bg-amber-200/60 rounded-full h-2 mt-2 overflow-hidden">
          <div
            className="bg-amber-600 h-2 rounded-full transition-all duration-300"
            style={{ width: `${freeShippingProgress}%` }}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* LEFT: Items List (8 cols) */}
        <div className="lg:col-span-8 bg-white rounded-3xl border border-stone-200 shadow-sm p-6 divide-y divide-stone-100">
          {items.map((item) => (
            <div key={item.id} className="py-4 sm:py-6 flex gap-4 first:pt-0 last:pb-0">
              <img
                src={item.customization?.previewUrl || item.image}
                alt={item.title}
                className="w-24 h-24 sm:w-28 sm:h-28 object-cover rounded-2xl border border-stone-200 shrink-0"
              />

              <div className="flex-1 min-w-0 flex flex-col justify-between">
                <div>
                  <div className="flex items-start justify-between gap-2">
                    <Link
                      href={`/product/${item.slug}`}
                      className="font-serif font-bold text-sm sm:text-base text-stone-900 hover:text-amber-800 line-clamp-1"
                    >
                      {item.title}
                    </Link>
                    <button
                      type="button"
                      onClick={() => removeFromCart(item.id)}
                      className="text-stone-400 hover:text-red-600 transition-colors p-1"
                      title="Remove"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>

                  <div className="text-xs text-stone-500 mt-1 space-y-0.5">
                    <p>Size: <span className="font-semibold text-stone-800">{item.size}</span></p>
                    <p>Finish: <span className="font-semibold text-stone-800">{item.finish}</span></p>
                    {item.lighting && !item.lighting.includes('No Light') && (
                      <span className="inline-block bg-amber-100 text-amber-900 px-2 py-0.5 rounded text-[10px] font-bold mt-1">
                        ✨ LED Backlit
                      </span>
                    )}
                    {item.customization?.customText && (
                      <p className="text-amber-900 italic font-serif mt-1">
                        Inscription: &ldquo;{item.customization.customText}&rdquo;
                      </p>
                    )}
                  </div>
                </div>

                <div className="flex items-center justify-between pt-2 border-t border-stone-100 mt-2">
                  <div className="flex items-center border border-stone-300 rounded-xl bg-white">
                    <button
                      type="button"
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      className="px-2.5 py-1 text-stone-600 hover:bg-stone-100 rounded-l-xl"
                    >
                      <Minus className="w-3.5 h-3.5" />
                    </button>
                    <span className="px-3 text-xs font-bold text-stone-900 min-w-8 text-center">
                      {item.quantity}
                    </span>
                    <button
                      type="button"
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="px-2.5 py-1 text-stone-600 hover:bg-stone-100 rounded-r-xl"
                    >
                      <Plus className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <div className="text-right">
                    <span className="font-serif font-bold text-base sm:text-lg text-stone-900">
                      ₹{(item.unitPrice * item.quantity).toLocaleString('en-IN')}
                    </span>
                    {item.unitMrp > item.unitPrice && (
                      <span className="block text-xs text-stone-400 line-through">
                        ₹{(item.unitMrp * item.quantity).toLocaleString('en-IN')}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* RIGHT: Order Summary (4 cols) */}
        <div className="lg:col-span-4 bg-white p-6 sm:p-7 rounded-3xl border border-stone-200 shadow-sm space-y-5">
          <h3 className="font-serif font-bold text-lg text-stone-900 border-b pb-3">
            Order Summary
          </h3>

          {/* Coupon Box */}
          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-wider text-amber-900 block">
              Discount Coupon
            </label>
            {appliedCoupon ? (
              <div className="flex items-center justify-between bg-[#FCE7EA] border border-[#E8D5BD] text-[#641E2E] px-3 py-2 rounded-xl text-xs font-medium">
                <span className="flex items-center gap-1.5">
                  <Tag className="w-4 h-4 text-[#B88A35]" />
                  <strong>{appliedCoupon.code}</strong> (-₹{discountAmount.toLocaleString('en-IN')})
                </span>
                <button
                  type="button"
                  onClick={removeCoupon}
                  className="text-xs text-red-600 hover:underline font-bold"
                >
                  Remove
                </button>
              </div>
            ) : (
              <form onSubmit={handleApplyCoupon} className="flex gap-2">
                <input
                  type="text"
                  placeholder="WELCOME10 or ABHI500"
                  value={couponInput}
                  onChange={(e) => setCouponInput(e.target.value)}
                  className="flex-1 px-3 py-2 text-xs bg-stone-50 border border-stone-300 rounded-xl uppercase outline-none focus:border-amber-700 font-medium"
                />
                <button
                  type="submit"
                  disabled={applying || !couponInput.trim()}
                  className="bg-stone-800 hover:bg-stone-900 disabled:opacity-50 text-white text-xs font-semibold px-4 py-2 rounded-xl transition-colors"
                >
                  {applying ? 'Checking...' : 'Apply'}
                </button>
              </form>
            )}
            {couponError && <p className="text-xs text-red-600">{couponError}</p>}
            {statusMessage && !couponError && <p className="text-xs text-[#795D58]">{statusMessage}</p>}
          </div>

          {/* Price Breakdown */}
          <div className="space-y-2 text-xs text-stone-600 pt-2 border-t border-stone-100">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span className="font-semibold text-stone-900">₹{subtotal.toLocaleString('en-IN')}</span>
            </div>

            {discountAmount > 0 && (
              <div className="flex justify-between text-[#795D58] font-semibold">
                <span>Coupon Savings</span>
                <span>-₹{discountAmount.toLocaleString('en-IN')}</span>
              </div>
            )}

            <div className="flex justify-between">
              <span>Pan-India Delivery</span>
              <span>
                {shippingFee === 0 ? <strong className="text-[#795D58] font-bold">FREE</strong> : `₹${shippingFee}`}
              </span>
            </div>

            <div className="flex justify-between text-base font-serif font-bold text-[#641E2E] pt-3 border-t border-[#E8D5BD]">
              <span>Final Total</span>
              <span className="text-[#641E2E] font-serif font-extrabold text-lg">₹{totalAmount.toLocaleString('en-IN')}</span>
            </div>
          </div>

          <div className="space-y-2 pt-2">
            <button
              type="button"
              onClick={() => router.push('/checkout')}
              className="w-full bg-[#641E2E] hover:bg-[#32151D] text-[#FFF7ED] border border-[#B88A35]/50 py-3.5 rounded-xl font-semibold text-sm shadow-[0_4px_16px_rgba(101,30,45,0.3)] flex items-center justify-center gap-2 transition-all hover:scale-[1.01]"
            >
              <span>Proceed to Checkout</span>
              <ArrowRight className="w-4 h-4 text-[#B88A35]" />
            </button>

            <div className="flex items-center justify-center gap-1.5 text-[11px] text-[#795D58] text-center">
              <ShieldCheck className="w-3.5 h-3.5 text-[#B88A35]" />
              <span>Direct WhatsApp Order • 100% Transit Safe Guarantee</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
