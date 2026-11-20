'use client';

import React, { useState, useMemo, useEffect, useRef } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  Check,
  CheckCircle2,
  ZoomIn,
  X,
  MessageCircle,
  RotateCcw,
  Banknote,
  Sparkles,
  ArrowRight,
  Info,
  ShieldCheck,
  Sun,
  Zap,
  ChevronRight,
  ChevronLeft,
  ChevronDown,
  Ruler,
  ShoppingBag,
  MapPin,
  HelpCircle,
  Layers,
  Eye,
  Flame,
  Camera,
  Power,
  Wrench,
} from 'lucide-react';
import AddPhotoModal from '@/components/product/AddPhotoModal';
import CustomSizeInput from '@/components/product/CustomSizeInput';
import { calculateCustomDimensions } from '@/lib/utils/customSize';
import { Product } from '@/types';
import { useCart } from '@/context/CartContext';
import { INITIAL_SETTINGS } from '@/lib/data/settings';
import ProductCard from '@/components/product/ProductCard';

export type ShapeOptionType = 'portrait' | 'landscape' | 'square';
export type FrameType = 'gold' | 'black' | 'without';
export type ThicknessType = '3mm' | '5mm';

export interface SizeOption {
  id: string;
  label: string;
  dimensionsCm: string;
  allowedFrames: FrameType[];
  allowedThickness: ThicknessType[];
  mountingHardware: {
    framed: string;
    without3mm: string;
    without5mm: string;
  };
  prices: {
    without_3mm?: { price: number; mrp: number };
    without_5mm?: { price: number; mrp: number };
    gold?: { price: number; mrp: number };
    black?: { price: number; mrp: number };
  };
}

export const SHAPE_CONFIGS: Record<ShapeOptionType, {
  id: ShapeOptionType;
  label: string;
  subtitle: string;
  ratioLabel: string;
  dimensionsNote: string;
}> = {
  portrait: {
    id: 'portrait',
    label: 'Portrait',
    subtitle: 'Vertical / 2:3',
    ratioLabel: 'Vertical (2:3)',
    dimensionsNote: 'Ideal for Mandir Sanctums & Pillars',
  },
  landscape: {
    id: 'landscape',
    label: 'Landscape',
    subtitle: 'Horizontal / 3:2',
    ratioLabel: 'Horizontal (3:2)',
    dimensionsNote: 'Ideal for Living Room Sofa & Bed Backdrops',
  },
  square: {
    id: 'square',
    label: 'Square',
    subtitle: 'Balanced / 1:1',
    ratioLabel: 'Balanced (1:1)',
    dimensionsNote: 'Ideal for Yantras & Mandalas',
  },
};

export const SHAPE_SIZES: Record<ShapeOptionType, SizeOption[]> = {
  portrait: [
    {
      id: '12x18',
      label: '12x18',
      dimensionsCm: '30 x 45 cm',
      allowedFrames: ['gold', 'black', 'without'],
      allowedThickness: ['3mm', '5mm'],
      mountingHardware: {
        framed: 'For Frames Wall Plugs and Screws are Provided',
        without3mm: 'Wall Mounting Studs and Hardware Provided',
        without5mm: 'Premium Metal Wall Mounting Studs Included with Screws',
      },
      prices: {
        without_3mm: { price: 1299, mrp: 2499 },
        without_5mm: { price: 1499, mrp: 2799 },
        gold: { price: 1799, mrp: 3499 },
        black: { price: 1799, mrp: 3499 },
      },
    },
    {
      id: '16x24',
      label: '16x24',
      dimensionsCm: '40 x 60 cm',
      allowedFrames: ['gold', 'black', 'without'],
      allowedThickness: ['3mm', '5mm'],
      mountingHardware: {
        framed: 'For Frames Wall Plugs and Screws are Provided',
        without3mm: 'Wall Mounting Studs and Hardware Provided',
        without5mm: 'Premium Metal Wall Mounting Studs Included with Screws',
      },
      prices: {
        without_3mm: { price: 2299, mrp: 4399 },
        without_5mm: { price: 2599, mrp: 4899 },
        gold: { price: 2999, mrp: 5699 },
        black: { price: 2999, mrp: 5699 },
      },
    },
    {
      id: '24x35',
      label: '24x35',
      dimensionsCm: '60 x 89 cm',
      allowedFrames: ['gold', 'black', 'without'],
      allowedThickness: ['5mm'],
      mountingHardware: {
        framed: 'For Frames Wall Plugs and Screws are Provided',
        without3mm: '',
        without5mm: 'Premium Metal Wall Mounting Studs Included with Screws',
      },
      prices: {
        without_5mm: { price: 4899, mrp: 8999 },
        gold: { price: 5499, mrp: 9999 },
        black: { price: 5499, mrp: 9999 },
      },
    },
    {
      id: '30x47',
      label: '30x47',
      dimensionsCm: '75 x 120 cm',
      allowedFrames: ['gold', 'black', 'without'],
      allowedThickness: ['5mm'],
      mountingHardware: {
        framed: 'For Frames Wall Plugs and Screws are Provided',
        without3mm: '',
        without5mm: 'Premium Metal Wall Mounting Studs Included with Screws',
      },
      prices: {
        without_5mm: { price: 8899, mrp: 15999 },
        gold: { price: 9499, mrp: 17999 },
        black: { price: 9499, mrp: 17999 },
      },
    },
  ],
  landscape: [
    {
      id: '18x12',
      label: '18x12',
      dimensionsCm: '45 x 30 cm',
      allowedFrames: ['gold', 'black', 'without'],
      allowedThickness: ['3mm', '5mm'],
      mountingHardware: {
        framed: 'For Frames Wall Plugs and Screws are Provided',
        without3mm: 'Wall Mounting Studs and Hardware Provided',
        without5mm: 'Premium Metal Wall Mounting Studs Included with Screws',
      },
      prices: {
        without_3mm: { price: 1299, mrp: 2499 },
        without_5mm: { price: 1499, mrp: 2799 },
        gold: { price: 1799, mrp: 3499 },
        black: { price: 1799, mrp: 3499 },
      },
    },
    {
      id: '24x16',
      label: '24x16',
      dimensionsCm: '60 x 40 cm',
      allowedFrames: ['gold', 'black', 'without'],
      allowedThickness: ['3mm', '5mm'],
      mountingHardware: {
        framed: 'For Frames Wall Plugs and Screws are Provided',
        without3mm: 'Wall Mounting Studs and Hardware Provided',
        without5mm: 'Premium Metal Wall Mounting Studs Included with Screws',
      },
      prices: {
        without_3mm: { price: 2299, mrp: 4399 },
        without_5mm: { price: 2599, mrp: 4899 },
        gold: { price: 2999, mrp: 5699 },
        black: { price: 2999, mrp: 5699 },
      },
    },
    {
      id: '35x24',
      label: '35x24',
      dimensionsCm: '89 x 60 cm',
      allowedFrames: ['gold', 'black', 'without'],
      allowedThickness: ['5mm'],
      mountingHardware: {
        framed: 'For Frames Wall Plugs and Screws are Provided',
        without3mm: '',
        without5mm: 'Premium Metal Wall Mounting Studs Included with Screws',
      },
      prices: {
        without_5mm: { price: 4899, mrp: 8999 },
        gold: { price: 5499, mrp: 9999 },
        black: { price: 5499, mrp: 9999 },
      },
    },
    {
      id: '47x30',
      label: '47x30',
      dimensionsCm: '120 x 75 cm',
      allowedFrames: ['gold', 'black', 'without'],
      allowedThickness: ['5mm'],
      mountingHardware: {
        framed: 'For Frames Wall Plugs and Screws are Provided',
        without3mm: '',
        without5mm: 'Premium Metal Wall Mounting Studs Included with Screws',
      },
      prices: {
        without_5mm: { price: 8899, mrp: 15999 },
        gold: { price: 9499, mrp: 17999 },
        black: { price: 9499, mrp: 17999 },
      },
    },
    {
      id: '60x35',
      label: '60x35',
      dimensionsCm: '152 x 89 cm',
      allowedFrames: ['gold', 'black', 'without'],
      allowedThickness: ['5mm'],
      mountingHardware: {
        framed: 'For Frames Wall Plugs and Screws are Provided',
        without3mm: '',
        without5mm: 'Premium Metal Wall Mounting Studs Included with Screws',
      },
      prices: {
        without_5mm: { price: 11499, mrp: 21999 },
        gold: { price: 12500, mrp: 23999 },
        black: { price: 12500, mrp: 23999 },
      },
    },
  ],
  square: [
    {
      id: '12x12',
      label: '12x12',
      dimensionsCm: '30 x 30 cm',
      allowedFrames: ['gold', 'black', 'without'],
      allowedThickness: ['3mm', '5mm'],
      mountingHardware: {
        framed: 'For Frames Wall Plugs and Screws are Provided',
        without3mm: 'Wall Mounting Studs and Hardware Provided',
        without5mm: 'Premium Metal Wall Mounting Studs Included with Screws',
      },
      prices: {
        without_3mm: { price: 1199, mrp: 2299 },
        without_5mm: { price: 1399, mrp: 2599 },
        gold: { price: 1699, mrp: 3199 },
        black: { price: 1699, mrp: 3199 },
      },
    },
    {
      id: '18x18',
      label: '18x18',
      dimensionsCm: '45 x 45 cm',
      allowedFrames: ['gold', 'black', 'without'],
      allowedThickness: ['3mm', '5mm'],
      mountingHardware: {
        framed: 'For Frames Wall Plugs and Screws are Provided',
        without3mm: 'Wall Mounting Studs and Hardware Provided',
        without5mm: 'Premium Metal Wall Mounting Studs Included with Screws',
      },
      prices: {
        without_3mm: { price: 1999, mrp: 3799 },
        without_5mm: { price: 2299, mrp: 4299 },
        gold: { price: 2699, mrp: 4999 },
        black: { price: 2699, mrp: 4999 },
      },
    },
    {
      id: '24x24',
      label: '24x24',
      dimensionsCm: '60 x 60 cm',
      allowedFrames: ['gold', 'black', 'without'],
      allowedThickness: ['5mm'],
      mountingHardware: {
        framed: 'For Frames Wall Plugs and Screws are Provided',
        without3mm: '',
        without5mm: 'Premium Metal Wall Mounting Studs Included with Screws',
      },
      prices: {
        without_5mm: { price: 3699, mrp: 6999 },
        gold: { price: 4299, mrp: 7999 },
        black: { price: 4299, mrp: 7999 },
      },
    },
    {
      id: '30x30',
      label: '30x30',
      dimensionsCm: '75 x 75 cm',
      allowedFrames: ['gold', 'black', 'without'],
      allowedThickness: ['5mm'],
      mountingHardware: {
        framed: 'For Frames Wall Plugs and Screws are Provided',
        without3mm: '',
        without5mm: 'Premium Metal Wall Mounting Studs Included with Screws',
      },
      prices: {
        without_5mm: { price: 5899, mrp: 10999 },
        gold: { price: 6499, mrp: 12499 },
        black: { price: 6499, mrp: 12499 },
      },
    },
  ],
};


export const SIZE_OPTIONS: SizeOption[] = [
  ...SHAPE_SIZES.portrait,
  ...SHAPE_SIZES.landscape,
  ...SHAPE_SIZES.square,
];

export const GALLERY_STYLE_LABELS = [
  'Primary Product Showcase',
  'Luxury Living Room View',
  'Modern Minimalist Interior',
  'Artwork Close-up Detail',
  'Frame & Material Details',
  'Alternative Room Setting',
];

interface Props {
  product: Product;
  relatedProducts: Product[];
}

export default function ProductDetailClient({ product, relatedProducts }: Props) {
  const router = useRouter();
  const { addToCart, closeCart } = useCart();

  // Live product synchronization with API to reflect instant admin changes
  const [liveProduct, setLiveProduct] = useState<Product>(product);

  useEffect(() => {
    let isMounted = true;
    fetch(`/api/products/${product.slug}`)
      .then((res) => res.json())
      .then((data) => {
        if (isMounted && data.success && data.product) {
          setLiveProduct(data.product);
        }
      })
      .catch(() => {});
    return () => {
      isMounted = false;
    };
  }, [product.slug]);

  // Selected shape & layout state
  const initialShape: ShapeOptionType = useMemo(() => {
    if (product.shape === 'square' || product.orientation === 'square') return 'square';
    if (product.shape === 'landscape' || product.orientation === 'horizontal') return 'landscape';
    return 'portrait';
  }, [product.shape, product.orientation]);

  const [selectedShape, setSelectedShape] = useState<ShapeOptionType>(initialShape);

  // Check if product is a Glitter Photo Frame
  const isGlitterFrame = useMemo(() => {
    if (product.categorySlug === 'glitter-photo-frames') return true;
    if (product.categorySlugs && product.categorySlugs.includes('glitter-photo-frames')) return true;
    if (product.slug?.includes('glitter')) return true;
    return false;
  }, [product.categorySlug, product.categorySlugs, product.slug]);

  // Check if product is an LED Backlit Frame (Wall frame with integrated LED backlighting)
  const isLedFrame = useMemo(() => {
    if (
      product.categorySlug === '360-rotating-photo-lamps' ||
      product.categorySlugs?.includes('360-rotating-photo-lamps') ||
      liveProduct?.categorySlug === '360-rotating-photo-lamps' ||
      liveProduct?.categorySlugs?.includes('360-rotating-photo-lamps') ||
      product.slug?.includes('rotating') ||
      product.slug?.includes('lamp')
    ) {
      return false;
    }
    return Boolean(
      product.hasLedBacklight ||
      liveProduct?.hasLedBacklight ||
      product.categorySlug === 'led-acrylic-photo-frames' ||
      liveProduct?.categorySlug === 'led-acrylic-photo-frames' ||
      product.categorySlugs?.includes('led-acrylic-photo-frames') ||
      liveProduct?.categorySlugs?.includes('led-acrylic-photo-frames') ||
      product.slug?.includes('led') ||
      product.title?.toLowerCase().includes('led') ||
      liveProduct?.title?.toLowerCase().includes('led')
    );
  }, [product, liveProduct]);

  // Check if product is an Acrylic Frame (Non-LED crystal clear acrylic wall art)
  const isAcrylicFrame = useMemo(() => {
    if (isLedFrame) return false;
    if (product.hasLedBacklight || liveProduct?.hasLedBacklight) return false;
    if (isGlitterFrame) return false;
    if (
      product.categorySlug === '360-rotating-photo-lamps' ||
      product.categorySlugs?.includes('360-rotating-photo-lamps') ||
      product.slug?.includes('rotating') ||
      product.slug?.includes('lamp')
    ) {
      return false;
    }
    return true;
  }, [isLedFrame, product.hasLedBacklight, liveProduct?.hasLedBacklight, isGlitterFrame, product.categorySlug, product.categorySlugs, product.slug]);

  // Available sizes calibrated for the selected shape & product variants
  const availableSizes = useMemo(() => {
    const defaultList = SHAPE_SIZES[selectedShape] || SHAPE_SIZES.portrait;

    // Check if product has custom variants configured specifically for this orientation
    const shapeVariants = liveProduct.orientationVariants?.[selectedShape];
    const sourceVariants =
      shapeVariants && shapeVariants.length > 0
        ? shapeVariants
        : liveProduct.variants && liveProduct.variants.length > 0
        ? liveProduct.variants
        : null;

    if (sourceVariants && sourceVariants.length > 0) {
      if (isGlitterFrame) {
        return sourceVariants.map((v, idx) => {
          const vPrice = Number(v.price) || 1299;
          const vMrp = Number(v.mrp) || Math.round(vPrice * 1.8);
          const cleanLabel = v.size ? v.size.replace(' inches', '').replace(' (Grand Wall Size)', '') : `Size ${idx + 1}`;
          return {
            id: v.id || `glit-${idx}`,
            label: cleanLabel,
            dimensionsCm: v.dimensionsCm || '',
            allowedFrames: ['gold', 'black', 'without'] as FrameType[],
            allowedThickness: ['5mm'] as ThicknessType[],
            mountingHardware: {
              framed: '',
              without3mm: 'Tabletop acrylic block or floating standoffs included',
              without5mm: 'Tabletop acrylic block or floating standoffs included',
            },
            prices: {
              gold: { price: vPrice, mrp: vMrp },
              black: { price: vPrice, mrp: vMrp },
              without_3mm: { price: vPrice, mrp: vMrp },
              without_5mm: { price: vPrice, mrp: vMrp },
            },
          };
        });
      }

      return defaultList.map((sizeObj, idx) => {
        const v = sourceVariants[idx];
        if (!v || !v.price) return {
          ...sizeObj,
          allowedThickness: isAcrylicFrame ? (['5mm'] as ThicknessType[]) : sizeObj.allowedThickness,
        };
        const vPrice = Number(v.price);
        const vMrp = Number(v.mrp) || Math.round(vPrice * 1.8);
        return {
          ...sizeObj,
          label: v.size.replace(' (Grand Wall Size)', '').replace(' (Grand Sanctum)', ''),
          dimensionsCm: v.dimensionsCm || sizeObj.dimensionsCm,
          allowedThickness: isAcrylicFrame ? (['5mm'] as ThicknessType[]) : sizeObj.allowedThickness,
          prices: {
            ...sizeObj.prices,
            gold: { price: vPrice, mrp: vMrp },
            black: { price: vPrice, mrp: vMrp },
            without_5mm: { price: Math.max(999, vPrice - 300), mrp: vMrp },
            without_3mm: { price: Math.max(799, vPrice - 500), mrp: vMrp },
          },
        };
      });
    }

    if (isAcrylicFrame) {
      return defaultList.map((s) => ({
        ...s,
        allowedThickness: ['5mm'] as ThicknessType[],
      }));
    }

    return defaultList;
  }, [selectedShape, liveProduct.orientationVariants, liveProduct.variants, isGlitterFrame, isAcrylicFrame]);

  // Selected frame & size state
  const [selectedFrame, setSelectedFrame] = useState<FrameType>(() => {
    return (product.categorySlug === 'glitter-photo-frames' || product.categorySlugs?.includes('glitter-photo-frames') || product.slug?.includes('glitter'))
      ? 'without'
      : 'gold';
  });
  const [selectedSizeId, setSelectedSizeId] = useState<string | null>(() => {
    if (product.categorySlug === 'glitter-photo-frames' || product.categorySlugs?.includes('glitter-photo-frames') || product.slug?.includes('glitter')) {
      return product.variants?.[0]?.id || 'var-glit-1';
    }
    const initList = SHAPE_SIZES[initialShape] || SHAPE_SIZES.portrait;
    return initList[0]?.id || '12x18';
  });
  const [selectedThickness, setSelectedThickness] = useState<ThicknessType>('5mm');
  const [quantity, setQuantity] = useState(1);
  const [isCustomizerOpen, setIsCustomizerOpen] = useState(false);
  const [isCustomSize, setIsCustomSize] = useState(false);
  const [customWidth, setCustomWidth] = useState<number>(24);
  const [customHeight, setCustomHeight] = useState<number>(36);

  // Gallery state
  const galleryImages = useMemo(() => {
    return Array.from(new Set((product.images || []).filter(Boolean)));
  }, [product.images]);

  const [activeImageIndex, setActiveImageIndex] = useState<number>(0);
  const activeImage = galleryImages[activeImageIndex] || product.images[0] || '';

  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [zoomCoords, setZoomCoords] = useState<{ x: number; y: number } | null>(null);
  const [isAartiGlow, setIsAartiGlow] = useState(product.hasLedBacklight);

  // Pincode Checker State
  const [pincode, setPincode] = useState('');
  const [pincodeStatus, setPincodeStatus] = useState<{
    checked: boolean;
    valid: boolean;
    message: string;
    deliveryDate?: string;
  } | null>(null);

  // Sticky Purchase Bar State
  const [showStickyBar, setShowStickyBar] = useState(false);
  const mainPurchaseRef = useRef<HTMLDivElement>(null);

  // Accordion Sections State
  const [openSections, setOpenSections] = useState<Record<string, boolean>>({
    overview: true,
    specs: false,
    sizing: false,
    craftInstall: false,
    shippingFaq: false,
    // LED 10-section layout keys
    ledMaterial: true,
    ledUvPrint: false,
    ledBorder: false,
    ledLighting: false,
    ledSpecs: false,
    ledPower: false,
    ledInstall: false,
    ledCare: false,
    ledFaq: false,
  });

  const toggleSection = (key: string) => {
    setOpenSections((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  // Preload all gallery and frame images in the background
  useEffect(() => {
    if (typeof window !== 'undefined') {
      galleryImages.forEach((src) => {
        const img = new window.Image();
        img.src = src;
      });
      [
        '/images/frames/gold-border-ref.jpg',
        '/images/frames/black-border-ref.jpg',
        '/images/frames/acrylic-border-ref.jpg',
      ].forEach((src) => {
        const img = new window.Image();
        img.src = src;
      });
    }
  }, [galleryImages]);

  // Sticky Bar Scroll Listener
  useEffect(() => {
    const handleScroll = () => {
      if (mainPurchaseRef.current) {
        const rect = mainPurchaseRef.current.getBoundingClientRect();
        // Show sticky bar when the purchase section scrolls above viewport
        setShowStickyBar(rect.bottom < 100);
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Keyboard navigation for Lightbox
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!lightboxOpen) return;
      if (e.key === 'Escape') setLightboxOpen(false);
      if (e.key === 'ArrowRight') {
        setActiveImageIndex((prev) => (prev + 1) % galleryImages.length);
      }
      if (e.key === 'ArrowLeft') {
        setActiveImageIndex((prev) => (prev - 1 + galleryImages.length) % galleryImages.length);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [lightboxOpen, galleryImages.length]);

  // Selected size object calibrated for current shape
  const currentSizeObj = useMemo(() => {
    if (!selectedSizeId) return availableSizes[0] || null;
    return availableSizes.find((s) => s.id === selectedSizeId) || availableSizes[0] || null;
  }, [selectedSizeId, availableSizes]);

  // Auto-adjust thickness when frame/size changes
  const availableThicknesses: ThicknessType[] = useMemo(() => {
    if (isAcrylicFrame) return ['5mm'];
    if (selectedFrame !== 'without' || !currentSizeObj) return [];
    return currentSizeObj.allowedThickness;
  }, [isAcrylicFrame, selectedFrame, currentSizeObj]);

  // Dynamic calculation for entered custom dimensions
  const customSizeCalc = useMemo(() => {
    return calculateCustomDimensions(customWidth, customHeight, {
      hasLed: product.hasLedBacklight && isAartiGlow,
      frameType: selectedFrame,
      thickness: isAcrylicFrame ? '5mm' : selectedThickness,
      variants: availableSizes.length > 0 ? availableSizes : (liveProduct.variants || product.variants),
      basePrice: liveProduct.basePrice || product.basePrice,
      baseMrp: liveProduct.baseMrp || product.baseMrp,
    });
  }, [
    customWidth,
    customHeight,
    product.hasLedBacklight,
    isAartiGlow,
    selectedFrame,
    isAcrylicFrame,
    selectedThickness,
    availableSizes,
    liveProduct.variants,
    product.variants,
    liveProduct.basePrice,
    product.basePrice,
    liveProduct.baseMrp,
    product.baseMrp,
  ]);

  // Active pricing calculation
  const currentPricing = useMemo(() => {
    if (isCustomSize) {
      return { price: customSizeCalc.price, mrp: customSizeCalc.mrp, isRange: false };
    }
    if (!currentSizeObj) {
      return { price: liveProduct.basePrice, mrp: liveProduct.baseMrp, isRange: true };
    }

    if (isGlitterFrame) {
      const p = currentSizeObj.prices.without_3mm || currentSizeObj.prices.gold;
      return p ? { price: p.price, mrp: p.mrp, isRange: false } : { price: liveProduct.basePrice, mrp: liveProduct.baseMrp, isRange: false };
    }

    if (selectedFrame === 'gold') {
      const p = currentSizeObj.prices.gold;
      return p ? { price: p.price, mrp: p.mrp, isRange: false } : { price: product.basePrice, mrp: product.baseMrp, isRange: true };
    }

    if (selectedFrame === 'black') {
      const p = currentSizeObj.prices.black;
      return p ? { price: p.price, mrp: p.mrp, isRange: false } : { price: product.basePrice, mrp: product.baseMrp, isRange: true };
    }

    if (selectedFrame === 'without') {
      if (isAcrylicFrame) {
        const p = currentSizeObj.prices.without_5mm || currentSizeObj.prices.gold;
        return p ? { price: p.price, mrp: p.mrp, isRange: false } : { price: liveProduct.basePrice, mrp: liveProduct.baseMrp, isRange: false };
      }
      if (selectedThickness === '3mm' && currentSizeObj.prices.without_3mm) {
        return { price: currentSizeObj.prices.without_3mm.price, mrp: currentSizeObj.prices.without_3mm.mrp, isRange: false };
      }
      if (selectedThickness === '5mm' && currentSizeObj.prices.without_5mm) {
        return { price: currentSizeObj.prices.without_5mm.price, mrp: currentSizeObj.prices.without_5mm.mrp, isRange: false };
      }
      if (currentSizeObj.prices.without_5mm) {
        return { price: currentSizeObj.prices.without_5mm.price, mrp: currentSizeObj.prices.without_5mm.mrp, isRange: false };
      }
      if (currentSizeObj.prices.without_3mm) {
        return { price: currentSizeObj.prices.without_3mm.price, mrp: currentSizeObj.prices.without_3mm.mrp, isRange: false };
      }
    }

    return { price: liveProduct.basePrice, mrp: liveProduct.baseMrp, isRange: false };
  }, [isCustomSize, customSizeCalc, currentSizeObj, isAcrylicFrame, selectedFrame, selectedThickness, liveProduct.basePrice, liveProduct.baseMrp, product.basePrice, product.baseMrp]);

  // Hardware helper text
  const mountingNote = useMemo(() => {
    if (isAcrylicFrame) {
      return 'Premium Metal Wall Mounting Studs Included with Every Frame';
    }
    if (!currentSizeObj) return '';
    if (selectedFrame === 'gold' || selectedFrame === 'black') {
      return currentSizeObj.mountingHardware.framed;
    }
    if (selectedFrame === 'without') {
      return currentSizeObj.mountingHardware.without5mm || 'Premium Metal Wall Mounting Studs Included with Screws';
    }
    return '';
  }, [isAcrylicFrame, currentSizeObj, selectedFrame]);

  const discountPercent = useMemo(() => {
    if (currentPricing.mrp > currentPricing.price) {
      return Math.round(((currentPricing.mrp - currentPricing.price) / currentPricing.mrp) * 100);
    }
    return 0;
  }, [currentPricing]);

  // Handle shape selection
  const handleSelectShape = (shape: ShapeOptionType) => {
    setSelectedShape(shape);
    const newSizes = SHAPE_SIZES[shape] || [];
    if (newSizes.length > 0) {
      setSelectedSizeId(newSizes[0].id);
      if (!newSizes[0].allowedFrames.includes(selectedFrame)) {
        setSelectedFrame(newSizes[0].allowedFrames[0] || 'gold');
      }
    }
  };

  // Handle frame selection
  const handleSelectFrame = (frame: FrameType) => {
    setSelectedFrame(frame);
    if (selectedSizeId) {
      const sizeObj = availableSizes.find((s) => s.id === selectedSizeId);
      if (sizeObj && !sizeObj.allowedFrames.includes(frame)) {
        const fallback = availableSizes.find((s) => s.allowedFrames.includes(frame));
        if (fallback) {
          setSelectedSizeId(fallback.id);
          if (frame === 'without') {
            setSelectedThickness(isAcrylicFrame ? '5mm' : (fallback.allowedThickness[0] || '5mm'));
          }
        }
      } else if (frame === 'without' && sizeObj) {
        setSelectedThickness(isAcrylicFrame ? '5mm' : (sizeObj.allowedThickness[0] || '5mm'));
      }
    }
  };

  // Handle size selection
  const handleSelectSize = (sizeId: string) => {
    setSelectedSizeId(sizeId);
    const sizeObj = availableSizes.find((s) => s.id === sizeId);
    if (sizeObj) {
      if (selectedFrame === 'without') {
        setSelectedThickness(isAcrylicFrame ? '5mm' : (sizeObj.allowedThickness[0] || '5mm'));
      } else {
        if (!sizeObj.allowedFrames.includes(selectedFrame)) {
          setSelectedFrame(sizeObj.allowedFrames[0] || 'gold');
        }
      }
    }
  };

  // Check Indian Pincode
  const handleCheckPincode = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanPin = pincode.trim();
    if (!/^[1-9][0-9]{5}$/.test(cleanPin)) {
      setPincodeStatus({
        checked: true,
        valid: false,
        message: 'Please enter a valid 6-digit Indian PIN code.',
      });
      return;
    }

    // Dynamic Delivery Date calculation: 4 business days from today
    const delivery = new Date();
    delivery.setDate(delivery.getDate() + 4);
    const options: Intl.DateTimeFormatOptions = { weekday: 'long', month: 'short', day: 'numeric' };
    const dateStr = delivery.toLocaleDateString('en-IN', options);

    setPincodeStatus({
      checked: true,
      valid: true,
      message: `Delivery available to ${cleanPin}`,
      deliveryDate: dateStr,
    });
  };

  // Add to cart
  const handleAddToCart = () => {
    const frameLabel = isLedFrame
      ? 'Rose Gold Aluminium Side Frame (Wall Plugs & Screws Included)'
      : isGlitterFrame
      ? 'Glitter Acrylic Block'
      : isAcrylicFrame
      ? (selectedFrame === 'gold' ? 'Champagne Gold Frame' : selectedFrame === 'black' ? 'Matte Black Frame' : 'Frameless 5MM Acrylic (Metal Studs Included)')
      : (selectedFrame === 'gold' ? 'Gold Frame' : selectedFrame === 'black' ? 'Black Frame' : `Without Frame (${selectedThickness})`);
    const sizeLabel = isCustomSize ? customSizeCalc.label : (currentSizeObj ? currentSizeObj.label : '12x18');

    addToCart(
      {
        productId: product.id,
        slug: product.slug,
        title: product.title,
        image: activeImage,
        variantId: `${product.slug}-${selectedShape}-${isLedFrame ? 'rosegold' : isGlitterFrame ? 'glitter' : selectedFrame}-${sizeLabel}${isLedFrame ? '' : isAcrylicFrame ? '-5mm' : `-${selectedThickness}`}`,
        size: `${sizeLabel} (${selectedShape.toUpperCase()})`,
        finish: frameLabel,
        lighting: isLedFrame
          ? (isAartiGlow ? 'Cool White LED Backlighting (Adapter Included)' : 'Cool White LED (Off)')
          : product.hasLedBacklight
          ? (isAartiGlow ? 'Cool White LED Backlighting' : 'LED Off')
          : isGlitterFrame
          ? 'Liquid Shimmer Floating Glitter'
          : 'Non-LED (Direct UV Printed 5MM Acrylic)',
        shape: selectedShape,
        unitPrice: currentPricing.price,
        unitMrp: currentPricing.mrp,
        quantity,
        customization: {
          previewUrl: activeImage,
          frameType: isLedFrame ? 'gold' : isGlitterFrame ? 'without' : selectedFrame,
          orientation: selectedShape === 'portrait' ? 'vertical' : selectedShape === 'landscape' ? 'horizontal' : 'square',
          aspectRatio: SHAPE_CONFIGS[selectedShape].ratioLabel,
          specialInstructions: isCustomSize ? `Custom Dimension Order: ${customSizeCalc.widthInches}x${customSizeCalc.heightInches} inches (${customSizeCalc.dimensionsCm}) | Shape: ${selectedShape.toUpperCase()} | Finish: ${frameLabel}` : `Shape: ${selectedShape.toUpperCase()} | Finish: ${frameLabel} | Size: ${sizeLabel}`,
        },
      },
      true
    );
  };

  // Instant Buy Now
  const handleBuyNow = () => {
    const frameLabel = isLedFrame
      ? 'Rose Gold Aluminium Side Frame (Wall Plugs & Screws Included)'
      : isGlitterFrame
      ? 'Glitter Acrylic Block'
      : isAcrylicFrame
      ? (selectedFrame === 'gold' ? 'Champagne Gold Frame' : selectedFrame === 'black' ? 'Matte Black Frame' : 'Frameless 5MM Acrylic (Metal Studs Included)')
      : (selectedFrame === 'gold' ? 'Gold Frame' : selectedFrame === 'black' ? 'Black Frame' : `Without Frame (${selectedThickness})`);
    const sizeLabel = isCustomSize ? customSizeCalc.label : (currentSizeObj ? currentSizeObj.label : '12x18');

    addToCart(
      {
        productId: product.id,
        slug: product.slug,
        title: product.title,
        image: activeImage,
        variantId: `${product.slug}-${selectedShape}-${isLedFrame ? 'rosegold' : isGlitterFrame ? 'glitter' : selectedFrame}-${sizeLabel}${isLedFrame ? '' : isAcrylicFrame ? '-5mm' : `-${selectedThickness}`}`,
        size: `${sizeLabel} (${selectedShape.toUpperCase()})`,
        finish: frameLabel,
        lighting: isLedFrame
          ? (isAartiGlow ? 'Cool White LED Backlighting (Adapter Included)' : 'Cool White LED (Off)')
          : product.hasLedBacklight
          ? (isAartiGlow ? 'Cool White LED Backlighting' : 'LED Off')
          : isGlitterFrame
          ? 'Liquid Shimmer Floating Glitter'
          : 'Non-LED (Direct UV Printed 5MM Acrylic)',
        shape: selectedShape,
        unitPrice: currentPricing.price,
        unitMrp: currentPricing.mrp,
        quantity,
        customization: {
          previewUrl: activeImage,
          frameType: isLedFrame ? 'gold' : isGlitterFrame ? 'without' : selectedFrame,
          orientation: selectedShape === 'portrait' ? 'vertical' : selectedShape === 'landscape' ? 'horizontal' : 'square',
          aspectRatio: SHAPE_CONFIGS[selectedShape].ratioLabel,
          specialInstructions: isCustomSize ? `Custom Dimension Order: ${customSizeCalc.widthInches}x${customSizeCalc.heightInches} inches (${customSizeCalc.dimensionsCm}) | Shape: ${selectedShape.toUpperCase()} | Finish: ${frameLabel}` : `Shape: ${selectedShape.toUpperCase()} | Finish: ${frameLabel} | Size: ${sizeLabel}`,
        },
      },
      false
    );
    closeCart();
    router.push('/checkout');
  };

  // WhatsApp Custom Size & Consultation
  const cleanWaNumber = (INITIAL_SETTINGS.whatsappNumber || '919032372782').replace(/[^0-9]/g, '');
  const artworkImgRef = product.images?.[0]
    ? product.images[0].startsWith('http')
      ? product.images[0]
      : `${typeof window !== 'undefined' ? window.location.origin : 'https://abhisgifts.com'}${product.images[0].startsWith('/') ? '' : '/'}${product.images[0]}`
    : '';
  const whatsappCustomSizeUrl = `https://wa.me/${cleanWaNumber}?text=${encodeURIComponent(
    `Hello Abhi's Gifts! 🙏\nI want to place an order for: "${product.title}"\n• Layout: ${selectedShape.toUpperCase()}\n• Dimensions: ${
      isCustomSize
        ? `Custom Size: ${customSizeCalc.widthInches}x${customSizeCalc.heightInches} inches (${customSizeCalc.dimensionsCm})`
        : (currentSizeObj ? currentSizeObj.label : '12x18') + ' in'
    }\n• Finish: ${selectedFrame}\n• Auto-Calculated Price: ₹${currentPricing.price.toLocaleString('en-IN')}\n${artworkImgRef ? `• Artwork Link: ${artworkImgRef}\n` : ''}\nPlease assist me with proofing before printing. Thank you!`
  )}`;

  const nextImage = () => {
    setActiveImageIndex((prev) => (prev + 1) % galleryImages.length);
  };

  const prevImage = () => {
    setActiveImageIndex((prev) => (prev - 1 + galleryImages.length) % galleryImages.length);
  };

  return (
    <div className="w-full bg-white text-stone-900 transition-colors duration-300">
      <div className="w-full max-w-[1720px] mx-auto px-4 sm:px-6 lg:px-10 xl:px-14 py-4 sm:py-6 space-y-8 sm:space-y-12">
        {/* Main 2-Column Showcase */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 xl:gap-16 items-start">
          {/* LEFT COLUMN: Main Sticky Artwork Frame & Mockups Gallery */}
          <div className="lg:col-span-7 xl:col-span-7 lg:sticky lg:top-24 self-start space-y-5">
            {/* Main Display Container */}
            <div className="relative w-full aspect-square sm:aspect-[4/5] max-h-[600px] rounded-2xl overflow-hidden bg-stone-50 border border-stone-200 transition-all duration-300 flex items-center justify-center p-3 sm:p-6 group">
              {/* Top Floating Controls: Cool White LED Glow Toggle + Fullscreen Zoom */}
              <div className="absolute top-4 left-4 right-4 z-20 flex items-center justify-between pointer-events-none">
                {isLedFrame ? (
                  <button
                    type="button"
                    onClick={() => setIsAartiGlow(!isAartiGlow)}
                    className={`pointer-events-auto flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold transition-all shadow-md border cursor-pointer ${
                      isAartiGlow
                        ? 'bg-stone-900 text-white border-cyan-400 shadow-[0_0_20px_rgba(255,255,255,0.7)]'
                        : 'bg-white/95 text-stone-700 border-stone-200 hover:bg-white'
                    }`}
                  >
                    <Sun className={`w-3.5 h-3.5 ${isAartiGlow ? 'text-cyan-300 animate-spin' : 'text-stone-400'}`} />
                    <span>Cool White LED Glow: {isAartiGlow ? 'ON' : 'OFF'}</span>
                  </button>
                ) : (
                  <div />
                )}

                <button
                  type="button"
                  onClick={() => setLightboxOpen(true)}
                  className="pointer-events-auto p-2 rounded-full bg-white/90 hover:bg-white text-stone-800 shadow-sm border border-stone-200 transition-all hover:scale-105 cursor-pointer ml-auto"
                  aria-label="Fullscreen view"
                  title="Full Screen View"
                >
                  <ZoomIn className="w-4 h-4" />
                </button>
              </div>

              {/* Interactive Adaptive Frame Rendering Wrapper */}
              <div
                className="w-full h-full flex items-center justify-center cursor-crosshair relative"
                onMouseMove={(e) => {
                  const rect = e.currentTarget.getBoundingClientRect();
                  const x = Math.max(0, Math.min(100, ((e.clientX - rect.left) / rect.width) * 100));
                  const y = Math.max(0, Math.min(100, ((e.clientY - rect.top) / rect.height) * 100));
                  setZoomCoords({ x, y });
                }}
                onMouseLeave={() => setZoomCoords(null)}
              >
                {/* Dynamic Frame Box calibrated to Selected Shape (Portrait, Landscape, Square, Round) */}
                <div
                  className={`relative transition-all duration-300 flex items-center justify-center ${
                    selectedShape === 'portrait'
                      ? 'w-full aspect-[3/4] max-w-[450px] max-h-[520px]'
                      : selectedShape === 'landscape'
                      ? 'w-full aspect-[4/3] sm:aspect-[16/11] max-w-[560px] max-h-[460px]'
                      : selectedShape === 'square'
                      ? 'w-full aspect-square max-w-[480px] max-h-[480px]'
                      : 'w-full aspect-square max-w-[450px] max-h-[450px]'
                  }`}
                >
                  {/* Cool White Halo Glow Ambient Backdrop for LED Frames */}
                  {isLedFrame && isAartiGlow && (
                    <div
                      className="absolute -inset-3 sm:-inset-6 rounded-2xl pointer-events-none transition-all duration-500 z-0 animate-pulse"
                      style={{
                        boxShadow: '0 0 40px 14px rgba(255, 255, 255, 0.95), 0 0 85px 28px rgba(225, 240, 255, 0.65)',
                      }}
                    />
                  )}

                  <div
                    className={`relative w-full h-full overflow-hidden rounded-xl shadow-sm bg-white z-10 transition-all ${
                      isLedFrame
                        ? 'border-[4px] border-[#C88A75]'
                        : 'border border-stone-200'
                    }`}
                  >
                    {/* Main Artwork Image with Smooth Zoom tracking */}
                    <img
                      src={activeImage}
                      alt={product.title}
                      onError={(e) => {
                        if (product.images?.[0]) {
                          (e.target as HTMLImageElement).src = product.images[0];
                        }
                      }}
                      style={
                        zoomCoords
                          ? {
                              transformOrigin: `${zoomCoords.x}% ${zoomCoords.y}%`,
                              transform: 'scale(1.85)',
                            }
                          : undefined
                      }
                      className="w-full h-full object-cover transition-transform duration-150"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Upgraded Image Gallery Strip with Prev/Next Navigation */}
            {galleryImages.length > 1 && (
              <div className="space-y-2.5">
                <div className="flex items-center justify-between text-xs font-semibold text-stone-600">
                  <span className="flex items-center gap-1.5">
                    <Eye className="w-3.5 h-3.5 text-amber-600" />
                    <span>
                      {GALLERY_STYLE_LABELS[activeImageIndex] || `Perspective ${activeImageIndex + 1}`} ({activeImageIndex + 1}/{galleryImages.length})
                    </span>
                  </span>
                  <div className="flex items-center gap-1">
                    <button
                      type="button"
                      onClick={prevImage}
                      className="p-1 rounded-full border border-stone-200 bg-stone-100 hover:bg-stone-200 text-stone-800 transition-colors cursor-pointer"
                      title="Previous Image"
                      aria-label="Previous image"
                    >
                      <ChevronLeft className="w-3.5 h-3.5" />
                    </button>
                    <button
                      type="button"
                      onClick={nextImage}
                      className="p-1 rounded-full border border-stone-200 bg-stone-100 hover:bg-stone-200 text-stone-800 transition-colors cursor-pointer"
                      title="Next Image"
                      aria-label="Next image"
                    >
                      <ChevronRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                <div className="flex items-center gap-2.5 sm:gap-3 overflow-x-auto pb-1 pt-0.5 scrollbar-thin">
                  {galleryImages.map((img, i) => {
                    const label = GALLERY_STYLE_LABELS[i] || `View style ${i + 1}`;
                    const isSelected = activeImageIndex === i;
                    return (
                      <button
                        key={i}
                        type="button"
                        onClick={() => setActiveImageIndex(i)}
                        className={`w-16 h-16 sm:w-20 sm:h-20 shrink-0 rounded-xl overflow-hidden border-2 bg-stone-100 cursor-pointer relative group transition-all ${
                          isSelected
                            ? 'border-stone-900 opacity-100 shadow-xs'
                            : 'border-stone-200 opacity-70 hover:opacity-100 hover:border-stone-400'
                        }`}
                        title={label}
                        aria-label={label}
                      >
                        <img
                          src={img}
                          alt={label}
                          onError={(e) => {
                            if (product.images?.[0]) {
                              (e.target as HTMLImageElement).src = product.images[0];
                            }
                          }}
                          className="w-full h-full object-cover"
                        />
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Clean Craft Assurance */}
            <div className="grid grid-cols-3 gap-2.5 pt-1 text-center">
              <div className="py-2.5 px-2 rounded-xl bg-stone-50 border border-stone-200/80 text-[11px] font-medium text-stone-700 flex items-center justify-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                <span className="truncate">{isAcrylicFrame ? '5MM Acrylic' : 'Cast Acrylic'}</span>
              </div>
              <div className="py-2.5 px-2 rounded-xl bg-stone-50 border border-stone-200/80 text-[11px] font-medium text-stone-700 flex items-center justify-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                <span className="truncate">{isAcrylicFrame ? 'Direct UV Print' : 'Moisture Proof'}</span>
              </div>
              <div className="py-2.5 px-2 rounded-xl bg-stone-50 border border-stone-200/80 text-[11px] font-medium text-stone-700 flex items-center justify-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                <span className="truncate">{isAcrylicFrame ? 'Studs Included' : 'Mounting Included'}</span>
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN: Variation Controls & Purchase Actions */}
          <div
            ref={mainPurchaseRef}
            className="lg:col-span-5 xl:col-span-5 space-y-6"
          >
            {/* Header Block: Stock, Title & Clean Direct Pricing */}
            <div className="space-y-3 pb-4 border-b border-stone-200">
              <div className="flex items-center justify-start gap-2 flex-wrap">
                <span className="text-[11px] font-semibold text-emerald-800 flex items-center gap-1.5 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  <span>In Stock • Ships in 24-48 Hours</span>
                </span>
                {isAcrylicFrame && (
                  <span className="text-[11px] font-semibold text-amber-800 flex items-center gap-1 bg-amber-50 px-2.5 py-0.5 rounded-full border border-amber-200">
                    <Sparkles className="w-3 h-3 text-amber-600" />
                    <span>5MM Crystal Acrylic</span>
                  </span>
                )}
              </div>

              <h1 className="text-2xl sm:text-3xl lg:text-[32px] font-serif font-bold text-stone-900 leading-tight tracking-tight break-words [text-wrap:balance]">
                {product.title}
              </h1>

              <div className="flex items-baseline gap-3 pt-1">
                <span className="text-3xl sm:text-4xl font-serif font-bold text-stone-900">
                  ₹{currentPricing.price.toLocaleString('en-IN')}
                </span>
                {currentPricing.mrp > currentPricing.price && (
                  <span className="text-base sm:text-lg text-stone-400 line-through font-normal">
                    ₹{currentPricing.mrp.toLocaleString('en-IN')}
                  </span>
                )}
                {discountPercent > 0 && (
                  <span className="text-xs font-bold text-emerald-800 bg-emerald-50 border border-emerald-200 px-2.5 py-0.5 rounded-full">
                    {discountPercent}% OFF
                  </span>
                )}
              </div>

              {isCustomSize && (
                <div className="pt-0.5 flex items-center gap-1.5 text-xs text-amber-900 font-medium">
                  <Sparkles className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                  <span>Custom Laser-Cut Size ({customSizeCalc.widthInches}&quot; × {customSizeCalc.heightInches}&quot;)</span>
                </div>
              )}
            </div>

            {/* Prominent Key Highlights for Acrylic Frames (Requirement 8) */}
            {isAcrylicFrame && (
              <div className="p-3.5 sm:p-4 rounded-2xl bg-gradient-to-br from-amber-50/70 via-stone-50 to-amber-50/40 border border-amber-200/80 shadow-2xs space-y-2.5">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-amber-900 flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                    <span>Acrylic Specifications &amp; Highlights</span>
                  </span>
                  <span className="text-[10px] font-bold text-amber-800 bg-amber-100/90 border border-amber-300 px-2 py-0.5 rounded-full">
                    Non-LED Product
                  </span>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-xs">
                  <div className="flex items-center gap-1.5 p-2 rounded-xl bg-white border border-stone-200/80 shadow-2xs">
                    <CheckCircle2 className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                    <span className="font-semibold text-stone-900 text-[11px]">5MM Premium Acrylic</span>
                  </div>
                  <div className="flex items-center gap-1.5 p-2 rounded-xl bg-white border border-stone-200/80 shadow-2xs">
                    <CheckCircle2 className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                    <span className="font-semibold text-stone-900 text-[11px]">Direct UV Printing</span>
                  </div>
                  <div className="flex items-center gap-1.5 p-2 rounded-xl bg-white border border-stone-200/80 shadow-2xs">
                    <CheckCircle2 className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                    <span className="font-semibold text-stone-900 text-[11px]">Premium Glossy Finish</span>
                  </div>
                  <div className="flex items-center gap-1.5 p-2 rounded-xl bg-white border border-stone-200/80 shadow-2xs">
                    <CheckCircle2 className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                    <span className="font-semibold text-stone-900 text-[11px]">Precision Square Edges</span>
                  </div>
                  <div className="flex items-center gap-1.5 p-2 rounded-xl bg-white border border-stone-200/80 shadow-2xs col-span-2 sm:col-span-1">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    <span className="font-semibold text-stone-900 text-[11px]">Metal Studs Included</span>
                  </div>
                </div>
              </div>
            )}

            {/* Customization: Frame Style */}
            {isLedFrame ? (
              /* Dedicated Rose Gold Aluminium Border Card for LED Frames */
              <div className="p-4 rounded-2xl bg-gradient-to-r from-rose-50/80 via-amber-50/40 to-stone-50 border border-rose-200/90 shadow-2xs space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-stone-900 flex items-center gap-2">
                    <span className="w-3.5 h-3.5 rounded-full bg-gradient-to-br from-rose-300 via-rose-400 to-amber-300 border border-rose-300 inline-block shadow-2xs" />
                    <span>Side Frame:</span>
                    <strong className="text-stone-900 font-serif">Rose Gold Aluminium</strong>
                  </span>
                  <span className="text-[10px] font-bold text-rose-900 bg-rose-100 border border-rose-300 px-2.5 py-0.5 rounded-md">
                    Premium Aluminium
                  </span>
                </div>
                <p className="text-[11px] text-stone-600 leading-relaxed">
                  Every LED Frame features a premium aluminium side frame in an elegant Rose Gold finish. Refined border design enhances structure and complements modern interiors.
                </p>
                <div className="pt-1 flex flex-wrap items-center gap-2 text-[10px] font-semibold text-stone-700">
                  <span className="px-2 py-0.5 rounded-md bg-white border border-stone-200">✓ Rose Gold Aluminium</span>
                  <span className="px-2 py-0.5 rounded-md bg-white border border-stone-200">✓ Wall Plugs &amp; Screws Included</span>
                  <span className="px-2 py-0.5 rounded-md bg-white border border-stone-200">✓ Power Adapter Included</span>
                </div>
              </div>
            ) : !isGlitterFrame ? (
              <>
                <div className="space-y-2.5">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-stone-900">
                      Frame Style:{' '}
                      <strong className="text-amber-800 font-serif">
                        {selectedFrame === 'gold' ? 'Champagne Gold' : selectedFrame === 'black' ? 'Matte Black' : isAcrylicFrame ? 'Frameless 5MM Acrylic' : 'Frameless Crystal Acrylic'}
                      </strong>
                    </span>
                    <span className="text-[11px] text-stone-500">Select finish</span>
                  </div>

                  <div className={`grid gap-2.5 ${(isLedFrame || product.categorySlug === 'led-acrylic-photo-frames' || product.categorySlugs?.includes('led-acrylic-photo-frames')) ? 'grid-cols-1' : 'grid-cols-3'}`}>
                    {/* Gold Frame Card */}
                    <button
                      type="button"
                      onClick={() => handleSelectFrame('gold')}
                      className={`p-2.5 rounded-xl border-2 flex flex-col items-center text-center gap-1.5 cursor-pointer transition-all ${
                        selectedFrame === 'gold'
                          ? 'border-stone-900 bg-stone-100 shadow-xs'
                          : 'border-stone-200 bg-stone-50 hover:border-stone-400'
                      }`}
                    >
                      <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-lg overflow-hidden border border-stone-200 shadow-xs bg-white">
                        <img
                          src="/images/frames/gold-border-ref.jpg"
                          alt="Champagne Gold Aluminium Frame Border"
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <span className="text-xs font-bold text-stone-900 leading-tight">Gold Frame</span>
                      <span className="text-[10px] text-stone-500">
                        {(isLedFrame || product.categorySlug === 'led-acrylic-photo-frames') ? 'Rose Gold Aluminium' : 'Champagne Gold'}
                      </span>
                    </button>

                    {/* Black Frame Card - Removed from LED Frames category */}
                    {!(isLedFrame || product.categorySlug === 'led-acrylic-photo-frames' || product.categorySlugs?.includes('led-acrylic-photo-frames')) && (
                      <button
                        type="button"
                        onClick={() => handleSelectFrame('black')}
                        className={`p-2.5 rounded-xl border-2 flex flex-col items-center text-center gap-1.5 cursor-pointer transition-all ${
                          selectedFrame === 'black'
                            ? 'border-stone-900 bg-stone-100 shadow-xs'
                            : 'border-stone-200 bg-stone-50 hover:border-stone-400'
                        }`}
                      >
                        <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-lg overflow-hidden border border-stone-200 shadow-xs bg-white">
                          <img
                            src="/images/frames/black-border-ref.jpg"
                            alt="Matte Black Aluminium Frame Border"
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <span className="text-xs font-bold text-stone-900 leading-tight">Black Frame</span>
                        <span className="text-[10px] text-stone-500">Matte Black</span>
                      </button>
                    )}

                    {/* Without Frame Card - Removed from LED Frames category */}
                    {!(isLedFrame || product.categorySlug === 'led-acrylic-photo-frames' || product.categorySlugs?.includes('led-acrylic-photo-frames')) && (
                      <button
                        type="button"
                        onClick={() => handleSelectFrame('without')}
                        className={`p-2.5 rounded-xl border-2 flex flex-col items-center text-center gap-1.5 cursor-pointer transition-all ${
                          selectedFrame === 'without'
                            ? 'border-stone-900 bg-stone-100 shadow-xs'
                            : 'border-stone-200 bg-stone-50 hover:border-stone-400'
                        }`}
                      >
                        <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-lg overflow-hidden border border-stone-200 shadow-xs bg-white">
                          <img
                            src="/images/frames/acrylic-border-ref.jpg"
                            alt="Frameless Acrylic Photo Frame Border"
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <span className="text-xs font-bold text-stone-900 leading-tight">No Frame</span>
                        <span className="text-[10px] text-stone-500">{isAcrylicFrame ? '5MM Square Cut' : 'Crystal Acrylic'}</span>
                      </button>
                    )}
                  </div>
                </div>

                {/* Thickness Specification (Strictly hidden for LED frames) */}
                {isAcrylicFrame ? (
                  <div className="space-y-1.5 bg-amber-50/60 p-3.5 rounded-2xl border border-amber-200/80 shadow-2xs">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-bold text-stone-900 flex items-center gap-1.5">
                        <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                        <span>Acrylic Thickness:</span>
                        <strong className="text-amber-900 font-serif">5MM Premium Acrylic</strong>
                      </span>
                      <span className="text-[10px] font-bold text-emerald-800 bg-emerald-100/80 border border-emerald-300 px-2 py-0.5 rounded-md">
                        Metal Studs Included
                      </span>
                    </div>
                    <p className="text-[11px] text-stone-600 leading-relaxed">
                      Every frame is crafted in 5MM thickness with precision square-cut edges and premium metal wall mounting studs included with hardware.
                    </p>
                  </div>
                ) : (
                  selectedFrame === 'without' && availableThicknesses.length > 0 && (
                    <div className="space-y-2 bg-stone-50 p-3.5 rounded-2xl border border-stone-200">
                      <div className="flex items-center justify-between text-xs">
                        <span className="font-bold text-stone-900">
                          Acrylic Thickness: <strong className="text-amber-800">{selectedThickness}</strong>
                        </span>
                        <span className="text-[11px] text-stone-500">
                          Heavy cast acrylic with S.S studs
                        </span>
                      </div>
                      <div className="flex gap-2">
                        {availableThicknesses.map((th) => (
                          <button
                            key={th}
                            type="button"
                            onClick={() => setSelectedThickness(th)}
                            className={`flex-1 py-2 px-3 rounded-xl text-xs font-bold border transition-all cursor-pointer ${
                              selectedThickness === th
                                ? 'border-amber-500 bg-white text-stone-900 shadow-xs'
                                : 'border-stone-200 bg-white/70 text-stone-600 hover:border-amber-300'
                            }`}
                          >
                            {th}
                          </button>
                        ))}
                      </div>
                    </div>
                  )
                )}
              </>
            ) : null}

            {/* Dimensions & Size Selector */}
            <div className="space-y-2.5">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-stone-900">
                  Dimensions &amp; Size:{' '}
                  <strong className="text-amber-800 font-serif">
                    {isCustomSize ? `${customSizeCalc.widthInches}" × ${customSizeCalc.heightInches}" (${customSizeCalc.dimensionsCm}) [Custom Size]` : (currentSizeObj ? `${currentSizeObj.label} (${currentSizeObj.dimensionsCm})` : 'Select Size')}
                  </strong>
                </span>
                {selectedSizeId && (
                  <button
                    type="button"
                    onClick={() => setSelectedSizeId(null)}
                    className="text-[10px] font-bold text-stone-500 hover:text-stone-900 uppercase tracking-wider transition-colors cursor-pointer"
                  >
                    CLEAR
                  </button>
                )}
              </div>

              {/* Size Pills Grid */}
              <div className={`grid ${isGlitterFrame ? 'grid-cols-3 sm:grid-cols-4' : 'grid-cols-4 sm:grid-cols-5'} gap-2`}>
                {availableSizes.map((s) => {
                  const isSelected = !isCustomSize && selectedSizeId === s.id;
                  const isSupported = isGlitterFrame || s.allowedFrames.includes(selectedFrame);
                  const cleanDisplayLabel = s.label.includes('"') || s.label.includes('in') ? s.label : `${s.label}"`;

                  return (
                    <button
                      key={s.id}
                      type="button"
                      disabled={!isSupported}
                      onClick={() => { setIsCustomSize(false); handleSelectSize(s.id); }}
                      className={`py-2 px-1 sm:py-2.5 sm:px-1.5 min-h-[46px] rounded-xl sm:rounded-2xl text-xs transition-all flex flex-col items-center justify-center cursor-pointer ${
                        isSelected
                          ? 'border-2 border-amber-500 text-stone-950 font-bold bg-amber-50 shadow-xs'
                          : isSupported
                          ? 'border border-stone-200 text-stone-700 bg-stone-50 hover:border-amber-400 font-medium'
                          : 'border border-stone-200 text-stone-300 bg-stone-100 cursor-not-allowed line-through'
                      }`}
                    >
                      <span className="font-bold">{cleanDisplayLabel}</span>
                      {s.dimensionsCm && (
                        <span className="text-[9px] text-stone-500 leading-none mt-0.5">{s.dimensionsCm.split(' ')[0]}cm</span>
                      )}
                    </button>
                  );
                })}

                {/* Custom Size Pill */}
                <button
                  type="button"
                  onClick={() => {
                    setIsCustomSize(true);
                    setSelectedSizeId(null);
                  }}
                  className={`py-2 px-1 sm:py-2.5 sm:px-1.5 min-h-[46px] rounded-xl sm:rounded-2xl text-xs transition-all flex flex-col items-center justify-center cursor-pointer ${
                    isCustomSize
                      ? 'border-2 border-amber-500 text-stone-950 font-bold bg-amber-50 shadow-xs ring-1 ring-amber-400'
                      : 'border border-amber-400 text-amber-900 bg-amber-50/70 hover:bg-amber-100 font-medium'
                  }`}
                  title="Enter custom width & height dimensions"
                >
                  <span className="font-bold flex items-center gap-1 text-[11px] sm:text-xs">
                    <Ruler className="w-3 h-3 text-amber-700" /> Custom
                  </span>
                  <span className="text-[9px] text-emerald-700 leading-none mt-0.5 font-semibold">Quote</span>
                </button>
              </div>

              {/* Interactive Custom Size Input when isCustomSize is active */}
              {isCustomSize && (
                <div className="pt-2">
                  <CustomSizeInput
                    width={customWidth}
                    height={customHeight}
                    onChangeWidth={setCustomWidth}
                    onChangeHeight={setCustomHeight}
                    calc={customSizeCalc}
                  />
                </div>
              )}

              {/* Hardware Note */}
              {isGlitterFrame ? (
                <div className="p-3 rounded-xl bg-stone-50 border border-stone-200 text-[11px] text-stone-600 flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-amber-600 shrink-0" />
                  <span>Display Setup: <strong className="text-stone-900">Dual-layer sealed acrylic block with floating shimmer flakes &amp; desktop stand</strong></span>
                </div>
              ) : mountingNote ? (
                <div className="p-3 rounded-xl bg-stone-50 border border-stone-200 text-[11px] text-stone-600 flex items-center gap-2">
                  <Info className="w-4 h-4 text-amber-600 shrink-0" />
                  <span>Mounting hardware provided: <strong className="text-stone-900">{mountingNote}</strong></span>
                </div>
              ) : null}
            </div>

            {/* Quantity Selector + Action Buttons */}
            <div className="space-y-3.5 pt-4 border-t border-stone-200">
              {/* Customise / Add Photo Button */}
              <button
                type="button"
                onClick={() => setIsCustomizerOpen(true)}
                className="w-full py-3 px-4 rounded-xl border border-stone-300 hover:border-stone-900 bg-stone-50 hover:bg-stone-100 text-stone-900 font-semibold text-xs sm:text-sm flex items-center justify-center gap-2 transition-all cursor-pointer shadow-2xs"
                title={`Customise photo and size for ${product.title}`}
              >
                <Camera className="w-4 h-4 text-amber-600" />
                <span>Customise: Add Your Photo &amp; Custom Size</span>
              </button>

              {/* Quantity + Add to Cart & Buy Now Row */}
              <div className="flex items-center gap-2.5 sm:gap-3">
                {/* Quantity */}
                <div className="flex items-center border border-stone-200 rounded-xl bg-stone-50 overflow-hidden shadow-2xs shrink-0 h-12">
                  <button
                    type="button"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="px-3.5 text-stone-600 hover:bg-stone-200 font-bold text-sm transition-colors cursor-pointer h-full"
                    aria-label="Decrease quantity"
                  >
                    -
                  </button>
                  <span className="px-2.5 text-xs font-bold text-stone-900 min-w-8 text-center">{quantity}</span>
                  <button
                    type="button"
                    onClick={() => setQuantity(Math.min(10, quantity + 1))}
                    className="px-3.5 text-stone-600 hover:bg-stone-200 font-bold text-sm transition-colors cursor-pointer h-full"
                    aria-label="Increase quantity"
                  >
                    +
                  </button>
                </div>

                {/* Add to Cart Button */}
                <button
                  type="button"
                  onClick={handleAddToCart}
                  className="flex-1 h-12 rounded-xl bg-stone-900 hover:bg-stone-800 active:bg-stone-950 text-white font-bold text-xs sm:text-sm transition-all flex items-center justify-center gap-2 cursor-pointer shadow-xs"
                >
                  <ShoppingBag className="w-4 h-4 text-amber-400" />
                  <span>Add to Cart</span>
                </button>

                {/* Instant Buy Now Button */}
                <button
                  type="button"
                  onClick={handleBuyNow}
                  className="flex-1 h-12 rounded-xl bg-gradient-to-r from-[#EAB308] via-[#FACC15] to-[#EAB308] hover:from-[#FACC15] hover:to-[#EAB308] text-stone-950 font-bold text-xs sm:text-sm transition-all flex items-center justify-center gap-2 cursor-pointer shadow-xs"
                >
                  <span>Buy Now</span>
                  <ArrowRight className="w-4 h-4 text-stone-900" />
                </button>
              </div>

              {/* WhatsApp Enquiry & Direct Order Button */}
              <div className="text-center pt-0.5">
                <a
                  href={whatsappCustomSizeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs text-stone-600 hover:text-emerald-700 transition-colors"
                >
                  <MessageCircle className="w-3.5 h-3.5 text-[#25D366] fill-[#25D366]" />
                  <span>
                    {isCustomSize
                      ? `Order Custom Size via WhatsApp (₹${currentPricing.price.toLocaleString('en-IN')})`
                      : 'Need custom sizing or advice? Chat on WhatsApp'}
                  </span>
                </a>
              </div>

              <p className="text-[11px] text-stone-500 text-center font-medium">
                🔒 100% Secure Checkout • UPI, Credit/Debit Cards &amp; NetBanking
              </p>
            </div>

            {/* Streamlined Trust Assurance */}
            <div className="pt-4 border-t border-stone-200 grid grid-cols-3 gap-2 text-center text-[11px] text-stone-600 font-medium">
              <div className="flex items-center justify-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-amber-600 shrink-0" />
                <span className="truncate">Safe Transit</span>
              </div>
              <div className="flex items-center justify-center gap-1.5">
                <Sparkles className="w-4 h-4 text-amber-600 shrink-0" />
                <span className="truncate">1:1 Proof Approval</span>
              </div>
              <div className="flex items-center justify-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-amber-600 shrink-0" />
                <span className="truncate">Moisture Proof</span>
              </div>
            </div>
          </div>
        </div>

        {/* Dedicated Direct UV Printing Technology Section (Requirements 2, 3, 4, 8) */}
        {isAcrylicFrame && (
          <div className="border-t border-stone-200 pt-10 max-w-4xl mx-auto space-y-6">
            <div className="border border-amber-200/90 rounded-3xl p-6 sm:p-8 bg-gradient-to-br from-amber-50/50 via-white to-amber-50/30 shadow-xs space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-amber-200/70 pb-4">
                <div>
                  <span className="text-[11px] font-bold uppercase tracking-wider text-amber-800 bg-amber-100/70 border border-amber-300/80 px-2.5 py-0.5 rounded-full inline-block mb-1">
                    Direct UV Technology
                  </span>
                  <h3 className="text-xl sm:text-2xl font-serif font-bold text-stone-900">
                    Advanced Direct UV Printing Technology
                  </h3>
                </div>
                <span className="text-xs font-semibold text-emerald-800 bg-emerald-50 border border-emerald-200 px-3 py-1 rounded-full self-start sm:self-auto">
                  5MM Crystal Acrylic • Non-LED
                </span>
              </div>

              <div className="space-y-3 text-xs sm:text-sm text-stone-700 leading-relaxed">
                <p>
                  Our Acrylic Frames are produced using advanced <strong>Direct UV Printing Technology</strong>, where high-quality UV-curable inks are printed directly onto the acrylic surface.
                </p>
                <p>
                  Unlike traditional paper prints or separately pasted photo sheets, the artwork is printed directly onto the acrylic, creating a clean, premium and seamless appearance. Combined with premium 5MM thick crystal-clear acrylic, this printing process gives your wall art a sophisticated and elegant appearance.
                </p>
              </div>

              {/* Key Benefits Grid */}
              <div className="space-y-3">
                <h4 className="text-xs font-bold uppercase tracking-wider text-amber-900 flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                  <span>Key Benefits:</span>
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {[
                    'Direct printing onto the acrylic surface.',
                    'High-definition image reproduction with sharp details.',
                    'Vibrant colours and rich visual depth.',
                    'Excellent colour reproduction.',
                    'Smooth and premium print finish.',
                    'UV-curable inks cured instantly using UV light.',
                    'No separate paper print or photo sheet required.',
                  ].map((benefit, bIdx) => (
                    <div key={bIdx} className="flex items-start gap-2.5 p-2.5 rounded-xl bg-white/90 border border-amber-100 shadow-2xs">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      <span className="text-xs font-medium text-stone-800">{benefit}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Precision Edge & Mounting Studs Highlights (Requirements 3 & 4) */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div className="p-4 rounded-2xl bg-white border border-stone-200/80 space-y-1.5 shadow-2xs">
                  <h4 className="font-serif font-bold text-sm text-stone-900 flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-amber-600 shrink-0" />
                    <span>Precision Square Cut Edges</span>
                  </h4>
                  <p className="text-xs text-stone-600 leading-relaxed">
                    Every Acrylic Frame features clean, precision square-cut edges, maintaining a sharp and minimal geometric appearance that complements modern interiors.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-white border border-stone-200/80 space-y-1.5 shadow-2xs">
                  <h4 className="font-serif font-bold text-sm text-stone-900 flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>Installation Studs Included</span>
                  </h4>
                  <ul className="text-xs text-stone-600 space-y-1 leading-relaxed">
                    <li className="flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0" />
                      <span>Premium Metal Mounting Studs Included.</span>
                    </li>
                    <li className="flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0" />
                      <span>Wall Mounting Hardware Provided with Every Frame.</span>
                    </li>
                    <li className="flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0" />
                      <span>No need to purchase mounting studs separately.</span>
                    </li>
                    <li className="flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0" />
                      <span>Easy, elegant floating-style wall installation.</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Accordion / Structured Product Information Sections */}
        {isLedFrame ? (
          /* STANDARD 10-SECTION PRODUCT PAGE LAYOUT FOR LED FRAMES */
          <div id="product-details-accordion" className="border-t border-stone-200 pt-10 max-w-4xl mx-auto space-y-4">
            <div className="text-center sm:text-left mb-6">
              <span className="text-[11px] font-bold uppercase tracking-wider text-rose-800 bg-rose-50 border border-rose-200 px-3 py-1 rounded-full">
                Confirmed Manufacturing Specifications
              </span>
              <h3 className="font-serif font-bold text-2xl sm:text-3xl text-stone-900 mt-2">
                LED Backlit Acrylic Frame Details &amp; Specifications
              </h3>
              <p className="text-xs sm:text-sm text-stone-600 mt-1">
                Imported Clear Virgin Cast Acrylic • Direct UV Printing • Rose Gold Aluminium Border • Cool White LED Halo Glow
              </p>
            </div>

            {/* Section 2: Dedicated Section: Premium Imported Clear Virgin Cast Acrylic */}
            <div className="border border-stone-200 rounded-2xl overflow-hidden bg-white shadow-2xs transition-all">
              <button
                type="button"
                onClick={() => toggleSection('ledMaterial')}
                className="w-full p-4 sm:p-5 flex items-center justify-between text-left hover:bg-stone-50 transition-colors cursor-pointer"
                aria-expanded={openSections.ledMaterial}
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-xl bg-rose-50 border border-rose-200/80 flex items-center justify-center text-rose-700 shrink-0">
                    <Sparkles className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="font-bold text-sm sm:text-base text-stone-900 block">
                      Premium Imported Clear Virgin Cast Acrylic
                    </span>
                    <span className="text-[11px] text-stone-500 hidden sm:block">
                      Optical clarity, crystal-clear appearance &amp; high-definition display
                    </span>
                  </div>
                </div>
                <ChevronDown
                  className={`w-5 h-5 text-stone-500 transition-transform duration-200 shrink-0 ${
                    openSections.ledMaterial ? 'rotate-180 text-stone-900' : ''
                  }`}
                />
              </button>

              {openSections.ledMaterial && (
                <div className="px-5 pb-6 pt-2 border-t border-stone-100 space-y-4 animate-in fade-in duration-200">
                  <p className="text-stone-700 text-xs sm:text-sm leading-relaxed">
                    Our LED Frames are crafted using premium <strong>Imported Clear Virgin Cast Acrylic</strong>, selected for its excellent transparency, clarity and premium appearance.
                  </p>
                  <p className="text-stone-700 text-xs sm:text-sm leading-relaxed">
                    The crystal-clear acrylic provides a beautiful surface for displaying high-definition artwork while enhancing the overall illuminated effect.
                  </p>
                  <div className="p-4 rounded-xl bg-stone-50 border border-stone-200">
                    <h5 className="font-bold text-xs uppercase tracking-wider text-stone-900 mb-2.5">
                      Key Features:
                    </h5>
                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-stone-700">
                      <li className="flex items-center gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-rose-600 shrink-0" />
                        <span>Imported Clear Virgin Cast Acrylic</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-rose-600 shrink-0" />
                        <span>Excellent Optical Clarity</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-rose-600 shrink-0" />
                        <span>Crystal-Clear Appearance</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-rose-600 shrink-0" />
                        <span>Premium Quality Acrylic Material</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-rose-600 shrink-0" />
                        <span>Elegant and Modern Finish</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-rose-600 shrink-0" />
                        <span>Ideal for High-Definition Artwork Display</span>
                      </li>
                    </ul>
                  </div>
                </div>
              )}
            </div>

            {/* Section 3: Dedicated Section: Advanced Direct UV Printing Technology */}
            <div className="border border-stone-200 rounded-2xl overflow-hidden bg-white shadow-2xs transition-all">
              <button
                type="button"
                onClick={() => toggleSection('ledUvPrint')}
                className="w-full p-4 sm:p-5 flex items-center justify-between text-left hover:bg-stone-50 transition-colors cursor-pointer"
                aria-expanded={openSections.ledUvPrint}
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-xl bg-rose-50 border border-rose-200/80 flex items-center justify-center text-rose-700 shrink-0">
                    <Layers className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="font-bold text-sm sm:text-base text-stone-900 block">
                      Advanced Direct UV Printing Technology
                    </span>
                    <span className="text-[11px] text-stone-500 hidden sm:block">
                      High-definition direct printing on acrylic with vibrant colours &amp; fine clarity
                    </span>
                  </div>
                </div>
                <ChevronDown
                  className={`w-5 h-5 text-stone-500 transition-transform duration-200 shrink-0 ${
                    openSections.ledUvPrint ? 'rotate-180 text-stone-900' : ''
                  }`}
                />
              </button>

              {openSections.ledUvPrint && (
                <div className="px-5 pb-6 pt-2 border-t border-stone-100 space-y-4 animate-in fade-in duration-200">
                  <p className="text-stone-700 text-xs sm:text-sm leading-relaxed">
                    Our LED Acrylic Frames are produced using <strong>Advanced Direct UV Printing Technology</strong>, where high-quality UV-curable inks are printed directly onto the acrylic surface.
                  </p>
                  <p className="text-stone-700 text-xs sm:text-sm leading-relaxed">
                    Unlike traditional paper prints or separately pasted photo sheets, the artwork is printed directly onto the acrylic, creating a clean, premium and seamless appearance.
                  </p>
                  <div className="p-4 rounded-xl bg-amber-50/50 border border-amber-200/70">
                    <h5 className="font-bold text-xs uppercase tracking-wider text-amber-950 mb-2.5">
                      Key Benefits:
                    </h5>
                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-stone-800">
                      <li className="flex items-center gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                        <span>Direct Printing on Acrylic Surface</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                        <span>High-Definition Image Reproduction</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                        <span>Sharp Details and Fine Artwork Clarity</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                        <span>Vibrant Colours and Rich Visual Depth</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                        <span>Excellent Colour Reproduction</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                        <span>Premium Glossy Appearance</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                        <span>UV-Curable Inks Cured Using UV Light</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                        <span>No Separate Paper Print or Photo Sheet Required</span>
                      </li>
                    </ul>
                  </div>
                  <p className="text-xs text-stone-600 italic">
                    The combination of Imported Clear Virgin Cast Acrylic and Direct UV Printing creates a premium artwork display with beautiful clarity and visual depth.
                  </p>
                </div>
              )}
            </div>

            {/* Section 4: Dedicated Section: Premium Rose Gold Aluminium Side Frame */}
            <div className="border border-stone-200 rounded-2xl overflow-hidden bg-white shadow-2xs transition-all">
              <button
                type="button"
                onClick={() => toggleSection('ledBorder')}
                className="w-full p-4 sm:p-5 flex items-center justify-between text-left hover:bg-stone-50 transition-colors cursor-pointer"
                aria-expanded={openSections.ledBorder}
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-xl bg-rose-50 border border-rose-200/80 flex items-center justify-center text-rose-700 shrink-0">
                    <ShieldCheck className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="font-bold text-sm sm:text-base text-stone-900 block">
                      Premium Rose Gold Aluminium Border
                    </span>
                    <span className="text-[11px] text-stone-500 hidden sm:block">
                      Luxurious aluminium side frame in an elegant Rose Gold colour
                    </span>
                  </div>
                </div>
                <ChevronDown
                  className={`w-5 h-5 text-stone-500 transition-transform duration-200 shrink-0 ${
                    openSections.ledBorder ? 'rotate-180 text-stone-900' : ''
                  }`}
                />
              </button>

              {openSections.ledBorder && (
                <div className="px-5 pb-6 pt-2 border-t border-stone-100 space-y-4 animate-in fade-in duration-200">
                  <p className="text-stone-700 text-xs sm:text-sm leading-relaxed">
                    Every LED Frame features a premium aluminium side frame in an elegant <strong>Rose Gold</strong> finish.
                  </p>
                  <p className="text-stone-700 text-xs sm:text-sm leading-relaxed">
                    The aluminium border adds a luxurious appearance, complements the crystal-clear acrylic and enhances the overall structure and presentation of the artwork.
                  </p>
                  <div className="p-4 rounded-xl bg-rose-50/50 border border-rose-200/70">
                    <h5 className="font-bold text-xs uppercase tracking-wider text-rose-950 mb-2.5">
                      Key Features:
                    </h5>
                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-stone-800">
                      <li className="flex items-center gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-rose-600 shrink-0" />
                        <span>Premium Aluminium Side Frame</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-rose-600 shrink-0" />
                        <span>Elegant Rose Gold Colour</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-rose-600 shrink-0" />
                        <span>Modern and Luxurious Appearance</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-rose-600 shrink-0" />
                        <span>Refined Border Design</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-rose-600 shrink-0" />
                        <span>Complements Contemporary Interiors</span>
                      </li>
                    </ul>
                  </div>
                </div>
              )}
            </div>

            {/* Section 5: Dedicated Section: Cool White LED Backlighting Technology */}
            <div className="border border-stone-200 rounded-2xl overflow-hidden bg-white shadow-2xs transition-all">
              <button
                type="button"
                onClick={() => toggleSection('ledLighting')}
                className="w-full p-4 sm:p-5 flex items-center justify-between text-left hover:bg-stone-50 transition-colors cursor-pointer"
                aria-expanded={openSections.ledLighting}
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-xl bg-rose-50 border border-rose-200/80 flex items-center justify-center text-rose-700 shrink-0">
                    <Sun className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="font-bold text-sm sm:text-base text-stone-900 block">
                      Integrated Cool White LED Illumination
                    </span>
                    <span className="text-[11px] text-stone-500 hidden sm:block">
                      Hidden perimeter LED lighting casting an elegant Cool White halo glow
                    </span>
                  </div>
                </div>
                <ChevronDown
                  className={`w-5 h-5 text-stone-500 transition-transform duration-200 shrink-0 ${
                    openSections.ledLighting ? 'rotate-180 text-stone-900' : ''
                  }`}
                />
              </button>

              {openSections.ledLighting && (
                <div className="px-5 pb-6 pt-2 border-t border-stone-100 space-y-4 animate-in fade-in duration-200">
                  <p className="text-stone-700 text-xs sm:text-sm leading-relaxed">
                    Our Premium LED Acrylic Frames feature integrated <strong>Cool White LED backlighting</strong>, designed to enhance the artwork with an elegant illuminated effect.
                  </p>
                  <p className="text-stone-700 text-xs sm:text-sm leading-relaxed">
                    The hidden perimeter LED lighting creates a beautiful <strong>Cool White Halo Glow</strong> around the artwork, adding depth and a sophisticated atmosphere to your walls.
                  </p>
                  <div className="p-4 rounded-xl bg-stone-50 border border-stone-200">
                    <h5 className="font-bold text-xs uppercase tracking-wider text-stone-900 mb-2.5">
                      Key Features:
                    </h5>
                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-stone-700">
                      <li className="flex items-center gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-rose-600 shrink-0" />
                        <span>Integrated Cool White LED Lighting</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-rose-600 shrink-0" />
                        <span>Elegant Cool White Halo Glow</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-rose-600 shrink-0" />
                        <span>Hidden Perimeter LED Lighting</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-rose-600 shrink-0" />
                        <span>Beautiful Ambient Illumination</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-rose-600 shrink-0" />
                        <span>Enhanced Artwork Presentation</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-rose-600 shrink-0" />
                        <span>Modern Illuminated Wall Decor</span>
                      </li>
                    </ul>
                  </div>
                </div>
              )}
            </div>

            {/* Section 6: Dedicated Section: Confirmed Product Specifications */}
            <div className="border border-stone-200 rounded-2xl overflow-hidden bg-white shadow-2xs transition-all">
              <button
                type="button"
                onClick={() => toggleSection('ledSpecs')}
                className="w-full p-4 sm:p-5 flex items-center justify-between text-left hover:bg-stone-50 transition-colors cursor-pointer"
                aria-expanded={openSections.ledSpecs}
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-xl bg-rose-50 border border-rose-200/80 flex items-center justify-center text-rose-700 shrink-0">
                    <Zap className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="font-bold text-sm sm:text-base text-stone-900 block">
                      Confirmed Product Specifications
                    </span>
                    <span className="text-[11px] text-stone-500 hidden sm:block">
                      18 verified manufacturing specifications for LED Frames
                    </span>
                  </div>
                </div>
                <ChevronDown
                  className={`w-5 h-5 text-stone-500 transition-transform duration-200 shrink-0 ${
                    openSections.ledSpecs ? 'rotate-180 text-stone-900' : ''
                  }`}
                />
              </button>

              {openSections.ledSpecs && (
                <div className="px-5 pb-6 pt-3 border-t border-stone-100 animate-in fade-in duration-200">
                  <div className="divide-y divide-stone-100 border border-stone-200 rounded-xl overflow-hidden text-xs sm:text-sm bg-stone-50/40">
                    {[
                      { label: 'Product Type', value: 'Premium LED Backlit Acrylic Wall Frame' },
                      { label: 'Acrylic Material', value: 'Imported Clear Virgin Cast Acrylic' },
                      { label: 'Printing Technology', value: 'Advanced Direct UV Printing' },
                      { label: 'Print Quality', value: 'High-Definition UV Printing' },
                      { label: 'Print Method', value: 'Direct Printing on Acrylic Surface' },
                      { label: 'Colour Quality', value: 'Vibrant Colours & Sharp Details' },
                      { label: 'Finish', value: 'Premium Glossy Finish' },
                      { label: 'Side Frame Material', value: 'Premium Aluminium' },
                      { label: 'Side Frame Colour', value: 'Rose Gold' },
                      { label: 'Lighting Technology', value: 'Integrated LED Backlighting' },
                      { label: 'LED Light Colour', value: 'Cool White' },
                      { label: 'Lighting Effect', value: 'Elegant Cool White Halo Glow' },
                      { label: 'Lighting Placement', value: 'Hidden Perimeter LED Lighting' },
                      { label: 'Power Connection', value: 'External Power Adapter' },
                      { label: 'Power Adapter', value: 'Included with Every Frame' },
                      { label: 'Mounting', value: 'Wall Mounting Hardware' },
                      { label: 'Installation', value: 'Wall Plugs and Screws Included' },
                      { label: 'Customization', value: 'Custom Sizes Available' },
                    ].map((spec, i) => (
                      <div key={i} className="grid grid-cols-3 p-3.5 hover:bg-white transition-colors">
                        <span className="font-semibold text-stone-900 col-span-1">{spec.label}</span>
                        <span className="text-stone-700 col-span-2 font-medium">{spec.value}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Section 7: Dedicated Section: External Power Adapter Details */}
            <div className="border border-stone-200 rounded-2xl overflow-hidden bg-white shadow-2xs transition-all">
              <button
                type="button"
                onClick={() => toggleSection('ledPower')}
                className="w-full p-4 sm:p-5 flex items-center justify-between text-left hover:bg-stone-50 transition-colors cursor-pointer"
                aria-expanded={openSections.ledPower}
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-xl bg-rose-50 border border-rose-200/80 flex items-center justify-center text-rose-700 shrink-0">
                    <Power className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="font-bold text-sm sm:text-base text-stone-900 block">
                      External Power Adapter Included
                    </span>
                    <span className="text-[11px] text-stone-500 hidden sm:block">
                      Convenient plug-and-play adapter &amp; tidy cable management
                    </span>
                  </div>
                </div>
                <ChevronDown
                  className={`w-5 h-5 text-stone-500 transition-transform duration-200 shrink-0 ${
                    openSections.ledPower ? 'rotate-180 text-stone-900' : ''
                  }`}
                />
              </button>

              {openSections.ledPower && (
                <div className="px-5 pb-6 pt-2 border-t border-stone-100 space-y-4 animate-in fade-in duration-200">
                  <p className="text-stone-700 text-xs sm:text-sm leading-relaxed">
                    Every LED Frame comes with an <strong>external power adapter</strong> for convenient electrical connection.
                  </p>
                  <div className="p-4 rounded-xl bg-stone-50 border border-stone-200 space-y-3">
                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-stone-700">
                      <li className="flex items-center gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                        <span>External Power Adapter Included</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                        <span>Adapter Power Connection</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                        <span>Easy Electrical Connection</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                        <span>Cable Management Instructions Provided</span>
                      </li>
                    </ul>
                  </div>
                  <p className="text-xs text-stone-600">
                    Designed for safe, standard indoor domestic sockets with clean wire routing behind or along your wall skirting.
                  </p>
                </div>
              )}
            </div>

            {/* Section 8: Dedicated Section: Easy Wall Installation */}
            <div className="border border-stone-200 rounded-2xl overflow-hidden bg-white shadow-2xs transition-all">
              <button
                type="button"
                onClick={() => toggleSection('ledInstall')}
                className="w-full p-4 sm:p-5 flex items-center justify-between text-left hover:bg-stone-50 transition-colors cursor-pointer"
                aria-expanded={openSections.ledInstall}
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-xl bg-rose-50 border border-rose-200/80 flex items-center justify-center text-rose-700 shrink-0">
                    <Wrench className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="font-bold text-sm sm:text-base text-stone-900 block">
                      Easy Wall Installation (Wall Plugs &amp; Screws Included)
                    </span>
                    <span className="text-[11px] text-stone-500 hidden sm:block">
                      Mounting hardware provided for fast, secure wall hanging
                    </span>
                  </div>
                </div>
                <ChevronDown
                  className={`w-5 h-5 text-stone-500 transition-transform duration-200 shrink-0 ${
                    openSections.ledInstall ? 'rotate-180 text-stone-900' : ''
                  }`}
                />
              </button>

              {openSections.ledInstall && (
                <div className="px-5 pb-6 pt-2 border-t border-stone-100 space-y-4 animate-in fade-in duration-200">
                  <p className="text-stone-700 text-xs sm:text-sm leading-relaxed">
                    Every LED Frame includes <strong>complete wall mounting hardware</strong> for easy and secure installation.
                  </p>
                  <div className="p-4 rounded-xl bg-emerald-50/50 border border-emerald-200/70">
                    <h5 className="font-bold text-xs uppercase tracking-wider text-emerald-950 mb-2.5">
                      Included Installation Hardware:
                    </h5>
                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-emerald-900">
                      <li className="flex items-center gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                        <span>Wall Plugs and Screws Included</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                        <span>Complete Mounting Hardware Provided</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                        <span>Secure Wall Mounting Support</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                        <span>Step-by-Step Installation Instructions</span>
                      </li>
                    </ul>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs text-stone-600 pt-1">
                    <div className="p-3 rounded-xl bg-stone-50 border border-stone-200 space-y-1">
                      <span className="w-5 h-5 rounded-full bg-rose-400 text-stone-950 font-bold inline-flex items-center justify-center text-[10px] mb-1">1</span>
                      <h6 className="font-bold text-stone-900">Mark &amp; Drill</h6>
                      <p className="text-[11px]">Hold the frame at desired height and mark drilling positions on the wall.</p>
                    </div>
                    <div className="p-3 rounded-xl bg-stone-50 border border-stone-200 space-y-1">
                      <span className="w-5 h-5 rounded-full bg-rose-400 text-stone-950 font-bold inline-flex items-center justify-center text-[10px] mb-1">2</span>
                      <h6 className="font-bold text-stone-900">Insert Plugs &amp; Screws</h6>
                      <p className="text-[11px]">Insert the included wall plugs into drilled holes and tighten screws securely.</p>
                    </div>
                    <div className="p-3 rounded-xl bg-stone-50 border border-stone-200 space-y-1">
                      <span className="w-5 h-5 rounded-full bg-rose-400 text-stone-950 font-bold inline-flex items-center justify-center text-[10px] mb-1">3</span>
                      <h6 className="font-bold text-stone-900">Mount &amp; Plug In</h6>
                      <p className="text-[11px]">Hang the Rose Gold Aluminium frame securely, plug in the adapter, and power on.</p>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Section 9: Dedicated Section: Care Instructions */}
            <div className="border border-stone-200 rounded-2xl overflow-hidden bg-white shadow-2xs transition-all">
              <button
                type="button"
                onClick={() => toggleSection('ledCare')}
                className="w-full p-4 sm:p-5 flex items-center justify-between text-left hover:bg-stone-50 transition-colors cursor-pointer"
                aria-expanded={openSections.ledCare}
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-xl bg-rose-50 border border-rose-200/80 flex items-center justify-center text-rose-700 shrink-0">
                    <Info className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="font-bold text-sm sm:text-base text-stone-900 block">
                      Product Care &amp; Maintenance Instructions
                    </span>
                    <span className="text-[11px] text-stone-500 hidden sm:block">
                      Maintain crystal-clear gloss and ensure long-lasting LED performance
                    </span>
                  </div>
                </div>
                <ChevronDown
                  className={`w-5 h-5 text-stone-500 transition-transform duration-200 shrink-0 ${
                    openSections.ledCare ? 'rotate-180 text-stone-900' : ''
                  }`}
                />
              </button>

              {openSections.ledCare && (
                <div className="px-5 pb-6 pt-2 border-t border-stone-100 space-y-3 animate-in fade-in duration-200">
                  <ul className="space-y-2.5 text-xs sm:text-sm text-stone-700">
                    <li className="flex items-start gap-2.5">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      <span><strong>Soft Microfiber Cleaning:</strong> Wipe the acrylic surface gently using a clean, soft microfiber cloth to remove dust and fingerprints.</span>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      <span><strong>No Harsh Chemicals:</strong> Do not use abrasive cleaners, alcohol-based solutions, or harsh chemical solvents on the acrylic or aluminium border.</span>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      <span><strong>Gentle Handling:</strong> Wipe lightly without applying excessive pressure to preserve the pristine optical clarity and glossy finish.</span>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      <span><strong>Electrical Safety:</strong> Keep the external power adapter and electrical connection dry and away from moisture or water exposure.</span>
                    </li>
                  </ul>
                </div>
              )}
            </div>

            {/* Section 10: Dedicated Section: Frequently Asked Questions */}
            <div className="border border-stone-200 rounded-2xl overflow-hidden bg-white shadow-2xs transition-all">
              <button
                type="button"
                onClick={() => toggleSection('ledFaq')}
                className="w-full p-4 sm:p-5 flex items-center justify-between text-left hover:bg-stone-50 transition-colors cursor-pointer"
                aria-expanded={openSections.ledFaq}
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-xl bg-rose-50 border border-rose-200/80 flex items-center justify-center text-rose-700 shrink-0">
                    <HelpCircle className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="font-bold text-sm sm:text-base text-stone-900 block">
                      Frequently Asked Questions (LED Frames)
                    </span>
                    <span className="text-[11px] text-stone-500 hidden sm:block">
                      Power adapter, mounting hardware, illumination, and care answers
                    </span>
                  </div>
                </div>
                <ChevronDown
                  className={`w-5 h-5 text-stone-500 transition-transform duration-200 shrink-0 ${
                    openSections.ledFaq ? 'rotate-180 text-stone-900' : ''
                  }`}
                />
              </button>

              {openSections.ledFaq && (
                <div className="px-5 pb-6 pt-3 border-t border-stone-100 space-y-3 animate-in fade-in duration-200">
                  {[
                    {
                      q: 'Is the power adapter included with the LED Frame?',
                      a: 'Yes, an external power adapter is included with every LED Frame for convenient plug-and-play installation.',
                    },
                    {
                      q: 'What wall mounting hardware is provided?',
                      a: 'Wall plugs and screws are included with every frame to ensure a secure, straightforward wall mounting experience.',
                    },
                    {
                      q: 'What colour is the LED backlighting?',
                      a: 'The frame features integrated Cool White LED backlighting that casts an elegant Cool White halo glow around the artwork.',
                    },
                    {
                      q: 'What is the side frame made of?',
                      a: 'Every LED Frame is enclosed in a premium aluminium side frame with a luxurious Rose Gold finish.',
                    },
                    {
                      q: 'How is the artwork printed on the frame?',
                      a: 'The artwork is directly printed onto imported clear virgin cast acrylic using advanced Direct UV Printing technology, ensuring vivid colours and razor-sharp clarity without paper sheets or peeling.',
                    },
                    {
                      q: 'Can I request a custom size?',
                      a: 'Yes, custom sizes are available upon request. You can enter your desired dimensions above or contact our team directly via WhatsApp for a personalized quotation.',
                    },
                  ].map((faq, i) => (
                    <div key={i} className="p-3.5 rounded-xl bg-stone-50 border border-stone-200/80 text-xs text-stone-700 space-y-1">
                      <h6 className="font-bold text-stone-900">{faq.q}</h6>
                      <p className="text-[11px] leading-relaxed text-stone-600">{faq.a}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        ) : (
          /* Sleek Accordion Sections for Acrylic & General Products */
          <div id="product-details-accordion" className="border-t border-stone-200 pt-10 max-w-4xl mx-auto space-y-4">
            <div className="text-center sm:text-left mb-6">
              <span className="text-[11px] font-bold uppercase tracking-wider text-amber-800">Everything You Need to Know</span>
              <h3 className="font-serif font-bold text-2xl sm:text-3xl text-stone-900 mt-1">
                {isAcrylicFrame ? 'Acrylic Specifications & Product Details' : 'Product Details & Specifications'}
              </h3>
            </div>

            {/* 1. Description & Story */}
            <div className="border border-stone-200 rounded-2xl overflow-hidden bg-white shadow-2xs transition-all">
              <button
                type="button"
                onClick={() => toggleSection('overview')}
                className="w-full p-4 sm:p-5 flex items-center justify-between text-left hover:bg-stone-50 transition-colors cursor-pointer"
                aria-expanded={openSections.overview}
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-xl bg-amber-50 border border-amber-200/80 flex items-center justify-center text-amber-700 shrink-0">
                    <Sparkles className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="font-bold text-sm sm:text-base text-stone-900 block">
                      {isAcrylicFrame ? 'Acrylic Product Description & Story' : 'Story, Meaning & Sacred Placement'}
                    </span>
                    <span className="text-[11px] text-stone-500 hidden sm:block">
                      {isAcrylicFrame ? 'Premium 5MM crystal clear acrylic, UV direct print & modern wall styling' : 'Iconography, spiritual significance, and Vastu orientation'}
                    </span>
                  </div>
                </div>
                <ChevronDown
                  className={`w-5 h-5 text-stone-500 transition-transform duration-200 shrink-0 ${
                    openSections.overview ? 'rotate-180 text-stone-900' : ''
                  }`}
                />
              </button>

              {openSections.overview && (
                <div className="px-5 pb-6 pt-1 border-t border-stone-100 space-y-4 animate-in fade-in duration-200">
                  <div className="text-xs sm:text-sm text-stone-600 leading-relaxed [text-wrap:pretty] space-y-3">
                    {isAcrylicFrame ? (
                      <>
                        <div className="p-4 rounded-xl bg-amber-50/50 border border-amber-200/70 space-y-2">
                          <h4 className="font-serif font-bold text-sm sm:text-base text-stone-900">
                            Premium 5MM Crystal Clear Acrylic Wall Art
                          </h4>
                          <p className="text-stone-700 leading-relaxed text-xs sm:text-sm">
                            Upgrade your walls with our Premium 5MM Crystal Clear Acrylic Frames, designed to bring elegance, clarity and a luxurious appearance to your interiors.
                          </p>
                          <p className="text-stone-700 leading-relaxed text-xs sm:text-sm">
                            Each frame is crafted using premium 5MM thick crystal-clear acrylic and advanced Direct UV Printing Technology. The artwork is printed directly onto the acrylic surface, delivering high-definition image quality, vibrant colours and sharp details.
                          </p>
                          <p className="text-stone-700 leading-relaxed text-xs sm:text-sm">
                            The premium glossy finish enhances the overall appearance of the artwork, while precision square-cut edges provide a clean and modern look.
                          </p>
                          <p className="text-stone-700 leading-relaxed text-xs sm:text-sm">
                            Every frame comes with premium metal wall mounting studs included, making wall installation convenient and giving your artwork an elegant floating-style appearance.
                          </p>
                          <p className="text-stone-700 leading-relaxed text-xs sm:text-sm font-medium">
                            Perfect for living rooms, bedrooms, offices, modern interiors and pooja rooms.
                          </p>
                          <div className="pt-1 text-[11px] font-bold text-amber-900">
                            Premium Quality. Advanced Direct UV Printing. Elegant Square-Cut Design. Easy Installation.
                          </div>
                        </div>

                        {product.description && !product.description.includes('Premium 5MM Crystal Clear Acrylic Wall Art') && (
                          <p className="text-stone-600 text-xs sm:text-sm leading-relaxed pt-1">
                            {product.description}
                          </p>
                        )}
                      </>
                    ) : (
                      <p>{product.description}</p>
                    )}
                  </div>

                  <div className="p-4 rounded-xl bg-amber-50/50 border border-amber-200/60 text-xs text-stone-800 space-y-1">
                    <p className="font-bold flex items-center gap-1.5 text-amber-950">
                      <Sparkles className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                      <span>Placement &amp; Interior Styling Guidance</span>
                    </p>
                    <p className="text-stone-600 text-[11px] sm:text-xs leading-relaxed">
                      Ideal for installation in living rooms, bedrooms, modern offices, gallery corridors, and pooja rooms to elevate your space with timeless elegance.
                    </p>
                  </div>
                </div>
              )}
            </div>

            {/* 2. Technical Specifications (Requirement 1 & 6) */}
            <div className="border border-stone-200 rounded-2xl overflow-hidden bg-white shadow-2xs transition-all">
              <button
                type="button"
                onClick={() => toggleSection('specs')}
                className="w-full p-4 sm:p-5 flex items-center justify-between text-left hover:bg-stone-50 transition-colors cursor-pointer"
                aria-expanded={openSections.specs}
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-xl bg-amber-50 border border-amber-200/80 flex items-center justify-center text-amber-700 shrink-0">
                    <Layers className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="font-bold text-sm sm:text-base text-stone-900 block">
                      Product Specifications
                    </span>
                    <span className="text-[11px] text-stone-500 hidden sm:block">
                      {isAcrylicFrame ? '5MM acrylic, direct UV printing, square-cut edges & metal studs' : 'Materials, power, inks, and finish'}
                    </span>
                  </div>
                </div>
                <ChevronDown
                  className={`w-5 h-5 text-stone-500 transition-transform duration-200 shrink-0 ${
                    openSections.specs ? 'rotate-180 text-stone-900' : ''
                  }`}
                />
              </button>

              {openSections.specs && (
                <div className="px-5 pb-6 pt-3 border-t border-stone-100 animate-in fade-in duration-200">
                  <div className="divide-y divide-stone-100 border border-stone-200/80 rounded-xl overflow-hidden text-xs sm:text-sm bg-stone-50/40">
                    {isAcrylicFrame ? (
                      [
                        { label: 'Material', value: 'Premium Crystal Clear Acrylic' },
                        { label: 'Thickness', value: '5MM Premium Acrylic' },
                        { label: 'Printing Technology', value: 'Advanced Direct UV Printing' },
                        { label: 'Print Quality', value: 'High-Definition UV Printing' },
                        { label: 'Print Method', value: 'Direct Printing on Acrylic Surface' },
                        { label: 'Colour Quality', value: 'Vibrant Colours & Sharp Details' },
                        { label: 'Finish', value: 'Premium Glossy Finish' },
                        { label: 'Edges', value: 'Precision Square Cut Edges' },
                        { label: 'Mounting', value: 'Premium Metal Wall Mounting Studs' },
                        { label: 'Installation', value: 'Installation Studs Included with Every Frame' },
                        { label: 'Lighting', value: 'Non-LED' },
                        { label: 'Customization', value: 'Custom Sizes Available' },
                        { label: 'Usage', value: 'Living Room, Bedroom, Office, Home Decor and Pooja Room.' },
                      ].map((spec, i) => (
                        <div key={i} className="grid grid-cols-3 p-3.5 hover:bg-white transition-colors">
                          <span className="font-semibold text-stone-900 col-span-1">{spec.label}</span>
                          <span className="text-stone-700 col-span-2 font-medium">{spec.value}</span>
                        </div>
                      ))
                    ) : (
                      product.specifications.map((spec, i) => (
                        <div key={i} className="grid grid-cols-3 p-3.5 hover:bg-white transition-colors">
                          <span className="font-semibold text-stone-900 col-span-1">{spec.label}</span>
                          <span className="text-stone-600 col-span-2">{spec.value}</span>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* 3. Dimensions & Room Placement Guide */}
            <div className="border border-stone-200 rounded-2xl overflow-hidden bg-white shadow-2xs transition-all">
              <button
                type="button"
                onClick={() => toggleSection('sizing')}
                className="w-full p-4 sm:p-5 flex items-center justify-between text-left hover:bg-stone-50 transition-colors cursor-pointer"
                aria-expanded={openSections.sizing}
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-xl bg-amber-50 border border-amber-200/80 flex items-center justify-center text-amber-700 shrink-0">
                    <Ruler className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="font-bold text-sm sm:text-base text-stone-900 block">
                      Size &amp; Room Scale Guide
                    </span>
                    <span className="text-[11px] text-stone-500 hidden sm:block">Recommended dimensions for different wall niches and room spaces</span>
                  </div>
                </div>
                <ChevronDown
                  className={`w-5 h-5 text-stone-500 transition-transform duration-200 shrink-0 ${
                    openSections.sizing ? 'rotate-180 text-stone-900' : ''
                  }`}
                />
              </button>

              {openSections.sizing && (
                <div className="px-5 pb-6 pt-3 border-t border-stone-100 animate-in fade-in duration-200">
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs text-stone-600">
                    <div className="p-3.5 rounded-xl bg-stone-50 border border-stone-200 text-center space-y-1.5">
                      <div className="h-16 flex items-center justify-center">
                        <div className="w-8 h-12 rounded border-2 border-amber-500 bg-amber-50 flex items-center justify-center text-[9px] font-bold text-stone-900">12x18</div>
                      </div>
                      <h5 className="font-bold text-stone-900 text-xs">12 × 18 In</h5>
                      <p className="text-[10px] text-stone-500">Pooja Mandir or Entry</p>
                    </div>
                    <div className="p-3.5 rounded-xl bg-stone-50 border border-stone-200 text-center space-y-1.5">
                      <div className="h-16 flex items-center justify-center">
                        <div className="w-11 h-16 rounded border-2 border-amber-500 bg-amber-50 flex items-center justify-center text-[9px] font-bold text-stone-900">16x24</div>
                      </div>
                      <h5 className="font-bold text-stone-900 text-xs">16 × 24 In</h5>
                      <p className="text-[10px] text-stone-500">Medium Wall &amp; Foyer</p>
                    </div>
                    <div className="p-3.5 rounded-xl bg-stone-50 border border-stone-200 text-center space-y-1.5">
                      <div className="h-16 flex items-center justify-center">
                        <div className="w-14 h-20 rounded border-2 border-amber-500 bg-amber-50 flex items-center justify-center text-[9px] font-bold text-stone-900">24x35</div>
                      </div>
                      <h5 className="font-bold text-stone-900 text-xs">24 × 35 In</h5>
                      <p className="text-[10px] text-stone-500">Above Sofa or Bed</p>
                    </div>
                    <div className="p-3.5 rounded-xl bg-stone-50 border border-stone-200 text-center space-y-1.5">
                      <div className="h-16 flex items-center justify-center">
                        <div className="w-18 h-22 rounded border-2 border-amber-500 bg-amber-50 flex items-center justify-center text-[9px] font-bold text-stone-900">30x47</div>
                      </div>
                      <h5 className="font-bold text-stone-900 text-xs">30 × 47 In</h5>
                      <p className="text-[10px] text-stone-500">Grand Living Statement</p>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* 4. Craft, Materials & 3-Min Installation */}
            <div className="border border-stone-200 rounded-2xl overflow-hidden bg-white shadow-2xs transition-all">
              <button
                type="button"
                onClick={() => toggleSection('craftInstall')}
                className="w-full p-4 sm:p-5 flex items-center justify-between text-left hover:bg-stone-50 transition-colors cursor-pointer"
                aria-expanded={openSections.craftInstall}
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-xl bg-amber-50 border border-amber-200/80 flex items-center justify-center text-amber-700 shrink-0">
                    <Zap className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="font-bold text-sm sm:text-base text-stone-900 block">
                      Craft, Materials &amp; 3-Minute Installation
                    </span>
                    <span className="text-[11px] text-stone-500 hidden sm:block">
                      {isAcrylicFrame ? '5MM acrylic engineering & metal wall studs installation' : 'High quality craft and easy wall mounting'}
                    </span>
                  </div>
                </div>
                <ChevronDown
                  className={`w-5 h-5 text-stone-500 transition-transform duration-200 shrink-0 ${
                    openSections.craftInstall ? 'rotate-180 text-stone-900' : ''
                  }`}
                />
              </button>

              {openSections.craftInstall && (
                <div className="px-5 pb-6 pt-3 border-t border-stone-100 space-y-5 animate-in fade-in duration-200">
                  {/* 4 Materials */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs sm:text-sm text-stone-600">
                    <div className="p-3.5 rounded-xl bg-stone-50 border border-stone-200 space-y-1">
                      <h5 className="font-bold text-stone-900">5MM Premium Acrylic</h5>
                      <p className="text-xs">Crafted exclusively with 5MM thick crystal-clear acrylic for rich visual depth, structural rigidity, and elegance.</p>
                    </div>
                    <div className="p-3.5 rounded-xl bg-stone-50 border border-stone-200 space-y-1">
                      <h5 className="font-bold text-stone-900">Advanced Direct UV Printing</h5>
                      <p className="text-xs">UV-curable inks printed directly onto the acrylic surface with instant UV curing for sharp details and vibrant colors.</p>
                    </div>
                    <div className="p-3.5 rounded-xl bg-stone-50 border border-stone-200 space-y-1">
                      <h5 className="font-bold text-stone-900">Precision Square Cut Edges</h5>
                      <p className="text-xs">Clean, precision square-cut edges maintaining a sharp, minimal geometric design that complements modern decor.</p>
                    </div>
                    <div className="p-3.5 rounded-xl bg-stone-50 border border-stone-200 space-y-1">
                      <h5 className="font-bold text-stone-900">Metal Installation Studs</h5>
                      <p className="text-xs">Premium metal wall mounting studs and hardware included with every frame for an elegant floating appearance.</p>
                    </div>
                  </div>

                  {/* 3 Steps */}
                  <div className="pt-2">
                    <h5 className="font-bold text-xs uppercase tracking-wider text-stone-500 mb-3">
                      Easy 3-Minute Wall Mounting
                    </h5>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs text-stone-600">
                      <div className="p-3 rounded-xl bg-amber-50/40 border border-amber-200/60 space-y-1">
                        <span className="w-5 h-5 rounded-full bg-amber-400 text-stone-950 font-bold inline-flex items-center justify-center text-[10px] mb-1">1</span>
                        <h6 className="font-bold text-stone-900">Mark &amp; Drill</h6>
                        <p className="text-[11px]">Align frame to wall and mark drill hole positions accurately.</p>
                      </div>
                      <div className="p-3 rounded-xl bg-amber-50/40 border border-amber-200/60 space-y-1">
                        <span className="w-5 h-5 rounded-full bg-amber-400 text-stone-950 font-bold inline-flex items-center justify-center text-[10px] mb-1">2</span>
                        <h6 className="font-bold text-stone-900">Mount Stud Barrels</h6>
                        <p className="text-[11px]">Fasten the metal mounting stud barrels firmly to the wall with included screws.</p>
                      </div>
                      <div className="p-3 rounded-xl bg-amber-50/40 border border-amber-200/60 space-y-1">
                        <span className="w-5 h-5 rounded-full bg-amber-400 text-stone-950 font-bold inline-flex items-center justify-center text-[10px] mb-1">3</span>
                        <h6 className="font-bold text-stone-900">Fasten &amp; Float</h6>
                        <p className="text-[11px]">Position acrylic frame onto studs and hand-tighten the screw caps for an elegant floating look.</p>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* 5. Packaging & Frequently Asked Questions */}
            <div className="border border-stone-200 rounded-2xl overflow-hidden bg-white shadow-2xs transition-all">
              <button
                type="button"
                onClick={() => toggleSection('shippingFaq')}
                className="w-full p-4 sm:p-5 flex items-center justify-between text-left hover:bg-stone-50 transition-colors cursor-pointer"
                aria-expanded={openSections.shippingFaq}
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-xl bg-amber-50 border border-amber-200/80 flex items-center justify-center text-amber-700 shrink-0">
                    <HelpCircle className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="font-bold text-sm sm:text-base text-stone-900 block">
                      Shipping, Packaging &amp; FAQs
                    </span>
                    <span className="text-[11px] text-stone-500 hidden sm:block">Transit guarantee, safe packaging, and care instructions</span>
                  </div>
                </div>
                <ChevronDown
                  className={`w-5 h-5 text-stone-500 transition-transform duration-200 shrink-0 ${
                    openSections.shippingFaq ? 'rotate-180 text-stone-900' : ''
                  }`}
                />
              </button>

              {openSections.shippingFaq && (
                <div className="px-5 pb-6 pt-3 border-t border-stone-100 space-y-4 animate-in fade-in duration-200">
                  {/* Shipping highlights */}
                  <div className="p-4 rounded-xl bg-stone-50 border border-stone-200 text-xs text-stone-600 space-y-1.5">
                    <h5 className="font-bold text-stone-900 text-xs">5-Layer Safe Transit Packaging</h5>
                    <ul className="list-disc list-inside space-y-1 text-[11px] text-stone-600">
                      <li>Reinforced with 5-layer honeycomb wooden crate and thick shockproof bubble wrap.</li>
                      <li>Protected with reinforced corner guards prior to courier dispatch.</li>
                      <li>Free Pan-India replacement guarantee if damaged during shipping.</li>
                    </ul>
                  </div>

                  {/* FAQ List */}
                  <div className="space-y-2.5 pt-1">
                    {[
                      {
                        q: 'How is the artwork printed on the acrylic?',
                        a: 'Our Acrylic Frames are produced using advanced Direct UV Printing Technology, where high-quality UV-curable inks are printed directly onto the acrylic surface. Unlike traditional paper prints or separately pasted photo sheets, direct printing creates a clean, premium, and seamless appearance with vibrant colours and sharp details.',
                      },
                      {
                        q: 'What thickness are these Acrylic Frames made in?',
                        a: 'All our Acrylic Frames are made using 5MM thickness only. We do not use 3MM or 4MM, ensuring rich visual depth, optimum structural rigidity, and a luxurious appearance.',
                      },
                      {
                        q: 'What type of edges do these Acrylic Frames feature?',
                        a: 'Every Acrylic Frame features clean, precision square-cut edges, maintaining a sharp and minimal geometric appearance that complements modern interiors.',
                      },
                      {
                        q: 'Are installation studs included with every frame?',
                        a: 'Yes! Every Acrylic Frame comes with premium metal wall mounting studs and hardware included in the box. There is no need to purchase mounting studs separately—giving your artwork an easy and elegant floating-style wall appearance.',
                      },
                      {
                        q: 'Is this an illuminated or LED frame?',
                        a: 'No. This is a 100% Non-LED product. It requires no wiring, no power supply, and no backlighting, offering a clean, architectural wall gallery aesthetic.',
                      },
                      {
                        q: 'What is included in the box?',
                        a: 'Your 5MM Crystal Clear Acrylic Wall Art, premium metal wall mounting studs, screws, wall plugs, and protective corner guards in 5-layer transit-safe packaging.',
                      },
                      {
                        q: 'How do I clean and maintain my Acrylic Frame?',
                        a: 'Simply wipe the acrylic surface gently with a soft dry or slightly damp microfiber cloth. Do not use harsh chemical cleaners or abrasive scrubbers.',
                      },
                    ].map((item, idx) => (
                      <div key={idx} className="p-3.5 rounded-xl bg-stone-50/80 border border-stone-200/70 space-y-1">
                        <h6 className="font-semibold text-xs text-stone-900 flex items-center gap-1.5">
                          <HelpCircle className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                          <span>{item.q}</span>
                        </h6>
                        <p className="text-[11px] text-stone-600 leading-relaxed pl-5">{item.a}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Luxury Related Products Section ("Complete Your Divine Space") */}
        {relatedProducts.length > 0 && (
          <div className="border-t border-stone-200 pt-12 space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-amber-800">Curated Pairings</span>
                <h3 className="font-serif font-bold text-2xl sm:text-3xl text-stone-900">
                  Complete Your Divine Space
                </h3>
              </div>
              <Link href="/shop" className="text-xs font-bold text-stone-900 hover:text-amber-800 hover:underline flex items-center gap-1 transition-colors">
                <span>View All Collection</span>
                <ChevronRight className="w-4 h-4" />
              </Link>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
              {relatedProducts.slice(0, 4).map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Sticky Bottom Purchase Bar (Appears on Scroll) */}
      <div
        className={`fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-stone-200 shadow-xl py-3 px-4 sm:px-8 transition-transform duration-300 text-stone-900 ${
          showStickyBar ? 'translate-y-0' : 'translate-y-full'
        }`}
        style={{ paddingBottom: 'max(0.75rem, env(safe-area-inset-bottom, 0px))' }}
      >
        <div className="max-w-[1720px] mx-auto flex items-center justify-between gap-4">
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-12 h-12 rounded-xl overflow-hidden border border-stone-200 shrink-0 bg-stone-100">
              <img src={activeImage} alt="" className="w-full h-full object-cover" />
            </div>
            <div className="min-w-0 hidden sm:block">
              <h4 className="font-serif font-bold text-xs sm:text-sm text-stone-900 truncate max-w-md">
                {product.title}
              </h4>
              <p className="text-[11px] text-stone-500 truncate">
                {selectedShape.toUpperCase()} • {currentSizeObj?.label || '12x18'}&quot; • {isGlitterFrame ? 'Glitter Acrylic Block' : (selectedFrame === 'gold' ? 'Gold Frame' : selectedFrame === 'black' ? 'Black Frame' : 'Frameless Acrylic')}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            {isCustomSize ? (
              <>
                <div className="text-right">
                  <span className="font-serif font-bold text-xs sm:text-sm text-stone-900 block leading-tight">
                    ₹{currentPricing.price.toLocaleString('en-IN')}
                  </span>
                  <span className="text-[10px] text-emerald-700 font-semibold block leading-none">
                    Custom Sized
                  </span>
                </div>
                <a
                  href={whatsappCustomSizeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-1.5 px-4 py-2.5 min-h-[44px] rounded-xl bg-[#25D366] hover:bg-[#20BD5A] text-white font-bold text-xs sm:text-sm shadow-md transition-colors cursor-pointer"
                >
                  <MessageCircle className="w-4 h-4 fill-white" />
                  <span>Order via WhatsApp</span>
                </a>
              </>
            ) : (
              <>
                <div className="text-right">
                  <span className="font-serif font-bold text-base sm:text-xl text-stone-900 block leading-tight">
                    ₹{currentPricing.price.toLocaleString('en-IN')}
                  </span>
                  {currentPricing.mrp > currentPricing.price && (
                    <span className="text-[10px] text-stone-400 line-through block">
                      ₹{currentPricing.mrp.toLocaleString('en-IN')}
                    </span>
                  )}
                </div>

                <button
                  type="button"
                  onClick={handleAddToCart}
                  className="hidden sm:flex items-center gap-1.5 px-4 py-2.5 rounded-xl border-2 border-stone-300 bg-stone-100 text-stone-900 font-bold text-xs hover:bg-stone-200 transition-colors cursor-pointer"
                >
                  <ShoppingBag className="w-3.5 h-3.5 text-amber-600" />
                  <span>Add to Cart</span>
                </button>

                <button
                  type="button"
                  onClick={handleBuyNow}
                  className="flex items-center justify-center gap-1.5 px-5 py-2.5 min-h-[44px] rounded-xl bg-[#EAB308] hover:bg-[#CA8A04] text-stone-950 font-bold text-xs sm:text-sm shadow-md transition-colors cursor-pointer"
                >
                  <span>Buy Now</span>
                  <ArrowRight className="w-3.5 h-3.5 text-stone-900" />
                </button>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Unified Custom Photo & Size Modal */}
      <AddPhotoModal
        product={product}
        selectedVariant={product.variants[0]}
        isOpen={isCustomizerOpen}
        onClose={() => setIsCustomizerOpen(false)}
      />

      {/* Lightbox / Fullscreen Gallery Modal */}
      {lightboxOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4 sm:p-8 animate-in fade-in duration-200"
          onClick={() => setLightboxOpen(false)}
        >
          <div
            className="relative max-w-5xl max-h-[92vh] w-full flex flex-col items-center justify-center gap-4"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Top Close Button */}
            <button
              type="button"
              onClick={() => setLightboxOpen(false)}
              className="absolute top-0 right-0 z-10 p-2.5 rounded-full bg-black/60 text-white hover:bg-black transition-colors cursor-pointer border border-white/20"
              aria-label="Close fullscreen view"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Left and Right Nav Buttons */}
            {galleryImages.length > 1 && (
              <>
                <button
                  type="button"
                  onClick={prevImage}
                  className="absolute left-2 sm:left-4 z-10 p-3 rounded-full bg-black/60 text-white hover:bg-black transition-colors cursor-pointer border border-white/20"
                  aria-label="Previous image"
                >
                  <ChevronLeft className="w-6 h-6" />
                </button>
                <button
                  type="button"
                  onClick={nextImage}
                  className="absolute right-2 sm:right-4 z-10 p-3 rounded-full bg-black/60 text-white hover:bg-black transition-colors cursor-pointer border border-white/20"
                  aria-label="Next image"
                >
                  <ChevronRight className="w-6 h-6" />
                </button>
              </>
            )}

            {/* Main Fullscreen Image */}
            <div className="relative max-w-4xl max-h-[75vh] overflow-hidden rounded-2xl shadow-2xl border border-white/10">
              <img
                src={activeImage}
                alt={product.title}
                className="w-full h-auto max-h-[75vh] object-contain"
              />
            </div>

            {/* Product Title / Style Label */}
            <div className="flex flex-col items-center gap-1.5 text-center text-white">
              <p className="text-sm font-serif font-bold text-amber-100">
                {product.title}
              </p>
              {galleryImages.length > 1 && (
                <p className="text-xs font-medium text-amber-200/80">
                  {GALLERY_STYLE_LABELS[activeImageIndex] || `View ${activeImageIndex + 1}`} ({activeImageIndex + 1}/{galleryImages.length})
                </p>
              )}
              {galleryImages.length > 1 && (
                <div className="flex items-center gap-2 overflow-x-auto p-1">
                  {galleryImages.map((img, i) => (
                    <button
                      key={i}
                      type="button"
                      onClick={() => setActiveImageIndex(i)}
                      className={`w-12 h-12 rounded-lg overflow-hidden border-2 transition-all cursor-pointer ${
                        activeImageIndex === i ? 'border-[#EAB308] scale-105' : 'border-white/30 opacity-60 hover:opacity-100'
                      }`}
                    >
                      <img src={img} alt="" className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
