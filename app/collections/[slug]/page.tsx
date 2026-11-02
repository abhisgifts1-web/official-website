import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Sparkles, ArrowLeft, Home } from 'lucide-react';
import { getAllProducts } from '@/lib/store';
import ProductGrid from '@/components/product/ProductGrid';

interface Props {
  params: {
    slug: string;
  };
}

export async function generateStaticParams() {
  return [
    { slug: 'devotional-wall-art' },
    { slug: 'led-backlit-series' },
    { slug: 'acrylic-wall-decor' },
    { slug: 'mandir-pooja-art' },
    { slug: 'modern-abstract' },
  ];
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const title = params.slug
    .split('-')
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(' ');

  return {
    title: `${title} Collection — Abhi Gifts`,
    description: `Explore our exclusive ${title} wall art series crafted in crystal acrylic and warm LED lighting.`,
  };
}

export default function CollectionSlugPage({ params }: Props) {
  const slug = params.slug;
  const allProducts = getAllProducts();

  let filtered = allProducts;
  let title = 'Featured Wall Art Series';
  let description = 'Handcrafted with reverence, 24K gold highlights, and museum-grade acrylic.';

  if (slug === 'devotional-wall-art') {
    title = 'Sacred Devotional Wall Art';
    description = 'Divine manifestations of Lord Balaji, Mahadev Shiva, Ganesha, Hanuman, Rama & Goddess Lakshmi.';
    filtered = allProducts.filter((p) => p.deity || p.categorySlug.includes('lord') || p.categorySlug.includes('goddess') || p.categorySlug.includes('radha'));
  } else if (slug === 'led-backlit-series') {
    title = 'Illuminated LED Backlit Series';
    description = '3D acrylic artworks enhanced with warm 3000K golden halo backlights and discreet power adapters.';
    filtered = allProducts.filter((p) => p.hasLedBacklight);
  } else {
    filtered = allProducts.filter((p) => p.tags.some((t) => t.toLowerCase().includes(slug.replace(/-/g, ' '))));
  }

  return (
    <div className="w-full max-w-[1760px] mx-auto px-4 sm:px-8 lg:px-12 xl:px-16 py-8 sm:py-12 space-y-8">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-xs text-stone-500">
        <Link href="/" className="hover:text-amber-800 flex items-center gap-1">
          <Home className="w-3.5 h-3.5" />
          <span>Home</span>
        </Link>
        <span>/</span>
        <Link href="/collections" className="hover:text-amber-800">
          Collections
        </Link>
        <span>/</span>
        <span className="text-stone-900 font-semibold">{title}</span>
      </nav>

      {/* Header */}
      <div className="bg-[#FFF7ED] p-6 sm:p-10 rounded-3xl border border-stone-200">
        <span className="text-xs uppercase tracking-widest font-bold text-amber-900 bg-amber-100 px-3 py-1 rounded-full inline-flex items-center gap-1.5 mb-3">
          <Sparkles className="w-3.5 h-3.5 text-amber-700" /> Curated Series
        </span>
        <h1 className="font-serif font-bold text-2xl sm:text-4xl text-stone-900">
          {title}
        </h1>
        <p className="text-xs sm:text-sm text-stone-600 mt-2 max-w-2xl leading-relaxed">
          {description}
        </p>
      </div>

      {/* Products count & Grid */}
      <div className="flex items-center justify-between border-b border-stone-200 pb-3">
        <span className="text-xs text-stone-600 font-medium">
          Showing <strong>{filtered.length}</strong> creations
        </span>
        <Link href="/shop" className="text-xs font-semibold text-amber-800 hover:underline">
          View All Artworks →
        </Link>
      </div>

      <ProductGrid products={filtered} />

      {/* Customization callout */}
      <div className="bg-[#FFF7ED] p-6 sm:p-8 rounded-3xl border border-amber-200 flex flex-col sm:flex-row items-center justify-between gap-6 mt-12">
        <div className="space-y-1 text-center sm:text-left">
          <h3 className="font-serif font-bold text-lg text-stone-900">
            Looking for a specific temple size or custom LED backlight?
          </h3>
          <p className="text-xs text-stone-600">
            Our master artisans in Tirupati can craft any sacred artwork in grand wall dimensions up to 6x4 feet.
          </p>
        </div>
        <Link
          href="/customise"
          className="bg-stone-900 hover:bg-amber-800 text-white font-semibold text-xs sm:text-sm px-6 py-3 rounded-full shadow-warm transition-colors whitespace-nowrap"
        >
          Personalise Custom Frame →
        </Link>
      </div>
    </div>
  );
}
