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
        localStorage.setItem('admin-roles', JSON.stringify(roles));
    }

    // Helper for passwords (for demo, not secure)
    function getPasswords() {
        return JSON.parse(localStorage.getItem('admin-passwords') || '{"Alice":"alice123","Bob":"bob123"}');
    }
    function setPasswords(passwords) {
        localStorage.setItem('admin-passwords', JSON.stringify(passwords));
    }

    // Render functions
    function renderUsers() {
        userList.innerHTML = '';
        const users = getUsers();
        const roles = getRoles();
        users.forEach((user, idx) => {
            const li = document.createElement('li');
            li.textContent = user + ' (' + (roles[user] || 'user') + ')';
            // Edit button
            const edit = document.createElement('button');
            edit.textContent = 'Edit';
            edit.className = 'btn-secondary';
            edit.onclick = () => {
                window.showAdminModal('Edit User', [
                    { label: 'Username', id: 'modal-username', type: 'text', required: true, value: user, pattern: '^[a-zA-Z0-9_]{4,16}$' },
                    { label: 'Role', id: 'modal-role', type: 'text', required: true, value: roles[user] || 'user' }
                ], function(formData) {
                    const usersArr = getUsers();
                    usersArr[idx] = formData['modal-username'];
                    setUsers(usersArr);
                    const rolesObj = getRoles();
                    delete rolesObj[user];
                    rolesObj[formData['modal-username']] = formData['modal-role'];
                    setRoles(rolesObj);
                    renderUsers();
                    updateDashboard();
                });
            };
            // Reset password button
            const resetPwd = document.createElement('button');
            resetPwd.textContent = 'Reset Password';
            resetPwd.className = 'btn-secondary';
            resetPwd.onclick = () => {
                window.showAdminModal('Reset Password', [
                    { label: 'New Password', id: 'modal-password', type: 'password', required: true }
                ], function(formData) {
                    const passwords = getPasswords();
                    passwords[user] = formData['modal-password'];
                    setPasswords(passwords);
                    alert('Password reset for ' + user);
                });
            };
            // Delete button
            const del = document.createElement('button');
            del.textContent = 'Delete';
            del.className = 'btn-danger';
            del.onclick = () => {
                const usersArr = getUsers();
                usersArr.splice(idx, 1);
                setUsers(usersArr);
                const rolesObj = getRoles();
                delete rolesObj[user];
                setRoles(rolesObj);
                renderUsers();
                updateDashboard();
            };
            li.appendChild(edit);
            li.appendChild(resetPwd);
            li.appendChild(del);
            userList.appendChild(li);
        });
    }

    function renderProducts() {
        productList.innerHTML = '';
        getProducts().forEach((prod, idx) => {
            const li = document.createElement('li');
            li.textContent = prod;
            // Edit button
            const edit = document.createElement('button');
            edit.textContent = 'Edit';
            edit.className = 'btn-secondary';
            edit.onclick = () => {
                window.showAdminModal('Edit Product', [
                    { label: 'Product Name', id: 'modal-product-name', type: 'text', required: true, value: prod }
                ], function(formData) {
                    const products = getProducts();
                    products[idx] = formData['modal-product-name'];
                    setProducts(products);
                    renderProducts();
                    updateDashboard();
                });
            };
            // Delete button
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
            li.appendChild(edit);
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
                { label: 'Role', id: 'modal-role', type: 'text', required: true, value: 'user' },
                { label: 'Password', id: 'modal-password', type: 'password', required: true }
            ], function(formData) {
                const users = getUsers();
                users.push(formData['modal-username']);
                setUsers(users);
                const roles = getRoles();
                roles[formData['modal-username']] = formData['modal-role'];
                setRoles(roles);
                const passwords = getPasswords();
                passwords[formData['modal-username']] = formData['modal-password'];
                setPasswords(passwords);
                renderUsers();
                updateDashboard();
            });
        });
    }

    // Product CRUD
    if (addProductBtn) {
        addProductBtn.addEventListener('click', function() {
            window.showAdminModal('Add Product', [
                { label: 'Product Name', id: 'modal-product-name', type: 'text', required: true }
            ], function(formData) {
                const products = getProducts();
                products.push(formData['modal-product-name']);
                setProducts(products);
                renderProducts();
                updateDashboard();
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

    // Export/Import Data
    function exportData() {
        const data = {
            users: getUsers(),
            roles: getRoles(),
            passwords: getPasswords(),
            products: getProducts(),
            analytics: getAnalytics(),
            settings: getSettings()
        };
        const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'admin-data-export.json';
        a.click();
        URL.revokeObjectURL(url);
    }
    function importData(file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            try {
                const data = JSON.parse(e.target.result);
                if (data.users) setUsers(data.users);
                if (data.roles) setRoles(data.roles);
                if (data.passwords) setPasswords(data.passwords);
                if (data.products) setProducts(data.products);
                if (data.analytics) setAnalytics(data.analytics);
                if (data.settings) setSettings(data.settings);
                renderUsers();
                renderProducts();
                updateDashboard();
                renderAnalytics();
                loadSettings();
                alert('Import successful!');
            } catch (err) {
                alert('Import failed: ' + err.message);
            }
        };
        reader.readAsText(file);
    }

    // Add export/import buttons to settings section
    if (settingsForm) {
        const exportBtn = document.createElement('button');
        exportBtn.type = 'button';
        exportBtn.className = 'btn-secondary';
        exportBtn.textContent = 'Export Data';
        exportBtn.onclick = exportData;
        settingsForm.appendChild(exportBtn);

        const importInput = document.createElement('input');
        importInput.type = 'file';
        importInput.accept = '.json';
        importInput.style.display = 'none';
        importInput.onchange = function(e) {
            if (e.target.files[0]) importData(e.target.files[0]);
        };
        const importBtn = document.createElement('button');
        importBtn.type = 'button';
        importBtn.className = 'btn-secondary';
        importBtn.textContent = 'Import Data';
        importBtn.onclick = () => importInput.click();
        settingsForm.appendChild(importBtn);
        settingsForm.appendChild(importInput);
    }

    // On load, apply theme if already set
    loadSettings();
});
