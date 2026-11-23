import React from 'react';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { fetchOrderById } from '@/lib/store';
import ProfessionalInvoice from '@/components/invoice/ProfessionalInvoice';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

interface Props {
  params: {
    orderId: string;
  };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  return {
    title: `Tax Invoice #${params.orderId} — Abhi's Gifts`,
    description: 'Official Tax Invoice and Purchase Receipt for Abhi Gifts order.',
  };
}

export default async function InvoicePage({ params }: Props) {
  const order = await fetchOrderById(params.orderId);

  if (!order) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-stone-100/70 py-6 sm:py-10 px-2 sm:px-4 print:p-0 print:bg-white">
      <div className="max-w-[850px] mx-auto mb-4 flex items-center justify-between print:hidden px-2">
        <Link
          href={`/order-confirmation/${order.id}`}
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-stone-600 hover:text-stone-950 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Order Confirmation</span>
        </Link>
      </div>

      <ProfessionalInvoice order={order} showPrintButton={true} />
    </div>
  );
}
