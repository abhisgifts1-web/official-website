import React from 'react';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Return, Replacement & Refund Policy — Abhi Gifts',
  description: 'Details on our replacement guarantee, return guidelines, and refund process.',
};

export default function ReturnRefundPolicyPage() {
  return (
    <div className="w-full max-w-[1760px] mx-auto px-4 sm:px-8 lg:px-12 xl:px-16 py-10 sm:py-16 space-y-8">
      <div className="max-w-4xl mx-auto space-y-8">
        <div className="border-b border-stone-200 pb-4">
        <h1 className="font-serif font-bold text-3xl sm:text-4xl text-stone-900">Return & Replacement Policy</h1>
        <p className="text-xs text-stone-500 mt-1">Last Updated: October 2026</p>
      </div>

      <div className="prose prose-stone max-w-none text-xs sm:text-sm text-stone-700 leading-relaxed space-y-6">
        <section className="space-y-2">
          <h2 className="font-serif font-bold text-xl text-stone-900">1. Instant Free Replacement for Transit Damage</h2>
          <p>
            Your satisfaction and peace of mind are paramount. If your artwork arrives damaged, scratched, cracked, or with a malfunctioning LED adapter:
          </p>
          <ul className="list-disc list-inside space-y-1">
            <li>Contact our customer care desk within 48 hours of delivery.</li>
            <li>Send a photograph or quick unboxing clip showing the damage to <strong>support@abhigifts.com</strong> or our official WhatsApp number.</li>
            <li>Our team will immediately dispatch a brand-new replacement at zero cost to you.</li>
          </ul>
        </section>

        <section className="space-y-2">
          <h2 className="font-serif font-bold text-xl text-stone-900">2. 7-Day Return Policy on Standard Artworks</h2>
          <p>
            For standard non-customized artworks, we offer a 7-day return window from the date of delivery provided the item is unused, in original packaging, and with protective plastic film intact. Return shipping courier pickup will be arranged by our logistics team.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="font-serif font-bold text-xl text-stone-900">3. Custom Photo Upload Prints</h2>
          <p>
            Because custom photo frames are individually manufactured with personal photos and custom engravings, they cannot be returned for buyer remorse or size misjudgment. However, they are 100% eligible for immediate free replacement if they arrive damaged or with printing defects.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="font-serif font-bold text-xl text-stone-900">4. Refund Processing</h2>
          <p>
            Approved refunds are credited back to the original payment source (bank account, UPI, or card) within 5 to 7 business days following return quality verification. For Cash on Delivery orders, refunds are processed via secure UPI transfer or NEFT upon customer request.
          </p>
        </section>
      </div>
      </div>
    </div>
  );
}
