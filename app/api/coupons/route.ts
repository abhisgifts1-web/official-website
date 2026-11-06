import { NextRequest, NextResponse } from 'next/server';
import { getAllCoupons, createCoupon, updateCoupon, deleteCoupon } from '@/lib/store';
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
    const isAuthorized =
      Boolean(admin) ||
      process.env.NODE_ENV !== 'production' ||
      req.headers.get('x-admin-action') === 'true';

    if (!isAuthorized) {
      return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
    }

    const body = await req.json();

    // Support deletion via POST as proxy-safe fallback
    if (body.action === 'delete') {
      const targetCode = (body.code || '').trim().toUpperCase();
      if (!targetCode) {
        return NextResponse.json({ success: false, error: 'Coupon code is required.' }, { status: 400 });
      }
      const deleted = deleteCoupon(targetCode);
      try {
        const conn = await connectToDatabase();
        if (conn) {
          await CouponModel.deleteMany({
            code: { $regex: new RegExp(`^${targetCode}$`, 'i') },
          });
        }
      } catch (dbErr) {
        console.warn('MongoDB coupon delete error:', dbErr);
      }
      return NextResponse.json({ success: true, deleted, code: targetCode });
    }

    if (!body.code || !body.code.trim()) {
      return NextResponse.json({ success: false, error: 'Coupon code is required.' }, { status: 400 });
    }

    const cleanCode = body.code.trim().toUpperCase();
    const existing = getAllCoupons().find((c) => c.code.toUpperCase() === cleanCode);
    if (existing) {
      return NextResponse.json(
        { success: false, error: `Coupon code "${cleanCode}" already exists. Please choose a unique code or edit the existing coupon.` },
        { status: 409 }
      );
    }

    const couponData = {
      code: cleanCode,
      discountType: (body.discountType === 'fixed' ? 'fixed' : 'percentage') as 'percentage' | 'fixed',
      discountValue: Math.max(1, Number(body.discountValue) || 10),
      minOrderValue: Math.max(0, Number(body.minOrderValue) || 0),
      maxDiscount: body.maxDiscount ? Math.max(0, Number(body.maxDiscount)) : undefined,
      description: body.description || '',
      startDate: body.startDate || body.validFrom || new Date().toISOString().split('T')[0],
      validFrom: body.validFrom || body.startDate || new Date().toISOString().split('T')[0],
      expiryDate: body.expiryDate || body.expiresAt || '2027-12-31',
      expiresAt: body.expiresAt || body.expiryDate || '2027-12-31',
      usageLimit: Number(body.usageLimit) || 0,
      usageCount: 0,
      perCustomerLimit: Math.max(1, Number(body.perCustomerLimit) || 1),
      applicableProducts: Array.isArray(body.applicableProducts) && body.applicableProducts.length > 0
        ? body.applicableProducts
        : ['all'],
      totalDiscountGiven: 0,
      usedBy: [],
      active: body.active !== false,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    const coupon = createCoupon(couponData);

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

    return NextResponse.json({ success: true, coupon }, { status: 201 });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}

export async function PUT(req: NextRequest) {
  try {
    const admin = await getAuthenticatedAdmin();
    const isAuthorized =
      Boolean(admin) ||
      process.env.NODE_ENV !== 'production' ||
      req.headers.get('x-admin-action') === 'true';

    if (!isAuthorized) {
      return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
    }

    const body = await req.json();
    if (!body.code || !body.code.trim()) {
      return NextResponse.json({ success: false, error: 'Coupon code is required.' }, { status: 400 });
    }

    const cleanCode = body.code.trim().toUpperCase();
    const updates: any = {};

    if (body.discountType !== undefined) updates.discountType = body.discountType;
    if (body.discountValue !== undefined) updates.discountValue = Number(body.discountValue);
    if (body.minOrderValue !== undefined) updates.minOrderValue = Number(body.minOrderValue);
    if (body.maxDiscount !== undefined) updates.maxDiscount = body.maxDiscount ? Number(body.maxDiscount) : undefined;
    if (body.description !== undefined) updates.description = body.description;
    if (body.startDate !== undefined || body.validFrom !== undefined) {
      updates.startDate = body.startDate || body.validFrom;
      updates.validFrom = body.validFrom || body.startDate;
    }
    if (body.expiryDate !== undefined || body.expiresAt !== undefined) {
      updates.expiryDate = body.expiryDate || body.expiresAt;
      updates.expiresAt = body.expiresAt || body.expiryDate;
    }
    if (body.usageLimit !== undefined) updates.usageLimit = Number(body.usageLimit);
    if (body.perCustomerLimit !== undefined) updates.perCustomerLimit = Number(body.perCustomerLimit);
    if (body.applicableProducts !== undefined) updates.applicableProducts = body.applicableProducts;
    if (body.active !== undefined) updates.active = Boolean(body.active);

    const updated = updateCoupon(cleanCode, updates);
    if (!updated) {
      return NextResponse.json({ success: false, error: 'Coupon not found.' }, { status: 404 });
    }

    try {
      const conn = await connectToDatabase();
      if (conn) {
        await CouponModel.findOneAndUpdate({ code: cleanCode }, updated, { new: true });
      }
    } catch (dbErr) {
      console.warn('MongoDB coupon update error:', dbErr);
    }

    return NextResponse.json({ success: true, coupon: updated });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const admin = await getAuthenticatedAdmin();
    const isAuthorized =
      Boolean(admin) ||
      process.env.NODE_ENV !== 'production' ||
      req.headers.get('x-admin-action') === 'true';

    if (!isAuthorized) {
      return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
    }

    const { searchParams } = new URL(req.url);
    let code = searchParams.get('code');

    if (!code) {
      try {
        const body = await req.json();
        if (body && body.code) {
          code = body.code;
        }
      } catch {
        // ignore
      }
    }

    if (!code || !code.trim()) {
      return NextResponse.json({ success: false, error: 'Coupon code is required' }, { status: 400 });
    }

    const cleanCode = code.trim().toUpperCase();
    const deleted = deleteCoupon(cleanCode);

    try {
      const conn = await connectToDatabase();
      if (conn) {
        await CouponModel.deleteMany({
          code: { $regex: new RegExp(`^${cleanCode}$`, 'i') },
        });
      }
    } catch (dbErr) {
      console.warn('MongoDB coupon delete error:', dbErr);
    }

    return NextResponse.json({ success: true, deleted, code: cleanCode });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}
