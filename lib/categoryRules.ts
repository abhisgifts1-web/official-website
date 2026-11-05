import { Product } from '@/types';
import { CATEGORY_SLUG_ALIASES } from './data/categories';

/**
 * Checks whether a product belongs to the "God Photo Frames" (Devotional) category.
 */
export function isGodProduct(p: Product): boolean {
  if (p.categorySlug === 'god-photo-frames' || p.categorySlugs?.includes('god-photo-frames')) {
    return true;
  }
  if (Boolean(p.deity)) {
    return true;
  }
  const deityKeywords = [
    'balaji', 'venkateswara', 'shiva', 'ganesha', 'hanuman', 'ram',
    'mandir', 'temple', 'lakshmi', 'krishna', 'ayyappa', 'murugan',
    'kartikeya', 'swastik', 'chalisa', 'adiyogi', 'vighnaharta',
    'devotional', 'deity', 'god'
  ];
  const slugLower = p.slug.toLowerCase();
  if (deityKeywords.some((k) => slugLower.includes(k))) {
    return true;
  }
  if (p.tags?.some((t) => deityKeywords.includes(t.toLowerCase()))) {
    return true;
  }
  const legacyGodSlugs = [
    'lord-venkateswara-balaji', 'lord-shiva-shiv-parivar', 'lord-ganesha',
    'lord-hanuman', 'lord-rama', 'goddess-lakshmi', 'radha-krishna',
    'lord-kartikeya', 'lord-ayyappa', 'premium-temple-designs', 'devotional-led-frames'
  ];
  return legacyGodSlugs.includes(p.categorySlug);
}

/**
 * Checks whether a product belongs to "360° Rotating Photo Lamps".
 */
export function isRotatingLamp(p: Product): boolean {
  return (
    p.categorySlug === '360-rotating-photo-lamps' ||
    p.categorySlug === 'rotating-photo-lamps' ||
    Boolean(p.categorySlugs?.includes('360-rotating-photo-lamps')) ||
    p.slug.includes('rotating') ||
    p.slug.includes('lamp') ||
    Boolean(p.tags?.some((t) => {
      const tl = t.toLowerCase();
      return tl.includes('rotating') || tl.includes('lamp') || tl.includes('cylinder');
    }))
  );
}

/**
 * Checks whether a product belongs to "Glitter Photo Frames".
 */
export function isGlitterFrame(p: Product): boolean {
  return (
    p.categorySlug === 'glitter-photo-frames' ||
    Boolean(p.categorySlugs?.includes('glitter-photo-frames')) ||
    p.slug.includes('glitter') ||
    Boolean(p.tags?.some((t) => {
      const tl = t.toLowerCase();
      return tl.includes('glitter') || tl.includes('shimmer');
    }))
  );
}

/**
 * Checks whether a product belongs to "Couple & Wedding Frames".
 */
export function isCoupleWeddingFrame(p: Product): boolean {
  if (isGodProduct(p)) return false;
  return (
    p.categorySlug === 'couple-wedding-frames' ||
    p.categorySlug === 'couple-wedding-photos' ||
    Boolean(p.categorySlugs?.includes('couple-wedding-frames')) ||
    p.slug.includes('wedding') ||
    p.slug.includes('couple') ||
    Boolean(p.tags?.some((t) => {
      const tl = t.toLowerCase();
      return tl.includes('wedding') || tl.includes('couple') || tl.includes('anniversary') || tl.includes('vow');
    }))
  );
}

/**
 * Checks whether a product belongs to "Family & Baby Frames".
 */
export function isFamilyBabyFrame(p: Product): boolean {
  if (isGodProduct(p)) return false;
  return (
    p.categorySlug === 'family-baby-frames' ||
    p.categorySlug === 'personalized-family-photo-frames' ||
    p.categorySlug === 'sets-of-two-three-frames' ||
    Boolean(p.categorySlugs?.includes('family-baby-frames')) ||
    p.slug.includes('family') ||
    p.slug.includes('baby') ||
    p.slug.includes('triptych') ||
    Boolean(p.tags?.some((t) => {
      const tl = t.toLowerCase();
      return tl.includes('family') || tl.includes('baby') || tl.includes('heirloom') || tl.includes('crest') || tl.includes('triptych');
    }))
  );
}

/**
 * Checks whether a product belongs to "LED Photo Frames".
 * Specifically non-devotional illuminated frames (God frames belong to God Photo Frames).
 */
export function isLedPhotoFrame(p: Product): boolean {
  if (isGodProduct(p)) return false;
  if (isRotatingLamp(p)) return false;
  return (
    p.hasLedBacklight === true ||
    p.categorySlug === 'led-acrylic-photo-frames' ||
    p.categorySlug === 'custom-led-photo-frames' ||
    p.categorySlug === 'led-backlit-wall-art' ||
    Boolean(p.categorySlugs?.includes('led-acrylic-photo-frames'))
  );
}

/**
 * Checks whether a product belongs to "Personalized Gifts".
 * Specifically customizable photo gifts, bespoke crests, wedding vows, and custom keepsakes.
 */
export function isPersonalizedGift(p: Product): boolean {
  if (isGodProduct(p)) return false;
  return (
    p.categorySlug === 'personalized-gifts' ||
    p.categorySlug === 'custom-frames' ||
    Boolean(p.categorySlugs?.includes('personalized-gifts')) ||
    p.slug.includes('custom-personalised') ||
    p.slug.includes('luxury-beveled') ||
    p.slug.includes('signature') ||
    p.slug.includes('keepsake') ||
    p.slug.includes('heirloom') ||
    p.slug.includes('crest') ||
    isRotatingLamp(p) ||
    isGlitterFrame(p) ||
    Boolean(p.tags?.some((t) => {
      const tl = t.toLowerCase();
      return tl.includes('personalized') || tl.includes('custom') || tl.includes('gift') || tl.includes('keepsake');
    }))
  );
}

/**
 * Checks whether a product belongs to "Acrylic Photo Frames".
 * Normal (non-lit) crystal acrylic photo frames, Vastu wall art, landscapes, and custom prints.
 * Strictly excludes God photo frames, rotating lamps, and glitter frames.
 */
export function isAcrylicPhotoFrame(p: Product): boolean {
  if (isGodProduct(p)) return false;
  if (isRotatingLamp(p)) return false;
  if (isGlitterFrame(p)) return false;

  return (
    p.categorySlug === 'acrylic-photo-frames' ||
    p.categorySlug === 'premium-acrylic-wall-art' ||
    p.categorySlug === 'acrylic-wall-decor' ||
    Boolean(p.categorySlugs?.includes('acrylic-photo-frames')) ||
    p.slug.includes('custom-personalised-photo') ||
    p.slug.includes('horses') ||
    p.slug.includes('bodhi') ||
    p.slug.includes('koi') ||
    p.slug.includes('deer') ||
    p.slug.includes('peacock') ||
    p.slug.includes('landscape') ||
    p.slug.includes('botanical') ||
    Boolean(p.tags?.some((t) => {
      const tl = t.toLowerCase();
      return (
        tl.includes('vastu') ||
        tl.includes('horses') ||
        tl.includes('landscape') ||
        tl.includes('botanical') ||
        tl.includes('koi') ||
        tl.includes('deer') ||
        tl.includes('peacock') ||
        tl.includes('nature') ||
        tl.includes('abstract')
      );
    }))
  );
}

/**
 * Master category classifier function:
 * Resolves whether product belongs to categorySlug (handles canonical 8 categories + aliases).
 */
export function matchesCategory(p: Product, categorySlug: string): boolean {
  const normalized = CATEGORY_SLUG_ALIASES[categorySlug] || categorySlug;

  switch (normalized) {
    case 'god-photo-frames':
      return isGodProduct(p);
    case 'glitter-photo-frames':
      return isGlitterFrame(p);
    case '360-rotating-photo-lamps':
      return isRotatingLamp(p);
    case 'couple-wedding-frames':
      return isCoupleWeddingFrame(p);
    case 'family-baby-frames':
      return isFamilyBabyFrame(p);
    case 'personalized-gifts':
      return isPersonalizedGift(p);
    case 'led-acrylic-photo-frames':
      return isLedPhotoFrame(p);
    case 'acrylic-photo-frames':
      return isAcrylicPhotoFrame(p);
    default:
      // Direct category or multi-category fallback
      if (p.categorySlug === categorySlug || p.categorySlug === normalized) return true;
      if (p.categorySlugs?.includes(categorySlug) || p.categorySlugs?.includes(normalized)) return true;
      return false;
  }
}

/**
 * Filter product array by category slug using master rules.
 */
export function filterProductsByCategory(products: Product[], categorySlug: string): Product[] {
  if (!categorySlug || categorySlug === 'all') return products;
  return products.filter((p) => matchesCategory(p, categorySlug));
}
