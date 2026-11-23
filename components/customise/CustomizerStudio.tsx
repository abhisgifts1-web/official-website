'use client';

import React, { useState, useRef, useMemo, useEffect } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { calculateCustomDimensions } from '@/lib/utils/customSize';
import {
  Upload,
  Sparkles,
  ShieldCheck,
  Check,
  RotateCw,
  ArrowRight,
  Sun,
  Zap,
  MessageCircle,
  Truck,
  RotateCcw,
  SlidersHorizontal,
  Award,
  Layers,
  Heart,
  Image as ImageIcon,
  CheckCircle2,
  AlertCircle,
  PhoneCall,
  Clock,
  Palette,
  Maximize2,
  ChevronDown,
  Sparkle,
} from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { ProductOrientation, FrameStockSettings } from '@/types';
import { INITIAL_SETTINGS } from '@/lib/data/settings';
import { compressImageToDataUrl } from '@/lib/utils/imageCompress';

// =========================================================================
// TYPES & CONFIGURATION
// =========================================================================

export type FrameCategory =
  | 'normal-acrylic'
  | 'led-backlit'
  | 'wooden';

export interface FrameCategoryOption {
  id: FrameCategory;
  name: string;
  badge: string;
  subtitle: string;
  description: string;
  multiplier: number;
  hasLedDefault: boolean;
  forcedShape?: ProductOrientation;
}

export type FrameFinish =
  | 'gold-frame'
  | 'black-frame'
  | 'floating-standoff'
  | 'crystal-gloss'
  | 'transparent'
  | 'premium-matte'
  | 'wooden-box';

export interface FrameFinishOption {
  id: FrameFinish;
  name: string;
  subtitle: string;
  description: string;
  priceAddition: number;
}

export type LedOption = 'none' | 'warm-white' | 'cool-white' | 'rgb';

export interface LedOptionConfig {
  id: LedOption;
  name: string;
  subtitle: string;
  temperature: string;
  priceAddition: number;
  glowColor: string;
}

export interface SizeConfig {
  id: string;
  label: string;
  dimensionsCm: string;
  basePrice: number;
  mrp: number;
  isPopular?: boolean;
}

export interface GalleryProductItem {
  id: string;
  title: string;
  subtitle: string;
  category: string;
  image: string;
  startingPrice: number;
  mrp: number;
  badge: string;
  description: string;
  preset: {
    category: FrameCategory;
    orientation: ProductOrientation;
    finish: FrameFinish;
    led: LedOption;
    sizeId: string;
  };
}

// =========================================================================
// DATA ARRAYS
// =========================================================================

export const FRAME_CATEGORIES: FrameCategoryOption[] = [
  {
    id: 'normal-acrylic',
    name: 'Normal Acrylic Photo Frames',
    badge: 'Classic Choice',
    subtitle: 'Premium Optical Cast Sheet',
    description: 'High-clarity optical cast acrylic with precision beveled edges. Unlit for clean, minimalist elegance.',
    multiplier: 1.0,
    hasLedDefault: false,
  },
  {
    id: 'led-backlit',
    name: 'LED Backlit Photo Frames',
    badge: 'Trending Gift',
    subtitle: 'Warm Halo Illumination',
    description: 'Concealed Epistar warm golden perimeter LEDs casting a serene halo around your sacred memory or family portrait.',
    multiplier: 1.35,
    hasLedDefault: true,
  },
  {
    id: 'wooden',
    name: 'Wooden Photo Frames',
    badge: 'Organic Warmth',
    subtitle: 'Natural Teak & Walnut Tray',
    description: 'Recessed floating wooden box tray framing hand-polished in Hyderabad with deep architectural warmth.',
    multiplier: 1.2,
    hasLedDefault: false,
  },
];

export const FRAME_FINISHES: FrameFinishOption[] = [
  {
    id: 'gold-frame',
    name: 'Royal Brushed Gold Frame',
    subtitle: '24K Metallic Bevel',
    description: 'Opulent gold metallic frame border precision-machined with brushed royal bevel depth.',
    priceAddition: 350,
  },
  {
    id: 'black-frame',
    name: 'Luxury Matte Black Frame',
    subtitle: 'Matte Obsidian Profile',
    description: 'Deep obsidian architectural frame profile with rich museum-grade depth and satin finish.',
    priceAddition: 350,
  },
  {
    id: 'floating-standoff',
    name: 'Floating Standoff Finish',
    subtitle: 'Brushed S.S Studs (1" off wall)',
    description: '4 brushed stainless steel chrome/champagne corner mounts that float your panel 1 inch away from the wall.',
    priceAddition: 250,
  },
  {
    id: 'crystal-gloss',
    name: 'Crystal Gloss Acrylic',
    subtitle: 'High-Gloss Mirror Reflection',
    description: 'Precision 45° beveled edges creating an ultra-sharp optical glass shine without the heavy weight of glass.',
    priceAddition: 0,
  },
  {
    id: 'transparent',
    name: 'Transparent Border',
    subtitle: 'Clear Border Halo Effect',
    description: 'Optically clear border allowing your wall color to subtly frame your photograph.',
    priceAddition: 150,
  },
  {
    id: 'premium-matte',
    name: 'Premium Matte Finish',
    subtitle: 'Anti-Glare Satin Texture',
    description: 'Soft anti-reflective velvety satin finish, recommended for rooms facing direct sunlight or intense spot lights.',
    priceAddition: 200,
  },
  {
    id: 'wooden-box',
    name: 'Wooden Box Frame',
    subtitle: 'Deep Natural Teak Wood',
    description: 'Architectural hardwood frame tray encasing the acrylic panel with 1.5-inch shadow box depth.',
    priceAddition: 400,
  },
];

export const LED_OPTIONS: LedOptionConfig[] = [
  {
    id: 'none',
    name: 'No LED (Pure Art)',
    subtitle: 'Daylight Wall Display',
    temperature: 'Unlit',
    priceAddition: 0,
    glowColor: 'transparent',
  },
  {
    id: 'warm-white',
    name: 'Warm Ambient LED',
    subtitle: 'Golden Candlelit Sanctum',
    temperature: 'Warm Ambient (3000K)',
    priceAddition: 600,
    glowColor: 'rgba(255, 195, 75, 0.75)',
  },
  {
    id: 'cool-white',
    name: 'Cool White LED',
    subtitle: 'Modern Crisp Ambient Halo',
    temperature: '6500K Crisp White',
    priceAddition: 600,
    glowColor: 'rgba(215, 235, 255, 0.8)',
  },
  {
    id: 'rgb',
    name: 'RGB LED Multi-Color',
    subtitle: 'Vibrant Ambient Wash',
    temperature: 'RGB Cycle',
    priceAddition: 900,
    glowColor: 'rgba(236, 72, 153, 0.65)',
  },
];

export const CALIBRATED_SIZES: Record<ProductOrientation, SizeConfig[]> = {
  vertical: [
    { id: '6x8', label: '6 × 8 inches', dimensionsCm: '15 × 20 cm', basePrice: 999, mrp: 1999 },
    { id: '8x10', label: '8 × 10 inches', dimensionsCm: '20 × 25 cm', basePrice: 1299, mrp: 2499 },
    { id: '10x12', label: '10 × 12 inches', dimensionsCm: '25 × 30 cm', basePrice: 1699, mrp: 3199 },
    { id: '12x18', label: '12 × 18 inches', dimensionsCm: '30 × 45 cm', basePrice: 2199, mrp: 4199, isPopular: true },
    { id: '16x20', label: '16 × 20 inches', dimensionsCm: '40 × 50 cm', basePrice: 2999, mrp: 5499 },
    { id: 'custom', label: 'Custom Size', dimensionsCm: 'Up to 48 × 72 in', basePrice: 1999, mrp: 3999 },
  ],
  horizontal: [
    { id: '8x6', label: '8 × 6 inches', dimensionsCm: '20 × 15 cm', basePrice: 999, mrp: 1999 },
    { id: '10x8', label: '10 × 8 inches', dimensionsCm: '25 × 20 cm', basePrice: 1299, mrp: 2499 },
    { id: '12x10', label: '12 × 10 inches', dimensionsCm: '30 × 25 cm', basePrice: 1699, mrp: 3199 },
    { id: '18x12', label: '18 × 12 inches', dimensionsCm: '45 × 30 cm', basePrice: 2199, mrp: 4199, isPopular: true },
    { id: '20x16', label: '20 × 16 inches', dimensionsCm: '50 × 40 cm', basePrice: 2999, mrp: 5499 },
    { id: 'custom', label: 'Custom Size', dimensionsCm: 'Up to 72 × 48 in', basePrice: 1999, mrp: 3999 },
  ],
  square: [
    { id: '8x8', label: '8 × 8 inches', dimensionsCm: '20 × 20 cm', basePrice: 999, mrp: 1999 },
    { id: '10x10', label: '10 × 10 inches', dimensionsCm: '25 × 25 cm', basePrice: 1299, mrp: 2499 },
    { id: '12x12', label: '12 × 12 inches', dimensionsCm: '30 × 30 cm', basePrice: 1699, mrp: 3199 },
    { id: '16x16', label: '16 × 16 inches', dimensionsCm: '40 × 40 cm', basePrice: 2299, mrp: 4299, isPopular: true },
    { id: '20x20', label: '20 × 20 inches', dimensionsCm: '50 × 50 cm', basePrice: 3299, mrp: 5999 },
    { id: 'custom', label: 'Custom Size', dimensionsCm: 'Up to 48 × 48 in', basePrice: 1999, mrp: 3999 },
  ],
};

export const SAMPLE_MEMORIES = [
  {
    id: 'couple-wedding',
    name: 'Couple & Wedding',
    tag: 'Wedding Keepsake',
    image: '/images/categories/circle-showcase/couple-wedding.jpg',
    defaultText: 'Forever & Always • Manoj & Pooja',
  },
  {
    id: 'acrylic-portrait',
    name: 'Crystal Acrylic',
    tag: 'Classic Gloss',
    image: '/images/categories/circle-showcase/acrylic-photo-frames.jpg',
    defaultText: 'Cherished Memories • Timeless Elegance',
  },
  {
    id: 'family-baby',
    name: 'Family & Baby',
    tag: 'Heirloom Heritage',
    image: '/images/categories/circle-showcase/family-baby-frames.jpg',
    defaultText: 'The Sharma Family • Consecrated 2026',
  },
  {
    id: 'led-halo',
    name: 'LED Backlit Halo',
    tag: 'Night Illumination',
    image: '/images/categories/circle-showcase/led-photo-frames.jpg',
    defaultText: 'Under The Golden Glow • Eternal Warmth',
  },
  {
    id: 'devotional-mandir',
    name: 'Sacred Mandir',
    tag: 'Divine Blessings',
    image: '/images/categories/circle-showcase/god-photo-frames.jpg',
    defaultText: 'Om Namo Venkateshaya • Shubh Labh',
  },
];

export const GALLERY_PRODUCTS: GalleryProductItem[] = [
  {
    id: 'gal-wedding',
    title: 'Couple & Wedding Keepsake Acrylic Photo Frame',
    subtitle: 'Vows & Marriage Commemorative Photo Frame',
    category: 'Couple & Wedding',
    image: '/images/mockups/custom-couple-wedding-vows-acrylic-keepsake-frame/primary-square.jpg',
    startingPrice: 2499,
    mrp: 4499,
    badge: 'Bestseller for Couples',
    description: 'Celebrate sacred vows with museum-grade acrylic clarity, golden foil surname script, and premium floating stainless steel wall studs.',
    preset: {
      category: 'led-backlit',
      orientation: 'vertical',
      finish: 'floating-standoff',
      led: 'warm-white',
      sizeId: '12x18',
    },
  },
  {
    id: 'gal-family',
    title: 'Custom Panoramic Family Heirloom Acrylic Frame',
    subtitle: 'Multi-Generation Heritage Wall Display',
    category: 'Family Wall Decor',
    image: '/images/mockups/custom-panoramic-landscape-acrylic-family-frame/primary-square.jpg',
    startingPrice: 2299,
    mrp: 4199,
    badge: 'Housewarming Favorite',
    description: 'Showcase beloved family moments across an expansive landscape acrylic panel with rich archival colors, precision square-cut edges and metal mounting studs.',
    preset: {
      category: 'normal-acrylic',
      orientation: 'horizontal',
      finish: 'floating-standoff',
      led: 'warm-white',
      sizeId: '18x12',
    },
  },
  {
    id: 'gal-couple',
    title: 'Romantic Couple Floating Acrylic Frame',
    subtitle: 'Pre-Wedding & Candid Couple Portrait',
    category: 'Couple Portrait',
    image: '/images/categories/circle-showcase/couple-wedding.jpg',
    startingPrice: 1499,
    mrp: 2999,
    badge: 'Sleek & Frameless',
    description: 'High-clarity optical cast acrylic floating 1 inch off your wall with brushed chrome standoffs. Perfect for master bedrooms and personal galleries.',
    preset: {
      category: 'normal-acrylic',
      orientation: 'vertical',
      finish: 'crystal-gloss',
      led: 'none',
      sizeId: '8x10',
    },
  },
  {
    id: 'gal-baby',
    title: 'Family & Baby Memory Milestone Keepsake Frame',
    subtitle: 'Newborn Smiles & Cherished Moments',
    category: 'Baby Keepsake',
    image: '/images/categories/circle-showcase/family-baby-frames.jpg',
    startingPrice: 1699,
    mrp: 3199,
    badge: 'Milestone Keepsake',
    description: 'Preserve tiny smiles and memorable childhood steps on shatterproof, crystal-gloss acrylic with personalized date and name typography.',
    preset: {
      category: 'normal-acrylic',
      orientation: 'square',
      finish: 'crystal-gloss',
      led: 'none',
      sizeId: '12x12',
    },
  },
  {
    id: 'gal-grid',
    title: 'Studio Square Grid Multi-Photo Acrylic Frame',
    subtitle: 'Collage of Your Favorite Moments',
    category: 'Collage Frame',
    image: '/images/mockups/custom-studio-square-acrylic-grid-photo-frame/primary-square.jpg',
    startingPrice: 1899,
    mrp: 3499,
    badge: 'Modern Aesthetic',
    description: 'Combine multiple snapshots into a synchronized studio square grid layout with ultra-sharp UV printing and crystal clarity.',
    preset: {
      category: 'normal-acrylic',
      orientation: 'square',
      finish: 'crystal-gloss',
      led: 'none',
      sizeId: '16x16',
    },
  },
  {
    id: 'gal-led',
    title: 'LED Backlit Halo Night Glow Acrylic Frame',
    subtitle: 'Warm Golden Ambient Perimeter Illumination',
    category: 'Illuminated Frame',
    image: '/images/mockups/custom-led-backlit-acrylic-photo-frame/primary-square.jpg',
    startingPrice: 2499,
    mrp: 4799,
    badge: 'Warm Ambient LED',
    description: 'Concealed low-voltage 12V BIS-certified warm perimeter LEDs cast a soothing halo around your portrait, turning any room into a tranquil space.',
    preset: {
      category: 'led-backlit',
      orientation: 'vertical',
      finish: 'floating-standoff',
      led: 'warm-white',
      sizeId: '12x18',
    },
  },
  {
    id: 'gal-glitter',
    title: 'Sparkling Diamond Glitter Acrylic Photo Frame',
    subtitle: 'Subtle Shimmer & Golden Luxury Accent',
    category: 'Glitter Photo Frame',
    image: '/images/mockups/sparkling-diamond-glitter-wedding-photo-frame/primary-square.jpg',
    startingPrice: 2699,
    mrp: 4999,
    badge: 'Luxury Accent',
    description: 'Infused with fine diamond shimmer dust that catches ambient light beautifully, creating an extraordinary wedding or anniversary statement.',
    preset: {
      category: 'normal-acrylic',
      orientation: 'square',
      finish: 'crystal-gloss',
      led: 'warm-white',
      sizeId: '12x12',
    },
  },
  {
    id: 'gal-devotional',
    title: 'Sacred Mandir 3D LED Backlit Devotional Frame',
    subtitle: 'Divine Sanctum & Pooja Room Wall Art',
    category: 'Devotional Wall Art',
    image: '/images/mockups/tirupati-balaji-divine-led-backlit-acrylic-wall-art/primary-square.jpg',
    startingPrice: 2899,
    mrp: 5499,
    badge: 'Pooja Sanctum Decor',
    description: 'Consecrate your pooja mandir with luminous 3D divine deity artwork with a warm golden backlight halo and temple brass-finish hardware.',
    preset: {
      category: 'led-backlit',
      orientation: 'vertical',
      finish: 'floating-standoff',
      led: 'warm-white',
      sizeId: '12x18',
    },
  },
];

// =========================================================================
// MAIN COMPONENT
// =========================================================================

export default function CustomizerStudio() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const linkedTitle = searchParams.get('title') || '';
  const { addToCart, closeCart } = useCart();

  // Customization Form States
  const [category, setCategory] = useState<FrameCategory>('led-backlit');
  const [orientation, setOrientation] = useState<ProductOrientation>('vertical');
  const [selectedSizeId, setSelectedSizeId] = useState<string>('12x18');
  const [customWidth, setCustomWidth] = useState<number>(24);
  const [customHeight, setCustomHeight] = useState<number>(18);
  const [finish, setFinish] = useState<FrameFinish>('floating-standoff');
  const [frameStock, setFrameStock] = useState<FrameStockSettings>(
    INITIAL_SETTINGS.frameStock || {
      gold: { name: 'Royal Gold Frame', inStock: true, stockCount: 850 },
      black: { name: 'Luxury Black Frame', inStock: true, stockCount: 720 },
    }
  );

  useEffect(() => {
    fetch('/api/settings')
      .then((r) => r.json())
      .then((d) => {
        if (d.success && d.settings?.frameStock) {
          setFrameStock(d.settings.frameStock);
        }
      })
      .catch(() => {});
  }, []);

  const isGoldOutOfStock = Boolean(!frameStock.gold?.inStock || (frameStock.gold?.stockCount ?? 0) <= 0);
  const isBlackOutOfStock = Boolean(!frameStock.black?.inStock || (frameStock.black?.stockCount ?? 0) <= 0);
  const isSelectedFinishOutOfStock = Boolean(
    (finish === 'gold-frame' && isGoldOutOfStock) ||
    (finish === 'black-frame' && isBlackOutOfStock)
  );

  // Auto-switch finish if out of stock
  useEffect(() => {
    if (finish === 'gold-frame' && isGoldOutOfStock) {
      setFinish(isBlackOutOfStock ? 'floating-standoff' : 'black-frame');
    } else if (finish === 'black-frame' && isBlackOutOfStock) {
      setFinish(isGoldOutOfStock ? 'floating-standoff' : 'gold-frame');
    }
  }, [finish, isGoldOutOfStock, isBlackOutOfStock]);

  const [led, setLed] = useState<LedOption>('warm-white');
  const [customText, setCustomText] = useState<string>('Forever & Always • Manoj & Pooja');
  const [specialInstructions, setSpecialInstructions] = useState<string>('');

  // Interactive Live Preview Controls
  const [previewImage, setPreviewImage] = useState<string>(SAMPLE_MEMORIES[0].image);
  const [isUserUploaded, setIsUserUploaded] = useState<boolean>(false);
  const [zoomLevel, setZoomLevel] = useState<number>(1.0);
  const [rotation, setRotation] = useState<number>(0);
  const [wallMode, setWallMode] = useState<'ivory' | 'night' | 'studio'>('night');
  const [fileError, setFileError] = useState<string | null>(null);
  const [uploadProgress, setUploadProgress] = useState<number | null>(null);
  const [isHovered, setIsHovered] = useState<boolean>(false);
  const [waUploading, setWaUploading] = useState<boolean>(false);
  const [uploadedPhotoUrl, setUploadedPhotoUrl] = useState<string | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);

  React.useEffect(() => {
    if (linkedTitle) {
      setSpecialInstructions((prev) => (prev ? prev : 'Personalized style based on: ' + linkedTitle));
    }
  }, [linkedTitle]);

  const studioSectionRef = useRef<HTMLDivElement>(null);

  // Available Sizes for Active Orientation
  const sizeList = useMemo(() => {
    return CALIBRATED_SIZES[orientation] || CALIBRATED_SIZES.vertical;
  }, [orientation]);

  // Selected Size Object
  const currentSizeObj = useMemo(() => {
    const found = sizeList.find((s) => s.id === selectedSizeId);
    return found || sizeList[0];
  }, [sizeList, selectedSizeId]);

  // Active Category Object
  const activeCategoryObj = useMemo(() => {
    return FRAME_CATEGORIES.find((c) => c.id === category) || FRAME_CATEGORIES[0];
  }, [category]);

  // Active Finish Object
  const activeFinishObj = useMemo(() => {
    return FRAME_FINISHES.find((f) => f.id === finish) || FRAME_FINISHES[0];
  }, [finish]);

  // Available Finishes filtered by Category Frame Display Settings
  const availableFinishes = useMemo(() => {
    const catSlug = activeCategoryObj.id === 'normal-acrylic'
      ? 'acrylic-photo-frames'
      : activeCategoryObj.id === 'led-backlit'
      ? 'led-acrylic-photo-frames'
      : 'family-baby-frames';

    const visibility = frameStock?.categoryVisibility;
    const isEnabled = visibility ? (visibility[catSlug] !== undefined ? visibility[catSlug] : true) : true;

    if (!isEnabled) {
      return FRAME_FINISHES.filter((f) => f.id !== 'gold-frame' && f.id !== 'black-frame');
    }
    return FRAME_FINISHES;
  }, [activeCategoryObj, frameStock]);

  // Fallback if current finish is not available
  useEffect(() => {
    if (availableFinishes.length > 0 && !availableFinishes.some((f) => f.id === finish)) {
      setFinish(availableFinishes[0].id);
    }
  }, [availableFinishes, finish]);

  // Active LED Object
  const activeLedObj = useMemo(() => {
    return LED_OPTIONS.find((l) => l.id === led) || LED_OPTIONS[0];
  }, [led]);

  // Handle Orientation Switch
  const handleOrientationChange = (newOrient: ProductOrientation) => {
    setOrientation(newOrient);
    const newSizes = CALIBRATED_SIZES[newOrient] || CALIBRATED_SIZES.vertical;
    const popularSize = newSizes.find((s) => s.isPopular) || newSizes[0];
    setSelectedSizeId(popularSize.id);
  };

  // Handle Category Switch
  const handleCategoryChange = (newCat: FrameCategory) => {
    setCategory(newCat);
    const catObj = FRAME_CATEGORIES.find((c) => c.id === newCat);

    if (catObj?.hasLedDefault && led === 'none') {
      setLed('warm-white');
    }
  };

  // File Upload Handler
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFileError(null);
    const file = e.target.files?.[0];
    if (!file) return;

    const validTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/jpg'];
    if (!validTypes.includes(file.type)) {
      setFileError('Please select a valid image file (JPEG, PNG, or WebP).');
      return;
    }

    if (file.size > 15 * 1024 * 1024) {
      setFileError('File size is larger than 15MB. Please choose an image under 15MB.');
      return;
    }

    const reader = new FileReader();
    reader.onload = async () => {
      const resultData = reader.result as string;
      setPreviewImage(resultData);
      setIsUserUploaded(true);
      setZoomLevel(1.0);
      setRotation(0);
      setUploadedPhotoUrl(null);

      // Pre-upload in the background for instant WhatsApp sharing
      try {
        setWaUploading(true);
        const compressed = await compressImageToDataUrl(resultData);
        const res = await fetch('/api/upload-photo', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ image: compressed }),
        });
        const uploadRes = await res.json();
        const finalUrl = uploadRes?.cdnUrl || (uploadRes?.url ? `${window.location.origin}${uploadRes.url}` : null);
        if (finalUrl) {
          setUploadedPhotoUrl(finalUrl);
        }
      } catch (err) {
        console.warn('Pre-uploading photo failed:', err);
      } finally {
        setWaUploading(false);
      }
    };
    reader.onerror = () => {
      setFileError('Failed to read image file. Please try another image.');
    };
    reader.readAsDataURL(file);
  };

  // Load Preset from Gallery Card
  const handleApplyPreset = (preset: GalleryProductItem['preset'], presetTitle: string) => {
    setCategory(preset.category);
    setOrientation(preset.orientation);
    setSelectedSizeId(preset.sizeId);
    setFinish(preset.finish);
    setLed(preset.led);
    setCustomText(presetTitle);

    studioSectionRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  // Price Calculation Logic
  const pricing = useMemo(() => {
    let base = currentSizeObj.basePrice;
    let mrpBase = currentSizeObj.mrp;

    if (selectedSizeId === 'custom') {
      const activeSizesList = CALIBRATED_SIZES[orientation] || CALIBRATED_SIZES.vertical;
      const calc = calculateCustomDimensions(customWidth, customHeight, {
        variants: activeSizesList
          .filter((s) => s.id !== 'custom')
          .map((s) => ({ size: s.label, price: s.basePrice, mrp: s.mrp })),
      });
      base = calc.price;
      mrpBase = calc.mrp;
    }

    // Category multiplier
    const catMultiplier = activeCategoryObj.multiplier;
    const finishPrice = activeFinishObj.priceAddition;

    // LED addition
    let ledPrice = activeLedObj.priceAddition;
    if (category === 'led-backlit' && (led === 'warm-white' || led === 'cool-white')) {
      ledPrice = 0; // factored in multiplier
    } else if (category === 'led-backlit' && led === 'rgb') {
      ledPrice = 300;
    }

    const finalPrice = Math.round(base * catMultiplier + finishPrice + ledPrice);
    const finalMrp = Math.round(mrpBase * catMultiplier + finishPrice * 1.5 + ledPrice * 1.5);
    const discountPercent = Math.round(((finalMrp - finalPrice) / finalMrp) * 100);

    return {
      price: finalPrice,
      mrp: finalMrp,
      discountPercent: Math.max(15, discountPercent),
      baseSizePrice: base,
      finishPrice,
      ledPrice,
    };
  }, [
    currentSizeObj,
    selectedSizeId,
    customWidth,
    customHeight,
    orientation,
    activeCategoryObj,
    activeFinishObj,
    activeLedObj,
    category,
    led,
  ]);

  // Human-readable Size Label
  const displaySizeLabel = useMemo(() => {
    if (selectedSizeId === 'custom') {
      return `${customWidth} × ${customHeight} inches (Custom Size)`;
    }
    return `${currentSizeObj.label} (${currentSizeObj.dimensionsCm})`;
  }, [selectedSizeId, customWidth, customHeight, currentSizeObj]);

  // Dynamic WhatsApp Prefilled Inquiry URL & Photo Upload Handler
  const handleWhatsAppInquiry = async () => {
    let photoUrl = uploadedPhotoUrl;

    if (!photoUrl && previewImage) {
      if (previewImage.startsWith('data:')) {
        setWaUploading(true);
        try {
          const compressed = await compressImageToDataUrl(previewImage);
          const res = await fetch('/api/upload-photo', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ image: compressed }),
          });
          const uploadRes = await res.json();
          photoUrl = uploadRes?.cdnUrl || (uploadRes?.url ? `${window.location.origin}${uploadRes.url}` : null);
          if (photoUrl) setUploadedPhotoUrl(photoUrl);
        } catch (err) {
          console.warn('Uploading custom photo for WhatsApp failed:', err);
        } finally {
          setWaUploading(false);
        }
      } else {
        photoUrl = previewImage.startsWith('http')
          ? previewImage
          : `${window.location.origin}${previewImage.startsWith('/') ? '' : '/'}${previewImage}`;
      }
    }

    const details = [
      `Hi Abhi's Gifts! 🙏 I would like to order a Custom Photo Frame:`,
      `• *Category:* ${activeCategoryObj.name}`,
      `• *Orientation:* ${orientation.toUpperCase()}`,
      `• *Dimensions:* ${displaySizeLabel}`,
      `• *Finish:* ${activeFinishObj.name}`,
      `• *Lighting:* ${activeLedObj.name}`,
      customText ? `• *Inscription:* "${customText}"` : '',
      specialInstructions ? `• *Instructions:* "${specialInstructions}"` : '',
      `• *Auto-Calculated Price:* ₹${pricing.price.toLocaleString('en-IN')}`,
      photoUrl
        ? `\n📸 *Customer Uploaded Custom Photo Link:*\n${photoUrl}\n👉 *(Click link to view/download original high-res customer photo)*\n`
        : '',
      `Please confirm my proof and share payment & dispatch details. Thank you!`,
    ]
      .filter(Boolean)
      .join('\n');

    const cleanWa = (INITIAL_SETTINGS.whatsappNumber || '919032372782').replace(/[^0-9]/g, '');
    window.open(`https://wa.me/${cleanWa}?text=${encodeURIComponent(details)}`, '_blank');
  };

  // Add To Cart & Checkout
  const handleOrderNow = async () => {
    if (isSelectedFinishOutOfStock) {
      alert('The selected frame finish is currently Out of Stock. Please select an in-stock finish to proceed.');
      return;
    }
    let finalPreview = uploadedPhotoUrl || previewImage;
    if (!uploadedPhotoUrl && previewImage && previewImage.startsWith('data:')) {
      try {
        const compressed = await compressImageToDataUrl(previewImage);
        const res = await fetch('/api/upload-photo', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ image: compressed }),
        });
        const uploadRes = await res.json();
        const uploadedLink = uploadRes?.cdnUrl || (uploadRes?.url ? `${window.location.origin}${uploadRes.url}` : null);
        if (uploadedLink) {
          finalPreview = uploadedLink;
          setUploadedPhotoUrl(uploadedLink);
        }
      } catch (err) {
        console.warn('Pre-uploading customizer preview failed', err);
      }
    }
    addToCart(
      {
        productId: 'prod-custom-photo-acrylic-frame',
        slug: 'custom-personalised-photo-acrylic-wall-frame',
        title: `Custom ${activeCategoryObj.name} — ${displaySizeLabel}`,
        image: finalPreview,
        variantId: `custom-${orientation}-${selectedSizeId}-${finish}-${led}`,
        size: displaySizeLabel,
        finish: activeFinishObj.name,
        lighting: activeLedObj.name,
        shape: orientation === 'vertical' ? 'portrait' : orientation === 'horizontal' ? 'landscape' : orientation,
        unitPrice: pricing.price,
        unitMrp: pricing.mrp,
        quantity: 1,
        customization: {
          previewUrl: finalPreview,
          customText: customText.trim() || undefined,
          frameType: activeFinishObj.name,
          orientation,
          aspectRatio: orientation === 'vertical' ? '3:4' : orientation === 'horizontal' ? '4:3' : '1:1',
          specialInstructions: [
            `Category: ${activeCategoryObj.name}`,
            `Finish: ${activeFinishObj.name}`,
            `LED: ${activeLedObj.name}`,
            specialInstructions.trim() ? `Note: ${specialInstructions.trim()}` : '',
          ]
            .filter(Boolean)
            .join(' | '),
        },
      },
      false
    );

    closeCart();
    router.push('/checkout');
  };

  return (
    <div className="w-full bg-white text-stone-900 select-none">
      {/* =========================================================
          1. HERO SECTION: TURN YOUR PRECIOUS MEMORIES INTO TIMELESS ART
          ========================================================= */}
      <section className="relative overflow-hidden bg-gradient-to-b from-stone-50 via-white to-stone-50 text-stone-900 border-b border-stone-200 py-12 sm:py-16 lg:py-20">
        <div className="absolute -top-32 -right-32 w-96 h-96 bg-amber-200/30 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-32 -left-32 w-96 h-96 bg-[#FEE815]/15 rounded-full blur-3xl pointer-events-none" />

        <div className="w-full max-w-[1720px] mx-auto px-4 sm:px-6 lg:px-10 xl:px-14">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-10 lg:gap-14">
            {/* Left Hero Text */}
            <div className="space-y-5 max-w-3xl text-center lg:text-left">
              <div className="inline-flex items-center gap-2 text-xs uppercase tracking-widest font-bold text-stone-900 bg-white border border-amber-300 px-4 py-1.5 rounded-full shadow-xs">
                <Sparkles className="w-3.5 h-3.5 text-amber-600 animate-pulse" />
                <span>HYDERABAD&apos;S PREMIER CUSTOM PHOTO ATELIER</span>
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping ml-0.5" />
              </div>

              <h1 className="font-serif font-bold text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-stone-900 tracking-tight leading-[1.12]">
                Turn Your Precious Memories{' '}
                <span className="block mt-1 bg-gradient-to-r from-amber-700 via-amber-500 to-amber-800 bg-clip-text text-transparent italic font-serif">
                  Into Timeless Masterpieces
                </span>
              </h1>

              <p className="text-sm sm:text-base text-stone-600 leading-relaxed max-w-2xl font-sans mx-auto lg:mx-0">
                Design bespoke cast acrylic photo frames, illuminated warm LED backlights, and floating wall art with your cherished photographs. Handcrafted to heirloom perfection in our Hyderabad atelier.
              </p>

              {/* CTA Button */}
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 pt-2">
                <button
                  type="button"
                  onClick={() => studioSectionRef.current?.scrollIntoView({ behavior: 'smooth' })}
                  className="inline-flex items-center gap-2 bg-[#FEE815] hover:bg-[#FFF04B] text-stone-950 font-bold text-xs sm:text-sm px-8 py-3.5 rounded-full shadow-md hover:shadow-lg transition-all duration-300 group uppercase tracking-wider cursor-pointer"
                >
                  <span>Start Customizing</span>
                  <ArrowRight className="w-4 h-4 text-stone-950 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>

              {/* 4 Trust Micro-Pillars */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-3 text-[11px] font-bold text-stone-700">
                <div className="flex items-center gap-1.5 justify-center lg:justify-start">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  <span>Cast Optical Acrylic</span>
                </div>
                <div className="flex items-center gap-1.5 justify-center lg:justify-start">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  <span>Warm Halo Backlighting</span>
                </div>
                <div className="flex items-center gap-1.5 justify-center lg:justify-start">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  <span>1:1 WhatsApp Proof</span>
                </div>
                <div className="flex items-center gap-1.5 justify-center lg:justify-start">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  <span>Safe Courier Delivery</span>
                </div>
              </div>
            </div>

            {/* Right Hero Visual Showcase: 2 Luxury Real Product Mockup Cards */}
            <div className="w-full lg:w-auto shrink-0 max-w-md sm:max-w-lg grid grid-cols-2 gap-4 sm:gap-5">
              {/* Card 1: Couple & Wedding Vows Frame */}
              <div className="rounded-2xl overflow-hidden border border-amber-400/30 shadow-lg bg-stone-900 relative group aspect-[4/5] transition-all duration-300 hover:shadow-xl hover:border-amber-400/60">
                <img
                  src="/images/categories/circle-showcase/couple-wedding.jpg"
                  alt="Couple & Wedding Keepsake Acrylic Photo Frame"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-transparent to-transparent opacity-80" />
                <div className="absolute bottom-2.5 inset-x-2.5 bg-stone-950/85 backdrop-blur-md p-2.5 rounded-xl text-center border border-white/10">
                  <span className="text-[11px] sm:text-xs font-bold text-amber-300 block leading-tight">Couple & Wedding Frame</span>
                  <span className="text-[9px] sm:text-[10px] text-stone-300 mt-0.5 block">Premium Heirloom Keepsake</span>
                </div>
              </div>

              {/* Card 2: LED Backlit Photo Frame */}
              <div className="rounded-2xl overflow-hidden border border-amber-400/30 shadow-lg bg-stone-900 relative group aspect-[4/5] transition-all duration-300 hover:shadow-xl hover:border-amber-400/60">
                <img
                  src="/images/mockups/custom-led-backlit-acrylic-photo-frame/primary-square.jpg"
                  alt="LED Backlit Acrylic Photo Frame"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-transparent to-transparent opacity-80" />
                <div className="absolute bottom-2.5 inset-x-2.5 bg-stone-950/85 backdrop-blur-md p-2.5 rounded-xl text-center border border-white/10">
                  <span className="text-[11px] sm:text-xs font-bold text-amber-300 block leading-tight">LED Night-Glow</span>
                  <span className="text-[9px] sm:text-[10px] text-stone-300 mt-0.5 block">Warm Halo Backlighting</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>



      {/* =========================================================
          2. TWO-COLUMN INTERACTIVE DESIGNER STUDIO
          ========================================================= */}
      <section
        id="designer-studio"
        ref={studioSectionRef}
        className="w-full max-w-[1720px] mx-auto px-4 sm:px-6 lg:px-10 xl:px-14 py-10 sm:py-16"
      >
        {/* Studio Section Title */}
        <div className="text-center max-w-3xl mx-auto mb-10 space-y-2">
          <span className="text-xs uppercase tracking-widest font-bold text-amber-900 bg-amber-50 border border-amber-300 px-4 py-1.5 rounded-full inline-flex items-center gap-1.5 shadow-xs">
            <SlidersHorizontal className="w-3.5 h-3.5 text-amber-600" />
            <span>Interactive Customizer Studio</span>
          </span>
          <h2 className="font-serif font-bold text-2xl sm:text-3xl md:text-4xl text-stone-900">
            Craft Your Custom Acrylic &amp; LED Frame
          </h2>
          <p className="text-xs sm:text-sm text-stone-600">
            Choose orientation, category, dimensions, hardware finish, and ambient lighting with real-time 3D wall simulation.
          </p>
        </div>

        {/* Master 2-Column Split */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
          {/* =====================================================
              LEFT COLUMN: 3D WALL MOCKUP & LIVE PREVIEW (7 COLS)
              ===================================================== */}
          <div className="lg:col-span-7 xl:col-span-7 space-y-5 lg:sticky lg:top-24">
            <div className="bg-white rounded-3xl border border-stone-200 p-4 sm:p-6 shadow-sm space-y-4">
              {/* THE 3D FRAME STAGE (Natural Display Without Over Space) */}
              <div
                className="relative w-full aspect-square sm:aspect-[4/5] max-h-[560px] rounded-3xl overflow-hidden bg-gradient-to-b from-stone-100 via-stone-50 to-stone-100 border border-stone-200 transition-all duration-500 flex items-center justify-center p-3 sm:p-5 group shadow-xs"
              >
                {/* Radiating 360° LED Glow Halo */}
                {led !== 'none' && (
                  <div
                    className="absolute inset-2 pointer-events-none transition-all duration-700 rounded-3xl"
                    style={{
                      background: `radial-gradient(circle, ${activeLedObj.glowColor} 0%, rgba(214, 170, 85, 0.22) 45%, transparent 70%)`,
                      filter: 'blur(45px)',
                    }}
                  />
                )}

                {/* THE ADAPTIVE 3D ACRYLIC FRAME */}
                <div
                  onMouseEnter={() => setIsHovered(true)}
                  onMouseLeave={() => setIsHovered(false)}
                  className={`relative transition-all duration-500 group cursor-pointer z-20 flex items-center justify-center select-none w-full h-full ${
                    orientation === 'vertical'
                      ? 'max-w-[420px] max-h-[500px] aspect-[3/4]'
                      : orientation === 'horizontal'
                      ? 'max-w-[520px] max-h-[440px] aspect-[4/3]'
                      : 'max-w-[440px] max-h-[440px] aspect-square'
                  }`}
                  style={{
                    boxShadow:
                      led !== 'none'
                        ? `0 0 50px ${activeLedObj.glowColor}, 0 20px 45px rgba(0,0,0,0.3)`
                        : '0 16px 36px rgba(0,0,0,0.16), 0 4px 12px rgba(0,0,0,0.06)',
                  }}
                >
                  {/* Outer Frame Finish Container */}
                  <div
                    className={`relative w-full h-full overflow-hidden bg-stone-950 rounded-2xl transition-all duration-300 ${
                      finish === 'gold-frame'
                        ? 'border-[12px] sm:border-[16px] bg-gradient-to-tr from-[#8C6D23] via-[#E8CE6B] to-[#9E7B28] border-[#D4AF37] shadow-[0_16px_50px_rgba(212,175,55,0.45)] ring-2 ring-[#F7E089]/70'
                        : finish === 'black-frame'
                        ? 'border-[12px] sm:border-[16px] bg-gradient-to-b from-[#252528] via-[#141416] to-[#08080A] border-[#38383F] shadow-[0_16px_50px_rgba(0,0,0,0.85)] ring-1 ring-white/10'
                        : finish === 'wooden-box'
                        ? 'border-[12px] sm:border-[16px] border-[#3D2614] shadow-2xl ring-2 ring-[#24160B]'
                        : finish === 'transparent'
                        ? 'border-[10px] sm:border-[14px] border-white/40 backdrop-blur-md ring-1 ring-white/60'
                        : finish === 'premium-matte'
                        ? 'border-[6px] sm:border-[8px] border-stone-800/80 shadow-md ring-1 ring-stone-700'
                        : 'border-[3px] border-white/90 shadow-2xl ring-1 ring-white/60'
                    }`}
                  >
                    {/* Rendered Photograph */}
                    <div className="w-full h-full overflow-hidden flex items-center justify-center relative">
                      <img
                        src={previewImage}
                        alt="Custom Photo Live Preview"
                        className="w-full h-full object-cover transition-transform duration-300"
                        style={{
                          transform: `scale(${zoomLevel}) rotate(${rotation}deg)`,
                        }}
                      />

                      {/* Inscription Overlay (Bottom Plaque) */}
                      {customText.trim() && (
                        <div className="absolute bottom-3 inset-x-3 bg-gradient-to-t from-black/85 via-black/55 to-transparent p-2.5 rounded-b-xl text-center">
                          <p className="font-serif italic text-xs sm:text-sm text-[#FFD782] drop-shadow-[0_1px_3px_rgba(0,0,0,0.9)] font-bold tracking-wider truncate">
                            {customText.trim()}
                          </p>
                          <span className="text-[9px] uppercase tracking-widest text-[#E8D1A5] font-sans block mt-0.5">
                            ✦ Personalized Keepsake • Abhi's Gifts ✦
                          </span>
                        </div>
                      )}

                      {/* Metallic Stainless Steel Standoffs (When Standoff Finish is Selected) */}
                      {finish === 'floating-standoff' && (
                        <>
                          <div className="absolute top-3 left-3 w-4 h-4 rounded-full bg-gradient-to-br from-white via-stone-200 to-stone-500 shadow-md border border-stone-400 flex items-center justify-center">
                            <div className="w-1.5 h-1.5 rounded-full bg-stone-700" />
                          </div>
                          <div className="absolute top-3 right-3 w-4 h-4 rounded-full bg-gradient-to-br from-white via-stone-200 to-stone-500 shadow-md border border-stone-400 flex items-center justify-center">
                            <div className="w-1.5 h-1.5 rounded-full bg-stone-700" />
                          </div>
                          <div className="absolute bottom-3 left-3 w-4 h-4 rounded-full bg-gradient-to-br from-white via-stone-200 to-stone-500 shadow-md border border-stone-400 flex items-center justify-center">
                            <div className="w-1.5 h-1.5 rounded-full bg-stone-700" />
                          </div>
                          <div className="absolute bottom-3 right-3 w-4 h-4 rounded-full bg-gradient-to-br from-white via-stone-200 to-stone-500 shadow-md border border-stone-400 flex items-center justify-center">
                            <div className="w-1.5 h-1.5 rounded-full bg-stone-700" />
                          </div>
                        </>
                      )}

                      {/* Optical Glass Gloss Sweep */}
                      <div
                        className={`absolute inset-0 pointer-events-none transition-opacity duration-500 bg-gradient-to-tr from-transparent via-white/15 to-white/30 ${
                          isHovered ? 'opacity-100' : 'opacity-60'
                        }`}
                      />
                    </div>
                  </div>
                </div>

                {/* Bottom Floating Info Pill */}
                <div className="absolute bottom-3 left-3 z-30 bg-white/95 backdrop-blur-md px-3 py-1.5 rounded-full text-xs font-bold text-stone-900 border border-stone-200/90 shadow-sm flex items-center gap-2 max-w-[90%] truncate">
                  <Sparkles className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                  <span className="truncate">{activeCategoryObj.name}</span>
                  <span className="text-amber-500 shrink-0">•</span>
                  <span className="text-stone-700 font-medium shrink-0">{displaySizeLabel}</span>
                  {led !== 'none' && (
                    <span className="text-amber-700 font-semibold shrink-0">• {activeLedObj.temperature}</span>
                  )}
                </div>
              </div>

              {/* Photo Upload Drop Area */}
              <div className="bg-stone-50 p-4 rounded-2xl border border-stone-200 flex flex-col gap-3">
                {uploadProgress !== null && (
                  <div className="w-full space-y-1.5 pb-2 border-b border-stone-200">
                    <div className="flex justify-between text-xs font-bold text-stone-900">
                      <span>Optimizing image for cast Crystal Acrylic Printing...</span>
                      <span>{uploadProgress}%</span>
                    </div>
                    <div className="w-full h-2 bg-stone-200 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-amber-500 to-amber-600 transition-all duration-200"
                        style={{ width: `${uploadProgress}%` }}
                      />
                    </div>
                  </div>
                )}
                <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <div className="w-11 h-11 rounded-xl bg-amber-100 text-amber-800 border border-amber-300 flex items-center justify-center shrink-0 shadow-xs">
                      <Upload className="w-5 h-5 text-amber-700" />
                    </div>
                    <div>
                      <h4 className="font-bold text-xs sm:text-sm text-stone-900">
                        {isUserUploaded ? 'Your Custom Photograph Active' : 'Upload Your High-Resolution Photo'}
                      </h4>
                      <p className="text-[11px] text-stone-500">
                        Supports JPG, PNG, WebP up to 15MB • Precision color-calibrated
                      </p>
                    </div>
                  </div>

                  <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleFileUpload}
                    accept="image/jpeg,image/png,image/webp,image/jpg"
                    className="hidden"
                  />

                  <div className="flex items-center gap-2 w-full sm:w-auto">
                    <button
                      type="button"
                      onClick={() => fileInputRef.current?.click()}
                      className="flex-1 sm:flex-none bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-stone-950 font-bold px-5 py-2.5 rounded-xl text-xs shadow-xs transition-all whitespace-nowrap cursor-pointer uppercase tracking-wider"
                    >
                      {isUserUploaded ? 'Change Photo' : 'Choose Photo File'}
                    </button>

                    {isUserUploaded && (
                      <button
                        type="button"
                        onClick={() => {
                          setPreviewImage(SAMPLE_MEMORIES[0].image);
                          setIsUserUploaded(false);
                          setCustomText(SAMPLE_MEMORIES[0].defaultText);
                        }}
                        className="p-2.5 rounded-xl bg-white hover:bg-rose-50 text-stone-600 hover:text-rose-600 border border-stone-200 transition-colors cursor-pointer"
                        title="Reset to default photo"
                      >
                        <RotateCcw className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                </div>
              </div>

              {fileError && (
                <p className="text-xs text-rose-600 bg-rose-50 p-2.5 rounded-xl border border-rose-200">
                  {fileError}
                </p>
              )}

              {/* Natural Specifications Section (as done on product pages) */}
              <div className="bg-white rounded-2xl border border-stone-200 p-4 sm:p-5 space-y-3 shadow-2xs">
                <div className="flex items-center justify-between border-b border-stone-100 pb-2.5">
                  <h4 className="font-serif font-bold text-sm text-stone-900 flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-amber-600" />
                    <span>Product Specifications</span>
                  </h4>
                  <span className="text-[10px] font-bold text-amber-900 bg-amber-50 border border-amber-300 px-2.5 py-0.5 rounded-full">
                    Museum Grade
                  </span>
                </div>

                <div className="divide-y divide-stone-100 text-xs">
                  <div className="grid grid-cols-3 py-2.5">
                    <span className="font-semibold text-stone-900 col-span-1">Material</span>
                    <span className="text-stone-600 col-span-2">Cast Optical Acrylic (Crystal Clarity, UV-Resistant)</span>
                  </div>
                  <div className="grid grid-cols-3 py-2.5">
                    <span className="font-semibold text-stone-900 col-span-1">Dimensions</span>
                    <span className="text-stone-800 font-medium col-span-2">{displaySizeLabel}</span>
                  </div>
                  <div className="grid grid-cols-3 py-2.5">
                    <span className="font-semibold text-stone-900 col-span-1">Frame Finish</span>
                    <span className="text-stone-800 font-medium col-span-2">{activeFinishObj.name}</span>
                  </div>
                  <div className="grid grid-cols-3 py-2.5">
                    <span className="font-semibold text-stone-900 col-span-1">Illumination</span>
                    <span className="text-stone-800 font-medium col-span-2">
                      {led !== 'none' ? `${activeLedObj.name} (${activeLedObj.temperature})` : 'Unlit Museum Print'}
                    </span>
                  </div>
                  <div className="grid grid-cols-3 py-2.5">
                    <span className="font-semibold text-stone-900 col-span-1">Print Process</span>
                    <span className="text-stone-600 col-span-2">Sub-Surface UV 2400 DPI with Diamond Beveled Edge</span>
                  </div>
                  <div className="grid grid-cols-3 py-2.5">
                    <span className="font-semibold text-stone-900 col-span-1">Craftsmanship</span>
                    <span className="text-stone-600 col-span-2">Handcrafted in Hyderabad • 1:1 WhatsApp Proof Before Dispatch</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* =====================================================
              RIGHT COLUMN: COMPREHENSIVE CUSTOMIZATION CONTROLS (5 COLS)
              ===================================================== */}
          <div className="lg:col-span-5 xl:col-span-5 bg-white p-6 sm:p-7 rounded-3xl border border-stone-200 shadow-sm space-y-6">
            {/* Step 1: Select Frame Category */}
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-wider text-stone-900 flex items-center justify-between">
                <span>Step 1: Select Frame Category</span>
                <span className="text-[10px] text-amber-700 font-semibold">3 Curated Styles</span>
              </label>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                {FRAME_CATEGORIES.map((cat) => {
                  const isSelected = category === cat.id;
                  return (
                    <button
                      key={cat.id}
                      type="button"
                      onClick={() => handleCategoryChange(cat.id)}
                      className={`p-2.5 rounded-xl border text-left transition-all cursor-pointer flex flex-col justify-between ${
                        isSelected
                          ? 'border-amber-500 bg-amber-50/70 ring-1 ring-amber-400 shadow-xs'
                          : 'border-stone-200 bg-white hover:border-amber-300'
                      }`}
                    >
                      <div>
                        <span className="text-[9px] font-bold uppercase tracking-wider text-stone-700 bg-stone-100 border border-stone-200 px-1.5 py-0.5 rounded">
                          {cat.badge}
                        </span>
                        <div className="font-serif font-bold text-xs text-stone-900 mt-1 leading-snug">
                          {cat.name.replace(' Photo Frames', '')}
                        </div>
                      </div>
                      <span className="text-[10px] text-stone-500 mt-1">{cat.subtitle}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Step 2: Select Frame Size */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label className="text-xs font-bold uppercase tracking-wider text-stone-900">
                  Step 2: Select Frame Dimensions
                </label>
                <span className="text-[11px] text-amber-700 font-semibold">{displaySizeLabel}</span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {sizeList.map((sz) => {
                  const isSelected = selectedSizeId === sz.id;
                  const itemPrice = Math.round(sz.basePrice * activeCategoryObj.multiplier);
                  return (
                    <button
                      key={sz.id}
                      type="button"
                      onClick={() => setSelectedSizeId(sz.id)}
                      className={`p-2.5 sm:p-3 min-h-[50px] rounded-xl border text-left transition-all cursor-pointer flex flex-col justify-between ${
                        isSelected
                          ? 'border-amber-500 bg-amber-50 text-stone-900 font-bold ring-1 ring-amber-400'
                          : 'border-stone-200 text-stone-600 hover:border-amber-300 bg-white'
                      }`}
                    >
                      <div className="text-xs font-bold text-stone-900 flex items-center justify-between">
                        <span>{sz.label}</span>
                        {sz.isPopular && (
                          <span className="text-[8px] bg-amber-100 text-amber-800 px-1 py-0.5 rounded font-bold">
                            Popular
                          </span>
                        )}
                      </div>
                      <div className="text-[11px] text-amber-700 font-semibold mt-0.5">
                        {sz.id === 'custom' ? 'Custom Inch Calculator' : `From ₹${itemPrice.toLocaleString('en-IN')}`}
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* Custom Size Interactive Input Fields */}
              {selectedSizeId === 'custom' && (
                <div className="p-3 bg-stone-50 rounded-xl border border-amber-400 space-y-2 animate-in fade-in duration-200">
                  <div className="bg-amber-50 border border-amber-300 rounded-lg p-2.5 flex items-center justify-between gap-2 text-xs">
                    <div className="flex items-center gap-1.5">
                      <Sparkles className="w-4 h-4 text-amber-600 shrink-0" />
                      <span className="text-amber-950 font-bold">Auto-Calculated Custom Size Price:</span>
                    </div>
                    <span className="font-serif font-bold text-sm text-stone-900">
                      ₹{pricing.price.toLocaleString('en-IN')}
                    </span>
                  </div>
                  <span className="text-[11px] font-bold text-stone-900 block">
                    Enter Custom Dimensions (in inches):
                  </span>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="text-[10px] text-stone-600 block mb-1">Width (inches)</label>
                      <input
                        type="number"
                        min={12}
                        max={60}
                        value={customWidth}
                        onChange={(e) => setCustomWidth(Math.max(12, Math.min(60, Number(e.target.value) || 12)))}
                        className="w-full px-3 py-1.5 text-xs bg-white border border-stone-300 rounded-lg text-stone-900 outline-none font-bold focus:border-amber-500"
                      />
                    </div>
                    <div>
                      <label className="text-[10px] text-stone-600 block mb-1">Height (inches)</label>
                      <input
                        type="number"
                        min={12}
                        max={60}
                        value={customHeight}
                        onChange={(e) => setCustomHeight(Math.max(12, Math.min(60, Number(e.target.value) || 12)))}
                        className="w-full px-3 py-1.5 text-xs bg-white border border-stone-300 rounded-lg text-stone-900 outline-none font-bold focus:border-amber-500"
                      />
                    </div>
                  </div>
                  <p className="text-[10px] text-stone-500">
                    ✦ Custom size available strictly from 12 to 60 inches (1 to 5 feet) with pre-installed heavy-duty mounts.
                  </p>
                </div>
              )}
            </div>

            {/* Step 3: Frame Edge & Mounting Finish */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label className="text-xs font-bold uppercase tracking-wider text-stone-900">
                  Step 3: Select Mounting &amp; Finish
                </label>
                <span className="text-[11px] text-amber-700 font-semibold">{activeFinishObj.name}</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {availableFinishes.map((f) => {
                  const isSelected = finish === f.id;
                  return (
                    <button
                      key={f.id}
                      type="button"
                      onClick={() => setFinish(f.id)}
                      className={`p-2.5 rounded-xl border text-left transition-all cursor-pointer flex flex-col justify-between ${
                        isSelected
                          ? 'border-amber-500 bg-amber-50/70 ring-1 ring-amber-400 shadow-xs'
                          : 'border-stone-200 bg-white hover:border-amber-300'
                      }`}
                    >
                      <div>
                        <div className="text-xs font-bold text-stone-900">{f.name}</div>
                        <div className="text-[10px] text-stone-500 mt-0.5">{f.subtitle}</div>
                      </div>
                      <div className="text-[11px] text-amber-700 font-semibold mt-1">
                        {f.priceAddition === 0 ? 'Standard Included' : `+₹${f.priceAddition}`}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Step 4: LED Backlighting Option */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label className="text-xs font-bold uppercase tracking-wider text-stone-900">
                  Step 4: Select LED Illumination
                </label>
                <span className="text-[11px] text-amber-700 font-semibold">{activeLedObj.temperature}</span>
              </div>

              <div className="grid grid-cols-2 gap-2">
                {LED_OPTIONS.map((l) => {
                  const isSelected = led === l.id;
                  return (
                    <button
                      key={l.id}
                      type="button"
                      onClick={() => setLed(l.id)}
                      className={`p-2.5 rounded-xl border text-left transition-all cursor-pointer flex flex-col justify-between ${
                        isSelected
                          ? 'border-amber-500 bg-amber-50/70 ring-1 ring-amber-400 shadow-xs'
                          : 'border-stone-200 bg-white hover:border-amber-300'
                      }`}
                    >
                      <div>
                        <div className="text-xs font-bold text-stone-900 flex items-center gap-1.5">
                          {l.id !== 'none' && (
                            <span
                              className="w-2.5 h-2.5 rounded-full inline-block shadow-xs"
                              style={{ backgroundColor: l.glowColor }}
                            />
                          )}
                          <span>{l.name}</span>
                        </div>
                        <div className="text-[10px] text-stone-500 mt-0.5">{l.subtitle}</div>
                      </div>
                      <div className="text-[11px] text-amber-700 font-semibold mt-1">
                        {l.id === 'none'
                          ? 'Unlit'
                          : category === 'led-backlit'
                          ? l.id === 'rgb'
                            ? '+₹300'
                            : 'Included in LED Frame'
                          : `+₹${l.priceAddition}`}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Step 5: Personal Inscription */}
            <div className="space-y-1">
              <label className="text-xs font-bold uppercase tracking-wider text-stone-900 block">
                Step 5: Add Inscription or Message (Optional)
              </label>
              <input
                type="text"
                placeholder="e.g. Forever & Always • Rahul & Ananya"
                value={customText}
                onChange={(e) => setCustomText(e.target.value)}
                maxLength={60}
                className="w-full px-3.5 py-2.5 text-xs bg-white border border-stone-300 rounded-xl outline-none focus:border-amber-500 text-stone-900 font-serif"
              />
              <span className="text-[10px] text-stone-500 block">
                ✦ Displayed in golden foil script or crisp typography at the base of the frame.
              </span>
            </div>

            {/* =====================================================
                PRICING SUMMARY & ORDER CARD
                ===================================================== */}
            <div className="bg-stone-50 p-4 sm:p-5 rounded-2xl border border-stone-200 space-y-3">
              <div className="flex items-baseline justify-between border-b border-stone-200 pb-2.5">
                <div>
                  <span className="text-xs text-stone-500 block">Step 6: Live Price &amp; Configuration Review</span>
                  <div className="flex items-baseline gap-2">
                    <span className="font-serif text-2xl sm:text-3xl font-bold text-stone-900">
                      ₹{pricing.price.toLocaleString('en-IN')}
                    </span>
                    <span className="text-xs text-stone-400 line-through">
                      ₹{pricing.mrp.toLocaleString('en-IN')}
                    </span>
                  </div>
                </div>
                <span className="text-xs font-bold text-amber-900 bg-amber-100 border border-amber-300 px-2.5 py-1 rounded-full shadow-xs">
                  Save {pricing.discountPercent}%
                </span>
              </div>

              <div className="text-[11px] text-stone-600 space-y-1">
                <div className="flex justify-between">
                  <span>Configuration:</span>
                  <span className="font-semibold text-stone-900">{displaySizeLabel}</span>
                </div>
                <div className="flex justify-between">
                  <span>Hardware &amp; Finish:</span>
                  <span className="font-semibold text-stone-900">{activeFinishObj.name}</span>
                </div>
                <div className="flex justify-between text-emerald-700 font-semibold pt-1 border-t border-stone-200">
                  <span>Packaging &amp; Delivery:</span>
                  <span>Multi-Layer Reinforced Box</span>
                </div>
              </div>

              
              {isSelectedFinishOutOfStock && (
                <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-xs font-semibold flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
                  <span>The selected frame finish is Out of Stock. Please choose an in-stock finish to proceed.</span>
                </div>
              )}
              {/* Action Buttons */}
              <div className="space-y-2 pt-2">
                <button
                  type="button"
                  onClick={handleOrderNow}
                  className="w-full bg-gradient-to-r from-amber-400 via-amber-500 to-amber-600 hover:from-amber-300 hover:to-amber-500 text-stone-950 font-bold py-3.5 rounded-xl text-sm shadow-md transition-all cursor-pointer flex items-center justify-center gap-2 uppercase tracking-wider"
                >
                  <span>{isSelectedFinishOutOfStock ? 'Frame Finish Out of Stock' : `Order Now • ₹${pricing.price.toLocaleString('en-IN')}`}</span>
                  <ArrowRight className="w-4 h-4 text-stone-950" />
                </button>

                <button
                  type="button"
                  onClick={handleWhatsAppInquiry}
                  disabled={waUploading}
                  className="w-full bg-[#FEE815]/20 hover:bg-[#FEE815]/35 text-stone-950 border border-[#FEE815] py-2.5 rounded-xl font-bold text-xs shadow-xs transition-all cursor-pointer flex items-center justify-center gap-2 disabled:opacity-60"
                >
                  {waUploading ? (
                    <>
                      <div className="w-4 h-4 border-2 border-stone-900 border-t-transparent rounded-full animate-spin" />
                      <span>Uploading Photo for WhatsApp...</span>
                    </>
                  ) : (
                    <>
                      <MessageCircle className="w-4 h-4 fill-stone-950 text-stone-950" />
                      <span>Order or Inquire via WhatsApp • ₹{pricing.price.toLocaleString('en-IN')}</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================
          3. PRODUCT GALLERY: 8 CURATED CUSTOM PHOTO FRAME PRESETS
          ========================================================= */}
      <section id="custom-gallery" className="w-full max-w-[1720px] mx-auto px-4 sm:px-6 lg:px-10 xl:px-14 py-12 sm:py-16 border-t border-stone-200">
        <div className="text-center max-w-3xl mx-auto mb-10 space-y-2">
          <span className="text-xs uppercase tracking-widest font-bold text-amber-900 bg-amber-50 border border-amber-300 px-4 py-1.5 rounded-full inline-flex items-center gap-1.5 shadow-xs">
            <Layers className="w-3.5 h-3.5 text-amber-600" />
            <span>Dedicated Photo Frame Collections</span>
          </span>
          <h2 className="font-serif font-bold text-2xl sm:text-3xl md:text-4xl text-stone-900">
            Explore Custom Photo Frame Creations
          </h2>
          <p className="text-xs sm:text-sm text-stone-600">
            Every style is hand-crafted in our Hyderabad workshop. Click "Customize This Style" to load any configuration directly into the designer above.
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6">
          {GALLERY_PRODUCTS.map((prod) => (
            <div
              key={prod.id}
              className="bg-white rounded-3xl overflow-hidden border border-stone-200 hover:border-amber-400 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col justify-between group"
            >
              <div>
                <div className="relative aspect-square w-full overflow-hidden bg-stone-100">
                  <img
                    src={prod.image}
                    alt={prod.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-3 left-3 bg-stone-900/80 text-white text-[10px] font-bold px-2.5 py-0.5 rounded-full shadow-sm backdrop-blur-xs border border-white/10">
                    {prod.badge}
                  </div>
                  <div className="absolute bottom-3 right-3 bg-white/95 text-stone-900 text-xs font-bold px-2.5 py-1 rounded-full shadow-sm border border-stone-200">
                    From ₹{prod.startingPrice.toLocaleString('en-IN')}
                  </div>
                </div>

                <div className="p-5 space-y-2">
                  <div className="flex items-center justify-between text-[11px] font-bold text-amber-700">
                    <span>{prod.category}</span>
                    <span className="text-stone-400 line-through">₹{prod.mrp.toLocaleString('en-IN')}</span>
                  </div>
                  <h3 className="font-serif font-bold text-base text-stone-900 group-hover:text-amber-700 transition-colors leading-snug">
                    {prod.title}
                  </h3>
                  <p className="text-xs text-stone-600 leading-relaxed line-clamp-2">
                    {prod.description}
                  </p>
                </div>
              </div>

              <div className="p-5 pt-0">
                <button
                  type="button"
                  onClick={() => handleApplyPreset(prod.preset, prod.title)}
                  className="w-full bg-stone-100 hover:bg-amber-500 hover:text-stone-950 text-stone-900 border border-stone-200 hover:border-amber-500 font-bold text-xs py-2.5 rounded-xl transition-all flex items-center justify-center gap-2 cursor-pointer uppercase tracking-wider group-hover:shadow-xs"
                >
                  <span>Customize This Style</span>
                  <ArrowRight className="w-3.5 h-3.5 text-amber-700 group-hover:text-stone-950" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* =========================================================
          4. HOW IT WORKS: 4 SIMPLE STEPS TO CUSTOM HEIRLOOM
          ========================================================= */}
      <section className="w-full bg-stone-100/70 border-y border-stone-200 py-12 sm:py-16">
        <div className="w-full max-w-[1720px] mx-auto px-4 sm:px-6 lg:px-10 xl:px-14">
          <div className="text-center max-w-2xl mx-auto mb-10 space-y-2">
            <span className="text-xs uppercase tracking-widest font-bold text-amber-900 bg-white border border-amber-300 px-4 py-1.5 rounded-full inline-flex items-center gap-1.5 shadow-xs">
              <Clock className="w-3.5 h-3.5 text-amber-600" />
              <span>Effortless Fabrication</span>
            </span>
            <h2 className="font-serif font-bold text-2xl sm:text-3xl md:text-4xl text-stone-900">
              How It Works: 4 Simple Steps
            </h2>
            <p className="text-xs sm:text-sm text-stone-600">
              From digital concept to factory-direct door delivery in four seamless steps.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {/* Step 1 */}
            <div className="bg-white p-6 rounded-3xl border border-stone-200 shadow-xs hover:border-amber-400 transition-all space-y-3">
              <div className="w-10 h-10 rounded-2xl bg-amber-50 text-amber-800 border border-amber-200 font-serif font-bold text-base flex items-center justify-center shadow-xs">
                01
              </div>
              <h3 className="font-serif font-bold text-base text-stone-900">
                Choose Format &amp; Style
              </h3>
              <p className="text-xs text-stone-600 leading-relaxed">
                Select your preferred orientation (portrait, landscape, square), category, dimensions, and warm LED backlight.
              </p>
              <div className="text-[11px] font-bold text-amber-700 flex items-center gap-1 pt-1">
                <Check className="w-3.5 h-3.5 text-emerald-600" />
                <span>3 Core Frame Styles</span>
              </div>
            </div>

            {/* Step 2 */}
            <div className="bg-white p-6 rounded-3xl border border-stone-200 shadow-xs hover:border-amber-400 transition-all space-y-3">
              <div className="w-10 h-10 rounded-2xl bg-amber-100 text-amber-900 font-serif font-bold text-base flex items-center justify-center shadow-xs">
                02
              </div>
              <h3 className="font-serif font-bold text-base text-stone-900">
                Upload Your Memory
              </h3>
              <p className="text-xs text-stone-600 leading-relaxed">
                Upload your favorite photograph from your phone or desktop. View an instant real-time 3D simulation on realistic wall backgrounds.
              </p>
              <div className="text-[11px] font-bold text-amber-700 flex items-center gap-1 pt-1">
                <Check className="w-3.5 h-3.5 text-emerald-600" />
                <span>Instant 3D Preview</span>
              </div>
            </div>

            {/* Step 3 */}
            <div className="bg-white p-6 rounded-3xl border border-stone-200 shadow-xs hover:border-amber-400 transition-all space-y-3">
              <div className="w-10 h-10 rounded-2xl bg-amber-50 text-amber-800 border border-amber-200 font-serif font-bold text-base flex items-center justify-center shadow-xs">
                03
              </div>
              <h3 className="font-serif font-bold text-base text-stone-900">
                Preview &amp; Approve
              </h3>
              <p className="text-xs text-stone-600 leading-relaxed">
                Review your customized frame design. Our master artisans check image resolution, enhance color vibrancy, and share a 1:1 WhatsApp proof.
              </p>
              <div className="text-[11px] font-bold text-amber-700 flex items-center gap-1 pt-1">
                <Check className="w-3.5 h-3.5 text-emerald-600" />
                <span>100% Visual Sign-Off</span>
              </div>
            </div>

            {/* Step 4 */}
            <div className="bg-white p-6 rounded-3xl border border-stone-200 shadow-xs hover:border-amber-400 transition-all space-y-3">
              <div className="w-10 h-10 rounded-2xl bg-emerald-100 text-emerald-900 font-serif font-bold text-base flex items-center justify-center shadow-xs">
                04
              </div>
              <h3 className="font-serif font-bold text-base text-stone-900">
                Fabricate &amp; Deliver
              </h3>
              <p className="text-xs text-stone-600 leading-relaxed">
                Precision fabricated with cast acrylic and hardware. Packed in multi-layer reinforced packaging with safe door delivery.
              </p>
              <div className="text-[11px] font-bold text-amber-700 flex items-center gap-1 pt-1">
                <Check className="w-3.5 h-3.5 text-emerald-600" />
                <span>Protective Packaging</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================
          5. CUSTOMER SUPPORT & ARTISAN CONCIERGE BANNER
          ========================================================= */}
      <section className="w-full max-w-[1720px] mx-auto px-4 sm:px-6 lg:px-10 xl:px-14 py-12 sm:py-16">
        <div className="p-8 sm:p-10 rounded-3xl bg-gradient-to-r from-amber-50 via-white to-amber-50 text-stone-900 flex flex-col lg:flex-row items-center justify-between gap-8 border-2 border-amber-300 shadow-sm">
          <div className="space-y-2 text-center lg:text-left max-w-2xl">
            <span className="text-[11px] uppercase tracking-widest font-bold text-amber-900 bg-amber-100 px-3 py-1 rounded-full border border-amber-300 inline-block">
              ✦ Artisan Concierge • Hyderabad Workshop ✦
            </span>
            <h3 className="font-serif font-bold text-2xl sm:text-3xl text-stone-900">
              Need Help? Chat With Our Artisans
            </h3>
            <p className="text-xs sm:text-sm text-stone-600 leading-relaxed font-sans">
              Have a low-resolution photo, custom wall dimensions, wedding vows script, or urgent express delivery requirement? Talk directly to our workshop artisans for instant proofing and advice.
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3 shrink-0">
            <button
              type="button"
              onClick={handleWhatsAppInquiry}
              disabled={waUploading}
              className="bg-[#FEE815] hover:bg-[#FFF04B] text-black font-extrabold text-xs sm:text-sm px-7 py-3.5 rounded-full shadow-md hover:shadow-[#FEE815]/30 transition-all flex items-center gap-2 uppercase tracking-wider cursor-pointer disabled:opacity-60"
            >
              {waUploading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  <span>Uploading Photo...</span>
                </>
              ) : (
                <>
                  <MessageCircle className="w-4 h-4 text-white fill-current" />
                  <span>Chat on WhatsApp</span>
                </>
              )}
            </button>

            <a
              href="tel:919032372782"
              className="bg-white hover:bg-stone-50 text-stone-900 border border-stone-300 font-bold text-xs sm:text-sm px-6 py-3.5 rounded-full transition-colors flex items-center gap-2 uppercase tracking-wider shadow-xs"
            >
              <PhoneCall className="w-4 h-4 text-amber-600" />
              <span>Call +91 90323 72782</span>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
