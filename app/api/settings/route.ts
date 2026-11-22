import { NextRequest, NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';
import { getSiteSettings, updateSiteSettings } from '@/lib/store';
import { getAuthenticatedAdmin, ADMIN_COOKIE_NAME, verifyAdminToken } from '@/lib/auth';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export async function GET() {
  try {
    const settings = getSiteSettings();
    return NextResponse.json(
      { success: true, settings },
      {
        headers: {
          'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate, max-age=0',
          'Pragma': 'no-cache',
          'Expires': '0',
        },
      }
    );
  } catch (err: any) {
    return NextResponse.json(
      { success: false, error: err.message },
      {
        status: 500,
        headers: {
          'Cache-Control': 'no-store, no-cache, must-revalidate',
        },
      }
    );
  }
}

export async function PUT(req: NextRequest) {
  try {
    let admin = await getAuthenticatedAdmin();

    // Direct cookie verification fallback
    if (!admin) {
      const token = req.cookies.get(ADMIN_COOKIE_NAME)?.value;
      if (token) {
        admin = await verifyAdminToken(token);
      }
    }

    if (!admin) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized: Admin session expired. Please log in again.' },
        { status: 401 }
      );
    }

    const body = await req.json();
    const updated = updateSiteSettings(body);

    // Invalidate Next.js cache so changes reflect on the live website immediately
    try {
      revalidatePath('/', 'layout');
      revalidatePath('/', 'page');
      revalidatePath('/');
      revalidatePath('/shop');
      revalidatePath('/admin/settings');
    } catch (revalErr) {
      console.warn('Revalidation warning:', revalErr);
    }

    return NextResponse.json(
      { success: true, settings: updated },
      {
        headers: {
          'Cache-Control': 'no-store, no-cache, must-revalidate',
        },
      }
    );
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}
