'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  CheckCircle2,
  Package,
  Truck,
  MessageCircle,
  Printer,
  FileText,
  ShieldCheck,
  X,
  ExternalLink,
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { Order } from '@/types';
import { getWhatsAppOrderUrl } from '@/lib/whatsapp';
import ProfessionalInvoice from '@/components/invoice/ProfessionalInvoice';

interface Props {
  order: Order;
}

export default function ConfirmationClient({ order }: Props) {
  const [showInvoiceModal, setShowInvoiceModal] = useState(false);

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
    if (typeof window !== 'undefined') {
      window.print();
    }
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
    <>
      {/* 1. ON-SCREEN ORDER CONFIRMATION VIEW (Hidden completely during browser print) */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 space-y-8 print:hidden">
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
          <div className="inline-block bg-amber-50 border border-amber-300 px-5 py-2.5 rounded-2xl text-xs sm:text-sm font-mono font-bold text-stone-900 shadow-xs">
            Order ID: <span className="text-amber-900 font-extrabold">{order.id}</span>
          </div>

          {/* Action buttons */}
          <div className="flex flex-wrap items-center justify-center gap-3 pt-4">
            <Link
              href="/shop"
              className="btn-luxury-dark btn-shimmer-sweep btn-press-bounce group text-white text-xs font-bold px-6 py-3 rounded-full flex items-center gap-2 shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-0.5 cursor-pointer"
            >
              <Package className="w-4 h-4 text-amber-400" />
              <span>Continue Shopping</span>
            </Link>

            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-luxury-whatsapp btn-shimmer-sweep btn-press-bounce group text-stone-950 text-xs font-bold px-6 py-3 rounded-full flex items-center gap-2 shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-0.5 cursor-pointer"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Chat on WhatsApp with this Order</span>
            </a>

            <button
              type="button"
              onClick={handlePrint}
              className="btn-luxury-primary btn-shimmer-sweep btn-press-bounce group px-5 py-3 rounded-full text-xs font-bold flex items-center gap-2 cursor-pointer shadow-md hover:shadow-xl uppercase tracking-wider transition-all duration-300 hover:-translate-y-0.5"
              title="Print Professional Tax Invoice"
            >
              <Printer className="w-4 h-4 text-stone-950 group-hover:scale-110 transition-transform" />
              <span>Print Invoice</span>
            </button>

            <button
              type="button"
              onClick={() => setShowInvoiceModal(true)}
              className="btn-luxury-studio btn-shimmer-sweep btn-press-bounce group text-stone-900 text-xs font-bold px-5 py-3 rounded-full flex items-center gap-2 shadow-xs hover:shadow-md transition-all duration-300 hover:-translate-y-0.5 cursor-pointer"
            >
              <FileText className="w-4 h-4 text-stone-600" />
              <span>View Tax Invoice</span>
            </button>
          </div>

          <div className="pt-2">
            <Link
              href={`/invoice/${order.id}`}
              target="_blank"
              className="inline-flex items-center gap-1.5 text-xs text-amber-700 hover:text-amber-900 font-semibold underline underline-offset-2 transition-colors"
            >
              <span>Open Standalone Invoice Page</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </Link>
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
              {order.customer.secondaryMobile && (
                <span className="text-stone-500 font-medium"> • <strong>Alt:</strong> {order.customer.secondaryMobile}</span>
              )}
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
              <span>Payment &amp; Fulfilment</span>
            </h3>
            <div className="flex justify-between items-center py-1">
              <span className="text-stone-500">Payment Method</span>
              <span className="font-semibold text-stone-900">
                {order.paymentMethod === 'Razorpay' ? (
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-bold bg-blue-50 text-blue-700 border border-blue-200">
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-600" />
                    Razorpay (Online)
                  </span>
                ) : order.paymentMethod === 'COD' ? (
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-bold bg-stone-100 text-stone-800 border border-stone-300">
                    Cash on Delivery (COD)
                  </span>
                ) : order.paymentMethod === 'WhatsApp' ? (
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-bold bg-stone-100 text-stone-800 border border-stone-200">
                    Direct Order
                  </span>
                ) : (
                  order.paymentMethod
                )}
              </span>
            </div>

            {order.razorpayPaymentId && (
              <div className="flex justify-between items-center py-1">
                <span className="text-stone-500">Razorpay Ref / TXN</span>
                <span className="font-mono text-[11px] font-bold text-stone-700 bg-stone-100 px-2 py-0.5 rounded">
                  {order.razorpayPaymentId}
                </span>
              </div>
            )}

            <div className="flex justify-between items-center py-1">
              <span className="text-stone-500">Payment Status</span>
              <span
                className={`font-bold text-xs px-2.5 py-0.5 rounded-full border ${
                  order.paymentStatus === 'Paid'
                    ? 'bg-emerald-50 text-emerald-800 border-emerald-200'
                    : 'bg-amber-50 text-amber-800 border-amber-200'
                }`}
              >
                {order.paymentStatus === 'Paid' ? 'Paid (Verified)' : order.paymentStatus}
              </span>
            </div>
            <div className="flex justify-between items-center py-1">
              <span className="text-stone-500">Order Status</span>
              <span className="font-bold text-xs text-amber-900 bg-amber-50 border border-amber-200 px-2.5 py-0.5 rounded-full">
                {order.orderStatus}
              </span>
            </div>
            <div className="flex justify-between items-center py-1 border-t pt-2">
              <span className="text-stone-500">Packaging</span>
              <span className="font-semibold text-stone-900">Protective Multi-Layer Boxed</span>
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
            <div className="flex justify-between text-base font-serif font-bold text-stone-900 pt-2 border-t border-stone-200">
              <span>Total Paid:</span>
              <span className="text-amber-900">₹{order.totalAmount.toLocaleString('en-IN')}</span>
            </div>
          </div>
        </div>
      </div>

      {/* 2. LIVE PROFESSIONAL INVOICE MODAL (On-Screen Preview) */}
      {showInvoiceModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 backdrop-blur-xs p-3 sm:p-6 animate-in fade-in duration-200 print:hidden">
          <div className="bg-white rounded-3xl max-w-4xl w-full max-h-[92vh] flex flex-col shadow-2xl border border-stone-200 overflow-hidden">
            {/* Modal Header */}
            <div className="flex items-center justify-between px-6 py-4 bg-stone-950 text-white border-b border-stone-800">
              <div className="flex items-center gap-2">
                <FileText className="w-5 h-5 text-[#FEE815]" />
                <h3 className="font-serif font-bold text-sm sm:text-base text-white">
                  Official Tax Invoice • {order.id}
                </h3>
              </div>
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={handlePrint}
                  className="btn-luxury-primary btn-shimmer-sweep group px-4 py-1.5 rounded-xl text-xs flex items-center gap-1.5 cursor-pointer"
                >
                  <Printer className="w-3.5 h-3.5 text-stone-950" />
                  <span>Print / Save PDF</span>
                </button>
                <button
                  type="button"
                  onClick={() => setShowInvoiceModal(false)}
                  className="text-stone-400 hover:text-white p-1 rounded-lg hover:bg-stone-800 transition-colors"
                  aria-label="Close invoice preview"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Modal Content */}
            <div className="overflow-y-auto p-4 sm:p-6 bg-stone-100/50">
              <ProfessionalInvoice order={order} showPrintButton={false} />
            </div>
          </div>
        </div>
      )}

      {/* 3. DEDICATED PRINT CONTAINER (Active ONLY during browser print output) */}
      <div className="hidden print:block w-full">
        <ProfessionalInvoice order={order} showPrintButton={false} />
      </div>
    </>
  );
}
