import { NextRequest, NextResponse } from 'next/server';
import { validateCoupon, getAllCoupons } from '@/lib/store';
import { connectToDatabase } from '@/lib/db/mongodb';
import { CouponModel } from '@/lib/db/models/Coupon';

export const dynamic = 'force-dynamic';

export async function POST(req: NextRequest) {
  try {
    const { code, subtotal, customerIdentifier, items } = await req.json();

    if (!code || typeof subtotal !== 'number') {
      return NextResponse.json(
        { valid: false, discountAmount: 0, message: 'Code and subtotal are required.' },
        { status: 400 }
      );
    }

    const cleanCode = String(code).trim().toUpperCase();

    // Ensure newly created MongoDB coupons are loaded if not in local memory
    const existing = getAllCoupons().find((c) => c.code.toUpperCase() === cleanCode);
    if (!existing) {
      try {
        const conn = await connectToDatabase();
        if (conn) {
          const doc = await CouponModel.findOne({
            code: { $regex: new RegExp(`^${cleanCode}$`, 'i') },
          }).lean();
          if (doc) {
            const { _id, __v, ...c } = doc as any;
            const formatted = { ...c, id: c.id || String(_id) };
            const all = getAllCoupons();
            all.push(formatted);
          }
        }
      } catch (dbErr) {
        console.warn('MongoDB coupon check notice in validate route:', dbErr);
      }
    }

    const result = validateCoupon(cleanCode, subtotal, {
      customerIdentifier: customerIdentifier ? String(customerIdentifier).trim() : undefined,
      items: Array.isArray(items) ? items : undefined,
    });

    return NextResponse.json(result);
  } catch (err: any) {
    return NextResponse.json({ valid: false, discountAmount: 0, message: err.message }, { status: 500 });
  }
}
