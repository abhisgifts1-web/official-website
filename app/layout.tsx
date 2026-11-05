import type { Metadata, Viewport } from 'next';
import { Poppins, Cinzel, Marcellus, Playfair_Display, Plus_Jakarta_Sans } from 'next/font/google';
import './globals.css';
import { CartProvider } from '@/context/CartContext';
import { WishlistProvider } from '@/context/WishlistContext';
import AnnouncementBar from '@/components/layout/AnnouncementBar';
import Header from '@/components/layout/Header';
import ConditionalFooter from '@/components/layout/ConditionalFooter';
import CartDrawer from '@/components/cart/CartDrawer';
import FloatingWhatsApp from '@/components/layout/FloatingWhatsApp';
import { getLocalBusinessSchema } from '@/lib/seo/schema';

const poppinsFont = Poppins({
  subsets: ['latin'],
  variable: '--font-poppins',
  display: 'swap',
  weight: ['300', '400', '500', '600', '700', '800'],
});

const cinzelFont = Cinzel({
  subsets: ['latin'],
  variable: '--font-cinzel',
  display: 'swap',
  weight: ['400', '500', '600', '700', '800', '900'],
});

const marcellusFont = Marcellus({
  subsets: ['latin'],
  variable: '--font-marcellus',
  display: 'swap',
  weight: '400',
});

const serifFont = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-serif',
  display: 'swap',
});

const sansFont = Plus_Jakarta_Sans({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://abhigifts.com'),
  title: {
    default: 'Acrylic Photo Frames in Hyderabad | Abhi\'s Gifts',
    template: '%s | Abhi\'s Gifts — Hyderabad',
  },
  description:
    'Looking for premium acrylic photo frames in Hyderabad or Dilsukhnagar? Abhi\'s Gifts manufactures cast cast acrylic frames, LED photo frames, glitter frames, and personalized gifts with WhatsApp proofing & fast delivery.',
  keywords: [
    'Acrylic Photo Frames in Hyderabad',
    'LED Photo Frames in Hyderabad',
    'Photo Frames in Dilsukhnagar',
    'Customized Photo Frames Hyderabad',
    'Acrylic Photo Frames Dilsukhnagar',
    'Glitter Photo Frames Hyderabad',
    'Personalized Gifts in Hyderabad',
    'Photo Frame Shop Near Me',
    'LED Acrylic Frames Hyderabad',
    'Customized Gifts in Dilsukhnagar',
    'Abhi\'s Gifts',
    'Abhi Gifts',
    'Tirupati Balaji Wall Art',
    'Acrylic LED Wall Art',
    'Devotional Wall Art Hyderabad',
    'Pooja Room Wall Art',
  ],
  authors: [{ name: "Abhi's Gifts" }],
  creator: "Abhi's Gifts",
  alternates: {
    canonical: 'https://abhigifts.com',
  },
  other: {
    'geo.region': 'IN-TG',
    'geo.placename': 'Hyderabad; Dilsukhnagar',
    'geo.position': '17.3688;78.5307',
    'ICBM': '17.3688, 78.5307',
  },
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    url: 'https://abhigifts.com',
    siteName: "Abhi's Gifts",
    title: 'Acrylic Photo Frames in Hyderabad | Abhi\'s Gifts',
    description:
      'Discover premium acrylic photo frames, LED illuminated photo frames, glitter frames, and personalized gifts in Hyderabad & Dilsukhnagar. Handcrafted with museum-grade cast acrylic.',
    images: [
      {
        url: 'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=1200&q=80',
        width: 1200,
        height: 630,
        alt: "Abhi's Gifts - Acrylic Photo Frames Hyderabad",
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Acrylic Photo Frames in Hyderabad | Abhi\'s Gifts',
    description: 'Custom acrylic photo frames, LED backlit frames & personalized gifts in Hyderabad & Dilsukhnagar.',
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon-32x32.png',
    apple: '/images/brand/logo-badge-icon.png',
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  themeColor: '#121212',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const localBusinessSchema = getLocalBusinessSchema();

  return (
    <html
      lang="en"
      className={`${poppinsFont.variable} ${cinzelFont.variable} ${marcellusFont.variable} ${serifFont.variable} ${sansFont.variable}`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
        />
      </head>
      <body className="min-h-screen flex flex-col bg-white text-stone-900 antialiased selection:bg-[#FACC15]/40 selection:text-stone-900">
        <CartProvider>
          <WishlistProvider>
            <AnnouncementBar />
            <Header />
            <main className="flex-1">{children}</main>
            <ConditionalFooter />
            <CartDrawer />
            <FloatingWhatsApp />
          </WishlistProvider>
        </CartProvider>
      </body>
    </html>
  );
}
