document.addEventListener('DOMContentLoaded', () => {
    const buttons = document.querySelectorAll('.buy-now');
    const modal = document.createElement('div');
    modal.id = 'purchase-modal';
    modal.style.display = 'none';
    modal.style.position = 'fixed';
    modal.style.top = '50%';
    modal.style.left = '50%';
    modal.style.transform = 'translate(-50%, -50%)';
    modal.style.background = 'white';
    modal.style.padding = '2rem';
    modal.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.1)';
    modal.style.borderRadius = '8px';
    modal.style.zIndex = '1000';
    modal.innerHTML = `
        <h3>Purchase Confirmation</h3>
        <p id="service-name"></p>
        <button id="confirm-purchase">Confirm</button>
        <button id="cancel-purchase">Cancel</button>
    `;
    document.body.appendChild(modal);

    const serviceNameElement = document.getElementById('service-name');
    const confirmButton = document.getElementById('confirm-purchase');
    const cancelButton = document.getElementById('cancel-purchase');

    buttons.forEach(button => {
        button.addEventListener('click', () => {
            const service = button.getAttribute('data-service');
            serviceNameElement.textContent = `You selected: ${service}.`;
            modal.style.display = 'block';
        });
    });

    confirmButton.addEventListener('click', () => {
        alert('Thank you for your purchase! We will contact you shortly.');
        modal.style.display = 'none';
    });

    cancelButton.addEventListener('click', () => {
        modal.style.display = 'none';
    });
});

function saveThemePreference(theme) {
    localStorage.setItem('theme', theme);
}

function getThemePreference() {
    return localStorage.getItem('theme') || 'light'; // Default to 'light' theme
}

// Add logic to allow UPI payment from the manual input field in #payment-methods
window.initiateUPIPayment = async function () {
    const upiIdInput = document.getElementById('upiId');
    const upiId = upiIdInput ? upiIdInput.value.trim() : '';
    if (!upiId) {
        alert('Please enter your UPI ID.');
        return;
    }
    // For demo, ask for amount
    let amount = prompt('Enter amount to pay:');
    if (!amount) {
        alert('Amount is required.');
        return;
    }
    try {
        // Dynamically import buy.js for modularity
        const { handleBuy } = await import('./buy.js');
        const result = await handleBuy('manual-upi', 'UPI', { upiId, amount });
        alert(result);
    } catch (error) {
        alert('Payment failed: ' + error.message);
    }
};
