'use client';

import React, { useState, useMemo, useEffect, useRef } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  Heart,
  Share2,
  Check,
  CheckCircle2,
  ZoomIn,
  X,
  MessageCircle,
  Truck,
  RotateCcw,
  Banknote,
  ThumbsUp,
  Sparkles,
  ArrowRight,
  Info,
  ShieldCheck,
  Sun,
  Zap,
  ChevronRight,
  ChevronLeft,
  Ruler,
  ShoppingBag,
  Star,
  MapPin,
  HelpCircle,
  Layers,
  Eye,
  Flame,
} from 'lucide-react';
import { Product, ProductReview } from '@/types';
import { useCart } from '@/context/CartContext';
import { useWishlist } from '@/context/WishlistContext';
import { INITIAL_SETTINGS } from '@/lib/data/settings';
import ProductCard from '@/components/product/ProductCard';

export type ShapeOptionType = 'portrait' | 'landscape' | 'square' | 'round';
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
  round: {
    id: 'round',
    label: 'Round',
    subtitle: 'Circular / Halo',
    ratioLabel: 'Circular Halo',
    dimensionsNote: 'Ideal for Divine Halos & Chakra Art',
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
        without3mm: 'With two way tape Adhesive hook',
        without5mm: 'With two way tape Adhesive hook',
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
        without3mm: 'With two way tape Adhesive hook',
        without5mm: 'With two way tape Adhesive hook',
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
        without5mm: 'With two way tape Adhesive hook',
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
        without5mm: '4 or 6 S.S Studds with screws',
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
        without3mm: 'With two way tape Adhesive hook',
        without5mm: 'With two way tape Adhesive hook',
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
        without3mm: 'With two way tape Adhesive hook',
        without5mm: 'With two way tape Adhesive hook',
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
        without5mm: 'With two way tape Adhesive hook',
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
        without5mm: '4 or 6 S.S Studds with screws',
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
        without5mm: '4 or 6 S.S Studds with screws',
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
        without3mm: 'With two way tape Adhesive hook',
        without5mm: 'With two way tape Adhesive hook',
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
        without3mm: 'With two way tape Adhesive hook',
        without5mm: 'With two way tape Adhesive hook',
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
        without5mm: 'With two way tape Adhesive hook',
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
        without5mm: '4 or 6 S.S Studds with screws',
      },
      prices: {
        without_5mm: { price: 5899, mrp: 10999 },
        gold: { price: 6499, mrp: 12499 },
        black: { price: 6499, mrp: 12499 },
      },
    },
  ],
  round: [
    {
      id: '12-dia',
      label: '12" Dia',
      dimensionsCm: '30 cm Diameter',
      allowedFrames: ['gold', 'black', 'without'],
      allowedThickness: ['3mm', '5mm'],
      mountingHardware: {
        framed: 'Circular Bracket & Wall Plugs Provided',
        without3mm: 'With heavy-duty 2-way adhesive hook',
        without5mm: 'With heavy-duty 2-way adhesive hook',
      },
      prices: {
        without_3mm: { price: 1299, mrp: 2499 },
        without_5mm: { price: 1499, mrp: 2799 },
        gold: { price: 1899, mrp: 3499 },
        black: { price: 1899, mrp: 3499 },
      },
    },
    {
      id: '16-dia',
      label: '16" Dia',
      dimensionsCm: '40 cm Diameter',
      allowedFrames: ['gold', 'black', 'without'],
      allowedThickness: ['3mm', '5mm'],
      mountingHardware: {
        framed: 'Circular Bracket & Wall Plugs Provided',
        without3mm: 'With heavy-duty 2-way adhesive hook',
        without5mm: 'With heavy-duty 2-way adhesive hook',
      },
      prices: {
        without_3mm: { price: 1899, mrp: 3599 },
        without_5mm: { price: 2199, mrp: 3999 },
        gold: { price: 2599, mrp: 4899 },
        black: { price: 2599, mrp: 4899 },
      },
    },
    {
      id: '20-dia',
      label: '20" Dia',
      dimensionsCm: '50 cm Diameter',
      allowedFrames: ['gold', 'black', 'without'],
      allowedThickness: ['5mm'],
      mountingHardware: {
        framed: 'Circular Bracket & Wall Plugs Provided',
        without3mm: '',
        without5mm: '4 S.S Studds with radial screws',
      },
      prices: {
        without_5mm: { price: 3299, mrp: 5999 },
        gold: { price: 3899, mrp: 6999 },
        black: { price: 3899, mrp: 6999 },
      },
    },
    {
      id: '24-dia',
      label: '24" Dia',
      dimensionsCm: '60 cm Diameter',
      allowedFrames: ['gold', 'black', 'without'],
      allowedThickness: ['5mm'],
      mountingHardware: {
        framed: 'Circular Heavy-Duty Bracket Provided',
        without3mm: '',
        without5mm: '4 S.S Studds with radial screws',
      },
      prices: {
        without_5mm: { price: 4899, mrp: 8999 },
        gold: { price: 5499, mrp: 9999 },
        black: { price: 5499, mrp: 9999 },
      },
    },
  ],
};

export const SIZE_OPTIONS: SizeOption[] = [
  ...SHAPE_SIZES.portrait,
  ...SHAPE_SIZES.landscape,
  ...SHAPE_SIZES.square,
  ...SHAPE_SIZES.round,
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
  const { isInWishlist, toggleWishlist } = useWishlist();

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
    if (product.shape === 'round' || product.orientation === 'round') return 'round';
    if (product.shape === 'square' || product.orientation === 'square') return 'square';
    if (product.shape === 'landscape' || product.orientation === 'horizontal') return 'landscape';
    return 'portrait';
  }, [product.shape, product.orientation]);

  const [selectedShape, setSelectedShape] = useState<ShapeOptionType>(initialShape);

  // Available sizes calibrated for the selected shape & product variants
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
      return defaultList.map((sizeObj, idx) => {
        const v = sourceVariants[idx];
        if (!v || !v.price) return sizeObj;
        const vPrice = Number(v.price);
        const vMrp = Number(v.mrp) || Math.round(vPrice * 1.8);
        return {
          ...sizeObj,
          label: v.size.replace(' (Grand Wall Size)', '').replace(' (Grand Sanctum)', ''),
          dimensionsCm: v.dimensionsCm || sizeObj.dimensionsCm,
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

    return defaultList;
  }, [selectedShape, liveProduct.orientationVariants, liveProduct.variants]);

  // Selected frame & size state
  const [selectedFrame, setSelectedFrame] = useState<FrameType>('gold');
  const [selectedSizeId, setSelectedSizeId] = useState<string | null>(() => {
    const initList = SHAPE_SIZES[initialShape] || SHAPE_SIZES.portrait;
    return initList[0]?.id || '12x18';
  });
  const [selectedThickness, setSelectedThickness] = useState<ThicknessType>('3mm');
  const [quantity, setQuantity] = useState(1);

  // Gallery state
  const galleryImages = useMemo(() => {
    return Array.from(new Set((product.images || []).filter(Boolean)));
  }, [product.images]);

  const [activeImageIndex, setActiveImageIndex] = useState<number>(0);
  const activeImage = galleryImages[activeImageIndex] || product.images[0] || '';

  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [zoomCoords, setZoomCoords] = useState<{ x: number; y: number } | null>(null);
  const [isAartiGlow, setIsAartiGlow] = useState(product.hasLedBacklight);
  const [copiedLink, setCopiedLink] = useState(false);

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

  // Tabs state
  const [activeTab, setActiveTab] = useState<'overview' | 'craft' | 'specs' | 'sizeguide' | 'install' | 'shipping' | 'reviews' | 'faq'>('overview');

  // Customer Reviews state
  const [reviewsList, setReviewsList] = useState<ProductReview[]>(product.reviews || []);
  const [reviewName, setReviewName] = useState('');
  const [reviewCity, setReviewCity] = useState('');
  const [reviewRating, setReviewRating] = useState(5);
  const [reviewComment, setReviewComment] = useState('');
  const [submittingReview, setSubmittingReview] = useState(false);
  const [reviewSuccess, setReviewSuccess] = useState(false);

  const wishlisted = isInWishlist(product.slug);

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
    if (selectedFrame !== 'without' || !currentSizeObj) return [];
    return currentSizeObj.allowedThickness;
  }, [selectedFrame, currentSizeObj]);

  // Active pricing calculation
  const currentPricing = useMemo(() => {
    if (!currentSizeObj) {
      return { price: liveProduct.basePrice, mrp: liveProduct.baseMrp, isRange: true };
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
  }, [currentSizeObj, selectedFrame, selectedThickness, product.basePrice, product.baseMrp]);

  // Hardware helper text
  const mountingNote = useMemo(() => {
    if (!currentSizeObj) return '';
    if (selectedFrame === 'gold' || selectedFrame === 'black') {
      return currentSizeObj.mountingHardware.framed;
    }
    if (selectedFrame === 'without') {
      if (selectedThickness === '3mm') return currentSizeObj.mountingHardware.without3mm;
      return currentSizeObj.mountingHardware.without5mm;
    }
    return '';
  }, [currentSizeObj, selectedFrame, selectedThickness]);

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
          if (frame === 'without' && fallback.allowedThickness.length > 0) {
            setSelectedThickness(fallback.allowedThickness[0]);
          }
        }
      } else if (frame === 'without' && sizeObj) {
        if (!sizeObj.allowedThickness.includes(selectedThickness)) {
          setSelectedThickness(sizeObj.allowedThickness[0] || '3mm');
        }
      }
    }
  };

  // Handle size selection
  const handleSelectSize = (sizeId: string) => {
    setSelectedSizeId(sizeId);
    const sizeObj = availableSizes.find((s) => s.id === sizeId);
    if (sizeObj) {
      if (selectedFrame === 'without') {
        if (!sizeObj.allowedThickness.includes(selectedThickness)) {
          setSelectedThickness(sizeObj.allowedThickness[0] || '5mm');
        }
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
    const frameLabel = selectedFrame === 'gold' ? 'Gold Frame' : selectedFrame === 'black' ? 'Black Frame' : `Without Frame (${selectedThickness})`;
    const sizeLabel = currentSizeObj ? currentSizeObj.label : '12x18';

    addToCart(
      {
        productId: product.id,
        slug: product.slug,
        title: product.title,
        image: activeImage,
        variantId: `${product.slug}-${selectedShape}-${selectedFrame}-${sizeLabel}-${selectedThickness}`,
        size: `${sizeLabel} (${selectedShape.toUpperCase()})`,
        finish: frameLabel,
        lighting: product.hasLedBacklight ? (isAartiGlow ? 'Warm LED Backlit (12V Adapter)' : 'Daylight Acrylic (LED Off)') : 'Pure Acrylic Wall Art',
        shape: selectedShape,
        unitPrice: currentPricing.price,
        unitMrp: currentPricing.mrp,
        quantity,
        customization: {
          previewUrl: activeImage,
          frameType: selectedFrame,
          orientation: selectedShape === 'portrait' ? 'vertical' : selectedShape === 'landscape' ? 'horizontal' : selectedShape === 'square' ? 'square' : 'round',
          aspectRatio: SHAPE_CONFIGS[selectedShape].ratioLabel,
          specialInstructions: `Shape: ${selectedShape.toUpperCase()} | Frame: ${frameLabel} | Size: ${sizeLabel}`,
        },
      },
      true
    );
  };

  // Instant Buy Now
  const handleBuyNow = () => {
    const frameLabel = selectedFrame === 'gold' ? 'Gold Frame' : selectedFrame === 'black' ? 'Black Frame' : `Without Frame (${selectedThickness})`;
    const sizeLabel = currentSizeObj ? currentSizeObj.label : '12x18';

    addToCart(
      {
        productId: product.id,
        slug: product.slug,
        title: product.title,
        image: activeImage,
        variantId: `${product.slug}-${selectedShape}-${selectedFrame}-${sizeLabel}-${selectedThickness}`,
        size: `${sizeLabel} (${selectedShape.toUpperCase()})`,
        finish: frameLabel,
        lighting: product.hasLedBacklight ? (isAartiGlow ? 'Warm LED Backlit (12V Adapter)' : 'Daylight Acrylic (LED Off)') : 'Pure Acrylic Wall Art',
        shape: selectedShape,
        unitPrice: currentPricing.price,
        unitMrp: currentPricing.mrp,
        quantity,
        customization: {
          previewUrl: activeImage,
          frameType: selectedFrame,
          orientation: selectedShape === 'portrait' ? 'vertical' : selectedShape === 'landscape' ? 'horizontal' : selectedShape === 'square' ? 'square' : 'round',
          aspectRatio: SHAPE_CONFIGS[selectedShape].ratioLabel,
          specialInstructions: `Shape: ${selectedShape.toUpperCase()} | Frame: ${frameLabel} | Size: ${sizeLabel}`,
        },
      },
      false
    );
    closeCart();
    router.push('/checkout');
  };

  // WhatsApp Custom Size & Consultation
  const cleanWaNumber = (INITIAL_SETTINGS.whatsappNumber || '919032372782').replace(/[^0-9]/g, '');
  const whatsappCustomSizeUrl = `https://wa.me/${cleanWaNumber}?text=${encodeURIComponent(
    `Hello Abhi's Gifts! I would like to inquire about ordering "${product.title}" (${selectedShape.toUpperCase()} layout, ${currentSizeObj ? currentSizeObj.label : "custom"} in, ${selectedFrame} finish, ₹${currentPricing.price.toLocaleString('en-IN')}). Can you share details or custom dimensions?`
  )}`;

  // Post review
  const handleReviewSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!reviewName.trim() || !reviewComment.trim()) return;

    setSubmittingReview(true);
    try {
      const res = await fetch('/api/reviews', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          productSlug: product.slug,
          authorName: reviewName,
          city: reviewCity || 'India',
          rating: reviewRating,
          comment: reviewComment,
        }),
      });

      const data = await res.json();
      if (res.ok && data.success) {
        setReviewsList((prev) => [data.review, ...prev]);
        setReviewSuccess(true);
        setReviewName('');
        setReviewCity('');
        setReviewComment('');
      }
    } catch {
      // fallback
    } finally {
      setSubmittingReview(false);
    }
  };

  const handleShare = () => {
    if (typeof navigator !== 'undefined' && navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2000);
    }
  };

  const nextImage = () => {
    setActiveImageIndex((prev) => (prev + 1) % galleryImages.length);
  };

  const prevImage = () => {
    setActiveImageIndex((prev) => (prev - 1 + galleryImages.length) % galleryImages.length);
  };

  return (
    <div className="w-full bg-[#121212] text-[#FFFFFF] transition-colors duration-300">
      <div className="w-full max-w-[1720px] mx-auto px-4 sm:px-6 lg:px-10 xl:px-14 py-4 sm:py-6 space-y-8 sm:space-y-12">
        {/* Top Breadcrumb Navigation & Quick Actions */}
        <nav aria-label="Breadcrumb" className="flex items-center justify-between gap-4 text-xs text-[#D1D5DB] border-b border-[#2D2D2D]/60 pb-3.5">
          <ol className="flex items-center flex-wrap gap-1.5 sm:gap-2">
            <li>
              <Link href="/" className="hover:text-[#FFFFFF] font-medium transition-colors">
                Home
              </Link>
            </li>
            <li><ChevronRight className="w-3.5 h-3.5 text-[#EAB308]" /></li>
            <li>
              <Link href="/shop" className="hover:text-[#FFFFFF] font-medium transition-colors">
                Sacred Wall Art
              </Link>
            </li>
            {product.categorySlug && (
              <>
                <li><ChevronRight className="w-3.5 h-3.5 text-[#EAB308]" /></li>
                <li>
                  <Link href={`/category/${product.categorySlug}`} className="hover:text-[#FFFFFF] font-medium transition-colors capitalize">
                    {product.categoryName || product.deity || 'Collection'}
                  </Link>
                </li>
              </>
            )}
            <li><ChevronRight className="w-3.5 h-3.5 text-[#EAB308]" /></li>
            <li className="font-semibold text-[#FFFFFF] truncate max-w-[180px] sm:max-w-xs" aria-current="page">
              {product.title}
            </li>
          </ol>

          {/* Quick Utility Actions */}
          <div className="flex items-center gap-2 shrink-0">
            <button
              type="button"
              onClick={() => toggleWishlist(product.slug)}
              className={`p-2 rounded-full border transition-all cursor-pointer ${
                wishlisted
                  ? 'bg-rose-50 text-rose-600 border-rose-200 shadow-xs'
                  : 'bg-[#181818] text-[#D1D5DB] border-[#2D2D2D] hover:text-[#FFFFFF] hover:border-[#EAB308]'
              }`}
              title={wishlisted ? 'Remove from Wishlist' : 'Add to Wishlist'}
              aria-label="Wishlist"
            >
              <Heart className={`w-4 h-4 ${wishlisted ? 'fill-current' : ''}`} />
            </button>

            <button
              type="button"
              onClick={handleShare}
              className="p-2 rounded-full bg-[#181818] text-[#D1D5DB] border border-[#2D2D2D] hover:text-[#FFFFFF] hover:border-[#EAB308] transition-all cursor-pointer relative"
              title="Share Artwork"
              aria-label="Share"
            >
              <Share2 className="w-4 h-4" />
              {copiedLink && (
                <span className="absolute -bottom-8 right-0 bg-[#181818] text-[#FFFFFF] border border-[#EAB308]/40 text-[10px] font-bold px-2 py-0.5 rounded shadow-md whitespace-nowrap animate-in fade-in">
                  Link Copied!
                </span>
              )}
            </button>
          </div>
        </nav>

        {/* Main 2-Column Showcase */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 xl:gap-16 items-start">
          {/* LEFT COLUMN: Main Sticky Artwork Frame & Mockups Gallery */}
          <div className="lg:col-span-7 xl:col-span-7 lg:sticky lg:top-24 self-start space-y-5">
            {/* Main Display Container with Interactive 3D Frame Simulation */}
            <div
              className={`relative w-full aspect-square sm:aspect-[4/5] max-h-[580px] rounded-3xl overflow-hidden bg-gradient-to-b from-[#141414] via-[#181818] to-[#141414] border border-[#2D2D2D] transition-all duration-500 flex items-center justify-center p-4 sm:p-7 group ${
                isAartiGlow
                  ? 'shadow-[0_0_55px_rgba(245,175,65,0.4)] ring-2 ring-[#C69A42]/50'
                  : 'shadow-[0_10px_35px_rgba(0,0,0,0.4)]'
              }`}
            >
              {/* Top Left Refined Promotional Badges */}
              <div className="absolute top-4 left-4 z-20 flex flex-col items-start gap-1.5 pointer-events-none">
                {discountPercent > 0 && (
                  <span className="bg-[#181818] text-[#FFFFFF] text-[11px] font-bold px-3 py-1 rounded-full shadow-md border border-[#EAB308]/60 backdrop-blur-xs flex items-center gap-1.5 tracking-wide">
                    <Sparkles className="w-3 h-3 text-[#E8D1A5]" />
                    <span>Save {discountPercent}%</span>
                  </span>
                )}
                {product.isBestseller && (
                  <span className="bg-[#181818] text-[#FACC15] text-[10px] font-bold px-2.5 py-0.5 rounded-full shadow-xs border border-[#EAB308]/40 uppercase tracking-wider">
                    ★ Best Seller
                  </span>
                )}
                
              </div>

              {/* Top Right Floating Controls: warm Glow Mode + Fullscreen Zoom */}
              <div className="absolute top-4 right-4 z-20 flex items-center gap-2">
                

                {/* Lightbox Trigger */}
                <button
                  type="button"
                  onClick={() => setLightboxOpen(true)}
                  className="p-2 rounded-full bg-[#181818]/90 hover:bg-[#181818] text-[#FFFFFF] shadow-md border border-[#2D2D2D] transition-all hover:scale-105 cursor-pointer"
                  aria-label="Fullscreen view"
                  title="Full Screen View"
                >
                  <ZoomIn className="w-4 h-4" />
                </button>
              </div>

              {/* Interactive Adaptive Frame Rendering Wrapper */}
              <div
                className="w-full h-full flex items-center justify-center cursor-crosshair relative p-1 sm:p-2"
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
                  className={`relative transition-all duration-500 flex items-center justify-center ${
                    selectedShape === 'portrait'
                      ? 'w-full aspect-[3/4] max-w-[450px] max-h-[520px]'
                      : selectedShape === 'landscape'
                      ? 'w-full aspect-[4/3] sm:aspect-[16/11] max-w-[560px] max-h-[460px]'
                      : selectedShape === 'square'
                      ? 'w-full aspect-square max-w-[480px] max-h-[480px]'
                      : 'w-full aspect-square max-w-[450px] max-h-[450px]'
                  }`}
                >
                  {/* Simulated Ambient warm Backglow Halo on Wall */}
                  {isAartiGlow && (
                    <div
                      className={`absolute -inset-4 sm:-inset-6 pointer-events-none transition-all duration-700 ${
                        selectedShape === 'round' ? 'rounded-full' : 'rounded-3xl'
                      }`}
                      style={{
                        background: 'radial-gradient(circle, rgba(255, 195, 75, 0.45) 0%, rgba(214, 170, 85, 0.25) 50%, transparent 75%)',
                        filter: 'blur(28px)',
                      }}
                    />
                  )}

                  <div
                    className={`relative w-full h-full overflow-hidden transition-all duration-500 ${
                      selectedShape === 'round' ? 'rounded-full' : 'rounded-2xl'
                    } ${
                      selectedFrame === 'gold'
                        ? `border-[12px] sm:border-[16px] border-[#EAB308] shadow-[0_16px_36px_rgba(198,154,66,0.38)] ring-1 ring-[#946F25] ${
                            selectedShape === 'round' ? 'rounded-full' : 'rounded-2xl'
                          }`
                        : selectedFrame === 'black'
                        ? `border-[12px] sm:border-[16px] border-[#1C1917] shadow-[0_16px_36px_rgba(0,0,0,0.45)] ring-1 ring-stone-900 ${
                            selectedShape === 'round' ? 'rounded-full' : 'rounded-2xl'
                          }`
                        : `border-2 border-[#2D2D2D]/90 shadow-[0_12px_30px_rgba(0,0,0,0.4)] ${
                            selectedShape === 'round' ? 'rounded-full' : 'rounded-2xl'
                          }`
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
                      className={`w-full h-full object-cover transition-transform duration-150 ${
                        selectedShape === 'round' ? 'rounded-full' : ''
                      }`}
                    />

                    {/* Corner Studs for Frameless Crystal Acrylic */}
                    {selectedFrame === 'without' && (
                      <>
                        {selectedShape === 'round' ? (
                          <>
                            <div className="absolute top-2 left-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-gradient-to-br from-amber-100 via-amber-300 to-amber-700 shadow-xs border border-amber-900/40 pointer-events-none" />
                            <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-gradient-to-br from-amber-100 via-amber-300 to-amber-700 shadow-xs border border-amber-900/40 pointer-events-none" />
                            <div className="absolute left-2 top-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-gradient-to-br from-amber-100 via-amber-300 to-amber-700 shadow-xs border border-amber-900/40 pointer-events-none" />
                            <div className="absolute right-2 top-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-gradient-to-br from-amber-100 via-amber-300 to-amber-700 shadow-xs border border-amber-900/40 pointer-events-none" />
                          </>
                        ) : (
                          <>
                            <div className="absolute top-2.5 left-2.5 w-3 h-3 rounded-full bg-gradient-to-br from-amber-100 via-amber-300 to-amber-700 shadow-xs border border-amber-900/40 pointer-events-none" />
                            <div className="absolute top-2.5 right-2.5 w-3 h-3 rounded-full bg-gradient-to-br from-amber-100 via-amber-300 to-amber-700 shadow-xs border border-amber-900/40 pointer-events-none" />
                            <div className="absolute bottom-2.5 left-2.5 w-3 h-3 rounded-full bg-gradient-to-br from-amber-100 via-amber-300 to-amber-700 shadow-xs border border-amber-900/40 pointer-events-none" />
                            <div className="absolute bottom-2.5 right-2.5 w-3 h-3 rounded-full bg-gradient-to-br from-amber-100 via-amber-300 to-amber-700 shadow-xs border border-amber-900/40 pointer-events-none" />
                          </>
                        )}
                      </>
                    )}

                    {/* Frameless Acrylic Glossy Sheen Overlay */}
                    <div
                      className={`absolute inset-0 pointer-events-none bg-gradient-to-tr from-transparent via-white/10 to-white/25 ${
                        selectedShape === 'round' ? 'rounded-full' : ''
                      }`}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Upgraded Image Gallery Strip with Prev/Next Navigation */}
            {galleryImages.length > 1 && (
              <div className="space-y-2.5">
                <div className="flex items-center justify-between text-xs font-semibold text-[#D1D5DB]">
                  <span className="flex items-center gap-1.5">
                    <Eye className="w-3.5 h-3.5 text-[#EAB308]" />
                    <span>
                      {GALLERY_STYLE_LABELS[activeImageIndex] || `Perspective ${activeImageIndex + 1}`} ({activeImageIndex + 1}/{galleryImages.length})
                    </span>
                  </span>
                  <div className="flex items-center gap-1">
                    <button
                      type="button"
                      onClick={prevImage}
                      className="p-1 rounded-full border border-[#2D2D2D] bg-[#181818] hover:bg-[#222222] text-[#FFFFFF] transition-colors cursor-pointer"
                      title="Previous Image"
                      aria-label="Previous image"
                    >
                      <ChevronLeft className="w-3.5 h-3.5" />
                    </button>
                    <button
                      type="button"
                      onClick={nextImage}
                      className="p-1 rounded-full border border-[#2D2D2D] bg-[#181818] hover:bg-[#222222] text-[#FFFFFF] transition-colors cursor-pointer"
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
                        className={`w-16 h-16 sm:w-20 sm:h-20 shrink-0 rounded-2xl overflow-hidden border-2 transition-all bg-[#1A1A1A] cursor-pointer relative group ${
                          isSelected
                            ? 'border-[#EAB308] ring-2 ring-[#C69A42]/50 scale-102 shadow-md'
                            : 'border-[#2D2D2D] opacity-75 hover:opacity-100 hover:border-[#EAB308]/70'
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
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                        {isSelected && (
                          <div className="absolute inset-0 bg-[#EAB308]/10 pointer-events-none" />
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Quick Craft Pillar Highlights */}
            <div className="grid grid-cols-3 gap-2.5 pt-1 text-center">
              <div className="p-3 rounded-2xl bg-[#181818] border border-[#2D2D2D] text-[11px] font-semibold text-[#FFFFFF] flex items-center justify-center gap-1.5 shadow-2xs">
                <Sparkles className="w-3.5 h-3.5 text-[#EAB308] shrink-0" />
                <span className="truncate">Premium Acrylic</span>
              </div>
              <div className="p-3 rounded-2xl bg-[#181818] border border-[#2D2D2D] text-[11px] font-semibold text-[#FFFFFF] flex items-center justify-center gap-1.5 shadow-2xs">
                <ShieldCheck className="w-3.5 h-3.5 text-[#EAB308] shrink-0" />
                <span className="truncate">100% Moisture Proof</span>
              </div>
              <div className="p-3 rounded-2xl bg-[#181818] border border-[#2D2D2D] text-[11px] font-semibold text-[#FFFFFF] flex items-center justify-center gap-1.5 shadow-2xs">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#EAB308] shrink-0" />
                <span className="truncate">Mounting Bracket Incl.</span>
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN: Variation Controls & Purchase Actions */}
          <div
            ref={mainPurchaseRef}
            className="lg:col-span-5 xl:col-span-5 space-y-6 bg-[#181818] p-6 sm:p-8 rounded-3xl border border-[#2D2D2D] shadow-[0_10px_35px_rgba(0,0,0,0.4)]"
          >
            {/* Header Block: Category, Stock & Title */}
            <div className="space-y-2.5">
              <div className="flex items-center justify-between gap-2 flex-wrap">
                <span className="text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-[#FFFFFF] bg-[#1A1A1A] px-3 py-1 rounded-full border border-[#EAB308]/50">
                  {product.deity || product.categoryName || 'Sacred Wall Decor'}
                </span>
                <span className="text-[11px] font-semibold text-emerald-800 flex items-center gap-1.5 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  <span>In Stock • Ships in 24-48 Hours</span>
                </span>
              </div>

              <h1 className="text-2xl sm:text-3xl lg:text-[32px] font-serif font-bold text-[#FFFFFF] leading-tight tracking-tight">
                {product.title}
              </h1>

              {product.subtitle && (
                <p className="text-xs sm:text-sm text-[#D1D5DB] font-medium leading-relaxed">
                  {product.subtitle}
                </p>
              )}

              {/* Rating & Review Counter */}
              <div className="flex items-center gap-2 text-xs text-[#D1D5DB] pt-0.5">
                {reviewsList.length > 0 ? (
                  <>
                    <div className="flex items-center text-[#EAB308]">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-3.5 h-3.5 ${
                            i < Math.round(product.rating || 5)
                              ? 'fill-[#C69A42] text-[#EAB308]'
                              : 'text-stone-300'
                          }`}
                        />
                      ))}
                    </div>
                    <span className="font-bold text-[#FFFFFF]">
                      {(product.rating || 5).toFixed(1)} / 5.0
                    </span>
                    <span className="text-stone-300">•</span>
                    <button
                      type="button"
                      onClick={() => {
                        setActiveTab('reviews');
                        const el = document.getElementById('product-tabs-section');
                        if (el) el.scrollIntoView({ behavior: 'smooth' });
                      }}
                      className="text-[#EAB308] hover:text-[#FFFFFF] hover:underline font-semibold cursor-pointer transition-colors"
                    >
                      {reviewsList.length} {reviewsList.length === 1 ? 'Review' : 'Reviews'}
                    </button>
                  </>
                ) : (
                  <>
                    <div className="flex items-center text-stone-300">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-3.5 h-3.5 text-stone-300" />
                      ))}
                    </div>
                    <button
                      type="button"
                      onClick={() => {
                        setActiveTab('reviews');
                        const el = document.getElementById('product-tabs-section');
                        if (el) el.scrollIntoView({ behavior: 'smooth' });
                      }}
                      className="text-[#D1D5DB] hover:text-[#FFFFFF] hover:underline cursor-pointer transition-colors"
                    >
                      No reviews yet • <span className="text-[#EAB308] font-medium">Be the first to review</span>
                    </button>
                  </>
                )}
              </div>
            </div>

            {/* Dynamic Pricing Banner */}
            <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-[#181818] via-[#141414] to-[#181818] border border-[#2D2D2D] space-y-1.5 shadow-2xs">
              <div className="flex items-baseline justify-between gap-2 flex-wrap">
                <div className="flex items-baseline gap-3">
                  <span className="text-3xl sm:text-4xl font-serif font-bold text-[#FFFFFF]">
                    ₹{currentPricing.price.toLocaleString('en-IN')}
                  </span>
                  {currentPricing.mrp > currentPricing.price && (
                    <span className="text-base sm:text-lg text-[#D1D5DB] line-through font-normal">
                      ₹{currentPricing.mrp.toLocaleString('en-IN')}
                    </span>
                  )}
                </div>

                {discountPercent > 0 && (
                  <span className="text-xs font-bold text-[#FFFFFF] bg-[#181818] border border-[#EAB308] px-3 py-1 rounded-full shadow-2xs">
                    Save {discountPercent}% OFF
                  </span>
                )}
              </div>
              <p className="text-[11px] text-[#D1D5DB] font-medium flex items-center gap-1.5">
                <Sparkles className="w-3 h-3 text-[#EAB308] shrink-0" />
                <span>Inclusive of all taxes • Fast Dispatch • Handcrafted in Hyderabad</span>
              </p>
            </div>

            {/* Customization 1: Frame Style */}
            <div className="space-y-2.5">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-[#FFFFFF]">
                  1. Frame Style:{' '}
                  <strong className="text-[#EAB308] font-serif">
                    {selectedFrame === 'gold' ? 'Champagne Gold' : selectedFrame === 'black' ? 'Matte Black' : 'Frameless Crystal Acrylic'}
                  </strong>
                </span>
                <span className="text-[11px] text-[#D1D5DB]">Select finish</span>
              </div>

              <div className="grid grid-cols-3 gap-2.5">
                {/* Gold Frame Card */}
                <button
                  type="button"
                  onClick={() => handleSelectFrame('gold')}
                  className={`p-2.5 rounded-2xl border-2 transition-all flex flex-col items-center text-center gap-1.5 cursor-pointer ${
                    selectedFrame === 'gold'
                      ? 'border-[#EAB308] bg-[#1A1A1A] ring-2 ring-[#C69A42]/30 shadow-xs'
                      : 'border-[#2D2D2D] bg-[#181818] hover:border-[#EAB308]/60'
                  }`}
                >
                  <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl overflow-hidden border border-[#EAB308]/60 shadow-xs bg-[#121212]">
                    <img
                      src="/images/frames/gold-border-ref.jpg"
                      alt="Champagne Gold Aluminium Frame Border"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <span className="text-xs font-bold text-[#FFFFFF] leading-tight">Gold Frame</span>
                  <span className="text-[10px] text-[#D1D5DB]">Champagne Gold</span>
                </button>

                {/* Black Frame Card */}
                <button
                  type="button"
                  onClick={() => handleSelectFrame('black')}
                  className={`p-2.5 rounded-2xl border-2 transition-all flex flex-col items-center text-center gap-1.5 cursor-pointer ${
                    selectedFrame === 'black'
                      ? 'border-[#EAB308] bg-[#1A1A1A] ring-2 ring-[#C69A42]/30 shadow-xs'
                      : 'border-[#2D2D2D] bg-[#181818] hover:border-[#EAB308]/60'
                  }`}
                >
                  <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl overflow-hidden border border-stone-800 shadow-xs bg-[#121212]">
                    <img
                      src="/images/frames/black-border-ref.jpg"
                      alt="Matte Black Aluminium Frame Border"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <span className="text-xs font-bold text-[#FFFFFF] leading-tight">Black Frame</span>
                  <span className="text-[10px] text-[#D1D5DB]">Matte Black</span>
                </button>

                {/* Without Frame Card */}
                <button
                  type="button"
                  onClick={() => handleSelectFrame('without')}
                  className={`p-2.5 rounded-2xl border-2 transition-all flex flex-col items-center text-center gap-1.5 cursor-pointer ${
                    selectedFrame === 'without'
                      ? 'border-[#EAB308] bg-[#1A1A1A] ring-2 ring-[#C69A42]/30 shadow-xs'
                      : 'border-[#2D2D2D] bg-[#181818] hover:border-[#EAB308]/60'
                  }`}
                >
                  <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl overflow-hidden border border-[#2D2D2D] shadow-xs bg-[#121212]">
                    <img
                      src="/images/frames/acrylic-border-ref.jpg"
                      alt="Frameless Acrylic Photo Frame Border"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <span className="text-xs font-bold text-[#FFFFFF] leading-tight">No Frame</span>
                  <span className="text-[10px] text-[#D1D5DB]">Crystal Acrylic</span>
                </button>
              </div>
            </div>

            {/* Thickness Selector (When Without Frame is selected) */}
            {selectedFrame === 'without' && availableThicknesses.length > 0 && (
              <div className="space-y-2 bg-[#1A1A1A] p-3.5 rounded-2xl border border-[#2D2D2D]">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-[#FFFFFF]">
                    Acrylic Thickness: <strong className="text-[#EAB308]">{selectedThickness}</strong>
                  </span>
                  <span className="text-[11px] text-[#D1D5DB]">
                    {selectedThickness === '3mm' ? 'With 2-way tape adhesive hook' : 'Heavy cast acrylic with S.S studs'}
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
                          ? 'border-[#EAB308] bg-[#181818] text-[#FFFFFF] shadow-xs'
                          : 'border-[#2D2D2D] bg-[#181818]/70 text-[#D1D5DB] hover:border-[#EAB308]/60'
                      }`}
                    >
                      {th} {th === '3mm' ? '(Standard)' : '(Heavy Cast)'}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Customization 3: Dimensions & Size Selector */}
            <div className="space-y-2.5">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-[#FFFFFF]">
                  3. Dimensions:{' '}
                  <strong className="text-[#EAB308] font-serif">
                    {currentSizeObj ? `${currentSizeObj.label} (${currentSizeObj.dimensionsCm})` : 'Select Size'}
                  </strong>
                </span>
                {selectedSizeId && (
                  <button
                    type="button"
                    onClick={() => setSelectedSizeId(null)}
                    className="text-[10px] font-bold text-stone-400 hover:text-[#FFFFFF] uppercase tracking-wider transition-colors cursor-pointer"
                  >
                    CLEAR
                  </button>
                )}
              </div>

              {/* Size Pills Grid */}
              <div className="grid grid-cols-4 gap-2">
                {availableSizes.map((s) => {
                  const isSelected = selectedSizeId === s.id;
                  const isSupported = s.allowedFrames.includes(selectedFrame);

                  return (
                    <button
                      key={s.id}
                      type="button"
                      disabled={!isSupported}
                      onClick={() => handleSelectSize(s.id)}
                      className={`py-2 px-1 sm:py-2.5 sm:px-1.5 min-h-[46px] rounded-xl sm:rounded-2xl text-xs transition-all flex flex-col items-center justify-center cursor-pointer ${
                        isSelected
                          ? 'border-2 border-[#EAB308] text-[#FFFFFF] font-bold bg-[#1A1A1A] shadow-xs'
                          : isSupported
                          ? 'border border-[#2D2D2D] text-[#D1D5DB] bg-[#181818] hover:border-[#EAB308]/60 font-medium'
                          : 'border border-[#2D2D2D] text-stone-300 bg-[#121212] cursor-not-allowed line-through'
                      }`}
                    >
                      <span className="font-bold">{s.label}&quot;</span>
                      <span className="text-[9px] text-[#D1D5DB] leading-none mt-0.5">{s.dimensionsCm.split(' ')[0]}cm</span>
                    </button>
                  );
                })}
              </div>

              {/* Hardware Note */}
              {mountingNote && (
                <div className="p-3 rounded-xl bg-[#181818] border border-[#2D2D2D]/80 text-[11px] text-[#D1D5DB] flex items-center gap-2">
                  <Info className="w-4 h-4 text-[#EAB308] shrink-0" />
                  <span>Mounting hardware provided: <strong className="text-[#FFFFFF]">{mountingNote}</strong></span>
                </div>
              )}
            </div>

            {/* Quantity Selector + Action Buttons */}
            <div className="space-y-3.5 pt-2 border-t border-[#2D2D2D]">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-[#FFFFFF] uppercase tracking-wider">Quantity:</span>
                <div className="flex items-center border border-[#2D2D2D] rounded-2xl bg-[#181818] overflow-hidden shadow-2xs">
                  <button
                    type="button"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="px-3.5 py-1.5 text-[#D1D5DB] hover:bg-[#222222] font-bold text-sm transition-colors cursor-pointer"
                    aria-label="Decrease quantity"
                  >
                    -
                  </button>
                  <span className="px-4 text-xs font-bold text-[#FFFFFF] min-w-8 text-center">{quantity}</span>
                  <button
                    type="button"
                    onClick={() => setQuantity(Math.min(10, quantity + 1))}
                    className="px-3.5 py-1.5 text-[#D1D5DB] hover:bg-[#222222] font-bold text-sm transition-colors cursor-pointer"
                    aria-label="Increase quantity"
                  >
                    +
                  </button>
                </div>
              </div>

              {/* CTA Buttons: Buy Now & Add to Cart */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                {/* Instant Buy Now Button */}
                <button
                  type="button"
                  onClick={handleBuyNow}
                  className="w-full bg-gradient-to-r from-[#EAB308] via-[#FACC15] to-[#EAB308] hover:from-[#FACC15] hover:to-[#EAB308] text-[#000000] font-bold text-sm sm:text-base py-3.5 rounded-2xl shadow-md border border-[#EAB308]/50 transition-all flex items-center justify-center gap-2 cursor-pointer hover:shadow-lg active:scale-[0.99]"
                >
                  <span>Buy Now</span>
                  <ArrowRight className="w-4 h-4 text-[#E8D1A5]" />
                </button>

                {/* Add to Cart Button */}
                <button
                  type="button"
                  onClick={handleAddToCart}
                  className="w-full bg-[#181818] hover:bg-[#222222] active:bg-[#2A2A2A] text-[#FFFFFF] font-bold text-sm sm:text-base py-3.5 rounded-2xl border-2 border-[#EAB308] shadow-xs transition-colors flex items-center justify-center gap-2 cursor-pointer"
                >
                  <ShoppingBag className="w-4 h-4 text-[#EAB308]" />
                  <span>Add to Cart</span>
                </button>
              </div>

              {/* WhatsApp Enquiry Button */}
              <div className="pt-1">
                <a
                  href={whatsappCustomSizeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full bg-[#25D366]/10 hover:bg-[#25D366]/20 border border-[#25D366]/40 text-[#128C7E] font-bold text-xs py-3 rounded-2xl transition-all flex items-center justify-center gap-2 cursor-pointer shadow-2xs"
                >
                  <MessageCircle className="w-4 h-4 fill-current text-[#25D366]" />
                  <span>Need Custom Sizing or Advice? Inquire on WhatsApp</span>
                </a>
              </div>

              <p className="text-[11px] text-[#D1D5DB] text-center font-medium">
                🔒 100% Secure Checkout • UPI, Credit/Debit Cards &amp; NetBanking
              </p>
            </div>

            {/* 4 Golden Circular Trust Badges */}
            <div className="pt-3 border-t border-[#2D2D2D]">
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-center">
                <div className="p-2.5 rounded-2xl bg-[#181818] border border-[#2D2D2D]/60 flex flex-col items-center space-y-1">
                  <Truck className="w-5 h-5 text-[#EAB308]" />
                  <span className="text-[10px] font-bold text-[#FFFFFF] leading-tight">Express Delivery</span>
                  <span className="text-[9px] text-[#D1D5DB]">Quick Dispatch</span>
                </div>

                <div className="p-2.5 rounded-2xl bg-[#181818] border border-[#2D2D2D]/60 flex flex-col items-center space-y-1">
                  <ShieldCheck className="w-5 h-5 text-[#EAB308]" />
                  <span className="text-[10px] font-bold text-[#FFFFFF] leading-tight">Protective Box</span>
                  <span className="text-[9px] text-[#D1D5DB]">Multi-Layer Safe</span>
                </div>

                <div className="p-2.5 rounded-2xl bg-[#181818] border border-[#2D2D2D]/60 flex flex-col items-center space-y-1">
                  <Sparkles className="w-5 h-5 text-[#EAB308]" />
                  <span className="text-[10px] font-bold text-[#FFFFFF] leading-tight">1:1 Proofing</span>
                  <span className="text-[9px] text-[#D1D5DB]">WhatsApp Approval</span>
                </div>

                <div className="p-2.5 rounded-2xl bg-[#181818] border border-[#2D2D2D]/60 flex flex-col items-center space-y-1">
                  <ThumbsUp className="w-5 h-5 text-[#EAB308]" />
                  <span className="text-[10px] font-bold text-[#FFFFFF] leading-tight">Pure Sanctum</span>
                  <span className="text-[9px] text-[#D1D5DB]">Authentic Craft</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Size Customisation WhatsApp Concierge Card */}
        <div className="rounded-3xl border border-[#2D2D2D] bg-gradient-to-r from-[#181818] via-[#141414] to-[#181818] p-6 sm:p-8 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-2xl bg-gradient-to-br from-[#E8D1A5] to-[#C69A42] flex items-center justify-center text-[#FFFFFF] shrink-0 shadow-sm">
              <Ruler className="w-7 h-7 sm:w-8 sm:h-8 stroke-[2]" />
            </div>
            <div>
              <h3 className="text-lg sm:text-2xl font-serif font-bold text-[#FFFFFF] tracking-tight">
                Need Custom Dimensions Up to 96 x 48 Inches?
              </h3>
              <p className="text-xs sm:text-sm text-[#D1D5DB] font-medium mt-1 max-w-xl leading-relaxed">
                Our master artisans handcraft bespoke acrylic LED wall frames tailored to your home temple sanctum, master suite, or corporate lobby.
              </p>
            </div>
          </div>

          <a
            href={whatsappCustomSizeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="shrink-0 bg-[#25D366] hover:bg-[#1EBE5D] active:bg-[#1DA851] text-white py-3.5 px-7 rounded-2xl font-bold text-sm sm:text-base flex items-center justify-center gap-2.5 shadow-md hover:shadow-lg transition-all"
          >
            <MessageCircle className="w-5 h-5 fill-white" />
            <span>WhatsApp Custom Size Concierge</span>
          </a>
        </div>

        {/* Comprehensive Tabs Section */}
        <div id="product-tabs-section" className="border-t border-[#2D2D2D] pt-10 space-y-8">
          <div className="flex border-b border-[#2D2D2D] gap-3 sm:gap-6 text-xs sm:text-sm font-semibold overflow-x-auto pb-1 scrollbar-thin">
            {[
              { id: 'overview', label: 'Story & Lore' },
              { id: 'craft', label: 'Craft & Materials' },
              { id: 'specs', label: 'Technical Specifications' },
              { id: 'sizeguide', label: 'Size & Placement Guide' },
              { id: 'install', label: '3-Min Installation' },
              { id: 'shipping', label: 'Packaging & Delivery' },
              { id: 'reviews', label: `Collector Reviews (${reviewsList.length})` },
              { id: 'faq', label: 'Frequently Asked Questions' },
            ].map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id as any)}
                className={`pb-3.5 border-b-2 transition-colors whitespace-nowrap cursor-pointer ${
                  activeTab === tab.id
                    ? 'border-[#EAB308] text-[#FFFFFF] font-bold'
                    : 'border-transparent text-[#D1D5DB] hover:text-[#FFFFFF]'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Tab Contents */}
          <div className="py-2">
            {/* TAB 1: OVERVIEW & STORY */}
            {activeTab === 'overview' && (
              <div className="space-y-6 max-w-4xl">
                <div className="p-6 rounded-3xl bg-[#181818] border border-[#2D2D2D] space-y-4 shadow-2xs">
                  <h4 className="font-serif font-bold text-lg sm:text-xl text-[#FFFFFF]">
                    Spiritual Significance &amp; Iconography
                  </h4>
                  <p className="text-xs sm:text-sm text-[#D1D5DB] leading-relaxed">
                    {product.description}
                  </p>
                  <div className="p-4 rounded-2xl bg-[#181818] border border-[#2D2D2D] text-xs text-[#FFFFFF] space-y-1.5">
                    <p className="font-bold flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5 text-[#EAB308]" />
                      <span>Vastu Shastra &amp; Sacred Placement Guidance</span>
                    </p>
                    <p className="text-[#D1D5DB]">
                      Ideal for installation facing East or North-East in pooja mandirs, living rooms, and entrance foyers to invoke auspicious blessings, serenity, and divine grace.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* TAB 2: CRAFT & MATERIALS */}
            {activeTab === 'craft' && (
              <div className="space-y-6 max-w-4xl">
                <div className="p-6 rounded-3xl bg-[#181818] border border-[#2D2D2D] space-y-4 shadow-2xs">
                  <h4 className="font-serif font-bold text-lg sm:text-xl text-[#FFFFFF]">
                    Museum-Grade Acrylic &amp; LED Engineering
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs sm:text-sm text-[#D1D5DB]">
                    <div className="p-4 rounded-2xl bg-[#121212] border border-[#2D2D2D]/70 space-y-1">
                      <h5 className="font-bold text-[#FFFFFF]">1. Virgin Cast Acrylic</h5>
                      <p>Ultra-clear, shatterproof grade cast acrylic with precision beveled edges for supreme light refraction.</p>
                    </div>
                    <div className="p-4 rounded-2xl bg-[#121212] border border-[#2D2D2D]/70 space-y-1">
                      <h5 className="font-bold text-[#FFFFFF]">2. High-Definition UV Direct Printing</h5>
                      <p>6-Color digital flatbed UV curable inks ensure vibrant, long-lasting colors against indoor lighting.</p>
                    </div>
                    <div className="p-4 rounded-2xl bg-[#121212] border border-[#2D2D2D]/70 space-y-1">
                      <h5 className="font-bold text-[#FFFFFF]">3. Warm Golden Ambient LED</h5>
                      <p>Energy-efficient warm SMD LEDs with concealed diffuse light guide layer.</p>
                    </div>
                    <div className="p-4 rounded-2xl bg-[#121212] border border-[#2D2D2D]/70 space-y-1">
                      <h5 className="font-bold text-[#FFFFFF]">4. BIS-Certified 12V Power Adapter</h5>
                      <p>Low voltage safe power supply with 2.5m transparent wire for subtle wall wiring routing.</p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* TAB 3: SPECIFICATIONS */}
            {activeTab === 'specs' && (
              <div className="space-y-6 max-w-4xl">
                <div className="divide-y divide-[#E8D1A5]/40 border border-[#2D2D2D] rounded-3xl bg-[#181818] overflow-hidden text-xs sm:text-sm shadow-2xs">
                  {product.specifications.map((spec, i) => (
                    <div key={i} className="grid grid-cols-3 p-4 hover:bg-[#181818] transition-colors">
                      <span className="font-bold text-[#FFFFFF] col-span-1">{spec.label}</span>
                      <span className="text-[#D1D5DB] col-span-2">{spec.value}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* TAB 4: SIZE & PLACEMENT GUIDE */}
            {activeTab === 'sizeguide' && (
              <div className="space-y-6 max-w-4xl">
                <div className="p-6 rounded-3xl bg-[#181818] border border-[#2D2D2D] space-y-5 shadow-2xs">
                  <h4 className="font-serif font-bold text-lg sm:text-xl text-[#FFFFFF]">
                    Visual Size Comparison &amp; Room Scale
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs text-[#D1D5DB]">
                    <div className="p-4 rounded-2xl bg-[#121212] border border-[#2D2D2D] text-center space-y-2">
                      <div className="h-20 flex items-center justify-center">
                        <div className="w-10 h-14 rounded border-2 border-[#EAB308] bg-[#1A1A1A] flex items-center justify-center text-[10px] font-bold text-[#FFFFFF]">12x18</div>
                      </div>
                      <h5 className="font-bold text-[#FFFFFF]">12 x 18 Inches</h5>
                      <p className="text-[11px]">Compact Mandir altar or entry pillar.</p>
                    </div>
                    <div className="p-4 rounded-2xl bg-[#121212] border border-[#2D2D2D] text-center space-y-2">
                      <div className="h-20 flex items-center justify-center">
                        <div className="w-14 h-20 rounded border-2 border-[#EAB308] bg-[#1A1A1A] flex items-center justify-center text-[10px] font-bold text-[#FFFFFF]">16x24</div>
                      </div>
                      <h5 className="font-bold text-[#FFFFFF]">16 x 24 Inches</h5>
                      <p className="text-[11px]">Medium wall, study, or foyer niche.</p>
                    </div>
                    <div className="p-4 rounded-2xl bg-[#121212] border border-[#2D2D2D] text-center space-y-2">
                      <div className="h-20 flex items-center justify-center">
                        <div className="w-18 h-24 rounded border-2 border-[#EAB308] bg-[#1A1A1A] flex items-center justify-center text-[10px] font-bold text-[#FFFFFF]">24x35</div>
                      </div>
                      <h5 className="font-bold text-[#FFFFFF]">24 x 35 Inches</h5>
                      <p className="text-[11px]">Popular size above 3-seater sofa or bed.</p>
                    </div>
                    <div className="p-4 rounded-2xl bg-[#121212] border border-[#2D2D2D] text-center space-y-2">
                      <div className="h-20 flex items-center justify-center">
                        <div className="w-22 h-28 rounded border-2 border-[#EAB308] bg-[#1A1A1A] flex items-center justify-center text-[10px] font-bold text-[#FFFFFF]">30x47</div>
                      </div>
                      <h5 className="font-bold text-[#FFFFFF]">30 x 47 Inches</h5>
                      <p className="text-[11px]">Grand statement feature wall piece.</p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* TAB 5: 3-MIN INSTALLATION */}
            {activeTab === 'install' && (
              <div className="space-y-6 max-w-4xl">
                <div className="p-6 rounded-3xl bg-[#181818] border border-[#2D2D2D] space-y-5 shadow-2xs">
                  <h4 className="font-serif font-bold text-lg sm:text-xl text-[#FFFFFF]">
                    Hassle-Free 3-Minute Wall Mounting
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs sm:text-sm text-[#D1D5DB]">
                    <div className="p-4 rounded-2xl bg-[#121212] border border-[#2D2D2D] space-y-2">
                      <span className="w-6 h-6 rounded-full bg-[#EAB308] text-[#000000] font-bold flex items-center justify-center text-xs">1</span>
                      <h5 className="font-bold text-[#FFFFFF]">Mark &amp; Drill</h5>
                      <p>Use the provided mounting card to mark hole positions. Insert the included wall plugs.</p>
                    </div>
                    <div className="p-4 rounded-2xl bg-[#121212] border border-[#2D2D2D] space-y-2">
                      <span className="w-6 h-6 rounded-full bg-[#EAB308] text-[#000000] font-bold flex items-center justify-center text-xs">2</span>
                      <h5 className="font-bold text-[#FFFFFF]">Fix Wall Bracket</h5>
                      <p>Tighten the concealed French cleat or stainless steel studs using the supplied screws.</p>
                    </div>
                    <div className="p-4 rounded-2xl bg-[#121212] border border-[#2D2D2D] space-y-2">
                      <span className="w-6 h-6 rounded-full bg-[#EAB308] text-[#000000] font-bold flex items-center justify-center text-xs">3</span>
                      <h5 className="font-bold text-[#FFFFFF]">Hang &amp; Plug In</h5>
                      <p>Slide the frame onto the bracket and plug the 12V adapter into your nearest wall socket.</p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* TAB 6: SHIPPING & GUARANTEE */}
            {activeTab === 'shipping' && (
              <div className="space-y-6 max-w-3xl">
                <div className="p-6 rounded-3xl bg-[#181818] border border-[#2D2D2D] space-y-4 shadow-2xs text-xs sm:text-sm text-[#D1D5DB]">
                  <h4 className="font-serif font-bold text-lg sm:text-xl text-[#FFFFFF]">
                    Multi-Layer Protective Packaging
                  </h4>
                  <ul className="space-y-2.5 list-disc list-inside">
                    {product.shippingHighlights.map((item, i) => (
                      <li key={i}>{item}</li>
                    ))}
                    <li>Reinforced with 5-layer honeycomb wooden outer crate and thick air-bubble foam wrap.</li>
                    <li>All orders are carefully inspected and protected with reinforced corner guards prior to dispatch.</li>
                  </ul>
                </div>
              </div>
            )}

            {/* TAB 7: REVIEWS */}
            {activeTab === 'reviews' && (
              <div className="space-y-8 max-w-3xl">
                <div className="flex items-center justify-between bg-[#181818] p-6 rounded-3xl border border-[#2D2D2D] shadow-2xs">
                  <div>
                    <h4 className="font-serif font-bold text-lg text-[#FFFFFF]">Collector Feedback &amp; Stories</h4>
                    <p className="text-xs text-[#D1D5DB] mt-0.5">
                      {reviewsList.length > 0
                        ? `${reviewsList.length} verified customer stories from homes across India`
                        : 'No reviews yet for this artwork. Be the first to share your reflections!'}
                    </p>
                  </div>
                  <div className="text-right">
                    <span className="font-serif text-3xl font-bold text-[#FFFFFF]">
                      {reviewsList.length > 0 ? (product.rating || 5).toFixed(1) : '0.0'}
                    </span>
                    <span className="text-xs text-[#D1D5DB] block">
                      {reviewsList.length > 0 ? 'Out of 5.0 Stars' : '0 Reviews'}
                    </span>
                  </div>
                </div>

                {/* Review Submission Form */}
                <form onSubmit={handleReviewSubmit} className="bg-[#181818] p-6 rounded-3xl border border-[#2D2D2D] space-y-4 shadow-2xs">
                  <h4 className="font-serif font-bold text-base text-[#FFFFFF]">Leave a Collector Review</h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                    <div>
                      <label className="text-xs font-semibold text-[#D1D5DB] block mb-1">Your Full Name</label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Ramesh Kumar"
                        value={reviewName}
                        onChange={(e) => setReviewName(e.target.value)}
                        className="w-full px-3.5 py-2 text-xs bg-[#121212] border border-[#2D2D2D] rounded-xl outline-none focus:border-[#EAB308]"
                      />
                    </div>
                    <div>
                      <label className="text-xs font-semibold text-[#D1D5DB] block mb-1">Your City</label>
                      <input
                        type="text"
                        placeholder="e.g. Hyderabad"
                        value={reviewCity}
                        onChange={(e) => setReviewCity(e.target.value)}
                        className="w-full px-3.5 py-2 text-xs bg-[#121212] border border-[#2D2D2D] rounded-xl outline-none focus:border-[#EAB308]"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-xs font-semibold text-[#D1D5DB] block mb-1">Your Experience &amp; Feedback</label>
                    <textarea
                      rows={3}
                      required
                      placeholder="Share how this sacred artwork radiates in your home and how it was packaged..."
                      value={reviewComment}
                      onChange={(e) => setReviewComment(e.target.value)}
                      className="w-full px-3.5 py-2 text-xs bg-[#121212] border border-[#2D2D2D] rounded-xl outline-none focus:border-[#EAB308]"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={submittingReview}
                    className="bg-[#EAB308] hover:bg-[#FACC15] disabled:opacity-50 text-[#000000] text-xs font-bold px-6 py-3 rounded-xl shadow-xs transition-colors cursor-pointer"
                  >
                    {submittingReview ? 'Submitting...' : 'Post Customer Review'}
                  </button>
                  {reviewSuccess && (
                    <p className="text-xs text-emerald-800 font-medium">
                      ✓ Thank you! Your review has been recorded.
                    </p>
                  )}
                </form>

                {/* Reviews List / Empty State */}
                {reviewsList.length === 0 ? (
                  <div className="p-8 rounded-2xl border border-dashed border-[#2D2D2D] bg-[#121212]/40 text-center space-y-2">
                    <p className="text-sm font-semibold text-[#FFFFFF]">No customer reviews yet</p>
                    <p className="text-xs text-[#D1D5DB]">
                      Have you ordered or received this artwork? Be the first to share your experience using the form above!
                    </p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {reviewsList.map((rev) => (
                      <div key={rev.id} className="p-5 rounded-2xl border border-[#2D2D2D] bg-[#181818] space-y-2 shadow-2xs">
                        <div className="flex items-center justify-between text-xs">
                          <div className="flex items-center gap-2">
                            <span className="font-bold text-[#FFFFFF]">{rev.authorName}</span>
                            <span className="text-[#D1D5DB]">• {rev.city}</span>
                            {rev.verifiedBuyer && (
                              <span className="text-[10px] bg-emerald-50 text-emerald-800 font-bold px-2 py-0.5 rounded-full border border-emerald-200">
                                Verified Purchase
                              </span>
                            )}
                          </div>
                          <span className="text-[#D1D5DB]">{rev.createdAt}</span>
                        </div>

                        <div className="flex items-center gap-1.5 text-[11px] font-semibold text-[#EAB308]">
                          <Sparkles className="w-3 h-3 text-[#EAB308]" />
                          <span>Verified Collector</span>
                        </div>

                        <h5 className="font-bold text-xs text-[#FFFFFF]">{rev.title}</h5>
                        <p className="text-xs text-[#D1D5DB] leading-relaxed">{rev.comment}</p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* TAB 8: FAQ */}
            {activeTab === 'faq' && (
              <div className="space-y-4 max-w-3xl">
                {[
                  {
                    q: 'How does the LED lighting work and what is the power consumption?',
                    a: 'The LED backlighting uses high-efficiency warm golden Epistar SMD chips that consume only 12W to 18W of power (similar to an energy-saving bulb). It operates with a BIS-certified 12V 2A adapter plugged into any standard home outlet.',
                  },
                  {
                    q: 'Is the acrylic fragile or breakable during everyday cleaning?',
                    a: 'No. We use premium acrylic that is shatterproof and 17x stronger than traditional glass. Simply wipe with a soft micro-fiber cloth to remove dust.',
                  },
                  {
                    q: 'Can this frame be safely installed in a pooja room where incense/diyas are lit?',
                    a: 'Yes. The direct Swiss UV cure print is moisture-proof and heat-resilient. However, keep direct fire or oil spills at a safe distance (minimum 12 inches) to prevent soot buildup.',
                  },
                  {
                    q: 'What is included in the package for installation?',
                    a: 'Everything needed is inside the wooden crate: your custom-sized acrylic frame, BIS-certified 12V power adapter with 2.5m wire, concealed French cleat bracket or stainless steel wall studs, wall plugs, screws, and a marking template.',
                  },
                ].map((item, idx) => (
                  <div key={idx} className="p-5 rounded-2xl bg-[#181818] border border-[#2D2D2D] space-y-2 shadow-2xs">
                    <h5 className="font-bold text-xs sm:text-sm text-[#FFFFFF] flex items-center gap-2">
                      <HelpCircle className="w-4 h-4 text-[#EAB308] shrink-0" />
                      <span>{item.q}</span>
                    </h5>
                    <p className="text-xs text-[#D1D5DB] leading-relaxed pl-6">{item.a}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Luxury Related Products Section ("Complete Your Divine Space") */}
        {relatedProducts.length > 0 && (
          <div className="border-t border-[#2D2D2D] pt-12 space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-[#EAB308]">Curated Pairings</span>
                <h3 className="font-serif font-bold text-2xl sm:text-3xl text-[#FFFFFF]">
                  Complete Your Divine Space
                </h3>
              </div>
              <Link href="/shop" className="text-xs font-bold text-[#FFFFFF] hover:text-[#EAB308] hover:underline flex items-center gap-1 transition-colors">
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
        className={`fixed bottom-0 left-0 right-0 z-40 bg-[#181818]/95 backdrop-blur-md border-t border-[#2D2D2D] shadow-[0_-8px_25px_rgba(0,0,0,0.5)] py-3 px-4 sm:px-8 transition-transform duration-300 ${
          showStickyBar ? 'translate-y-0' : 'translate-y-full'
        }`}
        style={{ paddingBottom: 'max(0.75rem, env(safe-area-inset-bottom, 0px))' }}
      >
        <div className="max-w-[1720px] mx-auto flex items-center justify-between gap-4">
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-12 h-12 rounded-xl overflow-hidden border border-[#2D2D2D] shrink-0 bg-[#1A1A1A]">
              <img src={activeImage} alt="" className="w-full h-full object-cover" />
            </div>
            <div className="min-w-0 hidden sm:block">
              <h4 className="font-serif font-bold text-xs sm:text-sm text-[#FFFFFF] truncate max-w-md">
                {product.title}
              </h4>
              <p className="text-[11px] text-[#D1D5DB] truncate">
                {selectedShape.toUpperCase()} • {currentSizeObj?.label || '12x18'}&quot; • {selectedFrame === 'gold' ? 'Gold Frame' : selectedFrame === 'black' ? 'Black Frame' : 'Frameless Acrylic'}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <div className="text-right">
              <span className="font-serif font-bold text-base sm:text-xl text-[#FFFFFF] block leading-tight">
                ₹{currentPricing.price.toLocaleString('en-IN')}
              </span>
              {currentPricing.mrp > currentPricing.price && (
                <span className="text-[10px] text-[#D1D5DB] line-through block">
                  ₹{currentPricing.mrp.toLocaleString('en-IN')}
                </span>
              )}
            </div>

            <button
              type="button"
              onClick={handleAddToCart}
              className="hidden sm:flex items-center gap-1.5 px-4 py-2.5 rounded-xl border-2 border-[#EAB308] bg-[#181818] text-[#FFFFFF] font-bold text-xs hover:bg-[#222222] transition-colors cursor-pointer"
            >
              <ShoppingBag className="w-3.5 h-3.5 text-[#EAB308]" />
              <span>Add to Cart</span>
            </button>

            <button
              type="button"
              onClick={handleBuyNow}
              className="flex items-center justify-center gap-1.5 px-5 py-2.5 min-h-[44px] rounded-xl bg-[#EAB308] hover:bg-[#FACC15] text-[#000000] font-bold text-xs sm:text-sm shadow-md transition-colors cursor-pointer"
            >
              <span>Buy Now</span>
              <ArrowRight className="w-3.5 h-3.5 text-[#E8D1A5]" />
            </button>
          </div>
        </div>
      </div>

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
