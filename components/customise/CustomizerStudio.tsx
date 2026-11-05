'use client';

import React, { useState, useRef, useMemo } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import {
  Upload,
  Sparkles,
  ShieldCheck,
  Check,
  ZoomIn,
  ZoomOut,
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
  PhoneCall,
  Clock,
  Palette,
  Maximize2,
  ChevronDown,
} from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { ProductOrientation } from '@/types';
import { INITIAL_SETTINGS } from '@/lib/data/settings';

// =========================================================================
// TYPES & CONFIGURATION
// =========================================================================

export type FrameCategory =
  | 'normal-acrylic'
  | 'led-backlit'
  | 'customized'
  | 'luxury-acrylic'
  | 'wooden'
  | 'round-acrylic';

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
  | 'crystal-gloss'
  | 'transparent'
  | 'premium-matte'
  | 'floating-standoff'
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
    subtitle: 'warm Halo Illumination',
    description: 'Concealed Epistar warm golden perimeter LEDs casting a serene halo around your sacred memory or family portrait.',
    multiplier: 1.35,
    hasLedDefault: true,
  },
  {
    id: 'customized',
    name: 'Customized Photo Frames',
    badge: 'Heirloom Inscribed',
    subtitle: 'Golden Script & Vows',
    description: 'Personalized with wedding dates, family surnames, temple mantras, or baby birth details in golden foil.',
    multiplier: 1.15,
    hasLedDefault: false,
  },
  {
    id: 'luxury-acrylic',
    name: 'Luxury Acrylic Frames',
    badge: 'Artisan Exclusive',
    subtitle: '5mm Double-Thick Bevel',
    description: 'Heavy 5mm museum-grade cast acrylic with heavy brushed gold/champagne standoffs and maximum depth.',
    multiplier: 1.25,
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
    name: 'Transparent Acrylic',
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
    name: 'Wooden Box Finish',
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
    temperature: 'Warm Ambient',
    priceAddition: 600,
    glowColor: 'rgba(255, 195, 75, 0.75)',
  },
  {
    id: 'cool-white',
    name: 'Cool White LED (6500K)',
    subtitle: 'Modern Crisp Ambient Halo',
    temperature: '6500K',
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
    id: 'wedding',
    name: 'Wedding Caricature',
    tag: 'Animated Couple',
    image: '/images/custom-art/cartoon-wedding-couple.svg',
    defaultText: 'The Sharma Family • Consecrated 2026',
  },
  {
    id: 'family',
    name: 'Family Heirloom',
    tag: 'Cartoon Family',
    image: '/images/custom-art/cartoon-family-portrait.svg',
    defaultText: 'The Kulkarni Residence • Est. 1998',
  },
  {
    id: 'newborn',
    name: 'Baby Milestone',
    tag: 'Cute Animated',
    image: '/images/custom-art/cartoon-baby-milestone.svg',
    defaultText: 'Aarav • Born August 14, 2026',
  },
  {
    id: 'nightglow',
    name: 'Night-Glow Glow',
    tag: 'Starlight Romance',
    image: '/images/custom-art/cartoon-couple-nightglow.svg',
    defaultText: 'Under The Stars • Eternal Glow',
  },
  {
    id: 'devotional',
    name: 'Sacred Mandir',
    tag: 'Stylized Ganesha',
    image: '/images/custom-art/cartoon-sacred-ganesha.svg',
    defaultText: 'Om Gam Ganapataye Namaha • Shubh Labh',
  },
];

export const GALLERY_PRODUCTS: GalleryProductItem[] = [
  {
    id: 'gal-wedding',
    title: 'Personalized Wedding Caricature Acrylic Frame',
    subtitle: 'Vows & Marriage Animated Couple Keepsake',
    category: 'Wedding Caricature',
    image: '/images/custom-art/cartoon-wedding-couple.svg',
    startingPrice: 2499,
    mrp: 4499,
    badge: 'Most Popular for Couples',
    description: 'Celebrate sacred vows with charming 3D animated wedding couple caricatures, golden foil surname script, and floating wall studs.',
    preset: {
      category: 'customized',
      orientation: 'vertical',
      finish: 'floating-standoff',
      led: 'warm-white',
      sizeId: '12x18',
    },
  },
  {
    id: 'gal-family',
    title: 'Animated Family Portrait Heirloom Frame',
    subtitle: 'Multi-Generation Cartoon Heritage Display',
    category: 'Family Wall Decor',
    image: '/images/custom-art/cartoon-family-portrait.svg',
    startingPrice: 2299,
    mrp: 4199,
    badge: 'Housewarming Gift',
    description: 'Turn your family portrait into a joyful animated cartoon centerpiece with ultra-crisp archival pigments and scratch-resistant gloss shield.',
    preset: {
      category: 'luxury-acrylic',
      orientation: 'horizontal',
      finish: 'floating-standoff',
      led: 'warm-white',
      sizeId: '18x12',
    },
  },
  {
    id: 'gal-couple',
    title: 'Romantic Candid Couple Floating Acrylic Frame',
    subtitle: 'Cute Illustrated Keepsake Art',
    category: 'Couple Portrait',
    image: '/images/custom-art/cartoon-candid-couple.svg',
    startingPrice: 1499,
    mrp: 2999,
    badge: 'Sleek & Frameless',
    description: 'Heartwarming animated couple illustration that appears to float 1 inch off your bedroom wall with brushed chrome hardware.',
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
    title: 'Baby Memory Milestone Cartoon Acrylic Keepsake',
    subtitle: 'Newborn Smiles & Birth Statistics',
    category: 'Baby Keepsake',
    image: '/images/custom-art/cartoon-baby-milestone.svg',
    startingPrice: 1699,
    mrp: 3199,
    badge: 'Newborn Milestone',
    description: 'Preserve tiny hands, first birthdays, and baby memories in whimsical storybook cartoon illustrations on shatterproof acrylic.',
    preset: {
      category: 'customized',
      orientation: 'square',
      finish: 'crystal-gloss',
      led: 'none',
      sizeId: '12x12',
    },
  },
  {
    id: 'gal-birthday',
    title: 'Birthday Celebration Cartoon Photo Frame',
    subtitle: 'Festive Cake, Balloons & Party Fun',
    category: 'Celebration Gift',
    image: '/images/custom-art/cartoon-birthday-celebration.svg',
    startingPrice: 1399,
    mrp: 2699,
    badge: 'Joyful Milestone',
    description: 'Vibrant party cartoon artwork with personalized birthday wishes, ideal for landmark 1st, 18th, 25th, or 50th celebrations.',
    preset: {
      category: 'normal-acrylic',
      orientation: 'square',
      finish: 'crystal-gloss',
      led: 'none',
      sizeId: '10x10',
    },
  },
  {
    id: 'gal-led',
    title: 'LED Night Glow Backlit Animated Frame',
    subtitle: 'Warm Golden Halo Romance',
    category: 'Illuminated Frame',
    image: '/images/custom-art/cartoon-couple-nightglow.svg',
    startingPrice: 2499,
    mrp: 4799,
    badge: 'High-Efficiency LEDs',
    description: 'Concealed low-voltage 12V BIS certified warm backlighting turns your romantic starlight cartoon couple into a glowing bedside sanctuary.',
    preset: {
      category: 'led-backlit',
      orientation: 'vertical',
      finish: 'floating-standoff',
      led: 'warm-white',
      sizeId: '12x18',
    },
  },
  {
    id: 'gal-anniversary',
    title: 'Silver & Golden Jubilee Script Frame',
    subtitle: 'Anniversary Milestones & Vows Caricature',
    category: 'Anniversary Keepsake',
    image: '/images/custom-art/cartoon-anniversary-golden.svg',
    startingPrice: 2799,
    mrp: 5199,
    badge: 'Golden Script',
    description: 'Commemorate 25th and 50th wedding milestones with heartwarming animated couple caricatures and real gold leaf foil script.',
    preset: {
      category: 'luxury-acrylic',
      orientation: 'horizontal',
      finish: 'floating-standoff',
      led: 'warm-white',
      sizeId: '18x12',
    },
  },
  {
    id: 'gal-devotional',
    title: 'Religious & Devotional Stylized Mandir Frame',
    subtitle: 'Sacred Deities & Pooja Sanctum Blessings',
    category: 'Devotional Wall Art',
    image: '/images/custom-art/cartoon-sacred-ganesha.svg',
    startingPrice: 2899,
    mrp: 5499,
    badge: 'Pooja Sanctum Decor',
    description: 'Consecrate your pooja mandir with stylized 3D divine Lord Ganesha animated artwork and warm glowing diya lamps in backlit acrylic.',
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
  const [led, setLed] = useState<LedOption>('warm-white');
  const [customText, setCustomText] = useState<string>('The Sharma Family • Consecrated 2026');
  const [specialInstructions, setSpecialInstructions] = useState<string>('');

  // Interactive Live Preview Controls
  const [previewImage, setPreviewImage] = useState<string>(SAMPLE_MEMORIES[0].image);
  const [isUserUploaded, setIsUserUploaded] = useState<boolean>(false);
  const [zoomLevel, setZoomLevel] = useState<number>(1.0);
  const [rotation, setRotation] = useState<number>(0);
  const [wallMode, setWallMode] = useState<'ivory' | 'night' | 'studio'>('ivory');
  const [fileError, setFileError] = useState<string | null>(null);
  const [uploadProgress, setUploadProgress] = useState<number | null>(null);
  const [isHovered, setIsHovered] = useState<boolean>(false);

  const fileInputRef = useRef<HTMLInputElement>(null);

  React.useEffect(() => {
    if (linkedTitle) {
      setSpecialInstructions(prev => prev ? prev : 'Personalized style based on: ' + linkedTitle);
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
    reader.onload = () => {
      setPreviewImage(reader.result as string);
      setIsUserUploaded(true);
      setZoomLevel(1.0);
      setRotation(0);
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

    // Scroll to Designer Studio smoothly
    studioSectionRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  // Price Calculation Logic
  const pricing = useMemo(() => {
    let base = currentSizeObj.basePrice;
    let mrpBase = currentSizeObj.mrp;

    if (selectedSizeId === 'custom') {
      const sqInches = Math.max(36, customWidth * customHeight);
      base = Math.round(sqInches * 11);
      mrpBase = Math.round(base * 1.85);
    }

    // Category multiplier
    const catMultiplier = activeCategoryObj.multiplier;
    const finishPrice = activeFinishObj.priceAddition;

    // LED addition (if category is led-backlit, standard LED is already factored into multiplier)
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

  // Dynamic WhatsApp Prefilled Inquiry URL
  const whatsappInquiryUrl = useMemo(() => {
    const details = [
      `Hi Abhi's Gifts! I would like to inquire about ordering a Custom Photo Frame:`,
      `• Category: ${activeCategoryObj.name}`,
      `• Orientation: ${orientation.toUpperCase()}`,
      `• Dimensions: ${displaySizeLabel}`,
      `• Finish: ${activeFinishObj.name}`,
      `• Lighting: ${activeLedObj.name}`,
      customText ? `• Inscription: "${customText}"` : '',
      specialInstructions ? `• Instructions: "${specialInstructions}"` : '',
      selectedSizeId === 'custom'
        ? `• Price: Price will be known in this WhatsApp chat order (Custom Quote)`
        : `• Estimated Price: ₹${pricing.price.toLocaleString('en-IN')}`,
      `Can you share a digital proof and fabrication timeline?`,
    ]
      .filter(Boolean)
      .join('\n');

    const cleanWa = (INITIAL_SETTINGS.whatsappNumber || '919032372782').replace(/[^0-9]/g, '');
    return `https://wa.me/${cleanWa}?text=${encodeURIComponent(details)}`;
  }, [
    activeCategoryObj,
    orientation,
    displaySizeLabel,
    activeFinishObj,
    activeLedObj,
    customText,
    specialInstructions,
    pricing.price,
  ]);

  // Add To Cart & Checkout
  const handleOrderNow = async () => {
    let finalPreview = previewImage;
    if (previewImage && previewImage.startsWith('data:')) {
      try {
        const res = await fetch('/api/upload-photo', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ image: previewImage }),
        });
        const uploadRes = await res.json();
        if (uploadRes && uploadRes.url) {
          finalPreview = `${window.location.origin}${uploadRes.url}`;
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
      <section className="relative overflow-hidden bg-gradient-to-b from-stone-50 via-white to-stone-50 border-b border-stone-200 py-12 sm:py-16 lg:py-20">
        <div className="absolute -top-32 -right-32 w-96 h-96 bg-amber-200/30 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-32 -left-32 w-96 h-96 bg-[#EAB308]/15 rounded-full blur-3xl pointer-events-none" />

        <div className="w-full max-w-[1720px] mx-auto px-4 sm:px-6 lg:px-10 xl:px-14">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-10 lg:gap-14">
            {/* Left Hero Text */}
            <div className="space-y-4 max-w-3xl text-center lg:text-left">
              <div className="inline-flex items-center gap-2 text-xs uppercase tracking-widest font-bold text-stone-900 bg-white border border-amber-300 px-4 py-1.5 rounded-full shadow-xs">
                <Sparkles className="w-3.5 h-3.5 text-amber-600 animate-pulse" />
                <span>PERSONALISED ARTISAN STUDIO • HYDERABAD</span>
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping ml-0.5" />
              </div>

              <h1 className="font-serif font-bold text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-stone-900 tracking-tight leading-[1.12]">
                Turn Your Precious Memories{' '}
                <span className="block mt-1 bg-gradient-to-r from-amber-700 via-amber-500 to-amber-800 bg-clip-text text-transparent italic font-serif">
                  Into Timeless Art
                </span>
              </h1>

              <p className="text-sm sm:text-base text-stone-600 leading-relaxed max-w-2xl font-sans mx-auto lg:mx-0">
                Create personalized acrylic photo frames, LED backlit frames, and beautiful wall displays using your favorite photographs. Designed with care, crafted to last.
              </p>

              {/* Two CTA Buttons */}
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 pt-3">
                <button
                  type="button"
                  onClick={() => studioSectionRef.current?.scrollIntoView({ behavior: 'smooth' })}
                  className="inline-flex items-center gap-2 bg-[#EAB308] hover:bg-[#FACC15] text-stone-950 font-bold text-xs sm:text-sm px-7 py-3.5 rounded-full shadow-md hover:shadow-lg transition-all duration-300 group uppercase tracking-wider cursor-pointer"
                >
                  <span>Start Customizing</span>
                  <ArrowRight className="w-4 h-4 text-stone-950 group-hover:translate-x-1 transition-transform" />
                </button>

                <a
                  href="#custom-gallery"
                  className="inline-flex items-center gap-2 bg-white hover:bg-stone-50 text-stone-800 font-bold text-xs sm:text-sm px-6 py-3.5 rounded-full border border-stone-300 shadow-xs hover:border-amber-400 transition-colors uppercase tracking-wider"
                >
                  <Layers className="w-4 h-4 text-amber-600" />
                  <span>Explore Frame Collections</span>
                </a>
              </div>

              {/* 4 Trust Micro-Pillars */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-4 text-[11px] font-bold text-stone-700">
                <div className="flex items-center gap-1.5 justify-center lg:justify-start">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  <span>Premium Acrylic</span>
                </div>
                <div className="flex items-center gap-1.5 justify-center lg:justify-start">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  <span>Warm Ambient LED</span>
                </div>
                <div className="flex items-center gap-1.5 justify-center lg:justify-start">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  <span>1:1 WhatsApp Proof</span>
                </div>
                <div className="flex items-center gap-1.5 justify-center lg:justify-start">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  <span>Safe Packaging</span>
                </div>
              </div>
            </div>

            {/* Right Hero Visual Showcase: 4 Staggered Luxury Frame Previews */}
            <div className="w-full lg:w-auto shrink-0 max-w-lg grid grid-cols-2 gap-3.5">
              <div className="space-y-3.5">
                <div className="rounded-2xl overflow-hidden border border-stone-200 shadow-md bg-stone-100 relative group aspect-[3/4]">
                  <img
                    src="/images/custom-art/cartoon-wedding-couple.svg"
                    alt="Custom Wedding Caricature Acrylic Photo Frame"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute bottom-2 inset-x-2 bg-stone-900/80 backdrop-blur-xs p-2 rounded-xl text-center">
                    <span className="text-[10px] font-bold text-amber-300 block">Wedding Caricature</span>
                    <span className="text-[9px] text-white/90">3D Animated Keepsake</span>
                  </div>
                </div>

                <div className="rounded-2xl overflow-hidden border border-stone-200 shadow-md bg-stone-100 relative group aspect-square">
                  <img
                    src="/images/custom-art/cartoon-baby-milestone.svg"
                    alt="Baby Milestone Animated Keepsake Photo Frame"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute bottom-2 inset-x-2 bg-stone-900/80 backdrop-blur-xs p-2 rounded-xl text-center">
                    <span className="text-[10px] font-bold text-amber-300 block">Baby Milestones</span>
                    <span className="text-[9px] text-white/90">Cute Animated Keepsake</span>
                  </div>
                </div>
              </div>

              <div className="space-y-3.5 pt-6">

                <div className="rounded-2xl overflow-hidden border border-stone-200 shadow-md bg-stone-100 relative group aspect-[4/3]">
                  <img
                    src="/images/custom-art/cartoon-couple-nightglow.svg"
                    alt="Custom LED Night Glow Animated Couple Frame"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute bottom-2 inset-x-2 bg-stone-900/80 backdrop-blur-xs p-2 rounded-xl text-center">
                    <span className="text-[10px] font-bold text-amber-300 block">LED Night-Glow</span>
                    <span className="text-[9px] text-white/90">Warm LED Halo</span>
                  </div>
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
          <span className="text-xs uppercase tracking-widest font-bold text-stone-900 bg-stone-100 border border-amber-300 px-4 py-1.5 rounded-full inline-flex items-center gap-1.5 shadow-xs">
            <SlidersHorizontal className="w-3.5 h-3.5 text-amber-600" />
            <span>Interactive Custom Photo Designer</span>
          </span>
          <h2 className="font-serif font-bold text-2xl sm:text-3xl md:text-4xl text-stone-900">
            Design Your Custom Acrylic &amp; LED Photo Frame
          </h2>
          <p className="text-xs sm:text-sm text-stone-600">
            Customize every millimeter: choose category, orientation, dimensions, finish, and LED illumination with real-time 3D wall preview.
          </p>
        </div>

        {/* The Master 2-Column Split */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
          {/* =====================================================
              LEFT COLUMN: 3D WALL MOCKUP & LIVE PREVIEW (7 COLS)
              ===================================================== */}
          <div className="lg:col-span-7 xl:col-span-7 space-y-5 lg:sticky lg:top-24">
            <div className="bg-white rounded-3xl border border-stone-200 p-4 sm:p-6 shadow-sm space-y-4">
              {/* Preview Top Toolbar (Wall Mode + Zoom / Rotate) */}
              <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-stone-200 text-xs">
                {/* Wall Environment Switcher */}
                <div className="flex items-center gap-1 bg-stone-100 p-1 rounded-xl border border-stone-200">
                  <span className="text-[11px] font-bold text-stone-500 px-2 uppercase tracking-wider hidden sm:inline">
                    Wall:
                  </span>
                  {[
                    { id: 'ivory', label: 'Warm Ivory' },
                    { id: 'night', label: 'Sanctum Night' },
                    { id: 'studio', label: 'Minimal Studio' },
                  ].map((w) => (
                    <button
                      key={w.id}
                      type="button"
                      onClick={() => setWallMode(w.id as any)}
                      className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                        wallMode === w.id
                          ? 'bg-white text-stone-900 shadow-xs font-bold'
                          : 'text-stone-600 hover:text-stone-900'
                      }`}
                    >
                      {w.label}
                    </button>
                  ))}
                </div>

                {/* Pan / Zoom / Rotate toolbar */}
                <div className="flex items-center gap-1 bg-stone-100 p-1 rounded-xl border border-stone-200">
                  <button
                    type="button"
                    onClick={() => setZoomLevel((z) => Math.max(0.8, Number((z - 0.1).toFixed(1))))}
                    className="p-1 hover:text-stone-900 text-stone-600 cursor-pointer"
                    title="Zoom Out"
                  >
                    <ZoomOut className="w-3.5 h-3.5" />
                  </button>
                  <button
                    type="button"
                    onClick={() => setZoomLevel(1.0)}
                    className="text-[10px] font-bold text-stone-900 px-1 hover:underline cursor-pointer"
                    title="Reset Zoom"
                  >
                    {Math.round(zoomLevel * 100)}%
                  </button>
                  <button
                    type="button"
                    onClick={() => setZoomLevel((z) => Math.min(2.0, Number((z + 0.1).toFixed(1))))}
                    className="p-1 hover:text-stone-900 text-stone-600 cursor-pointer"
                    title="Zoom In"
                  >
                    <ZoomIn className="w-3.5 h-3.5" />
                  </button>
                  <span className="w-px h-3 bg-stone-300 mx-0.5" />
                  <button
                    type="button"
                    onClick={() => setRotation((r) => (r + 90) % 360)}
                    className="p-1 hover:text-stone-900 text-stone-600 cursor-pointer"
                    title="Rotate 90°"
                  >
                    <RotateCw className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {/* THE 3D FRAME WALL STAGE */}
              <div
                className={`relative w-full h-[400px] xs:h-[460px] sm:h-[540px] md:h-[600px] rounded-2xl overflow-hidden transition-all duration-700 flex items-center justify-center p-4 sm:p-10 ${
                  wallMode === 'night'
                    ? 'bg-gradient-to-b from-[#12030A] via-[#1E0812] to-[#0A0105]'
                    : wallMode === 'studio'
                    ? 'bg-gradient-to-b from-stone-200 via-stone-100 to-stone-200'
                    : 'bg-gradient-to-b from-stone-100 via-amber-50/20 to-stone-100'
                }`}
              >
                {/* Night overlay for realistic LED halo contrast */}
                {wallMode === 'night' && led !== 'none' && (
                  <div className="absolute inset-0 bg-black/40 pointer-events-none" />
                )}

                {/* Radiating 360° LED Glow Halo */}
                {led !== 'none' && (
                  <div
                    className={`absolute pointer-events-none transition-all duration-700 ${
                      orientation === 'horizontal'
                        ? 'w-[520px] sm:w-[680px] h-[360px] sm:h-[460px] rounded-3xl'
                        : orientation === 'square'
                        ? 'w-[420px] sm:w-[500px] h-[420px] sm:h-[500px] rounded-3xl'
                        : 'w-[380px] sm:w-[480px] h-[480px] sm:h-[600px] rounded-3xl'
                    }`}
                    style={{
                      background: `radial-gradient(circle, ${activeLedObj.glowColor} 0%, rgba(214, 170, 85, 0.25) 45%, transparent 70%)`,
                      filter: 'blur(50px)',
                    }}
                  />
                )}

                {/* THE ADAPTIVE 3D ACRYLIC FRAME */}
                <div
                  onMouseEnter={() => setIsHovered(true)}
                  onMouseLeave={() => setIsHovered(false)}
                  className={`relative transition-all duration-500 group cursor-pointer z-20 flex items-center justify-center select-none max-w-[88%] max-h-[85%] ${
                    orientation === 'vertical'
                      ? 'w-[260px] sm:w-[320px] md:w-[360px] aspect-[3/4]'
                      : orientation === 'horizontal'
                      ? 'w-[320px] sm:w-[440px] md:w-[500px] aspect-[4/3]'
                      : orientation === 'square'
                      ? 'w-[260px] sm:w-[340px] md:w-[380px] aspect-square'
                      : 'w-[260px] sm:w-[340px] md:w-[380px] aspect-square rounded-full'
                  }`}
                  style={{
                    boxShadow:
                      led !== 'none'
                        ? `0 0 60px ${activeLedObj.glowColor}, 0 25px 50px rgba(0,0,0,0.65)`
                        : '0 25px 55px rgba(0,0,0,0.4), 0 8px 20px rgba(0,0,0,0.12)',
                  }}
                >
                  {/* Outer Frame Finish Container */}
                  <div
                    className={`relative w-full h-full overflow-hidden bg-stone-950 ${
                      'rounded-2xl'
                    } ${
                      finish === 'wooden-box'
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
                        </>
                      )}

                      {/* Optical Glass Gloss Sweep */}
                      <div
                        className={`absolute inset-0 pointer-events-none transition-opacity duration-500 bg-gradient-to-tr from-transparent via-white/15 to-white/30 ${
                          isHovered ? 'opacity-100' : 'opacity-60'
                        } ${''}`}
                      />
                    </div>
                  </div>
                </div>

                {/* Bottom Floating Info Pill */}
                <div className="absolute bottom-3 left-3 z-30 bg-white/95 backdrop-blur-md px-3.5 py-1.5 rounded-full text-xs font-bold text-stone-900 border border-stone-200 shadow-md flex items-center gap-2 max-w-[90%] truncate">
                  <Sparkles className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                  <span className="truncate">{activeCategoryObj.name}</span>
                  <span className="text-amber-500 shrink-0">•</span>
                  <span className="text-stone-600 font-medium shrink-0">{displaySizeLabel}</span>
                  {led !== 'none' && (
                    <span className="text-amber-700 font-semibold shrink-0">• {activeLedObj.temperature} LED</span>
                  )}
                </div>
              </div>

              {/* Sample Memory Presets (Quick 1-Click Test Photos) */}
              <div className="space-y-2 pt-1">
                <div className="flex items-center justify-between text-xs font-semibold text-stone-600">
                  <span className="flex items-center gap-1.5 font-bold text-stone-900">
                    <ImageIcon className="w-3.5 h-3.5 text-amber-600" />
                    <span>Test With Sample Memory Photographs:</span>
                  </span>
                  <span className="text-[11px] text-amber-700 font-semibold">Click any photo to preview</span>
                </div>

                <div className="flex sm:grid sm:grid-cols-5 gap-2 overflow-x-auto pb-1 sm:pb-0 no-scrollbar">
                  {SAMPLE_MEMORIES.map((sample) => {
                    const isSelected = previewImage === sample.image;
                    return (
                      <button
                        key={sample.id}
                        type="button"
                        onClick={() => {
                          setPreviewImage(sample.image);
                          setIsUserUploaded(false);
                          setCustomText(sample.defaultText);
                          setZoomLevel(1.0);
                          setRotation(0);
                        }}
                        className={`p-1.5 rounded-xl border text-center transition-all flex flex-col items-center gap-1 cursor-pointer group min-w-[76px] sm:min-w-0 shrink-0 sm:shrink ${
                          isSelected
                            ? 'border-amber-400 bg-amber-50/50 ring-2 ring-amber-300 shadow-xs'
                            : 'border-stone-200 bg-stone-50 hover:border-amber-300'
                        }`}
                      >
                        <div className="w-12 h-12 rounded-lg overflow-hidden border border-stone-200 shrink-0 relative">
                          <img
                            src={sample.image}
                            alt={sample.name}
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                          />
                        </div>
                        <span className="text-[10px] font-bold text-stone-800 truncate w-full block">
                          {sample.name}
                        </span>
                      </button>
                    );
                  })}
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
                  <div className="w-11 h-11 rounded-xl bg-amber-100/80 text-amber-800 border border-amber-300 flex items-center justify-center shrink-0 shadow-xs">
                    <Upload className="w-5 h-5 text-amber-700" />
                  </div>
                  <div>
                    <h4 className="font-bold text-xs sm:text-sm text-stone-900">
                      {isUserUploaded ? 'Your Photograph Active' : 'Upload Your High-Resolution Photo'}
                    </h4>
                    <p className="text-[11px] text-stone-500">
                      Supports JPG, JPEG, PNG, WebP up to 15MB • Studio color-calibrated
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
                    className="flex-1 sm:flex-none bg-[#EAB308] hover:bg-[#FACC15] text-stone-950 border border-amber-500 px-5 py-2.5 rounded-xl text-xs font-bold shadow-xs transition-colors whitespace-nowrap cursor-pointer uppercase tracking-wider"
                  >
                    {isUserUploaded ? 'Change Photo' : 'Choose Photo File'}
                  </button>

                  {isUserUploaded && (
                    <button
                      type="button"
                      onClick={() => {
                        setPreviewImage(SAMPLE_MEMORIES[0].image);
                        setIsUserUploaded(false);
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
            </div>
          </div>

          {/* =====================================================
              RIGHT COLUMN: COMPREHENSIVE CUSTOMIZATION CONTROLS (5 COLS)
              ===================================================== */}
          <div className="lg:col-span-5 xl:col-span-5 bg-white p-6 sm:p-7 rounded-3xl border border-stone-200 shadow-sm space-y-6">
            {/* Step A: Select Frame Category */}
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-wider text-stone-900 flex items-center justify-between">
                <span>Step 2: Select Frame Category</span>
                <span className="text-[10px] text-amber-700 font-semibold">6 Curated Styles</span>
              </label>

              <div className="grid grid-cols-2 gap-2">
                {FRAME_CATEGORIES.map((cat) => {
                  const isSelected = category === cat.id;
                  return (
                    <button
                      key={cat.id}
                      type="button"
                      onClick={() => handleCategoryChange(cat.id)}
                      className={`p-2.5 rounded-xl border text-left transition-all cursor-pointer flex flex-col justify-between ${
                        isSelected
                          ? 'border-amber-500 bg-amber-50/60 ring-1 ring-amber-400 shadow-xs'
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



            {/* Step C: Select Frame Size */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label className="text-xs font-bold uppercase tracking-wider text-stone-900">
                  Step 3: Select Frame Dimensions
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
                        {sz.id === 'custom' ? 'Price in WhatsApp Chat' : `From ₹${itemPrice.toLocaleString('en-IN')}`}
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* Custom Size Interactive Input Fields */}
              {selectedSizeId === 'custom' && (
                <div className="p-3 bg-stone-50 rounded-xl border border-amber-400 space-y-2 animate-in fade-in duration-200">
                  <div className="bg-[#25D366]/10 border border-[#25D366]/40 rounded-lg p-2.5 flex items-center gap-2 text-xs">
                    <MessageCircle className="w-4 h-4 text-[#25D366] shrink-0 fill-current" />
                    <span className="text-[#25D366] font-bold">
                      Price will be known in WhatsApp chat order
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
                        min={6}
                        max={72}
                        value={customWidth}
                        onChange={(e) => setCustomWidth(Math.max(6, Number(e.target.value)))}
                        className="w-full px-3 py-1.5 text-xs bg-white border border-stone-300 rounded-lg text-stone-900 outline-none font-bold focus:border-amber-500"
                      />
                    </div>
                    <div>
                      <label className="text-[10px] text-stone-600 block mb-1">Height (inches)</label>
                      <input
                        type="number"
                        min={6}
                        max={72}
                        value={customHeight}
                        onChange={(e) => setCustomHeight(Math.max(6, Number(e.target.value)))}
                        className="w-full px-3 py-1.5 text-xs bg-white border border-stone-300 rounded-lg text-stone-900 outline-none font-bold focus:border-amber-500"
                      />
                    </div>
                  </div>
                  <p className="text-[10px] text-stone-500">
                    ✦ Factory fabrication available up to 6×4 ft (72×48 in) with pre-installed heavy-duty mounts.
                  </p>
                </div>
              )}
            </div>

            {/* Step D: Select Frame Finish */}
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-wider text-stone-900 flex items-center justify-between">
                <span>Step 4: Select Frame Finish & LED Lighting</span>
                <span className="text-[10px] text-amber-700 font-semibold">{activeFinishObj.name}</span>
              </label>

              <div className="space-y-1.5">
                {FRAME_FINISHES.map((f) => {
                  const isSelected = finish === f.id;
                  return (
                    <button
                      key={f.id}
                      type="button"
                      onClick={() => setFinish(f.id)}
                      className={`w-full p-2.5 rounded-xl border text-left transition-all cursor-pointer flex items-center justify-between ${
                        isSelected
                          ? 'border-amber-500 bg-amber-50/60 ring-1 ring-amber-400'
                          : 'border-stone-200 hover:border-amber-300 bg-white'
                      }`}
                    >
                      <div>
                        <div className="text-xs font-bold text-stone-900">{f.name}</div>
                        <div className="text-[10px] text-stone-500">{f.subtitle}</div>
                      </div>
                      <span className="text-xs font-semibold text-amber-700">
                        {f.priceAddition > 0 ? `+₹${f.priceAddition}` : 'Included'}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Step E: LED Options */}
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-wider text-stone-900 flex items-center justify-between">
                <span>Step 4B: LED Backlight Color (Warm Halo)</span>
                <span className="text-[10px] text-amber-700 font-semibold">{activeLedObj.name}</span>
              </label>

              <div className="grid grid-cols-2 gap-2">
                {LED_OPTIONS.map((l) => {
                  const isSelected = led === l.id;
                  return (
                    <button
                      key={l.id}
                      type="button"
                      onClick={() => setLed(l.id)}
                      className={`p-2.5 sm:p-3 min-h-[50px] rounded-xl border text-left transition-all cursor-pointer flex flex-col justify-between ${
                        isSelected
                          ? 'border-amber-500 bg-amber-50/60 ring-1 ring-amber-400'
                          : 'border-stone-200 hover:border-amber-300 bg-white'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-stone-900">{l.temperature}</span>
                        {l.id !== 'none' && (
                          <Zap className="w-3 h-3 text-amber-500 fill-amber-500" />
                        )}
                      </div>
                      <div className="text-[10px] text-stone-500 mt-0.5">{l.name.split('(')[0]}</div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Optional Personal Inscription */}
            <div className="space-y-1">
              <label className="text-xs font-bold uppercase tracking-wider text-stone-900 block">
                Step 5: Add Personal Message / Inscription (Optional)
              </label>
              <input
                type="text"
                placeholder="e.g. The Sharma Family • Est. 2026"
                value={customText}
                onChange={(e) => setCustomText(e.target.value)}
                maxLength={60}
                className="w-full px-3.5 py-2.5 text-xs bg-white border border-stone-300 rounded-xl outline-none focus:border-amber-500 text-stone-900 font-serif"
              />
              <span className="text-[10px] text-stone-500 block">
                ✦ Displayed in golden foil or crisp typography at the bottom of the frame.
              </span>
            </div>

            {/* Special Instructions */}
            <div className="space-y-1">
              <label className="text-xs font-semibold text-stone-900 block">
                Special Workshop Instructions (Optional)
              </label>
              <textarea
                rows={2}
                placeholder="e.g. Please enhance facial brightness, crop closely, or remove background tint."
                value={specialInstructions}
                onChange={(e) => setSpecialInstructions(e.target.value)}
                className="w-full px-3.5 py-2 text-xs bg-white border border-stone-300 rounded-xl outline-none focus:border-amber-500 text-stone-900"
              />
            </div>

            {/* =====================================================
                PRICING SUMMARY & ORDER CARD
                ===================================================== */}
            <div className="bg-stone-50 p-4 sm:p-5 rounded-2xl border border-stone-200 space-y-3">
              <div className="flex items-baseline justify-between border-b border-stone-200 pb-2.5">
                {selectedSizeId === 'custom' ? (
                  <div className="py-1">
                    <span className="text-xs text-stone-500 block">Step 6: Live Price &amp; Configuration Review</span>
                    <div className="flex items-center gap-2 mt-1">
                      <MessageCircle className="w-5 h-5 text-[#25D366] fill-current shrink-0" />
                      <span className="font-serif text-lg sm:text-xl font-bold text-[#25D366]">
                        Price will be known in WhatsApp chat order
                      </span>
                    </div>
                  </div>
                ) : (
                  <>
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
                  </>
                )}
              </div>

              <div className="text-[11px] text-stone-600 space-y-1">
                <div className="flex justify-between">
                  <span>Size &amp; Category:</span>
                  <span className="font-semibold text-stone-900">{displaySizeLabel}</span>
                </div>
                <div className="flex justify-between">
                  <span>Finish &amp; Hardware:</span>
                  <span className="font-semibold text-stone-900">{activeFinishObj.name}</span>
                </div>
                <div className="flex justify-between">
                  <span>Lighting:</span>
                  <span className="font-semibold text-stone-900">{activeLedObj.name}</span>
                </div>
                <div className="flex justify-between text-emerald-700 font-semibold pt-1 border-t border-stone-200">
                  <span>Packaging:</span>
                  <span>Multi-Layer Protective Box</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-2 pt-2">
                {selectedSizeId === 'custom' ? (
                  <a
                    href={whatsappInquiryUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full bg-[#25D366] hover:bg-[#20BD5A] text-white border border-[#25D366] py-3.5 rounded-xl font-bold text-sm shadow-md transition-all cursor-pointer flex items-center justify-center gap-2 uppercase tracking-wider"
                  >
                    <MessageCircle className="w-4 h-4 fill-white" />
                    <span>Order via WhatsApp • Price Known in Chat</span>
                  </a>
                ) : (
                  <>
                    <button
                      type="button"
                      onClick={handleOrderNow}
                      className="w-full bg-[#EAB308] hover:bg-[#FACC15] text-stone-950 border border-amber-500 py-3.5 rounded-xl font-bold text-sm shadow-md transition-all cursor-pointer flex items-center justify-center gap-2 uppercase tracking-wider"
                    >
                      <span>Order Now • ₹{pricing.price.toLocaleString('en-IN')}</span>
                      <ArrowRight className="w-4 h-4 text-stone-950" />
                    </button>

                    <a
                      href={whatsappInquiryUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full bg-white hover:bg-stone-50 text-stone-800 border border-stone-300 py-3 rounded-xl font-bold text-xs shadow-xs transition-colors flex items-center justify-center gap-2 uppercase tracking-wider"
                    >
                      <MessageCircle className="w-4 h-4 text-emerald-600 fill-emerald-600" />
                      <span>Request Custom Quotation / WhatsApp Proof</span>
                    </a>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================
          3. PRODUCT GALLERY: 9 CURATED CUSTOM PHOTO FRAME STYLES
          ========================================================= */}
      <section id="custom-gallery" className="w-full max-w-[1720px] mx-auto px-4 sm:px-6 lg:px-10 xl:px-14 py-12 sm:py-16 border-t border-stone-200">
        <div className="text-center max-w-3xl mx-auto mb-10 space-y-2">
          <span className="text-xs uppercase tracking-widest font-bold text-stone-900 bg-stone-100 border border-amber-300 px-4 py-1.5 rounded-full inline-flex items-center gap-1.5 shadow-xs">
            <Layers className="w-3.5 h-3.5 text-amber-600" />
            <span>Dedicated Photo Frame Collections</span>
          </span>
          <h2 className="font-serif font-bold text-2xl sm:text-3xl md:text-4xl text-stone-900">
            Explore Custom Photo Frame Creations
          </h2>
          <p className="text-xs sm:text-sm text-stone-600">
            Every style is hand-fabricated in our Dilsukhnagar workshop. Click "Customize This Style" to load any configuration directly into the designer studio above.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {GALLERY_PRODUCTS.map((prod) => (
            <div
              key={prod.id}
              className="bg-white rounded-3xl overflow-hidden border border-stone-200 hover:border-amber-400 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col justify-between group"
            >
              <div>
                <div className="relative aspect-[4/3] w-full overflow-hidden bg-stone-100">
                  <img
                    src={prod.image}
                    alt={prod.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-3 left-3 bg-white/90 text-stone-900 text-[10px] font-bold px-2.5 py-0.5 rounded-full shadow-sm border border-stone-200 backdrop-blur-xs">
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
                  <h3 className="font-serif font-bold text-base sm:text-lg text-stone-900 group-hover:text-amber-700 transition-colors leading-snug">
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
                  className="w-full bg-stone-100 hover:bg-amber-500 hover:text-white text-stone-900 border border-stone-200 hover:border-amber-500 font-bold text-xs py-2.5 rounded-xl transition-all flex items-center justify-center gap-2 cursor-pointer uppercase tracking-wider group-hover:shadow-xs"
                >
                  <span>Customize This Style</span>
                  <ArrowRight className="w-3.5 h-3.5 text-amber-700 group-hover:text-white" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* =========================================================
          4. HOW IT WORKS: 4 SIMPLE STEPS TO CUSTOM HEIRLOOM
          ========================================================= */}
      <section className="w-full bg-gradient-to-b from-stone-50 via-white to-stone-50 border-y border-stone-200 py-12 sm:py-16">
        <div className="w-full max-w-[1720px] mx-auto px-4 sm:px-6 lg:px-10 xl:px-14">
          <div className="text-center max-w-2xl mx-auto mb-10 space-y-2">
            <span className="text-xs uppercase tracking-widest font-bold text-stone-900 bg-white border border-amber-300 px-4 py-1.5 rounded-full inline-flex items-center gap-1.5 shadow-xs">
              <Clock className="w-3.5 h-3.5 text-amber-600" />
              <span>Effortless Fabrication</span>
            </span>
            <h2 className="font-serif font-bold text-2xl sm:text-3xl md:text-4xl text-stone-900">
              How It Works: 4 Simple Steps
            </h2>
            <p className="text-xs sm:text-sm text-stone-600">
              From digital concept to factory-direct Hyderabad delivery in four seamless steps.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {/* Step 1 */}
            <div className="bg-white p-6 rounded-3xl border border-stone-200 shadow-xs hover:border-amber-400 transition-all space-y-3">
              <div className="w-10 h-10 rounded-2xl bg-amber-50 text-amber-800 border border-amber-200 font-serif font-bold text-base flex items-center justify-center shadow-xs">
                01
              </div>
              <h3 className="font-serif font-bold text-base text-stone-900">
                Choose Your Frame
              </h3>
              <p className="text-xs text-stone-600 leading-relaxed">
                Select your preferred frame category, dimensions, and warm LED backlight.
              </p>
              <div className="text-[11px] font-bold text-amber-700 flex items-center gap-1 pt-1">
                <Check className="w-3.5 h-3.5 text-emerald-600" />
                <span>6 Categories &amp; Sizing</span>
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
                Upload your favorite photograph from your phone or desktop. See an instant real-time 3D simulation on realistic wall backgrounds.
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
                Place Your Order
              </h3>
              <p className="text-xs text-stone-600 leading-relaxed">
                Precision fabricated with premium acrylic. Packed in multi-layer reinforced packaging with safe door delivery.
              </p>
              <div className="text-[11px] font-bold text-amber-700 flex items-center gap-1 pt-1">
                <Check className="w-3.5 h-3.5 text-emerald-600" />
                <span>protective packaging</span>
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
              Have a low-resolution photo, custom temple alcove dimensions, wedding vows script, or urgent express dispatch requirement? Talk directly to our workshop artisans for instant proofing and advice.
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3 shrink-0">
            <a
              href={whatsappInquiryUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[#25D366] hover:bg-[#20BD5A] text-white font-bold text-xs sm:text-sm px-7 py-3.5 rounded-full shadow-md transition-all hover:scale-105 flex items-center gap-2 uppercase tracking-wider"
            >
              <MessageCircle className="w-4 h-4 text-white fill-current" />
              <span>Need Help? Chat With Our Artisans</span>
            </a>

            <a
              href="tel:917780269927"
              className="bg-white hover:bg-stone-100 text-stone-900 border border-stone-300 font-bold text-xs sm:text-sm px-6 py-3.5 rounded-full transition-colors flex items-center gap-2 uppercase tracking-wider shadow-xs"
            >
              <PhoneCall className="w-4 h-4 text-amber-600" />
              <span>Call +91 77802 69927</span>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
