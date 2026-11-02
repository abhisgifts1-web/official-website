import React from 'react';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Terms & Conditions — Abhi Gifts',
  description: 'Terms of service, sales conditions, and legal agreements for Abhi Gifts.',
};

export default function TermsPage() {
  return (
    <div className="w-full max-w-[1760px] mx-auto px-4 sm:px-8 lg:px-12 xl:px-16 py-10 sm:py-16 space-y-8">
      <div className="max-w-4xl mx-auto space-y-8">
        <div className="border-b border-stone-200 pb-4">
        <h1 className="font-serif font-bold text-3xl sm:text-4xl text-stone-900">Terms & Conditions</h1>
        <p className="text-xs text-stone-500 mt-1">Last Updated: October 2026</p>
      </div>

      <div className="prose prose-stone max-w-none text-xs sm:text-sm text-stone-700 leading-relaxed space-y-6">
        <section className="space-y-2">
          <h2 className="font-serif font-bold text-xl text-stone-900">1. Acceptance of Terms</h2>
          <p>
            By accessing or using the Abhi Gifts website and purchasing products, you agree to be bound by these Terms and Conditions and our associated store policies.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="font-serif font-bold text-xl text-stone-900">2. Products & Specifications</h2>
          <p>
            We take utmost care to ensure product photographs, dimensions, and specifications are accurate. Slight visual variations in natural lighting ambiance and frame edge beveling may occur due to handcrafting processes.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="font-serif font-bold text-xl text-stone-900">3. Pricing & Taxes</h2>
          <p>
            All prices displayed on Abhi Gifts are quoted in Indian Rupees (INR) and are inclusive of applicable Goods and Services Tax (GST). We reserve the right to revise promotional pricing and discount coupons without prior notice.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="font-serif font-bold text-xl text-stone-900">4. Intellectual Property</h2>
          <p>
            All artistic designs, photography, site branding, and sacred graphic compositions are the intellectual property of Abhi Gifts. Unauthorized reproduction or commercial re-distribution is strictly prohibited.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="font-serif font-bold text-xl text-stone-900">5. Governing Law</h2>
          <p>
            These terms shall be governed by and interpreted under the laws of the Republic of India. Any legal disputes arising out of website usage or purchases shall be subject to the exclusive jurisdiction of the competent courts in Tirupati, Andhra Pradesh.
          </p>
        </section>
      </div>
      </div>
    </div>
  );
}
