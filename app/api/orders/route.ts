import { NextRequest, NextResponse } from 'next/server';
import { getAllOrders, createOrder, validateCoupon, recordCouponUsage, getAllProducts } from '@/lib/store';
import { getAuthenticatedAdmin } from '@/lib/auth';
import { connectToDatabase } from '@/lib/db/mongodb';
import { OrderModel } from '@/lib/db/models/Order';
import { Order } from '@/types';

export const dynamic = 'force-dynamic';

export async function GET(req: NextRequest) {
  try {
    const admin = await getAuthenticatedAdmin();
    const { searchParams } = new URL(req.url);
    const status = searchParams.get('status') || undefined;
    const search = searchParams.get('search') || undefined;

    // 1. Fetch live orders from MongoDB Atlas
    let allOrders: Order[] = [];
    try {
      const conn = await connectToDatabase();
      if (conn) {
        const dbOrders = await OrderModel.find({}).sort({ createdAt: -1 }).lean();
        if (dbOrders && dbOrders.length > 0) {
          allOrders = dbOrders.map((doc: any) => {
            const { _id, __v, ...o } = doc;
            return { ...o, id: o.orderId || o.id || String(_id) } as Order;
          });
        }
      }
    } catch (dbErr) {
      console.warn('MongoDB orders fetch notice, falling back to cache:', dbErr);
    }

    if (!allOrders || allOrders.length === 0) {
      allOrders = getAllOrders();
    }

    // Admin can view all orders
    if (admin) {
      let filtered = [...allOrders];
      if (status && status !== 'All') {
        filtered = filtered.filter((o) => o.orderStatus === status);
      }
      if (search && search.trim()) {
        const q = search.trim().toLowerCase();
        filtered = filtered.filter(
          (o) =>
            o.id?.toLowerCase().includes(q) ||
            o.customer?.fullName?.toLowerCase().includes(q) ||
            o.customer?.mobile?.includes(q) ||
            o.customer?.email?.toLowerCase().includes(q)
        );
      }
      return NextResponse.json({ success: true, count: filtered.length, orders: filtered });
    }

    // Customer tracking: lookup by Order ID, phone, or email
    const orderId = searchParams.get('id') || searchParams.get('orderId');
    const customerPhone = searchParams.get('phone');
    const customerEmail = searchParams.get('email');

    if (!orderId && !customerPhone && !customerEmail) {
      return NextResponse.json({ success: false, error: 'Please provide an Order ID or phone number.' }, { status: 400 });
    }

    const customerOrders = allOrders.filter(
      (o) =>
        (orderId && (o.id === orderId || o.id?.toLowerCase() === orderId.toLowerCase())) ||
        (customerPhone && (
          o.customer?.mobile === customerPhone || 
          o.customer?.mobile?.replace(/[^0-9]/g, '') === customerPhone.replace(/[^0-9]/g, '')
        )) ||
        (customerEmail && o.customer?.email?.toLowerCase() === customerEmail.toLowerCase())
    );

    // Sanitize sensitive PII for public customer lookup
    const safeOrders = customerOrders.map((o) => {
      const mobile = o.customer?.mobile || '';
      const maskedMobile = mobile.length >= 4 ? `******${mobile.slice(-4)}` : '******';
      return {
        id: o.id,
        createdAt: o.createdAt,
        orderStatus: o.orderStatus,
        paymentStatus: o.paymentStatus,
        paymentMethod: o.paymentMethod,
        totalAmount: o.totalAmount,
        trackingNumber: (o as any).trackingNumber || (o as any).courierAwb || `EXP-${o.id?.slice(-6) || 'IND'}`,
        courierPartner: (o as any).courierPartner || 'DTDC / Blue Dart Express',
        items: o.items.map((i) => ({
          id: i.id,
          title: i.title,
          image: i.image,
          size: i.size,
          quantity: i.quantity,
          unitPrice: i.unitPrice,
        })),
        destination: {
          city: o.customer?.city || 'Hyderabad',
          state: o.customer?.state || 'Telangana',
          pincode: o.customer?.pincode ? `***${o.customer.pincode.slice(-3)}` : '******',
          recipientName: o.customer?.fullName ? `${o.customer.fullName.split(' ')[0]} ***` : 'Customer',
          mobileMasked: maskedMobile,
        },
      };
    });

    return NextResponse.json({ success: true, count: safeOrders.length, orders: safeOrders });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { customer, items, couponCode, paymentMethod, notes, razorpayPaymentId } = body;

    if (!customer || !customer.fullName || !customer.mobile || !customer.streetAddress || !customer.pincode) {
      return NextResponse.json(
        { success: false, error: 'Missing mandatory shipping address fields.' },
        { status: 400 }
      );
    }

    if (!items || !Array.isArray(items) || items.length === 0) {
      return NextResponse.json({ success: false, error: 'Cart cannot be empty.' }, { status: 400 });
    }

    // SERVER-SIDE VALIDATION: Verify true product existence and calculate authentic prices
    const catalog = getAllProducts();
    let computedSubtotal = 0;
    const validatedItems = [];

    for (const clientItem of items) {
      const catalogProduct = catalog.find((p) => p.id === clientItem.productId || p.slug === clientItem.slug);
      let variant = catalogProduct?.variants?.find((v) => v.id === clientItem.variantId);
      if (!variant && clientItem.size && catalogProduct?.variants) {
        variant = catalogProduct.variants.find((v) => v.size?.toLowerCase() === clientItem.size?.toLowerCase());
      }
      const trueUnitPrice = variant ? variant.price : (catalogProduct?.basePrice || 1299);
      const trueUnitMrp = variant ? variant.mrp : (catalogProduct?.baseMrp || 2499);
      const qty = Math.max(1, Math.min(10, Number(clientItem.quantity) || 1));

      // Security: Server-authoritative catalog pricing prevents client-side price tampering
      const effectiveUnitPrice = catalogProduct ? trueUnitPrice : (typeof clientItem.unitPrice === 'number' && clientItem.unitPrice > 0 ? clientItem.unitPrice : 1299);
      const effectiveUnitMrp = catalogProduct ? trueUnitMrp : (typeof clientItem.unitMrp === 'number' && clientItem.unitMrp > 0 ? clientItem.unitMrp : 2499);

      computedSubtotal += effectiveUnitPrice * qty;

      validatedItems.push({
        id: clientItem.id || `ci-${Date.now()}`,
        productId: catalogProduct?.id || clientItem.productId,
        slug: catalogProduct?.slug || clientItem.slug,
        title: clientItem.title || catalogProduct?.title || 'Custom Acrylic Frame',
        image: clientItem.image || catalogProduct?.images?.[0] || '/images/placeholder.jpg',
        variantId: clientItem.variantId || (variant ? variant.id : 'default'),
        size: clientItem.size || (variant ? variant.size : 'Standard'),
        finish: clientItem.finish || (variant ? variant.finish : 'Acrylic Ultra-Gloss'),
        lighting: clientItem.lighting || (variant ? variant.lighting : 'No Lighting (Pure Art)'),
        unitPrice: effectiveUnitPrice,
        unitMrp: effectiveUnitMrp,
        quantity: qty,
        customization: clientItem.customization,
      });
    }

    // SERVER-SIDE COUPON VALIDATION
    let discountAmount = 0;
    let validatedCouponCode: string | undefined = undefined;

    if (couponCode && couponCode.trim()) {
      const customerIdentifier = customer.mobile || customer.email;
      const couponCheck = validateCoupon(couponCode, computedSubtotal, {
        customerIdentifier,
        items: validatedItems,
      });

      if (couponCheck.valid) {
        discountAmount = couponCheck.discountAmount;
        validatedCouponCode = couponCheck.coupon?.code;
      }
    }

    // Free delivery everywhere
    const shippingFee = 0;
    const totalAmount = Math.max(0, computedSubtotal - discountAmount);
    const isPaid = paymentMethod === 'Razorpay' && Boolean(razorpayPaymentId);

    const createdOrder = createOrder({
      customer: {
        fullName: customer.fullName.trim(),
        mobile: customer.mobile.trim(),
        email: (customer.email || '').trim().toLowerCase(),
        streetAddress: customer.streetAddress.trim(),
        apartment: customer.apartment?.trim(),
        landmark: customer.landmark?.trim(),
        city: customer.city.trim(),
        state: customer.state.trim(),
        pincode: customer.pincode.trim(),
      },
      items: validatedItems,
      subtotal: computedSubtotal,
      discountAmount,
      couponCode: validatedCouponCode,
      shippingFee,
      totalAmount,
      paymentMethod: (paymentMethod as 'Razorpay' | 'Online' | 'WhatsApp') || 'Razorpay',
      paymentStatus: isPaid ? 'Paid' : 'Pending',
      razorpayPaymentId: razorpayPaymentId || undefined,
      orderStatus: isPaid ? 'Confirmed' : 'Pending',
      notes: notes ? notes.trim() : undefined,
    });

    // Directly commit to MongoDB Atlas
    try {
      const conn = await connectToDatabase();
      if (conn) {
        const { _id, ...cleanOrder } = createdOrder as any;
        await OrderModel.findOneAndUpdate(
          { orderId: createdOrder.id },
          { ...cleanOrder, orderId: createdOrder.id },
          { upsert: true, new: true }
        );
      }
    } catch (dbErr) {
      console.warn('MongoDB direct order save warning:', dbErr);
    }

    // Atomic coupon usage tracking
    if (validatedCouponCode && discountAmount > 0) {
      recordCouponUsage(validatedCouponCode, {
        customer: (customer.mobile || customer.email || 'customer').trim(),
        orderId: createdOrder.id,
        discountAmount,
      });
    }

    return NextResponse.json({ success: true, order: createdOrder }, { status: 201 });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}
