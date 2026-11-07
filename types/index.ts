export type ProductOrientation = 'vertical' | 'horizontal' | 'square';
export type OrientationShape = 'portrait' | 'landscape' | 'square';

export interface OrientationVariantsMap {
  portrait: ProductVariant[];
  landscape: ProductVariant[];
  square: ProductVariant[];
  round: ProductVariant[];
}
export type ArtworkFinish = 'Acrylic Ultra-Gloss' | 'Floating Framed Canvas' | 'Matte Fine Wood' | 'Brushed Gold Aluminum';
export type LightingType = 'LED Backlit (12V Adapter)' | 'RGB Multi-Color Remote' | 'No Lighting (Pure Art)';

export interface ProductVariant {
  id: string;
  size: string; // e.g. "12x18 inches", "18x24 inches", "24x36 inches", "30x48 inches"
  dimensionsCm: string; // e.g. "30 x 45 cm"
  finish: ArtworkFinish;
  lighting: LightingType;
  price: number; // e.g. 2499
  mrp: number; // e.g. 4999 (original price)
  sku: string;
  inStock: boolean;
  stockCount: number;
}

export interface ProductSpecification {
  label: string;
  value: string;
}

export interface ProductReview {
  id: string;
  authorName: string;
  city: string;
  rating: number; // 1 to 5
  title: string;
  comment: string;
  createdAt: string;
  verifiedBuyer: boolean;
  productImagePreview?: string;
  likes?: number;
}

export interface Product {
  id: string;
  slug: string;
  title: string;
  subtitle?: string;
  shortDescription: string;
  description: string;
  categorySlug: string;
  categoryName: string;
  categorySlugs?: string[]; // Multiple categories assignment support
  deity?: string; // For devotional art: "Lord Venkateswara", "Lord Shiva", "Lord Ganesha", etc.
  artStyle: string; // "Devotional Acrylic", "LED Backlit", "Modern Abstract", "Personalised Frame", etc.
  orientation: ProductOrientation;
  shape?: 'portrait' | 'landscape' | 'square' | 'round' | 'set-of-2' | 'set-of-3';
  images: string[]; // Primary, secondary, wall mockups, angle views
  tags: string[];
  couponCode?: string; // Specific coupon code assigned to this product
  isFeatured?: boolean;
  isBestseller?: boolean;
  isNewArrival?: boolean;
  hasLedBacklight: boolean;
  basePrice: number;
  baseMrp: number;
  discountPercentage: number;
  rating: number;
  reviewCount: number;
  variants: ProductVariant[];
  orientationVariants?: Partial<OrientationVariantsMap>;
  specifications: ProductSpecification[];
  materialAndCare: string[];
  shippingHighlights: string[];
  reviews: ProductReview[];
  createdAt: string;
}

export type CategoryGroup = 'god-wall-art' | 'led-backlight' | 'custom-frames' | 'abstract-wall-art';

export interface Category {
  id: string;
  name: string;
  slug: string;
  description: string;
  image: string;
  parentType: 'devotional' | 'wall-art-styles' | 'custom-frames';
  group?: CategoryGroup;
  lightingType?: 'backlight' | 'normal';
  itemCount?: number;
  featured?: boolean;
  metaTitle?: string;
  metaDescription?: string;
  buttonText?: string;
}

export interface CartCustomization {
  previewUrl: string;
  customText?: string;
  frameType?: string;
  orientation?: ProductOrientation;
  aspectRatio?: string;
  specialInstructions?: string;
}

export interface CartItem {
  id: string; // unique item id in cart
  productId: string;
  slug: string;
  title: string;
  image: string;
  variantId: string;
  size: string;
  finish: string;
  lighting: string;
  shape?: 'portrait' | 'landscape' | 'square' | 'round';
  unitPrice: number;
  unitMrp: number;
  quantity: number;
  customization?: CartCustomization;
}

export interface CouponUsageRecord {
  customer: string; // mobile number or email
  orderId: string;
  date: string;
  discountAmount: number;
}

export interface Coupon {
  id?: string;
  code: string;
  discountType: 'percentage' | 'fixed';
  discountValue: number;
  minOrderValue: number;
  maxDiscount?: number;
  description: string;
  startDate?: string;
  validFrom?: string; // backwards compatibility alias
  expiryDate?: string;
  expiresAt: string;  // backwards compatibility
  usageLimit?: number; // 0 or undefined = unlimited
  usageCount?: number;
  perCustomerLimit?: number; // default 1
  applicableProducts?: string[]; // empty or ['all'] = all products, else product slugs/ids
  usedBy?: CouponUsageRecord[];
  totalDiscountGiven?: number;
  active: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export interface ShippingAddress {
  fullName: string;
  mobile: string;
  email: string;
  streetAddress: string;
  apartment?: string;
  landmark?: string;
  city: string;
  state: string;
  pincode: string;
}

export type OrderStatus =
  | 'Pending'
  | 'Confirmed'
  | 'Framing & Production'
  | 'Quality Checked'
  | 'Shipped'
  | 'Out for Delivery'
  | 'Delivered'
  | 'Cancelled';

export type PaymentMethod = 'WhatsApp' | 'Online' | 'Razorpay';
export type PaymentStatus = 'Pending' | 'Paid' | 'Failed' | 'Refunded';

export interface Order {
  id: string; // e.g. AG-2026-89412
  customer: ShippingAddress;
  items: CartItem[];
  subtotal: number;
  discountAmount: number;
  couponCode?: string;
  shippingFee: number;
  totalAmount: number;
  paymentMethod: PaymentMethod;
  paymentStatus: PaymentStatus;
  razorpayPaymentId?: string;
  razorpayOrderId?: string;
  orderStatus: OrderStatus;
  trackingNumber?: string;
  courierPartner?: string;
  notes?: string;
  createdAt: string;
  updatedAt: string;
}

export interface AdminUser {
  id: string;
  email: string;
  name: string;
  role: 'superadmin' | 'admin' | 'manager';
  avatar?: string;
}

export interface SiteSettings {
  storeName: string;
  tagline: string;
  supportPhone: string;
  supportEmail: string;
  whatsappNumber: string;
  announcementText: string;
  freeShippingThreshold: number;
  defaultShippingFee: number;
  codAvailable: boolean;
  codFee: number;
  businessAddress: string;
  gstNumber?: string;
  instagramUrl?: string;
  youtubeUrl?: string;
}

export interface ContactEnquiry {
  id: string;
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  status: 'new' | 'in-progress' | 'resolved';
  createdAt: string;
}
