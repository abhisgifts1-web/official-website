import { Coupon } from '@/types';

export const INITIAL_COUPONS: Coupon[] = [
  {
    code: 'WELCOME10',
    discountType: 'percentage',
    discountValue: 10,
    minOrderValue: 1999,
    maxDiscount: 1000,
    description: 'Get 10% instant discount on your first sacred art purchase (min. ₹1,999)',
    validFrom: '2026-01-01',
    expiresAt: '2027-12-31',
    active: true,
  },
  {
    code: 'ABHI500',
    discountType: 'fixed',
    discountValue: 500,
    minOrderValue: 3999,
    description: 'Flat ₹500 off on LED Backlit Wall Art orders above ₹3,999',
    validFrom: '2026-01-01',
    expiresAt: '2027-12-31',
    active: true,
  },
  {
    code: 'FESTIVE15',
    discountType: 'percentage',
    discountValue: 15,
    minOrderValue: 4999,
    maxDiscount: 1500,
    description: 'Special 15% festive discount for orders above ₹4,999',
    validFrom: '2026-01-01',
    expiresAt: '2027-12-31',
    active: true,
  },
];
