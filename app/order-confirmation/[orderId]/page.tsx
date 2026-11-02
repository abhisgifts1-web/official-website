import React from 'react';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getOrderById } from '@/lib/store';
import ConfirmationClient from './ConfirmationClient';

interface Props {
  params: {
    orderId: string;
  };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  return {
    title: `Order Confirmation #${params.orderId} — Abhi Gifts`,
    description: 'Thank you for your order. View order breakdown and track delivery status.',
  };
}

export default function OrderConfirmationPage({ params }: Props) {
  const order = getOrderById(params.orderId);

  if (!order) {
    notFound();
  }

  return <ConfirmationClient order={order} />;
}
