'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { 
  Search, 
  Package, 
  Truck, 
  CheckCircle2, 
  Clock, 
  Sparkles, 
  ShieldCheck, 
  ArrowRight,
  PhoneCall,
  MessageCircle
} from 'lucide-react';

interface TrackedOrder {
  id: string;
  createdAt: string;
  orderStatus: string;
  paymentStatus: string;
  paymentMethod: string;
  totalAmount: number;
  trackingNumber: string;
  courierPartner: string;
  items: Array<{
    id: string;
    title: string;
    image: string;
    size: string;
    quantity: number;
    unitPrice: number;
  }>;
  destination: {
    city: string;
    state: string;
    pincode: string;
    recipientName: string;
    mobileMasked: string;
  };
}

export default function TrackOrderPage() {
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [orders, setOrders] = useState<TrackedOrder[] | null>(null);
  const [hasSearched, setHasSearched] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = query.trim();
    if (!trimmed) {
      setErrorMsg('Please enter your Order ID or registered 10-digit mobile number.');
      return;
    }

    setLoading(true);
    setErrorMsg('');
    setOrders(null);
    setHasSearched(true);

    try {
      const isPhone = /^[0-9+ -]{7,15}$/.test(trimmed);
      const url = isPhone 
        ? `/api/orders?phone=${encodeURIComponent(trimmed.replace(/[^0-9]/g, ''))}`
        : `/api/orders?id=${encodeURIComponent(trimmed)}`;

      const res = await fetch(url);
      const data = await res.json();

      if (data.success && data.orders && data.orders.length > 0) {
        setOrders(data.orders);
      } else {
        setOrders([]);
      }
    } catch {
      setErrorMsg('Unable to retrieve tracking details right now. Please reach out via WhatsApp.');
    } finally {
      setLoading(false);
    }
  };

  const getStepStatus = (orderStatus: string, stepIndex: number) => {
    // Steps: 0: Confirmed, 1: Crafting / In Production, 2: Dispatched / In Transit, 3: Delivered
    const statusMap: Record<string, number> = {
      'Pending': 0,
      'Confirmed': 0,
      'Processing': 1,
      'Crafting': 1,
      'Fabricating': 1,
      'Shipped': 2,
      'Dispatched': 2,
      'In Transit': 2,
      'Delivered': 3,
    };

    const currentStep = statusMap[orderStatus] ?? 1;
    if (stepIndex < currentStep) return 'completed';
    if (stepIndex === currentStep) return 'current';
    return 'upcoming';
  };

  return (
    <div className="w-full max-w-[1760px] mx-auto px-4 sm:px-8 lg:px-12 xl:px-16 py-10 sm:py-16 space-y-10">
      <div className="max-w-3xl mx-auto space-y-8">
        {/* Title */}
        <div className="text-center space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-50 text-amber-800 text-xs font-semibold uppercase tracking-wider border border-amber-200/80">
            <Package className="w-3.5 h-3.5" />
            <span>Real-Time Shipment Tracking</span>
          </div>
          <h1 className="font-serif font-bold text-3xl sm:text-4xl text-stone-900 tracking-tight">
            Track Your Gift Order
          </h1>
          <p className="text-xs sm:text-sm text-stone-600 max-w-xl mx-auto">
            Check the fabrication, quality check, and courier transit progress of your personalized photo frame.
          </p>
        </div>

        {/* Search Box */}
        <div className="bg-white border border-stone-200/90 rounded-2xl p-4 sm:p-6 shadow-sm">
          <form onSubmit={handleSearch} className="space-y-3">
            <label className="block text-xs font-semibold uppercase tracking-wider text-stone-700">
              Enter Order ID or Mobile Number
            </label>
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="relative flex-1">
                <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                <input
                  type="text"
                  value={query}
                  onChange={(e) => {
                    setQuery(e.target.value);
                    if (errorMsg) setErrorMsg('');
                  }}
                  placeholder="e.g. AG-2026-1049 or 9876543210"
                  className="w-full pl-10 pr-4 py-3 text-xs sm:text-sm bg-stone-50/70 border border-stone-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-700/20 focus:border-amber-700 transition"
                />
              </div>
              <button
                type="submit"
                disabled={loading}
                className="px-6 py-3 bg-stone-900 hover:bg-stone-800 text-white text-xs sm:text-sm font-semibold rounded-xl shadow-sm transition flex items-center justify-center gap-2 disabled:opacity-70 shrink-0 cursor-pointer"
              >
                {loading ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    <span>Locating...</span>
                  </>
                ) : (
                  <>
                    <span>Track Order</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </div>
            {errorMsg && (
              <p className="text-xs text-rose-600 font-medium">{errorMsg}</p>
            )}
          </form>
        </div>

        {/* Results */}
        {hasSearched && !loading && (
          <div className="space-y-6">
            {orders && orders.length > 0 ? (
              orders.map((order) => {
                const step0 = getStepStatus(order.orderStatus, 0);
                const step1 = getStepStatus(order.orderStatus, 1);
                const step2 = getStepStatus(order.orderStatus, 2);
                const step3 = getStepStatus(order.orderStatus, 3);

                const whatsappText = encodeURIComponent(
                  `Hi Abhi Gifts, I am inquiring about my Order ID: ${order.id}. Could you please share the current dispatch status?`
                );

                return (
                  <div
                    key={order.id}
                    className="bg-white border border-stone-200 rounded-2xl overflow-hidden shadow-sm space-y-6 p-5 sm:p-6"
                  >
                    {/* Order Meta Header */}
                    <div className="flex flex-wrap items-center justify-between gap-3 border-b border-stone-100 pb-4">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-serif font-bold text-base sm:text-lg text-stone-900">
                            Order #{order.id}
                          </span>
                          <span className="px-2 py-0.5 rounded-full text-[11px] font-semibold uppercase tracking-wide bg-amber-100 text-amber-800">
                            {order.orderStatus}
                          </span>
                        </div>
                        <p className="text-xs text-stone-500 mt-0.5">
                          Placed on {new Date(order.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
                        </p>
                      </div>

                      <div className="text-right">
                        <p className="text-xs text-stone-500">Total Amount</p>
                        <p className="font-serif font-bold text-stone-900 text-sm sm:text-base">
                          ₹{Number(order.totalAmount).toLocaleString('en-IN')}
                        </p>
                      </div>
                    </div>

                    {/* Progress Timeline */}
                    <div className="py-2">
                      <div className="grid grid-cols-4 gap-2 relative">
                        {/* Step 1 */}
                        <div className="text-center space-y-2">
                          <div className={`w-8 h-8 mx-auto rounded-full flex items-center justify-center text-xs font-bold ${
                            step0 === 'completed' || step0 === 'current'
                              ? 'bg-amber-700 text-white shadow-sm'
                              : 'bg-stone-100 text-stone-400'
                          }`}>
                            <CheckCircle2 className="w-4 h-4" />
                          </div>
                          <p className="text-[11px] sm:text-xs font-medium text-stone-900 leading-tight">
                            Order Confirmed
                          </p>
                        </div>

                        {/* Step 2 */}
                        <div className="text-center space-y-2">
                          <div className={`w-8 h-8 mx-auto rounded-full flex items-center justify-center text-xs font-bold ${
                            step1 === 'completed'
                              ? 'bg-amber-700 text-white'
                              : step1 === 'current'
                              ? 'bg-amber-600 text-white animate-pulse'
                              : 'bg-stone-100 text-stone-400'
                          }`}>
                            <Sparkles className="w-4 h-4" />
                          </div>
                          <p className="text-[11px] sm:text-xs font-medium text-stone-900 leading-tight">
                            Laser Crafting
                          </p>
                        </div>

                        {/* Step 3 */}
                        <div className="text-center space-y-2">
                          <div className={`w-8 h-8 mx-auto rounded-full flex items-center justify-center text-xs font-bold ${
                            step2 === 'completed'
                              ? 'bg-amber-700 text-white'
                              : step2 === 'current'
                              ? 'bg-amber-600 text-white animate-pulse'
                              : 'bg-stone-100 text-stone-400'
                          }`}>
                            <Truck className="w-4 h-4" />
                          </div>
                          <p className="text-[11px] sm:text-xs font-medium text-stone-900 leading-tight">
                            In Transit
                          </p>
                        </div>

                        {/* Step 4 */}
                        <div className="text-center space-y-2">
                          <div className={`w-8 h-8 mx-auto rounded-full flex items-center justify-center text-xs font-bold ${
                            step3 === 'completed'
                              ? 'bg-emerald-600 text-white'
                              : 'bg-stone-100 text-stone-400'
                          }`}>
                            <ShieldCheck className="w-4 h-4" />
                          </div>
                          <p className="text-[11px] sm:text-xs font-medium text-stone-900 leading-tight">
                            Delivered
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Dispatch & Courier Info */}
                    <div className="bg-stone-50 rounded-xl p-4 text-xs space-y-2 border border-stone-100">
                      <div className="flex flex-wrap items-center justify-between gap-2">
                        <div>
                          <span className="text-stone-500">Shipping Partner: </span>
                          <span className="font-semibold text-stone-900">{order.courierPartner}</span>
                        </div>
                        <div>
                          <span className="text-stone-500">AWB Tracking No: </span>
                          <span className="font-mono font-semibold text-stone-900">{order.trackingNumber}</span>
                        </div>
                      </div>
                      <div className="text-stone-500">
                        Delivery Destination: <strong className="text-stone-800">{order.destination.city}, {order.destination.state} ({order.destination.pincode})</strong>
                      </div>
                    </div>

                    {/* Items List */}
                    <div className="space-y-3">
                      <h4 className="text-xs font-semibold uppercase tracking-wider text-stone-600">
                        Items in this shipment ({order.items.length})
                      </h4>
                      <div className="divide-y divide-stone-100 border border-stone-100 rounded-xl overflow-hidden">
                        {order.items.map((item, idx) => (
                          <div key={idx} className="flex items-center gap-3 p-3 bg-white">
                            <div className="w-12 h-12 bg-stone-100 rounded-lg overflow-hidden shrink-0 relative">
                              <img
                                src={item.image || '/images/placeholder.jpg'}
                                alt={item.title}
                                className="w-full h-full object-cover"
                              />
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className="text-xs sm:text-sm font-medium text-stone-900 truncate">
                                {item.title}
                              </p>
                              <p className="text-[11px] text-stone-500">
                                Size: {item.size} • Qty: {item.quantity}
                              </p>
                            </div>
                            <div className="text-right text-xs font-semibold text-stone-900 shrink-0">
                              ₹{(Number(item.unitPrice) * item.quantity).toLocaleString('en-IN')}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Instant WhatsApp Support CTA */}
                    <div className="pt-2 flex flex-wrap items-center justify-between gap-3 border-t border-stone-100">
                      <p className="text-xs text-stone-600">
                        Need urgent delivery updates or customized photo changes?
                      </p>
                      <a
                        href={`https://wa.me/918688174900?text=${whatsappText}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-xs font-medium transition cursor-pointer"
                      >
                        <MessageCircle className="w-3.5 h-3.5" />
                        <span>Chat on WhatsApp</span>
                      </a>
                    </div>
                  </div>
                );
              })
            ) : (
              <div className="bg-stone-50 border border-stone-200 rounded-2xl p-8 text-center space-y-4">
                <Clock className="w-10 h-10 text-stone-400 mx-auto" />
                <div className="space-y-1">
                  <h3 className="font-serif font-bold text-lg text-stone-900">
                    No Orders Found for &ldquo;{query}&rdquo;
                  </h3>
                  <p className="text-xs text-stone-600 max-w-md mx-auto">
                    Please ensure you entered the exact Order ID sent via SMS/WhatsApp or the 10-digit phone number provided during checkout.
                  </p>
                </div>
                <div className="pt-2">
                  <a
                    href="https://wa.me/918688174900?text=Hi%20Abhi%20Gifts%2C%20I%20need%20help%20finding%20my%20order%20status."
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-5 py-2.5 bg-stone-900 hover:bg-stone-800 text-white text-xs font-semibold rounded-xl transition cursor-pointer"
                  >
                    <MessageCircle className="w-4 h-4 text-emerald-400" />
                    <span>Contact Workshop on WhatsApp</span>
                  </a>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Helpful FAQs */}
        <div className="border-t border-stone-200 pt-8 space-y-4">
          <h3 className="font-serif font-bold text-base sm:text-lg text-stone-900">
            Frequently Asked Tracking Questions
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs text-stone-600">
            <div className="bg-stone-50 p-4 rounded-xl border border-stone-100 space-y-1">
              <strong className="text-stone-900 block font-medium">When will I get my tracking number?</strong>
              Tracking numbers are generated automatically once our Hyderabad workshop completes laser crafting and hands the package to the courier (usually 24–48 hours after order placement).
            </div>
            <div className="bg-stone-50 p-4 rounded-xl border border-stone-100 space-y-1">
              <strong className="text-stone-900 block font-medium">Can I request express delivery in Hyderabad?</strong>
              Yes! For urgent birthdays or anniversary gifts within Hyderabad and Secunderabad, contact our support on WhatsApp for same-day or next-day express delivery options.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
