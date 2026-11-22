import React from 'react';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { fetchProductBySlug, fetchLiveProducts, getAllProducts } from '@/lib/store';
import ProductDetailClient from './ProductDetailClient';
import { getBreadcrumbSchema } from '@/lib/seo/schema';

export const dynamic = 'force-dynamic';
export const dynamicParams = true;
export const revalidate = 0;

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
  const cleanSlug = params.slug ? decodeURIComponent(params.slug).trim() : '';
  const product = await fetchProductBySlug(cleanSlug);
  if (!product) {
    return { title: 'Artwork Not Found' };
  }

  const isAcrylic = !product.hasLedBacklight && (product.categorySlug === 'acrylic-photo-frames' || product.categorySlugs?.includes('acrylic-photo-frames'));
  const title = isAcrylic
    ? `${product.title} | 5MM Acrylic Frame — Abhi's Gifts`
    : `${product.title} | Abhi's Gifts`;
  const description = isAcrylic
    ? `${product.title} — 5MM Premium Crystal Clear Acrylic Wall Art. Advanced Direct UV printing, precision square-cut edges, and metal installation studs included. Handcrafted in Hyderabad.`
    : `${product.shortDescription} Handcrafted in Hyderabad with premium acrylic. Safe transit packaging guarantee.`;
  const canonicalUrl = `https://abhigifts.com/product/${product.slug}`;

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

export default async function ProductDetailPage({ params }: Props) {
  const cleanSlug = params.slug ? decodeURIComponent(params.slug).trim() : '';
  const product = await fetchProductBySlug(cleanSlug);

  if (!product) {
    notFound();
  }

  const allProducts = await fetchLiveProducts();
  const sameCategory = allProducts.filter((p) => p.id !== product.id && (p.categorySlug === product.categorySlug || p.deity === product.deity));
  const related = sameCategory.length > 0 ? sameCategory : allProducts.filter((p) => p.id !== product.id).slice(0, 4);

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
