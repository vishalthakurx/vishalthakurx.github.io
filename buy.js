import { processUPIPayment } from './upiPayment.js';

// Handles buying logic for different payment methods
export async function handleBuy(productId, paymentMethod, paymentDetails) {
    if (paymentMethod === 'UPI') {
        const { upiId, amount } = paymentDetails;
        if (!upiId || !amount) {
            throw new Error('Missing UPI ID or amount');
        }
        const paymentStatus = await processUPIPayment(upiId, amount);
        console.log(paymentStatus);
        return paymentStatus;
    }
    // Add logic for other payment methods if needed
    throw new Error('Unsupported payment method');
}

// Example usage (for demo/testing):
// handleBuy('product123', 'UPI', { upiId: 'user@upi', amount: 500 }).then(console.log);
