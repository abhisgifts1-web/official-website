import React from 'react';
import { Metadata } from 'next';
import SacredArtAtelier from '@/components/home/SacredArtAtelier';

export const metadata: Metadata = {
  title: "The Sacred Art Atelier • Artisanal Craftsmanship | Abhi's Gifts",
  description:
    'Experience the cinematic creation of luxury Hindu devotional photo frames. 4mm diamond-cut cast acrylic, archival micro-pigments, 24K gold foil embellishments, and calibrated 3000K warm LED halos handcrafted in Hyderabad.',
  alternates: {
    canonical: 'https://abhigifts.com/atelier',
  },
  openGraph: {
    title: "The Sacred Art Atelier • Artisanal Craftsmanship | Abhi's Gifts",
    description:
      'Immerse in the luxury craftsmanship of consecrated Lord Ganesha, Tirupati Balaji, Lord Krishna, and Ayodhya Ram Mandir 3D LED photo frames.',
    url: 'https://abhigifts.com/atelier',
    images: [
      {
        url: '/images/mockups/lord-ganesha-vighnaharta-divine-led-backlit-acrylic-art/primary-square.jpg',
        width: 1200,
        height: 1200,
        alt: 'The Sacred Art Atelier - Lord Ganesha Frame',
      },
    ],
  },
};

export default function AtelierPage() {
  return (
    <main className="min-h-screen bg-[#0D0D0E]">
      <SacredArtAtelier />
    </main>
  );
}
