// --- Admin Panel Logic ---

const defaultCredentials = [
    { username: "cobra", password: "1234" },
    { username: "admin", password: "password123" }
];

document.addEventListener('DOMContentLoaded', () => {
    // --- Search Functionality ---
    document.getElementById('search-button').addEventListener('click', () => {
        const query = document.getElementById('search-bar').value.trim();
        if (query) {
            showToast(`Searching for: ${query}`);
            renderSearchResults(query);
        } else {
            showToast("Please enter a search query.", true);
        }
    });

    function renderSearchResults(query) {
        // Simulate search results
        const results = [
            { type: 'User', name: 'cobra' },
            { type: 'Product', name: 'Product A' }
        ].filter(item => item.name.toLowerCase().includes(query.toLowerCase()));
        const resultsDiv = document.getElementById('search-results');
        resultsDiv.innerHTML = results.length
            ? results.map(r => `<div class="search-result"><b>${r.type}:</b> ${r.name}</div>`).join('')
            : `<div class="search-result">No results found for "${query}".</div>`;
    }

    // --- User Management ---
    document.getElementById('add-user').addEventListener('click', async () => {
        showModal('Add User', [
            { label: 'Username', id: 'username', type: 'text', required: true },
            { label: 'Role', id: 'role', type: 'text', required: true }
        ], async (fields) => {
            await addUser(fields.username, fields.role);
            showToast('User added successfully!');
            fetchUsers();
        });
    });

    document.getElementById('remove-user').addEventListener('click', async () => {
        showModal('Remove User', [
            { label: 'Username', id: 'username', type: 'text', required: true }
        ], async (fields) => {
            await removeUser(fields.username);
            showToast('User removed successfully!');
            fetchUsers();
        });
    });

    async function fetchUsers() {
        // Simulate fetching users
        const users = [
            { username: 'cobra', role: 'admin' },
            { username: 'alice', role: 'editor' }
        ];
        const userList = document.getElementById('user-list');
        userList.innerHTML = '';
        users.forEach(user => {
            const li = document.createElement('li');
            li.textContent = `${user.username} (${user.role})`;
            userList.appendChild(li);
        });
    }

    async function addUser(username, role = 'user') {
        // Simulate adding user
        // In real app, send POST request to backend
        return Promise.resolve();
    }

    async function removeUser(username) {
        // Simulate removing user
        // In real app, send DELETE request to backend
        return Promise.resolve();
    }

    // --- Product Management ---
    document.getElementById('add-product').addEventListener('click', async () => {
        showModal('Add Product', [
            { label: 'Product Name', id: 'name', type: 'text', required: true },
            { label: 'Price', id: 'price', type: 'number', required: true }
        ], async (fields) => {
            await addProduct(fields.name, parseFloat(fields.price));
            showToast('Product added successfully!');
            fetchProducts();
        });
    });

    document.getElementById('edit-product').addEventListener('click', async () => {
        showModal('Edit Product', [
            { label: 'Product Name', id: 'name', type: 'text', required: true },
            { label: 'New Price', id: 'price', type: 'number', required: true }
        ], async (fields) => {
            await editProduct(fields.name, parseFloat(fields.price));
            showToast('Product updated!');
            fetchProducts();
        });
    });

    document.getElementById('delete-product').addEventListener('click', async () => {
        showModal('Delete Product', [
            { label: 'Product Name', id: 'name', type: 'text', required: true }
        ], async (fields) => {
            await deleteProduct(fields.name);
            showToast('Product deleted!');
            fetchProducts();
        });
    });

    async function fetchProducts() {
        // Simulate fetching products
        const products = [
            { name: 'Product A', price: 19.99 },
            { name: 'Product B', price: 29.99 }
        ];
        const productList = document.getElementById('product-list');
        productList.innerHTML = '';
        products.forEach(product => {
            const li = document.createElement('li');
            li.textContent = `${product.name} ($${product.price})`;
            productList.appendChild(li);
        });
    }

    async function addProduct(name, price) {
        // Simulate adding product
        return Promise.resolve();
    }

    async function editProduct(name, price) {
        // Simulate editing product
        return Promise.resolve();
    }

    async function deleteProduct(name) {
        // Simulate deleting product
        return Promise.resolve();
    }

    // --- Settings ---
    document.getElementById('update-settings').addEventListener('click', async () => {
        showModal('Update Settings', [
            { label: 'Theme (light/dark)', id: 'theme', type: 'text', required: true },
            { label: 'Enable Notifications', id: 'notifications', type: 'checkbox' }
        ], async (fields) => {
            await updateSettings(fields.theme, fields.notifications === 'on');
            showToast('Settings updated!');
        });
    });

    async function updateSettings(theme, notifications) {
        // Simulate updating settings
        document.body.setAttribute('data-theme', theme);
        // Optionally handle notifications
        return Promise.resolve();
    }

    // --- Analytics ---
    async function loadAnalyticsData() {
        const analyticsData = document.getElementById('analytics-data');
        analyticsData.innerHTML = '<p>Fetching analytics data...</p>';
        // Simulate analytics data
        setTimeout(() => {
            analyticsData.innerHTML = `<p>{"pageViews": 1234, "interactions": {"click": 56, "view": 78}}</p>`;
        }, 800);
    }
    loadAnalyticsData();

    // --- Analytics Chart ---
    function renderAnalyticsCharts() {
        const analytics = { pageViews: 1234, interactions: { click: 56, view: 78 } };
        const pvCtx = document.getElementById('analytics-pageviews-chart');
        if (pvCtx) {
            new Chart(pvCtx, {
                type: 'doughnut',
                data: {
                    labels: ['Page Views'],
                    datasets: [{
                        data: [analytics.pageViews],
                        backgroundColor: ['#3498db']
                    }]
                },
                options: {
                    plugins: { legend: { display: false } },
                    responsive: true
                }
            });
        }
        const intCtx = document.getElementById('analytics-interactions-chart');
        if (intCtx) {
            new Chart(intCtx, {
                type: 'bar',
                data: {
                    labels: Object.keys(analytics.interactions),
                    datasets: [{
                        label: 'Interactions',
                        data: Object.values(analytics.interactions),
                        backgroundColor: '#2ecc71'
                    }]
                },
                options: {
                    responsive: true,
                    scales: { y: { beginAtZero: true } }
                }
            });
        }
    }
    renderAnalyticsCharts();

    // --- Profile Section ---
    function updateProfile() {
        const profileSection = document.getElementById('profile');
        if (profileSection) {
            const profileImage = document.createElement('img');
            profileImage.src = '1748782323973.jpg';
            profileImage.alt = 'Vishal Thakur';
            profileImage.style = 'max-width: 100%; height: auto; border-radius: 50%; box-shadow: 0 2px 8px #0002;';
            const profileDescription = document.createElement('p');
            profileDescription.textContent = 'This is an image of Vishal Thakur.';
            profileSection.innerHTML = '';
            profileSection.appendChild(profileImage);
            profileSection.appendChild(profileDescription);
        }
    }
    updateProfile();

    // --- Admin Login ---
    document.getElementById('admin-login-form').addEventListener('submit', (e) => {
        e.preventDefault();
        const username = document.getElementById('admin-username').value.trim();
        const password = document.getElementById('admin-password').value.trim();
        if (!username || !password) {
            showToast("Please fill in both username and password.", true);
            return;
        }
        const valid = defaultCredentials.some(
            cred => cred.username === username && cred.password === password
        );
        if (valid) {
            showToast("Login successful!");
            const dashboard = document.getElementById('admin-dashboard');
            if (dashboard) {
                dashboard.classList.remove('hidden');
            }
        } else {
            showToast("Invalid credentials!", true);
        }
    });

    // --- Admin Panel Access ---
    const adminPanel = document.getElementById('admin-panel');
    if (adminPanel && !isAdmin()) {
        adminPanel.style.display = 'none';
    }

    // --- View Counter ---
    function incrementViewCounter() {
        let count = parseInt(localStorage.getItem('adminViewCounter') || '0', 10);
        count += 1;
        localStorage.setItem('adminViewCounter', count);
        const counterElem = document.getElementById('dashboard-view-counter');
        if (counterElem) counterElem.textContent = count;
    }
    function displayViewCounter() {
        const counterElem = document.getElementById('dashboard-view-counter');
        if (counterElem) {
            let count = parseInt(localStorage.getItem('adminViewCounter') || '0', 10);
            counterElem.textContent = count;
        }
    }
    incrementViewCounter();
    displayViewCounter();

    // --- Initial Data Render ---
    fetchUsers();
    fetchProducts();
});

// --- Modal Helper ---
function showModal(title, fields, onSave) {
    const overlay = document.getElementById('modal-overlay');
    const modalTitle = document.getElementById('modal-title');
    const modalForm = document.getElementById('modal-form');
    modalTitle.textContent = title;
    modalForm.innerHTML = '';
    fields.forEach(field => {
        const div = document.createElement('div');
        div.className = 'form-group';
        div.innerHTML = `
            <label for="modal-${field.id}">${field.label}</label>
            <input type="${field.type}" id="modal-${field.id}" ${field.required ? 'required' : ''} value="${field.value || ''}">
        `;
        modalForm.appendChild(div);
    });
    overlay.classList.remove('hidden');
    document.getElementById('modal-save-btn').onclick = function() {
        const values = {};
        let valid = true;
        fields.forEach(field => {
            const val = modalForm.querySelector(`#modal-${field.id}`).value;
            if (field.required && !val) valid = false;
            values[field.id] = val;
        });
        if (!valid) return;
        overlay.classList.add('hidden');
        onSave(values);
    };
    document.getElementById('modal-cancel-btn').onclick = function() {
        overlay.classList.add('hidden');
    };
}

// --- Toast Helper ---
function showToast(message, isError = false) {
    let toast = document.getElementById('admin-toast');
    if (!toast) {
        toast = document.createElement('div');
        toast.id = 'admin-toast';
        toast.style.position = 'fixed';
        toast.style.bottom = '30px';
        toast.style.right = '30px';
        toast.style.padding = '1rem 2rem';
        toast.style.background = isError ? '#e74c3c' : '#27ae60';
        toast.style.color = '#fff';
        toast.style.borderRadius = '8px';
        toast.style.fontWeight = 'bold';
        toast.style.zIndex = '9999';
        document.body.appendChild(toast);
    }
    toast.textContent = message;
    toast.style.background = isError ? '#e74c3c' : '#27ae60';
    toast.style.display = 'block';
    setTimeout(() => { toast.style.display = 'none'; }, 2500);
}

// --- Admin Token Check ---
const ADMIN_TOKEN = 'YOUR_SECRET_TOKEN';
function isAdmin() {
    const params = new URLSearchParams(window.location.search);
    return params.get('admin') === ADMIN_TOKEN;
}
