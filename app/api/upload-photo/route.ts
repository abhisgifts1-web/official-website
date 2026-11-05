import { NextRequest, NextResponse } from 'next/server';
import { writeFile, mkdir } from 'fs/promises';
import path from 'path';
import { randomUUID } from 'crypto';
import { connectToDatabase } from '@/lib/db/mongodb';
import CustomPhoto from '@/lib/db/models/CustomPhoto';

// Global memory cache for instant serving across serverless warm instances
declare global {
  // eslint-disable-next-line no-var
  var photoMemoryCache: Map<string, { data: Buffer; mimeType: string }> | undefined;
}
if (!global.photoMemoryCache) {
  global.photoMemoryCache = new Map();
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const image = body?.image;

    if (!image || typeof image !== 'string') {
      return NextResponse.json({ error: 'No image provided' }, { status: 400 });
    }

    // Parse base64 data cleanly without fragile regex
    let mimeType = 'image/jpeg';
    let base64Data = image;

    if (image.startsWith('data:')) {
      const commaIndex = image.indexOf(',');
      if (commaIndex !== -1) {
        const meta = image.substring(0, commaIndex);
        base64Data = image.substring(commaIndex + 1);
        const mimeMatch = meta.match(/data:([^;]+)/);
        if (mimeMatch) {
          mimeType = mimeMatch[1];
        }
      }
    }

    const buffer = Buffer.from(base64Data, 'base64');
    if (!buffer || buffer.length === 0) {
      return NextResponse.json({ error: 'Empty image buffer' }, { status: 400 });
    }

    const ext = mimeType.split('/')[1]?.replace('jpeg', 'jpg').replace('svg+xml', 'svg') || 'jpg';
    const filename = `custom-${Date.now()}-${randomUUID().slice(0, 8)}.${ext}`;

    // 1. Save to in-memory global cache for instant local retrieval
    global.photoMemoryCache?.set(filename, { data: buffer, mimeType });

    // 2. Try saving to local disk (succeeds on local/VPS, ignored if read-only on Vercel)
    try {
      const uploadDir = path.join(process.cwd(), 'public', 'uploads', 'custom-photos');
      await mkdir(uploadDir, { recursive: true });
      await writeFile(path.join(uploadDir, filename), buffer);
    } catch {
      // Ignored on read-only serverless environments
    }

    // 3. Backup upload to public CDN (tmpfiles) for guaranteed universal public access
    let cdnUrl: string | null = null;
    try {
      const form = new FormData();
      form.append('file', new Blob([buffer], { type: mimeType }), filename);
      const tmpRes = await fetch('https://tmpfiles.org/api/v1/upload', {
        method: 'POST',
        body: form,
      });
      if (tmpRes.ok) {
        const tmpJson = await tmpRes.json();
        if (tmpJson?.data?.url) {
          // Convert https://tmpfiles.org/123/file.jpg -> https://tmpfiles.org/dl/123/file.jpg for direct view
          cdnUrl = tmpJson.data.url.replace('tmpfiles.org/', 'tmpfiles.org/dl/');
        }
      }
    } catch (cdnErr) {
      console.warn('CDN backup upload notice:', cdnErr);
    }

    // 4. Save to MongoDB Atlas for permanent storage
    try {
      await connectToDatabase();
      await CustomPhoto.create({
        filename,
        mimeType,
        data: base64Data,
        size: buffer.length,
        cdnUrl: cdnUrl || undefined,
      });
    } catch (dbErr) {
      console.warn('MongoDB Atlas photo save notice:', dbErr);
    }

    // Primary internal route on our domain
    const internalUrl = `/api/uploads/${filename}`;

    return NextResponse.json({
      success: true,
      url: internalUrl,
      cdnUrl,
      filename,
    });
  } catch (err: any) {
    console.error('Upload photo exception:', err);
    return NextResponse.json({ error: err.message || 'Upload failed' }, { status: 500 });
  }
}
