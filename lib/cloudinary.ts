import { v2 as cloudinary } from 'cloudinary';

// Configure Cloudinary once globally
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME || 'pwjyb57h',
  api_key: process.env.CLOUDINARY_API_KEY || '283621376386371',
  api_secret: process.env.CLOUDINARY_API_SECRET || 'Dx_8igxSSBkim76Sw-8su7XDPnY',
  secure: true,
});

export interface CloudinaryUploadResult {
  url: string;
  secure_url: string;
  public_id: string;
  format: string;
  width?: number;
  height?: number;
  bytes?: number;
}

/**
 * Upload an image (base64, data URI, or remote URL) directly to Cloudinary.
 *
 * @param imageString base64 string, data URI, or remote URL
 * @param folder folder within Cloudinary (defaults to 'abhi-gifts/uploads')
 * @param publicId optional custom public ID
 */
export async function uploadToCloudinary(
  imageString: string,
  folder: string = 'abhi-gifts/uploads',
  publicId?: string
): Promise<CloudinaryUploadResult> {
  // Ensure imageString is formatted properly as a data URI if it's pure base64
  let dataUri = imageString;
  if (!imageString.startsWith('data:') && !imageString.startsWith('http://') && !imageString.startsWith('https://')) {
    dataUri = `data:image/jpeg;base64,${imageString}`;
  }

  const result = await cloudinary.uploader.upload(dataUri, {
    folder,
    public_id: publicId,
    resource_type: 'image',
    overwrite: true,
    // Enable auto quality and format delivery optimizations
    quality: 'auto',
    fetch_format: 'auto',
  });

  return {
    url: result.url,
    secure_url: result.secure_url,
    public_id: result.public_id,
    format: result.format,
    width: result.width,
    height: result.height,
    bytes: result.bytes,
  };
}

export default cloudinary;
