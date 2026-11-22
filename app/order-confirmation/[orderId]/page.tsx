import React from 'react';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { fetchOrderById } from '@/lib/store';
import ConfirmationClient from './ConfirmationClient';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

interface Props {
  params: {
    orderId: string;
  };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  return {
    title: `Order Confirmation #${params.orderId} — Abhi Gifts`,
    description: 'Thank you for your order. View order breakdown and receipt details.',
  };
}

export default async function OrderConfirmationPage({ params }: Props) {
  const order = await fetchOrderById(params.orderId);

  if (!order) {
    notFound();
  }

  return <ConfirmationClient order={order} />;
}
