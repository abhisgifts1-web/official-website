import { NextRequest, NextResponse } from 'next/server';
import { getAllCoupons, createCoupon, deleteCoupon } from '@/lib/store';
import { getAuthenticatedAdmin } from '@/lib/auth';
import { connectToDatabase } from '@/lib/db/mongodb';
import { CouponModel } from '@/lib/db/models/Coupon';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const coupons = getAllCoupons();
    return NextResponse.json({ success: true, coupons });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const admin = await getAuthenticatedAdmin();
    if (!admin) {
      return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
    }

    const body = await req.json();
    if (!body.code) {
      return NextResponse.json({ success: false, error: 'Coupon code is required' }, { status: 400 });
    }

    const coupon = createCoupon({
      code: body.code.trim().toUpperCase(),
      discountType: body.discountType || 'percentage',
      discountValue: Number(body.discountValue) || 10,
      minOrderValue: Number(body.minOrderValue) || 0,
      maxDiscount: body.maxDiscount ? Number(body.maxDiscount) : undefined,
      description: body.description || '',
      validFrom: body.validFrom || new Date().toISOString().split('T')[0],
      expiresAt: body.expiresAt || '2027-12-31',
      active: body.active !== false,
    });

    try {
      const conn = await connectToDatabase();
      if (conn) {
        await CouponModel.findOneAndUpdate(
          { code: coupon.code },
          coupon,
          { upsert: true, new: true }
        );
      }
    } catch (dbErr) {
      console.warn('MongoDB coupon upsert error:', dbErr);
    }

    return NextResponse.json({ success: true, coupon });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const admin = await getAuthenticatedAdmin();
    if (!admin) {
      return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
    }

    const { searchParams } = new URL(req.url);
    const code = searchParams.get('code');
    if (!code) {
      return NextResponse.json({ success: false, error: 'Coupon code is required' }, { status: 400 });
    }

    const deleted = deleteCoupon(code);

    try {
      const conn = await connectToDatabase();
      if (conn) {
        await CouponModel.findOneAndDelete({ code: code.toUpperCase() });
      }
    } catch (dbErr) {
      console.warn('MongoDB coupon delete error:', dbErr);
    }

    return NextResponse.json({ success: true, deleted, code });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}
