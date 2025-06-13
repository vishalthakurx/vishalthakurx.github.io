document.addEventListener('DOMContentLoaded', () => {
    applySavedTheme();
    setupThemeToggle();
    setupSmoothScrolling();
    setupFormValidation();
    setupUPIPayment();
    setupScrollAnimations();
    setupHoverAnimations();
    setupHireMeButton();
    setupScrollToTopButton();
    setupLazyLoading();
    setupAutoHideNavBar();
    setupTestimonials();

    const adminLoginForm = document.getElementById("admin-login-form");
    const adminDashboard = document.getElementById("admin-dashboard");

    adminLoginForm.addEventListener("submit", (e) => {
        e.preventDefault();
        const username = document.getElementById("admin-username").value;
        const password = document.getElementById("admin-password").value;

        if (
            (username === "admin" && password === "password123") ||
            (username === "cobra" && password === "1234")
        ) {
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
            const upiLink = button.getAttribute('data-upi');
            let upiId = '';
            let amount = '';
            if (upiLink && upiLink.startsWith('upi://')) {
                const url = new URL(upiLink.replace('upi://pay?', 'http://dummy?'));
                upiId = url.searchParams.get('pa') || '';
                amount = url.searchParams.get('am') || '';
            }
            if (!upiId) {
                upiId = prompt('Enter your UPI ID:');
            }
            if (!amount) {
                amount = prompt('Enter amount to pay:');
            }
            if (!upiId || !amount) {
                alert('UPI ID and amount are required.');
                return;
            }
            try {
                const { handleBuy } = await import('./buy.js');
                const result = await handleBuy(button.getAttribute('data-service') || 'product', 'UPI', { upiId, amount });
                alert(result);
            } catch (error) {
                console.error("Payment failed:", error);
                alert("Payment failed: " + error.message);
            }
        });
    });
}

function setupScrollAnimations() {
    const animatedElements = document.querySelectorAll('.animated-on-scroll');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fadeInBounce', 'visible');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.2 });

    animatedElements.forEach(el => observer.observe(el));
}

function setupHoverAnimations() {
    document.querySelectorAll('.card, .btn, .nav-link').forEach(el => {
        el.addEventListener('mouseenter', () => {
            el.classList.add('pulse');
        });
        el.addEventListener('animationend', () => {
            el.classList.remove('pulse');
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

    const newUser = document.createElement("li");
    newUser.textContent = "New User";
    userList.appendChild(newUser);

    adminPanel.classList.remove("hidden");
    console.log("Admin panel updated.");
}

function setupTestimonials() {
    const testimonials = [
        { text: "Vishal's work on our e-commerce platform was outstanding. Highly recommended!", author: "Client A" },
        { text: "The portfolio website Vishal created exceeded our expectations.", author: "Client B" }
    ];

    const testimonialsContainer = document.querySelector('#testimonials .grid');
    testimonials.forEach(testimonial => {
        const card = document.createElement('div');
        card.className = 'card';
        card.innerHTML = `<p>${testimonial.text}</p><h3>- ${testimonial.author}</h3>`;
        testimonialsContainer.appendChild(card);
    });
}
