import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import { ShieldCheck, User, Settings, Share2, Lock, ImageIcon, Cookie, UserCheck, MessageCircle } from 'lucide-react';

export const metadata: Metadata = {
  title: "Privacy Policy — Abhi's Gifts Hyderabad",
  description: "Abhi's Gifts privacy policy — how we collect, use, and protect your personal information, photos, and payment data.",
};

export default function PrivacyPolicyPage() {
  return (
    <div className="w-full max-w-[1760px] mx-auto px-4 sm:px-8 lg:px-12 xl:px-16 py-10 sm:py-16 space-y-10">
      <div className="max-w-4xl mx-auto space-y-8">

        {/* Header */}
        <div className="border-b border-stone-200 pb-5">
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-amber-700 mb-2">
            <ShieldCheck className="w-4 h-4" />
            <span>Your Privacy Matters</span>
          </div>
          <h1 className="font-serif font-bold text-3xl sm:text-4xl text-stone-900 tracking-tight">
            Privacy Policy
          </h1>
          <p className="text-xs text-stone-500 mt-2">
            Last Updated: November 2026 &nbsp;•&nbsp; Abhi&apos;s Gifts, Hyderabad
          </p>
          <p className="text-sm text-stone-600 mt-3 leading-relaxed">
            At Abhi&apos;s Gifts, we respect your privacy and protect your personal information.
          </p>
        </div>

        {/* Sections */}
        <div className="space-y-8 text-sm text-stone-700 leading-relaxed">

          {/* 1. Information We Collect */}
          <section className="space-y-3">
            <h2 className="font-serif font-bold text-xl text-stone-900 flex items-center gap-2">
              <User className="w-5 h-5 text-amber-700 shrink-0" />
              1. Information We Collect
            </h2>
            <p className="text-stone-700">We may collect:</p>
            <ul className="list-disc pl-6 space-y-2 text-stone-700">
              <li>Name, mobile number and email address.</li>
              <li>Billing and delivery address.</li>
              <li>Customer photos and customization details.</li>
              <li>Order and payment information.</li>
            </ul>
          </section>

          {/* 2. How We Use Your Information */}
          <section className="space-y-3">
            <h2 className="font-serif font-bold text-xl text-stone-900 flex items-center gap-2">
              <Settings className="w-5 h-5 text-amber-700 shrink-0" />
              2. How We Use Your Information
            </h2>
            <p className="text-stone-700">Your information is used for:</p>
            <ul className="list-disc pl-6 space-y-2 text-stone-700">
              <li>Processing and confirming orders.</li>
              <li>Creating customized products.</li>
              <li>Processing payments and deliveries.</li>
              <li>Customer support and refunds.</li>
            </ul>
          </section>

          {/* 3. Sharing of Information */}
          <section className="space-y-3">
            <h2 className="font-serif font-bold text-xl text-stone-900 flex items-center gap-2">
              <Share2 className="w-5 h-5 text-amber-700 shrink-0" />
              3. Sharing of Information
            </h2>
            <p className="text-stone-700">
              We <strong>do not sell or rent</strong> customer information.
            </p>
            <p className="text-stone-700">
              Necessary details may be shared with courier partners, payment providers, website service providers,
              and government authorities when legally required.
            </p>
          </section>

          {/* 4. Payment Security */}
          <section className="space-y-3">
            <h2 className="font-serif font-bold text-xl text-stone-900 flex items-center gap-2">
              <Lock className="w-5 h-5 text-amber-700 shrink-0" />
              4. Payment Security
            </h2>
            <p className="text-stone-700">
              Online payments are handled through authorized payment providers. We do <strong>not intentionally
              store</strong> your full card details, UPI PIN or banking passwords.
            </p>
          </section>

          {/* 5. Customer Photos */}
          <section className="space-y-3">
            <h2 className="font-serif font-bold text-xl text-stone-900 flex items-center gap-2">
              <ImageIcon className="w-5 h-5 text-amber-700 shrink-0" />
              5. Customer Photos
            </h2>
            <p className="text-stone-700">
              Customer photos are used <strong>only for customization and order fulfilment.</strong> We take
              reasonable steps to protect them from unauthorized access.
            </p>
          </section>

          {/* 6. Cookies */}
          <section className="space-y-3">
            <h2 className="font-serif font-bold text-xl text-stone-900 flex items-center gap-2">
              <Cookie className="w-5 h-5 text-amber-700 shrink-0" />
              6. Cookies
            </h2>
            <p className="text-stone-700">
              Our website may use cookies to improve functionality and understand website usage. You can manage
              cookies through your browser settings.
            </p>
          </section>

          {/* 7. Your Privacy Rights */}
          <section className="space-y-3">
            <h2 className="font-serif font-bold text-xl text-stone-900 flex items-center gap-2">
              <UserCheck className="w-5 h-5 text-amber-700 shrink-0" />
              7. Your Privacy Rights
            </h2>
            <p className="text-stone-700">
              You can contact us to request access, correction or deletion of your personal information,
              subject to applicable legal and business record requirements.
            </p>
          </section>

          {/* Contact Box */}
          <div className="bg-stone-50 border border-stone-200 rounded-xl p-5 flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <MessageCircle className="w-6 h-6 text-amber-700 shrink-0" />
            <div>
              <p className="font-semibold text-stone-900 text-sm">Privacy Enquiries</p>
              <div className="text-xs text-stone-600 mt-1 space-y-0.5">
                <p>
                  Email:{' '}
                  <a
                    href="mailto:abhisgifts@gmail.com"
                    className="font-bold text-amber-800 hover:text-amber-900 underline"
                  >
                    abhisgifts@gmail.com
                  </a>
                </p>
                <p>
                  WhatsApp:{' '}
                  <a
                    href="tel:+919032372782"
                    className="font-bold text-amber-800 hover:text-amber-900 underline"
                  >
                    +91 90323 72782
                  </a>
                </p>
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
            Have a Privacy Question? Contact Us →
          </Link>
        </div>

      </div>
    </div>
  );
}
