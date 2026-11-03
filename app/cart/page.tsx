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
        <div className="w-20 h-20 rounded-full bg-[#222222] flex items-center justify-center mx-auto text-gray-500">
          <ShoppingBag className="w-10 h-10" />
        </div>
        <div>
          <h1 className="font-serif font-bold text-2xl sm:text-3xl text-white">Your Shopping Bag is Empty</h1>
          <p className="text-xs sm:text-sm text-gray-400 mt-2 max-w-md mx-auto">
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
      <div className="flex items-center justify-between border-b border-[#2D2D2D] pb-4">
        <div>
          <h1 className="font-serif font-bold text-2xl sm:text-3xl text-white">Shopping Bag</h1>
          <p className="text-xs text-gray-400 mt-0.5">{items.length} unique artwork selections</p>
        </div>
        <Link href="/shop" className="text-xs font-semibold text-amber-800 hover:underline flex items-center gap-1">
          <ArrowLeft className="w-3.5 h-3.5" /> Continue Shopping
        </Link>
      </div>

      

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* LEFT: Items List (8 cols) */}
        <div className="lg:col-span-8 bg-[#181818] rounded-3xl border border-[#2D2D2D] shadow-sm p-4 sm:p-6 divide-y divide-stone-100">
          {items.map((item) => (
            <div key={item.id} className="py-4 sm:py-6 flex gap-4 first:pt-0 last:pb-0">
              <img
                src={item.customization?.previewUrl || item.image}
                alt={item.title}
                className="w-20 h-20 sm:w-28 sm:h-28 object-cover rounded-2xl border border-[#2D2D2D] shrink-0"
              />

              <div className="flex-1 min-w-0 flex flex-col justify-between">
                <div>
                  <div className="flex items-start justify-between gap-2">
                    <Link
                      href={`/product/${item.slug}`}
                      className="font-serif font-bold text-sm sm:text-base text-white hover:text-amber-800 line-clamp-1"
                    >
                      {item.title}
                    </Link>
                    <button
                      type="button"
                      onClick={() => removeFromCart(item.id)}
                      className="text-gray-500 hover:text-red-600 transition-colors w-8 h-8 sm:w-9 sm:h-9 flex items-center justify-center rounded-lg hover:bg-red-50 cursor-pointer"
                      title="Remove"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>

                  <div className="text-xs text-gray-400 mt-1 space-y-0.5">
                    <p>Size: <span className="font-semibold text-white">{item.size}</span></p>
                    <p>Finish: <span className="font-semibold text-white">{item.finish}</span></p>
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

                <div className="flex items-center justify-between pt-2 border-t border-[#2D2D2D] mt-2">
                  <div className="flex items-center border border-[#333333] rounded-xl bg-[#1A1A1A]">
                    <button
                      type="button"
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      className="w-9 h-9 sm:w-10 sm:h-10 flex items-center justify-center text-gray-300 hover:bg-[#222222] rounded-l-xl cursor-pointer"
                    >
                      <Minus className="w-3.5 h-3.5" />
                    </button>
                    <span className="px-3 text-xs font-bold text-white min-w-8 text-center">
                      {item.quantity}
                    </span>
                    <button
                      type="button"
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="w-9 h-9 sm:w-10 sm:h-10 flex items-center justify-center text-gray-300 hover:bg-[#222222] rounded-r-xl cursor-pointer"
                    >
                      <Plus className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <div className="text-right">
                    <span className="font-serif font-bold text-base sm:text-lg text-white">
                      ₹{(item.unitPrice * item.quantity).toLocaleString('en-IN')}
                    </span>
                    {item.unitMrp > item.unitPrice && (
                      <span className="block text-xs text-gray-500 line-through">
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
        <div className="lg:col-span-4 bg-[#1A1A1A] p-6 sm:p-7 rounded-3xl border border-[#2D2D2D] shadow-sm space-y-5">
          <h3 className="font-serif font-bold text-lg text-white border-b pb-3">
            Order Summary
          </h3>

          {/* Coupon Box */}
          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-wider text-amber-900 block">
              Discount Coupon
            </label>
            {appliedCoupon ? (
              <div className="flex items-center justify-between bg-[#1E1E1E] border border-[#2D2D2D] text-[#FFFFFF] px-3 py-2 rounded-xl text-xs font-medium">
                <span className="flex items-center gap-1.5">
                  <Tag className="w-4 h-4 text-[#EAB308]" />
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
                  className="flex-1 px-3 py-2 text-xs bg-stone-50 border border-[#333333] rounded-xl uppercase outline-none focus:border-amber-700 font-medium"
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
            {statusMessage && !couponError && <p className="text-xs text-[#D1D5DB]">{statusMessage}</p>}
          </div>

          {/* Price Breakdown */}
          <div className="space-y-2 text-xs text-gray-300 pt-2 border-t border-[#2D2D2D]">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span className="font-semibold text-white">₹{subtotal.toLocaleString('en-IN')}</span>
            </div>

            {discountAmount > 0 && (
              <div className="flex justify-between text-[#D1D5DB] font-semibold">
                <span>Coupon Savings</span>
                <span>-₹{discountAmount.toLocaleString('en-IN')}</span>
              </div>
            )}

            <div className="flex justify-between">
              <span>Pan-India Delivery</span>
              <span>
                `₹${shippingFee}`
              </span>
            </div>

            <div className="flex justify-between text-base font-serif font-bold text-[#FFFFFF] pt-3 border-t border-[#2D2D2D]">
              <span>Final Total</span>
              <span className="text-[#FFFFFF] font-serif font-extrabold text-lg">₹{totalAmount.toLocaleString('en-IN')}</span>
            </div>
          </div>

          <div className="space-y-2 pt-2">
            <button
              type="button"
              onClick={() => router.push('/checkout')}
              className="w-full bg-[#EAB308] hover:bg-[#FACC15] text-[#000000] border border-[#EAB308] py-3.5 rounded-xl font-bold text-sm shadow-[0_4px_16px_rgba(234,179,8,0.25)] flex items-center justify-center gap-2 transition-all hover:scale-[1.01]"
            >
              <span>Proceed to Checkout</span>
              <ArrowRight className="w-4 h-4 text-[#EAB308]" />
            </button>

            <div className="flex items-center justify-center gap-1.5 text-[11px] text-[#D1D5DB] text-center">
              <ShieldCheck className="w-3.5 h-3.5 text-[#EAB308]" />
              <span>Direct WhatsApp Order • 100% Transit Safe Guarantee</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
