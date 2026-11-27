import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://abhisgifts.com';

  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: [
        '/admin',
        '/admin/*',
        '/api/admin',
        '/api/admin/*',
        '/checkout',
      ],
    },
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
