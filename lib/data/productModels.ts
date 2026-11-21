import { Product, ProductModel } from '@/types';

// Standard model order matching customer reference:
// M-18 🔥, M-10 🔥, M-1 🔥, M-2, M-3, M-4, M-5, M-6, M-7, M-8, M-9, M-11, M-12, M-13, M-14, M-15, M-16, M-17, M-19, M-20, M-21, M-22, M-23, M-24, M-25
export const STANDARD_MODEL_ORDER: Array<{ id: string; name: string; isPopular?: boolean }> = [
  { id: 'M-18', name: 'M-18', isPopular: true },
  { id: 'M-10', name: 'M-10', isPopular: true },
  { id: 'M-1', name: 'M-1', isPopular: true },
  { id: 'M-2', name: 'M-2' },
  { id: 'M-3', name: 'M-3' },
  { id: 'M-4', name: 'M-4' },
  { id: 'M-5', name: 'M-5' },
  { id: 'M-6', name: 'M-6' },
  { id: 'M-7', name: 'M-7' },
  { id: 'M-8', name: 'M-8' },
  { id: 'M-9', name: 'M-9' },
  { id: 'M-11', name: 'M-11' },
  { id: 'M-12', name: 'M-12' },
  { id: 'M-13', name: 'M-13' },
  { id: 'M-14', name: 'M-14' },
  { id: 'M-15', name: 'M-15' },
  { id: 'M-16', name: 'M-16' },
  { id: 'M-17', name: 'M-17' },
  { id: 'M-19', name: 'M-19' },
  { id: 'M-20', name: 'M-20' },
  { id: 'M-21', name: 'M-21' },
  { id: 'M-22', name: 'M-22' },
  { id: 'M-23', name: 'M-23' },
  { id: 'M-24', name: 'M-24' },
  { id: 'M-25', name: 'M-25' },
];

/**
 * Generates or retrieves up to 25-30 model designs for any product.
 * Guarantees that Lord Balaji products have the exact M-18 Lakshmi-Balaji artwork
 * shown in the customer's reference screenshot, with full room mockups.
 */
export function getProductModels(product: Product): ProductModel[] {
  if (product.models && product.models.length > 0) {
    return product.models;
  }

  const baseImages = Array.isArray(product.images) && product.images.length > 0
    ? product.images
    : ['/images/placeholder.jpg'];

  const isBalaji =
    product.slug?.includes('balaji') ||
    product.title?.toLowerCase().includes('balaji') ||
    product.title?.toLowerCase().includes('venkateswara') ||
    product.deity?.toLowerCase().includes('venkateswara') ||
    product.deity?.toLowerCase().includes('balaji');

  return STANDARD_MODEL_ORDER.map((item, index) => {
    // Special handling for M-18 on Balaji products (matches customer screenshot)
    if (item.id === 'M-18' && isBalaji) {
      return {
        id: item.id,
        name: item.name,
        isPopular: true,
        image: '/images/models/balaji-m18-room.jpg',
        mockups: [
          '/images/models/balaji-m18-room.jpg',
          '/images/models/balaji-m18-view-1.jpg',
          '/images/models/balaji-m18-view-2.jpg',
          '/images/models/balaji-m18-view-3.jpg',
          '/images/models/balaji-m18-view-4.jpg',
          '/images/models/balaji-m18-view-5.jpg',
          '/images/models/balaji-m18-art.jpg',
        ],
      };
    }

    if (item.id === 'M-10' && isBalaji) {
      return {
        id: item.id,
        name: item.name,
        isPopular: true,
        image: '/images/wall-decor/products/balaji/balaji-acrylic-gold-frame.jpg',
        mockups: [
          '/images/wall-decor/products/balaji/balaji-acrylic-gold-frame.jpg',
          '/images/wall-decor/products/balaji/balaji-daylight-unlit.jpg',
          '/images/mockups/tirupati-balaji-divine-led-backlit-acrylic-wall-art/mockup-living-room.jpg',
          '/images/mockups/tirupati-balaji-divine-led-backlit-acrylic-wall-art/mockup-interior.jpg',
          '/images/mockups/tirupati-balaji-divine-led-backlit-acrylic-wall-art/mockup-foyer.jpg',
        ],
      };
    }

    // Default image assigned cyclically from product's image library
    const assignedImage = baseImages[index % baseImages.length];

    // Build perspective views for this model
    const mockups = [
      assignedImage,
      baseImages[(index + 1) % baseImages.length],
      baseImages[(index + 2) % baseImages.length],
      baseImages[(index + 3) % baseImages.length],
      baseImages[(index + 4) % baseImages.length],
    ].filter(Boolean);

    return {
      id: item.id,
      name: item.name,
      isPopular: item.isPopular || false,
      image: assignedImage,
      mockups: Array.from(new Set(mockups)),
    };
  });
}
