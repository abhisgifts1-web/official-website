import React from 'react';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Privacy Policy — Abhi Gifts',
  description: 'How Abhi Gifts collects, uses, and protects your personal and payment data.',
};

export default function PrivacyPolicyPage() {
  return (
    <div className="w-full max-w-[1760px] mx-auto px-4 sm:px-8 lg:px-12 xl:px-16 py-10 sm:py-16 space-y-8">
      <div className="max-w-4xl mx-auto space-y-8">
        <div className="border-b border-stone-200 pb-4">
        <h1 className="font-serif font-bold text-3xl sm:text-4xl text-stone-900">Privacy Policy</h1>
        <p className="text-xs text-stone-500 mt-1">Last Updated: October 2026</p>
      </div>

      <div className="prose prose-stone max-w-none text-xs sm:text-sm text-stone-700 leading-relaxed space-y-6">
        <section className="space-y-2">
          <h2 className="font-serif font-bold text-xl text-stone-900">1. Information We Collect</h2>
          <p>
            When you browse Abhi Gifts, create an account, or place an order, we collect only necessary details to fulfill your delivery: customer name, shipping address, contact phone number, and email address.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="font-serif font-bold text-xl text-stone-900">2. Customer Photo Upload Privacy</h2>
          <p>
            Images uploaded through our Custom Photo Frame Studio are treated with strict confidentiality. They are used exclusively for manufacturing your ordered artwork, never shared with third parties, and permanently purged from production servers after order completion.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="font-serif font-bold text-xl text-stone-900">3. Payment Security</h2>
          <p>
            We do not store your credit card details, CVV, or net banking passwords. All online financial transactions are encrypted and processed through RBI-authorized payment aggregators (Razorpay) adhering to PCI-DSS Level 1 compliance.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="font-serif font-bold text-xl text-stone-900">4. Contact & Data Access</h2>
          <p>
            For inquiries regarding your personal data or to request deletion of your account record, email us at <strong>privacy@abhigifts.com</strong>.
          </p>
        </section>
      </div>
      </div>
    </div>
  );
}
