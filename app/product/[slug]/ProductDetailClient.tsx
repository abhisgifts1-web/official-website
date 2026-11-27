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
  Sun,
  Zap,
  ChevronRight,
  ChevronLeft,
  ChevronDown,
  Ruler,
  ShoppingBag,
  MapPin,
  HelpCircle,
  AlertCircle,
  Layers,
  Eye,
  Flame,
  Camera,
  Image as ImageIcon,
  Power,
  Wrench,
} from 'lucide-react';
import AddPhotoModal from '@/components/product/AddPhotoModal';
import CustomSizeInput from '@/components/product/CustomSizeInput';
import { getProductModels } from '@/lib/data/productModels';
import { calculateCustomDimensions } from '@/lib/utils/customSize';
import { Product, FrameStockSettings } from '@/types';
import { useCart } from '@/context/CartContext';
import { INITIAL_SETTINGS } from '@/lib/data/settings';
import ProductCard from '@/components/product/ProductCard';
import CategorySpecificationsSection from '@/components/category/CategorySpecificationsSection';

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

export function formatSizeDisplay(label: string): string {
  if (!label) return '';
  const match = label.match(/(\d+(?:\.\d+)?)\s*(?:x|×|\*)\s*(\d+(?:\.\d+)?)/i);
  if (match) {
    return `${match[1]}" × ${match[2]}"`;
  }
  return label;
}

export function getSqFtFromLabel(label: string): string {
  if (!label) return '';
  const match = label.match(/(\d+(?:\.\d+)?)\s*(?:x|×|\*)\s*(\d+(?:\.\d+)?)/i);
  if (match) {
    const w = parseFloat(match[1]);
    const h = parseFloat(match[2]);
    const sqFt = (w * h) / 144;
    return `${Number.isInteger(sqFt) ? sqFt.toFixed(0) : sqFt.toFixed(1)} sq.ft`;
  }
  return '';
}

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
  'Primary Product View',
  'Luxury Living Room Wall',
  'Modern Luxury Interior',
  'Foyer & Entrance Display',
  'Texture & Craftsmanship Close-up',
  'Artistic Ambient Perspective',
  'Master Suite / Bedroom Setting',
];

export function getImagePerspectiveLabel(src: string, index: number): string {
  const lower = (src || '').toLowerCase();
  if (lower.includes('living-room') || lower.includes('living_room')) return 'Living Room Wall';
  if (lower.includes('interior')) return 'Luxury Interior';
  if (lower.includes('foyer')) return 'Foyer & Entrance';
  if (lower.includes('detail')) return 'Craftsmanship Detail';
  if (lower.includes('artistic')) return 'Ambient Lighting Angle';
  if (lower.includes('suite') || lower.includes('bedroom')) return 'Bedroom Setting';
  if (lower.includes('primary') || index === 0) return 'Primary Product View';
  return GALLERY_STYLE_LABELS[index] || `Perspective ${index + 1}`;
}

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
      product.categorySlug === 'modern-illuminated-art' ||
      liveProduct?.categorySlug === 'modern-illuminated-art' ||
      product.categorySlugs?.includes('led-acrylic-photo-frames') ||
      product.categorySlugs?.includes('modern-illuminated-art') ||
      liveProduct?.categorySlugs?.includes('led-acrylic-photo-frames') ||
      liveProduct?.categorySlugs?.includes('modern-illuminated-art') ||
      product.slug?.includes('led') ||
      product.slug?.includes('illuminated') ||
      product.title?.toLowerCase().includes('led') ||
      product.title?.toLowerCase().includes('illuminated') ||
      liveProduct?.title?.toLowerCase().includes('led') ||
      liveProduct?.title?.toLowerCase().includes('illuminated') ||
      product.tags?.some((t) => t.toLowerCase().includes('led') || t.toLowerCase().includes('illuminated'))
    );
  }, [product, liveProduct]);

  // Check if product is a Triptych or Multi-Frame Set (Sets of 2 or 3 frames)
  const isMultiSet = useMemo(() => {
    const slug = product.slug?.toLowerCase() || '';
    const title = product.title?.toLowerCase() || '';
    const cat = product.categorySlug?.toLowerCase() || '';
    const tags = product.tags?.map((t) => t.toLowerCase()) || [];
    return (
      cat === 'sets-of-two-three-frames' ||
      cat.includes('triptych') ||
      slug.includes('triptych') ||
      slug.includes('set-of') ||
      title.includes('set of') ||
      title.includes('triptych') ||
      tags.some((t) => t.includes('set of') || t.includes('triptych'))
    );
  }, [product]);

  // Check if product is a 360° Rotating Photo Lamp
  const isRotatingLamp = useMemo(() => {
    return Boolean(
      product.categorySlug === '360-rotating-photo-lamps' ||
      product.categorySlugs?.includes('360-rotating-photo-lamps') ||
      liveProduct?.categorySlug === '360-rotating-photo-lamps' ||
      liveProduct?.categorySlugs?.includes('360-rotating-photo-lamps') ||
      product.slug?.includes('rotating') ||
      product.title?.toLowerCase().includes('rotating')
    );
  }, [product.categorySlug, product.categorySlugs, liveProduct?.categorySlug, liveProduct?.categorySlugs, product.slug, product.title]);

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
      return sourceVariants.map((v, idx) => {
        const vPrice = Number(v.price) || 1299;
        const vMrp = Number(v.mrp) || Math.round(vPrice * 1.8);
        const cleanLabel = v.size
          ? v.size
              .replace(' (Grand Wall Size)', '')
              .replace(' (Grand Sanctum)', '')
              .replace(' (Palace Size)', '')
          : `Size ${idx + 1}`;
        const sqFt = v.dimensionsCm || (v.size ? getSqFtFromLabel(v.size) : '') || '';

        return {
          id: v.id || `size-${idx + 1}`,
          label: cleanLabel,
          dimensionsCm: sqFt,
          price: vPrice,
          mrp: vMrp,
          allowedFrames: (isAcrylicFrame ? ['without'] : isGlitterFrame ? ['without'] : ['gold', 'black', 'without']) as FrameType[],
          allowedThickness: (isAcrylicFrame ? ['5mm'] : ['3mm', '5mm']) as ThicknessType[],
          mountingHardware: {
            framed: 'Heavy-duty wall mounting brackets included',
            without3mm: 'Tabletop acrylic block or floating standoffs included',
            without5mm: 'Premium stainless-steel floating wall standoffs included',
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

    if (isAcrylicFrame) {
      return defaultList.map((s) => ({
        ...s,
        allowedThickness: ['5mm'] as ThicknessType[],
      }));
    }

    return defaultList;
  }, [selectedShape, liveProduct.orientationVariants, liveProduct.variants, isGlitterFrame, isAcrylicFrame]);

  // Selected frame & size state
  
  const [frameStock, setFrameStock] = useState<FrameStockSettings>(
    INITIAL_SETTINGS.frameStock || {
      gold: { name: 'Rose Gold', inStock: true, stockCount: 850 },
      black: { name: 'Black', inStock: true, stockCount: 720 },
    }
  );

  useEffect(() => {
    fetch('/api/settings?t=' + Date.now(), { cache: 'no-store' })
      .then((res) => res.json())
      .then((data) => {
        if (data.success && data.settings?.frameStock) {
          setFrameStock(data.settings.frameStock);
        }
      })
      .catch(() => {});
  }, []);




  const [selectedFrame, setSelectedFrame] = useState<FrameType>(() => {
    if (isLedFrame || product.categorySlug === 'led-acrylic-photo-frames' || product.categorySlugs?.includes('led-acrylic-photo-frames')) {
      return 'gold';
    }
    if (isAcrylicFrame || product.categorySlug === 'acrylic-photo-frames' || product.categorySlugs?.includes('acrylic-photo-frames')) {
      return 'without';
    }
    return (product.categorySlug === 'glitter-photo-frames' || product.categorySlugs?.includes('glitter-photo-frames') || product.slug?.includes('glitter'))
      ? 'without'
      : 'gold';
  });

  const isCategoryFrameEnabled = useMemo(() => {
    const catSlug = liveProduct.categorySlug || product.categorySlug;
    const catSlugs = liveProduct.categorySlugs || product.categorySlugs || [];

    const visibility = frameStock?.categoryVisibility;
    if (visibility) {
      if (catSlug && visibility[catSlug] !== undefined) return Boolean(visibility[catSlug]);
      for (const s of catSlugs) {
        if (visibility[s] !== undefined) return Boolean(visibility[s]);
      }
    }

    const configs = frameStock?.categoryConfigs;
    if (configs) {
      if (catSlug && configs[catSlug] !== undefined) return Boolean(configs[catSlug]?.enabled);
      for (const s of catSlugs) {
        if (configs[s] !== undefined) return Boolean(configs[s]?.enabled);
      }
    }

    if (catSlug === '360-rotating-photo-lamps' || catSlugs.includes('360-rotating-photo-lamps')) return false;
    if (catSlug === 'glitter-photo-frames' || catSlugs.includes('glitter-photo-frames')) return false;
    return true;
  }, [frameStock, liveProduct.categorySlug, liveProduct.categorySlugs, product.categorySlug, product.categorySlugs]);

  const isCategoryGoldAllowed = useMemo(() => {
    if (!isCategoryFrameEnabled) return false;
    const catSlug = liveProduct.categorySlug || product.categorySlug;
    const config = frameStock?.categoryConfigs?.[catSlug];
    if (config && config.showGold !== undefined) return Boolean(config.showGold);
    return true;
  }, [isCategoryFrameEnabled, frameStock, liveProduct.categorySlug, product.categorySlug]);

  const isCategoryBlackAllowed = useMemo(() => {
    if (!isCategoryFrameEnabled) return false;
    const catSlug = liveProduct.categorySlug || product.categorySlug;
    const config = frameStock?.categoryConfigs?.[catSlug];
    if (config && config.showBlack !== undefined) return Boolean(config.showBlack);
    return true;
  }, [isCategoryFrameEnabled, frameStock, liveProduct.categorySlug, product.categorySlug]);

  const isGoldOutOfStock = Boolean(!frameStock.gold?.inStock || (frameStock.gold?.stockCount ?? 0) <= 0);
  const isBlackOutOfStock = Boolean(!frameStock.black?.inStock || (frameStock.black?.stockCount ?? 0) <= 0);
  const isSelectedFrameOutOfStock = Boolean(
    isCategoryFrameEnabled && (
      (selectedFrame === 'gold' && isGoldOutOfStock) ||
      (selectedFrame === 'black' && isBlackOutOfStock)
    )
  );

  // Auto-fallback if category frame options are disabled or finish out of stock
  useEffect(() => {
    if (!isCategoryFrameEnabled) {
      if (selectedFrame !== 'without') {
        setSelectedFrame('without');
      }
      return;
    }
    if (selectedFrame === 'gold' && (!isCategoryGoldAllowed || isGoldOutOfStock)) {
      if (isCategoryBlackAllowed && !isBlackOutOfStock) {
        setSelectedFrame('black');
      }
    } else if (selectedFrame === 'black' && (!isCategoryBlackAllowed || isBlackOutOfStock)) {
      if (isCategoryGoldAllowed && !isGoldOutOfStock) {
        setSelectedFrame('gold');
      }
    } else if (selectedFrame === 'without' && isCategoryFrameEnabled) {
      if (isCategoryGoldAllowed && !isGoldOutOfStock) {
        setSelectedFrame('gold');
      } else if (isCategoryBlackAllowed && !isBlackOutOfStock) {
        setSelectedFrame('black');
      }
    }
  }, [isCategoryFrameEnabled, isCategoryGoldAllowed, isCategoryBlackAllowed, selectedFrame, isGoldOutOfStock, isBlackOutOfStock]);
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

  // Models state - displays exactly the models kept in admin dashboard for this product
  const availableModels = useMemo(() => {
    const currentProd = liveProduct || product;
    if (Array.isArray(currentProd.models) && currentProd.models.length > 0) {
      return currentProd.models;
    }
    return getProductModels(currentProd);
  }, [liveProduct, product]);

  const [selectedModelId, setSelectedModelId] = useState<string>(() => {
    return availableModels.find((m) => m.id === 'M-18')?.id || availableModels[0]?.id || 'M-18';
  });

  const currentModel = useMemo(() => {
    return availableModels.find((m) => m.id === selectedModelId) || availableModels[0];
  }, [availableModels, selectedModelId]);

  const handleSelectModel = (modelId: string) => {
    setSelectedModelId(modelId);
    const modelIndex = availableModels.findIndex((m) => m.id === modelId);
    if (modelIndex !== -1) {
      setActiveImageIndex(modelIndex);
    }
  };

  const handleSelectThumbnail = (index: number) => {
    setActiveImageIndex(index);
    if (availableModels[index]) {
      setSelectedModelId(availableModels[index].id);
    }
  };

  // Category fallback mockups guaranteeing every product in every category has 5-6 model images
  const categoryFallbackMockups = useMemo(() => {
    const cat = (product.categorySlug || liveProduct?.categorySlug || '').toLowerCase();
    if (cat === 'acrylic-photo-frames' || cat.includes('acrylic')) {
      return [
        '/images/mockups/custom-personalised-photo-acrylic-wall-frame/primary-square.jpg',
        '/images/mockups/custom-personalised-photo-acrylic-wall-frame/mockup-living-room.jpg',
        '/images/mockups/custom-personalised-photo-acrylic-wall-frame/mockup-foyer.jpg',
        '/images/mockups/custom-personalised-photo-acrylic-wall-frame/mockup-interior.jpg',
        '/images/mockups/custom-personalised-photo-acrylic-wall-frame/mockup-detail.jpg',
        '/images/mockups/custom-personalised-photo-acrylic-wall-frame/mockup-artistic.jpg',
      ];
    }
    if (cat === 'glitter-photo-frames' || cat.includes('glitter')) {
      return [
        '/images/mockups/enchanted-liquid-gold-glitter-acrylic-photo-frame/primary-square.jpg',
        '/images/mockups/enchanted-liquid-gold-glitter-acrylic-photo-frame/mockup-living-room.jpg',
        '/images/mockups/enchanted-liquid-gold-glitter-acrylic-photo-frame/mockup-foyer.jpg',
        '/images/mockups/enchanted-liquid-gold-glitter-acrylic-photo-frame/mockup-interior.jpg',
        '/images/mockups/enchanted-liquid-gold-glitter-acrylic-photo-frame/mockup-detail.jpg',
        '/images/mockups/enchanted-liquid-gold-glitter-acrylic-photo-frame/mockup-artistic.jpg',
      ];
    }
    if (cat === 'god-photo-frames' || cat.includes('god') || cat.includes('balaji')) {
      return [
        '/images/mockups/tirupati-balaji-divine-led-backlit-acrylic-wall-art/primary-square.jpg',
        '/images/mockups/tirupati-balaji-divine-led-backlit-acrylic-wall-art/mockup-living-room.jpg',
        '/images/mockups/tirupati-balaji-divine-led-backlit-acrylic-wall-art/mockup-foyer.jpg',
        '/images/mockups/tirupati-balaji-divine-led-backlit-acrylic-wall-art/mockup-interior.jpg',
        '/images/mockups/tirupati-balaji-divine-led-backlit-acrylic-wall-art/mockup-detail.jpg',
        '/images/mockups/tirupati-balaji-divine-led-backlit-acrylic-wall-art/mockup-artistic.jpg',
      ];
    }
    if (cat === '360-rotating-photo-lamps' || cat.includes('lamp') || cat.includes('rotating')) {
      return [
        '/images/mockups/crystal-tower-hexagonal-rotating-photo-lamp/primary-square.jpg',
        '/images/mockups/crystal-tower-hexagonal-rotating-photo-lamp/mockup-living-room.jpg',
        '/images/mockups/crystal-tower-hexagonal-rotating-photo-lamp/mockup-foyer.jpg',
        '/images/mockups/crystal-tower-hexagonal-rotating-photo-lamp/mockup-interior.jpg',
        '/images/mockups/crystal-tower-hexagonal-rotating-photo-lamp/mockup-detail.jpg',
        '/images/mockups/crystal-tower-hexagonal-rotating-photo-lamp/mockup-artistic.jpg',
      ];
    }
    return [
      '/images/mockups/custom-led-backlit-acrylic-photo-frame/primary-square.jpg',
      '/images/mockups/custom-led-backlit-acrylic-photo-frame/mockup-living-room.jpg',
      '/images/mockups/custom-led-backlit-acrylic-photo-frame/mockup-foyer.jpg',
      '/images/mockups/custom-led-backlit-acrylic-photo-frame/mockup-interior.jpg',
      '/images/mockups/custom-led-backlit-acrylic-photo-frame/mockup-detail.jpg',
      '/images/mockups/custom-led-backlit-acrylic-photo-frame/mockup-artistic.jpg',
    ];
  }, [product.categorySlug, liveProduct?.categorySlug]);

  // Gallery state - directly displays ALL model images for every product and category
  const galleryImages = useMemo(() => {
    if (availableModels && availableModels.length > 0) {
      return availableModels.map((m) => m.image);
    }
    const raw = (liveProduct?.images?.length ? liveProduct.images : product.images) || [];
    return raw;
  }, [availableModels, liveProduct?.images, product.images]);

  const thumbnailContainerRef = useRef<HTMLDivElement>(null);
  const [activeImageIndex, setActiveImageIndex] = useState<number>(0);

  const scrollThumbnails = (direction: 'left' | 'right') => {
    if (thumbnailContainerRef.current) {
      const offset = direction === 'left' ? -240 : 240;
      thumbnailContainerRef.current.scrollBy({ left: offset, behavior: 'smooth' });
    }
  };

  useEffect(() => {
    if (thumbnailContainerRef.current && thumbnailContainerRef.current.children[activeImageIndex]) {
      const activeEl = thumbnailContainerRef.current.children[activeImageIndex] as HTMLElement;
      activeEl.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
    }
  }, [activeImageIndex]);
  const activeImage = galleryImages[activeImageIndex] || galleryImages[0] || product.images?.[0] || '';

  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [zoomCoords, setZoomCoords] = useState<{ x: number; y: number } | null>(null);
  const [isAartiGlow, setIsAartiGlow] = useState(product.hasLedBacklight);

  const prevImage = () => {
    setActiveImageIndex((prev) => (prev > 0 ? prev - 1 : galleryImages.length - 1));
  };

  const nextImage = () => {
    setActiveImageIndex((prev) => (prev < galleryImages.length - 1 ? prev + 1 : 0));
  };

  useEffect(() => {
    if (activeImageIndex >= galleryImages.length && galleryImages.length > 0) {
      setActiveImageIndex(0);
    }
  }, [galleryImages.length, activeImageIndex]);

  // Desktop keyboard arrow navigation for product images
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (lightboxOpen) return;
      if (galleryImages.length <= 1) return;
      if (e.key === 'ArrowLeft') {
        setActiveImageIndex((prev) => (prev > 0 ? prev - 1 : galleryImages.length - 1));
      } else if (e.key === 'ArrowRight') {
        setActiveImageIndex((prev) => (prev < galleryImages.length - 1 ? prev + 1 : 0));
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [galleryImages.length, lightboxOpen]);

  // Pincode Checker State
  const [pincode, setPincode] = useState('');
  const [pincodeStatus, setPincodeStatus] = useState<{
    checked: boolean;
    valid: boolean;
    message: string;
    deliveryDate?: string;
  } | null>(null);





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
      return { price: liveProduct.basePrice || product.basePrice, mrp: liveProduct.baseMrp || product.baseMrp, isRange: true };
    }
    if (typeof (currentSizeObj as any).price === 'number' && (currentSizeObj as any).price > 0) {
      return {
        price: (currentSizeObj as any).price,
        mrp: (currentSizeObj as any).mrp || Math.round((currentSizeObj as any).price * 1.8),
        isRange: false,
      };
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
    if (frame === 'gold' && isGoldOutOfStock) {
      alert('Rose Gold is currently Out of Stock. Please select an available frame.');
      return;
    }
    if (frame === 'black' && isBlackOutOfStock) {
      alert('Black is currently Out of Stock. Please select an available frame.');
      return;
    }
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
    if (isSelectedFrameOutOfStock) {
      alert('The selected frame finish is currently Out of Stock. Please select an in-stock frame.');
      return;
    }
    const frameLabel = isLedFrame
      ? 'Rose Gold Aluminium Side Frame (Wall Plugs & Screws Included)'
      : isGlitterFrame
      ? 'Glitter Acrylic Block'
      : isAcrylicFrame
      ? (selectedFrame === 'gold' ? 'Rose Gold Frame' : selectedFrame === 'black' ? 'Black Frame' : 'Frameless 5MM Acrylic (Metal Studs Included)')
      : (selectedFrame === 'gold' ? 'Rose Gold Frame' : selectedFrame === 'black' ? 'Black Frame' : `Without Frame (${selectedThickness})`);
    const sqFtVal = currentSizeObj ? getSqFtFromLabel(currentSizeObj.label) : '1.5 sq.ft';
    const cleanDims = currentSizeObj ? formatSizeDisplay(currentSizeObj.label) : '12" × 18"';
    const sizeLabel = isCustomSize ? `${customSizeCalc.widthInches}" × ${customSizeCalc.heightInches}" (${customSizeCalc.sqFeet} sq.ft)` : `${cleanDims} (${sqFtVal})`;

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
        selectedModel: currentModel?.name || 'M-18',
        unitPrice: currentPricing.price,
        unitMrp: currentPricing.mrp,
        quantity,
        customization: {
          selectedModel: currentModel?.name || 'M-18',
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
    if (isSelectedFrameOutOfStock) {
      alert('The selected frame finish is currently Out of Stock. Please select an in-stock frame.');
      return;
    }
    const frameLabel = isLedFrame
      ? 'Rose Gold Aluminium Side Frame (Wall Plugs & Screws Included)'
      : isGlitterFrame
      ? 'Glitter Acrylic Block'
      : isAcrylicFrame
      ? (selectedFrame === 'gold' ? 'Rose Gold Frame' : selectedFrame === 'black' ? 'Black Frame' : 'Frameless 5MM Acrylic (Metal Studs Included)')
      : (selectedFrame === 'gold' ? 'Rose Gold Frame' : selectedFrame === 'black' ? 'Black Frame' : `Without Frame (${selectedThickness})`);
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
        selectedModel: currentModel?.name || 'M-18',
        unitPrice: currentPricing.price,
        unitMrp: currentPricing.mrp,
        quantity,
        customization: {
          selectedModel: currentModel?.name || 'M-18',
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

  return (
    <div className="w-full bg-white text-stone-900 transition-colors duration-300">
      <div className="w-full max-w-[1720px] mx-auto px-4 sm:px-6 lg:px-10 xl:px-14 py-4 sm:py-6 space-y-8 sm:space-y-12">
        {/* Main 2-Column Showcase */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 xl:gap-10 items-start">
          {/* LEFT COLUMN: Main Sticky Artwork Frame & Mockups Gallery */}
          <div className="lg:col-span-6 xl:col-span-6 lg:sticky lg:top-20 self-start space-y-3 sm:space-y-3.5">
            {/* Main Display Container - calibrated aspect ratio and object-cover to guarantee zero black space */}
            <div className="relative w-full max-w-[560px] xl:max-w-[620px] mx-auto aspect-[4/3] rounded-2xl overflow-hidden bg-stone-900 border border-stone-200 transition-all duration-300 flex items-center justify-center group shadow-md">
              {/* Top Floating Zoom Control (Badge removed as requested) */}
              <div className="absolute top-3 right-3 z-20 pointer-events-none">
                <button
                  type="button"
                  onClick={() => setLightboxOpen(true)}
                  className="pointer-events-auto p-2 rounded-full bg-white/90 hover:bg-white text-stone-800 shadow-sm border border-stone-200 transition-all hover:scale-105 cursor-pointer backdrop-blur-xs"
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
                {/* Dynamic Frame Box calibrated to fill cleanly without excess whitespace */}
                <div className="relative w-full h-full transition-all duration-300 flex items-center justify-center">
                  {/* Cool White Halo Glow Ambient Backdrop for LED Frames */}
                  {isLedFrame && isAartiGlow && (
                    <div
                      className="absolute inset-1 rounded-2xl pointer-events-none transition-all duration-500 z-0 animate-pulse"
                      style={{
                        boxShadow: '0 0 35px 12px rgba(255, 255, 255, 0.95), 0 0 75px 25px rgba(225, 240, 255, 0.65)',
                      }}
                    />
                  )}

                  <div className="relative w-full h-full overflow-hidden rounded-2xl bg-stone-900 z-10 transition-all flex items-center justify-center">
                      {/* Main Artwork Image - object-cover ensures edge-to-edge fit without black space */}
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
                        className="w-full h-full object-cover object-center transition-transform duration-150 select-none"
                      />

                                          </div>
                </div>

                {/* Floating Left / Right Navigation Overlays */}
                {galleryImages.length > 1 && (
                  <>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        prevImage();
                      }}
                      className="absolute left-2.5 top-1/2 -translate-y-1/2 z-20 w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-white/90 hover:bg-white text-stone-900 border border-stone-200/80 shadow-md flex items-center justify-center transition-all opacity-85 sm:opacity-0 sm:group-hover:opacity-100 cursor-pointer hover:scale-105"
                      aria-label="Previous image"
                      title="Previous Image"
                    >
                      <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5" />
                    </button>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        nextImage();
                      }}
                      className="absolute right-2.5 top-1/2 -translate-y-1/2 z-20 w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-white/90 hover:bg-white text-stone-900 border border-stone-200/80 shadow-md flex items-center justify-center transition-all opacity-85 sm:opacity-0 sm:group-hover:opacity-100 cursor-pointer hover:scale-105"
                      aria-label="Next image"
                      title="Next Image"
                    >
                      <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />
                    </button>

                    {/* Image Counter Badge on Main Image */}
                    <div className="absolute bottom-2.5 left-1/2 -translate-x-1/2 z-20 px-2.5 py-1 rounded-full bg-stone-900/70 backdrop-blur-xs text-white text-[10px] sm:text-[11px] font-medium tracking-wide flex items-center gap-1.5 shadow-sm pointer-events-none">
                      <ImageIcon className="w-3 h-3 text-amber-400" />
                      <span>{activeImageIndex + 1} / {galleryImages.length}</span>
                    </div>
                  </>
                )}
              </div>
            </div>

            {/* Upgraded Image Gallery Strip with Prev/Next Navigation */}
            {galleryImages.length > 1 && (
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs font-semibold text-stone-700 px-0.5">
                  <span className="flex items-center gap-1.5">
                    <Eye className="w-3.5 h-3.5 text-amber-600" />
                    <span className="font-bold text-stone-900">
                      Model: {availableModels[activeImageIndex]?.name || `Model ${activeImageIndex + 1}`}
                    </span>
                    {availableModels[activeImageIndex]?.isPopular && (
                      <span className="text-[10px] bg-amber-100 text-amber-900 font-bold px-1.5 py-0.5 rounded border border-amber-300">
                        🔥 Popular
                      </span>
                    )}
                    <span className="text-[11px] text-stone-500 font-normal">
                      ({activeImageIndex + 1} of {galleryImages.length})
                    </span>
                  </span>
                  <div className="flex items-center gap-1">
                    <button
                      type="button"
                      onClick={prevImage}
                      className="p-1 rounded-lg border border-stone-200 bg-stone-100 hover:bg-stone-200 text-stone-800 transition-colors cursor-pointer"
                      title="Previous Image (Left Arrow)"
                      aria-label="Previous image"
                    >
                      <ChevronLeft className="w-3.5 h-3.5" />
                    </button>
                    <button
                      type="button"
                      onClick={nextImage}
                      className="p-1 rounded-lg border border-stone-200 bg-stone-100 hover:bg-stone-200 text-stone-800 transition-colors cursor-pointer"
                      title="Next Image (Right Arrow)"
                      aria-label="Next image"
                    >
                      <ChevronRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                <div className="relative group/thumbs">
                  {galleryImages.length > 4 && (
                    <button
                      type="button"
                      onClick={() => scrollThumbnails('left')}
                      className="absolute -left-2 sm:-left-3 top-1/2 -translate-y-1/2 z-10 w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-white/95 border border-stone-300 text-stone-800 shadow-md hover:bg-stone-50 flex items-center justify-center transition-all cursor-pointer opacity-80 group-hover/thumbs:opacity-100 hover:scale-110"
                      aria-label="Scroll thumbnails left"
                      title="Scroll thumbnails left"
                    >
                      <ChevronLeft className="w-4 h-4" />
                    </button>
                  )}
                  <div
                    ref={thumbnailContainerRef}
                    className="flex items-center gap-2 sm:gap-2.5 overflow-x-auto pb-2 pt-0.5 scrollbar-thin scroll-smooth px-1"
                  >
                    {galleryImages.map((img, i) => {
                      const modelItem = availableModels[i];
                      const modelLabel = `Model ${modelItem?.name || i + 1}`;
                      const isSelected = activeImageIndex === i;
                      return (
                        <button
                          key={i}
                          type="button"
                          onClick={() => handleSelectThumbnail(i)}
                          className={`w-14 h-14 sm:w-16 sm:h-16 shrink-0 rounded-xl overflow-hidden border-2 bg-stone-50 cursor-pointer relative group transition-all flex flex-col ${
                            isSelected
                              ? 'border-amber-500 ring-2 ring-amber-400/40 shadow-xs scale-[1.03]'
                              : 'border-stone-200 opacity-80 hover:opacity-100 hover:border-amber-300'
                          }`}
                          title={modelLabel}
                          aria-label={modelLabel}
                        >
                          <img
                            src={img}
                            alt={modelLabel}
                            onError={(e) => {
                              if (product.images?.[0]) {
                                (e.target as HTMLImageElement).src = product.images[0];
                              }
                            }}
                            className="w-full h-full object-cover"
                          />
                          {/* Model name badge */}
                          <span className={`absolute bottom-0.5 right-0.5 text-[8.5px] font-bold px-1 py-0.2 rounded ${
                            isSelected ? 'bg-amber-500 text-stone-950 font-extrabold' : 'bg-black/60 text-white'
                          }`}>
                            {modelItem?.name || `${i + 1}`}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                  {galleryImages.length > 4 && (
                    <button
                      type="button"
                      onClick={() => scrollThumbnails('right')}
                      className="absolute -right-2 sm:-right-3 top-1/2 -translate-y-1/2 z-10 w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-white/95 border border-stone-300 text-stone-800 shadow-md hover:bg-stone-50 flex items-center justify-center transition-all cursor-pointer opacity-80 group-hover/thumbs:opacity-100 hover:scale-110"
                      aria-label="Scroll thumbnails right"
                      title="Scroll thumbnails right"
                    >
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  )}
                </div>
              </div>
            )}


          </div>

          {/* RIGHT COLUMN: Variation Controls & Purchase Actions */}
          <div
            className="lg:col-span-5 xl:col-span-5 space-y-6"
          >
            {/* Header Block: Stock, Title & Clean Direct Pricing */}
            <div className="space-y-3 pb-4 border-b border-stone-200">


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

            {/* Models Selector (Top 5-6 Models with Trending Highlights) */}
            <div className="space-y-2.5 pt-1">
              <div className="flex items-center justify-between text-xs font-bold text-stone-900">
                <span className="flex items-center gap-1.5">
                  <span>Models:</span>
                  <strong className="text-stone-950 font-extrabold text-sm font-sans flex items-center gap-1">
                    {currentModel?.name || 'M-18'}
                    {currentModel?.isPopular && <span className="text-amber-500">🔥</span>}
                  </strong>
                </span>
                <span className="text-[11px] text-stone-500 font-normal">
                  Tap to preview models
                </span>
              </div>

              <div className="flex flex-wrap gap-1.5 sm:gap-2">
                {availableModels.map((m) => {
                  const isSelected = selectedModelId === m.id;
                  return (
                    <button
                      key={m.id}
                      type="button"
                      onClick={() => handleSelectModel(m.id)}
                      className={`px-3 py-1.5 sm:px-3.5 sm:py-2 rounded-xl text-xs font-bold transition-all duration-200 cursor-pointer flex items-center gap-1 active:scale-95 ${
                        isSelected
                          ? 'bg-[#181818] text-white shadow-xs scale-105 ring-2 ring-amber-400 border border-amber-400/50'
                          : 'border border-stone-300 text-stone-800 bg-white hover:border-amber-400 hover:bg-amber-50/30 hover:-translate-y-0.5 shadow-2xs'
                      }`}
                      title={`Model ${m.name}${m.isPopular ? ' (Trending / Bestseller)' : ''}`}
                    >
                      <span>{m.name}</span>
                      {m.isPopular && <span className="text-xs">🔥</span>}
                    </button>
                  );
                })}
              </div>
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

            {/* Acrylic Material Note */}
            {isAcrylicFrame && (
              <div className="space-y-1.5 bg-amber-50/60 p-3.5 rounded-2xl border border-amber-200/80 shadow-2xs">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-stone-900 flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                    <span>Acrylic Material:</span>
                    <strong className="text-amber-900 font-serif">5MM Premium Virgin Acrylic</strong>
                  </span>
                  <span className="text-[10px] font-bold text-emerald-800 bg-emerald-100/80 border border-emerald-300 px-2 py-0.5 rounded-md">
                    Metal Studs Included
                  </span>
                </div>
                <p className="text-[11px] text-stone-600 leading-relaxed">
                  Every frame is crafted in 5MM thickness with precision square-cut edges and premium metal wall mounting studs included with hardware.
                </p>
              </div>
            )}

            {/* Dimensions & Size Selector */}
            <div className="space-y-2.5">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-stone-900">
                  Dimensions &amp; Size:{' '}
                  <strong className="text-amber-800 font-serif">
                    {isCustomSize
                      ? `${customSizeCalc.widthInches}" × ${customSizeCalc.heightInches}" (${customSizeCalc.sqFeet} sq.ft) [Custom Size]`
                      : (currentSizeObj ? `${formatSizeDisplay(currentSizeObj.label)} (${getSqFtFromLabel(currentSizeObj.label)})` : 'Select Size')}
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

              {/* Size Pills Grid with Square Feet */}
              <div className={`grid ${isGlitterFrame ? 'grid-cols-3 sm:grid-cols-4' : 'grid-cols-4 sm:grid-cols-5'} gap-2`}>
                {availableSizes.map((s) => {
                  const isSelected = !isCustomSize && selectedSizeId === s.id;
                  const cleanDisplayLabel = formatSizeDisplay(s.label);
                  const sqFtText = getSqFtFromLabel(s.label);

                  return (
                    <button
                      key={s.id}
                      type="button"
                      onClick={() => { setIsCustomSize(false); handleSelectSize(s.id); }}
                      className={`py-2 px-1 sm:py-2.5 sm:px-1.5 min-h-[50px] rounded-xl sm:rounded-2xl text-xs transition-all duration-200 flex flex-col items-center justify-center cursor-pointer ${
                        isSelected
                          ? 'border-2 border-amber-500 text-stone-950 font-bold bg-amber-50 shadow-xs ring-2 ring-amber-400/50 scale-[1.03]'
                          : 'border border-stone-200 text-stone-700 bg-stone-50/90 hover:border-amber-400 hover:bg-white hover:-translate-y-0.5 font-medium shadow-2xs active:scale-95'
                      }`}
                    >
                      <span className="font-bold text-xs sm:text-[13px] text-stone-900">{cleanDisplayLabel || sqFtText}</span>
                      {sqFtText ? (
                        <span className="text-[10px] text-stone-500 font-medium leading-none mt-0.5">{sqFtText}</span>
                      ) : null}
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
                  className={`py-2 px-1 sm:py-2.5 sm:px-1.5 min-h-[50px] rounded-xl sm:rounded-2xl text-xs transition-all flex flex-col items-center justify-center cursor-pointer ${
                    isCustomSize
                      ? 'border-2 border-amber-500 text-stone-950 font-bold bg-amber-50 shadow-xs ring-1 ring-amber-400'
                      : 'border border-amber-400 text-amber-900 bg-amber-50/70 hover:bg-amber-100 font-medium'
                  }`}
                  title="Enter custom width & height dimensions (12 to 60 inches)"
                >
                  <span className="font-bold flex items-center gap-1 text-[11px] sm:text-xs">
                    <Ruler className="w-3 h-3 text-amber-700" /> Custom
                  </span>
                  <span className="text-[9.5px] text-emerald-700 leading-none mt-1 font-semibold">Quote</span>
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
            </div>

            {/* Hardware Note */}
            {isGlitterFrame ? (
              <div className="p-3 rounded-xl bg-stone-50 border border-stone-200 text-[11px] text-stone-600 flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-amber-600 shrink-0" />
                <span>Moulding Note: <strong className="text-stone-900">Frames are finished using the moulding designs currently available at Abhi’s Gifts.</strong></span>
              </div>
            ) : mountingNote ? (
              <div className="p-3 rounded-xl bg-stone-50 border border-stone-200 text-[11px] text-stone-600 flex items-center gap-2">
                <Info className="w-4 h-4 text-amber-600 shrink-0" />
                <span>Mounting hardware provided: <strong className="text-stone-900">{mountingNote}</strong></span>
              </div>
            ) : null}

{/* Frame Option (Rose Gold & Black) - Styled Vertical Cards */}
            {isCategoryFrameEnabled && (
              <div className="space-y-2 pt-1">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-stone-900 flex items-center gap-1.5">
                    <span>Frame Option:</span>
                    <strong className="text-stone-900 font-bold normal-case">
                      {selectedFrame === 'gold' ? 'Rose Gold' : 'Black'}
                    </strong>
                  </span>
                  <span className="text-[11px] text-stone-500 font-normal">
                    {selectedFrame === 'gold' ? 'Rose Gold' : 'Matte Black'}
                  </span>
                </div>

                <div className={`grid ${isCategoryBlackAllowed && isCategoryGoldAllowed ? 'grid-cols-2' : 'grid-cols-1'} gap-2 sm:gap-2.5 max-w-[280px] sm:max-w-[300px]`}>
                  {/* Rose Gold Card */}
                  {isCategoryGoldAllowed && (
                    <button
                      type="button"
                      onClick={() => !isGoldOutOfStock && handleSelectFrame('gold')}
                      disabled={isGoldOutOfStock}
                      className={`frame-card-hover btn-press-bounce relative group p-2 sm:p-2.5 rounded-xl text-center transition-all duration-200 flex flex-col items-center justify-center cursor-pointer ${
                        isGoldOutOfStock
                          ? 'border border-stone-200 bg-stone-100/70 text-stone-400 opacity-50 cursor-not-allowed'
                          : selectedFrame === 'gold'
                          ? 'border-2 border-stone-900 bg-white text-stone-900 shadow-sm ring-1 ring-stone-900/10'
                          : 'border border-stone-200 bg-white text-stone-900 hover:border-stone-400 hover:shadow-xs'
                      }`}
                    >
                      <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-lg bg-stone-50 overflow-hidden border border-stone-100 flex items-center justify-center p-1 mb-1.5 transition-transform duration-300 group-hover:scale-105">
                        <img
                          src="/images/frames/gold-border-ref.jpg"
                          alt="Rose Gold"
                          className="w-full h-full object-contain rounded-md"
                        />
                      </div>
                      <span className="font-bold text-[11px] sm:text-xs text-stone-900 leading-tight">Rose Gold</span>
                      <span className="text-[9.5px] sm:text-[10px] text-stone-500 mt-0.5 font-normal leading-tight">Rose Gold</span>
                      {isGoldOutOfStock && (
                        <span className="mt-1 text-[8px] font-bold px-1.5 py-0.5 rounded-full bg-rose-100 text-rose-700 border border-rose-300">
                          Sold Out
                        </span>
                      )}
                    </button>
                  )}

                  {/* Black Card */}
                  {isCategoryBlackAllowed && (
                    <button
                      type="button"
                      onClick={() => !isBlackOutOfStock && handleSelectFrame('black')}
                      disabled={isBlackOutOfStock}
                      className={`frame-card-hover btn-press-bounce relative group p-2 sm:p-2.5 rounded-xl text-center transition-all duration-200 flex flex-col items-center justify-center cursor-pointer ${
                        isBlackOutOfStock
                          ? 'border border-stone-200 bg-stone-100/70 text-stone-400 opacity-50 cursor-not-allowed'
                          : selectedFrame === 'black'
                          ? 'border-2 border-stone-900 bg-white text-stone-900 shadow-sm ring-1 ring-stone-900/10'
                          : 'border border-stone-200 bg-white text-stone-900 hover:border-stone-400 hover:shadow-xs'
                      }`}
                    >
                      <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-lg bg-stone-50 overflow-hidden border border-stone-100 flex items-center justify-center p-1 mb-1.5 transition-transform duration-300 group-hover:scale-105">
                        <img
                          src="/images/frames/black-border-ref.jpg"
                          alt="Black"
                          className="w-full h-full object-contain rounded-md"
                        />
                      </div>
                      <span className="font-bold text-[11px] sm:text-xs text-stone-900 leading-tight">Black</span>
                      <span className="text-[9.5px] sm:text-[10px] text-stone-500 mt-0.5 font-normal leading-tight">Matte Black</span>
                      {isBlackOutOfStock && (
                        <span className="mt-1 text-[8px] font-bold px-1.5 py-0.5 rounded-full bg-rose-100 text-rose-700 border border-rose-300">
                          Sold Out
                        </span>
                      )}
                    </button>
                  )}
                </div>
              </div>
            )}

            {isCategoryFrameEnabled && isSelectedFrameOutOfStock && (
              <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-xs font-semibold flex items-center gap-2">
                <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
                <span>The selected frame finish ({selectedFrame === 'gold' ? 'Rose Gold' : 'Black'}) is currently Out of Stock. Please choose an in-stock frame to proceed.</span>
              </div>
            )}
              {/* Quantity Selector + Action Buttons */}
            <div className="space-y-3.5 pt-4 border-t border-stone-200">
              {/* Customise / Add Photo Button */}
              <button
                type="button"
                onClick={() => setIsCustomizerOpen(true)}
                className="btn-luxury-studio btn-shimmer-sweep btn-press-bounce group w-full py-3.5 px-4 rounded-2xl font-bold text-xs sm:text-sm flex items-center justify-center gap-2.5 cursor-pointer shadow-xs hover:shadow-lg transition-all duration-300"
                title={`Customise photo and size for ${product.title}`}
              >
                <div className="w-7 h-7 rounded-xl bg-gradient-to-tr from-[#FFF04B] to-[#FEE815] border border-amber-300 flex items-center justify-center shadow-xs shrink-0 group-hover:scale-110 group-hover:rotate-6 transition-all duration-300">
                  <Camera className="w-4 h-4 text-stone-950" />
                </div>
                <span className="text-stone-950 tracking-tight font-extrabold">Customise: Add Your Photo &amp; Custom Size</span>
                <span className="hidden sm:inline-flex items-center gap-1 text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-full bg-[#FEE815] text-stone-950 border border-amber-400 shadow-2xs group-hover:bg-[#FFF04B] transition-colors">
                  <Sparkles className="w-2.5 h-2.5 text-stone-950 animate-pulse" />
                  Live Studio
                </span>
              </button>

              {/* Quantity + Add to Cart & Buy Now Row */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 sm:gap-3">
                {/* On mobile: row with Quantity + Add to Cart */}
                <div className="flex items-center gap-2.5 flex-1">
                  {/* Quantity */}
                  <div className="flex items-center border border-stone-300 rounded-xl bg-white overflow-hidden shadow-xs shrink-0 h-11 sm:h-12">
                    <button
                      type="button"
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="px-3 sm:px-3.5 text-stone-700 hover:text-stone-950 hover:bg-stone-100 active:bg-amber-100 font-extrabold text-sm transition-all duration-150 cursor-pointer h-full active:scale-90"
                      aria-label="Decrease quantity"
                    >
                      -
                    </button>
                    <span className="px-2 sm:px-2.5 text-xs font-black text-stone-950 min-w-7 sm:min-w-8 text-center select-none">{quantity}</span>
                    <button
                      type="button"
                      onClick={() => setQuantity(Math.min(10, quantity + 1))}
                      className="px-3 sm:px-3.5 text-stone-700 hover:text-stone-950 hover:bg-stone-100 active:bg-amber-100 font-extrabold text-sm transition-all duration-150 cursor-pointer h-full active:scale-90"
                      aria-label="Increase quantity"
                    >
                      +
                    </button>
                  </div>

                  {/* Add to Cart Button */}
                  <button
                    type="button"
                    onClick={handleAddToCart}
                    className="btn-luxury-dark btn-shimmer-sweep btn-press-bounce group flex-1 h-11 sm:h-12 rounded-xl text-xs sm:text-sm flex items-center justify-center gap-2 cursor-pointer transition-all duration-300 shadow-md hover:shadow-xl"
                  >
                    <ShoppingBag className="w-4 h-4 text-[#FEE815] group-hover:scale-115 group-hover:-rotate-12 transition-transform duration-300 shrink-0" />
                    <span className="tracking-wide">{isSelectedFrameOutOfStock ? 'Frame Out of Stock' : 'Add to Cart'}</span>
                  </button>
                </div>

                {/* Instant Buy Now Button */}
                <button
                  type="button"
                  onClick={handleBuyNow}
                  className="btn-luxury-primary btn-shimmer-sweep btn-press-bounce group w-full sm:flex-1 h-11 sm:h-12 rounded-xl text-xs sm:text-sm flex items-center justify-center gap-2 cursor-pointer uppercase tracking-wider transition-all duration-300 shadow-lg hover:shadow-2xl"
                >
                  <span>{isSelectedFrameOutOfStock ? 'Sold Out' : 'Proceed to Checkout'}</span>
                  <ArrowRight className="w-4 h-4 text-stone-950 group-hover:translate-x-1.5 transition-transform duration-300 shrink-0" />
                </button>
              </div>

              {/* WhatsApp Enquiry & Support */}
              <div className="text-center pt-1">
                <a
                  href={whatsappCustomSizeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-luxury-whatsapp btn-shimmer-sweep btn-press-bounce group inline-flex items-center gap-2 text-xs font-bold text-stone-950 py-2.5 px-5 rounded-full shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-0.5 cursor-pointer"
                >
                  <MessageCircle className="w-4 h-4 text-stone-950 fill-stone-950 group-hover:scale-115 transition-transform duration-200" />
                  <span>
                    {isCustomSize
                      ? 'Need custom sizing advice? Chat with Us on WhatsApp'
                      : 'Need custom sizing or advice? Chat on WhatsApp'}
                  </span>
                </a>
              </div>

              <p className="text-[11px] text-stone-500 text-center font-medium">
                🔒 100% Secure Checkout • UPI, Credit/Debit Cards &amp; NetBanking
              </p>
            </div>


          </div>
        </div>

        {/* Confirmed Category Technical Specifications & 5-Tab Showcase */}
        <div className="border-t border-stone-200 pt-10">
          <CategorySpecificationsSection
            categorySlug={product.categorySlug}
            categoryName={product.categoryName}
          />
        </div>

{/* Luxury Related Products Section ("You May Also Like") */}
        {relatedProducts.length > 0 && (
          <div className="border-t border-stone-200 pt-12 space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-amber-800">Curated Recommendations</span>
                <h3 className="font-serif font-bold text-2xl sm:text-3xl text-stone-900">
                  You May Also Like
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



      {/* Unified Custom Photo & Size Modal */}
      <AddPhotoModal
        product={product}
        selectedVariant={product.variants[0]}
        initialFrame={!isCategoryFrameEnabled ? 'without' : selectedFrame === 'black' ? 'black' : 'gold'}
        showFrameOption={isCategoryFrameEnabled}
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
                  {getImagePerspectiveLabel(activeImage, activeImageIndex)} ({activeImageIndex + 1}/{galleryImages.length})
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
                        activeImageIndex === i ? 'border-[#FEE815] scale-105' : 'border-white/30 opacity-60 hover:opacity-100'
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
