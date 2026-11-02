import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Sparkles, Home, MapPin, Truck, ShieldCheck, CheckCircle2 } from 'lucide-react';
import { getCategoryBySlug, getAllCategories, getAllProducts } from '@/lib/store';
import CategoryClientView from '@/components/category/CategoryClientView';
import { getBreadcrumbSchema } from '@/lib/seo/schema';

interface CategoryPageProps {
  params: {
    slug: string;
  };
}

export async function generateStaticParams() {
  const categories = getAllCategories();
  return categories.map((c) => ({
    slug: c.slug,
  }));
}

// Targeted SEO title and description overrides for high-priority local keywords
const LOCAL_SEO_CATEGORY_OVERRIDES: Record<string, { title: string; description: string; h1?: string }> = {
  'custom-portrait-frames': {
    title: 'Acrylic Photo Frames in Hyderabad | Custom Acrylic Frames Dilsukhnagar',
    description: 'Looking for acrylic photo frames in Hyderabad or Dilsukhnagar? Premium 4mm cast acrylic with diamond CNC beveled edges, invisible floating mounts & crystal clarity. WhatsApp proof approval.',
    h1: 'Acrylic Photo Frames in Hyderabad & Dilsukhnagar',
  },
  'premium-acrylic-wall-art': {
    title: "Acrylic Photo Frames in Hyderabad | 4mm Crystal Acrylic Art — Abhi's Gifts",
    description: 'Explore high-definition acrylic photo frames in Hyderabad. Diamond-edge polished cast acrylic wall art, family portraits & devotional keepsakes handcrafted in Dilsukhnagar.',
    h1: 'Premium Acrylic Photo Frames in Hyderabad',
  },
  'custom-led-photo-frames': {
    title: "LED Photo Frames in Hyderabad | 3000K Backlit Custom Frames — Abhi's Gifts",
    description: 'Discover custom LED photo frames in Hyderabad and Dilsukhnagar. Ambient 3000K warm night-glow illumination for wedding photos, family portraits & anniversary gifts with 12V adapter.',
    h1: 'Custom LED Photo Frames in Hyderabad',
  },
  'personalized-family-photo-frames': {
    title: 'Customized Photo Frames Hyderabad | Personalized Family Keepsakes Dilsukhnagar',
    description: 'Order customized photo frames in Hyderabad. Personalize family portraits with 24K gold foil script, custom dimensions & floating standoffs. Same-day digital proof on WhatsApp.',
    h1: 'Customized Photo Frames in Hyderabad & Dilsukhnagar',
  },
  'sets-of-two-three-frames': {
    title: 'Glitter Photo Frames Hyderabad | Triptych & Multi-Frame Gallery Sets',
    description: 'Browse glitter photo frames and multi-frame acrylic gallery wall sets in Hyderabad. Handcrafted symmetrical diptych and triptych layouts for modern living rooms in Dilsukhnagar.',
    h1: 'Glitter & Multi-Frame Acrylic Photo Sets in Hyderabad',
  },
  'couple-wedding-photos': {
    title: 'Personalized Gifts in Hyderabad | Wedding Vows & Couple Acrylic Frames',
    description: 'Best personalized gifts in Hyderabad & Dilsukhnagar. Customized wedding vow acrylic frames, romantic anniversary keepsakes & couple photo art with luxury gift packaging.',
    h1: 'Personalized Gifts & Wedding Keepsakes in Hyderabad',
  },
  'led-backlit-wall-art': {
    title: "LED Acrylic Frames Hyderabad | 3000K Illuminated Wall Art — Abhi's Gifts",
    description: 'Shop luxury LED acrylic frames in Hyderabad. Sacred Tirupati Balaji, Ganesha, Shiva, Radha Krishna & modern illuminated art with 50,000h Epistar warm LEDs. Free delivery across Hyderabad.',
    h1: 'LED Acrylic Frames & Backlit Art in Hyderabad',
  },
  'square-photo-frames': {
    title: 'Square Acrylic Photo Frames in Hyderabad | 1:1 Grid Frames Dilsukhnagar',
    description: 'Modern 1:1 square grid acrylic photo frames in Hyderabad. Minimalist diamond-polished edges perfect for Instagram prints, couple milestones & gallery grids.',
    h1: 'Square Acrylic Photo Frames in Hyderabad',
  },
  'glitter-photo-frames': {
    title: "Glitter Photo Frames in Hyderabad | Luminous Shimmer Frames — Abhi's Gifts",
    description: 'Explore luxury glitter photo frames in Hyderabad and Dilsukhnagar. Luminous sparkle and metallic glitter effects adding celebration radiance to special portraits.',
    h1: 'Glitter Photo Frames in Hyderabad & Dilsukhnagar',
  },
  'rotating-photo-lamps': {
    title: "Rotating Photo Lamps in Hyderabad | Motorized 360° LED Lamps — Abhi's Gifts",
    description: 'Buy motorized 360-degree rotating photo lamps in Hyderabad. Cylindrical multi-photo lamps glowing warmly with multiple cherished photographs and ambient LED.',
    h1: 'Rotating Photo Lamps in Hyderabad & Dilsukhnagar',
  },
  'round-photo-frames': {
    title: 'Round Acrylic Photo Frames in Hyderabad | Circular Medallion Wall Frames',
    description: 'Luxury circular round acrylic photo frames in Hyderabad & Dilsukhnagar. Smooth 360-degree curved CNC diamond beveled edges with halo visual effect.',
    h1: 'Round & Circular Acrylic Photo Frames in Hyderabad',
  },
};

export async function generateMetadata({ params }: CategoryPageProps): Promise<Metadata> {
  const category = getCategoryBySlug(params.slug);
  if (!category) {
    return { title: 'Category Not Found' };
  }

  const override = LOCAL_SEO_CATEGORY_OVERRIDES[params.slug];
  const title = override ? override.title : `${category.name} Wall Art — Acrylic & LED Backlit — Abhi Gifts`;
  const description = override ? override.description : category.description;
  const canonicalUrl = `https://abhigifts.com/category/${params.slug}`;

  return {
    title,
    description,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title,
      description,
      url: canonicalUrl,
      images: [{ url: category.image }],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
    },
  };
}

export default function CategoryPage({ params }: CategoryPageProps) {
  const category = getCategoryBySlug(params.slug);

  if (!category) {
    notFound();
  }

  const allProducts = getAllProducts();
  const slug = category.slug;
  const seoOverride = LOCAL_SEO_CATEGORY_OVERRIDES[slug];

  // Multi-category matching + smart category matching
  const categoryProducts = allProducts.filter((p) => {
    // 1. Direct or multi-category assignment
    if (p.categorySlug === slug || p.categorySlugs?.includes(slug)) {
      return true;
    }

    // 2. Smart category matching for grouped categories
    if (slug === 'led-god-frames' || slug === 'devotional-led-frames') {
      return p.hasLedBacklight && (Boolean(p.deity) || p.categorySlug.includes('lord') || p.categorySlug.includes('goddess') || p.categorySlug.includes('radha') || p.categorySlug.includes('temple'));
    }
    if (slug === 'led-backlit-wall-art') {
      return p.hasLedBacklight;
    }
    if (slug === 'vertical-led-frames') {
      return p.hasLedBacklight && p.orientation === 'vertical';
    }
    if (slug === 'horizontal-led-frames') {
      return p.hasLedBacklight && p.orientation === 'horizontal';
    }
    if (slug === 'square-backlight-frames') {
      return p.hasLedBacklight && (p.shape === 'square' || p.orientation === 'square');
    }
    if (slug === 'modern-illuminated-art') {
      return p.hasLedBacklight && (p.categorySlug === 'modern-illuminated-art' || p.tags.some((t) => t.toLowerCase().includes('modern') || t.toLowerCase().includes('horizon')));
    }
    if (slug === 'premium-temple-designs') {
      return p.categorySlug === 'premium-temple-designs' || p.tags.some((t) => t.toLowerCase().includes('temple') || t.toLowerCase().includes('mandir'));
    }
    if (slug === 'gold-abstract-designs') {
      return p.tags.some((t) => t.toLowerCase().includes('gold')) || p.categorySlug === 'abstract-wall-decor';
    }
    if (slug === 'horses-and-wildlife') {
      return p.categorySlug === 'horses-and-wildlife' || p.tags.some((t) => t.toLowerCase().includes('horse') || t.toLowerCase().includes('wildlife'));
    }
    if (slug === 'trees-and-leaves') {
      return p.categorySlug === 'trees-and-leaves' || p.tags.some((t) => t.toLowerCase().includes('tree') || t.toLowerCase().includes('leaves') || t.toLowerCase().includes('ginkgo'));
    }
    if (slug === 'koi-fish-designs') {
      return p.categorySlug === 'koi-fish-designs' || p.tags.some((t) => t.toLowerCase().includes('koi') || t.toLowerCase().includes('fish'));
    }
    if (slug === 'contemporary-luxury-art') {
      return p.categorySlug === 'contemporary-luxury-art' || p.tags.some((t) => t.toLowerCase().includes('luxury') || t.toLowerCase().includes('emerald'));
    }
    if (slug === 'couple-wedding-photos') {
      return p.categorySlug === 'couple-wedding-photos' || p.tags.some((t) => t.toLowerCase().includes('wedding') || t.toLowerCase().includes('couple'));
    }
    if (slug === 'deer-and-bird-artwork') {
      return p.tags.some((t) => t.toLowerCase().includes('deer') || t.toLowerCase().includes('peacock') || t.toLowerCase().includes('bird'));
    }
    if (slug === 'mountain-landscape-art') {
      return p.tags.some((t) => t.toLowerCase().includes('mountain') || t.toLowerCase().includes('landscape')) || p.categorySlug === 'landscape-wall-art';
    }
    if (slug === 'round-photo-frames') {
      return p.shape === 'round' || p.orientation === 'round' || p.tags.some((t) => t.toLowerCase().includes('round'));
    }
    if (slug === 'sets-of-two-three-frames') {
      return p.shape === 'set-of-2' || p.shape === 'set-of-3' || p.tags.some((t) => t.toLowerCase().includes('set of'));
    }
    if (slug === 'custom-portrait-frames') {
      return p.categorySlug.includes('custom') && (p.shape === 'portrait' || p.orientation === 'vertical');
    }
    if (slug === 'landscape-photo-frames') {
      return p.categorySlug.includes('custom') && (p.shape === 'landscape' || p.orientation === 'horizontal');
    }
    if (slug === 'square-photo-frames') {
      return p.shape === 'square' || p.orientation === 'square';
    }
    if (slug === 'personalized-family-photo-frames') {
      return p.categorySlug.includes('custom') || p.tags.some((t) => t.toLowerCase().includes('family') || t.toLowerCase().includes('photo'));
    }

    return false;
  });

  const breadcrumbs = [
    { name: 'Home', url: '/' },
    { name: 'Collections', url: '/collections' },
    { name: category.name, url: `/category/${category.slug}` },
  ];
  const breadcrumbSchema = getBreadcrumbSchema(breadcrumbs);

  return (
    <div className="w-full max-w-[1760px] mx-auto px-4 sm:px-8 lg:px-12 xl:px-16 py-8 sm:py-12 space-y-8">
      {/* Breadcrumb Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      {/* Breadcrumb Navigation for SEO */}
      <nav className="flex items-center gap-2 text-xs text-stone-500" aria-label="Breadcrumb">
        <Link href="/" className="hover:text-amber-800 flex items-center gap-1">
          <Home className="w-3.5 h-3.5" />
          <span>Home</span>
        </Link>
        <span>/</span>
        <Link href="/collections" className="hover:text-amber-800">
          Collections
        </Link>
        <span>/</span>
        <span className="text-stone-900 font-semibold">{category.name}</span>
      </nav>

      {/* Category Hero Banner */}
      <div className="relative rounded-3xl overflow-hidden bg-stone-950 text-white min-h-[220px] sm:min-h-[280px] flex items-center p-6 sm:p-12 border border-stone-800 shadow-warm">
        <img
          src={category.image}
          alt={`${category.name} in Hyderabad - Abhi's Gifts`}
          className="absolute inset-0 w-full h-full object-cover opacity-35"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-stone-950 via-stone-950/80 to-transparent" />

        <div className="relative z-10 max-w-2xl space-y-3">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs uppercase tracking-widest font-bold text-amber-400 bg-amber-950/80 border border-amber-500/40 px-3 py-1 rounded-full inline-flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5" />
              {category.lightingType === 'backlight' || category.group === 'led-backlight'
                ? '✨ 3000K Warm LED Backlit Series (12V Adapter)'
                : '🖼️ Normal Pure Crystal Acrylic Series (Non-Lit 24K Gold)'}
            </span>
            <span className="text-[11px] font-semibold text-emerald-400 bg-emerald-950/60 border border-emerald-500/30 px-2.5 py-0.5 rounded-full inline-flex items-center gap-1">
              <MapPin className="w-3 h-3" />
              <span>Hyderabad &amp; Dilsukhnagar Local Workshop</span>
            </span>
          </div>

          <h1 className="font-serif font-bold text-2xl sm:text-4xl lg:text-5xl text-white">
            {seoOverride?.h1 || category.name}
          </h1>
          <p className="text-xs sm:text-sm text-stone-300 leading-relaxed font-normal">
            {seoOverride?.description || category.description}
          </p>
        </div>
      </div>

      {/* Local Store Service Notice */}
      <div className="bg-[#FFF8EF] border border-[#E8D1A5] rounded-2xl p-4 sm:p-5 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 text-xs text-[#511B2A]">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-[#641E2E] text-[#E8C77E] flex items-center justify-center shrink-0">
            <Truck className="w-5 h-5" />
          </div>
          <div>
            <p className="font-bold text-sm text-[#511B2A]">Local Hyderabad &amp; Dilsukhnagar Fast Delivery</p>
            <p className="text-[#785E59]">Order online or visit our Dilsukhnagar studio. 100% damage-free transit guarantee across Telangana.</p>
          </div>
        </div>
        <div className="flex items-center gap-2 shrink-0">
          <Link
            href="/customise"
            className="bg-[#641E2E] text-[#FFF7EC] px-4 py-2 rounded-full font-bold text-xs hover:bg-[#511B2A] transition-colors"
          >
            Upload Your Photo
          </Link>
          <a
            href="https://wa.me/917780269927?text=Hi%20Abhi%27s%20Gifts,%20I%20want%20to%20order%20a%20photo%20frame%20in%20Hyderabad"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-emerald-600 text-white px-4 py-2 rounded-full font-bold text-xs hover:bg-emerald-700 transition-colors"
          >
            WhatsApp Artisan
          </a>
        </div>
      </div>

      {/* Interactive Filter Bar & Product Grid */}
      <CategoryClientView category={category} products={categoryProducts} />

      {/* Customization Callout */}
      <div className="bg-[#FFF7ED] p-6 sm:p-8 rounded-3xl border border-amber-200 flex flex-col sm:flex-row items-center justify-between gap-6 mt-12">
        <div className="space-y-1 text-center sm:text-left">
          <h3 className="font-serif font-bold text-lg text-stone-900">
            Looking for a specific temple size, custom shape, or gold inscription?
          </h3>
          <p className="text-xs text-stone-600">
            Abhi&apos;s Gifts craft any photo frame or sacred artwork in custom sizes up to 6x4 feet at our Dilsukhnagar workshop.
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
