import { CartItem, ShippingAddress, Order } from '@/types';
import { INITIAL_SETTINGS } from '@/lib/data/settings';

export function getWhatsAppNumber(): string {
  const raw = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || INITIAL_SETTINGS.whatsappNumber || '919032372782';
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
  baseUrl?: string;
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
    baseUrl,
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

    // Include the Custom Photo(s) / Artwork Image Link
    const customPhotoUrls = item.customization?.photoUrls;
    const customPhotoUrl = item.customization?.previewUrl;
    const baseImageUrl = item.image;

    // Check if customer provided multiple custom photos
    if (customPhotoUrls && customPhotoUrls.length > 1) {
      msg += `   📸 *Customer Uploaded Photos (${customPhotoUrls.length} photos):*\n`;
      customPhotoUrls.forEach((pUrl, pIdx) => {
        if (pUrl.startsWith('data:')) {
          msg += `      ${pIdx + 1}. [Uploaded photo #${pIdx + 1} - sharing directly in chat]\n`;
        } else {
          let fullImgUrl = pUrl;
          if (!fullImgUrl.startsWith('http://') && !fullImgUrl.startsWith('https://')) {
            const origin = (baseUrl || (typeof window !== 'undefined' ? window.location.origin : '') || 'https://abhisgifts.com').replace(/\/$/, '');
            fullImgUrl = `${origin}${fullImgUrl.startsWith('/') ? '' : '/'}${fullImgUrl}`;
          }
          msg += `      ${pIdx + 1}. ${fullImgUrl}\n`;
        }
      });
      msg += `   👉 *(Customer attached ${customPhotoUrls.length} photos for this order)*\n`;
    } else {
      // Single photo logic
      const isCustom =
        Boolean(customPhotoUrl) ||
        item.title.toLowerCase().includes('custom photo') ||
        item.variantId.toLowerCase().includes('custom') ||
        item.productId === 'prod-custom-photo-acrylic-frame' ||
        (baseImageUrl && (baseImageUrl.includes('custom-photos') || baseImageUrl.includes('/api/uploads/') || baseImageUrl.includes('tmpfiles')));

      const photoToLink = customPhotoUrl || (isCustom ? baseImageUrl : null);

      if (photoToLink) {
        if (photoToLink.startsWith('data:')) {
          msg += `   📸 *Custom Customer Photo:* [Uploaded with order - sharing directly in chat]\n`;
        } else {
          let fullImgUrl = photoToLink;
          if (!fullImgUrl.startsWith('http://') && !fullImgUrl.startsWith('https://')) {
            const origin = (baseUrl || (typeof window !== 'undefined' ? window.location.origin : '') || 'https://abhisgifts.com').replace(/\/$/, '');
            fullImgUrl = `${origin}${fullImgUrl.startsWith('/') ? '' : '/'}${fullImgUrl}`;
          }
          msg += `   📸 *Custom Customer Photo Link:* ${fullImgUrl}\n`;
          msg += `   👉 *(Click link to view/download original high-res customer photo)*\n`;
        }
      } else if (baseImageUrl && !baseImageUrl.startsWith('data:')) {
        let fullImgUrl = baseImageUrl;
        if (!fullImgUrl.startsWith('http://') && !fullImgUrl.startsWith('https://')) {
          const origin = (baseUrl || (typeof window !== 'undefined' ? window.location.origin : '') || 'https://abhisgifts.com').replace(/\/$/, '');
          fullImgUrl = `${origin}${fullImgUrl.startsWith('/') ? '' : '/'}${fullImgUrl}`;
        }
        msg += `   🖼️ *Selected Artwork Image:* ${fullImgUrl}\n`;
      }
    }
  });

  msg += `\n━━━━━━━━━━━━━━━━━━━━━\n`;
  msg += `💰 *ORDER SUMMARY:*\n`;
  msg += `• Subtotal: ₹${subtotal.toLocaleString('en-IN')}\n`;
  if (discountAmount > 0) {
    msg += `• Coupon Savings: -₹${discountAmount.toLocaleString('en-IN')}${couponCode ? ` (${couponCode})` : ''}\n`;
  }
  const hasCustomSize = items.some(
    (it) =>
      it.size?.toLowerCase().includes('custom size') ||
      it.variantId?.toLowerCase().includes('custom-size')
  );
  if (hasCustomSize) {
    msg += `• *Note:* Custom size price is auto-calculated based on area scaling.\n`;
  }
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


export function buildAdminOrderNotificationMessage(order: Order, baseUrl?: string): string {
  const origin = (
    baseUrl ||
    (typeof window !== 'undefined' ? window.location.origin : '') ||
    'https://abhisgifts.com'
  ).replace(/\/$/, '');
  const invoiceUrl = `${origin}/invoice/${order.id}`;

  const statusEmojis: Record<string, string> = {
    'Pending': '⏳',
    'Confirmed': '✅',
    'Framing & Production': '🎨',
    'Quality Checked': '🔍',
    'Shipped': '🚚',
    'Out for Delivery': '🛵',
    'Delivered': '🎉',
    'Cancelled': '❌',
  };

  const emoji = statusEmojis[order.orderStatus] || '✨';

  // Status-specific headline message
  let statusBanner = '';
  switch (order.orderStatus) {
    case 'Pending':
      statusBanner = `Thank you for choosing *Abhi's Gifts*! We have received your order details and our master artisans are reviewing your artwork specifications to commence crafting with reverent care.`;
      break;
    case 'Confirmed':
      statusBanner = `Great news! Your custom order has been officially *CONFIRMED* and assigned to our master fabrication line in our Hyderabad studio.`;
      break;
    case 'Framing & Production':
      statusBanner = `Exciting update! Your custom piece is currently under *FRAMING & PRODUCTION*. Our artisans are precision-cutting and mounting your artwork with museum-grade care.`;
      break;
    case 'Quality Checked':
      statusBanner = `Your artwork has successfully cleared our *QUALITY INSPECTION* (crystal clarity, edge beveling & illumination test) and is being carefully prepared for transit.`;
      break;
    case 'Shipped':
      statusBanner = `Great news! Your handcrafted order has been securely packed in our 5-layer shockproof box and has *SHIPPED*! 🚚📦`;
      break;
    case 'Out for Delivery':
      statusBanner = `Your order is *OUT FOR DELIVERY* today! Our delivery executive will reach your address shortly. Please keep your phone reachable. 🛵`;
      break;
    case 'Delivered':
      statusBanner = `Your order has been successfully *DELIVERED*! 🎉 We hope it brings divine warmth and cherished memories to your space. ❤️`;
      break;
    case 'Cancelled':
      statusBanner = `Your order #${order.id} has been cancelled. If this was unexpected or if you have questions, please reach out to us.`;
      break;
    default:
      statusBanner = `Here is an update regarding your handcrafted order with Abhi's Gifts.`;
  }

  const orderDate = new Date(order.createdAt).toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });

  let msg = `✨ *ORDER UPDATE — ABHI'S GIFTS* ✨\n`;
  msg += `*Handcrafted Acrylic Photo Frames & Custom Art Studio*\n`;
  msg += `*Dilsukhnagar, Hyderabad*\n\n`;

  msg += `Namaste *${order.customer.fullName}*! 🙏\n\n`;
  msg += `${statusBanner}\n\n`;

  msg += `━━━━━━━━━━━━━━━━━━━━━\n`;
  msg += `📋 *ORDER DETAILS:*\n`;
  msg += `• *Order ID:* #${order.id}\n`;
  msg += `• *Order Status:* ${emoji} *${order.orderStatus}*\n`;
  msg += `• *Order Date:* ${orderDate}\n`;
  msg += `• *Payment Method:* ${order.paymentMethod}\n`;
  msg += `• *Payment Status:* ${order.paymentStatus === 'Paid' ? '✅ Paid' : '⏳ ' + order.paymentStatus}\n`;
  msg += `• *Total Amount:* ₹${order.totalAmount.toLocaleString('en-IN')}\n\n`;

  msg += `━━━━━━━━━━━━━━━━━━━━━\n`;
  msg += `🖼️ *ORDERED ITEMS (${order.items.length}):*\n`;

  order.items.forEach((item, idx) => {
    msg += `\n${idx + 1}. *${item.title}*\n`;
    if (item.size) msg += `   ▫ *Size:* ${item.size}\n`;
    if (item.finish) msg += `   ▫ *Finish:* ${item.finish}\n`;
    if (item.lighting) msg += `   ▫ *Lighting:* ${item.lighting}\n`;
    msg += `   ▫ *Quantity:* ${item.quantity} | ₹${(item.unitPrice * item.quantity).toLocaleString('en-IN')}\n`;
    if (item.customization?.customText) {
      msg += `   ▫ *Custom Inscription:* "${item.customization.customText}"\n`;
    }
  });

  msg += `\n━━━━━━━━━━━━━━━━━━━━━\n`;
  msg += `📍 *DELIVERY DESTINATION:*\n`;
  msg += `• *Recipient:* ${order.customer.fullName}\n`;
  msg += `• *Mobile:* ${order.customer.mobile}${order.customer.secondaryMobile ? ` / ${order.customer.secondaryMobile}` : ''}\n`;
  msg += `• *Address:* ${order.customer.streetAddress}`;
  if (order.customer.apartment) msg += `, ${order.customer.apartment}`;
  if (order.customer.landmark) msg += ` (Near ${order.customer.landmark})`;
  msg += `\n• *City/State:* ${order.customer.city}, ${order.customer.state} - ${order.customer.pincode}\n`;

  if (order.trackingNumber || order.courierPartner) {
    msg += `\n━━━━━━━━━━━━━━━━━━━━━\n`;
    msg += `🚚 *DISPATCH & TRACKING:*\n`;
    if (order.courierPartner) msg += `• *Courier Partner:* ${order.courierPartner}\n`;
    if (order.trackingNumber) msg += `• *Tracking / AWB No:* ${order.trackingNumber}\n`;
    msg += `• *Track Online:* ${origin}/track-order\n`;
  }

  // Next steps & digital proof assurance for active orders
  if (
    order.orderStatus === 'Pending' ||
    order.orderStatus === 'Confirmed' ||
    order.orderStatus === 'Framing & Production'
  ) {
    msg += `\n━━━━━━━━━━━━━━━━━━━━━\n`;
    msg += `✨ *WHAT HAPPENS NEXT:*\n`;
    msg += `1️⃣ *Digital Proof Approval:* Our design team will prepare a 1:1 digital preview and share it right here on WhatsApp for your confirmation before final printing.\n`;
    msg += `2️⃣ *Premium Crafting:* Once approved, crafted with 5MM crystal cast acrylic & diamond-beveled finish.\n`;
    msg += `3️⃣ *Zero-Breakage Delivery:* Packed with multi-layer high-density protection for safe transit.\n`;
  }

  msg += `\n━━━━━━━━━━━━━━━━━━━━━\n`;
  msg += `📄 *View & Print Official Invoice:*\n`;
  msg += `${invoiceUrl}\n\n`;

  msg += `💬 *Have questions or wish to send high-res photos?*\n`;
  msg += `Simply reply directly to this chat or call our workshop at *+91 90323 72782*.\n\n`;

  msg += `Warm regards,\n`;
  msg += `*Team Abhi's Gifts*\n`;
  msg += `📍 16-11-740/5/A, Gaddiannaram, Dilsukhnagar, Hyderabad, Telangana - 500060\n`;
  msg += `📞 +91 90323 72782\n`;
  msg += `✉️ abhisgifts@gmail.com\n`;
  msg += `🌐 ${origin}`;

  return msg;
}

export function getAdminOrderNotificationUrl(order: Order, baseUrl?: string): string {
  const cleanPhone = order.customer.mobile.replace(/[^0-9]/g, '');
  const phone = cleanPhone.length === 10 ? `91${cleanPhone}` : cleanPhone;
  const text = buildAdminOrderNotificationMessage(order, baseUrl);
  return `https://wa.me/${phone}?text=${encodeURIComponent(text)}`;
}
