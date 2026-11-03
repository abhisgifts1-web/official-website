'use client';

import React, { useEffect } from 'react';
import Link from 'next/link';
import {
  CheckCircle2,
  Package,
  Truck,
  MessageCircle,
  Printer,
  ArrowRight,
  ShieldCheck,
  Calendar,
  Sparkles,
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { Order } from '@/types';
import { getWhatsAppOrderUrl } from '@/lib/whatsapp';

interface Props {
  order: Order;
}

export default function ConfirmationClient({ order }: Props) {
  useEffect(() => {
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#B88A35', '#EA580C', '#B85D43', '#0F172A'],
      });
    } catch {
      // ignore
    }
  }, []);

  const handlePrint = () => {
    window.print();
  };

  const whatsappUrl = getWhatsAppOrderUrl({
    orderId: order.id,
    customer: order.customer,
    items: order.items,
    subtotal: order.subtotal,
    discountAmount: order.discountAmount,
    couponCode: order.couponCode,
    shippingFee: order.shippingFee,
    totalAmount: order.totalAmount,
    notes: order.notes,
    baseUrl: typeof window !== 'undefined' ? window.location.origin : undefined,
  });

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 space-y-8">
      {/* Success Card */}
      <div className="bg-white rounded-3xl p-8 sm:p-12 text-center border border-stone-200 shadow-warm space-y-4">
        <div className="w-16 h-16 rounded-full bg-[#1E1E1E] text-[#D1D5DB] flex items-center justify-center mx-auto shadow-sm">
          <CheckCircle2 className="w-9 h-9" />
        </div>

        <span className="text-xs uppercase tracking-widest font-bold text-amber-900 bg-amber-100 px-3 py-1 rounded-full inline-block">
          Order Successfully Placed
        </span>

        <h1 className="font-serif font-bold text-2xl sm:text-4xl text-stone-900">
          Thank you, {order.customer.fullName}!
        </h1>

        <p className="text-xs sm:text-sm text-stone-600 max-w-lg mx-auto">
          We have received your sacred wall art order. Our master artisans are preparing your pieces with reverent care.
        </p>

        {/* Order ID Pill */}
        <div className="inline-block bg-[#121212] border border-amber-300/80 px-5 py-2.5 rounded-2xl text-xs sm:text-sm font-mono font-bold text-stone-900 shadow-sm">
          Order ID: <span className="text-amber-900 font-extrabold">{order.id}</span>
        </div>

        {/* Action buttons */}
        <div className="flex flex-wrap items-center justify-center gap-3 pt-4">
          <Link
            href="/shop"
            className="bg-stone-900 hover:bg-stone-950 text-white text-xs font-semibold px-6 py-3 rounded-full flex items-center gap-2 shadow-sm transition-colors"
          >
            <Package className="w-4 h-4 text-amber-400" />
            <span>Continue Shopping</span>
          </Link>

          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-[#EAB308] hover:bg-[#FACC15] text-[#000000] text-xs font-bold px-6 py-3 rounded-full flex items-center gap-2 transition-colors shadow-sm"
          >
            <MessageCircle className="w-4 h-4" />
            <span>Chat on WhatsApp with this Order</span>
          </a>

          <button
            type="button"
            onClick={handlePrint}
            className="bg-stone-100 hover:bg-stone-200 text-stone-800 text-xs font-semibold px-5 py-3 rounded-full flex items-center gap-2 transition-colors"
          >
            <Printer className="w-4 h-4" />
            <span>Print Invoice</span>
          </button>
        </div>
      </div>

      {/* Order Details Breakdown */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Shipping Address */}
        <div className="bg-white p-6 rounded-3xl border border-stone-200 space-y-2 text-xs">
          <h3 className="font-serif font-bold text-sm text-stone-900 flex items-center gap-1.5 border-b pb-2">
            <Truck className="w-4 h-4 text-amber-800" />
            <span>Delivery Address</span>
          </h3>
          <p className="font-bold text-stone-900 text-sm">{order.customer.fullName}</p>
          <p className="text-stone-600">{order.customer.streetAddress}</p>
          {order.customer.apartment && <p className="text-stone-600">{order.customer.apartment}</p>}
          <p className="text-stone-600">
            {order.customer.city}, {order.customer.state} - {order.customer.pincode}
          </p>
          <p className="text-stone-600 pt-1">
            <strong>Mobile:</strong> {order.customer.mobile}
          </p>
          {order.customer.email && (
            <p className="text-stone-600">
              <strong>Email:</strong> {order.customer.email}
            </p>
          )}
        </div>

        {/* Payment & Order Meta */}
        <div className="bg-white p-6 rounded-3xl border border-stone-200 space-y-2 text-xs">
          <h3 className="font-serif font-bold text-sm text-stone-900 flex items-center gap-1.5 border-b pb-2">
            <ShieldCheck className="w-4 h-4 text-amber-800" />
            <span>Payment & Fulfilment</span>
          </h3>
          <div className="flex justify-between py-1">
            <span className="text-stone-500">Payment Method</span>
            <span className="font-semibold text-[#FFFFFF]">
              {order.paymentMethod === 'WhatsApp' ? 'Direct WhatsApp Order' : order.paymentMethod}
            </span>
          </div>
          <div className="flex justify-between py-1">
            <span className="text-stone-500">Payment Status</span>
            <span className="font-bold text-[#D1D5DB] bg-[#1E1E1E] px-2 py-0.5 rounded">
              {order.paymentStatus}
            </span>
          </div>
          <div className="flex justify-between py-1">
            <span className="text-stone-500">Order Status</span>
            <span className="font-bold text-amber-900 bg-amber-50 px-2 py-0.5 rounded">
              {order.orderStatus}
            </span>
          </div>
          <div className="flex justify-between py-1 border-t pt-2">
            <span className="text-stone-500">Packaging</span>
            <span className="font-semibold text-[#FFFFFF]">Protective Multi-Layer Boxed</span>
          </div>
        </div>
      </div>

      {/* Items list */}
      <div className="bg-white rounded-3xl border border-stone-200 p-6 space-y-4">
        <h3 className="font-serif font-bold text-base text-stone-900 border-b pb-3">
          Ordered Artworks
        </h3>

        <div className="divide-y divide-stone-100 text-xs">
          {order.items.map((it) => (
            <div key={it.id} className="py-3 flex items-center gap-4">
              <img
                src={it.customization?.previewUrl || it.image}
                alt={it.title}
                className="w-16 h-16 object-cover rounded-xl border border-stone-200"
              />
              <div className="flex-1 min-w-0">
                <p className="font-bold text-stone-900 truncate">{it.title}</p>
                <p className="text-stone-500 mt-0.5">
                  Size: {it.size} • Finish: {it.finish}
                </p>
                {it.customization?.customText && (
                  <p className="text-amber-900 italic font-serif mt-0.5">
                    Inscription: &ldquo;{it.customization.customText}&rdquo;
                  </p>
                )}
                <p className="text-stone-500">Qty: {it.quantity}</p>
              </div>
              <span className="font-serif font-bold text-sm text-stone-900">
                ₹{(it.unitPrice * it.quantity).toLocaleString('en-IN')}
              </span>
            </div>
          ))}
        </div>

        {/* Pricing totals */}
        <div className="border-t border-stone-200 pt-3 space-y-1.5 text-xs text-stone-600 max-w-xs ml-auto">
          <div className="flex justify-between">
            <span>Subtotal:</span>
            <span className="font-semibold text-stone-900">₹{order.subtotal.toLocaleString('en-IN')}</span>
          </div>
          {order.discountAmount > 0 && (
            <div className="flex justify-between text-[#D1D5DB]">
              <span>Discount ({order.couponCode || 'Promo'}):</span>
              <span>-₹{order.discountAmount.toLocaleString('en-IN')}</span>
            </div>
          )}
          <div className="flex justify-between">
            <span>Delivery Charge:</span>
            <span>{order.shippingFee === 0 ? 'FREE' : `₹${order.shippingFee}`}</span>
          </div>
          <div className="flex justify-between text-base font-serif font-bold text-stone-900 pt-2 border-t border-stone-200">
            <span>Total Paid:</span>
            <span className="text-amber-900">₹{order.totalAmount.toLocaleString('en-IN')}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
