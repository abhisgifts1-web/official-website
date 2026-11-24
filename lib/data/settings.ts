import { SiteSettings, PromotionalOfferSettings } from '@/types';

export const DEFAULT_PROMOTIONAL_OFFER: PromotionalOfferSettings = {
  isActive: false, // Inactive by default until admin enables it in dashboard
  tag: 'Direct Hyderabad Workshop Special',
  title: 'Flat 50% OFF on Handcrafted Acrylic Photo Frames',
  highlightedText: '50% OFF',
  description:
    'Transform your cherished portraits, wedding memories, and divine deity art into museum-grade 5MM cast crystal acrylic. Includes complimentary 1:1 WhatsApp digital proof approval before printing.',
  discountBadge: '50% OFF',
  productTitle: 'Custom LED Backlit Acrylic Photo Frame',
  productCategory: 'Signature LED Series',
  price: '₹2,499',
  originalPrice: '₹4,999',
  buttonText: 'Shop All Offers Now',
  buttonLink: '/shop',
  whatsappCtaText: 'Claim Offer on WhatsApp',
  whatsappMessage:
    "Hello Abhi's Gifts, I saw the Flat 50% Festive Promotion on your website and would like to order a custom acrylic photo frame!",
  imageUrl: '/images/mockups/custom-led-backlit-acrylic-photo-frame/primary-square.jpg',
  features: [
    'Free WhatsApp Proof',
    '5MM Crystal Acrylic',
    '24-48h Dispatch',
    'Zero-Breakage Transit',
  ],
};

export const INITIAL_SETTINGS: SiteSettings = {
  storeName: "Abhi's Gifts",
  tagline: 'Frame Your Memories.',
  supportPhone: '+91 90323 72782',
  supportEmail: 'abhisgifts@gmail.com',
  whatsappNumber: '+919032372782',
  workingHours: '10:00 AM – 08:00 PM',
  announcementText: '✨ Handcrafted Photo Frames & Custom Art • Dilsukhnagar, Hyderabad Store',
  freeShippingThreshold: 0,
  defaultShippingFee: 0,
  codAvailable: false,
  codFee: 0,
  businessAddress: "Abhi's Gifts Workshop & Studio, 16-11-740/5/A, Gaddiannaram, Dilsukhnagar, Hyderabad, Telangana – 500060, India",
  googleMapsUrl: 'https://maps.app.goo.gl/fmGv35KsGabFna9E6?g_st=ac',
  gstNumber: '36AAAAA0000A1Z5',
  instagramUrl: 'https://www.instagram.com/abhis_gifts_?cplk=MWtkNTJla2s3NTQw',
  youtubeUrl: 'https://youtube.com/@abhis_gifts?si=Ap98aZU7b21rJA_8',
  promotionalOffer: DEFAULT_PROMOTIONAL_OFFER,
  frameStock: {
    gold: { name: 'Rose Gold', inStock: true, stockCount: 850 },
    black: { name: 'Black', inStock: true, stockCount: 720 },
    categoryVisibility: {
      'acrylic-photo-frames': true,
      'led-acrylic-photo-frames': true,
      'glitter-photo-frames': false,
      '360-rotating-photo-lamps': false,
      'god-photo-frames': true,
      'family-baby-frames': true,
      'couple-wedding-frames': true,
      'personalized-gifts': true,
    },
    categoryConfigs: {
      'acrylic-photo-frames': { enabled: true, showGold: true, showBlack: true },
      'led-acrylic-photo-frames': { enabled: true, showGold: true, showBlack: true },
      'glitter-photo-frames': { enabled: false, showGold: false, showBlack: false },
      '360-rotating-photo-lamps': { enabled: false, showGold: false, showBlack: false },
      'god-photo-frames': { enabled: true, showGold: true, showBlack: true },
      'family-baby-frames': { enabled: true, showGold: true, showBlack: true },
      'couple-wedding-frames': { enabled: true, showGold: true, showBlack: true },
      'personalized-gifts': { enabled: true, showGold: true, showBlack: true },
    },
  },
};
