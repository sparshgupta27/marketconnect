// Simplified payment utilities for college project
// No real payment gateway - just demo/mock functionality

export interface PaymentResponse {
  payment_id: string;
  order_id: string;
  status: 'success' | 'failed';
}

// For backward compatibility
export interface RazorpayResponse {
  razorpay_payment_id: string;
  razorpay_order_id?: string;
  razorpay_signature?: string;
}

// Format amount in INR currency
export const formatAmount = (amount: number): string => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
};

// Mock payment validation - for demo purposes
export const validatePaymentResponse = (response: RazorpayResponse): boolean => {
  return !!response.razorpay_payment_id;
};

// Generate order ID
export const generateOrderId = (type: 'individual' | 'group' = 'individual'): string => {
  const prefix = type === 'individual' ? 'ORD' : 'GRP';
  const timestamp = Date.now();
  const random = Math.floor(Math.random() * 1000);
  return `${prefix}-${timestamp}-${random}`;
};

// Calculate delivery charges based on distance
export const calculateDeliveryCharge = (
  distance: number,
  baseCharge: number = 50,
  perKmCharge: number = 5
): number => {
  if (distance <= 5) return baseCharge;
  return baseCharge + Math.ceil(distance - 5) * perKmCharge;
};

// Calculate tax (GST 5%)
export const calculateTax = (amount: number, taxRate: number = 0.05): number => {
  return Math.round(amount * taxRate);
};

// Calculate group discount
export const calculateGroupDiscount = (
  amount: number,
  discountPercentage: string
): number => {
  const discount = parseInt(discountPercentage.replace('%', ''));
  return Math.round(amount * (discount / 100));
};

// Payment method configurations (for UI display)
export const PAYMENT_METHODS = {
  cod: {
    name: "Cash on Delivery",
    description: "Pay when you receive the order",
    icon: "truck",
    available: true,
  },
  demo: {
    name: "Demo Payment",
    description: "Simulated payment for testing",
    icon: "credit-card",
    available: true,
  },
};
