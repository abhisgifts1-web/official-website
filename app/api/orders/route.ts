import { NextRequest, NextResponse } from 'next/server';
import { getAllOrders, createOrder, validateCoupon, getAllProducts } from '@/lib/store';
import { getAuthenticatedAdmin } from '@/lib/auth';
import { INITIAL_SETTINGS } from '@/lib/data/settings';

export async function GET(req: NextRequest) {
  try {
    const admin = await getAuthenticatedAdmin();
    const { searchParams } = new URL(req.url);
    const status = searchParams.get('status') || undefined;
    const search = searchParams.get('search') || undefined;

    // Admin can view all orders
    if (admin) {
      const orders = getAllOrders(status, search);
      return NextResponse.json({ success: true, count: orders.length, orders });
    }

    // Customer can view their own orders if email or mobile param is passed
    const customerPhone = searchParams.get('phone');
    const customerEmail = searchParams.get('email');

    if (!customerPhone && !customerEmail) {
      return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
    }

    const allOrders = getAllOrders();
    const customerOrders = allOrders.filter(
      (o) =>
        (customerPhone && o.customer.mobile === customerPhone) ||
        (customerEmail && o.customer.email.toLowerCase() === customerEmail.toLowerCase())
    );

    return NextResponse.json({ success: true, count: customerOrders.length, orders: customerOrders });
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
      const catalogProduct = catalog.find((p) => p.id === clientItem.productId);
      if (!catalogProduct) {
        return NextResponse.json(
          { success: false, error: `Product "${clientItem.title}" is no longer available.` },
          { status: 400 }
        );
      }

      const variant = catalogProduct.variants.find((v) => v.id === clientItem.variantId);
      const trueUnitPrice = variant ? variant.price : catalogProduct.basePrice;
      const trueUnitMrp = variant ? variant.mrp : catalogProduct.baseMrp;
      const qty = Math.max(1, Math.min(10, Number(clientItem.quantity) || 1));

      computedSubtotal += trueUnitPrice * qty;

      validatedItems.push({
        id: clientItem.id || `ci-${Date.now()}`,
        productId: catalogProduct.id,
        slug: catalogProduct.slug,
        title: catalogProduct.title,
        image: clientItem.image || catalogProduct.images[0],
        variantId: variant ? variant.id : 'default',
        size: variant ? variant.size : 'Standard',
        finish: variant ? variant.finish : 'Acrylic Ultra-Gloss',
        lighting: variant ? variant.lighting : 'No Lighting (Pure Art)',
        unitPrice: trueUnitPrice,
        unitMrp: trueUnitMrp,
        quantity: qty,
        customization: clientItem.customization,
      });
    }

    // SERVER-SIDE COUPON VALIDATION
    let discountAmount = 0;
    let validatedCouponCode: string | undefined = undefined;

    if (couponCode && couponCode.trim()) {
      const couponCheck = validateCoupon(couponCode, computedSubtotal);
      if (couponCheck.valid) {
        discountAmount = couponCheck.discountAmount;
        validatedCouponCode = couponCheck.coupon?.code;
      }
    }

    // SERVER-SIDE SHIPPING CHARGE
    const shippingFee =
      computedSubtotal >= INITIAL_SETTINGS.freeShippingThreshold ? 0 : INITIAL_SETTINGS.defaultShippingFee;

    const totalAmount = Math.max(0, computedSubtotal - discountAmount + shippingFee);

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
      paymentMethod: (paymentMethod as 'WhatsApp' | 'Online' | 'Razorpay') || 'WhatsApp',
      paymentStatus: isPaid ? 'Paid' : 'Pending',
      razorpayPaymentId: razorpayPaymentId || undefined,
      orderStatus: isPaid ? 'Confirmed' : 'Pending',
      notes: notes ? notes.trim() : undefined,
    });

    return NextResponse.json({ success: true, order: createdOrder }, { status: 201 });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}
