import React from 'react';
import { Metadata } from 'next';
import { Truck, ShieldCheck, Clock, Package } from 'lucide-react';
import { INITIAL_SETTINGS } from '@/lib/data/settings';

export const metadata: Metadata = {
  title: 'Shipping Policy — Abhi Gifts',
  description: 'Shipping rates, delivery timelines, safe packaging standards.',
};

export default function ShippingPolicyPage() {
  return (
    <div className="w-full max-w-[1760px] mx-auto px-4 sm:px-8 lg:px-12 xl:px-16 py-10 sm:py-16 space-y-8">
      <div className="max-w-4xl mx-auto space-y-8">
        <div className="border-b border-stone-200 pb-4">
        <h1 className="font-serif font-bold text-3xl sm:text-4xl text-stone-900">Shipping Policy</h1>
        <p className="text-xs text-stone-500 mt-1">Last Updated: October 2026 • Effective for all deliveries</p>
      </div>

      <div className="prose prose-stone max-w-none text-xs sm:text-sm text-stone-700 leading-relaxed space-y-6">
        <section className="space-y-2">
          <h2 className="font-serif font-bold text-xl text-stone-900">1. Delivery Coverage</h2>
          <p>
            At Abhi Gifts, we ship directly from our artisan studio in Tirupati, Andhra Pradesh to over 19,000+ postal pincodes across India via premium courier partners including BlueDart Express, Delhivery, DTDC, and SafeXpress.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="font-serif font-bold text-xl text-stone-900">2. Shipping Charges</h2>
          <p>
            A flat standard delivery fee of ₹{INITIAL_SETTINGS.defaultShippingFee} is applied to all orders at checkout for safe packaging and transit.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="font-serif font-bold text-xl text-stone-900">3. Processing & Delivery Timelines</h2>
          <ul className="list-disc list-inside space-y-1.5">
            <li><strong>Standard Artworks:</strong> Hand-inspected, cleaned, and dispatched within 24 to 48 business hours.</li>
            <li><strong>Custom Upload Photo Frames:</strong> Formatted, studio color-graded, and dispatched within 48 to 72 hours.</li>
            <li><strong>Transit Times:</strong> 2 to 3 business days for South India; 3 to 5 business days for North, West, Central, and North-East India.</li>
          </ul>
        </section>

        <section className="space-y-2">
          <h2 className="font-serif font-bold text-xl text-stone-900">4. Multi-Layer Packaging Standards</h2>
          <p>
            We take pride in our zero-damage packaging protocol. Each artwork panel is wrapped in scratch-proof butter paper, encapsulated in shock-absorbing corner air guards, and enclosed in a rigid 5-layer honeycomb wooden reinforcement crate.
          </p>
          <p>
            In the rare event that an artwork is damaged in transit, please share an unboxing photo or video on WhatsApp within 48 hours of receipt. Our support team will promptly assist you with a verified replacement or resolution.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="font-serif font-bold text-xl text-stone-900">5. Dispatch & Delivery Updates</h2>
          <p>
            Once your artwork is crafted and dispatched by our courier partner, you will receive an automated WhatsApp and SMS notification with your delivery dispatch confirmation. For any queries regarding delivery progress, our team is always accessible on WhatsApp at +91 90323 72782.
          </p>
        </section>
      </div>
      </div>
    </div>
  );
}
