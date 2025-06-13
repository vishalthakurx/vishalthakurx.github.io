export async function processUPIPayment(upiId, amount) {
    try {
        // Simulate UPI payment processing
        console.log(`Processing UPI payment for UPI ID: ${upiId}, Amount: ${amount}`);
        // Replace this with actual API call to payment gateway
        const response = await fakeUPIPaymentGateway(upiId, amount);
        return response.success ? "Payment Successful" : "Payment Failed";
    } catch (error) {
        console.error("Error processing UPI payment:", error);
        return "Payment Failed";
    }
}

async function fakeUPIPaymentGateway(upiId, amount) {
    // Simulated API response
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve({ success: true });
        }, 2000);
    });
}
