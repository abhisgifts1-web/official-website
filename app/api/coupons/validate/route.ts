import { NextRequest, NextResponse } from 'next/server';
import { validateCoupon } from '@/lib/store';

export async function POST(req: NextRequest) {
  try {
    const { code, subtotal, customerIdentifier, items } = await req.json();

    if (!code || typeof subtotal !== 'number') {
      return NextResponse.json(
        { valid: false, discountAmount: 0, message: 'Code and subtotal are required.' },
        { status: 400 }
      );
    }

    const result = validateCoupon(code, subtotal, {
      customerIdentifier: customerIdentifier ? String(customerIdentifier).trim() : undefined,
      items: Array.isArray(items) ? items : undefined,
    });

    return NextResponse.json(result);
  } catch (err: any) {
    return NextResponse.json({ valid: false, discountAmount: 0, message: err.message }, { status: 500 });
  }
}
