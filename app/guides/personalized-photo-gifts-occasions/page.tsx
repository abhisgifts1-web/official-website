import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import { Home, ArrowLeft, ArrowRight, Gift, Heart, Sparkles } from 'lucide-react';
import { getBreadcrumbSchema } from '@/lib/seo/schema';

export const metadata: Metadata = {
  title: "Personalized Photo Gifts for Special Occasions in Hyderabad | Abhi's Gifts",
  description:
    'Inspiring personalized gift ideas for weddings, anniversaries, housewarmings, and birthdays in Hyderabad & Dilsukhnagar. Custom acrylic frames, LED keepsakes & gold foil plaques.',
  alternates: {
    canonical: 'https://abhigifts.com/guides/personalized-photo-gifts-occasions',
  },
  openGraph: {
    title: 'Personalized Photo Gifts for Special Occasions in Hyderabad',
    description: 'Find meaningful customized gifts for weddings, anniversaries, and family milestones in Hyderabad.',
    url: 'https://abhigifts.com/guides/personalized-photo-gifts-occasions',
  },
};

export default function PersonalizedPhotoGiftsOccasionsGuide() {
  const breadcrumbs = [
    { name: 'Home', url: '/' },
    { name: 'Guides', url: '/guides' },
    { name: 'Personalized Photo Gifts for Special Occasions', url: '/guides/personalized-photo-gifts-occasions' },
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
        <span className="text-stone-900 font-semibold truncate">Personalized Photo Gifts for Special Occasions</span>
      </nav>

      <header className="space-y-4 pb-6 border-b border-stone-200">
        <div className="flex items-center gap-2 text-xs font-bold text-amber-800 uppercase tracking-wider">
          <span>Occasions &amp; Celebrations</span>
          <span>•</span>
          <span>5 Min Read</span>
          <span>•</span>
          <span>By Abhi&apos;s Gifts</span>
        </div>

        <h1 className="font-serif font-bold text-3xl sm:text-4xl lg:text-5xl text-stone-900 leading-tight">
          Personalized Photo Gifts for Special Occasions in Hyderabad
        </h1>

        <p className="text-sm sm:text-base text-stone-600 leading-relaxed">
          How to choose meaningful, bespoke acrylic and LED photo gifts for weddings, 25th wedding anniversaries, housewarmings, and birthdays in Dilsukhnagar and Hyderabad.
        </p>
      </header>

      <div className="space-y-8 text-xs sm:text-sm text-stone-700 leading-relaxed">
        <section className="space-y-3">
          <h2 className="font-serif font-bold text-xl sm:text-2xl text-stone-900">
            1. Wedding &amp; Marriage Gifts: Custom Wedding Vows Plaque
          </h2>
          <p>
            When attending a close friend or family wedding in Hyderabad, cash envelopes or cutlery sets are quickly forgotten. A customized acrylic plaque featuring the couple&apos;s pre-wedding photo with their wedding date, couple names, and heartfelt vows rendered in gold foil becomes an instant family heirloom.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="font-serif font-bold text-xl sm:text-2xl text-stone-900">
            2. 25th &amp; 50th Silver/Golden Anniversaries
          </h2>
          <p>
            For parents celebrating major milestones, a <Link href="/category/sets-of-two-three-frames" className="text-amber-800 font-semibold underline decoration-amber-400">symmetrical diptych or triptych gallery set</Link> displaying their original wedding photo alongside their modern family portrait creates deep emotional resonance.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="font-serif font-bold text-xl sm:text-2xl text-stone-900">
            3. Gruhapravesam / Housewarming: Consecrated Devotional Art
          </h2>
          <p>
            In Telugu culture, blessing a new house with sacred iconography brings divine protection (Raksha) and eternal prosperity. Gifting an illuminated 3D acrylic <Link href="/product/tirupati-balaji-divine-led-backlit-acrylic-wall-art" className="text-amber-800 font-semibold underline decoration-amber-400">Tirupati Balaji</Link> or <Link href="/product/lord-ganesha-vighnaharta-divine-led-backlit-acrylic-art" className="text-amber-800 font-semibold underline decoration-amber-400">Lord Ganesha Vighnaharta</Link> frame is considered exceptionally auspicious.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="font-serif font-bold text-xl sm:text-2xl text-stone-900">
            4. Quick Ordering &amp; Express Delivery in Hyderabad
          </h2>
          <p>
            Need a gift today? Abhi&apos;s Gifts offers express manufacturing and direct studio pickup near Dilsukhnagar Metro, or same-day local delivery across Hyderabad.
          </p>
          <div className="pt-2">
            <Link
              href="/customized-gifts-dilsukhnagar"
              className="bg-[#EAB308] text-[#000000] px-5 py-2.5 rounded-full font-bold text-xs hover:bg-[#FACC15] transition-colors inline-block shadow-xs"
            >
              Explore Customized Gifts in Dilsukhnagar →
            </Link>
          </div>
        </section>
      </div>

      <footer className="pt-8 border-t border-stone-200 flex items-center justify-between text-xs">
        <Link href="/guides/led-acrylic-photo-frames-home-decor" className="text-stone-500 hover:text-stone-900 flex items-center gap-1">
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Previous: LED Acrylic Photo Frames for Home Decor</span>
        </Link>
        <Link
          href="/guides/choosing-right-photo-frame-memories"
          className="text-stone-900 font-bold hover:text-amber-800 flex items-center gap-1"
        >
          <span>Next: Choosing the Right Photo Frame for Your Memories</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </footer>
    </article>
  );
}
