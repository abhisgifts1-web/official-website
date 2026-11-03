import { CartItem, ShippingAddress } from '@/types';
import { INITIAL_SETTINGS } from '@/lib/data/settings';

export function getWhatsAppNumber(): string {
  const raw = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || INITIAL_SETTINGS.whatsappNumber || '917780269927';
  return raw.replace(/[^0-9]/g, '');
}

export interface WhatsAppOrderDetails {
  orderId?: string;
  customer: ShippingAddress;
  items: CartItem[];
  subtotal: number;
  discountAmount?: number;
  couponCode?: string;
  shippingFee?: number;
  totalAmount: number;
  notes?: string;
}

export function buildWhatsAppOrderMessage(data: WhatsAppOrderDetails): string {
  const {
    orderId,
    customer,
    items,
    subtotal,
    discountAmount = 0,
    couponCode,
    shippingFee = 0,
    totalAmount,
    notes,
  } = data;

  let msg = `🛍️ *NEW ORDER — ABHI GIFTS*\n`;
  if (orderId) {
    msg += `*Order ID:* #${orderId}\n`;
  }
  msg += `━━━━━━━━━━━━━━━━━━━━━\n`;
  msg += `👤 *CUSTOMER & DELIVERY ADDRESS:*\n`;
  msg += `• *Name:* ${customer.fullName}\n`;
  msg += `• *Phone:* ${customer.mobile}\n`;
  if (customer.email && customer.email.trim()) {
    msg += `• *Email:* ${customer.email}\n`;
  }
  msg += `• *Address:* ${customer.streetAddress}`;
  if (customer.apartment) msg += `, ${customer.apartment}`;
  if (customer.landmark) msg += ` (Near ${customer.landmark})`;
  msg += `\n• *City/State:* ${customer.city}, ${customer.state} - ${customer.pincode}\n`;
  msg += `━━━━━━━━━━━━━━━━━━━━━\n`;
  msg += `🖼️ *SELECTED ARTWORKS (${items.length}):*\n`;

  items.forEach((item, idx) => {
    msg += `\n${idx + 1}. *${item.title}*\n`;
    msg += `   ▫ *Size:* ${item.size}\n`;
    if (item.finish) msg += `   ▫ *Finish:* ${item.finish}\n`;
    if (item.lighting) msg += `   ▫ *Lighting:* ${item.lighting}\n`;
    msg += `   ▫ *Quantity:* ${item.quantity}\n`;
    msg += `   ▫ *Price:* ₹${(item.unitPrice * item.quantity).toLocaleString('en-IN')}\n`;
    if (item.customization?.customText) {
      msg += `   ▫ *Custom Inscription:* "${item.customization.customText}"\n`;
    }
  });

  msg += `\n━━━━━━━━━━━━━━━━━━━━━\n`;
  msg += `💰 *ORDER SUMMARY:*\n`;
  msg += `• Subtotal: ₹${subtotal.toLocaleString('en-IN')}\n`;
  if (discountAmount > 0) {
    msg += `• Coupon Savings: -₹${discountAmount.toLocaleString('en-IN')}${couponCode ? ` (${couponCode})` : ''}\n`;
  }
  msg += `• Delivery Fee: ₹${shippingFee}\n`;
  msg += `• *Grand Total: ₹${totalAmount.toLocaleString('en-IN')}*\n`;

  if (notes && notes.trim()) {
    msg += `━━━━━━━━━━━━━━━━━━━━━\n`;
    msg += `📝 *Delivery Notes:* ${notes.trim()}\n`;
  }

  msg += `━━━━━━━━━━━━━━━━━━━━━\n`;
  msg += `Please confirm my order and share direct payment (UPI/GPay/PhonePe) & dispatch timeline. Thank you!`;

  return msg;
}

export function getWhatsAppOrderUrl(data: WhatsAppOrderDetails): string {
  const number = getWhatsAppNumber();
  const text = buildWhatsAppOrderMessage(data);
  return `https://wa.me/${number}?text=${encodeURIComponent(text)}`;
}
