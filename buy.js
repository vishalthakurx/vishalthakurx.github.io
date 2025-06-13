import { processUPIPayment } from './upiPayment.js';

async function handleBuy(productId, paymentMethod, paymentDetails) {
    if (paymentMethod === 'UPI') {
        const { upiId, amount } = paymentDetails;
        const paymentStatus = await processUPIPayment(upiId, amount);
        console.log(paymentStatus);
        return paymentStatus;
    }
}

// Example usage:
handleBuy('product123', 'UPI', { upiId: 'user@upi', amount: 500 });
