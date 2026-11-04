// High-performance mapping from category slugs to their featured / flagship product slugs
export const CATEGORY_TO_PRODUCT_SLUG: Record<string, string> = {
  // Official 8 categories
  'acrylic-photo-frames': 'custom-personalised-high-definition-acrylic-photo-frame',
  'led-acrylic-photo-frames': 'custom-led-backlit-night-glow-acrylic-photo-frame',
  'glitter-photo-frames': 'enchanted-liquid-gold-glitter-acrylic-photo-frame',
  '360-rotating-photo-lamps': 'motorized-360-rotating-led-cylinder-photo-lamp',
  'god-photo-frames': 'tirupati-balaji-divine-led-backlit-acrylic-wall-art',
  'family-baby-frames': 'personalized-family-heirloom-gold-script-acrylic-frame',
  'couple-wedding-frames': 'custom-couple-wedding-vows-acrylic-keepsake-frame',
  'personalized-gifts': 'custom-personalised-high-definition-acrylic-photo-frame',

  // Legacy & Alias mappings
  'rotating-photo-lamps': 'motorized-360-rotating-led-cylinder-photo-lamp',
  'personalized-family-photo-frames': 'personalized-family-heirloom-gold-script-acrylic-frame',
  'couple-wedding-photos': 'custom-couple-wedding-vows-acrylic-keepsake-frame',
  'custom-led-photo-frames': 'custom-led-backlit-acrylic-photo-frame',
  'devotional-led-frames': 'tirupati-balaji-divine-led-backlit-acrylic-wall-art',
  'led-backlit-wall-art': 'tirupati-balaji-divine-led-backlit-acrylic-wall-art',
  'lord-venkateswara-balaji': 'tirupati-balaji-divine-led-backlit-acrylic-wall-art',
  'lord-shiva-shiv-parivar': 'adiyogi-lord-shiva-meditation-led-wall-decor',
  'lord-ganesha': 'lord-ganesha-auspicious-gold-leaf-acrylic-wall-art',
  'lord-hanuman': 'shri-hanuman-chalisa-full-inscribed-led-acrylic-frame',
  'lord-rama': 'ayodhya-ram-janmabhoomi-mandir-3d-led-wall-decor',
  'goddess-lakshmi': 'ashta-lakshmi-wealth-prosperity-acrylic-wall-decor',
  'radha-krishna': 'radha-krishna-divine-flute-acrylic-wall-decor',
  'lord-kartikeya': 'lord-kartikeya-murugan-golden-vel-acrylic-art',
  'lord-ayyappa': 'swamiye-saranam-ayyappa-sacred-acrylic-wall-decor',
  'modern-illuminated-art': 'modern-illuminated-celestial-horizon-acrylic-art',
  'premium-temple-designs': 'ayodhya-ram-janmabhoomi-mandir-3d-led-wall-decor',
  'sets-of-two-three-frames': 'triptych-set-of-three-gallery-acrylic-photo-frames',
  'premium-frame-styles': 'luxury-beveled-floating-border-acrylic-masterpiece-frame',
  'gold-abstract-designs': 'emerald-liquid-gold-vein-abstract-luxury-acrylic-art',
  'mountain-landscape-art': 'golden-himalayan-sunrise-mountain-landscape-acrylic-art',
  'horses-and-wildlife': 'seven-running-horses-vastu-gold-acrylic-wall-art',
  'deer-and-bird-artwork': 'majestic-golden-deer-sacred-forest-acrylic-art',
  'trees-and-leaves': 'golden-bodhi-tree-ginkgo-leaves-acrylic-wall-art',
  'koi-fish-designs': 'nine-auspicious-golden-koi-fish-acrylic-wall-decor',
  'contemporary-luxury-art': 'emerald-liquid-gold-vein-abstract-luxury-acrylic-art',
  'modern-decorative-art': 'botanical-golden-ginkgo-leaves-triptych-acrylic-set',
  'abstract-wall-decor': 'emerald-liquid-gold-vein-abstract-luxury-acrylic-art',
  'premium-acrylic-wall-art': 'signature-gold-embellished-crystal-acrylic-wall-art',
};

export function getProductSlugForCategory(categorySlug: string): string {
  return (
    CATEGORY_TO_PRODUCT_SLUG[categorySlug] ||
    'custom-personalised-high-definition-acrylic-photo-frame'
  );
}

export function getViewProductLabel(categoryName: string): string {
  return 'View Products';
}
