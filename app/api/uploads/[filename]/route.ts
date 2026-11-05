import { NextRequest } from 'next/server';
import { connectToDatabase } from '@/lib/db/mongodb';
import CustomPhoto from '@/lib/db/models/CustomPhoto';
import fs from 'fs';
import path from 'path';

// Global memory cache for immediate access across serverless warm instances
declare global {
  // eslint-disable-next-line no-var
  var photoMemoryCache: Map<string, { data: Buffer; mimeType: string }> | undefined;
}
if (!global.photoMemoryCache) {
  global.photoMemoryCache = new Map();
}

export async function GET(
  req: NextRequest,
  { params }: { params: { filename: string } }
) {
  try {
    const filename = params.filename;

    if (!filename) {
      return new Response('File not specified', { status: 400 });
    }

    // 1. Check Memory Cache
    const memCached = global.photoMemoryCache?.get(filename);
    if (memCached) {
      return new Response(new Uint8Array(memCached.data), {
        headers: {
          'Content-Type': memCached.mimeType || 'image/jpeg',
          'Cache-Control': 'public, max-age=31536000, immutable',
        },
      });
    }

    // 2. Check Local Filesystem (if writable / persistent)
    try {
      const localPath = path.join(process.cwd(), 'public', 'uploads', 'custom-photos', filename);
      if (fs.existsSync(localPath)) {
        const fileBuffer = fs.readFileSync(localPath);
        const ext = path.extname(filename).toLowerCase().replace('.', '');
        const mime = ext === 'png' ? 'image/png' : ext === 'webp' ? 'image/webp' : 'image/jpeg';
        return new Response(new Uint8Array(fileBuffer), {
          headers: {
            'Content-Type': mime,
            'Cache-Control': 'public, max-age=31536000, immutable',
          },
        });
      }
    } catch {
      // Ignored if local filesystem is read-only
    }

    // 3. Query MongoDB Atlas
    try {
      await connectToDatabase();
      const doc = await CustomPhoto.findOne({ filename }).lean();
      if (doc && (doc as any).data) {
        const buffer = Buffer.from((doc as any).data, 'base64');
        global.photoMemoryCache?.set(filename, { data: buffer, mimeType: (doc as any).mimeType || 'image/jpeg' });

        return new Response(new Uint8Array(buffer), {
          headers: {
            'Content-Type': (doc as any).mimeType || 'image/jpeg',
            'Cache-Control': 'public, max-age=31536000, immutable',
            'Content-Disposition': `inline; filename="${filename}"`,
          },
        });
      }
    } catch (dbErr) {
      console.warn('MongoDB photo lookup error:', dbErr);
    }

    return new Response('Image not found', { status: 404 });
  } catch (err: any) {
    console.error('Error serving photo:', err);
    return new Response('Error retrieving image', { status: 500 });
  }
}
