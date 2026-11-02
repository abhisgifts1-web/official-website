import { Product } from '@/types';

export const BUSINESS_INFO = {
  name: "Abhi's Gifts",
  legalName: "Abhi's Gifts",
  url: 'https://abhigifts.com',
  logo: 'https://abhigifts.com/favicon.ico',
  image: 'https://abhigifts.com/images/mockups/tirupati-balaji-divine-led-backlit-acrylic-wall-art/primary-square.jpg',
  telephone: '+91-7780269927',
  whatsapp: '+917780269927',
  email: 'support@abhigifts.com',
  priceRange: '₹₹',
  paymentAccepted: 'Cash, UPI, Credit Card, Debit Card, Net Banking',
  currenciesAccepted: 'INR',
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'Main Road, Near Dilsukhnagar Metro Station, Dilsukhnagar',
    addressLocality: 'Hyderabad',
    addressRegion: 'Telangana',
    postalCode: '500060',
    addressCountry: 'IN',
  },
  geo: {
    '@type': 'GeoCoordinates',
    latitude: 17.3688,
    longitude: 78.5307,
  },
  openingHoursSpecification: [
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
      opens: '10:00',
      closes: '21:00',
    },
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Sunday'],
      opens: '11:00',
      closes: '20:00',
    },
  ],
  areaServed: [
    { '@type': 'City', name: 'Hyderabad' },
    { '@type': 'AdministrativeArea', name: 'Dilsukhnagar' },
    { '@type': 'AdministrativeArea', name: 'Kothapet' },
    { '@type': 'AdministrativeArea', name: 'LB Nagar' },
    { '@type': 'City', name: 'Secunderabad' },
    { '@type': 'AdministrativeArea', name: 'Telangana' },
    { '@type': 'Country', name: 'India' },
  ],
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: 'Acrylic Photo Frames & Personalized Gifts',
    itemListElement: [
      {
        '@type': 'OfferCatalog',
        name: 'Acrylic Photo Frames in Hyderabad',
      },
      {
        '@type': 'OfferCatalog',
        name: 'LED Photo Frames in Hyderabad',
      },
      {
        '@type': 'OfferCatalog',
        name: 'Customized Photo Frames Dilsukhnagar',
      },
      {
        '@type': 'OfferCatalog',
        name: 'Glitter Photo Frames Hyderabad',
      },
      {
        '@type': 'OfferCatalog',
        name: 'Personalized Gifts in Hyderabad',
      },
    ],
  },
};

export function getLocalBusinessSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': ['Store', 'HomeGoodsStore', 'LocalBusiness'],
    '@id': 'https://abhigifts.com/#localbusiness',
    name: BUSINESS_INFO.name,
    legalName: BUSINESS_INFO.legalName,
    alternateName: ["Abhi's Gifts", 'Abhi Gifts Hyderabad', 'Photo Frame Shop Dilsukhnagar'],
    url: BUSINESS_INFO.url,
    logo: BUSINESS_INFO.logo,
    image: BUSINESS_INFO.image,
    telephone: BUSINESS_INFO.telephone,
    email: BUSINESS_INFO.email,
    priceRange: BUSINESS_INFO.priceRange,
    paymentAccepted: BUSINESS_INFO.paymentAccepted,
    currenciesAccepted: BUSINESS_INFO.currenciesAccepted,
    address: BUSINESS_INFO.address,
    geo: BUSINESS_INFO.geo,
    openingHoursSpecification: BUSINESS_INFO.openingHoursSpecification,
    areaServed: BUSINESS_INFO.areaServed,
    hasOfferCatalog: BUSINESS_INFO.hasOfferCatalog,
  };
}

export function getBreadcrumbSchema(items: { name: string; url: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url.startsWith('http') ? item.url : `https://abhigifts.com${item.url}`,
    })),
  };
}

export function getProductSchema(product: Product) {
  const images = product.images && product.images.length > 0
    ? product.images.map((img) => (img.startsWith('http') ? img : `https://abhigifts.com${img}`))
    : [];

  const isInStock = product.variants && product.variants.length > 0
    ? product.variants.some((v) => v.inStock)
    : true;

  const schema: Record<string, unknown> = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    '@id': `https://abhigifts.com/product/${product.slug}#product`,
    name: product.title,
    description: product.shortDescription || product.subtitle || product.title,
    image: images,
    sku: product.id,
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
      availability: isInStock ? 'https://schema.org/InStock' : 'https://schema.org/OutOfStock',
      itemCondition: 'https://schema.org/NewCondition',
      seller: {
        '@type': 'Organization',
        name: "Abhi's Gifts",
      },
    },
  };

  if (product.reviewCount && product.reviewCount > 0) {
    schema.aggregateRating = {
      '@type': 'AggregateRating',
      ratingValue: product.rating,
      reviewCount: product.reviewCount,
      bestRating: '5',
      worstRating: '1',
    };
  }

  return schema;
}

export function getFaqSchema(faqs: { question: string; answer: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };
}
