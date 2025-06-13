document.addEventListener('DOMContentLoaded', () => {
    applySavedTheme();
    setupThemeToggle();
    setupSmoothScrolling();
    setupFormValidation();
    setupUPIPayment();
    setupScrollAnimations();
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
