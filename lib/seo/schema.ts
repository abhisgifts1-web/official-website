import { Product } from '@/types';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://official-website-drab.vercel.app';

export const BUSINESS_INFO = {
  name: "Abhi's Gifts",
  legalName: "Abhi's Gifts",
  url: SITE_URL,
  logo: `${SITE_URL}/favicon.ico`,
  image: `${SITE_URL}/images/mockups/tirupati-balaji-divine-led-backlit-acrylic-wall-art/primary-square.jpg`,
  telephone: '+91-7780269927',
  whatsapp: '+917780269927',
  email: 'support@abhigifts.com',
  priceRange: '₹₹',
  hasMap: 'https://maps.app.goo.gl/fmGv35KsGabFna9E6?g_st=ac',
  paymentAccepted: 'Cash, UPI, Credit Card, Debit Card, Net Banking',
  currenciesAccepted: 'INR',
  address: {
    '@type': 'PostalAddress',
    streetAddress: '16-11-740/5/A, Gaddiannaram, Dilsukhnagar',
    addressLocality: 'Hyderabad',
    addressRegion: 'Telangana',
    postalCode: '500036',
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
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
      opens: '10:00',
      closes: '20:30',
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
    '@id': `${SITE_URL}/#localbusiness`,
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
      item: item.url.startsWith('http') ? item.url : `${SITE_URL}${item.url}`,
    })),
  };
}

export function getProductSchema(product: Product) {
  const images = product.images && product.images.length > 0
    ? product.images.map((img) => (img.startsWith('http') ? img : `${SITE_URL}${img}`))
    : [];

  const isInStock = product.variants && product.variants.length > 0
    ? product.variants.some((v) => v.inStock)
    : true;

  const schema: Record<string, unknown> = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    '@id': `${SITE_URL}/product/${product.slug}#product`,
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
      url: `${SITE_URL}/product/${product.slug}`,
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
