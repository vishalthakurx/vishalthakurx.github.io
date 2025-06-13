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
    const analyticsChartCanvas = document.getElementById('analytics-chart');
    const refreshAnalyticsBtn = document.getElementById('refresh-analytics');
    const resetAnalyticsBtn = document.getElementById('reset-analytics');
    const settingsForm = document.getElementById('settings-form');
    const themeSelect = document.getElementById('theme-select');
    const notificationsToggle = document.getElementById('notifications-toggle');

    // Demo credentials
    const ADMIN_USER = "admin";
    const ADMIN_PASS = "password123";
    const SUPER_ADMIN_USER = "cobra";
    const SUPER_ADMIN_PASS = "1234";
    let isSuperAdmin = false;

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
    function getAnalytics() {
        return JSON.parse(localStorage.getItem('admin-analytics') ||
            JSON.stringify({
                labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
                users: [5, 7, 8, 6, 10, 12, 9],
                products: [2, 3, 1, 4, 2, 5, 3],
                sessions: [3, 4, 5, 2, 6, 7, 5]
            })
        );
    }
    function setAnalytics(data) {
        localStorage.setItem('admin-analytics', JSON.stringify(data));
    }
    function getSettings() {
        return JSON.parse(localStorage.getItem('admin-settings') ||
            JSON.stringify({ theme: "light", notifications: true })
        );
    }
    function setSettings(settings) {
        localStorage.setItem('admin-settings', JSON.stringify(settings));
    }

    // Render functions
    function renderUsers() {
        userList.innerHTML = '';
        getUsers().forEach((user, idx) => {
            const li = document.createElement('li');
            li.textContent = user;
            const del = document.createElement('button');
            del.textContent = 'Delete';
            del.className = 'btn-danger';
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
            del.className = 'btn-danger';
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
        // Simulate active sessions as random between 1 and 10
        if (totalSessions) totalSessions.textContent = Math.floor(Math.random() * 10) + 1;
    }

    // Analytics
    let analyticsChart;
    function renderAnalytics() {
        const data = getAnalytics();
        if (analyticsChart) analyticsChart.destroy();
        analyticsChart = new Chart(analyticsChartCanvas, {
            type: 'line',
            data: {
                labels: data.labels,
                datasets: [
                    {
                        label: 'Users',
                        data: data.users,
                        borderColor: '#232946',
                        backgroundColor: 'rgba(35,41,70,0.1)',
                        tension: 0.4
                    },
                    {
                        label: 'Products',
                        data: data.products,
                        borderColor: '#eebbc3',
                        backgroundColor: 'rgba(238,187,195,0.1)',
                        tension: 0.4
                    },
                    {
                        label: 'Sessions',
                        data: data.sessions,
                        borderColor: '#ff4b5c',
                        backgroundColor: 'rgba(255,75,92,0.1)',
                        tension: 0.4
                    }
                ]
            },
            options: {
                responsive: true,
                plugins: {
                    legend: { display: true, position: 'top' },
                    title: { display: false }
                },
                scales: {
                    y: { beginAtZero: true }
                }
            }
        });
    }
    function refreshAnalytics() {
        // Simulate new analytics data
        const data = getAnalytics();
        data.users = data.users.map(() => Math.floor(Math.random() * 15) + 1);
        data.products = data.products.map(() => Math.floor(Math.random() * 7) + 1);
        data.sessions = data.sessions.map(() => Math.floor(Math.random() * 10) + 1);
        setAnalytics(data);
        renderAnalytics();
    }
    function resetAnalytics() {
        setAnalytics({
            labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
            users: [0, 0, 0, 0, 0, 0, 0],
            products: [0, 0, 0, 0, 0, 0, 0],
            sessions: [0, 0, 0, 0, 0, 0, 0]
        });
        renderAnalytics();
    }

    // Settings
    function loadSettings() {
        const settings = getSettings();
        themeSelect.value = settings.theme;
        notificationsToggle.checked = settings.notifications;
        document.body.classList.remove('theme-light', 'theme-dark');
        document.body.classList.add('theme-' + settings.theme);
    }
    settingsForm && settingsForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const theme = themeSelect.value;
        const notifications = notificationsToggle.checked;
        setSettings({ theme, notifications });
        loadSettings();
        alert('Settings saved!');
    });

    // Login logic
    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const username = document.getElementById('admin-username').value;
        const password = document.getElementById('admin-password').value;
        if (
            (username === ADMIN_USER && password === ADMIN_PASS) ||
            (username === SUPER_ADMIN_USER && password === SUPER_ADMIN_PASS)
        ) {
            isSuperAdmin = (username === SUPER_ADMIN_USER);
            loginSection.classList.add('hidden');
            dashboardSection.classList.remove('hidden');
            renderUsers();
            renderProducts();
            updateDashboard();
            renderAnalytics();
            loadSettings();
            // Show super admin badge if logged in as super admin
            if (isSuperAdmin) {
                let badge = document.getElementById('super-admin-badge');
                if (!badge) {
                    badge = document.createElement('div');
                    badge.id = 'super-admin-badge';
                    badge.textContent = 'Super Admin';
                    badge.style = 'background:#ff4b5c;color:#fff;padding:6px 16px;border-radius:20px;display:inline-block;margin:10px 0;font-weight:bold;';
                    dashboardSection.prepend(badge);
                }
            } else {
                const badge = document.getElementById('super-admin-badge');
                if (badge) badge.remove();
            }
        } else {
            alert('Invalid credentials');
        }
    });

    // Password visibility toggle
    document.getElementById('toggle-password').addEventListener('click', function() {
        const pwd = document.getElementById('admin-password');
        const icon = document.getElementById('toggle-password-icon');
        if (pwd.type === 'password') {
            pwd.type = 'text';
            icon.classList.remove('fa-eye');
            icon.classList.add('fa-eye-slash');
        } else {
            pwd.type = 'password';
            icon.classList.remove('fa-eye-slash');
            icon.classList.add('fa-eye');
        }
    });

    // Username validation feedback
    document.getElementById('admin-username').addEventListener('input', function(e) {
        const input = e.target;
        const help = document.getElementById('username-help');
        if (!input.validity.valid) {
            help.style.color = 'red';
        } else {
            help.style.color = '';
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
        addUserBtn.addEventListener('click', function() {
            window.showAdminModal('Add User', [
                { label: 'Username', id: 'modal-username', type: 'text', required: true, pattern: '^[a-zA-Z0-9_]{4,16}$' },
                { label: 'Email', id: 'modal-email', type: 'email', required: true }
            ], function(formData) {
                alert('User added: ' + JSON.stringify(formData));
            });
        });
    }

    // Product CRUD
    if (addProductBtn) {
        addProductBtn.addEventListener('click', function() {
            window.showAdminModal('Add Product', [
                { label: 'Product Name', id: 'modal-product-name', type: 'text', required: true },
                { label: 'Price', id: 'modal-product-price', type: 'number', required: true, min: 0 }
            ], function(formData) {
                alert('Product added: ' + JSON.stringify(formData));
            });
        });
    }

    // Analytics controls
    if (refreshAnalyticsBtn) {
        refreshAnalyticsBtn.addEventListener('click', () => {
            refreshAnalytics();
        });
    }
    if (resetAnalyticsBtn) {
        resetAnalyticsBtn.addEventListener('click', () => {
            if (confirm('Reset all analytics data?')) {
                resetAnalytics();
            }
        });
    }

    // On load, apply theme if already set
    loadSettings();
});
