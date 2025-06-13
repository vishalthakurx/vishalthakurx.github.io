// Search functionality
const defaultCredentials = {
    username: "Cobra",
    password: "1234"
};

document.getElementById('search-button').addEventListener('click', () => {
    const query = document.getElementById('search-bar').value.trim();
    if (query) {
        console.log(`Searching for: ${query}`);
        // Implement search logic here
    } else {
        alert("Please enter a search query.");
    }
});

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
    try {
        const response = await fetch('http://localhost:3000/api/analytics');
        const analytics = await response.json();
        const analyticsSection = document.getElementById('analytics-data');
        analyticsSection.innerHTML = `<p>Visits: ${analytics.analytics.visits}</p>`;
    } catch (error) {
        console.error("Error loading analytics data:", error);
    }
}
loadAnalyticsData();

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

    if (username === defaultCredentials.username && password === defaultCredentials.password) {
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

// API integration for user management
async function fetchUsers() {
    const response = await fetch('http://localhost:3000/api/users');
    const users = await response.json();
    console.log(users);
}

async function addUser(username) {
    const response = await fetch('http://localhost:3000/api/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username }),
    });
    const result = await response.json();
    console.log(result);
}

async function removeUser(username) {
    const response = await fetch(`http://localhost:3000/api/users/${username}`, {
        method: 'DELETE',
    });
    const result = await response.json();
    console.log(result);
}

// Example usage
fetchUsers();
