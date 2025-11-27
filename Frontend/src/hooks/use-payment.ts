import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';

export interface PaymentData {
  type: 'individual' | 'group';
  orderId: string;
  total: number;
  description: string;
  supplier?: any;
  product?: string;
  group?: any;
  quantity: number;
}

export interface UserDetails {
  name: string;
  email: string;
  phone: string;
}

export interface PaymentResponse {
  payment_id: string;
  order_id: string;
  status: 'success' | 'failed';
}

// Simplified payment hook for college project - no real payment gateway
export const usePayment = () => {
  const [isProcessing, setIsProcessing] = useState(false);
  const { toast } = useToast();

  const formatAmount = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR'
    }).format(amount);
  };

  const processPayment = async (
    paymentData: PaymentData,
    userDetails: UserDetails,
    onSuccess?: (response: PaymentResponse) => void,
    onError?: (error: Error) => void
  ) => {
    console.log('Processing payment (demo mode):', paymentData);
    setIsProcessing(true);

    // Simulate payment processing delay
    setTimeout(() => {
      const response: PaymentResponse = {
        payment_id: `pay_demo_${Date.now()}`,
        order_id: paymentData.orderId,
        status: 'success'
      };

      const successMessage = paymentData.type === 'individual'
        ? `Order placed for ${paymentData.product} - ${formatAmount(paymentData.total)}`
        : `Joined ${paymentData.group?.product || 'group'} order - ${formatAmount(paymentData.total)}`;

      toast({
        title: "✅ Order Placed Successfully!",
        description: successMessage,
      });

      setIsProcessing(false);
      onSuccess?.(response);
    }, 1500);
  };

  // Alias for backward compatibility
  const processRazorpayPayment = processPayment;
  const processCODPayment = async (paymentData: PaymentData, onSuccess?: () => void) => {
    setIsProcessing(true);
    setTimeout(() => {
      toast({
        title: "✅ COD Order Placed!",
        description: `Order ID: ${paymentData.orderId}. Pay on delivery.`,
      });
      setIsProcessing(false);
      onSuccess?.();
    }, 1000);
  };

  return {
    processPayment,
    processRazorpayPayment,
    processCODPayment,
    isProcessing,
    isLoading: false,
    error: null,
    formatAmount
  };
};

export type { PaymentResponse as RazorpayResponse };
