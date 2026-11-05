import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import { Sparkles, BookOpen, ArrowRight, Home, MapPin } from 'lucide-react';
import { getBreadcrumbSchema } from '@/lib/seo/schema';

export const metadata: Metadata = {
  title: "Photo Frame & Wall Art Guides | Abhi's Gifts Hyderabad",
  description:
    'Expert buying guides and advice on acrylic photo frames, LED backlit frames, personalized photo gifts, and framing tips for Hyderabad and Dilsukhnagar homes.',
  alternates: {
    canonical: 'https://abhigifts.com/guides',
  },
  openGraph: {
    title: "Photo Frame & Wall Art Guides | Abhi's Gifts Hyderabad",
    description: 'Expert advice on acrylic vs glass, sizing, LED lighting, and personalized gifting from Hyderabad artisans.',
    url: 'https://abhigifts.com/guides',
  },
};

const GUIDES = [
  {
    slug: 'best-acrylic-photo-frames-hyderabad',
    title: 'Best Acrylic Photo Frames in Hyderabad: Complete Buying & Quality Guide',
    excerpt:
      'Learn how to evaluate premium virgin cast acrylic, precision CNC edge beveling, UV flatbed printing quality, and find the best acrylic photo frame manufacturer in Hyderabad.',
    date: 'Updated November 2026',
    readTime: '6 min read',
    tag: 'Buying Guide',
  },
  {
    slug: 'how-to-choose-customized-photo-frames',
    title: 'How to Choose Customized Photo Frames: Sizing, Thickness & Finish Guide',
    excerpt:
      'A practical step-by-step guide to selecting the right aspect ratios, border styles, brushed standoff finishes, and photo resolutions for personalized keepsakes.',
    date: 'Updated November 2026',
    readTime: '5 min read',
    tag: 'Framing Tips',
  },
  {
    slug: 'led-acrylic-photo-frames-home-decor',
    title: 'LED Acrylic Photo Frames for Home Decoration: Warm Ambient Lighting Ideas',
    excerpt:
      'Discover how LED backlit acrylic photo frames enhance living rooms, bedrooms, and sacred pooja mandir sanctums with soft evening illumination.',
    date: 'Updated November 2026',
    readTime: '7 min read',
    tag: 'Interior Decor',
  },
  {
    slug: 'personalized-photo-gifts-occasions',
    title: 'Personalized Photo Gifts for Special Occasions in Hyderabad',
    excerpt:
      'From gold foil wedding vows to circular medallion baby milestones, discover meaningful customized gifts for anniversaries, birthdays, and housewarmings in Dilsukhnagar.',
    date: 'Updated November 2026',
    readTime: '5 min read',
    tag: 'Gifting Ideas',
  },
  {
    slug: 'choosing-right-photo-frame-memories',
    title: 'Choosing the Right Photo Frame for Your Memories: Acrylic vs Glass vs Wood',
    excerpt:
      'Detailed comparison of acrylic photo frames, fragile float glass, and traditional wooden frames for longevity, shatter resistance, and visual depth.',
    date: 'Updated November 2026',
    readTime: '6 min read',
    tag: 'Material Science',
  },
];

export default function GuidesIndexPage() {
  const breadcrumbs = [
    { name: 'Home', url: '/' },
    { name: 'Guides & Advice', url: '/guides' },
  ];
  const breadcrumbSchema = getBreadcrumbSchema(breadcrumbs);

  return (
    <div className="w-full max-w-[1760px] mx-auto px-4 sm:px-8 lg:px-12 xl:px-16 py-8 sm:py-12 space-y-10 select-none">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      {/* Breadcrumbs */}
      <nav className="flex items-center gap-2 text-xs text-stone-500" aria-label="Breadcrumb">
        <Link href="/" className="hover:text-stone-900 flex items-center gap-1">
          <Home className="w-3.5 h-3.5" />
          <span>Home</span>
        </Link>
        <span>/</span>
        <span className="text-stone-900 font-semibold">Guides &amp; Advice</span>
      </nav>

      {/* Hero Header */}
      <div className="bg-stone-50 rounded-3xl p-6 sm:p-12 border border-stone-200 shadow-sm space-y-4">
        <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-amber-800 bg-amber-50 border border-amber-300 px-3.5 py-1.5 rounded-full shadow-2xs">
          <BookOpen className="w-3.5 h-3.5 text-amber-700" />
          <span>EXPERT FRAMING &amp; LOCAL HYDERABAD ADVICE</span>
        </div>

        <h1 className="font-serif font-bold text-3xl sm:text-4xl lg:text-5xl text-stone-900 leading-tight">
          Photo Frame &amp; Wall Art Knowledge Base
        </h1>

        <p className="text-xs sm:text-sm text-stone-600 max-w-2xl leading-relaxed">
          Crafted by the master artisans at Abhi&apos;s Gifts. Explore in-depth guides on selecting acrylic photo frames, LED lighting, sizing recommendations, and thoughtful personalized gifts in Hyderabad.
        </p>
      </div>

      {/* Guides Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {GUIDES.map((guide) => (
          <article
            key={guide.slug}
            className="bg-white rounded-2xl p-6 border border-stone-200 shadow-xs hover:border-amber-400 hover:shadow-md transition-all duration-300 flex flex-col justify-between space-y-4"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between text-[11px] text-amber-800">
                <span className="font-bold uppercase tracking-wider bg-amber-50 border border-amber-200 px-2.5 py-0.5 rounded-full">
                  {guide.tag}
                </span>
                <span>{guide.readTime}</span>
              </div>

              <h2 className="font-serif font-bold text-lg sm:text-xl text-stone-900 leading-snug">
                <Link href={`/guides/${guide.slug}`} className="hover:text-amber-700 transition-colors">
                  {guide.title}
                </Link>
              </h2>

              <p className="text-xs text-stone-600 leading-relaxed line-clamp-3">
                {guide.excerpt}
              </p>
            </div>

            <div className="pt-4 border-t border-stone-100 flex items-center justify-between">
              <span className="text-[11px] text-stone-500">{guide.date}</span>
              <Link
                href={`/guides/${guide.slug}`}
                className="text-xs font-bold text-stone-900 hover:text-amber-700 inline-flex items-center gap-1 group"
              >
                <span>Read Full Guide</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </article>
        ))}
      </div>

      {/* Local Consultation Callout */}
      <div className="bg-gradient-to-r from-amber-50 via-white to-amber-50 text-stone-900 rounded-3xl p-6 sm:p-10 border-2 border-amber-300 shadow-sm flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="space-y-2 text-center md:text-left">
          <span className="text-xs font-bold uppercase tracking-widest text-amber-800 flex items-center justify-center md:justify-start gap-1.5 font-semibold">
            <MapPin className="w-3.5 h-3.5" />
            <span>DILSUKHNAGAR STUDIO &amp; WORKSHOP</span>
          </span>
          <h3 className="font-serif font-bold text-xl sm:text-2xl text-stone-900">
            Need personalized advice on photo sizing or frame thickness?
          </h3>
          <p className="text-xs sm:text-sm text-stone-600 max-w-xl">
            Our artisans are available daily on WhatsApp to review your photos, recommend dimensions, and share free 1:1 previews.
          </p>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <a
            href="https://wa.me/917780269927?text=Hi%20Abhi%27s%20Gifts,%20I%20have%20a%20question%20about%20photo%20framing%20sizes"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-[#25D366] text-white font-bold text-xs sm:text-sm px-6 py-3 rounded-full hover:bg-[#1EBE5D] transition-colors"
          >
            Chat with Artisan on WhatsApp
          </a>
        </div>
      </div>
    </div>
  );
}
