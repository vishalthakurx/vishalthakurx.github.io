document.addEventListener('DOMContentLoaded', () => {
    applySavedTheme();
    setupThemeToggle();
    setupSmoothScrolling();
    setupFormValidation();
    setupUPIPayment();
    setupScrollAnimations();
    setupHireMeButton();

    const adminLoginForm = document.getElementById("admin-login-form");
    const adminDashboard = document.getElementById("admin-dashboard");

    adminLoginForm.addEventListener("submit", (e) => {
        e.preventDefault();
        const username = document.getElementById("admin-username").value;
        const password = document.getElementById("admin-password").value;

        // Replace with actual authentication logic
        if (username === "admin" && password === "password123") {
            adminLoginForm.classList.add("hidden");
            adminDashboard.classList.remove("hidden");
        } else {
            alert("Invalid credentials!");
        }
    });

    const editDetailsForm = document.getElementById("edit-details-form");
    editDetailsForm.addEventListener("submit", (e) => {
        e.preventDefault();
        const name = document.getElementById("edit-name").value;
        const description = document.getElementById("edit-description").value;

        // Replace with actual save logic
        alert(`Details updated:\nName: ${name}\nDescription: ${description}`);
    });
});

function applySavedTheme() {
    const savedTheme = localStorage.getItem('theme') || 'light';
    document.body.classList.add(savedTheme);
}

function setupThemeToggle() {
    const themeToggleButton = document.getElementById('theme-toggle');
    themeToggleButton.addEventListener('click', () => {
        const newTheme = document.body.classList.contains('light') ? 'dark' : 'light';
        document.body.classList.remove('light', 'dark');
        document.body.classList.add(newTheme);
        localStorage.setItem('theme', newTheme);
    });
}

function setupSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });
}

function setupFormValidation() {
    const form = document.querySelector('form');
    form.addEventListener('submit', (e) => {
        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();
        const message = document.getElementById('message').value.trim();

        if (!name || !email || !message) {
            e.preventDefault();
            alert('Please fill out all fields.');
        }
    });
}

function setupUPIPayment() {
    const buyButtons = document.querySelectorAll('.buy-now');
    buyButtons.forEach(button => {
        button.addEventListener('click', () => {
            const upiLink = button.getAttribute('data-upi');
            window.location.href = upiLink;
        });
    });
}

function setupScrollAnimations() {
    document.addEventListener('scroll', () => {
        const elements = document.querySelectorAll('.fadeInBounce');
        elements.forEach(element => {
            const position = element.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            if (position < windowHeight - 100) {
                element.classList.add('visible');
            }
        });
    });
}

function setupHireMeButton() {
    document.querySelector('.hero button').addEventListener('click', () => {
        document.getElementById('contact').scrollIntoView({ behavior: 'smooth' });
    });
}
