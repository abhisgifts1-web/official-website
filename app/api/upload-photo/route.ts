import { NextRequest, NextResponse } from 'next/server';
import { writeFile, mkdir } from 'fs/promises';
import path from 'path';
import { randomUUID } from 'crypto';

export async function POST(req: NextRequest) {
  try {
    const { image } = await req.json();

    if (!image || typeof image !== 'string') {
      return NextResponse.json({ error: 'No image provided' }, { status: 400 });
    }

    // Parse data URL: "data:<mime>;base64,<data>"
    const matches = image.match(/^data:([A-Za-z-+/]+);base64,(.+)$/);
    if (!matches || matches.length !== 3) {
      return NextResponse.json({ error: 'Invalid image format' }, { status: 400 });
    }

    const mimeType = matches[1];
    const base64Data = matches[2];
    const ext = mimeType.split('/')[1]?.replace('jpeg', 'jpg') || 'jpg';

    const buffer = Buffer.from(base64Data, 'base64');

    // Limit to 10MB
    if (buffer.length > 10 * 1024 * 1024) {
      return NextResponse.json({ error: 'Image too large (max 10MB)' }, { status: 400 });
    }

    const filename = `${Date.now()}-${randomUUID()}.${ext}`;
    const uploadDir = path.join(process.cwd(), 'public', 'uploads', 'custom-photos');

    await mkdir(uploadDir, { recursive: true });
    await writeFile(path.join(uploadDir, filename), buffer);

    const url = `/uploads/custom-photos/${filename}`;
    return NextResponse.json({ url, filename });
  } catch (err) {
    console.error('Upload error:', err);
    return NextResponse.json({ error: 'Upload failed' }, { status: 500 });
  }
}
