// Dummy admin service management logic

const adminServices = [
    { id: 1, name: "Website Development", description: "Custom websites", linkedProducts: [1] },
    { id: 2, name: "Mobile App Development", description: "Apps for iOS/Android", linkedProducts: [2] }
    // Add more as needed
];

function renderAdminServices() {
    const ul = document.getElementById('service-list');
    ul.innerHTML = '';
    adminServices.forEach(service => {
        const li = document.createElement('li');
        li.innerHTML = `<strong>${service.name}</strong>: ${service.description} <br>
            Linked Products: ${service.linkedProducts.join(', ')}
            <button class="edit-service-btn" data-id="${service.id}">Edit</button>`;
        ul.appendChild(li);
    });
}

document.getElementById('add-service-btn').onclick = function() {
    alert('Service add/edit modal logic goes here.');
};

window.addEventListener('DOMContentLoaded', renderAdminServices);
