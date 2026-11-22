// High-performance mapping from category slugs to their featured / flagship product slugs
export const CATEGORY_TO_PRODUCT_SLUG: Record<string, string> = {
  // Official 8 categories (1 product in each category)
  'acrylic-photo-frames': 'custom-personalised-photo-acrylic-wall-frame',
  'led-acrylic-photo-frames': 'custom-led-backlit-acrylic-photo-frame',
  'glitter-photo-frames': 'enchanted-liquid-gold-glitter-acrylic-photo-frame',
  '360-rotating-photo-lamps': 'motorized-360-rotating-led-cylinder-photo-lamp',
  'god-photo-frames': 'tirupati-balaji-divine-led-backlit-acrylic-wall-art',
  'family-baby-frames': 'personalized-family-heirloom-gold-script-acrylic-frame',
  'couple-wedding-frames': 'custom-couple-wedding-vows-acrylic-keepsake-frame',
  'personalized-gifts': 'luxury-beveled-floating-border-acrylic-masterpiece-frame',

  // Legacy & Alias mappings
  'led-photo-frames': 'custom-led-backlit-acrylic-photo-frame',
  'rotating-photo-lamps': 'motorized-360-rotating-led-cylinder-photo-lamp',
  'personalized-family-photo-frames': 'personalized-family-heirloom-gold-script-acrylic-frame',
  'couple-wedding-photos': 'custom-couple-wedding-vows-acrylic-keepsake-frame',
  'custom-led-photo-frames': 'custom-led-backlit-acrylic-photo-frame',
  'devotional-led-frames': 'tirupati-balaji-divine-led-backlit-acrylic-wall-art',
  'led-backlit-wall-art': 'custom-led-backlit-acrylic-photo-frame',
  'lord-venkateswara-balaji': 'tirupati-balaji-divine-led-backlit-acrylic-wall-art',
  'lord-shiva-shiv-parivar': 'tirupati-balaji-divine-led-backlit-acrylic-wall-art',
  'lord-ganesha': 'tirupati-balaji-divine-led-backlit-acrylic-wall-art',
  'lord-hanuman': 'tirupati-balaji-divine-led-backlit-acrylic-wall-art',
  'lord-rama': 'tirupati-balaji-divine-led-backlit-acrylic-wall-art',
  'goddess-lakshmi': 'tirupati-balaji-divine-led-backlit-acrylic-wall-art',
  'radha-krishna': 'tirupati-balaji-divine-led-backlit-acrylic-wall-art',
  'lord-kartikeya': 'tirupati-balaji-divine-led-backlit-acrylic-wall-art',
  'lord-ayyappa': 'tirupati-balaji-divine-led-backlit-acrylic-wall-art',
  'modern-illuminated-art': 'custom-led-backlit-acrylic-photo-frame',
  'premium-temple-designs': 'tirupati-balaji-divine-led-backlit-acrylic-wall-art',
  'sets-of-two-three-frames': 'personalized-family-heirloom-gold-script-acrylic-frame',
  'premium-frame-styles': 'luxury-beveled-floating-border-acrylic-masterpiece-frame',
  'gold-abstract-designs': 'custom-personalised-photo-acrylic-wall-frame',
  'mountain-landscape-art': 'custom-personalised-photo-acrylic-wall-frame',
  'horses-and-wildlife': 'custom-personalised-photo-acrylic-wall-frame',
  'deer-and-bird-artwork': 'custom-personalised-photo-acrylic-wall-frame',
  'trees-and-leaves': 'custom-personalised-photo-acrylic-wall-frame',
  'koi-fish-designs': 'custom-personalised-photo-acrylic-wall-frame',
  'contemporary-luxury-art': 'custom-personalised-photo-acrylic-wall-frame',
  'modern-decorative-art': 'custom-personalised-photo-acrylic-wall-frame',
  'abstract-wall-decor': 'custom-personalised-photo-acrylic-wall-frame',
  'premium-acrylic-wall-art': 'custom-personalised-photo-acrylic-wall-frame',
  'custom-frames': 'luxury-beveled-floating-border-acrylic-masterpiece-frame',
};

export function getProductSlugForCategory(categorySlug: string): string {
  return (
    CATEGORY_TO_PRODUCT_SLUG[categorySlug] ||
    'custom-personalised-photo-acrylic-wall-frame'
  );
}

export function getViewProductLabel(categoryName: string): string {
  return 'View Products';
}
