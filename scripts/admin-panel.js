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

    // Demo credentials
    const ADMIN_USER = "admin";
    const ADMIN_PASS = "password123";

    // Demo data (localStorage for persistence)
    function getUsers() {
        return JSON.parse(localStorage.getItem('admin-users') || '["Alice","Bob"]');
    }
    function setUsers(users) {
        localStorage.setItem('admin-users', JSON.stringify(users));
    }
    function getProducts() {
        return JSON.parse(localStorage.getItem('admin-products') || '["Product A","Product B"]');
    }
    function setProducts(products) {
        localStorage.setItem('admin-products', JSON.stringify(products));
    }

    // Render functions
    function renderUsers() {
        userList.innerHTML = '';
        getUsers().forEach((user, idx) => {
            const li = document.createElement('li');
            li.textContent = user;
            const del = document.createElement('button');
            del.textContent = 'Delete';
            del.onclick = () => {
                const users = getUsers();
                users.splice(idx, 1);
                setUsers(users);
                renderUsers();
                updateDashboard();
            };
            li.appendChild(del);
            userList.appendChild(li);
        });
    }
    function renderProducts() {
        productList.innerHTML = '';
        getProducts().forEach((prod, idx) => {
            const li = document.createElement('li');
            li.textContent = prod;
            const del = document.createElement('button');
            del.textContent = 'Delete';
            del.onclick = () => {
                const products = getProducts();
                products.splice(idx, 1);
                setProducts(products);
                renderProducts();
                updateDashboard();
            };
            li.appendChild(del);
            productList.appendChild(li);
        });
    }
    function updateDashboard() {
        totalUsers.textContent = getUsers().length;
        totalProducts.textContent = getProducts().length;
    }

    // Login logic
    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const username = document.getElementById('admin-username').value;
        const password = document.getElementById('admin-password').value;
        if (username === ADMIN_USER && password === ADMIN_PASS) {
            loginSection.classList.add('hidden');
            dashboardSection.classList.remove('hidden');
            renderUsers();
            renderProducts();
            updateDashboard();
        } else {
            alert('Invalid credentials');
        }
    });

    // Logout
    if (logoutBtn) {
        logoutBtn.addEventListener('click', () => {
            dashboardSection.classList.add('hidden');
            loginSection.classList.remove('hidden');
            loginForm.reset();
        });
    }

    // User CRUD
    if (addUserBtn) {
        addUserBtn.addEventListener('click', () => {
            const name = prompt('Enter new user name:');
            if (name) {
                const users = getUsers();
                users.push(name);
                setUsers(users);
                renderUsers();
                updateDashboard();
            }
        });
    }

    // Product CRUD
    if (addProductBtn) {
        addProductBtn.addEventListener('click', () => {
            const name = prompt('Enter new product name:');
            if (name) {
                const products = getProducts();
                products.push(name);
                setProducts(products);
                renderProducts();
                updateDashboard();
            }
        });
    }
});
