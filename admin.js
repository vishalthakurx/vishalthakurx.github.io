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
document.getElementById('add-user').addEventListener('click', () => {
    console.log('Add User button clicked');
    // Implement add user logic here
});

document.getElementById('remove-user').addEventListener('click', () => {
    console.log('Remove User button clicked');
    // Implement remove user logic here
});

// Product management functionality
document.getElementById('add-product').addEventListener('click', () => {
    console.log('Add Product button clicked');
    // Implement add product logic here
});

document.getElementById('edit-product').addEventListener('click', () => {
    console.log('Edit Product button clicked');
    // Implement edit product logic here
});

document.getElementById('delete-product').addEventListener('click', () => {
    console.log('Delete Product button clicked');
    // Implement delete product logic here
});

// Settings functionality
document.getElementById('update-settings').addEventListener('click', () => {
    console.log('Update Settings button clicked');
    // Implement settings update logic here
});

// Analytics functionality
function loadAnalyticsData() {
    console.log('Loading analytics data...');
    try {
        // Implement analytics data fetching and rendering logic here
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
