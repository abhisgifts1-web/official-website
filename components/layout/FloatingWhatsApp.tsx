'use client';

import React from 'react';
import { usePathname } from 'next/navigation';
import SmartSupportWidget from '@/components/support/SmartSupportWidget';

export default function FloatingWhatsApp() {
  const pathname = usePathname();

  // Hide floating customer support widget on admin dashboard & portal routes
  if (pathname?.startsWith('/admin')) {
    return null;
  }

  return <SmartSupportWidget />;
}
