import { NextRequest, NextResponse } from 'next/server';
import { writeFile, mkdir } from 'fs/promises';
import path from 'path';
import { randomUUID } from 'crypto';
import { connectToDatabase } from '@/lib/db/mongodb';
import CustomPhoto from '@/lib/db/models/CustomPhoto';
import { uploadToCloudinary } from '@/lib/cloudinary';

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
    const folder = body?.folder || 'abhi-gifts/uploads';

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

    // 1. Primary: Upload to Cloudinary (Permanent High-Speed CDN Storage)
    let cloudinaryUrl: string | null = null;
    try {
      const uploadRes = await uploadToCloudinary(image, folder);
      if (uploadRes?.secure_url) {
        cloudinaryUrl = uploadRes.secure_url;
      }
    } catch (cloudErr) {
      console.warn('Cloudinary upload warning:', cloudErr);
    }

    // 2. Save to in-memory global cache for instant local retrieval fallback
    global.photoMemoryCache?.set(filename, { data: buffer, mimeType });

    // 3. Try saving to local disk (succeeds on local/VPS, ignored if read-only on Vercel)
    try {
      const uploadDir = path.join(process.cwd(), 'public', 'uploads', 'custom-photos');
      await mkdir(uploadDir, { recursive: true });
      await writeFile(path.join(uploadDir, filename), buffer);
    } catch {
      // Ignored on read-only serverless environments
    }

    // 4. Fallback backup upload to public CDN (tmpfiles) if Cloudinary wasn't available
    let cdnUrl: string | null = cloudinaryUrl;
    if (!cdnUrl) {
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
            cdnUrl = tmpJson.data.url.replace('tmpfiles.org/', 'tmpfiles.org/dl/');
          }
        }
      } catch (cdnErr) {
        console.warn('CDN backup upload notice:', cdnErr);
      }
    }

    // 5. Save metadata to MongoDB Atlas (store URL reference rather than bulky base64 if Cloudinary succeeded)
    try {
      await connectToDatabase();
      await CustomPhoto.create({
        filename,
        mimeType,
        // Only keep base64 in MongoDB as a fallback if Cloudinary failed, to avoid exceeding 512MB MongoDB limit
        data: cloudinaryUrl ? undefined : base64Data,
        size: buffer.length,
        cdnUrl: cloudinaryUrl || cdnUrl || undefined,
      });
    } catch (dbErr) {
      console.warn('MongoDB Atlas photo save notice:', dbErr);
    }

    // Primary URL to return: Cloudinary CDN URL, or fallback to internal route
    const internalUrl = `/api/uploads/${filename}`;
    const finalUrl = cloudinaryUrl || cdnUrl || internalUrl;

    return NextResponse.json({
      success: true,
      url: finalUrl,
      cdnUrl: finalUrl,
      cloudinaryUrl,
      filename,
    });
  } catch (err: any) {
    console.error('Upload photo exception:', err);
    return NextResponse.json({ error: err.message || 'Upload failed' }, { status: 500 });
  }
}
