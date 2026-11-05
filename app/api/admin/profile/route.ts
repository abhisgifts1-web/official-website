import { NextRequest, NextResponse } from 'next/server';
import { getAuthenticatedAdmin, createAdminToken, ADMIN_COOKIE_NAME } from '@/lib/auth';
import { connectToDatabase } from '@/lib/db/mongodb';
import { UserModel } from '@/lib/db/models/User';
import { DEFAULT_ADMIN } from '@/lib/auth';

/**
 * GET /api/admin/profile
 * Returns the currently authenticated team member's profile
 */
export async function GET() {
  try {
    const admin = await getAuthenticatedAdmin();
    if (!admin) {
      return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
    }

    let avatar = admin.avatar || '';
    let name = admin.name;

    try {
      await connectToDatabase();
      const dbUser = await UserModel.findOne({ email: admin.email.toLowerCase() });
      if (dbUser) {
        avatar = dbUser.avatar || avatar;
        name = dbUser.name || name;
      }
    } catch {
      // offline fallback
    }

    return NextResponse.json({
      success: true,
      user: {
        id: admin.id,
        email: admin.email,
        name,
        role: admin.role,
        avatar,
      },
    });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}

/**
 * PUT /api/admin/profile
 * STRICT INDIVIDUAL PRIVACY POLICY:
 * Every staff member can ONLY update their OWN profile photo and details.
 * Administrators and team members are strictly prohibited from modifying another member's photo.
 */
export async function PUT(req: NextRequest) {
  try {
    const admin = await getAuthenticatedAdmin();
    if (!admin) {
      return NextResponse.json({ success: false, error: 'Unauthorized. Please sign in.' }, { status: 401 });
    }

    const body = await req.json();
    const { avatar, name } = body;

    if (!avatar && typeof name !== 'string') {
      return NextResponse.json(
        { success: false, error: 'No profile updates provided.' },
        { status: 400 }
      );
    }

    let updatedAvatar = admin.avatar || '';
    let updatedName = admin.name;

    if (typeof name === 'string' && name.trim()) {
      updatedName = name.trim();
    }
    if (typeof avatar === 'string') {
      updatedAvatar = avatar;
    }

    // Persist to MongoDB UserModel for this specific authenticated user
    try {
      await connectToDatabase();
      let dbUser = await UserModel.findOne({ email: admin.email.toLowerCase() });

      if (dbUser) {
        dbUser.avatar = updatedAvatar;
        dbUser.name = updatedName;
        await dbUser.save();
      } else {
        // First-time profile save for seeded admin or in-memory fallback user
        await UserModel.create({
          email: admin.email.toLowerCase(),
          passwordHash: DEFAULT_ADMIN.passwordHash,
          name: updatedName,
          role: admin.role,
          avatar: updatedAvatar,
        });
      }
    } catch (dbErr) {
      console.warn('Database sync for profile avatar update had issue, updated token session:', dbErr);
    }

    const updatedUser = {
      id: admin.id,
      email: admin.email,
      name: updatedName,
      role: admin.role,
      avatar: updatedAvatar,
    };

    // Re-issue JWT token with the newly uploaded avatar so it reflects across all pages immediately
    const token = await createAdminToken(updatedUser);

    const response = NextResponse.json({
      success: true,
      user: updatedUser,
      message: 'Your personal profile photo has been updated successfully.',
    });

    response.cookies.set({
      name: ADMIN_COOKIE_NAME,
      value: token,
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 60 * 60 * 24 * 7,
    });

    return response;
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}
