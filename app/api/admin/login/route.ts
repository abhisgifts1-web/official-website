import { NextRequest, NextResponse } from 'next/server';
import { DEFAULT_ADMIN, verifyPassword, createAdminToken, ADMIN_COOKIE_NAME } from '@/lib/auth';
import { connectToDatabase } from '@/lib/db/mongodb';
import { UserModel } from '@/lib/db/models/User';
import { AdminUser } from '@/types';

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

    // Check database first for registered staff members
    let userRecord: AdminUser | null = null;
    try {
      await connectToDatabase();
      const dbUser = await UserModel.findOne({ email: cleanEmail });
      if (dbUser) {
        const isMatch = await verifyPassword(password, dbUser.passwordHash);
        if (isMatch) {
          userRecord = {
            id: dbUser._id.toString(),
            email: dbUser.email,
            name: dbUser.name,
            role: dbUser.role,
            avatar: dbUser.avatar || '',
          };
        }
      }
    } catch {
      // DB connection failed or offline; fallback to DEFAULT_ADMIN check
    }

    // Fallback to configured DEFAULT_ADMIN if not matched in DB
    if (!userRecord && cleanEmail === DEFAULT_ADMIN.email.toLowerCase()) {
      const isValid = await verifyPassword(password, DEFAULT_ADMIN.passwordHash);
      if (isValid) {
        userRecord = {
          id: DEFAULT_ADMIN.id,
          email: DEFAULT_ADMIN.email,
          name: DEFAULT_ADMIN.name,
          role: DEFAULT_ADMIN.role,
          avatar: DEFAULT_ADMIN.avatar || '',
        };
      }
    }

    if (!userRecord) {
      return NextResponse.json(
        { success: false, error: 'Invalid admin credentials' },
        { status: 401 }
      );
    }

    const token = await createAdminToken(userRecord);

    const response = NextResponse.json({
      success: true,
      user: userRecord,
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
