import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import { RotateCcw, ShieldCheck, CheckCircle2, AlertTriangle, HelpCircle } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Return & Refund Policy — Abhi Gifts Hyderabad',
  description: 'Transparent return, replacement, and refund policies for customized acrylic photo frames, LED gifts, and wall art from Abhi Gifts.',
};

export default function ReturnRefundPolicyPage() {
  return (
    <div className="w-full max-w-[1760px] mx-auto px-4 sm:px-8 lg:px-12 xl:px-16 py-10 sm:py-16 space-y-10">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Header */}
        <div className="border-b border-stone-200 pb-5">
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-amber-700 mb-2">
            <RotateCcw className="w-4 h-4" />
            <span>Customer Protection Guarantee</span>
          </div>
          <h1 className="font-serif font-bold text-3xl sm:text-4xl text-stone-900 tracking-tight">
            Return, Replacement & Refund Policy
          </h1>
          <p className="text-xs text-stone-500 mt-1">Last Updated: November 2026 • Abhi Gifts Dilsukhnagar, Hyderabad</p>
        </div>

        {/* Highlight Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="bg-emerald-50/60 border border-emerald-200/60 rounded-xl p-4 flex items-start gap-3">
            <ShieldCheck className="w-5 h-5 text-emerald-700 shrink-0 mt-0.5" />
            <div>
              <h3 className="font-medium text-stone-900 text-sm">100% Free Replacement</h3>
              <p className="text-xs text-stone-600 mt-1">Free replacement for transit damage or printing defects.</p>
            </div>
          </div>
          <div className="bg-amber-50/60 border border-amber-200/60 rounded-xl p-4 flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
            <div>
              <h3 className="font-medium text-stone-900 text-sm">48-Hour Notice Window</h3>
              <p className="text-xs text-stone-600 mt-1">Report transit issues within 48 hours of parcel receipt.</p>
            </div>
          </div>
          <div className="bg-stone-50 border border-stone-200 rounded-xl p-4 flex items-start gap-3">
            <CheckCircle2 className="w-5 h-5 text-stone-700 shrink-0 mt-0.5" />
            <div>
              <h3 className="font-medium text-stone-900 text-sm">5–7 Day Bank Refund</h3>
              <p className="text-xs text-stone-600 mt-1">Approved refunds credited directly to source account.</p>
            </div>
          </div>
        </div>

        {/* Detailed Content */}
        <div className="prose prose-stone max-w-none text-xs sm:text-sm text-stone-700 leading-relaxed space-y-6">
          <section className="space-y-3">
            <h2 className="font-serif font-bold text-xl text-stone-900">
              1. Personalized & Custom-Made Products
            </h2>
            <p>
              At Abhi Gifts, most of our items (including custom photo acrylic frames, LED names, Spotify plaques, and personalized devotional wall art) are uniquely crafted using your personal photos, names, dates, and quotes.
            </p>
            <p>
              Because these items are tailor-made and cannot be repurposed or resold, <strong>personalized products are not eligible for voluntary returns or exchanges due to change of mind.</strong> However, your order is completely covered by our Transit & Quality Guarantee.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-serif font-bold text-xl text-stone-900">
              2. Free Damage & Defect Replacement Policy
            </h2>
            <p>
              We pride ourselves on 100% customer happiness. You are entitled to a <strong>brand-new, free replacement</strong> in any of the following scenarios:
            </p>
            <ul className="list-disc pl-5 space-y-1">
              <li><strong>Transit Damage:</strong> The frame, glass, or acrylic arrived cracked, chipped, or scratched.</li>
              <li><strong>Electronic Malfunction:</strong> The LED backlight, power adapter, or remote control does not function upon arrival.</li>
              <li><strong>Printing Error:</strong> Image misalignment, color distortion, or typographical error originating from our workshop.</li>
              <li><strong>Wrong Product:</strong> You received an item different from the design and specifications ordered.</li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="font-serif font-bold text-xl text-stone-900">
              3. How to Claim a Free Replacement
            </h2>
            <p>To ensure swift resolution without delays, please follow these simple steps:</p>
            <ol className="list-decimal pl-5 space-y-2">
              <li>
                <strong>Record an Unboxing Video:</strong> When your courier parcel arrives, record a short 30-second video while opening the outer cardboard box and inspecting the frame.
              </li>
              <li>
                <strong>Contact Support within 48 Hours:</strong> Send your Order ID (e.g. AG-2026-...) along with the unboxing video/photos to our WhatsApp helpline at <strong>+91 90323 72782</strong> or email <strong>abhisgifts@gmail.com</strong>.
              </li>
              <li>
                <strong>Fast-Track Dispatch:</strong> Our team will review the claim within 4 hours and dispatch a brand-new replacement at zero additional shipping cost.
              </li>
            </ol>
          </section>

          <section className="space-y-3">
            <h2 className="font-serif font-bold text-xl text-stone-900">
              4. Order Cancellations
            </h2>
            <p>
              You may cancel your order free of charge within <strong>4 hours</strong> of placement. After 4 hours, our design and laser-cutting team begins fabrication, and the order enters the production pipeline. Orders already in fabrication or dispatched cannot be cancelled.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-serif font-bold text-xl text-stone-900">
              5. Refund Timeline & Mode of Payment
            </h2>
            <p>
              In cases where a replacement cannot be fulfilled or an order was cancelled within the allowed 4-hour window:
            </p>
            <ul className="list-disc pl-5 space-y-1">
              <li>
                <strong>Prepaid Orders (UPI / Cards / NetBanking):</strong> The full refund is processed via Razorpay directly back to your original source payment method within 5 to 7 business days.
              </li>
              <li>
                <strong>Cash on Delivery (COD):</strong> If COD deposit was collected, refund is issued via UPI / IMPS bank transfer after bank details verification.
              </li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="font-serif font-bold text-xl text-stone-900">
              6. Need Help with an Order?
            </h2>
            <p>
              We are based right here in Hyderabad! Visit our studio in Dilsukhnagar or reach out to our dedicated support executives:
            </p>
            <div className="bg-stone-50 border border-stone-200 rounded-xl p-4 text-xs sm:text-sm space-y-1 not-prose">
              <p><strong>Customer Support:</strong> +91 90323 72782</p>
              <p><strong>Support Email:</strong> abhisgifts@gmail.com</p>
              <p><strong>Workshop & Studio:</strong> Dilsukhnagar, Hyderabad, Telangana - 500060</p>
              <p><strong>Working Hours:</strong> Monday – Saturday: 10:00 AM – 8:30 PM IST</p>
            </div>
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
            href="/track-order"
            className="text-xs sm:text-sm font-semibold text-amber-800 hover:text-amber-900"
          >
            Track Your Order Status →
          </Link>
        </div>
      </div>
    </div>
  );
}
