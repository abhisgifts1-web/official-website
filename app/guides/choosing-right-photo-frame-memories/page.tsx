import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import { Home, ArrowLeft, ArrowRight, Layers, ShieldCheck } from 'lucide-react';
import { getBreadcrumbSchema } from '@/lib/seo/schema';

export const metadata: Metadata = {
  title: 'Choosing the Right Photo Frame for Your Memories: Acrylic vs Glass vs Wood',
  description:
    'Comprehensive comparison between acrylic photo frames, traditional float glass, and wooden frames. Learn why crystal acrylic is lighter, shatterproof, and optically superior.',
  alternates: {
    canonical: 'https://abhigifts.com/guides/choosing-right-photo-frame-memories',
  },
  openGraph: {
    title: 'Choosing the Right Photo Frame: Acrylic vs Glass vs Wood',
    description: 'Detailed comparison of acrylic, glass, and wood photo frames for home decor, durability, and optical depth.',
    url: 'https://abhigifts.com/guides/choosing-right-photo-frame-memories',
  },
};

export default function ChoosingRightPhotoFrameMemoriesGuide() {
  const breadcrumbs = [
    { name: 'Home', url: '/' },
    { name: 'Guides', url: '/guides' },
    { name: 'Choosing the Right Photo Frame for Your Memories', url: '/guides/choosing-right-photo-frame-memories' },
  ];
  const breadcrumbSchema = getBreadcrumbSchema(breadcrumbs);

  return (
    <article className="w-full max-w-4xl mx-auto px-4 sm:px-6 py-8 sm:py-12 space-y-8 select-none">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      <nav className="flex items-center gap-2 text-xs text-stone-500" aria-label="Breadcrumb">
        <Link href="/" className="hover:text-stone-900 flex items-center gap-1">
          <Home className="w-3.5 h-3.5" />
          <span>Home</span>
        </Link>
        <span>/</span>
        <Link href="/guides" className="hover:text-stone-900">
          Guides
        </Link>
        <span>/</span>
        <span className="text-stone-900 font-semibold truncate">Choosing the Right Photo Frame for Your Memories</span>
      </nav>

      <header className="space-y-4 pb-6 border-b border-stone-200">
        <div className="flex items-center gap-2 text-xs font-bold text-amber-800 uppercase tracking-wider">
          <span>Material Comparison</span>
          <span>•</span>
          <span>6 Min Read</span>
          <span>•</span>
          <span>By Abhi&apos;s Gifts</span>
        </div>

        <h1 className="font-serif font-bold text-3xl sm:text-4xl lg:text-5xl text-stone-900 leading-tight">
          Choosing the Right Photo Frame for Your Memories: Acrylic vs Glass vs Wood
        </h1>

        <p className="text-sm sm:text-base text-stone-600 leading-relaxed">
          Wondering whether to choose frameless cast acrylic, traditional glass, or ornate wooden moldings? Here is an objective engineering and aesthetic breakdown.
        </p>
      </header>

      <div className="space-y-8 text-xs sm:text-sm text-stone-700 leading-relaxed">
        <section className="space-y-4">
          <h2 className="font-serif font-bold text-xl sm:text-2xl text-stone-900">
            1. Comparison Matrix: Acrylic vs Glass vs Wood
          </h2>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse bg-white rounded-xl overflow-hidden border border-stone-200 shadow-xs">
              <thead>
                <tr className="bg-stone-100 text-stone-900 border-b border-stone-200">
                  <th className="py-2.5 px-3 font-bold">Criteria</th>
                  <th className="py-2.5 px-3 font-bold">Cast Acrylic</th>
                  <th className="py-2.5 px-3 font-bold">Traditional Glass</th>
                  <th className="py-2.5 px-3 font-bold">Wooden Moldings</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-100">
                <tr>
                  <td className="py-2.5 px-3 font-semibold text-stone-900">Optical Clarity</td>
                  <td className="py-2.5 px-3 font-bold text-emerald-700">99.2% (Pure crystal)</td>
                  <td className="py-2.5 px-3 text-stone-500">89-91% (Green edge tint)</td>
                  <td className="py-2.5 px-3 text-stone-500">N/A (Border only)</td>
                </tr>
                <tr>
                  <td className="py-2.5 px-3 font-semibold text-stone-900">Shatter Resistance</td>
                  <td className="py-2.5 px-3 font-bold text-emerald-700">100% Shatterproof</td>
                  <td className="py-2.5 px-3 text-red-600 font-semibold">Fragile hazard</td>
                  <td className="py-2.5 px-3 text-stone-500">Durable</td>
                </tr>
                <tr>
                  <td className="py-2.5 px-3 font-semibold text-stone-900">Weight</td>
                  <td className="py-2.5 px-3 font-bold text-emerald-700">50% lighter than glass</td>
                  <td className="py-2.5 px-3 text-stone-500">Heavy &amp; cumbersome</td>
                  <td className="py-2.5 px-3 text-stone-500">Medium to Heavy</td>
                </tr>
                <tr>
                  <td className="py-2.5 px-3 font-semibold text-stone-900">Moisture / Termites</td>
                  <td className="py-2.5 px-3 font-bold text-emerald-700">100% Moisture Proof</td>
                  <td className="py-2.5 px-3 text-stone-500">Traps humidity fog</td>
                  <td className="py-2.5 px-3 text-red-600">Vulnerable to termites</td>
                </tr>
                <tr>
                  <td className="py-2.5 px-3 font-semibold text-stone-900">LED Integration</td>
                  <td className="py-2.5 px-3 font-bold text-emerald-700">Flawless edge-glow</td>
                  <td className="py-2.5 px-3 text-stone-500">Difficult / Bulky</td>
                  <td className="py-2.5 px-3 text-stone-500">Requires deep box</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        <section className="space-y-3">
          <h2 className="font-serif font-bold text-xl sm:text-2xl text-stone-900">
            2. When to Choose Acrylic Photo Frames
          </h2>
          <p>
            Choose <Link href="/acrylic-photo-frames-hyderabad" className="text-amber-800 font-semibold underline decoration-amber-400">acrylic photo frames in Hyderabad</Link> when:
          </p>
          <ul className="list-disc pl-5 space-y-1.5">
            <li>You have children, toddlers, or pets at home and want zero risk of broken glass shards.</li>
            <li>Your home has contemporary, minimalist, or luxury interior decor with floating furniture.</li>
            <li>You want photographs to have vibrant, high-gloss 3D depth.</li>
            <li>You desire nocturnal ambient backlighting with integrated warm LEDs.</li>
          </ul>
        </section>

        <section className="space-y-3">
          <h2 className="font-serif font-bold text-xl sm:text-2xl text-stone-900">
            3. Experience the Quality in Person in Dilsukhnagar
          </h2>
          <p>
            If you live in Hyderabad, visit the Abhi&apos;s Gifts workshop studio near Dilsukhnagar Metro Station to physically feel the weight of our cast acrylic, test the precision CNC edges, and inspect live illuminated LED displays.
          </p>
        </section>
      </div>

      <footer className="pt-8 border-t border-stone-200 flex items-center justify-between text-xs">
        <Link href="/guides/personalized-photo-gifts-occasions" className="text-stone-500 hover:text-stone-900 flex items-center gap-1">
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Previous: Personalized Photo Gifts for Special Occasions</span>
        </Link>
        <Link
          href="/guides"
          className="text-stone-900 font-bold hover:text-amber-800 flex items-center gap-1"
        >
          <span>Back to All Guides</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </footer>
    </article>
  );
}
