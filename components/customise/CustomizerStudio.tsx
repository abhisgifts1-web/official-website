'use client';

import React, { useState, useRef, useMemo } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
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
    subtitle: '4mm Optical Cast Sheet',
    description: 'High-clarity optical cast acrylic with diamond CNC-beveled edges. Unlit for clean, minimalist elegance.',
    multiplier: 1.0,
    hasLedDefault: false,
  },
  {
    id: 'led-backlit',
    name: 'LED Backlit Photo Frames',
    badge: 'Trending Gift',
    subtitle: '3000K Halo Illumination',
    description: 'Concealed Epistar warm golden perimeter LEDs casting a serene halo around your sacred memory or family portrait.',
    multiplier: 1.35,
    hasLedDefault: true,
  },
  {
    id: 'customized',
    name: 'Customized Photo Frames',
    badge: 'Heirloom Inscribed',
    subtitle: '24K Gold Script & Vows',
    description: 'Personalized with wedding dates, family surnames, temple mantras, or baby birth details in 24K gold foil.',
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
  {
    id: 'round-acrylic',
    name: 'Round Acrylic Frames',
    badge: 'Modern Silhouette',
    subtitle: '360° Circular Diamond Facet',
    description: 'Laser-curved circular medallion with continuous diamond beveled edge and concealed heavy-duty French cleat mount.',
    multiplier: 1.15,
    hasLedDefault: false,
    forcedShape: 'round',
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
    description: 'Diamond CNC 45° beveled edges creating an ultra-sharp optical glass shine without the heavy weight of glass.',
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
    name: 'Warm White LED (3000K)',
    subtitle: 'Golden Candlelit Sanctum',
    temperature: '3000K',
    priceAddition: 600,
    glowColor: 'rgba(255, 195, 75, 0.75)',
  },
  {
    id: 'cool-white',
    name: 'Cool White LED (6500K)',
    subtitle: 'Modern Crisp Diamond Halo',
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
  round: [
    { id: '8-dia', label: '8" Diameter', dimensionsCm: '20 cm Dia', basePrice: 1199, mrp: 2299 },
    { id: '10-dia', label: '10" Diameter', dimensionsCm: '25 cm Dia', basePrice: 1499, mrp: 2799 },
    { id: '12-dia', label: '12" Diameter', dimensionsCm: '30 cm Dia', basePrice: 1899, mrp: 3499 },
    { id: '16-dia', label: '16" Diameter', dimensionsCm: '40 cm Dia', basePrice: 2599, mrp: 4899, isPopular: true },
    { id: '20-dia', label: '20" Diameter', dimensionsCm: '50 cm Dia', basePrice: 3599, mrp: 6499 },
    { id: 'custom', label: 'Custom Diameter', dimensionsCm: 'Up to 48" Dia', basePrice: 2199, mrp: 4199 },
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
    description: 'Celebrate sacred vows with charming 3D animated wedding couple caricatures, 24K gold foil surname script, and floating wall studs.',
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
    subtitle: '3000K Epistar Warm Golden Halo Romance',
    category: 'Illuminated Frame',
    image: '/images/custom-art/cartoon-couple-nightglow.svg',
    startingPrice: 2499,
    mrp: 4799,
    badge: '50,000h Epistar LEDs',
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
    title: 'Silver & Golden Jubilee 24K Gold Script Frame',
    subtitle: 'Anniversary Milestones & Vows Caricature',
    category: 'Anniversary Keepsake',
    image: '/images/custom-art/cartoon-anniversary-golden.svg',
    startingPrice: 2799,
    mrp: 5199,
    badge: '24K Gold Script',
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
  {
    id: 'gal-luxury',
    title: 'Luxury Circular Round Acrylic Wall Medallion',
    subtitle: 'Continuous 360° Diamond Bevel',
    category: 'Luxury Silhouette',
    image: '/images/custom-art/cartoon-round-portrait.svg',
    startingPrice: 2199,
    mrp: 3999,
    badge: 'Modern Medallion',
    description: 'Double-thick 5mm acrylic with 360° laser-curved diamond edge facets and animated couple portrait with celebratory gold floral wreath.',
    preset: {
      category: 'round-acrylic',
      orientation: 'round',
      finish: 'floating-standoff',
      led: 'none',
      sizeId: '16-dia',
    },
  },
];

// =========================================================================
// MAIN COMPONENT
// =========================================================================

export default function CustomizerStudio() {
  const router = useRouter();
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
    if (catObj?.forcedShape) {
      handleOrientationChange(catObj.forcedShape);
    }
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
      `• Estimated Price: ₹${pricing.price.toLocaleString('en-IN')}`,
      `Can you share a digital proof and final delivery timeline for Hyderabad / Pan-India?`,
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
  const handleOrderNow = () => {
    addToCart(
      {
        productId: 'prod-custom-photo-acrylic-frame',
        slug: 'custom-personalised-photo-acrylic-wall-frame',
        title: `Custom ${activeCategoryObj.name} — ${displaySizeLabel}`,
        image: previewImage,
        variantId: `custom-${orientation}-${selectedSizeId}-${finish}-${led}`,
        size: displaySizeLabel,
        finish: activeFinishObj.name,
        lighting: activeLedObj.name,
        shape: orientation === 'vertical' ? 'portrait' : orientation === 'horizontal' ? 'landscape' : orientation,
        unitPrice: pricing.price,
        unitMrp: pricing.mrp,
        quantity: 1,
        customization: {
          previewUrl: previewImage,
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
    <div className="w-full bg-[#FFF8EF] text-[#511B2A] select-none">
      {/* =========================================================
          1. HERO SECTION: TURN YOUR PRECIOUS MEMORIES INTO TIMELESS ART
          ========================================================= */}
      <section className="relative overflow-hidden bg-gradient-to-b from-[#FFFDF9] via-[#FAF3E8] to-[#FFF8EF] border-b border-[#E8D1A5]/70 py-12 sm:py-16 lg:py-20">
        <div className="absolute -top-32 -right-32 w-96 h-96 bg-amber-200/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-32 -left-32 w-96 h-96 bg-[#641E2E]/10 rounded-full blur-3xl pointer-events-none" />

        <div className="w-full max-w-[1720px] mx-auto px-4 sm:px-6 lg:px-10 xl:px-14">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-10 lg:gap-14">
            {/* Left Hero Text */}
            <div className="space-y-4 max-w-3xl text-center lg:text-left">
              <div className="inline-flex items-center gap-2 text-xs uppercase tracking-widest font-bold text-[#641E2E] bg-white border border-[#C69A42]/60 px-4 py-1.5 rounded-full shadow-2xs">
                <Sparkles className="w-3.5 h-3.5 text-[#C69A42] animate-pulse" />
                <span>PERSONALISED ARTISAN STUDIO • HYDERABAD</span>
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping ml-0.5" />
              </div>

              <h1 className="font-serif font-bold text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-[#511B2A] tracking-tight leading-[1.12]">
                Turn Your Precious Memories{' '}
                <span className="block mt-1 bg-gradient-to-r from-[#A06E28] via-[#D6AA55] to-[#784B15] bg-clip-text text-transparent italic font-serif">
                  Into Timeless Art
                </span>
              </h1>

              <p className="text-sm sm:text-base text-[#795D58] leading-relaxed max-w-2xl font-sans mx-auto lg:mx-0">
                Create personalized acrylic photo frames, LED backlit frames, and beautiful wall displays using your favorite photographs. Designed with care, crafted to last.
              </p>

              {/* Two CTA Buttons */}
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 pt-3">
                <button
                  type="button"
                  onClick={() => studioSectionRef.current?.scrollIntoView({ behavior: 'smooth' })}
                  className="inline-flex items-center gap-2 bg-[#511B2A] hover:bg-[#641E2E] text-[#FFF7ED] font-bold text-xs sm:text-sm px-7 py-3.5 rounded-full shadow-md hover:shadow-lg transition-all duration-300 group uppercase tracking-wider cursor-pointer"
                >
                  <span>Start Customizing</span>
                  <ArrowRight className="w-4 h-4 text-[#E8C77E] group-hover:translate-x-1 transition-transform" />
                </button>

                <a
                  href="#custom-gallery"
                  className="inline-flex items-center gap-2 bg-white hover:bg-[#FFFDF9] text-[#511B2A] font-bold text-xs sm:text-sm px-6 py-3.5 rounded-full border border-[#D6AA55] shadow-xs hover:border-[#A06E28] transition-colors uppercase tracking-wider"
                >
                  <Layers className="w-4 h-4 text-[#B88A35]" />
                  <span>Explore Frame Collections</span>
                </a>
              </div>

              {/* 4 Trust Micro-Pillars */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-4 text-[11px] font-bold text-[#641E2E]">
                <div className="flex items-center gap-1.5 justify-center lg:justify-start">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  <span>4mm Cast Acrylic</span>
                </div>
                <div className="flex items-center gap-1.5 justify-center lg:justify-start">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  <span>3000K Epistar LED</span>
                </div>
                <div className="flex items-center gap-1.5 justify-center lg:justify-start">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  <span>1:1 WhatsApp Proof</span>
                </div>
                <div className="flex items-center gap-1.5 justify-center lg:justify-start">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  <span>Pan-India Delivery</span>
                </div>
              </div>
            </div>

            {/* Right Hero Visual Showcase: 4 Staggered Luxury Frame Previews */}
            <div className="w-full lg:w-auto shrink-0 max-w-lg grid grid-cols-2 gap-3.5">
              <div className="space-y-3.5">
                <div className="rounded-2xl overflow-hidden border border-[#D6AA55] shadow-md bg-stone-900 relative group aspect-[3/4]">
                  <img
                    src="/images/custom-art/cartoon-wedding-couple.svg"
                    alt="Custom Wedding Caricature Acrylic Photo Frame"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute bottom-2 inset-x-2 bg-black/70 backdrop-blur-xs p-2 rounded-xl text-center">
                    <span className="text-[10px] font-bold text-[#FFD782] block">Wedding Caricature</span>
                    <span className="text-[9px] text-white/80">3D Animated Keepsake</span>
                  </div>
                </div>

                <div className="rounded-2xl overflow-hidden border border-[#D6AA55] shadow-md bg-stone-900 relative group aspect-square">
                  <img
                    src="/images/custom-art/cartoon-baby-milestone.svg"
                    alt="Baby Milestone Animated Keepsake Photo Frame"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute bottom-2 inset-x-2 bg-black/70 backdrop-blur-xs p-2 rounded-xl text-center">
                    <span className="text-[10px] font-bold text-[#FFD782] block">Baby Milestones</span>
                    <span className="text-[9px] text-white/80">Cute Animated Keepsake</span>
                  </div>
                </div>
              </div>

              <div className="space-y-3.5 pt-6">
                <div className="rounded-2xl overflow-hidden border border-[#D6AA55] shadow-md bg-stone-900 relative group aspect-square rounded-full">
                  <img
                    src="/images/custom-art/cartoon-round-portrait.svg"
                    alt="Luxury Circular Medallion Animated Art Frame"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute bottom-2 inset-x-2 bg-black/70 backdrop-blur-xs p-2 rounded-xl text-center">
                    <span className="text-[10px] font-bold text-[#FFD782] block">Circular Medallion</span>
                    <span className="text-[9px] text-white/80">360° Diamond Bevel</span>
                  </div>
                </div>

                <div className="rounded-2xl overflow-hidden border border-[#D6AA55] shadow-md bg-stone-900 relative group aspect-[4/3]">
                  <img
                    src="/images/custom-art/cartoon-couple-nightglow.svg"
                    alt="Custom LED Night Glow Animated Couple Frame"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute bottom-2 inset-x-2 bg-black/70 backdrop-blur-xs p-2 rounded-xl text-center">
                    <span className="text-[10px] font-bold text-[#FFD782] block">LED Night-Glow</span>
                    <span className="text-[9px] text-white/80">3000K Halo Warm</span>
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
          <span className="text-xs uppercase tracking-widest font-bold text-[#641E2E] bg-[#FAF3E8] border border-[#B88A35]/80 px-4 py-1.5 rounded-full inline-flex items-center gap-1.5 shadow-2xs">
            <SlidersHorizontal className="w-3.5 h-3.5 text-[#B88A35]" />
            <span>Interactive Custom Photo Designer</span>
          </span>
          <h2 className="font-serif font-bold text-2xl sm:text-3xl md:text-4xl text-[#511B2A]">
            Design Your Custom Acrylic &amp; LED Photo Frame
          </h2>
          <p className="text-xs sm:text-sm text-[#795D58]">
            Customize every millimeter: choose category, orientation, dimensions, finish, and LED illumination with real-time 3D wall preview.
          </p>
        </div>

        {/* The Master 2-Column Split */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
          {/* =====================================================
              LEFT COLUMN: 3D WALL MOCKUP & LIVE PREVIEW (7 COLS)
              ===================================================== */}
          <div className="lg:col-span-7 xl:col-span-7 space-y-5 lg:sticky lg:top-24">
            <div className="bg-white rounded-3xl border border-[#E8D1A5] p-4 sm:p-6 shadow-[0_12px_45px_rgba(81,27,42,0.06)] space-y-4">
              {/* Preview Top Toolbar (Wall Mode + Zoom / Rotate) */}
              <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-[#E8D1A5]/60 text-xs">
                {/* Wall Environment Switcher */}
                <div className="flex items-center gap-1 bg-[#FAF3E8] p-1 rounded-xl border border-[#E8D1A5]">
                  <span className="text-[11px] font-bold text-[#795D58] px-2 uppercase tracking-wider hidden sm:inline">
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
                          ? 'bg-white text-[#511B2A] shadow-2xs font-bold'
                          : 'text-[#795D58] hover:text-[#511B2A]'
                      }`}
                    >
                      {w.label}
                    </button>
                  ))}
                </div>

                {/* Pan / Zoom / Rotate toolbar */}
                <div className="flex items-center gap-1 bg-[#FAF3E8] p-1 rounded-xl border border-[#E8D1A5]">
                  <button
                    type="button"
                    onClick={() => setZoomLevel((z) => Math.max(0.8, Number((z - 0.1).toFixed(1))))}
                    className="p-1 hover:text-[#511B2A] text-[#795D58] cursor-pointer"
                    title="Zoom Out"
                  >
                    <ZoomOut className="w-3.5 h-3.5" />
                  </button>
                  <button
                    type="button"
                    onClick={() => setZoomLevel(1.0)}
                    className="text-[10px] font-bold text-[#511B2A] px-1 hover:underline cursor-pointer"
                    title="Reset Zoom"
                  >
                    {Math.round(zoomLevel * 100)}%
                  </button>
                  <button
                    type="button"
                    onClick={() => setZoomLevel((z) => Math.min(2.0, Number((z + 0.1).toFixed(1))))}
                    className="p-1 hover:text-[#511B2A] text-[#795D58] cursor-pointer"
                    title="Zoom In"
                  >
                    <ZoomIn className="w-3.5 h-3.5" />
                  </button>
                  <span className="w-px h-3 bg-[#E8D1A5] mx-0.5" />
                  <button
                    type="button"
                    onClick={() => setRotation((r) => (r + 90) % 360)}
                    className="p-1 hover:text-[#511B2A] text-[#795D58] cursor-pointer"
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
                    ? 'bg-gradient-to-b from-[#F2F2F2] via-[#E8E8E8] to-[#DCDCDC]'
                    : 'bg-gradient-to-b from-[#FAF5EC] via-[#F4EDE0] to-[#EAE0D0]'
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
                      orientation === 'round'
                        ? 'w-[440px] sm:w-[540px] h-[440px] sm:h-[540px] rounded-full'
                        : orientation === 'horizontal'
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
                        : '0 25px 55px rgba(81,27,42,0.22), 0 8px 20px rgba(0,0,0,0.12)',
                  }}
                >
                  {/* Outer Frame Finish Container */}
                  <div
                    className={`relative w-full h-full overflow-hidden bg-stone-950 transition-all duration-300 ${
                      orientation === 'round' ? 'rounded-full' : 'rounded-2xl'
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
                          {orientation === 'round' ? (
                            <>
                              <div className="absolute top-2.5 left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-gradient-to-br from-white via-stone-200 to-stone-500 shadow-md border border-stone-400 flex items-center justify-center">
                                <div className="w-1.5 h-1.5 rounded-full bg-stone-700" />
                              </div>
                              <div className="absolute bottom-2.5 left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-gradient-to-br from-white via-stone-200 to-stone-500 shadow-md border border-stone-400 flex items-center justify-center">
                                <div className="w-1.5 h-1.5 rounded-full bg-stone-700" />
                              </div>
                              <div className="absolute left-2.5 top-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-gradient-to-br from-white via-stone-200 to-stone-500 shadow-md border border-stone-400 flex items-center justify-center">
                                <div className="w-1.5 h-1.5 rounded-full bg-stone-700" />
                              </div>
                              <div className="absolute right-2.5 top-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-gradient-to-br from-white via-stone-200 to-stone-500 shadow-md border border-stone-400 flex items-center justify-center">
                                <div className="w-1.5 h-1.5 rounded-full bg-stone-700" />
                              </div>
                            </>
                          ) : (
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
                        </>
                      )}

                      {/* Optical Glass Gloss Sweep */}
                      <div
                        className={`absolute inset-0 pointer-events-none transition-opacity duration-500 bg-gradient-to-tr from-transparent via-white/15 to-white/30 ${
                          isHovered ? 'opacity-100' : 'opacity-60'
                        } ${orientation === 'round' ? 'rounded-full' : ''}`}
                      />
                    </div>
                  </div>
                </div>

                {/* Bottom Floating Info Pill */}
                <div className="absolute bottom-3 left-3 z-30 bg-white/95 backdrop-blur-md px-3.5 py-1.5 rounded-full text-xs font-bold text-[#511B2A] border border-[#E8D1A5] shadow-xs flex items-center gap-2 max-w-[90%] truncate">
                  <Sparkles className="w-3.5 h-3.5 text-[#B88A35] shrink-0" />
                  <span className="truncate">{activeCategoryObj.name}</span>
                  <span className="text-[#B88A35]/60 shrink-0">•</span>
                  <span className="text-[#795D58] font-medium shrink-0">{displaySizeLabel}</span>
                  {led !== 'none' && (
                    <span className="text-amber-700 font-semibold shrink-0">• {activeLedObj.temperature} LED</span>
                  )}
                </div>
              </div>

              {/* Sample Memory Presets (Quick 1-Click Test Photos) */}
              <div className="space-y-2 pt-1">
                <div className="flex items-center justify-between text-xs font-semibold text-[#795D58]">
                  <span className="flex items-center gap-1.5 font-bold text-[#511B2A]">
                    <ImageIcon className="w-3.5 h-3.5 text-[#B88A35]" />
                    <span>Test With Sample Memory Photographs:</span>
                  </span>
                  <span className="text-[11px] text-[#A06E28]">Click any photo to preview</span>
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
                            ? 'border-[#B88A35] bg-[#FAF3E8] ring-2 ring-[#B88A35]/30 shadow-2xs'
                            : 'border-[#E8D1A5] bg-white hover:border-[#B88A35]/50'
                        }`}
                      >
                        <div className="w-12 h-12 rounded-lg overflow-hidden border border-[#E8D1A5] shrink-0 relative">
                          <img
                            src={sample.image}
                            alt={sample.name}
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                          />
                        </div>
                        <span className="text-[10px] font-bold text-[#511B2A] truncate w-full block">
                          {sample.name}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Photo Upload Drop Area */}
              <div className="bg-[#FAF3E8]/80 p-4 rounded-2xl border border-[#E8D1A5] flex flex-col gap-3">
                {uploadProgress !== null && (
                  <div className="w-full space-y-1.5 pb-2 border-b border-[#E8D1A5]/60">
                    <div className="flex justify-between text-xs font-bold text-[#511B2A]">
                      <span>Optimizing image for 4mm Crystal Acrylic Printing...</span>
                      <span>{uploadProgress}%</span>
                    </div>
                    <div className="w-full h-2 bg-[#E8D1A5] rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-[#511B2A] to-[#D6AA55] transition-all duration-200"
                        style={{ width: `${uploadProgress}%` }}
                      />
                    </div>
                  </div>
                )}
                <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-11 h-11 rounded-xl bg-[#511B2A] text-[#FFF7ED] flex items-center justify-center shrink-0 shadow-xs">
                    <Upload className="w-5 h-5 text-[#E8C77E]" />
                  </div>
                  <div>
                    <h4 className="font-bold text-xs sm:text-sm text-[#511B2A]">
                      {isUserUploaded ? 'Your Photograph Active' : 'Upload Your High-Resolution Photo'}
                    </h4>
                    <p className="text-[11px] text-[#795D58]">
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
                    className="flex-1 sm:flex-none bg-[#511B2A] hover:bg-[#641E2E] text-[#FFF7ED] border border-[#B88A35]/50 px-5 py-2.5 rounded-xl text-xs font-bold shadow-xs transition-colors whitespace-nowrap cursor-pointer uppercase tracking-wider"
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
                      className="p-2.5 rounded-xl bg-white hover:bg-rose-50 text-stone-600 hover:text-rose-600 border border-[#E8D1A5] transition-colors cursor-pointer"
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
          <div className="lg:col-span-5 xl:col-span-5 bg-white p-6 sm:p-7 rounded-3xl border border-[#E8D1A5] shadow-sm space-y-6">
            {/* Step A: Select Frame Category */}
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-wider text-[#511B2A] flex items-center justify-between">
                <span>Step 2: Select Frame Category</span>
                <span className="text-[10px] text-[#A06E28] font-normal">6 Curated Styles</span>
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
                          ? 'border-[#B88A35] bg-[#FAF3E8] ring-1 ring-[#B88A35]/40 shadow-xs'
                          : 'border-[#E8D1A5] bg-white hover:border-[#B88A35]/50'
                      }`}
                    >
                      <div>
                        <span className="text-[9px] font-bold uppercase tracking-wider text-[#511B2A] bg-white border border-[#E8D1A5] px-1.5 py-0.5 rounded">
                          {cat.badge}
                        </span>
                        <div className="font-serif font-bold text-xs text-[#511B2A] mt-1 leading-snug">
                          {cat.name.replace(' Photo Frames', '')}
                        </div>
                      </div>
                      <span className="text-[10px] text-[#795D58] mt-1">{cat.subtitle}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Step B: Select Orientation */}
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-wider text-[#511B2A] flex items-center justify-between">
                <span>Step 3: Choose Orientation &amp; Dimensions</span>
                <span className="text-[10px] text-[#A06E28] font-normal capitalize">
                  Current: {orientation}
                </span>
              </label>

              <div className="grid grid-cols-4 gap-1.5 sm:gap-2">
                {[
                  { id: 'vertical', label: 'Portrait' },
                  { id: 'horizontal', label: 'Landscape' },
                  { id: 'square', label: 'Square' },
                  { id: 'round', label: 'Round' },
                ].map((item) => {
                  const isSelected = orientation === item.id;
                  return (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => handleOrientationChange(item.id as ProductOrientation)}
                      className={`py-2.5 px-1 sm:px-2 min-h-[44px] flex items-center justify-center text-xs font-semibold rounded-xl border text-center transition-all cursor-pointer ${
                        isSelected
                          ? 'border-[#B88A35] bg-[#FAF3E8] text-[#511B2A] font-bold ring-1 ring-[#B88A35]'
                          : 'border-[#E8D1A5] text-[#795D58] hover:border-[#B88A35]'
                      }`}
                    >
                      {item.label}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Step C: Select Frame Size */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label className="text-xs font-bold uppercase tracking-wider text-[#511B2A]">
                  Step 3B: Select Frame Dimensions (4mm Cast Acrylic)
                </label>
                <span className="text-[11px] text-[#A06E28] font-semibold">{displaySizeLabel}</span>
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
                          ? 'border-[#B88A35] bg-[#FAF3E8] text-[#511B2A] font-bold ring-1 ring-[#B88A35]'
                          : 'border-[#E8D1A5] text-[#795D58] hover:border-[#B88A35]'
                      }`}
                    >
                      <div className="text-xs font-bold text-[#511B2A] flex items-center justify-between">
                        <span>{sz.label}</span>
                        {sz.isPopular && (
                          <span className="text-[8px] bg-amber-100 text-amber-800 px-1 py-0.5 rounded font-bold">
                            Popular
                          </span>
                        )}
                      </div>
                      <div className="text-[11px] text-[#A06E28] font-semibold mt-0.5">
                        {sz.id === 'custom' ? 'Custom Quote' : `From ₹${itemPrice.toLocaleString('en-IN')}`}
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* Custom Size Interactive Input Fields */}
              {selectedSizeId === 'custom' && (
                <div className="p-3 bg-[#FAF3E8] rounded-xl border border-[#D6AA55] space-y-2 animate-in fade-in duration-200">
                  <span className="text-[11px] font-bold text-[#511B2A] block">
                    Enter Custom Dimensions (in inches):
                  </span>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="text-[10px] text-[#795D58] block mb-1">Width (inches)</label>
                      <input
                        type="number"
                        min={6}
                        max={72}
                        value={customWidth}
                        onChange={(e) => setCustomWidth(Math.max(6, Number(e.target.value)))}
                        className="w-full px-3 py-1.5 text-xs bg-white border border-[#D6AA55] rounded-lg text-[#511B2A] outline-none font-bold"
                      />
                    </div>
                    <div>
                      <label className="text-[10px] text-[#795D58] block mb-1">Height (inches)</label>
                      <input
                        type="number"
                        min={6}
                        max={72}
                        value={customHeight}
                        onChange={(e) => setCustomHeight(Math.max(6, Number(e.target.value)))}
                        className="w-full px-3 py-1.5 text-xs bg-white border border-[#D6AA55] rounded-lg text-[#511B2A] outline-none font-bold"
                      />
                    </div>
                  </div>
                  <p className="text-[10px] text-[#795D58]">
                    ✦ Factory fabrication available up to 6×4 ft (72×48 in) with pre-installed heavy-duty mounts.
                  </p>
                </div>
              )}
            </div>

            {/* Step D: Select Frame Finish */}
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-wider text-[#511B2A] flex items-center justify-between">
                <span>Step 4: Select Frame Finish & LED Lighting</span>
                <span className="text-[10px] text-[#A06E28] font-normal">{activeFinishObj.name}</span>
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
                          ? 'border-[#B88A35] bg-[#FAF3E8] ring-1 ring-[#B88A35]'
                          : 'border-[#E8D1A5] hover:border-[#B88A35]'
                      }`}
                    >
                      <div>
                        <div className="text-xs font-bold text-[#511B2A]">{f.name}</div>
                        <div className="text-[10px] text-[#795D58]">{f.subtitle}</div>
                      </div>
                      <span className="text-xs font-semibold text-[#A06E28]">
                        {f.priceAddition > 0 ? `+₹${f.priceAddition}` : 'Included'}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Step E: LED Options */}
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-wider text-[#511B2A] flex items-center justify-between">
                <span>Step 4B: LED Backlight Color (3000K Halo)</span>
                <span className="text-[10px] text-[#A06E28] font-normal">{activeLedObj.name}</span>
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
                          ? 'border-[#B88A35] bg-[#FAF3E8] ring-1 ring-[#B88A35]'
                          : 'border-[#E8D1A5] hover:border-[#B88A35]'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-[#511B2A]">{l.temperature}</span>
                        {l.id !== 'none' && (
                          <Zap className="w-3 h-3 text-amber-500 fill-amber-500" />
                        )}
                      </div>
                      <div className="text-[10px] text-[#795D58] mt-0.5">{l.name.split('(')[0]}</div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Optional Personal Inscription */}
            <div className="space-y-1">
              <label className="text-xs font-bold uppercase tracking-wider text-[#511B2A] block">
                Step 5: Add Personal Message / Inscription (Optional)
              </label>
              <input
                type="text"
                placeholder="e.g. The Sharma Family • Est. 2026"
                value={customText}
                onChange={(e) => setCustomText(e.target.value)}
                maxLength={60}
                className="w-full px-3.5 py-2.5 text-xs bg-[#FFFDF9] border border-[#E8D1A5] rounded-xl outline-none focus:border-[#B88A35] text-[#511B2A] font-serif"
              />
              <span className="text-[10px] text-[#795D58] block">
                ✦ Displayed in 24K gold foil or crisp typography at the bottom of the frame.
              </span>
            </div>

            {/* Special Instructions */}
            <div className="space-y-1">
              <label className="text-xs font-semibold text-[#511B2A] block">
                Special Workshop Instructions (Optional)
              </label>
              <textarea
                rows={2}
                placeholder="e.g. Please enhance facial brightness, crop closely, or remove background tint."
                value={specialInstructions}
                onChange={(e) => setSpecialInstructions(e.target.value)}
                className="w-full px-3.5 py-2 text-xs bg-[#FFFDF9] border border-[#E8D1A5] rounded-xl outline-none focus:border-[#B88A35] text-[#511B2A]"
              />
            </div>

            {/* =====================================================
                PRICING SUMMARY & ORDER CARD
                ===================================================== */}
            <div className="bg-[#FAF3E8] p-4 sm:p-5 rounded-2xl border border-[#D6AA55] space-y-3">
              <div className="flex items-baseline justify-between border-b border-[#E8D1A5] pb-2.5">
                <div>
                  <span className="text-xs text-[#795D58] block">Step 6: Live Price & Configuration Review</span>
                  <div className="flex items-baseline gap-2">
                    <span className="font-serif text-2xl sm:text-3xl font-bold text-[#511B2A]">
                      ₹{pricing.price.toLocaleString('en-IN')}
                    </span>
                    <span className="text-xs text-[#795D58]/70 line-through">
                      ₹{pricing.mrp.toLocaleString('en-IN')}
                    </span>
                  </div>
                </div>
                <span className="text-xs font-bold text-[#511B2A] bg-white border border-[#D6AA55] px-2.5 py-1 rounded-full shadow-2xs">
                  Save {pricing.discountPercent}%
                </span>
              </div>

              <div className="text-[11px] text-[#795D58] space-y-1">
                <div className="flex justify-between">
                  <span>Size &amp; Category:</span>
                  <span className="font-semibold text-[#511B2A]">{displaySizeLabel}</span>
                </div>
                <div className="flex justify-between">
                  <span>Finish &amp; Hardware:</span>
                  <span className="font-semibold text-[#511B2A]">{activeFinishObj.name}</span>
                </div>
                <div className="flex justify-between">
                  <span>Lighting:</span>
                  <span className="font-semibold text-[#511B2A]">{activeLedObj.name}</span>
                </div>
                <div className="flex justify-between text-emerald-700 font-semibold pt-1 border-t border-[#E8D1A5]">
                  <span>Pan-India Shipping:</span>
                  <span>FREE Express (48h dispatch)</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-2 pt-2">
                <button
                  type="button"
                  onClick={handleOrderNow}
                  className="w-full bg-[#511B2A] hover:bg-[#641E2E] text-[#FFF7ED] border border-[#B88A35]/50 py-3.5 rounded-xl font-bold text-sm shadow-md transition-all cursor-pointer flex items-center justify-center gap-2 uppercase tracking-wider"
                >
                  <span>Order Now • ₹{pricing.price.toLocaleString('en-IN')}</span>
                  <ArrowRight className="w-4 h-4 text-[#E8C77E]" />
                </button>

                <a
                  href={whatsappInquiryUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full bg-white hover:bg-[#FFFDF9] text-[#511B2A] border border-[#D6AA55] py-3 rounded-xl font-bold text-xs shadow-2xs transition-colors flex items-center justify-center gap-2 uppercase tracking-wider"
                >
                  <MessageCircle className="w-4 h-4 text-emerald-600 fill-emerald-600" />
                  <span>Request Custom Quotation / WhatsApp Proof</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================
          3. PRODUCT GALLERY: 9 CURATED CUSTOM PHOTO FRAME STYLES
          ========================================================= */}
      <section id="custom-gallery" className="w-full max-w-[1720px] mx-auto px-4 sm:px-6 lg:px-10 xl:px-14 py-12 sm:py-16 border-t border-[#E8D1A5]/60">
        <div className="text-center max-w-3xl mx-auto mb-10 space-y-2">
          <span className="text-xs uppercase tracking-widest font-bold text-[#641E2E] bg-white border border-[#B88A35]/80 px-4 py-1.5 rounded-full inline-flex items-center gap-1.5 shadow-2xs">
            <Layers className="w-3.5 h-3.5 text-[#B88A35]" />
            <span>Dedicated Photo Frame Collections</span>
          </span>
          <h2 className="font-serif font-bold text-2xl sm:text-3xl md:text-4xl text-[#511B2A]">
            Explore Custom Photo Frame Creations
          </h2>
          <p className="text-xs sm:text-sm text-[#795D58]">
            Every style is hand-fabricated in our Dilsukhnagar workshop. Click "Customize This Style" to load any configuration directly into the designer studio above.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {GALLERY_PRODUCTS.map((prod) => (
            <div
              key={prod.id}
              className="bg-white rounded-3xl overflow-hidden border border-[#E8D1A5] hover:border-[#B88A35] shadow-xs hover:shadow-md transition-all duration-300 flex flex-col justify-between group"
            >
              <div>
                <div className="relative aspect-[4/3] w-full overflow-hidden bg-stone-900">
                  <img
                    src={prod.image}
                    alt={prod.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-3 left-3 bg-[#511B2A]/90 text-[#FFF7ED] text-[10px] font-bold px-2.5 py-0.5 rounded-full shadow-md border border-[#D6AA55]/50 backdrop-blur-xs">
                    {prod.badge}
                  </div>
                  <div className="absolute bottom-3 right-3 bg-white/95 text-[#511B2A] text-xs font-bold px-2.5 py-1 rounded-full shadow-md border border-[#E8D1A5]">
                    From ₹{prod.startingPrice.toLocaleString('en-IN')}
                  </div>
                </div>

                <div className="p-5 space-y-2">
                  <div className="flex items-center justify-between text-[11px] font-bold text-[#A06E28]">
                    <span>{prod.category}</span>
                    <span className="text-stone-400 line-through">₹{prod.mrp.toLocaleString('en-IN')}</span>
                  </div>
                  <h3 className="font-serif font-bold text-base sm:text-lg text-[#511B2A] group-hover:text-[#641E2E] transition-colors leading-snug">
                    {prod.title}
                  </h3>
                  <p className="text-xs text-[#795D58] leading-relaxed line-clamp-2">
                    {prod.description}
                  </p>
                </div>
              </div>

              <div className="p-5 pt-0">
                <button
                  type="button"
                  onClick={() => handleApplyPreset(prod.preset, prod.title)}
                  className="w-full bg-[#FAF3E8] hover:bg-[#511B2A] text-[#511B2A] hover:text-[#FFF7ED] border border-[#D6AA55] font-bold text-xs py-2.5 rounded-xl transition-all flex items-center justify-center gap-2 cursor-pointer uppercase tracking-wider group-hover:shadow-sm"
                >
                  <span>Customize This Style</span>
                  <ArrowRight className="w-3.5 h-3.5 text-[#A06E28] group-hover:text-[#E8C77E]" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* =========================================================
          4. HOW IT WORKS: 4 SIMPLE STEPS TO CUSTOM HEIRLOOM
          ========================================================= */}
      <section className="w-full bg-gradient-to-b from-[#FAF3E8] via-[#FFFDF9] to-[#FAF3E8] border-y border-[#E8D1A5]/70 py-12 sm:py-16">
        <div className="w-full max-w-[1720px] mx-auto px-4 sm:px-6 lg:px-10 xl:px-14">
          <div className="text-center max-w-2xl mx-auto mb-10 space-y-2">
            <span className="text-xs uppercase tracking-widest font-bold text-[#641E2E] bg-white border border-[#B88A35]/80 px-4 py-1.5 rounded-full inline-flex items-center gap-1.5 shadow-2xs">
              <Clock className="w-3.5 h-3.5 text-[#B88A35]" />
              <span>Effortless Fabrication</span>
            </span>
            <h2 className="font-serif font-bold text-2xl sm:text-3xl md:text-4xl text-[#511B2A]">
              How It Works: 4 Simple Steps
            </h2>
            <p className="text-xs sm:text-sm text-[#795D58]">
              From digital concept to factory-direct Hyderabad delivery in four seamless steps.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {/* Step 1 */}
            <div className="bg-white p-6 rounded-3xl border border-[#E8D1A5] shadow-xs hover:border-[#B88A35] transition-all space-y-3">
              <div className="w-10 h-10 rounded-2xl bg-[#511B2A] text-[#FFF7ED] font-serif font-bold text-base flex items-center justify-center shadow-xs">
                01
              </div>
              <h3 className="font-serif font-bold text-base text-[#511B2A]">
                Choose Your Frame
              </h3>
              <p className="text-xs text-[#795D58] leading-relaxed">
                Select your preferred frame category, orientation (portrait, landscape, square, round), dimensions, and warm LED backlight.
              </p>
              <div className="text-[11px] font-bold text-[#A06E28] flex items-center gap-1 pt-1">
                <Check className="w-3.5 h-3.5 text-emerald-600" />
                <span>6 Categories &amp; Sizing</span>
              </div>
            </div>

            {/* Step 2 */}
            <div className="bg-white p-6 rounded-3xl border border-[#E8D1A5] shadow-xs hover:border-[#B88A35] transition-all space-y-3">
              <div className="w-10 h-10 rounded-2xl bg-[#A06E28] text-[#FFF7ED] font-serif font-bold text-base flex items-center justify-center shadow-xs">
                02
              </div>
              <h3 className="font-serif font-bold text-base text-[#511B2A]">
                Upload Your Memory
              </h3>
              <p className="text-xs text-[#795D58] leading-relaxed">
                Upload your favorite photograph from your phone or desktop. See an instant real-time 3D simulation on realistic wall backgrounds.
              </p>
              <div className="text-[11px] font-bold text-[#A06E28] flex items-center gap-1 pt-1">
                <Check className="w-3.5 h-3.5 text-emerald-600" />
                <span>Instant 3D Preview</span>
              </div>
            </div>

            {/* Step 3 */}
            <div className="bg-white p-6 rounded-3xl border border-[#E8D1A5] shadow-xs hover:border-[#B88A35] transition-all space-y-3">
              <div className="w-10 h-10 rounded-2xl bg-[#641E2E] text-[#FFF7ED] font-serif font-bold text-base flex items-center justify-center shadow-xs">
                03
              </div>
              <h3 className="font-serif font-bold text-base text-[#511B2A]">
                Preview &amp; Approve
              </h3>
              <p className="text-xs text-[#795D58] leading-relaxed">
                Review your customized frame design. Our master artisans check image resolution, enhance color vibrancy, and share a 1:1 WhatsApp proof.
              </p>
              <div className="text-[11px] font-bold text-[#A06E28] flex items-center gap-1 pt-1">
                <Check className="w-3.5 h-3.5 text-emerald-600" />
                <span>100% Visual Sign-Off</span>
              </div>
            </div>

            {/* Step 4 */}
            <div className="bg-white p-6 rounded-3xl border border-[#E8D1A5] shadow-xs hover:border-[#B88A35] transition-all space-y-3">
              <div className="w-10 h-10 rounded-2xl bg-emerald-800 text-[#FFF7ED] font-serif font-bold text-base flex items-center justify-center shadow-xs">
                04
              </div>
              <h3 className="font-serif font-bold text-base text-[#511B2A]">
                Place Your Order
              </h3>
              <p className="text-xs text-[#795D58] leading-relaxed">
                Diamond CNC fabricated with virgin 4mm cast acrylic. Packed in 5-layer wood-reinforced packaging with free Pan-India door delivery.
              </p>
              <div className="text-[11px] font-bold text-[#A06E28] flex items-center gap-1 pt-1">
                <Check className="w-3.5 h-3.5 text-emerald-600" />
                <span>Damage-Free Guarantee</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================
          5. CUSTOMER SUPPORT & ARTISAN CONCIERGE BANNER
          ========================================================= */}
      <section className="w-full max-w-[1720px] mx-auto px-4 sm:px-6 lg:px-10 xl:px-14 py-12 sm:py-16">
        <div className="p-8 sm:p-10 rounded-3xl bg-gradient-to-r from-[#511B2A] via-[#641E2E] to-[#511B2A] text-white flex flex-col lg:flex-row items-center justify-between gap-8 border border-[#D6AA55] shadow-lg">
          <div className="space-y-2 text-center lg:text-left max-w-2xl">
            <span className="text-[11px] uppercase tracking-widest font-bold text-[#FFD782] bg-white/10 px-3 py-1 rounded-full border border-white/20 inline-block">
              ✦ Artisan Concierge • Hyderabad Workshop ✦
            </span>
            <h3 className="font-serif font-bold text-2xl sm:text-3xl text-[#FFF7ED]">
              Need Help? Chat With Our Artisans
            </h3>
            <p className="text-xs sm:text-sm text-[#E8D5BD]/90 leading-relaxed font-sans">
              Have a low-resolution photo, custom temple alcove dimensions, wedding vows script, or urgent express dispatch requirement? Talk directly to our workshop artisans for instant proofing and advice.
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3 shrink-0">
            <a
              href={whatsappInquiryUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[#D6AA55] hover:bg-[#E8C77E] text-[#511B2A] font-bold text-xs sm:text-sm px-7 py-3.5 rounded-full shadow-md transition-all hover:scale-105 flex items-center gap-2 uppercase tracking-wider"
            >
              <MessageCircle className="w-4 h-4 text-[#511B2A] fill-[#511B2A]" />
              <span>Need Help? Chat With Our Artisans</span>
            </a>

            <a
              href="tel:917780269927"
              className="bg-white/10 hover:bg-white/20 text-[#FFF7ED] border border-white/30 font-bold text-xs sm:text-sm px-6 py-3.5 rounded-full transition-colors flex items-center gap-2 uppercase tracking-wider"
            >
              <PhoneCall className="w-4 h-4 text-[#FFD782]" />
              <span>Call +91 77802 69927</span>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
