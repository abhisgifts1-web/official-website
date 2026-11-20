import { NextRequest, NextResponse } from 'next/server';
import { verifyRazorpaySignature } from '@/lib/razorpay';
import { updateOrderPayment, getOrderById } from '@/lib/store';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { razorpayOrderId, razorpayPaymentId, razorpaySignature, orderId } = body;

    if (!orderId) {
      return NextResponse.json(
        { success: false, error: 'Missing internal orderId.' },
        { status: 400 }
      );
    }

    if (!razorpayPaymentId) {
      return NextResponse.json(
        { success: false, error: 'Missing Razorpay payment ID.' },
        { status: 400 }
      );
    }

    const isValid = verifyRazorpaySignature({
      razorpayOrderId: razorpayOrderId || '',
      razorpayPaymentId,
      razorpaySignature,
    });

    if (!isValid) {
      return NextResponse.json(
        { success: false, error: 'Payment signature verification failed.' },
        { status: 400 }
      );
    }

    // Update order status in store
    const updatedOrder = updateOrderPayment(orderId, {
      paymentStatus: 'Paid',
      paymentMethod: 'Razorpay',
      razorpayPaymentId,
      razorpayOrderId: razorpayOrderId || undefined,
      orderStatus: 'Confirmed',
    });

    return NextResponse.json(
      {
        success: true,
        verified: true,
        orderId,
        order: updatedOrder || undefined,
      },
      { status: 200 }
    );
  } catch (err: any) {
    console.error('API Error in /api/razorpay/verify-payment:', err);
    return NextResponse.json(
      { success: false, error: err.message || 'Internal Server Error' },
      { status: 500 }
    );
  }
}
