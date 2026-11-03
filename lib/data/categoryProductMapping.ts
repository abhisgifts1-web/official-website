// High-performance mapping from category slugs to their featured / flagship product slugs
export const CATEGORY_TO_PRODUCT_SLUG: Record<string, string> = {
  'lord-venkateswara-balaji': 'tirupati-balaji-divine-led-backlit-acrylic-wall-art',
  'lord-shiva-shiv-parivar': 'adiyogi-lord-shiva-meditation-led-wall-decor',
  'lord-ganesha': 'lord-ganesha-auspicious-gold-leaf-acrylic-wall-art',
  'lord-hanuman': 'shri-hanuman-chalisa-full-inscribed-led-acrylic-frame',
  'lord-rama': 'ayodhya-ram-janmabhoomi-mandir-3d-led-wall-decor',
  'goddess-lakshmi': 'ashta-lakshmi-wealth-prosperity-acrylic-wall-decor',
  'radha-krishna': 'radha-krishna-divine-flute-acrylic-wall-decor',
  'lord-kartikeya': 'lord-kartikeya-murugan-golden-vel-acrylic-art',
  'lord-ayyappa': 'swamiye-saranam-ayyappa-sacred-acrylic-wall-decor',
  'devotional-led-frames': 'tirupati-balaji-divine-led-backlit-acrylic-wall-art',
  'led-backlit-wall-art': 'tirupati-balaji-divine-led-backlit-acrylic-wall-art',
  'vertical-led-frames': 'shri-hanuman-chalisa-full-inscribed-led-acrylic-frame',
  'horizontal-led-frames': 'modern-illuminated-celestial-horizon-acrylic-art',
  'square-backlight-frames': 'lord-ganesha-vighnaharta-divine-led-backlit-acrylic-art',
  'modern-illuminated-art': 'modern-illuminated-celestial-horizon-acrylic-art',
  'premium-temple-designs': 'ayodhya-ram-janmabhoomi-mandir-3d-led-wall-decor',
  'custom-portrait-frames': 'custom-personalised-photo-acrylic-wall-frame',
  'landscape-photo-frames': 'panoramic-landscape-acrylic-photo-frame',
  'square-photo-frames': 'modern-square-acrylic-photo-frame',
  'round-photo-frames': 'luxury-circular-round-acrylic-photo-frame',
  'personalized-family-photo-frames': 'personalized-family-heirloom-gold-script-acrylic-frame',
  'custom-led-photo-frames': 'custom-led-backlit-acrylic-photo-frame',
  'sets-of-two-three-frames': 'triptych-set-of-three-gallery-acrylic-photo-frames',
  'couple-wedding-photos': 'custom-couple-wedding-vows-acrylic-keepsake-frame',
  'premium-frame-styles': 'luxury-beveled-floating-border-acrylic-masterpiece-frame',
  'glitter-photo-frames': 'enchanted-liquid-gold-glitter-acrylic-photo-frame',
  'rotating-photo-lamps': 'motorized-360-rotating-led-cylinder-photo-lamp',
  'gold-abstract-designs': 'emerald-liquid-gold-vein-abstract-luxury-acrylic-art',
  'mountain-landscape-art': 'golden-himalayan-sunrise-mountain-landscape-acrylic-art',
  'horses-and-wildlife': 'seven-running-horses-vastu-gold-acrylic-wall-art',
  'deer-and-bird-artwork': 'majestic-golden-deer-sacred-forest-acrylic-art',
  'trees-and-leaves': 'golden-bodhi-tree-ginkgo-leaves-acrylic-wall-art',
  'koi-fish-designs': 'nine-auspicious-golden-koi-fish-acrylic-wall-decor',
  'contemporary-luxury-art': 'emerald-liquid-gold-vein-abstract-luxury-acrylic-art',
  'modern-decorative-art': 'botanical-golden-ginkgo-leaves-triptych-acrylic-set',
  'abstract-wall-decor': 'emerald-liquid-gold-vein-abstract-luxury-acrylic-art',
  'premium-acrylic-wall-art': 'signature-Gold-gold-embellished-crystal-acrylic-wall-art',
};

export function getProductSlugForCategory(categorySlug: string): string {
  return (
    CATEGORY_TO_PRODUCT_SLUG[categorySlug] ||
    'tirupati-balaji-divine-led-backlit-acrylic-wall-art'
  );
}

export function getViewProductLabel(categoryName: string): string {
  const shortName = categoryName.includes('/')
    ? categoryName.split('/')[0].trim()
    : categoryName;
  // If short name is Lord Balaji, Lord Shiva, etc., provide clean button label
  return `View Product`;
}
