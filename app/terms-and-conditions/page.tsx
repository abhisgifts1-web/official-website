import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import {
  FileText,
  CheckSquare,
  Palette,
  Star,
  Monitor,
  CreditCard,
  ImageIcon,
  Truck,
  ShieldCheck,
  RefreshCw,
} from 'lucide-react';

export const metadata: Metadata = {
  title: "Terms & Conditions — Abhi's Gifts Hyderabad",
  description:
    "Abhi's Gifts terms and conditions — order confirmation, design approval, pricing, customer content, shipping, consumer rights and policy updates.",
};

export default function TermsPage() {
  return (
    <div className="w-full max-w-[1760px] mx-auto px-4 sm:px-8 lg:px-12 xl:px-16 py-10 sm:py-16 space-y-10">
      <div className="max-w-4xl mx-auto space-y-8">

        {/* Header */}
        <div className="border-b border-stone-200 pb-5">
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-amber-700 mb-2">
            <FileText className="w-4 h-4" />
            <span>Legal Agreement</span>
          </div>
          <h1 className="font-serif font-bold text-3xl sm:text-4xl text-stone-900 tracking-tight">
            Terms &amp; Conditions
          </h1>
          <p className="text-xs text-stone-500 mt-2">
            Last Updated: November 2026 &nbsp;•&nbsp; Abhi&apos;s Gifts, Hyderabad
          </p>
          <p className="text-sm text-stone-600 mt-3 leading-relaxed">
            By using the Abhi&apos;s Gifts website or placing an order, you agree to these Terms &amp; Conditions.
          </p>
        </div>

        {/* Sections */}
        <div className="space-y-8 text-sm text-stone-700 leading-relaxed">

          {/* 1. Order Confirmation */}
          <section className="space-y-3">
            <h2 className="font-serif font-bold text-xl text-stone-900 flex items-center gap-2">
              <CheckSquare className="w-5 h-5 text-amber-700 shrink-0" />
              1. Order Confirmation
            </h2>
            <p className="text-stone-700">
              Orders are confirmed after the required advance payment and receipt of all necessary details.
            </p>
          </section>

          {/* 2. Design Approval */}
          <section className="space-y-3">
            <h2 className="font-serif font-bold text-xl text-stone-900 flex items-center gap-2">
              <Palette className="w-5 h-5 text-amber-700 shrink-0" />
              2. Design Approval
            </h2>
            <p className="text-stone-700">
              Customers must verify photos, names, dates and spelling before approving the final design.
              Production starts after approval. <strong>Changes may not be possible afterward.</strong>
            </p>
          </section>

          {/* 3. Product Quality */}
          <section className="space-y-3">
            <h2 className="font-serif font-bold text-xl text-stone-900 flex items-center gap-2">
              <Star className="w-5 h-5 text-amber-700 shrink-0" />
              3. Product Quality
            </h2>
            <p className="text-stone-700">
              Print quality depends on the <strong>resolution and clarity</strong> of customer-provided photographs.
            </p>
          </section>

          {/* 4. Colour Variation */}
          <section className="space-y-3">
            <h2 className="font-serif font-bold text-xl text-stone-900 flex items-center gap-2">
              <Monitor className="w-5 h-5 text-amber-700 shrink-0" />
              4. Colour Variation
            </h2>
            <p className="text-stone-700">
              Slight colour differences may occur due to screen settings, lighting and printing processes.
            </p>
          </section>

          {/* 5. Pricing & Payment */}
          <section className="space-y-3">
            <h2 className="font-serif font-bold text-xl text-stone-900 flex items-center gap-2">
              <CreditCard className="w-5 h-5 text-amber-700 shrink-0" />
              5. Pricing &amp; Payment
            </h2>
            <ul className="list-disc pl-6 space-y-2 text-stone-700">
              <li>All prices are in <strong>Indian Rupees (INR).</strong></li>
              <li>Applicable shipping charges will be communicated before confirmation.</li>
              <li><strong>Cash on Delivery is not available.</strong></li>
              <li>Prices may change, but confirmed orders follow the agreed price, subject to lawful corrections.</li>
            </ul>
          </section>

          {/* 6. Customer Content */}
          <section className="space-y-3">
            <h2 className="font-serif font-bold text-xl text-stone-900 flex items-center gap-2">
              <ImageIcon className="w-5 h-5 text-amber-700 shrink-0" />
              6. Customer Content
            </h2>
            <p className="text-stone-700">
              Customers must have the necessary rights or permission to use submitted photos, logos and other content.
              We may <strong>reject unlawful or unauthorized requests.</strong>
            </p>
          </section>

          {/* 7. Shipping & Delivery */}
          <section className="space-y-3">
            <h2 className="font-serif font-bold text-xl text-stone-900 flex items-center gap-2">
              <Truck className="w-5 h-5 text-amber-700 shrink-0" />
              7. Shipping &amp; Delivery
            </h2>
            <p className="text-stone-700">
              Delivery timelines are estimates and may vary due to courier delays or unforeseen circumstances.
              Our{' '}
              <Link href="/shipping-policy" className="text-amber-800 font-semibold underline hover:text-amber-900">
                Shipping Policy
              </Link>
              {' '}and{' '}
              <Link href="/return-refund-policy" className="text-amber-800 font-semibold underline hover:text-amber-900">
                Refund Policy
              </Link>
              {' '}also apply.
            </p>
          </section>

          {/* 8. Consumer Rights */}
          <section className="space-y-3">
            <h2 className="font-serif font-bold text-xl text-stone-900 flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-amber-700 shrink-0" />
              8. Consumer Rights
            </h2>
            <p className="text-stone-700">
              Nothing in these terms limits consumer rights or remedies available under <strong>applicable Indian laws.</strong>
            </p>
          </section>

          {/* 9. Policy Updates */}
          <section className="space-y-3">
            <h2 className="font-serif font-bold text-xl text-stone-900 flex items-center gap-2">
              <RefreshCw className="w-5 h-5 text-amber-700 shrink-0" />
              9. Policy Updates
            </h2>
            <p className="text-stone-700">
              Abhi&apos;s Gifts may update these terms when necessary. Updated versions will be published on our website.
            </p>
          </section>

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
