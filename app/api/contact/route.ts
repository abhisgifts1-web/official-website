import { NextRequest, NextResponse } from 'next/server';
import { createEnquiry, getAllEnquiries } from '@/lib/store';
import { getAuthenticatedAdmin } from '@/lib/auth';

export async function GET() {
  try {
    const admin = await getAuthenticatedAdmin();
    if (!admin) {
      return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
    }
    const enquiries = getAllEnquiries();
    return NextResponse.json({ success: true, enquiries });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email, phone, subject, message } = body;

    if (!name || !email || !message) {
      return NextResponse.json(
        { success: false, error: 'Name, email, and message are required' },
        { status: 400 }
      );
    }

    const enquiry = createEnquiry({
      name,
      email,
      phone: phone || '',
      subject: subject || 'General Enquiry',
      message,
    });

    return NextResponse.json({ success: true, enquiry }, { status: 201 });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}
