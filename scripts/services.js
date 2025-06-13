// Dummy data for services (should be fetched from backend or localStorage in real app)
const services = [
    {
        id: 1,
        name: "Website Development",
        description: "Custom website design and development tailored to your business needs.",
        basePrice: 5000,
        milestones: [
            { label: "Requirement Analysis", percent: 20 },
            { label: "Design & Development", percent: 50 },
            { label: "Testing & Deployment", percent: 30 }
        ]
    },
    {
        id: 2,
        name: "Mobile App Development",
        description: "Native and cross-platform mobile app solutions.",
        basePrice: 10000,
        milestones: [
            { label: "Prototype", percent: 15 },
            { label: "Development", percent: 60 },
            { label: "Launch", percent: 25 }
        ]
    }
    // Add more services as needed
];

function renderServices() {
    const container = document.getElementById('services-list');
    container.innerHTML = '';
    services.forEach(service => {
        const div = document.createElement('div');
        div.className = 'service-card';
        div.innerHTML = `
            <h4>${service.name}</h4>
            <p>${service.description}</p>
            <button class="avail-service-btn" data-id="${service.id}">Avail Service</button>
        `;
        container.appendChild(div);
    });
    document.querySelectorAll('.avail-service-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            openServiceModal(this.dataset.id);
        });
    });
}

function openServiceModal(serviceId) {
    const service = services.find(s => s.id == serviceId);
    if (!service) return;
    document.getElementById('service-modal-title').textContent = service.name;
    document.getElementById('service-modal-details').innerHTML = `<p>${service.description}</p>`;
    document.getElementById('requirement-details').value = '';
    document.getElementById('pricing-estimate').textContent = '';
    document.getElementById('proceed-project-btn').classList.add('hidden');
    document.getElementById('milestone-section').classList.add('hidden');
    document.getElementById('service-modal').classList.remove('hidden');
    document.getElementById('service-modal').dataset.serviceId = service.id;
}

document.getElementById('close-service-modal').onclick = function() {
    document.getElementById('service-modal').classList.add('hidden');
};

document.getElementById('estimate-pricing-btn').onclick = function() {
    const serviceId = document.getElementById('service-modal').dataset.serviceId;
    const service = services.find(s => s.id == serviceId);
    const req = document.getElementById('requirement-details').value.trim();
    if (!req) {
        alert('Please enter your requirements.');
        return;
    }
    // Simple pricing logic: basePrice + 10% per 100 chars of requirement
    const extra = Math.ceil(req.length / 100) * 0.1 * service.basePrice;
    const estimate = service.basePrice + extra;
    document.getElementById('pricing-estimate').textContent = `Estimated Price: ₹${estimate.toLocaleString()}`;
    document.getElementById('proceed-project-btn').classList.remove('hidden');
};

document.getElementById('service-requirement-form').onsubmit = function(e) {
    e.preventDefault();
    document.getElementById('milestone-section').classList.remove('hidden');
    const serviceId = document.getElementById('service-modal').dataset.serviceId;
    const service = services.find(s => s.id == serviceId);
    const req = document.getElementById('requirement-details').value.trim();
    // Show milestones
    const estimateText = document.getElementById('pricing-estimate').textContent;
    const estimate = parseInt(estimateText.replace(/\D/g, '')) || service.basePrice;
    const ul = document.getElementById('milestone-list');
    ul.innerHTML = '';
    service.milestones.forEach(m => {
        const amt = Math.round(estimate * m.percent / 100);
        const li = document.createElement('li');
        li.textContent = `${m.label}: ₹${amt.toLocaleString()} (${m.percent}%)`;
        ul.appendChild(li);
    });
    // Show pay advance button for first milestone
    document.getElementById('pay-advance-btn').onclick = function() {
        alert('Advance payment flow goes here (integrate payment gateway).');
    };
};

window.addEventListener('DOMContentLoaded', renderServices);
