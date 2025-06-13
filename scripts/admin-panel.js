document.addEventListener('DOMContentLoaded', () => {
    // Elements
    const loginSection = document.getElementById('admin-login-section');
    const loginForm = document.getElementById('admin-login-form');
    const dashboardSection = document.getElementById('admin-dashboard');
    const logoutBtn = document.getElementById('logout-btn');
    const userList = document.getElementById('user-list');
    const addUserBtn = document.getElementById('add-user-btn');
    const productList = document.getElementById('product-list');
    const addProductBtn = document.getElementById('add-product-btn');
    const totalUsers = document.getElementById('dashboard-total-users');
    const totalProducts = document.getElementById('dashboard-total-products');
    const totalSessions = document.getElementById('dashboard-active-sessions');

    // Utility functions for localStorage
    function getData(key, fallback = []) {
        try {
            return JSON.parse(localStorage.getItem(key)) || fallback;
        } catch {
            return fallback;
        }
    }
    function setData(key, value) {
        localStorage.setItem(key, JSON.stringify(value));
    }

    // --- User Management ---
    function renderUsers() {
        const users = getData('admin_users');
        userList.innerHTML = '';
        users.forEach((user, idx) => {
            const li = document.createElement('li');
            li.innerHTML = `
                <span><b>${user.username}</b> (${user.role})</span>
                <span>
                    <button onclick="editUser(${idx})"><i class="fa fa-edit"></i></button>
                    <button onclick="deleteUser(${idx})"><i class="fa fa-trash"></i></button>
                </span>
            `;
            userList.appendChild(li);
        });
        updateDashboard();
    }
    window.editUser = function(idx) {
        showModal('Edit User', [
            { label: 'Username', id: 'username', type: 'text', value: getData('admin_users')[idx].username, required: true },
            { label: 'Role', id: 'role', type: 'text', value: getData('admin_users')[idx].role, required: true }
        ], (fields) => {
            const users = getData('admin_users');
            users[idx].username = fields.username;
            users[idx].role = fields.role;
            setData('admin_users', users);
            renderUsers();
        });
    };
    window.deleteUser = function(idx) {
        if (confirm('Delete this user?')) {
            const users = getData('admin_users');
            users.splice(idx, 1);
            setData('admin_users', users);
            renderUsers();
        }
    };
    addUserBtn.onclick = function() {
        showModal('Add User', [
            { label: 'Username', id: 'username', type: 'text', required: true },
            { label: 'Role', id: 'role', type: 'text', required: true }
        ], (fields) => {
            const users = getData('admin_users');
            users.push({ username: fields.username, role: fields.role });
            setData('admin_users', users);
            renderUsers();
        });
    };

    // --- Product Management ---
    function renderProducts() {
        const products = getData('admin_products');
        productList.innerHTML = '';
        products.forEach((product, idx) => {
            const li = document.createElement('li');
            li.innerHTML = `
                <span><b>${product.name}</b> ($${product.price})</span>
                <span>
                    <button onclick="editProduct(${idx})"><i class="fa fa-edit"></i></button>
                    <button onclick="deleteProduct(${idx})"><i class="fa fa-trash"></i></button>
                </span>
            `;
            productList.appendChild(li);
        });
        updateDashboard();
    }
    window.editProduct = function(idx) {
        showModal('Edit Product', [
            { label: 'Name', id: 'name', type: 'text', value: getData('admin_products')[idx].name, required: true },
            { label: 'Price', id: 'price', type: 'number', value: getData('admin_products')[idx].price, required: true }
        ], (fields) => {
            const products = getData('admin_products');
            products[idx].name = fields.name;
            products[idx].price = parseFloat(fields.price);
            setData('admin_products', products);
            renderProducts();
        });
    };
    window.deleteProduct = function(idx) {
        if (confirm('Delete this product?')) {
            const products = getData('admin_products');
            products.splice(idx, 1);
            setData('admin_products', products);
            renderProducts();
        }
    };
    addProductBtn.onclick = function() {
        showModal('Add Product', [
            { label: 'Name', id: 'name', type: 'text', required: true },
            { label: 'Price', id: 'price', type: 'number', required: true }
        ], (fields) => {
            const products = getData('admin_products');
            products.push({ name: fields.name, price: parseFloat(fields.price) });
            setData('admin_products', products);
            renderProducts();
        });
    };

    // --- Dashboard Stats ---
    function updateDashboard() {
        totalUsers.textContent = getData('admin_users').length;
        totalProducts.textContent = getData('admin_products').length;
        totalSessions.textContent = 1; // Only admin session for demo
    }

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

    // --- Initial Data (for demo) ---
    if (!localStorage.getItem('admin_users')) {
        setData('admin_users', [
            { username: 'cobra', role: 'admin' },
            { username: 'alice', role: 'editor' }
        ]);
    }
    if (!localStorage.getItem('admin_products')) {
        setData('admin_products', [
            { name: 'Product A', price: 19.99 },
            { name: 'Product B', price: 29.99 }
        ]);
    }

    // --- Initial Render ---
    if (userList) renderUsers();
    if (productList) renderProducts();
    updateDashboard();
});
