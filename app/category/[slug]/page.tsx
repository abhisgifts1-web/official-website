import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import { notFound, redirect } from 'next/navigation';
import { Sparkles, Home, MapPin, Truck, ShieldCheck, CheckCircle2, ChevronRight } from 'lucide-react';
import { getCategoryBySlug, getAllCategories, getAllProducts } from '@/lib/store';
import { CATEGORY_SLUG_ALIASES } from '@/lib/data/categories';
import { filterProductsByCategory } from '@/lib/categoryRules';
import CategoryClientView from '@/components/category/CategoryClientView';
import CategorySpecificationsSection from '@/components/category/CategorySpecificationsSection';
import { getBreadcrumbSchema } from '@/lib/seo/schema';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

interface CategoryPageProps {
  params: {
    slug: string;
  };
}

export async function generateStaticParams() {
  const categories = getAllCategories();
  const slugs = new Set<string>();
  categories.forEach((c) => slugs.add(c.slug));
  Object.keys(CATEGORY_SLUG_ALIASES).forEach((alias) => slugs.add(alias));
  return Array.from(slugs).map((slug) => ({
    slug,
  }));
}

// Targeted SEO title and description overrides for high-priority local keywords
const LOCAL_SEO_CATEGORY_OVERRIDES: Record<string, { title: string; description: string; h1?: string }> = {
  'acrylic-photo-frames': {
    title: "5MM Acrylic Photo Frames in Hyderabad | Direct UV Printing & Metal Studs — Abhi's Gifts",
    description: 'Order premium 5MM crystal clear acrylic photo frames in Hyderabad and Dilsukhnagar. High-definition direct UV printing on acrylic surface, precision square-cut edges, and metal installation studs included.',
    h1: '5MM Premium Acrylic Photo Frames in Hyderabad',
  },
  'led-acrylic-photo-frames': {
    title: "LED Acrylic Photo Frames Hyderabad | Warm Illuminated Wall Decor — Abhi's Gifts",
    description: 'Shop luxury LED acrylic photo frames and backlit wall art in Hyderabad. Handcrafted with warm golden ambient backlights and 12V adapter.',
    h1: 'LED Acrylic Photo Frames in Hyderabad',
  },
  'glitter-photo-frames': {
    title: "Glitter Photo Frames in Hyderabad | Liquid Gold Sparkle Keepsakes — Abhi's Gifts",
    description: 'Explore floating liquid gold and diamond shimmer glitter photo frames in Hyderabad. Shimmering depth for weddings, anniversaries, and portraits.',
    h1: 'Glitter Photo Frames in Hyderabad & Dilsukhnagar',
  },
  '360-rotating-photo-lamps': {
    title: "360° Rotating Photo Lamps in Hyderabad | Motorized LED Memory Lamps — Abhi's Gifts",
    description: 'Buy motorized 360-degree rotating cylinder LED photo lamps in Hyderabad. Continuous whisper-silent rotation showcasing multiple memories in warm light.',
    h1: '360° Rotating Photo Lamps in Hyderabad & Dilsukhnagar',
  },
  'god-photo-frames': {
    title: "God Photo Frames Hyderabad | Sacred Balaji, Shiva, Ganesha Acrylic Art — Abhi's Gifts",
    description: 'Divine 3D crystal acrylic and LED backlit God photo frames in Hyderabad. Tirupati Balaji, Lord Shiva, Ganesha, Hanuman, Rama & Lakshmi frames.',
    h1: 'God Photo Frames in Hyderabad & Dilsukhnagar',
  },
  'family-baby-frames': {
    title: "Family & Baby Frames Hyderabad | Personalized Heirloom Displays — Abhi's Gifts",
    description: 'Heartfelt personalized family heirloom frames and baby milestone photo displays in Hyderabad. Custom name inscriptions and gallery wall collages.',
    h1: 'Family & Baby Photo Frames in Hyderabad',
  },
  'couple-wedding-frames': {
    title: "Couple & Wedding Frames Hyderabad | Wedding Vows & Keepsakes — Abhi's Gifts",
    description: 'Custom couple and wedding vow acrylic frames in Hyderabad. Romantic anniversary milestones and wedding memories preserved in crystal acrylic.',
    h1: 'Couple & Wedding Frames in Hyderabad',
  },
  'personalized-gifts': {
    title: "Personalized Gifts in Hyderabad | Custom Acrylic Frames & Keepsakes — Abhi's Gifts",
    description: 'Best personalized photo gifts in Hyderabad and Dilsukhnagar. Custom photo prints, dedicated inscriptions & fast WhatsApp digital proofing.',
    h1: 'Personalized Gifts in Hyderabad & Dilsukhnagar',
  },
  
  'premium-acrylic-wall-art': {
    title: "5MM Acrylic Wall Art in Hyderabad | Direct UV Printing — Abhi's Gifts",
    description: 'Explore high-definition 5MM crystal clear acrylic wall art in Hyderabad. Advanced direct UV printing, precision square-cut edges & metal installation studs included, handcrafted in Dilsukhnagar.',
    h1: 'Premium 5MM Acrylic Wall Art in Hyderabad',
  },
  'custom-led-photo-frames': {
    title: "LED Photo Frames in Hyderabad | Cool White LED Halo Frames — Abhi's Gifts",
    description: 'Discover premium LED photo frames in Hyderabad and Dilsukhnagar. Imported clear virgin cast acrylic, direct UV printing, Rose Gold aluminium side frame, and elegant Cool White halo glow with external power adapter included.',
    h1: 'Custom LED Photo Frames in Hyderabad',
  },
  'personalized-family-photo-frames': {
    title: 'Customized Photo Frames Hyderabad | Personalized Family Keepsakes Dilsukhnagar',
    description: 'Order customized photo frames in Hyderabad. Personalize family portraits with gold foil script, custom dimensions & floating standoffs. Same-day digital proof on WhatsApp.',
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
    title: "LED Acrylic Frames Hyderabad | Cool White Halo Illuminated Wall Art — Abhi's Gifts",
    description: 'Shop luxury LED acrylic frames in Hyderabad. Imported Clear Virgin Cast Acrylic, Direct UV Printing, Rose Gold Aluminium Side Frame, and Cool White LED Halo Glow. External power adapter included.',
    h1: 'LED Acrylic Frames & Backlit Art in Hyderabad',
  },
  

  
};

export async function generateMetadata({ params }: CategoryPageProps): Promise<Metadata> {
  if (params.slug === 'devotional-wall-art' || params.slug === 'normal-acrylic-art' || params.slug === 'acrylic-wall-decor') {
    redirect('/shop?lighting=none');
  }
  if (params.slug === 'custom-frames') {
    redirect('/customise');
  }
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
  if (params.slug === 'devotional-wall-art' || params.slug === 'normal-acrylic-art' || params.slug === 'acrylic-wall-decor') {
    redirect('/shop?lighting=none');
  }
  if (params.slug === 'custom-frames') {
    redirect('/customise');
  }
  const category = getCategoryBySlug(params.slug);

  if (!category) {
    notFound();
  }

  const allProducts = getAllProducts();
  const slug = category.slug;
  const seoOverride = LOCAL_SEO_CATEGORY_OVERRIDES[slug];

  // Accurate product category matching powered by master categoryRules
  const categoryProducts = filterProductsByCategory(allProducts, slug);

  const breadcrumbs = [
    { name: 'Home', url: '/' },
    { name: 'Collections', url: '/collections' },
    { name: category.name, url: `/category/${category.slug}` },
  ];
  const breadcrumbSchema = getBreadcrumbSchema(breadcrumbs);

  return (
    <div className="w-full max-w-[1760px] mx-auto px-4 sm:px-8 lg:px-12 xl:px-16 py-8 sm:py-12 space-y-8 bg-white text-stone-900">
      {/* Breadcrumb Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      {/* Breadcrumb Navigation for SEO & UX */}
      <nav aria-label="Breadcrumb" className="inline-flex items-center flex-wrap gap-1.5 text-xs bg-gradient-to-r from-stone-50 via-white to-amber-50/40 p-1.5 sm:p-2 rounded-2xl border border-stone-200 shadow-2xs">
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-xl text-stone-600 hover:text-stone-950 bg-white hover:bg-stone-50 border border-stone-200/80 hover:border-amber-400 shadow-2xs transition-all font-semibold group cursor-pointer"
        >
          <Home className="w-3.5 h-3.5 text-amber-600 group-hover:scale-110 transition-transform" />
          <span>Home</span>
        </Link>
        <ChevronRight className="w-3.5 h-3.5 text-amber-500/80" />
        <Link
          href="/shop"
          className="px-2.5 py-1 rounded-xl text-stone-600 hover:text-stone-950 bg-white hover:bg-stone-50 border border-stone-200/80 hover:border-amber-400 shadow-2xs transition-all font-semibold cursor-pointer"
        >
          Collections
        </Link>
        <ChevronRight className="w-3.5 h-3.5 text-amber-500/80" />
        <span
          className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl bg-gradient-to-r from-amber-500/15 via-amber-400/20 to-amber-500/15 border border-amber-400/50 text-amber-950 font-bold shadow-2xs"
          aria-current="page"
        >
          <Sparkles className="w-3 h-3 text-amber-600 shrink-0 animate-pulse" />
          <span>{category.name}</span>
        </span>
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
              {category.lightingType === 'backlight' || category.group === 'led-backlight' || category.slug.includes('led')
                ? '✨ LED Backlit Series (Cool White Halo Glow)'
                : '🖼️ 5MM Crystal Clear Acrylic Series (Non-LED)'}
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

          {/* Key Feature Highlights for LED Category */}
          {(category.lightingType === 'backlight' || category.group === 'led-backlight' || category.slug.includes('led')) && (
            <div className="pt-2 flex flex-wrap gap-2 text-[11px]">
              <span className="px-2.5 py-1 rounded-lg bg-stone-900/90 border border-stone-700 text-stone-200">✓ Imported Virgin Cast Acrylic</span>
              <span className="px-2.5 py-1 rounded-lg bg-stone-900/90 border border-stone-700 text-stone-200">✓ Direct UV Printing</span>
              <span className="px-2.5 py-1 rounded-lg bg-stone-900/90 border border-stone-700 text-stone-200">✓ Rose Gold Aluminium Side Frame</span>
              <span className="px-2.5 py-1 rounded-lg bg-stone-900/90 border border-stone-700 text-stone-200">✓ Cool White LED Halo Glow</span>
              <span className="px-2.5 py-1 rounded-lg bg-stone-900/90 border border-stone-700 text-stone-200">✓ External Power Adapter Included</span>
              <span className="px-2.5 py-1 rounded-lg bg-stone-900/90 border border-stone-700 text-stone-200">✓ Wall Plugs &amp; Screws Included</span>
            </div>
          )}

          {/* Key Feature Highlights for Acrylic Category */}
          {category.slug === 'acrylic-photo-frames' && (
            <div className="pt-2 flex flex-wrap gap-2 text-[11px]">
              <span className="px-2.5 py-1 rounded-lg bg-stone-900/90 border border-stone-700 text-stone-200">✓ 5MM Premium Crystal Acrylic</span>
              <span className="px-2.5 py-1 rounded-lg bg-stone-900/90 border border-stone-700 text-stone-200">✓ Advanced Direct UV Printing</span>
              <span className="px-2.5 py-1 rounded-lg bg-stone-900/90 border border-stone-700 text-stone-200">✓ Precision Square Cut Edges</span>
              <span className="px-2.5 py-1 rounded-lg bg-stone-900/90 border border-stone-700 text-stone-200">✓ Metal Wall Mounting Studs Included</span>
              <span className="px-2.5 py-1 rounded-lg bg-stone-900/90 border border-stone-700 text-stone-200">✓ Non-LED Product</span>
            </div>
          )}
        </div>
      </div>

      {/* Local Store Service Notice */}
      <div className="bg-stone-50 border border-stone-200 rounded-2xl p-4 sm:p-5 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 text-xs text-stone-900 shadow-xs">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-900 border border-amber-200 flex items-center justify-center shrink-0">
            <Truck className="w-5 h-5" />
          </div>
          <div>
            <p className="font-bold text-sm text-stone-900">Local Hyderabad &amp; Dilsukhnagar Fast Delivery</p>
            <p className="text-stone-600">Order online or visit our Dilsukhnagar store. 100% safe packaging standard across Telangana.</p>
          </div>
        </div>
        <div className="flex items-center gap-2 shrink-0">
          <Link
            href="/customise"
            className="bg-[#FEE815] text-stone-950 px-4 py-2 rounded-full font-bold text-xs hover:bg-[#E0CC04] transition-colors shadow-xs"
          >
            Upload Your Photo
          </Link>
          <a
            href="https://wa.me/919032372782?text=Hi%20Abhi%27s%20Gifts,%20I%20want%20to%20order%20a%20photo%20frame%20in%20Hyderabad"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-[#25D366] text-white px-4 py-2 rounded-full font-bold text-xs hover:bg-[#20BD5A] transition-colors shadow-xs"
          >
            WhatsApp Artisan
          </a>
        </div>
      </div>

      {/* Interactive Filter Bar & Product Grid */}
      <CategoryClientView category={category} products={categoryProducts} />

      {/* Confirmed Category Technical Specifications & 5-Tab Showcase */}
      <div className="mt-14">
        <CategorySpecificationsSection categorySlug={category.slug} categoryName={category.name} />
      </div>

      {/* Customization Callout */}
      <div className="bg-gradient-to-r from-amber-50/70 via-stone-50 to-amber-50/70 p-6 sm:p-8 rounded-3xl border border-amber-200 flex flex-col sm:flex-row items-center justify-between gap-6 mt-12 shadow-xs">
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
          className="bg-stone-900 hover:bg-stone-800 text-white font-semibold text-xs sm:text-sm px-6 py-3 rounded-full shadow-sm transition-colors whitespace-nowrap"
        >
          Personalise Custom Frame →
        </Link>
      </div>
    </div>
  );
}
