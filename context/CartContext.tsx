'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { CartItem, Coupon } from '@/types';
import { INITIAL_SETTINGS } from '@/lib/data/settings';

interface CartContextType {
  items: CartItem[];
  cartCount: number;
  subtotal: number;
  shippingFee: number;
  discountAmount: number;
  totalAmount: number;
  appliedCoupon: Coupon | null;
  couponError: string | null;
  freeShippingThreshold: number;
  freeShippingProgress: number;
  isCartOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
  addToCart: (item: Omit<CartItem, 'id'>, openDrawer?: boolean) => void;
  removeFromCart: (itemId: string) => void;
  updateQuantity: (itemId: string, quantity: number) => void;
  applyCoupon: (code: string) => Promise<{ success: boolean; message: string }>;
  removeCoupon: () => void;
  clearCart: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

const STORAGE_KEY = 'abhi_gifts_cart_v1';
const COUPON_KEY = 'abhi_gifts_coupon_v1';

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [appliedCoupon, setAppliedCoupon] = useState<Coupon | null>(null);
  const [couponError, setCouponError] = useState<string | null>(null);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [hydrated, setHydrated] = useState(false);

  const freeShippingThreshold = INITIAL_SETTINGS.freeShippingThreshold;

  // Hydrate from localStorage on client mount
  useEffect(() => {
    try {
      const storedItems = localStorage.getItem(STORAGE_KEY) || localStorage.getItem('bwd_cart_v1');
      if (storedItems) {
        setItems(JSON.parse(storedItems));
      }
      const storedCoupon = localStorage.getItem(COUPON_KEY) || localStorage.getItem('bwd_coupon_v1');
      if (storedCoupon) {
        setAppliedCoupon(JSON.parse(storedCoupon));
      }
    } catch (e) {
      console.warn('Failed to restore cart from storage', e);
    }
    setHydrated(true);
  }, []);

  // Persist to localStorage whenever items change
  useEffect(() => {
    if (!hydrated) return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch (e) {
      console.warn('Failed to save cart to storage', e);
    }
  }, [items, hydrated]);

  // Persist applied coupon
  useEffect(() => {
    if (!hydrated) return;
    try {
      if (appliedCoupon) {
        localStorage.setItem(COUPON_KEY, JSON.stringify(appliedCoupon));
      } else {
        localStorage.removeItem(COUPON_KEY);
      }
    } catch (e) {
      console.warn('Failed to persist coupon', e);
    }
  }, [appliedCoupon, hydrated]);

  const cartCount = items.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = items.reduce((sum, item) => sum + item.unitPrice * item.quantity, 0);

  // Recalculate discount
  let discountAmount = 0;
  if (appliedCoupon) {
    if (subtotal >= appliedCoupon.minOrderValue) {
      if (appliedCoupon.discountType === 'percentage') {
        const rawDisc = (subtotal * appliedCoupon.discountValue) / 100;
        discountAmount = appliedCoupon.maxDiscount ? Math.min(rawDisc, appliedCoupon.maxDiscount) : rawDisc;
      } else {
        discountAmount = appliedCoupon.discountValue;
      }
      discountAmount = Math.min(discountAmount, subtotal);
    } else {
      // Order subtotal fell below requirement; auto-remove or zero out
      discountAmount = 0;
    }
  }

  // Free delivery for every product across the entire website
  const shippingFee = 0;
  const totalAmount = Math.max(0, subtotal - discountAmount);
  const freeShippingProgress = 0;

  const openCart = () => setIsCartOpen(true);
  const closeCart = () => setIsCartOpen(false);

  const addToCart = (newItemData: Omit<CartItem, 'id'>, openDrawer: boolean = false) => {
    setItems((prev) => {
      // If it has customization (uploaded photo), generate unique entry so items don't merge incorrectly
      const isCustom = Boolean(newItemData.customization);
      const existingIdx = prev.findIndex(
        (it) =>
          !isCustom &&
          it.productId === newItemData.productId &&
          it.variantId === newItemData.variantId
      );

      if (existingIdx > -1) {
        const updated = [...prev];
        updated[existingIdx].quantity += newItemData.quantity;
        return updated;
      } else {
        const uniqueId = `item-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`;
        return [...prev, { ...newItemData, id: uniqueId }];
      }
    });

    if (openDrawer) {
      setIsCartOpen(true);
    }
  };

  const removeFromCart = (itemId: string) => {
    setItems((prev) => prev.filter((it) => it.id !== itemId));
  };

  const updateQuantity = (itemId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(itemId);
      return;
    }
    setItems((prev) =>
      prev.map((it) => (it.id === itemId ? { ...it, quantity: Math.min(10, quantity) } : it))
    );
  };

  const applyCoupon = async (code: string): Promise<{ success: boolean; message: string }> => {
    setCouponError(null);
    try {
      const res = await fetch('/api/coupons/validate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code, subtotal }),
      });
      const data = await res.json();

      if (!res.ok || !data.valid) {
        const msg = data.message || 'Invalid or expired coupon code.';
        setCouponError(msg);
        return { success: false, message: msg };
      }

      setAppliedCoupon(data.coupon);
      return { success: true, message: data.message };
    } catch {
      const fallbackMsg = 'Failed to apply coupon. Please check connection.';
      setCouponError(fallbackMsg);
      return { success: false, message: fallbackMsg };
    }
  };

  const removeCoupon = () => {
    setAppliedCoupon(null);
    setCouponError(null);
  };

  const clearCart = () => {
    setItems([]);
    setAppliedCoupon(null);
  };

  return (
    <CartContext.Provider
      value={{
        items,
        cartCount,
        subtotal,
        shippingFee,
        discountAmount,
        totalAmount,
        appliedCoupon,
        couponError,
        freeShippingThreshold,
        freeShippingProgress,
        isCartOpen,
        openCart,
        closeCart,
        addToCart,
        removeFromCart,
        updateQuantity,
        applyCoupon,
        removeCoupon,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}
