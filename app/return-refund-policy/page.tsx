import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import { RotateCcw, ShieldCheck, CheckCircle2, AlertTriangle, XCircle, MessageCircle, CreditCard } from 'lucide-react';

export const metadata: Metadata = {
  title: "Returns & Refunds Policy — Abhi's Gifts Hyderabad",
  description: "Abhi's Gifts returns and refunds policy — customized product rules, damaged product claims, advance payment, order cancellations, and refund processing.",
};

export default function ReturnRefundPolicyPage() {
  return (
    <div className="w-full max-w-[1760px] mx-auto px-4 sm:px-8 lg:px-12 xl:px-16 py-10 sm:py-16 space-y-10">
      <div className="max-w-4xl mx-auto space-y-8">

        {/* Header */}
        <div className="border-b border-stone-200 pb-5">
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-amber-700 mb-2">
            <RotateCcw className="w-4 h-4" />
            <span>Customer Protection Policy</span>
          </div>
          <h1 className="font-serif font-bold text-3xl sm:text-4xl text-stone-900 tracking-tight">
            Returns &amp; Refunds Policy
          </h1>
          <p className="text-xs text-stone-500 mt-2">
            Last Updated: November 2026 &nbsp;•&nbsp; Abhi&apos;s Gifts, Hyderabad
          </p>
          <p className="text-sm text-stone-600 mt-3 leading-relaxed">
            Most Abhi&apos;s Gifts products are customized using customer-provided photos and details.
          </p>
        </div>

        {/* Highlight Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="bg-amber-50/60 border border-amber-200/60 rounded-xl p-4 flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
            <div>
              <h3 className="font-medium text-stone-900 text-sm">Report Within 24 Hours</h3>
              <p className="text-xs text-stone-600 mt-1">Contact us within 24 hours of delivery for damage or defects.</p>
            </div>
          </div>
          <div className="bg-emerald-50/60 border border-emerald-200/60 rounded-xl p-4 flex items-start gap-3">
            <ShieldCheck className="w-5 h-5 text-emerald-700 shrink-0 mt-0.5" />
            <div>
              <h3 className="font-medium text-stone-900 text-sm">Free Replacement</h3>
              <p className="text-xs text-stone-600 mt-1">If the issue is our responsibility, replacement shipping is free.</p>
            </div>
          </div>
          <div className="bg-stone-50 border border-stone-200 rounded-xl p-4 flex items-start gap-3">
            <CheckCircle2 className="w-5 h-5 text-stone-700 shrink-0 mt-0.5" />
            <div>
              <h3 className="font-medium text-stone-900 text-sm">5–7 Day Refunds</h3>
              <p className="text-xs text-stone-600 mt-1">Refunds initiated within 5–7 working days via original payment method.</p>
            </div>
          </div>
        </div>

        {/* Sections */}
        <div className="space-y-8 text-sm text-stone-700 leading-relaxed">

          {/* 1. Returns & Exchanges */}
          <section className="space-y-3">
            <h2 className="font-serif font-bold text-xl text-stone-900 flex items-center gap-2">
              <XCircle className="w-5 h-5 text-amber-700 shrink-0" />
              1. Returns &amp; Exchanges
            </h2>
            <ul className="list-disc pl-6 space-y-2 text-stone-700">
              <li><strong>Customized products cannot be returned</strong> for change of mind.</li>
              <li>Customers must verify and approve the final design before production.</li>
              <li>This policy does not affect applicable consumer rights.</li>
            </ul>
          </section>

          {/* 2. Damaged or Incorrect Products */}
          <section className="space-y-3">
            <h2 className="font-serif font-bold text-xl text-stone-900 flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-amber-700 shrink-0" />
              2. Damaged or Incorrect Products
            </h2>
            <p className="text-stone-700">If you receive a damaged, defective, or incorrect product:</p>
            <ul className="list-disc pl-6 space-y-2 text-stone-700">
              <li>Contact us <strong>within 24 hours</strong> of delivery.</li>
              <li>Share product photos and an <strong>unedited unboxing video</strong>, where available.</li>
              <li>
                Contact us through WhatsApp at{' '}
                <a href="tel:+919032372782" className="font-semibold text-amber-800 hover:text-amber-900 underline">
                  +91 90323 72782
                </a>.
              </li>
              <li>After verification, we will arrange a replacement or appropriate remedy.</li>
              <li>If the issue is our responsibility, <strong>replacement shipping will be free.</strong></li>
            </ul>
            <div className="bg-amber-50/80 border border-amber-300/80 rounded-xl p-4 flex items-start gap-3 mt-2">
              <AlertTriangle className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
              <p className="text-xs text-stone-800">
                <strong>Important:</strong> Please retain the original packaging when reporting a damaged or incorrect product.
              </p>
            </div>
          </section>

          {/* 3. Advance Payment */}
          <section className="space-y-3">
            <h2 className="font-serif font-bold text-xl text-stone-900 flex items-center gap-2">
              <CreditCard className="w-5 h-5 text-amber-700 shrink-0" />
              3. Advance Payment
            </h2>
            <ul className="list-disc pl-6 space-y-2 text-stone-700">
              <li><strong>₹300 advance payment</strong> is required to start an order.</li>
              <li>Once customization work starts, the advance is <strong>non-refundable</strong>, subject to applicable laws.</li>
              <li>Remaining payment must be completed before dispatch.</li>
            </ul>
          </section>

          {/* 4. Order Cancellation */}
          <section className="space-y-3">
            <h2 className="font-serif font-bold text-xl text-stone-900 flex items-center gap-2">
              <RotateCcw className="w-5 h-5 text-amber-700 shrink-0" />
              4. Order Cancellation
            </h2>
            <ul className="list-disc pl-6 space-y-2 text-stone-700">
              <li>Cancellation requests must be made as early as possible.</li>
              <li>Requests <strong>before customization begins</strong> will be reviewed for refunds.</li>
              <li>Cancellation may <strong>not be possible</strong> after customization or production starts.</li>
            </ul>
          </section>

          {/* 5. Refund Processing */}
          <section className="space-y-3">
            <h2 className="font-serif font-bold text-xl text-stone-900 flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-amber-700 shrink-0" />
              5. Refund Processing
            </h2>
            <p className="text-stone-700">If Abhi&apos;s Gifts cancels an order and cannot fulfil it:</p>
            <ul className="list-disc pl-6 space-y-2 text-stone-700">
              <li>A <strong>full refund</strong> will be provided.</li>
              <li>Refunds will generally be initiated within <strong>5–7 working days.</strong></li>
              <li>Refunds will be sent through the <strong>original payment method</strong> wherever possible.</li>
            </ul>
          </section>

          {/* Contact Box */}
          <div className="bg-stone-50 border border-stone-200 rounded-xl p-5 flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <MessageCircle className="w-6 h-6 text-amber-700 shrink-0" />
            <div>
              <p className="font-semibold text-stone-900 text-sm">Contact Us</p>
              <div className="text-xs text-stone-600 mt-1 space-y-0.5">
                <p>
                  WhatsApp / Call:{' '}
                  <a href="tel:+919032372782" className="font-bold text-amber-800 hover:text-amber-900 underline">
                    +91 90323 72782
                  </a>
                </p>
                <p>
                  Email:{' '}
                  <a href="mailto:abhisgifts@gmail.com" className="font-bold text-amber-800 hover:text-amber-900 underline">
                    abhisgifts@gmail.com
                  </a>
                </p>
                <p>Working Hours: Monday – Sunday, 10:00 AM – 08:00 PM IST</p>
              </div>
            </div>
          </div>

        </div>

        {/* Back Link */}
        <div className="pt-6 border-t border-stone-200 flex flex-wrap items-center justify-between gap-4">
          <Link
            href="/"
            className="text-xs sm:text-sm font-medium text-stone-600 hover:text-stone-900 inline-flex items-center gap-1"
          >
            ← Return to Storefront
          </Link>
          <Link
            href="/contact"
            className="text-xs sm:text-sm font-semibold text-amber-800 hover:text-amber-900"
          >
            Have a Question? Contact Us →
          </Link>
        </div>

      </div>
    </div>
  );
}
