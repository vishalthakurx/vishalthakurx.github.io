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
