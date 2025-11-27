/**
 * Simple Receipt Generator for College Project
 * Generates a printable receipt without external PDF libraries
 */

interface ReceiptData {
  paymentId: string;
  orderId: string;
  amount: number;
  orderType: 'individual' | 'group';
  productName: string;
  supplierName?: string;
  quantity: number;
  pricePerKg: number;
  subtotal: number;
  tax: number;
  deliveryCharge?: number;
  groupDiscount?: number;
  customerDetails: {
    name: string;
    email: string;
    phone: string;
    address?: string;
  };
  businessDetails?: {
    name: string;
    gstNumber?: string;
    address?: string;
    email?: string;
    phone?: string;
    businessType?: string;
  };
  timestamp: Date;
  transactionStatus: 'successful' | 'pending' | 'failed';
}

export class ReceiptGenerator {
  /**
   * Download receipt as a simple text file
   */
  static async downloadReceipt(data: ReceiptData): Promise<void> {
    const receiptText = this.generateReceiptText(data);
    
    // Create blob and download
    const blob = new Blob([receiptText], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `receipt_${data.orderId}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }

  /**
   * Generate receipt as text
   */
  static generateReceiptText(data: ReceiptData): string {
    const line = '='.repeat(50);
    const date = new Date(data.timestamp).toLocaleString();
    
    return `
${line}
            MARKETCONNECT
          Payment Receipt
${line}

Order ID: ${data.orderId}
Payment ID: ${data.paymentId}
Date: ${date}
Status: ${data.transactionStatus.toUpperCase()}

${line}
CUSTOMER DETAILS
${line}
Name: ${data.customerDetails.name}
Email: ${data.customerDetails.email}
Phone: ${data.customerDetails.phone}
${data.customerDetails.address ? `Address: ${data.customerDetails.address}` : ''}

${line}
ORDER DETAILS
${line}
Product: ${data.productName}
${data.supplierName ? `Supplier: ${data.supplierName}` : ''}
Type: ${data.orderType}
Quantity: ${data.quantity} kg
Price per kg: ₹${data.pricePerKg}

${line}
PAYMENT SUMMARY
${line}
Subtotal:        ₹${data.subtotal.toFixed(2)}
Tax (5%):        ₹${data.tax.toFixed(2)}
${data.deliveryCharge ? `Delivery:        ₹${data.deliveryCharge.toFixed(2)}` : ''}
${data.groupDiscount ? `Discount:       -₹${data.groupDiscount.toFixed(2)}` : ''}
${line}
TOTAL:           ₹${data.amount.toFixed(2)}
${line}

Thank you for using MarketConnect!

${line}
    `.trim();
  }

  /**
   * Generate receipt as blob (for compatibility)
   */
  static async generateReceipt(data: ReceiptData): Promise<Blob> {
    const receiptText = this.generateReceiptText(data);
    return new Blob([receiptText], { type: 'text/plain' });
  }

  /**
   * Print receipt
   */
  static printReceipt(data: ReceiptData): void {
    const receiptText = this.generateReceiptText(data);
    const printWindow = window.open('', '_blank');
    if (printWindow) {
      printWindow.document.write(`<pre style="font-family: monospace;">${receiptText}</pre>`);
      printWindow.document.close();
      printWindow.print();
    }
  }
}
