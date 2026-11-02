export interface FrameShape {
  id: string;
  name: string;
  shape: 'portrait' | 'landscape' | 'square' | 'round' | 'set-of-2' | 'set-of-3';
  aspectRatio: string;
  badge: string;
  tagline: string;
  description: string;
  recommendedFor: string;
  dimensions: string;
  image: string;
  href: string;
  buttonText: string;
}

export const SHAPES_DATA: FrameShape[] = [
  {
    id: 'shape-portrait',
    name: 'Portrait',
    shape: 'portrait',
    aspectRatio: '2:3 / 3:4',
    badge: 'Popular for Mandir & Foyers',
    tagline: 'Vertical Statement Art',
    description: 'Tall, majestic proportions that draw the eye upward. Ideal for entrance pillars, pooja mandir niches, and focal columns.',
    recommendedFor: 'Pooja Rooms, Entry Foyers & Vertical Feature Walls',
    dimensions: '12x18 • 18x24 • 24x36 • 30x48 inches',
    image: '/images/wall-decor/categories/frame-shapes/shape-portrait.jpg',
    href: '/shop?shape=portrait',
    buttonText: 'Explore Portrait Art',
  },
  {
    id: 'shape-landscape',
    name: 'Landscape',
    shape: 'landscape',
    aspectRatio: '16:9 / 3:2',
    badge: 'Expansive Living Room Statement',
    tagline: 'Wide Panoramic Art',
    description: 'Expansive horizontal silhouettes engineered to span wide accent walls above living room sofas, dining credenzas, and bed headboards.',
    recommendedFor: 'Living Room Sofas, Master Suites & Dining Walls',
    dimensions: '24x16 • 36x24 • 48x30 • 60x36 inches',
    image: '/images/wall-decor/categories/frame-shapes/shape-landscape.jpg',
    href: '/shop?shape=landscape',
    buttonText: 'Explore Landscape Art',
  },
  {
    id: 'shape-square',
    name: 'Square',
    shape: 'square',
    aspectRatio: '1:1 Symmetry',
    badge: 'Modern Geometric Balance',
    tagline: 'Balanced 1:1 Art',
    description: 'Harmonious geometric symmetry that anchors modern spaces. Perfect for sacred yantras, deity medallions, and square niche mandirs.',
    recommendedFor: 'Mandir Altars, Study Rooms & Gallery Clusters',
    dimensions: '16x16 • 20x20 • 24x24 • 30x30 inches',
    image: '/images/wall-decor/categories/frame-shapes/shape-square.jpg',
    href: '/shop?shape=square',
    buttonText: 'Explore Square Art',
  },
  {
    id: 'shape-round',
    name: 'Round',
    shape: 'round',
    aspectRatio: 'Circular Frame',
    badge: 'Soft Organic Silhouette',
    tagline: 'Diamond-Beveled Circular Art',
    description: 'Curved, frameless acrylic with precision diamond-beveled edges. Adds organic softness and spiritual medallion elegance to modern interiors.',
    recommendedFor: 'Corridors, Entry Medallions & Bedroom Accent Walls',
    dimensions: '16, 20, 24, 30 inches Diameter',
    image: '/images/wall-decor/categories/frame-shapes/shape-round.jpg',
    href: '/shop?shape=round',
    buttonText: 'Explore Round Art',
  },
  {
    id: 'shape-set-of-2',
    name: 'Set of 2 Frames',
    shape: 'set-of-2',
    aspectRatio: 'Diptych Pair',
    badge: 'Harmonious Duet',
    tagline: 'Coordinated Diptych Sets',
    description: 'Complementary two-piece compositions crafted to hang side-by-side. Pairs divine symbols, couple portraits, or sacred deity duos.',
    recommendedFor: 'Wide Accent Walls, Hallway Galleries & Double Niches',
    dimensions: 'Pair of 12x18 or 18x24 inches',
    image: '/images/wall-decor/categories/frame-shapes/shape-set-of-2.jpg',
    href: '/shop?shape=set-of-2',
    buttonText: 'Explore Set of 2',
  },
  {
    id: 'shape-set-of-3',
    name: 'Set of 3 Frames',
    shape: 'set-of-3',
    aspectRatio: 'Triptych 3-Piece',
    badge: 'Grand Gallery Triptych',
    tagline: 'Continuous 3-Panel Visuals',
    description: 'Grand triptych layouts where a single design flows across three coordinated panels, creating a museum-grade gallery wall effect.',
    recommendedFor: 'Double-Height Living Rooms & Grand Feature Walls',
    dimensions: 'Triptych: (12x24 in) x 3 pieces',
    image: '/images/wall-decor/categories/frame-shapes/shape-set-of-3.jpg',
    href: '/shop?shape=set-of-3',
    buttonText: 'Explore Set of 3',
  },
];
