// Search functionality
const defaultCredentials = [
    { username: "cobra", password: "1234" },
    { username: "admin", password: "password123" }
];

document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('search-button').addEventListener('click', () => {
        const query = document.getElementById('search-bar').value.trim();
        if (query) {
            console.log(`Searching for: ${query}`);
            // Implement search logic here
        } else {
            alert("Please enter a search query.");
        }
    });

    function handleSearch() {
        const query = document.getElementById('search-bar').value;
        document.getElementById('search-results').textContent = `Searching for "${query}"...`;
    }

    function performSearch() {
        const query = document.getElementById('search-bar').value;
        alert(`Performing search for: ${query}`);
    }

    // User management functionality
    document.getElementById('add-user').addEventListener('click', async () => {
        const username = prompt("Enter username to add:");
        if (username) {
            await addUser(username);
        } else {
            alert("Username cannot be empty.");
        }
    });

    document.getElementById('remove-user').addEventListener('click', async () => {
        const username = prompt("Enter username to remove:");
        if (username) {
            await removeUser(username);
        } else {
            alert("Username cannot be empty.");
        }
    });

    function fetchUsers() {
        fetch('http://localhost:3000/api/users')
            .then(response => response.json())
            .then(users => {
                const userList = document.getElementById('user-list');
                userList.innerHTML = '';
                users.forEach(user => {
                    const li = document.createElement('li');
                    li.textContent = user.username; // Fix property name
                    userList.appendChild(li);
                });
            });
    }

    function addUser(username) {
        fetch('http://localhost:3000/api/users', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username }) // Fixed property name
        }).then(() => alert('User added successfully'));
    }

    function removeUser(username) {
        fetch(`http://localhost:3000/api/users/${username}`, { method: 'DELETE' })
            .then(() => alert('User removed successfully'));
    }

    // Product management functionality
    document.getElementById('add-product').addEventListener('click', async () => {
        const name = prompt("Enter product name:");
        const price = parseFloat(prompt("Enter product price:"));
        if (name && !isNaN(price)) {
            const response = await fetch('http://localhost:3000/api/products', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name, price }),
            });
            const result = await response.json();
            console.log(result);
        } else {
            alert("Invalid product details.");
        }
    });

    document.getElementById('edit-product').addEventListener('click', async () => {
        const name = prompt("Enter product name to edit:");
        const price = parseFloat(prompt("Enter new product price:"));
        if (name && !isNaN(price)) {
            const response = await fetch(`http://localhost:3000/api/products/${name}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ price }),
            });
            const result = await response.json();
            console.log(result);
        } else {
            alert("Invalid product details.");
        }
    });

    document.getElementById('delete-product').addEventListener('click', async () => {
        const name = prompt("Enter product name to delete:");
        if (name) {
            const response = await fetch(`http://localhost:3000/api/products/${name}`, {
                method: 'DELETE',
            });
            const result = await response.json();
            console.log(result);
        } else {
            alert("Product name cannot be empty.");
        }
    });

    // Settings functionality
    document.getElementById('update-settings').addEventListener('click', async () => {
        const theme = prompt("Enter theme (light/dark):");
        const notifications = confirm("Enable notifications?");
        const response = await fetch('http://localhost:3000/api/settings', {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ theme, notifications }),
        });
        const result = await response.json();
        console.log(result);
    });

    // Analytics functionality
    async function loadAnalyticsData() {
        const analyticsData = document.getElementById('analytics-data');
        analyticsData.innerHTML = '<p>Fetching analytics data...</p>';
        try {
            const response = await fetch('http://localhost:3000/api/analytics');
            const analytics = await response.json();
            analyticsData.innerHTML = `<p>${JSON.stringify(analytics)}</p>`;
        } catch (error) {
            analyticsData.innerHTML = '<p>Error fetching data.</p>';
            console.error("Error loading analytics data:", error);
        }
    }
    loadAnalyticsData();

    // Analytics Chart for Page Views & Interactions
    function renderAnalyticsCharts() {
        const analytics = window.siteAnalytics ? window.siteAnalytics.get() : JSON.parse(localStorage.getItem('siteAnalytics') || '{}');
        const pageViews = analytics.pageViews || 0;
        const interactions = analytics.interactions || {};

        // Page Views Chart
        const pvCtx = document.getElementById('analytics-pageviews-chart');
        if (pvCtx) {
            new Chart(pvCtx, {
                type: 'doughnut',
                data: {
                    labels: ['Page Views'],
                    datasets: [{
                        data: [pageViews],
                        backgroundColor: ['#3498db']
                    }]
                },
                options: {
                    plugins: { legend: { display: false } },
                    responsive: true
                }
            });
        }

        // Interactions Chart
        const intCtx = document.getElementById('analytics-interactions-chart');
        if (intCtx) {
            new Chart(intCtx, {
                type: 'bar',
                data: {
                    labels: Object.keys(interactions),
                    datasets: [{
                        label: 'Interactions',
                        data: Object.values(interactions),
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

    // Call after DOM ready
    renderAnalyticsCharts();

    // Function to dynamically update the profile section
    function updateProfile() {
        const profileSection = document.getElementById('profile');
        if (profileSection) {
            const profileImage = document.createElement('img');
            profileImage.src = '1748782323973.jpg';
            profileImage.alt = 'Vishal Thakur';
            profileImage.style = 'max-width: 100%; height: auto;';
            
            const profileDescription = document.createElement('p');
            profileDescription.textContent = 'This is an image of Vishal Thakur.';
            
            profileSection.innerHTML = ''; // Clear existing content
            profileSection.appendChild(profileImage);
            profileSection.appendChild(profileDescription);
        } else {
            console.error("Profile section not found.");
        }
    }

    // Call the function to update the profile section
    updateProfile();

    // Admin login functionality
    document.getElementById('admin-login-form').addEventListener('submit', (e) => {
        e.preventDefault();
        const username = document.getElementById('admin-username').value.trim();
        const password = document.getElementById('admin-password').value.trim();

        if (!username || !password) {
            alert("Please fill in both username and password.");
            return;
        }

        const valid = defaultCredentials.some(
            cred => cred.username === username && cred.password === password
        );

        if (valid) {
            alert("Login successful!");
            const dashboard = document.getElementById('admin-dashboard');
            if (dashboard) {
                dashboard.classList.remove('hidden');
            } else {
                console.error("Admin dashboard element not found.");
            }
        } else {
            alert("Invalid credentials!");
        }
    });

    // Admin panel access check
    const adminPanel = document.getElementById('admin-panel');
    if (!isAdmin() && adminPanel) {
        adminPanel.style.display = 'none';
        // Optionally, show a message or redirect
        // window.location.href = '/';
    }

    // View Counter Logic
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
});

// Replace 'YOUR_SECRET_TOKEN' with your actual secret
const ADMIN_TOKEN = 'YOUR_SECRET_TOKEN';

function isAdmin() {
    const params = new URLSearchParams(window.location.search);
    return params.get('admin') === ADMIN_TOKEN;
}
