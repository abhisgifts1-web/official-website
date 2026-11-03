'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import {
  Search,
  Truck,
  CheckCircle2,
  MessageCircle,
  Phone,
  Clock,
  ShieldCheck,
  Package,
  ArrowRight,
  HelpCircle,
  Calendar,
  AlertCircle,
  Sparkles,
} from 'lucide-react';
import { Order } from '@/types';
import { INITIAL_SETTINGS } from '@/lib/data/settings';

const OFFICIAL_STAGES = [
  { id: 'received', label: 'Order Received', desc: 'Order logged & verified' },
  { id: 'processing', label: 'Processing', desc: 'Design review & material prep' },
  { id: 'production', label: 'Customization / Production', desc: '4mm laser cut & UV printing' },
  { id: 'dispatched', label: 'Dispatched', desc: 'Handed to express courier' },
  { id: 'delivered', label: 'Delivered', desc: 'Delivered to your doorstep' },
];

function TrackOrderContent() {
  const searchParams = useSearchParams();
  const initialId = searchParams.get('id') || '';

  const [orderIdInput, setOrderIdInput] = useState(initialId);
  const [phoneInput, setPhoneInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [order, setOrder] = useState<Order | null>(null);
  const [error, setError] = useState<string | null>(null);

  const fetchOrder = async (id: string, phone?: string) => {
    if (!id.trim()) return;
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`/api/orders/${encodeURIComponent(id.trim())}`);
      const data = await res.json();
      if (!res.ok || !data.success) {
        setError(data.error || 'Order not found. Please verify your Order ID and try again.');
        setOrder(null);
      } else {
        const foundOrder = data.order as Order;
        if (phone && phone.trim()) {
          const cleanPhone = phone.replace(/\D/g, '');
          const orderPhone = (foundOrder.customer.mobile || '').replace(/\D/g, '');
          if (cleanPhone && orderPhone && !orderPhone.endsWith(cleanPhone) && !cleanPhone.endsWith(orderPhone)) {
            setError('Phone number does not match the customer details for this Order ID.');
            setOrder(null);
            setLoading(false);
            return;
          }
        }
        setOrder(foundOrder);
      }
    } catch {
      setError('Unable to retrieve tracking details at this moment. Please connect with our support on WhatsApp.');
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
    fetchOrder(orderIdInput, phoneInput);
  };

  // Map backend status to 0..4 stage index
  const getStageIndex = (statusStr: string) => {
    const s = (statusStr || '').toLowerCase();
    if (s.includes('delivered')) return 4;
    if (s.includes('shipped') || s.includes('dispatch') || s.includes('transit') || s.includes('out for delivery')) return 3;
    if (s.includes('framing') || s.includes('production') || s.includes('custom') || s.includes('quality')) return 2;
    if (s.includes('processing') || s.includes('confirmed') || s.includes('verified')) return 1;
    return 0; // Order Received
  };

  const activeStage = order ? getStageIndex(order.orderStatus) : 0;

  const cleanWaNumber = (INITIAL_SETTINGS.whatsappNumber || '919032372782').replace(/[^0-9]/g, '');
  const supportWaUrl = order
    ? `https://wa.me/${cleanWaNumber}?text=${encodeURIComponent(
        `Hello Abhi's Gifts, I am inquiring about my Order ID #${order.id}. Current status is: ${order.orderStatus}. Can you please provide an update on dispatch and delivery?`
      )}`
    : `https://wa.me/${cleanWaNumber}?text=${encodeURIComponent(
        `Hello Abhi's Gifts, I need assistance tracking my photo frame order.`
      )}`;

  // Estimated delivery calculation
  const getEstimatedDelivery = () => {
    if (!order) return null;
    const created = new Date(order.createdAt);
    const estStart = new Date(created);
    estStart.setDate(estStart.getDate() + 3);
    const estEnd = new Date(created);
    estEnd.setDate(estEnd.getDate() + 5);

    const isHyderabad = (order.customer.city || '').toLowerCase().includes('hyderabad') || (order.customer.pincode || '').startsWith('500');

    if (isHyderabad) {
      const hydDate = new Date(created);
      hydDate.setDate(hydDate.getDate() + 2);
      return `Expected within 24–48 hours (by ${hydDate.toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })}) via Hyderabad Express Dispatch`;
    }

    return `${estStart.toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })} – ${estEnd.toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })} via BlueDart / Delhivery`;
  };

  return (
    <div className="w-full max-w-[1760px] mx-auto px-4 sm:px-8 lg:px-12 xl:px-16 py-10 sm:py-16 space-y-10">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center max-w-xl mx-auto space-y-2">
          <span className="text-xs uppercase tracking-widest font-bold text-[#FFFFFF] bg-white border border-[#EAB308] px-3.5 py-1 rounded-full inline-flex items-center gap-1.5 shadow-2xs">
            <Truck className="w-3.5 h-3.5 text-[#EAB308]" />
            <span>Pan-India Live Order Tracking</span>
          </span>
          <h1 className="font-serif font-bold text-3xl sm:text-4xl text-[#FFFFFF] tracking-tight">
            Track Your Frame &amp; Keepsake Order
          </h1>
          <p className="text-xs sm:text-sm text-[#D1D5DB] leading-relaxed">
            Enter your Order ID (received via SMS, email, or WhatsApp) to track real-time laser fabrication, quality inspection, and courier dispatch.
          </p>
        </div>

        {/* Dual Search Input Box */}
        <form
          onSubmit={handleSubmit}
          className="bg-white p-5 sm:p-7 rounded-3xl border border-[#2D2D2D] shadow-sm flex flex-col md:flex-row gap-3 items-stretch md:items-center"
        >
          <div className="relative flex-1">
            <input
              type="text"
              required
              placeholder="Order ID (e.g. AG-2026-78401)"
              value={orderIdInput}
              onChange={(e) => setOrderIdInput(e.target.value)}
              className="w-full pl-10 pr-4 py-3 text-xs sm:text-sm bg-[#121212] border border-[#2D2D2D] rounded-2xl outline-none focus:border-[#EAB308] font-mono text-[#FFFFFF]"
            />
            <Search className="w-4 h-4 text-[#8C7A70] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>

          <div className="relative flex-1">
            <input
              type="tel"
              placeholder="Phone Number (optional for fast verification)"
              value={phoneInput}
              onChange={(e) => setPhoneInput(e.target.value)}
              className="w-full pl-10 pr-4 py-3 text-xs sm:text-sm bg-[#121212] border border-[#2D2D2D] rounded-2xl outline-none focus:border-[#EAB308] font-mono text-[#FFFFFF]"
            />
            <Phone className="w-4 h-4 text-[#8C7A70] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>

          <button
            type="submit"
            disabled={loading || !orderIdInput.trim()}
            className="bg-[#EAB308] hover:bg-[#FACC15] disabled:opacity-50 text-[#000000] font-bold text-xs sm:text-sm px-8 py-3.5 rounded-2xl shadow-md transition-all cursor-pointer whitespace-nowrap flex items-center justify-center gap-2"
          >
            {loading ? (
              <span>Locating Order...</span>
            ) : (
              <>
                <span>Track Order</span>
                <ArrowRight className="w-4 h-4 text-[#EAB308]" />
              </>
            )}
          </button>
        </form>

        {/* Demo Orders Helper Pill */}
        <div className="text-center">
          <span className="text-[11px] text-[#8C7A70]">
            Testing? Try demo Order IDs:{' '}
            <button
              type="button"
              onClick={() => {
                setOrderIdInput('AG-2026-78401');
                fetchOrder('AG-2026-78401');
              }}
              className="text-[#FFFFFF] font-mono font-bold hover:underline cursor-pointer"
            >
              AG-2026-78401
            </button>
            {' • '}
            <button
              type="button"
              onClick={() => {
                setOrderIdInput('AG-2026-78402');
                fetchOrder('AG-2026-78402');
              }}
              className="text-[#FFFFFF] font-mono font-bold hover:underline cursor-pointer"
            >
              AG-2026-78402
            </button>
          </span>
        </div>

        {/* Error Alert Box */}
        {error && (
          <div className="bg-rose-50 text-rose-800 p-4 rounded-2xl border border-rose-200 text-xs font-medium flex items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
              <span>{error}</span>
            </div>
            <a
              href={supportWaUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs font-bold text-[#25D366] bg-white border border-[#25D366]/40 px-3 py-1 rounded-full hover:bg-[#25D366]/10 transition-colors shrink-0 flex items-center gap-1"
            >
              <MessageCircle className="w-3.5 h-3.5 fill-current" />
              <span>Ask on WhatsApp</span>
            </a>
          </div>
        )}

        {/* Tracking Results Card */}
        {order && (
          <div className="bg-white rounded-3xl border border-[#2D2D2D] shadow-sm p-6 sm:p-8 space-y-8 animate-in fade-in duration-300">
            {/* Header Info */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#2D2D2D] pb-5">
              <div>
                <span className="text-[10px] text-[#8C7A70] uppercase font-bold tracking-widest block">
                  Verified Order Reference
                </span>
                <h3 className="font-mono font-bold text-xl text-[#FFFFFF]">{order.id}</h3>
                <p className="text-xs text-[#D1D5DB] mt-0.5">
                  Customer: <strong>{order.customer.fullName}</strong> • Placed on{' '}
                  {new Date(order.createdAt).toLocaleDateString('en-IN', {
                    day: 'numeric',
                    month: 'short',
                    year: 'numeric',
                  })}
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-2">
                <span className="text-xs font-bold text-[#FFFFFF] bg-[#121212] border border-[#EAB308] px-3.5 py-1.5 rounded-full shadow-2xs">
                  Status: {order.orderStatus}
                </span>

                <span
                  className={`text-xs font-bold px-3 py-1.5 rounded-full ${
                    order.paymentStatus === 'Paid'
                      ? 'bg-emerald-50 text-emerald-800 border border-emerald-300'
                      : 'bg-amber-50 text-amber-900 border border-amber-300'
                  }`}
                >
                  Payment: {order.paymentStatus || 'Confirmed'} ({order.paymentMethod || 'Online'})
                </span>
              </div>
            </div>

            {/* 5-Stage Visual Stepper */}
            <div className="space-y-4">
              <h4 className="font-serif font-bold text-sm text-[#FFFFFF] flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-[#EAB308]" />
                <span>Order Fulfilment Stages</span>
              </h4>

              <div className="grid grid-cols-1 sm:grid-cols-5 gap-3 pt-2">
                {OFFICIAL_STAGES.map((stage, idx) => {
                  const isCompleted = idx <= activeStage;
                  const isCurrent = idx === activeStage;

                  return (
                    <div
                      key={stage.id}
                      className={`flex flex-col items-center text-center p-3 rounded-2xl border transition-all ${
                        isCurrent
                          ? 'bg-[#121212] border-[#EAB308] shadow-xs ring-2 ring-[#EAB308]/30'
                          : isCompleted
                          ? 'bg-white border-[#2D2D2D]'
                          : 'bg-[#121212]/60 border-[#2D2D2D]/40 opacity-60'
                      }`}
                    >
                      <div
                        className={`w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold mb-2 ${
                          isCurrent
                            ? 'bg-[#EAB308] text-[#000000] ring-4 ring-[#EAB308]/40 shadow-sm'
                            : isCompleted
                            ? 'bg-emerald-600 text-white'
                            : 'bg-stone-200 text-stone-500'
                        }`}
                      >
                        {isCompleted ? <CheckCircle2 className="w-5 h-5" /> : idx + 1}
                      </div>
                      <span
                        className={`text-xs font-bold leading-tight ${
                          isCurrent
                            ? 'text-[#FFFFFF]'
                            : isCompleted
                            ? 'text-[#FFFFFF]'
                            : 'text-[#8C7A70]'
                        }`}
                      >
                        {stage.label}
                      </span>
                      <span className="text-[10px] text-[#8C7A70] mt-1 leading-tight">
                        {stage.desc}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Delivery Timeline & Courier Card */}
            <div className="bg-[#121212] p-5 rounded-2xl border border-[#EAB308]/60 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="space-y-1">
                <span className="text-[10px] uppercase font-bold text-[#EAB308] tracking-wider block">
                  Delivery Estimate
                </span>
                <p className="text-xs sm:text-sm font-semibold text-[#FFFFFF]">
                  {getEstimatedDelivery()}
                </p>
                {order.trackingNumber ? (
                  <p className="text-xs text-[#D1D5DB] font-mono pt-1">
                    Courier: <strong>{order.courierPartner || 'DTDC / BlueDart'}</strong> • AWB:{' '}
                    <strong>{order.trackingNumber}</strong>
                  </p>
                ) : (
                  <p className="text-[11px] text-[#8C7A70]">
                    Tracking AWB will be updated immediately upon courier handover.
                  </p>
                )}
              </div>

              <a
                href={supportWaUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-1.5 bg-[#25D366] hover:bg-[#20BD5A] text-white font-bold text-xs px-5 py-2.5 rounded-full transition-colors shadow-2xs shrink-0"
              >
                <MessageCircle className="w-3.5 h-3.5 fill-current" />
                <span>Need Help? Chat on WhatsApp</span>
              </a>
            </div>

            {/* Items in this Order */}
            <div className="space-y-3 pt-2">
              <h4 className="font-serif font-bold text-sm text-[#FFFFFF]">
                Items in this Order ({order.items.length})
              </h4>
              <div className="divide-y divide-[#E8D5BD]/60">
                {order.items.map((it) => (
                  <div key={it.id} className="py-3 flex items-center justify-between gap-3 text-xs">
                    <div className="flex items-center gap-3 min-w-0">
                      <img
                        src={it.customization?.previewUrl || it.image}
                        alt={it.title}
                        className="w-12 h-12 object-cover rounded-xl border border-[#2D2D2D] shrink-0 bg-stone-100"
                      />
                      <div className="min-w-0">
                        <p className="font-bold text-[#FFFFFF] truncate">{it.title}</p>
                        <p className="text-[#8C7A70] text-[11px]">
                          {it.size} • Qty: {it.quantity}
                          {it.finish ? ` • ${it.finish}` : ''}
                          {it.lighting ? ` • ${it.lighting}` : ''}
                        </p>
                        {it.customization?.customText && (
                          <p className="text-[10px] text-[#EAB308] italic font-serif truncate">
                            &ldquo;{it.customization.customText}&rdquo;
                          </p>
                        )}
                      </div>
                    </div>
                    <span className="font-bold text-[#FFFFFF] shrink-0 text-sm">
                      ₹{(it.unitPrice * it.quantity).toLocaleString('en-IN')}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Delivery Destination */}
            <div className="pt-2 border-t border-[#2D2D2D]/60 flex flex-col sm:flex-row justify-between text-xs text-[#D1D5DB] gap-2">
              <div>
                <span className="font-bold text-[#FFFFFF] block">Shipping Destination:</span>
                <span>
                  {order.customer.streetAddress}, {order.customer.city}, {order.customer.state} –{' '}
                  {order.customer.pincode}
                </span>
              </div>
              <div className="text-right sm:text-right">
                <span className="font-bold text-[#FFFFFF] block">Total Amount Paid/Payable:</span>
                <span className="font-serif font-bold text-base text-[#FFFFFF]">
                  ₹{order.totalAmount.toLocaleString('en-IN')}
                </span>
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
    <Suspense
      fallback={
        <div className="py-20 text-center text-xs text-[#8C7A70]">
          Loading Order Tracking...
        </div>
      }
    >
      <TrackOrderContent />
    </Suspense>
  );
}
