import { NextRequest, NextResponse } from 'next/server';
import { createRazorpayOrder } from '@/lib/razorpay';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { amount, receipt, notes } = body;

    if (!amount || typeof amount !== 'number' || amount <= 0) {
      return NextResponse.json(
        { success: false, error: 'Invalid order amount.' },
        { status: 400 }
      );
    }

    const orderResult = await createRazorpayOrder({
      amount,
      receipt: receipt || `rec_${Date.now()}`,
      notes: notes || {},
    });

    return NextResponse.json(orderResult, { status: 200 });
  } catch (err: any) {
    console.error('API Error in /api/razorpay/create-order:', err);
    return NextResponse.json(
      { success: false, error: err.message || 'Internal Server Error' },
      { status: 500 }
    );
  }
}
