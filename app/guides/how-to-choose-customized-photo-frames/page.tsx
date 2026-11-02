import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import { Home, ArrowLeft, ArrowRight, CheckCircle2 } from 'lucide-react';
import { getBreadcrumbSchema } from '@/lib/seo/schema';

export const metadata: Metadata = {
  title: 'How to Choose Customized Photo Frames: Sizing, Thickness & Finish Guide',
  description:
    'Step-by-step expert guide to choosing customized photo frames. Learn about photo resolutions, aspect ratios, thickness (4mm vs 5mm), floating standoff mounts, and 24K gold foil personalization.',
  alternates: {
    canonical: 'https://abhigifts.com/guides/how-to-choose-customized-photo-frames',
  },
  openGraph: {
    title: 'How to Choose Customized Photo Frames: Complete Framing Guide',
    description: 'Expert advice on custom frame sizing, aspect ratios, acrylic finishes, and personalized gifting.',
    url: 'https://abhigifts.com/guides/how-to-choose-customized-photo-frames',
  },
};

export default function HowToChooseCustomizedPhotoFramesGuide() {
  const breadcrumbs = [
    { name: 'Home', url: '/' },
    { name: 'Guides', url: '/guides' },
    { name: 'How to Choose Customized Photo Frames', url: '/guides/how-to-choose-customized-photo-frames' },
  ];
  const breadcrumbSchema = getBreadcrumbSchema(breadcrumbs);

  return (
    <article className="w-full max-w-4xl mx-auto px-4 sm:px-6 py-8 sm:py-12 space-y-8 select-none">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      <nav className="flex items-center gap-2 text-xs text-stone-500" aria-label="Breadcrumb">
        <Link href="/" className="hover:text-[#641E2E] flex items-center gap-1">
          <Home className="w-3.5 h-3.5" />
          <span>Home</span>
        </Link>
        <span>/</span>
        <Link href="/guides" className="hover:text-[#641E2E]">
          Guides
        </Link>
        <span>/</span>
        <span className="text-[#511B2A] font-semibold truncate">How to Choose Customized Photo Frames</span>
      </nav>

      <header className="space-y-4 pb-6 border-b border-[#E8D1A5]">
        <div className="flex items-center gap-2 text-xs font-bold text-[#A06E28] uppercase tracking-wider">
          <span>Framing Masterclass</span>
          <span>•</span>
          <span>5 Min Read</span>
          <span>•</span>
          <span>By Abhi&apos;s Gifts</span>
        </div>

        <h1 className="font-serif font-bold text-3xl sm:text-4xl lg:text-5xl text-[#511B2A] leading-tight">
          How to Choose Customized Photo Frames: Sizing, Thickness &amp; Finish Guide
        </h1>

        <p className="text-sm sm:text-base text-[#785E59] leading-relaxed">
          Customized photo frames turn personal milestones into lasting art. Here is how to select the ideal dimensions, acrylic thickness, mounting hardware, and custom inscriptions for your home.
        </p>
      </header>

      <div className="space-y-8 text-xs sm:text-sm text-[#533C36] leading-relaxed">
        <section className="space-y-3">
          <h2 className="font-serif font-bold text-xl sm:text-2xl text-[#511B2A]">
            1. Photo Resolution &amp; DPI Requirements
          </h2>
          <p>
            When ordering <Link href="/acrylic-photo-frames-dilsukhnagar" className="text-[#641E2E] font-semibold underline">customized photo frames in Dilsukhnagar</Link>, ensure your image has sufficient resolution. For a standard 12x18 inch frame, aim for at least 2000x3000 pixels (roughly 6 Megapixels). Smartphone portraits taken with modern iPhones or Samsung Galaxy phones in good lighting are more than adequate.
          </p>
          <p>
            Our graphic team uses AI-assisted neural upscaling to sharpen family photos, remove motion blur, and adjust color balance before printing.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="font-serif font-bold text-xl sm:text-2xl text-[#511B2A]">
            2. Choosing the Right Shape: Portrait, Square, or Circular?
          </h2>
          <ul className="list-disc pl-5 space-y-2">
            <li>
              <strong>Vertical Portrait (2:3 aspect ratio):</strong> Best for formal bridal photos, solo portraits, and sacred temple deities like Tirupati Balaji or Lord Shiva.
            </li>
            <li>
              <strong>Horizontal Landscape (3:2 aspect ratio):</strong> Ideal for wide family reunion shots, vacation scenery, and wedding mandap captures.
            </li>
            <li>
              <strong>1:1 Square:</strong> Perfect for modern Instagram grids, newborn milestone memories, and contemporary gallery sets.
            </li>
            <li>
              <strong>Round / Circular Medallion:</strong> A romantic, fluid silhouette that creates a halo effect—popular for couple anniversaries.
            </li>
          </ul>
        </section>

        <section className="space-y-3">
          <h2 className="font-serif font-bold text-xl sm:text-2xl text-[#511B2A]">
            3. Frame Thickness: Why 4mm is the Gold Standard
          </h2>
          <p>
            Standard retail shops often cut corners with 2mm or 3mm acrylic. At 3mm, large frames sag over time and create subtle lens distortion. Abhi&apos;s Gifts standardizes on <strong>4mm and 5mm museum-grade cast acrylic</strong>, providing rigid structural flatness, substantial weight, and deep refractive light beveling.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="font-serif font-bold text-xl sm:text-2xl text-[#511B2A]">
            4. Personalization Details: Inscriptions &amp; Gold Foil
          </h2>
          <p>
            Elevate your custom frame with meaningful typography:
          </p>
          <ul className="list-disc pl-5 space-y-1.5">
            <li><strong>Wedding Vows:</strong> Couple names, wedding date, and customized vows.</li>
            <li><strong>Family Heirlooms:</strong> Family surname crest with 24K real gold foil script.</li>
            <li><strong>Pooja Art:</strong> Sacred Sanskrit mantras (e.g., Gayatri Mantra, Mahamrityunjaya, Hanuman Chalisa).</li>
          </ul>
        </section>
      </div>

      <footer className="pt-8 border-t border-[#E8D1A5] flex items-center justify-between text-xs">
        <Link href="/guides/best-acrylic-photo-frames-hyderabad" className="text-[#785E59] hover:text-[#511B2A] flex items-center gap-1">
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Previous: Best Acrylic Photo Frames in Hyderabad</span>
        </Link>
        <Link
          href="/guides/led-acrylic-photo-frames-home-decor"
          className="text-[#641E2E] font-bold hover:text-[#A06E28] flex items-center gap-1"
        >
          <span>Next: LED Acrylic Photo Frames for Home Decoration</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </footer>
    </article>
  );
}
