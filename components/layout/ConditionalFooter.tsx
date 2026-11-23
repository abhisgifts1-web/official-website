'use client';

import { usePathname } from 'next/navigation';
import Footer from '@/components/layout/Footer';

export default function ConditionalFooter() {
  const pathname = usePathname();

  // Hide footer on admin routes and during checkout to keep flow focused
  if (pathname?.startsWith('/admin') || pathname === '/checkout') {
    return null;
  }

  return <Footer />;
}
