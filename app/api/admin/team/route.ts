import { NextRequest, NextResponse } from 'next/server';
import { getAuthenticatedAdmin, hashPassword, DEFAULT_ADMIN } from '@/lib/auth';
import { connectToDatabase } from '@/lib/db/mongodb';
import { UserModel } from '@/lib/db/models/User';

/**
 * GET /api/admin/team
 * List all registered team / staff members
 */
export async function GET() {
  try {
    const admin = await getAuthenticatedAdmin();
    if (!admin) {
      return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
    }

    let members: any[] = [];
    try {
      await connectToDatabase();
      const dbMembers = await UserModel.find({}, '-passwordHash').sort({ createdAt: -1 }).lean();
      members = dbMembers.map((m: any) => ({
        id: m._id.toString(),
        name: m.name,
        email: m.email,
        role: m.role,
        avatar: m.avatar || '',
        createdAt: m.createdAt,
      }));
    } catch {
      // fallback
    }

    // Ensure primary admin is present if DB has not yet been populated
    if (members.length === 0) {
      members = [
        {
          id: DEFAULT_ADMIN.id,
          name: DEFAULT_ADMIN.name,
          email: DEFAULT_ADMIN.email,
          role: DEFAULT_ADMIN.role,
          avatar: DEFAULT_ADMIN.avatar || '',
          createdAt: new Date().toISOString(),
        },
      ];
    }

    return NextResponse.json({ success: true, members });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}

/**
 * POST /api/admin/team
 * Add / invite a new staff team member
 * NOTE: The creator CANNOT provide a profile photo for the new member.
 * Each member has exclusive individual permission to upload their own photo upon logging in.
 */
export async function POST(req: NextRequest) {
  try {
    const currentAdmin = await getAuthenticatedAdmin();
    if (!currentAdmin) {
      return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
    }

    if (currentAdmin.role !== 'superadmin' && currentAdmin.role !== 'admin') {
      return NextResponse.json(
        { success: false, error: 'Permission denied: Only Superadmins and Admins can add team members.' },
        { status: 403 }
      );
    }

    const { name, email, password, role } = await req.json();

    if (!name || !email || !password) {
      return NextResponse.json(
        { success: false, error: 'Name, email, and password are required.' },
        { status: 400 }
      );
    }

    const cleanEmail = email.trim().toLowerCase();

    await connectToDatabase();

    const existing = await UserModel.findOne({ email: cleanEmail });
    if (existing) {
      return NextResponse.json(
        { success: false, error: 'A staff member with this email address already exists.' },
        { status: 400 }
      );
    }

    const passwordHash = await hashPassword(password);
    const validRole = ['superadmin', 'admin', 'manager'].includes(role) ? role : 'admin';

    // Intentionally empty avatar: member must upload their own photo when signed in
    const newMember = await UserModel.create({
      name: name.trim(),
      email: cleanEmail,
      passwordHash,
      role: validRole,
      avatar: '',
    });

    return NextResponse.json({
      success: true,
      member: {
        id: newMember._id.toString(),
        name: newMember.name,
        email: newMember.email,
        role: newMember.role,
        avatar: '',
      },
      message: `${name} has been added to the team. They can now log in and upload their own profile photo.`,
    });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}

/**
 * PUT /api/admin/team
 * STRICT PRIVACY GUARD:
 * Explicitly rejects any attempt by one person to change another member's profile photo.
 */
export async function PUT() {
  return NextResponse.json(
    {
      success: false,
      error:
        'Access Denied: One person cannot modify another member\'s profile photo. Every staff member must upload and manage their own profile photo from their personal session.',
    },
    { status: 403 }
  );
}

/**
 * DELETE /api/admin/team?id=...
 * Remove a staff member account (superadmin only)
 */
export async function DELETE(req: NextRequest) {
  try {
    const currentAdmin = await getAuthenticatedAdmin();
    if (!currentAdmin) {
      return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
    }

    if (currentAdmin.role !== 'superadmin') {
      return NextResponse.json(
        { success: false, error: 'Permission denied: Only Superadmins can remove team members.' },
        { status: 403 }
      );
    }

    const { searchParams } = new URL(req.url);
    const memberId = searchParams.get('id');

    if (!memberId) {
      return NextResponse.json({ success: false, error: 'Member ID is required.' }, { status: 400 });
    }

    await connectToDatabase();
    const targetUser = await UserModel.findById(memberId);

    if (!targetUser) {
      return NextResponse.json({ success: false, error: 'Member not found.' }, { status: 404 });
    }

    if (targetUser.email.toLowerCase() === currentAdmin.email.toLowerCase()) {
      return NextResponse.json(
        { success: false, error: 'You cannot delete your own active administrator account.' },
        { status: 400 }
      );
    }

    await UserModel.findByIdAndDelete(memberId);

    return NextResponse.json({
      success: true,
      message: `Team member ${targetUser.name} has been removed.`,
    });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}
