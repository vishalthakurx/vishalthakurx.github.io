document.addEventListener('DOMContentLoaded', () => {
    applySavedTheme();
    setupThemeToggle();
    setupSmoothScrolling();
    setupFormValidation();
    setupUPIPayment();
    setupScrollAnimations();
    setupHireMeButton();
    setupScrollToTopButton();
    setupLazyLoading();
    setupAutoHideNavBar();

    const adminLoginForm = document.getElementById("admin-login-form");
    const adminDashboard = document.getElementById("admin-dashboard");

    adminLoginForm.addEventListener("submit", (e) => {
        e.preventDefault();
        const username = document.getElementById("admin-username").value;
        const password = document.getElementById("admin-password").value;

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
        button.addEventListener('click', async () => {
            const productId = button.getAttribute('data-product-id');
            const paymentMethod = "UPI";
            const paymentDetails = { upiLink: button.getAttribute('data-upi') };

            try {
                const result = await handleBuy(productId, paymentMethod, paymentDetails);
                alert(result);
            } catch (error) {
                console.error("Payment failed:", error);
            }
        });
    });
}

async function handleBuy(productId, paymentMethod, paymentDetails) {
    console.log(`Processing payment for product: ${productId}`);
    console.log(`Payment method: ${paymentMethod}`);
    console.log(`Payment details:`, paymentDetails);

    // Simulate payment processing
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve("Payment successful!");
        }, 2000);
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

function setupScrollToTopButton() {
    const scrollToTopButton = document.createElement('button');
    scrollToTopButton.id = 'scroll-to-top';
    scrollToTopButton.textContent = '↑';
    scrollToTopButton.style.position = 'fixed';
    scrollToTopButton.style.bottom = '20px';
    scrollToTopButton.style.right = '20px';
    scrollToTopButton.style.background = '#3498db';
    scrollToTopButton.style.color = '#fff';
    scrollToTopButton.style.border = 'none';
    scrollToTopButton.style.padding = '10px';
    scrollToTopButton.style.borderRadius = '50%';
    scrollToTopButton.style.cursor = 'pointer';
    scrollToTopButton.style.display = 'none';
    scrollToTopButton.style.zIndex = '1000';
    document.body.appendChild(scrollToTopButton);

    scrollToTopButton.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    window.addEventListener('scroll', () => {
        scrollToTopButton.style.display = window.scrollY > 300 ? 'block' : 'none';
    });
}

function setupLazyLoading() {
    const lazyImages = document.querySelectorAll('img[data-src]');
    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
                observer.unobserve(img);
            }
        });
    });

    lazyImages.forEach(img => observer.observe(img));
}

function setupAutoHideNavBar() {
    const header = document.querySelector('header');
    let lastScrollY = window.scrollY;

    window.addEventListener('scroll', () => {
        if (window.scrollY > lastScrollY) {
            header.classList.add('hidden');
        } else {
            header.classList.remove('hidden');
        }
        lastScrollY = window.scrollY;
    });
}

function updateAdminPanel() {
    const adminPanel = document.getElementById("admin-panel");
    const userList = document.getElementById("user-list");

    // Example logic to dynamically update the admin panel
    const newUser = document.createElement("li");
    newUser.textContent = "New User";
    userList.appendChild(newUser);

    adminPanel.classList.remove("hidden");
    console.log("Admin panel updated.");
}
