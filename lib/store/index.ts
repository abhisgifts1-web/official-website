import fs from 'fs';
import path from 'path';
import {
  Product,
  Category,
  Order,
  Coupon,
  SiteSettings,
  ContactEnquiry,
  ProductReview,
  OrderStatus,
} from '@/types';
import { INITIAL_PRODUCTS } from '../data/mockProducts';
import { INITIAL_CATEGORIES, CATEGORY_SLUG_ALIASES } from '../data/categories';
import { filterProductsByCategory } from '../categoryRules';
import { INITIAL_ORDERS } from '../data/mockOrders';
import { INITIAL_COUPONS } from '../data/coupons';
import { INITIAL_SETTINGS } from '../data/settings';

const PERSISTENCE_FILE = path.join(process.cwd(), 'lib', 'data', 'persistedProducts.json');
const PERSISTENCE_COUPONS_FILE = path.join(process.cwd(), 'lib', 'data', 'persistedCoupons.json');

function loadPersistedProducts(): Product[] {
  try {
    if (fs.existsSync(PERSISTENCE_FILE)) {
      const raw = fs.readFileSync(PERSISTENCE_FILE, 'utf8');
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed) && parsed.length > 0) {
        return parsed;
      }
    }
  } catch (err) {
    console.warn('Error reading persistedProducts.json:', err);
  }
  return JSON.parse(JSON.stringify(INITIAL_PRODUCTS));
}

function savePersistedProducts(products: Product[]) {
  try {
    fs.writeFileSync(PERSISTENCE_FILE, JSON.stringify(products, null, 2), 'utf8');
  } catch (err) {
    console.warn('Error saving persistedProducts.json:', err);
  }
}

function loadPersistedCoupons(): Coupon[] {
  try {
    if (fs.existsSync(PERSISTENCE_COUPONS_FILE)) {
      const raw = fs.readFileSync(PERSISTENCE_COUPONS_FILE, 'utf8');
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed) && parsed.length > 0) {
        return parsed;
      }
    }
  } catch (err) {
    console.warn('Error reading persistedCoupons.json:', err);
  }
  return JSON.parse(JSON.stringify(INITIAL_COUPONS));
}

function savePersistedCoupons(coupons: Coupon[]) {
  try {
    fs.writeFileSync(PERSISTENCE_COUPONS_FILE, JSON.stringify(coupons, null, 2), 'utf8');
  } catch (err) {
    console.warn('Error saving persistedCoupons.json:', err);
  }
}

// Global singleton cache in memory across fast refresh in dev
interface GlobalDataStore {
  products: Product[];
  categories: Category[];
  orders: Order[];
  coupons: Coupon[];
  settings: SiteSettings;
  enquiries: ContactEnquiry[];
}

declare global {
  // eslint-disable-next-line no-var
  var __abhiGiftsStore: GlobalDataStore | undefined;
}

if (!global.__abhiGiftsStore) {
  global.__abhiGiftsStore = {
    products: JSON.parse(JSON.stringify(INITIAL_PRODUCTS)),
    categories: JSON.parse(JSON.stringify(INITIAL_CATEGORIES)),
    orders: JSON.parse(JSON.stringify(INITIAL_ORDERS)),
    coupons: loadPersistedCoupons(),
    settings: JSON.parse(JSON.stringify(INITIAL_SETTINGS)),
    enquiries: [
      {
        id: 'enq-1',
        name: 'Karthik Raja',
        email: 'karthik.r@example.com',
        phone: '9841122334',
        subject: 'Custom Mandir Wall Art Measurement',
        message: 'Can you create an Adiyogi LED frame in 5x3 feet customized size for our meditation hall?',
        status: 'new',
        createdAt: '2026-10-25T15:30:00.000Z',
      },
    ],
  };
} else {
  // Always keep products and categories synchronized with current initial catalog data
  global.__abhiGiftsStore.products = JSON.parse(JSON.stringify(INITIAL_PRODUCTS));
  global.__abhiGiftsStore.categories = JSON.parse(JSON.stringify(INITIAL_CATEGORIES));
}

const store = global.__abhiGiftsStore;

// PRODUCT METHODS
export interface ProductFilterOptions {
  category?: string;
  search?: string;
  orientation?: string;
  shape?: string;
  lighting?: string;
  finish?: string;
  minPrice?: number;
  maxPrice?: number;
  inStockOnly?: boolean;
  sortBy?: 'newest' | 'price-asc' | 'price-desc' | 'rating' | 'bestseller';
  featured?: boolean;
  bestseller?: boolean;
  newArrival?: boolean;
}

export function getAllProducts(filterOptions?: ProductFilterOptions): Product[] {
  let list = [...store.products];

  if (filterOptions) {
    const {
      category,
      search,
      orientation,
      shape,
      lighting,
      minPrice,
      maxPrice,
      inStockOnly,
      sortBy,
      featured,
      bestseller,
      newArrival,
    } = filterOptions;

    if (category) {
      list = filterProductsByCategory(list, category);
    }

    if (search && search.trim()) {
      const q = search.trim().toLowerCase();
      list = list.filter(
        (p) =>
          p.title.toLowerCase().includes(q) ||
          p.shortDescription.toLowerCase().includes(q) ||
          p.tags.some((t) => t.toLowerCase().includes(q)) ||
          (p.deity && p.deity.toLowerCase().includes(q))
      );
    }

    if (orientation) {
      list = list.filter((p) => p.orientation === orientation);
    }

    if (shape && shape !== 'all') {
      const s = shape.toLowerCase();
      if (s === 'portrait' || s === 'vertical') {
        list = list.filter((p) => p.shape === 'portrait' || p.orientation === 'vertical');
      } else if (s === 'landscape' || s === 'horizontal') {
        list = list.filter((p) => p.shape === 'landscape' || p.orientation === 'horizontal');
      } else if (s === 'square') {
        list = list.filter((p) => p.shape === 'square' || p.orientation === 'square');
      } else if (s === 'round') {
        list = list.filter((p) => p.tags.some((t) => t.toLowerCase().includes('round')));
      } else if (s === 'set-of-2') {
        list = list.filter((p) => p.shape === 'set-of-2' || p.tags.some((t) => t.toLowerCase().includes('set of 2') || t.toLowerCase().includes('diptych')));
      } else if (s === 'set-of-3') {
        list = list.filter((p) => p.shape === 'set-of-3' || p.tags.some((t) => t.toLowerCase().includes('set of 3') || t.toLowerCase().includes('triptych')));
      } else {
        list = list.filter((p) => p.shape === s || p.orientation === s);
      }
    }

    if (lighting) {
      if (lighting === 'led') {
        list = list.filter((p) => p.hasLedBacklight);
      } else if (lighting === 'none') {
        list = list.filter((p) => !p.hasLedBacklight);
      }
    }

    if (inStockOnly) {
      list = list.filter((p) => p.variants.some((v) => v.inStock && v.stockCount > 0));
    }

    if (typeof minPrice === 'number') {
      list = list.filter((p) => p.basePrice >= minPrice);
    }

    if (typeof maxPrice === 'number') {
      list = list.filter((p) => p.basePrice <= maxPrice);
    }

    if (featured) {
      list = list.filter((p) => p.isFeatured);
    }

    if (bestseller) {
      list = list.filter((p) => p.isBestseller);
    }

    if (newArrival) {
      list = list.filter((p) => p.isNewArrival);
    }

    if (sortBy) {
      switch (sortBy) {
        case 'price-asc':
          list.sort((a, b) => a.basePrice - b.basePrice);
          break;
        case 'price-desc':
          list.sort((a, b) => b.basePrice - a.basePrice);
          break;
        case 'rating':
          list.sort((a, b) => b.rating - a.rating);
          break;
        case 'bestseller':
          list.sort((a, b) => (b.isBestseller ? 1 : 0) - (a.isBestseller ? 1 : 0));
          break;
        case 'newest':
        default:
          list.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
          break;
      }
    }
  }

  return list;
}

export function getProductBySlug(slug: string): Product | null {
  const product = store.products.find((p) => p.slug === slug);
  return product || null;
}

export function createProduct(productData: Omit<Product, 'id' | 'createdAt'>): Product {
  const newProduct: Product = {
    ...productData,
    id: `prod-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
    createdAt: new Date().toISOString(),
  };
  store.products.unshift(newProduct);
  savePersistedProducts(store.products);
  return newProduct;
}

export function updateProduct(id: string, updates: Partial<Product>): Product | null {
  const index = store.products.findIndex((p) => p.id === id || p.slug === id || (updates.slug && p.slug === updates.slug));
  if (index === -1) return null;
  store.products[index] = { ...store.products[index], ...updates };
  savePersistedProducts(store.products);
  return store.products[index];
}

export function deleteProduct(id: string): boolean {
  const initialLen = store.products.length;
  store.products = store.products.filter((p) => p.id !== id && p.slug !== id);
  if (store.products.length < initialLen) {
    savePersistedProducts(store.products);
    return true;
  }
  return false;
}

export function addProductReview(productSlug: string, review: Omit<ProductReview, 'id' | 'createdAt'>): ProductReview | null {
  const product = store.products.find((p) => p.slug === productSlug);
  if (!product) return null;

  const newReview: ProductReview = {
    ...review,
    id: `rev-${Date.now()}`,
    createdAt: new Date().toISOString().split('T')[0],
  };

  product.reviews = [newReview, ...product.reviews];
  // Recompute average rating
  const total = product.reviews.reduce((sum, r) => sum + r.rating, 0);
  product.rating = Number((total / product.reviews.length).toFixed(1));
  product.reviewCount = product.reviews.length;

  return newReview;
}

// CATEGORY METHODS
export function getAllCategories(): Category[] {
  return [...store.categories];
}

export function getCategoryBySlug(slug: string): Category | null {
  const direct = store.categories.find((c) => c.slug === slug);
  if (direct) return direct;
  const alias = CATEGORY_SLUG_ALIASES[slug];
  if (alias) {
    return store.categories.find((c) => c.slug === alias) || null;
  }
  return null;
}

export function createCategory(cat: Omit<Category, 'id'>): Category {
  const newCat: Category = {
    ...cat,
    id: `cat-${Date.now()}`,
    itemCount: 0,
  };
  store.categories.push(newCat);
  return newCat;
}

// ORDER METHODS
export function getAllOrders(filterStatus?: string, search?: string): Order[] {
  let list = [...store.orders];

  if (filterStatus && filterStatus !== 'All') {
    list = list.filter((o) => o.orderStatus === filterStatus);
  }

  if (search && search.trim()) {
    const q = search.trim().toLowerCase();
    list = list.filter(
      (o) =>
        o.id.toLowerCase().includes(q) ||
        o.customer.fullName.toLowerCase().includes(q) ||
        o.customer.mobile.includes(q) ||
        o.customer.email.toLowerCase().includes(q)
    );
  }

  return list.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
}

export function getOrderById(id: string): Order | null {
  return store.orders.find((o) => o.id === id) || null;
}

export function createOrder(data: Omit<Order, 'id' | 'createdAt' | 'updatedAt'>): Order {
  const orderId = `AG-${new Date().getFullYear()}-${Math.floor(10000 + Math.random() * 90000)}`;
  const now = new Date().toISOString();

  const newOrder: Order = {
    ...data,
    id: orderId,
    createdAt: now,
    updatedAt: now,
  };

  store.orders.unshift(newOrder);

  // Decrement variant stock counts safely
  newOrder.items.forEach((item) => {
    const product = store.products.find((p) => p.id === item.productId);
    if (product) {
      const variant = product.variants.find((v) => v.id === item.variantId);
      if (variant) {
        variant.stockCount = Math.max(0, variant.stockCount - item.quantity);
        if (variant.stockCount === 0) {
          variant.inStock = false;
        }
      }
    }
  });

  return newOrder;
}

export function updateOrderStatus(
  orderId: string,
  orderStatus: OrderStatus,
  trackingNumber?: string,
  courierPartner?: string
): Order | null {
  const order = store.orders.find((o) => o.id === orderId);
  if (!order) return null;

  order.orderStatus = orderStatus;
  if (trackingNumber) order.trackingNumber = trackingNumber;
  if (courierPartner) order.courierPartner = courierPartner;
  order.updatedAt = new Date().toISOString();

  return order;
}

// COUPON METHODS
export function getAllCoupons(): Coupon[] {
  return [...store.coupons];
}

export function validateCoupon(code: string, subtotal: number): { valid: boolean; discountAmount: number; coupon?: Coupon; message?: string } {
  const cleanCode = code.trim().toUpperCase();
  const coupon = store.coupons.find((c) => c.code.toUpperCase() === cleanCode);

  if (!coupon) {
    return { valid: false, discountAmount: 0, message: 'Invalid coupon code.' };
  }

  if (!coupon.active) {
    return { valid: false, discountAmount: 0, message: 'This coupon is no longer active.' };
  }

  if (coupon.validFrom && new Date(coupon.validFrom).getTime() > Date.now()) {
    return { valid: false, discountAmount: 0, message: `This coupon is valid starting from ${coupon.validFrom}.` };
  }

  if (new Date(coupon.expiresAt).getTime() < Date.now()) {
    return { valid: false, discountAmount: 0, message: 'This coupon has expired.' };
  }

  if (subtotal < coupon.minOrderValue) {
    return {
      valid: false,
      discountAmount: 0,
      message: `Minimum order value of ₹${coupon.minOrderValue.toLocaleString('en-IN')} required for this coupon.`,
    };
  }

  let discount = 0;
  if (coupon.discountType === 'percentage') {
    discount = (subtotal * coupon.discountValue) / 100;
    if (coupon.maxDiscount && discount > coupon.maxDiscount) {
      discount = coupon.maxDiscount;
    }
  } else {
    discount = coupon.discountValue;
  }

  return {
    valid: true,
    discountAmount: Math.min(discount, subtotal),
    coupon,
    message: `Coupon "${coupon.code}" applied successfully! You saved ₹${discount.toLocaleString('en-IN')}.`,
  };
}

export function createCoupon(coupon: Coupon): Coupon {
  const cleanCode = coupon.code.trim().toUpperCase();
  const normalized: Coupon = { ...coupon, code: cleanCode };
  const existingIdx = store.coupons.findIndex((c) => c.code.toUpperCase() === cleanCode);
  if (existingIdx !== -1) {
    store.coupons[existingIdx] = normalized;
  } else {
    store.coupons.unshift(normalized);
  }
  savePersistedCoupons(store.coupons);
  return normalized;
}

export function deleteCoupon(code: string): boolean {
  const cleanCode = code.trim().toUpperCase();
  const initialLen = store.coupons.length;
  store.coupons = store.coupons.filter((c) => c.code.toUpperCase() !== cleanCode);
  if (store.coupons.length !== initialLen) {
    savePersistedCoupons(store.coupons);
    return true;
  }
  return false;
}

// SETTINGS METHODS
export function getSiteSettings(): SiteSettings {
  return { ...store.settings };
}

export function updateSiteSettings(updates: Partial<SiteSettings>): SiteSettings {
  store.settings = { ...store.settings, ...updates };
  return { ...store.settings };
}

// ENQUIRIES
export function getAllEnquiries(): ContactEnquiry[] {
  return [...store.enquiries];
}

export function createEnquiry(data: Omit<ContactEnquiry, 'id' | 'status' | 'createdAt'>): ContactEnquiry {
  const newEnq: ContactEnquiry = {
    ...data,
    id: `enq-${Date.now()}`,
    status: 'new',
    createdAt: new Date().toISOString(),
  };
  store.enquiries.unshift(newEnq);
  return newEnq;
}

// DASHBOARD STATS
export function getDashboardStats() {
  const orders = store.orders;
  const totalRevenue = orders
    .filter((o) => o.paymentStatus === 'Paid' || o.orderStatus === 'Delivered')
    .reduce((sum, o) => sum + o.totalAmount, 0);

  const totalOrders = orders.length;
  const pendingOrders = orders.filter(
    (o) => o.orderStatus === 'Pending' || o.orderStatus === 'Confirmed' || o.orderStatus === 'Framing & Production'
  ).length;
  const deliveredOrders = orders.filter((o) => o.orderStatus === 'Delivered').length;

  // Low stock products count
  let lowStockCount = 0;
  store.products.forEach((p) => {
    const hasLowVariant = p.variants.some((v) => v.stockCount <= 5);
    if (hasLowVariant) lowStockCount++;
  });

  return {
    totalRevenue,
    totalOrders,
    pendingOrders,
    deliveredOrders,
    lowStockCount,
    totalProducts: store.products.length,
    recentOrders: orders.slice(0, 5),
  };
}
