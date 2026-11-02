import React from 'react';
import { Metadata } from 'next';
import { INITIAL_CATEGORIES } from '@/lib/data/categories';
import CategoryExplorer from '@/components/category/CategoryExplorer';

export const metadata: Metadata = {
  title: 'Art Collections & Categories — Abhi Gifts',
  description:
    'Explore our curated collections of God Wall Art, LED Backlit Frames, Custom Photo Frames, and Modern Abstract Acrylic Panels.',
};

export default function CollectionsPage() {
  return <CategoryExplorer initialCategories={INITIAL_CATEGORIES} />;
}
