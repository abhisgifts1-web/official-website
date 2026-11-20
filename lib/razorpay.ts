import crypto from 'crypto';

export interface CreateOrderParams {
  amount: number; // in INR rupees
  receipt?: string;
  notes?: Record<string, string>;
}

export interface VerifyPaymentParams {
  razorpayOrderId: string;
  razorpayPaymentId: string;
  razorpaySignature?: string;
}

/**
 * Checks if a real Razorpay API key pair is configured in environment variables.
 */
export function hasValidRazorpayKeys(): boolean {
  const keyId = process.env.RAZORPAY_KEY_ID || process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID;
  const keySecret = process.env.RAZORPAY_KEY_SECRET;

  if (!keyId || !keySecret) return false;
  if (keyId.includes('YourTestKey') || keyId.includes('placeholder')) return false;
  if (keySecret.includes('YourRazorpay') || keySecret.includes('placeholder')) return false;

  return true;
}

export function getRazorpayKeyId(): string {
  return (
    process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID ||
    process.env.RAZORPAY_KEY_ID ||
    'rzp_test_placeholder'
  );
}

/**
 * Creates an order either via Razorpay SDK (if keys exist) or via mock order generator.
 */
export async function createRazorpayOrder({ amount, receipt, notes }: CreateOrderParams) {
  const amountInPaise = Math.round(amount * 100);

  if (hasValidRazorpayKeys()) {
    try {
      // Dynamic import to avoid issues if SDK is unavailable
      const Razorpay = (await import('razorpay')).default;
      const instance = new Razorpay({
        key_id: process.env.RAZORPAY_KEY_ID!,
        key_secret: process.env.RAZORPAY_KEY_SECRET!,
      });

      const order = await instance.orders.create({
        amount: amountInPaise,
        currency: 'INR',
        receipt: receipt || `rec_${Date.now()}`,
        notes: notes || {},
      });

      return {
        success: true,
        orderId: order.id,
        amount: order.amount,
        currency: order.currency,
        keyId: getRazorpayKeyId(),
        isMock: false,
      };
    } catch (err: any) {
      console.error('Razorpay SDK error creating order:', err);
      // Fallback to mock order so the checkout never crashes
    }
  }

  // Simulator / Test Mode when API key has not yet been provided by user
  const mockOrderId = `order_sim_${Date.now()}_${Math.floor(1000 + Math.random() * 9000)}`;
  return {
    success: true,
    orderId: mockOrderId,
    amount: amountInPaise,
    currency: 'INR',
    keyId: getRazorpayKeyId(),
    isMock: true,
    notice: 'Running in Razorpay Simulator Mode until live/test API keys are provided.',
  };
}

/**
 * Verifies Razorpay payment signature
 */
export function verifyRazorpaySignature({
  razorpayOrderId,
  razorpayPaymentId,
  razorpaySignature,
}: VerifyPaymentParams): boolean {
  if (!hasValidRazorpayKeys()) {
    // Simulator mode: accepts valid test tokens
    return Boolean(razorpayPaymentId);
  }

  if (!razorpaySignature) return false;

  const secret = process.env.RAZORPAY_KEY_SECRET!;
  const generatedSignature = crypto
    .createHmac('sha256', secret)
    .update(`${razorpayOrderId}|${razorpayPaymentId}`)
    .digest('hex');

  return generatedSignature === razorpaySignature;
}
