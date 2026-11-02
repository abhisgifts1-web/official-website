import React from 'react';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getProductBySlug, getAllProducts } from '@/lib/store';
import ProductDetailClient from './ProductDetailClient';
import { getBreadcrumbSchema } from '@/lib/seo/schema';

interface Props {
  params: {
    slug: string;
  };
}

export async function generateStaticParams() {
  const products = getAllProducts();
  return products.map((p) => ({
    slug: p.slug,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const product = getProductBySlug(params.slug);
  if (!product) {
    return { title: 'Artwork Not Found' };
  }

  const title = `${product.title} | Abhi's Gifts`;
  const description = `${product.shortDescription} Handcrafted in Hyderabad with 4mm cast acrylic & 24K gold foil. 100% damage-free transit guarantee.`;
  const canonicalUrl = `https://abhigifts.com/product/${params.slug}`;

  return {
    title,
    description,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title,
      description,
      url: canonicalUrl,
      images: [{ url: product.images[0] }],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
    },
  };
}

export default function ProductDetailPage({ params }: Props) {
  const product = getProductBySlug(params.slug);

  if (!product) {
    notFound();
  }

  const allProducts = getAllProducts();
  const related = allProducts.filter(
    (p) => p.id !== product.id && (p.categorySlug === product.categorySlug || p.deity === product.deity)
  );

  const breadcrumbs = [
    { name: 'Home', url: '/' },
    { name: product.categoryName || 'Collections', url: `/category/${product.categorySlug}` },
    { name: product.title, url: `/product/${product.slug}` },
  ];
  const breadcrumbSchema = getBreadcrumbSchema(breadcrumbs);

  // JSON-LD Product Structured Data
  const productSchema: Record<string, unknown> = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    '@id': `https://abhigifts.com/product/${product.slug}#product`,
    name: product.title,
    image: product.images,
    description: product.shortDescription,
    sku: product.variants[0]?.sku || product.id,
    mpn: product.id,
    brand: {
      '@type': 'Brand',
      name: "Abhi's Gifts",
    },
    offers: {
      '@type': 'Offer',
      url: `https://abhigifts.com/product/${product.slug}`,
      priceCurrency: 'INR',
      price: product.basePrice,
      priceValidUntil: '2028-12-31',
      availability: (product.variants?.some((v) => v.inStock) ?? true) ? 'https://schema.org/InStock' : 'https://schema.org/OutOfStock',
      itemCondition: 'https://schema.org/NewCondition',
      seller: {
        '@type': 'Organization',
        name: "Abhi's Gifts",
      },
    },
    ...(product.reviewCount > 0
      ? {
          aggregateRating: {
            '@type': 'AggregateRating',
            ratingValue: product.rating,
            reviewCount: product.reviewCount,
            bestRating: '5',
            worstRating: '1',
          },
        }
      : {}),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }}
      />
      <ProductDetailClient product={product} relatedProducts={related} />
    </>
  );
}
