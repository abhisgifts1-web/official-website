'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import {
  Search,
  Truck,
  CheckCircle2,
  MessageCircle,
} from 'lucide-react';
import { Order, OrderStatus } from '@/types';

const STATUS_STEPS: OrderStatus[] = [
  'Confirmed',
  'Framing & Production',
  'Quality Checked',
  'Shipped',
  'Out for Delivery',
  'Delivered',
];

function TrackOrderContent() {
  const searchParams = useSearchParams();
  const initialId = searchParams.get('id') || '';

  const [orderIdInput, setOrderIdInput] = useState(initialId);
  const [loading, setLoading] = useState(false);
  const [order, setOrder] = useState<Order | null>(null);
  const [error, setError] = useState<string | null>(null);

  const fetchOrder = async (id: string) => {
    if (!id.trim()) return;
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`/api/orders/${encodeURIComponent(id.trim())}`);
      const data = await res.json();
      if (!res.ok || !data.success) {
        setError(data.error || 'Order not found. Please verify your Order ID.');
        setOrder(null);
      } else {
        setOrder(data.order);
      }
    } catch {
      setError('Failed to fetch tracking details. Please try again.');
      setOrder(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (initialId) {
      fetchOrder(initialId);
    }
  }, [initialId]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    fetchOrder(orderIdInput);
  };

  const getStepIndex = (currentStatus: OrderStatus) => {
    if (currentStatus === 'Pending') return 0;
    const idx = STATUS_STEPS.indexOf(currentStatus);
    return idx === -1 ? 1 : idx;
  };

  const activeStepIdx = order ? getStepIndex(order.orderStatus) : 0;

  return (
    <div className="w-full max-w-[1760px] mx-auto px-4 sm:px-8 lg:px-12 xl:px-16 py-10 sm:py-16 space-y-8">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center max-w-xl mx-auto space-y-2">
        <span className="text-xs uppercase tracking-widest font-bold text-amber-900 bg-amber-100 px-3 py-1 rounded-full inline-flex items-center gap-1.5">
          <Truck className="w-3.5 h-3.5 text-amber-800" /> Pan-India Live Tracking
        </span>
        <h1 className="font-serif font-bold text-3xl sm:text-4xl text-stone-900">
          Track Your Wall Art Order
        </h1>
        <p className="text-xs sm:text-sm text-stone-600">
          Enter your Order ID (found on your order confirmation and invoice email) to see live production and courier status.
        </p>
      </div>

      {/* Search Input Box */}
      <form
        onSubmit={handleSubmit}
        className="bg-white p-4 sm:p-6 rounded-3xl border border-stone-200 shadow-sm flex flex-col sm:flex-row gap-3"
      >
        <div className="relative flex-1">
          <input
            type="text"
            required
            placeholder="Enter Order ID (e.g. AG-2026-78401)"
            value={orderIdInput}
            onChange={(e) => setOrderIdInput(e.target.value)}
            className="w-full pl-10 pr-4 py-3 text-xs sm:text-sm bg-stone-50 border border-stone-300 rounded-2xl outline-none focus:border-amber-700 font-mono"
          />
          <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
        </div>

        <button
          type="submit"
          disabled={loading || !orderIdInput.trim()}
          className="bg-stone-900 hover:bg-amber-800 disabled:opacity-50 text-white font-semibold text-xs sm:text-sm px-8 py-3 rounded-2xl shadow-warm transition-colors whitespace-nowrap"
        >
          {loading ? 'Locating...' : 'Track Order'}
        </button>
      </form>

      {error && (
        <div className="bg-red-50 text-red-700 p-4 rounded-2xl border border-red-200 text-xs font-medium text-center">
          {error}
        </div>
      )}

      {/* Tracking Results Card */}
      {order && (
        <div className="bg-white rounded-3xl border border-stone-200 shadow-sm p-6 sm:p-8 space-y-8 animate-in fade-in duration-200">
          {/* Header Info */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-stone-100 pb-5">
            <div>
              <span className="text-xs text-stone-400 uppercase font-bold tracking-wider">Order Reference</span>
              <h3 className="font-mono font-bold text-lg text-stone-900">{order.id}</h3>
              <p className="text-xs text-stone-500 mt-0.5">
                Placed on {new Date(order.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
              </p>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-xs text-stone-500">Current Status:</span>
              <span className="bg-amber-100 text-amber-950 px-3 py-1 rounded-full text-xs font-bold">
                {order.orderStatus}
              </span>
            </div>
          </div>

          {/* Visual Timeline Stepper */}
          <div className="space-y-4">
            <h4 className="font-serif font-bold text-sm text-stone-900">
              Fulfilment Timeline
            </h4>

            <div className="grid grid-cols-2 sm:grid-cols-6 gap-3 pt-2">
              {STATUS_STEPS.map((step, idx) => {
                const isCompleted = idx <= activeStepIdx;
                const isCurrent = idx === activeStepIdx;

                return (
                  <div key={step} className="flex flex-col items-center text-center space-y-2">
                    <div
                      className={`w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                        isCurrent
                          ? 'bg-amber-700 text-white ring-4 ring-amber-200 scale-110 shadow-md'
                          : isCompleted
                          ? 'bg-[#641E2E] text-white'
                          : 'bg-stone-100 text-stone-400 border border-stone-200'
                      }`}
                    >
                      {isCompleted ? <CheckCircle2 className="w-5 h-5" /> : idx + 1}
                    </div>
                    <span
                      className={`text-[11px] leading-tight font-medium ${
                        isCurrent
                          ? 'font-bold text-amber-900'
                          : isCompleted
                          ? 'text-stone-900'
                          : 'text-stone-400'
                      }`}
                    >
                      {step}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Courier Partner & AWB details */}
          {order.trackingNumber && (
            <div className="bg-[#FFF7ED] p-5 rounded-2xl border border-stone-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs">
              <div className="space-y-1">
                <span className="text-stone-500 uppercase tracking-wider text-[10px] font-bold block">
                  Courier Partner
                </span>
                <p className="font-bold text-stone-900 text-sm">
                  {order.courierPartner || 'DTDC / BlueDart Express'}
                </p>
                <p className="text-stone-600 font-mono">
                  Waybill / AWB No: <strong>{order.trackingNumber}</strong>
                </p>
              </div>

              <a
                href={`https://wa.me/917780269927?text=${encodeURIComponent(
                  `Hi Abhi Gifts! Checking tracking for AWB: ${order.trackingNumber}`
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-[#641E2E] hover:bg-[#32151D] text-white font-semibold px-4 py-2 rounded-xl text-xs flex items-center gap-1.5 transition-colors"
              >
                <MessageCircle className="w-3.5 h-3.5" />
                <span>WhatsApp Live Status</span>
              </a>
            </div>
          )}

          {/* Order Items Preview */}
          <div className="space-y-3 pt-2">
            <h4 className="font-serif font-bold text-sm text-stone-900">
              Artworks in this Shipment ({order.items.length})
            </h4>
            <div className="divide-y divide-stone-100">
              {order.items.map((it) => (
                <div key={it.id} className="py-2.5 flex items-center gap-3 text-xs">
                  <img
                    src={it.customization?.previewUrl || it.image}
                    alt={it.title}
                    className="w-12 h-12 object-cover rounded-lg border border-stone-200"
                  />
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-stone-900 truncate">{it.title}</p>
                    <p className="text-stone-500 text-[11px]">
                      {it.size} • Qty: {it.quantity}
                    </p>
                  </div>
                  <span className="font-bold text-stone-900">
                    ₹{(it.unitPrice * it.quantity).toLocaleString('en-IN')}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
      </div>
    </div>
  );
}

export default function TrackOrderPage() {
  return (
    <Suspense fallback={<div className="w-full max-w-[1760px] mx-auto p-12 text-center text-xs text-stone-500">Loading order tracker...</div>}>
      <TrackOrderContent />
    </Suspense>
  );
}
