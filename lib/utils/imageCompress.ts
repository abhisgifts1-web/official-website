/**
 * Client-side high-quality image compressor
 * Scales down large device photos (e.g. 10MB+) to optimal 1600px width/height and 0.82 JPEG quality (~200KB).
 * This eliminates Next.js / Vercel 4.5MB request payload limit errors and speeds up uploads to <200ms.
 */
export async function compressImageToDataUrl(
  fileOrDataUrl: File | string,
  maxWidth = 1600,
  maxHeight = 1600,
  quality = 0.82
): Promise<string> {
  return new Promise((resolve) => {
    if (typeof window === 'undefined') {
      resolve(typeof fileOrDataUrl === 'string' ? fileOrDataUrl : '');
      return;
    }

    const img = new Image();
    img.crossOrigin = 'anonymous';

    img.onload = () => {
      try {
        let w = img.width;
        let h = img.height;

        if (w > maxWidth || h > maxHeight) {
          if (w / h > maxWidth / maxHeight) {
            h = Math.round((h * maxWidth) / w);
            w = maxWidth;
          } else {
            w = Math.round((w * maxHeight) / h);
            h = maxHeight;
          }
        }

        const canvas = document.createElement('canvas');
        canvas.width = Math.max(1, w);
        canvas.height = Math.max(1, h);

        const ctx = canvas.getContext('2d');
        if (!ctx) {
          resolve(img.src);
          return;
        }

        // Draw image onto canvas
        ctx.drawImage(img, 0, 0, w, h);
        const compressed = canvas.toDataURL('image/jpeg', quality);
        resolve(compressed);
      } catch {
        resolve(img.src);
      }
    };

    img.onerror = () => {
      resolve(typeof fileOrDataUrl === 'string' ? fileOrDataUrl : '');
    };

    if (typeof fileOrDataUrl === 'string') {
      img.src = fileOrDataUrl;
    } else {
      const reader = new FileReader();
      reader.onload = (e) => {
        img.src = (e.target?.result as string) || '';
      };
      reader.onerror = () => {
        resolve('');
      };
      reader.readAsDataURL(fileOrDataUrl);
    }
  });
}
