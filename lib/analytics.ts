/**
 * Client-Side E-Commerce Analytics Helper for Abhi's Gifts
 * Safe wrappers for Google Analytics 4 (gtag) and Meta Pixel (fbq).
 */

declare global {
  interface Window {
    gtag?: (...args: any[]) => void;
    fbq?: (...args: any[]) => void;
    dataLayer?: any[];
  }
}

export interface AnalyticsItem {
  id: string;
  name: string;
  category?: string;
  price: number;
  quantity?: number;
  size?: string;
}

/**
 * Track Product Detail Page View
 */
export function trackViewItem(item: AnalyticsItem) {
  if (typeof window === 'undefined') return;

  // Google Analytics 4
  if (typeof window.gtag === 'function') {
    window.gtag('event', 'view_item', {
      currency: 'INR',
      value: item.price,
      items: [
        {
          item_id: item.id,
          item_name: item.name,
          item_category: item.category || 'Acrylic Frames',
          price: item.price,
          quantity: item.quantity || 1,
        },
      ],
    });
  }

  // Meta Pixel
  if (typeof window.fbq === 'function') {
    window.fbq('track', 'ViewContent', {
      content_name: item.name,
      content_ids: [item.id],
      content_type: 'product',
      value: item.price,
      currency: 'INR',
    });
  }
}

/**
 * Track Add To Cart
 */
export function trackAddToCart(item: AnalyticsItem) {
  if (typeof window === 'undefined') return;

  if (typeof window.gtag === 'function') {
    window.gtag('event', 'add_to_cart', {
      currency: 'INR',
      value: item.price * (item.quantity || 1),
      items: [
        {
          item_id: item.id,
          item_name: item.name,
          item_category: item.category || 'Acrylic Frames',
          price: item.price,
          quantity: item.quantity || 1,
        },
      ],
    });
  }

  if (typeof window.fbq === 'function') {
    window.fbq('track', 'AddToCart', {
      content_name: item.name,
      content_ids: [item.id],
      content_type: 'product',
      value: item.price * (item.quantity || 1),
      currency: 'INR',
    });
  }
}

/**
 * Track Begin Checkout
 */
export function trackBeginCheckout(items: AnalyticsItem[], totalValue: number) {
  if (typeof window === 'undefined') return;

  if (typeof window.gtag === 'function') {
    window.gtag('event', 'begin_checkout', {
      currency: 'INR',
      value: totalValue,
      items: items.map((i) => ({
        item_id: i.id,
        item_name: i.name,
        price: i.price,
        quantity: i.quantity || 1,
      })),
    });
  }

  if (typeof window.fbq === 'function') {
    window.fbq('track', 'InitiateCheckout', {
      value: totalValue,
      currency: 'INR',
      num_items: items.length,
    });
  }
}

/**
 * Track Completed Purchase
 */
export function trackPurchase(orderId: string, totalValue: number, items: AnalyticsItem[]) {
  if (typeof window === 'undefined') return;

  if (typeof window.gtag === 'function') {
    window.gtag('event', 'purchase', {
      transaction_id: orderId,
      currency: 'INR',
      value: totalValue,
      items: items.map((i) => ({
        item_id: i.id,
        item_name: i.name,
        price: i.price,
        quantity: i.quantity || 1,
      })),
    });
  }

  if (typeof window.fbq === 'function') {
    window.fbq('track', 'Purchase', {
      value: totalValue,
      currency: 'INR',
      content_type: 'product',
      contents: items.map((i) => ({ id: i.id, quantity: i.quantity || 1 })),
    });
  }
}

/**
 * Track WhatsApp Inquiries
 */
export function trackWhatsAppClick(source: string, productTitle?: string) {
  if (typeof window === 'undefined') return;

  if (typeof window.gtag === 'function') {
    window.gtag('event', 'contact', {
      method: 'WhatsApp',
      event_category: 'Lead',
      event_label: `${source}${productTitle ? ` - ${productTitle}` : ''}`,
    });
  }

  if (typeof window.fbq === 'function') {
    window.fbq('track', 'Contact', {
      content_category: 'WhatsApp',
      content_name: source,
    });
  }
}
