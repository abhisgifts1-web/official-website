import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import { Truck, ShieldCheck, Clock, MapPin, PackageCheck, AlertCircle, CreditCard, MessageCircle } from 'lucide-react';

export const metadata: Metadata = {
  title: "Shipping Policy — Abhi's Gifts Hyderabad",
  description: "Abhi's Gifts shipping policy — pan-India delivery, order processing timelines, COD availability, tracking, and contact details.",
};

export default function ShippingPolicyPage() {
  return (
    <div className="w-full max-w-[1760px] mx-auto px-4 sm:px-8 lg:px-12 xl:px-16 py-10 sm:py-16 space-y-10">
      <div className="max-w-4xl mx-auto space-y-8">

        {/* Header */}
        <div className="border-b border-stone-200 pb-5">
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-amber-700 mb-2">
            <Truck className="w-4 h-4" />
            <span>Delivery &amp; Logistics</span>
          </div>
          <h1 className="font-serif font-bold text-3xl sm:text-4xl text-stone-900 tracking-tight">
            Shipping Policy
          </h1>
          <p className="text-xs text-stone-500 mt-2">
            Last Updated: November 2026 &nbsp;•&nbsp; Abhi&apos;s Gifts, Hyderabad
          </p>
          <p className="text-sm text-stone-600 mt-3 leading-relaxed">
            At Abhi&apos;s Gifts, we carefully prepare and deliver personalized gifts across India.
          </p>
        </div>

        {/* Highlight Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="bg-amber-50/60 border border-amber-200/60 rounded-xl p-4 flex items-start gap-3">
            <Clock className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
            <div>
              <h3 className="font-medium text-stone-900 text-sm">3–5 Days Production</h3>
              <p className="text-xs text-stone-600 mt-1">After design approval. Excludes Sundays &amp; public holidays.</p>
            </div>
          </div>
          <div className="bg-emerald-50/60 border border-emerald-200/60 rounded-xl p-4 flex items-start gap-3">
            <Truck className="w-5 h-5 text-emerald-700 shrink-0 mt-0.5" />
            <div>
              <h3 className="font-medium text-stone-900 text-sm">Pan-India Delivery</h3>
              <p className="text-xs text-stone-600 mt-1">3–7 working days after dispatch via trusted couriers.</p>
            </div>
          </div>
          <div className="bg-stone-50 border border-stone-200 rounded-xl p-4 flex items-start gap-3">
            <MessageCircle className="w-5 h-5 text-stone-700 shrink-0 mt-0.5" />
            <div>
              <h3 className="font-medium text-stone-900 text-sm">WhatsApp Tracking</h3>
              <p className="text-xs text-stone-600 mt-1">Tracking details shared on WhatsApp after dispatch.</p>
            </div>
          </div>
        </div>

        {/* Sections */}
        <div className="space-y-8 text-sm text-stone-700 leading-relaxed">

          {/* 1. Order Processing */}
          <section className="space-y-3">
            <h2 className="font-serif font-bold text-xl text-stone-900 flex items-center gap-2">
              <PackageCheck className="w-5 h-5 text-amber-700 shrink-0" />
              1. Order Processing
            </h2>
            <ul className="list-disc pl-6 space-y-2 text-stone-700">
              <li>Orders are processed after payment and receipt of all required photos and details.</li>
              <li>Design and production usually take <strong>3–5 working days</strong> after design approval.</li>
              <li>Production starts <strong>only after customer approval.</strong></li>
              <li>Sundays and public holidays are excluded from working days.</li>
            </ul>
          </section>

          {/* 2. Shipping & Delivery */}
          <section className="space-y-3">
            <h2 className="font-serif font-bold text-xl text-stone-900 flex items-center gap-2">
              <Truck className="w-5 h-5 text-amber-700 shrink-0" />
              2. Shipping &amp; Delivery
            </h2>
            <ul className="list-disc pl-6 space-y-2 text-stone-700">
              <li>We deliver across India through trusted courier partners.</li>
              <li>Estimated delivery time is <strong>3–7 working days</strong> after dispatch.</li>
              <li>Delivery may take longer for remote locations or due to unforeseen delays.</li>
            </ul>
          </section>

          {/* 3. Payment & COD */}
          <section className="space-y-3">
            <h2 className="font-serif font-bold text-xl text-stone-900 flex items-center gap-2">
              <CreditCard className="w-5 h-5 text-amber-700 shrink-0" />
              3. Payment &amp; COD
            </h2>
            <ul className="list-disc pl-6 space-y-2 text-stone-700">
              <li><strong>Cash on Delivery (COD) is not available.</strong></li>
              <li>Orders require an advance payment.</li>
              <li>Remaining balance must be paid before dispatch.</li>
            </ul>
          </section>

          {/* 4. Tracking & Address */}
          <section className="space-y-3">
            <h2 className="font-serif font-bold text-xl text-stone-900 flex items-center gap-2">
              <MapPin className="w-5 h-5 text-amber-700 shrink-0" />
              4. Tracking &amp; Address
            </h2>
            <ul className="list-disc pl-6 space-y-2 text-stone-700">
              <li>Tracking details will be shared through WhatsApp after dispatch.</li>
              <li>Customers must provide accurate delivery details.</li>
              <li>Re-shipping charges due to incorrect addresses will be paid by the customer.</li>
            </ul>
          </section>

          {/* 5. Delayed or Lost Shipments */}
          <section className="space-y-3">
            <h2 className="font-serif font-bold text-xl text-stone-900 flex items-center gap-2">
              <AlertCircle className="w-5 h-5 text-amber-700 shrink-0" />
              5. Delayed or Lost Shipments
            </h2>
            <p className="text-stone-700">
              For delayed or lost parcels, contact us. We will coordinate with the courier partner.
            </p>
          </section>

          {/* Contact Box */}
          <div className="bg-amber-50/80 border border-amber-300/80 rounded-xl p-5 flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <MessageCircle className="w-6 h-6 text-amber-700 shrink-0" />
            <div>
              <p className="font-semibold text-stone-900 text-sm">Need Help? Contact Us</p>
              <p className="text-xs text-stone-600 mt-1">
                Call or WhatsApp us at{' '}
                <a
                  href="tel:+919032372782"
                  className="font-bold text-amber-800 hover:text-amber-900 underline"
                >
                  +91 90323 72782
                </a>
                {' '}for shipping queries.
              </p>
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
            Have a Shipping Question? Contact Us →
          </Link>
        </div>

      </div>
    </div>
  );
}
