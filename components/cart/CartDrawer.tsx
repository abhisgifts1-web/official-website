'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  X,
  ShoppingBag,
  Trash2,
  Plus,
  Minus,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Tag,
} from 'lucide-react';
import { useCart } from '@/context/CartContext';

export default function CartDrawer() {
  const router = useRouter();
  const {
    items,
    isCartOpen,
    closeCart,
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

  if (!isCartOpen) return null;

  const handleApply = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!couponInput.trim()) return;
    setApplying(true);
    setStatusMessage(null);
    const result = await applyCoupon(couponInput);
    setApplying(false);
    setStatusMessage(result.message);
    if (result.success) {
      setCouponInput('');
    }
  };

  const handleProceedCheckout = () => {
    closeCart();
    router.push('/checkout');
  };

  const amountNeededForFreeShipping = Math.max(0, freeShippingThreshold - subtotal);

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-stone-900/60 backdrop-blur-sm transition-opacity animate-in fade-in"
        onClick={closeCart}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-4 sm:pl-10">
        <div className="w-screen max-w-md bg-white shadow-2xl border-l border-stone-200 flex flex-col animate-in slide-in-from-right duration-250 text-stone-900">
          {/* Header */}
          <div className="p-4 sm:p-5 border-b border-stone-200 flex items-center justify-between bg-stone-50">
            <div className="flex items-center gap-2.5">
              <ShoppingBag className="w-5 h-5 text-amber-700" />
              <h2 className="font-serif font-bold text-lg text-stone-900">Your Shopping Bag</h2>
              <span className="text-xs font-semibold bg-amber-100 text-amber-900 px-2 py-0.5 rounded-full">
                {items.reduce((s, it) => s + it.quantity, 0)}
              </span>
            </div>
            <button
              type="button"
              onClick={closeCart}
              className="p-1.5 text-stone-500 hover:text-stone-900 rounded-lg hover:bg-stone-200/60 transition-colors cursor-pointer"
              aria-label="Close cart"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Items Container */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-4">
            {items.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center p-6 space-y-4">
                <div className="w-16 h-16 rounded-full bg-stone-100 flex items-center justify-center text-stone-400">
                  <ShoppingBag className="w-8 h-8" />
                </div>
                <div>
                  <h3 className="font-serif font-bold text-lg text-stone-900">Your bag is empty</h3>
                  <p className="text-sm text-stone-600 mt-1 max-w-xs">
                    Explore our divine acrylic wall art and handcrafted backlit collections.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    closeCart();
                    router.push('/shop');
                  }}
                  className="bg-stone-900 hover:bg-stone-800 text-white px-6 py-2.5 rounded-full text-xs font-semibold shadow-warm transition-colors cursor-pointer"
                >
                  Explore Sacred Collection →
                </button>
              </div>
            ) : (
              <div className="divide-y divide-stone-200">
                {items.map((item) => (
                  <div key={item.id} className="py-3.5 flex gap-3.5 first:pt-0 last:pb-0">
                    <img
                      src={item.customization?.previewUrl || item.image}
                      alt={item.title}
                      className="w-20 h-20 sm:w-22 sm:h-22 object-cover rounded-lg border border-stone-200 shrink-0"
                    />

                    <div className="flex-1 min-w-0 flex flex-col justify-between">
                      <div>
                        <div className="flex items-start justify-between gap-2">
                          <Link
                            href={`/product/${item.slug}`}
                            onClick={closeCart}
                            className="font-semibold text-xs sm:text-sm text-stone-900 hover:text-amber-700 line-clamp-1"
                          >
                            {item.title}
                          </Link>
                          <button
                            type="button"
                            onClick={() => removeFromCart(item.id)}
                            className="text-stone-400 hover:text-red-600 transition-colors p-0.5 cursor-pointer"
                            title="Remove item"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>

                        {/* Variant attributes */}
                        <div className="text-[11px] text-stone-600 mt-0.5 space-y-0.5">
                          {item.shape && (
                            <p>Shape: <span className="font-semibold text-stone-900 capitalize bg-amber-50 px-1.5 py-0.5 rounded border border-amber-200/60 inline-block">{item.shape}</span></p>
                          )}
                          <p>Size: <span className="font-medium text-stone-800">{item.size}</span></p>
                          <p>Finish: <span className="font-medium text-stone-800">{item.finish}</span></p>
                          {item.lighting && !item.lighting.includes('No Light') && (
                            <span className="inline-block bg-amber-100 text-amber-900 px-1.5 py-0.2 rounded text-[10px] font-semibold mt-0.5">
                              ✨ LED Backlit
                            </span>
                          )}
                          {item.customization?.customText && (
                            <p className="text-amber-800 italic font-serif">
                              &ldquo;{item.customization.customText}&rdquo;
                            </p>
                          )}
                        </div>
                      </div>

                      {/* Quantity & Price */}
                      <div className="flex items-center justify-between mt-2 pt-1 border-t border-stone-100">
                        <div className="flex items-center border border-stone-300 rounded-lg bg-stone-50">
                          <button
                            type="button"
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="p-1 sm:px-2 text-stone-700 hover:bg-stone-200 rounded-l-lg transition-colors cursor-pointer"
                            aria-label="Decrease quantity"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="px-2 text-xs font-semibold text-stone-900 min-w-6 text-center">
                            {item.quantity}
                          </span>
                          <button
                            type="button"
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="p-1 sm:px-2 text-stone-700 hover:bg-stone-200 rounded-r-lg transition-colors cursor-pointer"
                            aria-label="Increase quantity"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>

                        <div className="text-right">
                          {item.size?.toLowerCase().includes('custom size') || item.variantId?.toLowerCase().includes('custom-size') ? (
                            <span className="text-[11px] font-semibold text-[#25D366] block">
                              Price in WhatsApp
                            </span>
                          ) : (
                            <>
                              <span className="text-xs sm:text-sm font-bold text-stone-900">
                                ₹{(item.unitPrice * item.quantity).toLocaleString('en-IN')}
                              </span>
                              {item.unitMrp > item.unitPrice && (
                                <span className="block text-[10px] text-stone-400 line-through">
                                  ₹{(item.unitMrp * item.quantity).toLocaleString('en-IN')}
                                </span>
                              )}
                            </>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Footer (Pricing Breakdown & Checkout) */}
          {items.length > 0 && (
            <div className="p-4 sm:p-5 border-t border-stone-200 bg-stone-50 space-y-3">
              {/* Coupon Form */}
              <div>
                {appliedCoupon ? (
                  <div className="flex items-center justify-between bg-amber-50 border border-amber-300 text-stone-900 px-3 py-2 rounded-lg text-xs font-medium">
                    <span className="flex items-center gap-1.5">
                      <Tag className="w-3.5 h-3.5 text-amber-600" />
                      Code <strong>{appliedCoupon.code}</strong> applied (-₹{discountAmount.toLocaleString('en-IN')})
                    </span>
                    <button
                      type="button"
                      onClick={removeCoupon}
                      className="text-xs text-red-600 hover:underline font-semibold cursor-pointer"
                    >
                      Remove
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleApply} className="flex gap-2">
                    <input
                      type="text"
                      placeholder="Try WELCOME10 or ABHI500"
                      value={couponInput}
                      onChange={(e) => setCouponInput(e.target.value)}
                      className="flex-1 px-3 py-1.5 text-xs bg-white border border-stone-300 rounded-lg uppercase tracking-wider outline-none focus:border-amber-500 text-stone-900"
                    />
                    <button
                      type="submit"
                      disabled={applying || !couponInput.trim()}
                      className="bg-stone-900 hover:bg-stone-800 disabled:opacity-50 text-white text-xs font-semibold px-3 py-1.5 rounded-lg transition-colors cursor-pointer"
                    >
                      {applying ? 'Checking...' : 'Apply'}
                    </button>
                  </form>
                )}
                {couponError && <p className="text-xs text-red-600 mt-1">{couponError}</p>}
                {statusMessage && !couponError && (
                  <p className="text-xs text-stone-600 mt-1">{statusMessage}</p>
                )}
              </div>

              {/* Price rows */}
              <div className="space-y-1.5 text-xs text-stone-600 pt-2 border-t border-stone-200">
                <div className="flex justify-between">
                  <span>Bag Subtotal</span>
                  <span className="font-semibold text-stone-900">₹{subtotal.toLocaleString('en-IN')}</span>
                </div>

                {discountAmount > 0 && (
                  <div className="flex justify-between text-amber-700 font-medium">
                    <span>Discount Coupon</span>
                    <span>-₹{discountAmount.toLocaleString('en-IN')}</span>
                  </div>
                )}

                <div className="flex justify-between text-sm sm:text-base font-bold text-stone-900 pt-2 border-t border-stone-200">
                  <span>Final Total</span>
                  <span className="text-stone-900 font-serif font-extrabold text-base">₹{totalAmount.toLocaleString('en-IN')}</span>
                </div>
              </div>

              {/* CTAs */}
              <div className="pt-1 space-y-2">
                <button
                  type="button"
                  onClick={handleProceedCheckout}
                  className="w-full bg-[#EAB308] hover:bg-[#FACC15] text-stone-950 border border-amber-500 py-3 rounded-xl font-bold text-sm shadow-md flex items-center justify-center gap-2 transition-all hover:scale-[1.01] cursor-pointer uppercase tracking-wider"
                >
                  <span>Proceed to Checkout</span>
                  <ArrowRight className="w-4 h-4 text-stone-950" />
                </button>

                <div className="flex items-center justify-center gap-1.5 text-[11px] text-stone-500 text-center">
                  <ShieldCheck className="w-3.5 h-3.5 text-amber-600" />
                  <span>Direct WhatsApp Order • Protective Packaging</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
