import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import { Truck, ShieldCheck, Clock, MapPin, PackageCheck, AlertCircle } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Shipping & Delivery Policy — Abhi Gifts Hyderabad',
  description: 'Fast, secure, and damage-proof delivery across Hyderabad, Telangana, and Pan-India for custom acrylic frames, LED gifts, and wall art.',
};

export default function ShippingPolicyPage() {
  return (
    <div className="w-full max-w-[1760px] mx-auto px-4 sm:px-8 lg:px-12 xl:px-16 py-10 sm:py-16 space-y-10">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Header */}
        <div className="border-b border-stone-200 pb-5">
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-amber-700 mb-2">
            <Truck className="w-4 h-4" />
            <span>Delivery & Logistics</span>
          </div>
          <h1 className="font-serif font-bold text-3xl sm:text-4xl text-stone-900 tracking-tight">
            Shipping & Delivery Policy
          </h1>
          <p className="text-xs text-stone-500 mt-1">Last Updated: November 2026 • Abhi Gifts Dilsukhnagar, Hyderabad</p>
        </div>

        {/* Highlight Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="bg-amber-50/60 border border-amber-200/60 rounded-xl p-4 flex items-start gap-3">
            <Clock className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
            <div>
              <h3 className="font-medium text-stone-900 text-sm">2–4 Days in Hyderabad</h3>
              <p className="text-xs text-stone-600 mt-1">Express local delivery in Hyderabad & Secunderabad.</p>
            </div>
          </div>
          <div className="bg-emerald-50/60 border border-emerald-200/60 rounded-xl p-4 flex items-start gap-3">
            <ShieldCheck className="w-5 h-5 text-emerald-700 shrink-0 mt-0.5" />
            <div>
              <h3 className="font-medium text-stone-900 text-sm">Zero-Risk Transit</h3>
              <p className="text-xs text-stone-600 mt-1">100% Free replacement if damaged during transit.</p>
            </div>
          </div>
          <div className="bg-stone-50 border border-stone-200 rounded-xl p-4 flex items-start gap-3">
            <PackageCheck className="w-5 h-5 text-stone-700 shrink-0 mt-0.5" />
            <div>
              <h3 className="font-medium text-stone-900 text-sm">Free Shipping &gt; ₹999</h3>
              <p className="text-xs text-stone-600 mt-1">All orders above ₹999 qualify for free shipping.</p>
            </div>
          </div>
        </div>

        {/* Detailed Sections */}
        <div className="prose prose-stone max-w-none text-xs sm:text-sm text-stone-700 leading-relaxed space-y-6">
          <section className="space-y-3">
            <h2 className="font-serif font-bold text-xl text-stone-900 flex items-center gap-2">
              <span>1. Order Processing & Crafting Time</span>
            </h2>
            <p>
              Every customized acrylic frame, LED night plaque, and personalized gift undergoes precision fabrication at our Dilsukhnagar workshop. Because your order is custom-made:
            </p>
            <ul className="list-disc pl-5 space-y-1">
              <li><strong>Design Approval:</strong> Digital mockups for custom photos are verified within 6 to 12 hours.</li>
              <li><strong>Fabrication & Laser Cutting:</strong> 24 to 48 hours for laser cutting, HD UV printing, and electronic assembly (for LED frames).</li>
              <li><strong>Quality Inspection:</strong> Each frame is checked under bright studio lighting for crystal clarity and flawless illumination before boxing.</li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="font-serif font-bold text-xl text-stone-900">
              2. Estimated Delivery Timelines
            </h2>
            <p>Once dispatched from our Hyderabad facility, estimated transit times are:</p>
            <div className="border border-stone-200 rounded-xl overflow-hidden not-prose">
              <table className="w-full text-left text-xs sm:text-sm">
                <thead className="bg-stone-100 border-b border-stone-200 text-stone-900 font-semibold">
                  <tr>
                    <th className="p-3">Destination Region</th>
                    <th className="p-3">Estimated Courier Transit</th>
                    <th className="p-3">Shipping Partner</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-stone-200">
                  <tr>
                    <td className="p-3 font-medium text-stone-900">Hyderabad & Secunderabad</td>
                    <td className="p-3">1 to 2 business days</td>
                    <td className="p-3 text-stone-600">Local Express / Porter / DTDC</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-medium text-stone-900">Telangana & Andhra Pradesh</td>
                    <td className="p-3">2 to 4 business days</td>
                    <td className="p-3 text-stone-600">Blue Dart, DTDC, Delhivery</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-medium text-stone-900">Metro Cities (Bengaluru, Chennai, Mumbai, Delhi)</td>
                    <td className="p-3">3 to 5 business days</td>
                    <td className="p-3 text-stone-600">Blue Dart Express / Air Cargo</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-medium text-stone-900">Rest of India & Remote Areas</td>
                    <td className="p-3">5 to 7 business days</td>
                    <td className="p-3 text-stone-600">Delhivery, DTDC, India Post</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          <section className="space-y-3">
            <h2 className="font-serif font-bold text-xl text-stone-900">
              3. Packaging & Damage Protection Guarantee
            </h2>
            <p>
              We understand the fragile nature of acrylic and LED frames. Each shipment is secured with our signature 4-stage packaging:
            </p>
            <ol className="list-decimal pl-5 space-y-1">
              <li><strong>Protective Peel Film:</strong> Scratch-resistant transparent film shielding the high-gloss acrylic surface.</li>
              <li><strong>High-Density Bubble Cushioning:</strong> 25mm thick shock-absorbing foam on all sides.</li>
              <li><strong>Corner Protectors:</strong> Rigid corner guards guarding frame edges from transit impacts.</li>
              <li><strong>Heavy-Duty Corrugated Master Box:</strong> 5-ply export-grade outer cardboard marked with Fragile Glass warnings.</li>
            </ol>
            <div className="bg-amber-50/80 border border-amber-300/80 rounded-xl p-4 flex items-start gap-3 mt-3">
              <AlertCircle className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
              <p className="text-xs text-stone-800">
                <strong>Transit Assurance:</strong> If your frame arrives damaged or cracked during transit, we replace it completely free of charge. Please record a short 30-second unboxing video and share it with us on WhatsApp within 48 hours of delivery.
              </p>
            </div>
          </section>

          <section className="space-y-3">
            <h2 className="font-serif font-bold text-xl text-stone-900">
              4. Order Tracking & WhatsApp Updates
            </h2>
            <p>
              Once your parcel is handed over to the courier partner, an automated dispatch notification with your real-time AWB tracking number will be sent to your registered mobile number via WhatsApp and SMS. You can also track your shipment live using our{' '}
              <Link href="/track-order" className="text-amber-800 font-semibold underline hover:text-amber-900">
                Live Order Tracker
              </Link>.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-serif font-bold text-xl text-stone-900">
              5. Shipping Address Corrections
            </h2>
            <p>
              If you need to update your delivery address, landmark, or recipient phone number, please contact our support team on WhatsApp at <strong>+91 90323 72782</strong> within 6 hours of placing your order. Once an order is dispatched, address changes may incur courier re-routing delays.
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
            Have a Shipping Question? Contact Us →
          </Link>
        </div>
      </div>
    </div>
  );
}
