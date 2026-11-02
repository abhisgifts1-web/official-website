import { NextRequest, NextResponse } from 'next/server';
import { DEFAULT_ADMIN, verifyPassword, createAdminToken, ADMIN_COOKIE_NAME } from '@/lib/auth';

export async function POST(req: NextRequest) {
  try {
    const { email, password } = await req.json();

    if (!email || !password) {
      return NextResponse.json(
        { success: false, error: 'Email and password are required' },
        { status: 400 }
      );
    }

    const cleanEmail = email.trim().toLowerCase();

    // Verify against configured admins
    let isValidUser = false;
    let adminName = DEFAULT_ADMIN.name;
    let adminEmail = cleanEmail;

    if (cleanEmail === DEFAULT_ADMIN.email.toLowerCase()) {
      isValidUser = await verifyPassword(password, DEFAULT_ADMIN.passwordHash);
    }

    if (!isValidUser) {
      return NextResponse.json(
        { success: false, error: 'Invalid admin credentials' },
        { status: 401 }
      );
    }

    const token = await createAdminToken({
      id: DEFAULT_ADMIN.id,
      email: adminEmail,
      name: adminName,
      role: DEFAULT_ADMIN.role,
    });

    const response = NextResponse.json({
      success: true,
      user: {
        id: DEFAULT_ADMIN.id,
        email: adminEmail,
        name: adminName,
        role: DEFAULT_ADMIN.role,
      },
    });

    // Set secure HttpOnly cookie
    response.cookies.set({
      name: ADMIN_COOKIE_NAME,
      value: token,
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 60 * 60 * 24 * 7, // 7 days
    });

    return response;
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}
