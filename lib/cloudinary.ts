import { v2 as cloudinary } from 'cloudinary';

// Configure Cloudinary safely without hardcoded fallback credentials
const cloudName = process.env.CLOUDINARY_CLOUD_NAME || '';
const apiKey = process.env.CLOUDINARY_API_KEY || '';
const apiSecret = process.env.CLOUDINARY_API_SECRET || '';

if (cloudName && apiKey && apiSecret) {
  cloudinary.config({
    cloud_name: cloudName,
    api_key: apiKey,
    api_secret: apiSecret,
    secure: true,
  });
}

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
  if (!process.env.CLOUDINARY_CLOUD_NAME || !process.env.CLOUDINARY_API_KEY || !process.env.CLOUDINARY_API_SECRET) {
    throw new Error('Cloudinary environment variables (CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET) are not configured.');
  }

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
