import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import { notFound, redirect } from 'next/navigation';
import { Sparkles, Home, MapPin, Truck, ShieldCheck, CheckCircle2 } from 'lucide-react';
import { getCategoryBySlug, getAllCategories, getAllProducts } from '@/lib/store';
import { CATEGORY_SLUG_ALIASES } from '@/lib/data/categories';
import CategoryClientView from '@/components/category/CategoryClientView';
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
    title: "Acrylic Photo Frames in Hyderabad | Crystal Clear Custom Prints — Abhi's Gifts",
    description: 'Order high-definition crystal acrylic photo frames in Hyderabad and Dilsukhnagar. Diamond-edge beveled acrylic prints with vibrant, fade-resistant color depth.',
    h1: 'Acrylic Photo Frames in Hyderabad',
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
    description: 'Divine 3D crystal acrylic and warm LED backlit God photo frames in Hyderabad. Tirupati Balaji, Lord Shiva, Ganesha, Hanuman, Rama & Lakshmi frames.',
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
    title: "Acrylic Photo Frames in Hyderabad | crystal acrylic Art — Abhi's Gifts",
    description: 'Explore high-definition acrylic photo frames in Hyderabad. Diamond-edge polished cast acrylic wall art, family portraits & devotional keepsakes handcrafted in Dilsukhnagar.',
    h1: 'Premium Acrylic Photo Frames in Hyderabad',
  },
  'custom-led-photo-frames': {
    title: "LED Photo Frames in Hyderabad | warm Backlit Custom Frames — Abhi's Gifts",
    description: 'Discover custom LED photo frames in Hyderabad and Dilsukhnagar. Ambient warm night-glow illumination for wedding photos, family portraits & anniversary gifts with 12V adapter.',
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
    title: "LED Acrylic Frames Hyderabad | warm Illuminated Wall Art — Abhi's Gifts",
    description: 'Shop luxury LED acrylic frames in Hyderabad. Sacred Tirupati Balaji, Ganesha, Shiva, Radha Krishna & modern illuminated art with high-efficiency Epistar warm LEDs. Fast delivery across Hyderabad.',
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

  // Multi-category matching + smart category matching
  const categoryProducts = allProducts.filter((p) => {
    // 1. Direct or multi-category assignment
    if (p.categorySlug === slug || p.categorySlugs?.includes(slug)) {
      return true;
    }

    // 2. Smart matching for the 8 official categories
    if (slug === 'acrylic-photo-frames') {
      return (
        !p.hasLedBacklight ||
        p.categorySlug === 'acrylic-photo-frames' ||
        p.categorySlugs?.includes('acrylic-photo-frames') ||
        p.tags?.some((t) => t.toLowerCase().includes('acrylic'))
      );
    }
    if (slug === 'led-acrylic-photo-frames' || slug === 'led-backlit-wall-art' || slug === 'custom-led-photo-frames') {
      return p.hasLedBacklight;
    }
    if (slug === 'glitter-photo-frames') {
      return (
        p.categorySlug === 'glitter-photo-frames' ||
        p.categorySlugs?.includes('glitter-photo-frames') ||
        p.tags?.some((t) => t.toLowerCase().includes('glitter'))
      );
    }
    if (slug === '360-rotating-photo-lamps' || slug === 'rotating-photo-lamps') {
      return (
        p.categorySlug.includes('rotating') ||
        p.tags?.some((t) => t.toLowerCase().includes('rotating') || t.toLowerCase().includes('lamp'))
      );
    }
    if (slug === 'god-photo-frames' || slug === 'devotional-led-frames') {
      return (
        Boolean(p.deity) ||
        p.categorySlug.includes('lord') ||
        p.categorySlug.includes('goddess') ||
        p.categorySlug.includes('radha') ||
        p.categorySlug.includes('hanuman') ||
        p.categorySlug.includes('ram') ||
        p.categorySlug.includes('shiva') ||
        p.categorySlug.includes('balaji') ||
        p.categorySlug.includes('ganesha') ||
        p.categorySlug.includes('ayyappa') ||
        p.categorySlug.includes('kartikeya') ||
        p.categorySlug.includes('devotional') ||
        p.tags?.some((t) => ['balaji', 'shiva', 'ganesha', 'hanuman', 'ram', 'lakshmi', 'krishna', 'ayyappa', 'murugan', 'temple', 'mandir', 'devotional'].includes(t.toLowerCase()))
      );
    }
    if (slug === 'family-baby-frames' || slug === 'personalized-family-photo-frames' || slug === 'sets-of-two-three-frames') {
      return (
        p.categorySlug.includes('family') ||
        p.tags?.some((t) => t.toLowerCase().includes('family') || t.toLowerCase().includes('baby') || t.toLowerCase().includes('heirloom') || t.toLowerCase().includes('triptych'))
      );
    }
    if (slug === 'couple-wedding-frames' || slug === 'couple-wedding-photos') {
      return (
        p.categorySlug.includes('wedding') ||
        p.categorySlug.includes('couple') ||
        p.tags?.some((t) => t.toLowerCase().includes('wedding') || t.toLowerCase().includes('couple') || t.toLowerCase().includes('anniversary'))
      );
    }
    if (slug === 'personalized-gifts' || slug === 'custom-frames') {
      return (
        p.categorySlug.includes('photo') ||
        p.categorySlug.includes('custom') ||
        p.tags?.some((t) => t.toLowerCase().includes('custom') || t.toLowerCase().includes('personalized') || t.toLowerCase().includes('gift'))
      );
    }

    // 3. Backward compatibility for legacy slugs
    if (slug === 'modern-illuminated-art') {
      return p.hasLedBacklight && (p.categorySlug === 'modern-illuminated-art' || p.tags.some((t) => t.toLowerCase().includes('modern') || t.toLowerCase().includes('horizon')));
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
                ? '✨ warm LED Backlit Series (12V Adapter)'
                : '🖼️ Normal Pure Crystal Acrylic Series (Non-Lit gold Gold)'}
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
      <div className="bg-[#121212] border border-[#2D2D2D] rounded-2xl p-4 sm:p-5 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 text-xs text-[#FFFFFF]">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-[#181818] text-[#FACC15] border border-[#EAB308]/40 flex items-center justify-center shrink-0">
            <Truck className="w-5 h-5" />
          </div>
          <div>
            <p className="font-bold text-sm text-[#FFFFFF]">Local Hyderabad &amp; Dilsukhnagar Fast Delivery</p>
            <p className="text-[#D1D5DB]">Order online or visit our Dilsukhnagar studio. 100% safe packaging standard across Telangana.</p>
          </div>
        </div>
        <div className="flex items-center gap-2 shrink-0">
          <Link
            href="/customise"
            className="bg-[#EAB308] text-[#000000] px-4 py-2 rounded-full font-bold text-xs hover:bg-[#FACC15] transition-colors"
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
      <div className="bg-[#121212] p-6 sm:p-8 rounded-3xl border border-amber-200 flex flex-col sm:flex-row items-center justify-between gap-6 mt-12">
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
