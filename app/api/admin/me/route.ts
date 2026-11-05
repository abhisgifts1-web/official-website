import { NextResponse } from 'next/server';
import { getAuthenticatedAdmin } from '@/lib/auth';
import { connectToDatabase } from '@/lib/db/mongodb';
import { UserModel } from '@/lib/db/models/User';

export async function GET() {
  try {
    const admin = await getAuthenticatedAdmin();
    if (!admin) {
      return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
    }

    // Attempt to fetch fresh avatar from DB
    let freshAvatar = admin.avatar || '';
    let freshName = admin.name;
    try {
      await connectToDatabase();
      const user = await UserModel.findOne({ email: admin.email.toLowerCase() });
      if (user) {
        if (user.avatar) freshAvatar = user.avatar;
        if (user.name) freshName = user.name;
      }
    } catch {
      // ignore
    }

    return NextResponse.json({
      success: true,
      user: {
        ...admin,
        name: freshName,
        avatar: freshAvatar,
      },
    });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}
