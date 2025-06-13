document.addEventListener('DOMContentLoaded', () => {
    // Apply saved theme preference
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark-mode') {
        document.body.classList.add('dark-mode');
    }

    const themeToggleButton = document.getElementById('theme-toggle');
    const currentTheme = getThemePreference();
    document.body.classList.add(currentTheme);

    themeToggleButton.addEventListener('click', () => {
        const newTheme = document.body.classList.contains('light') ? 'dark' : 'light';
        document.body.classList.remove('light', 'dark');
        document.body.classList.add(newTheme);
        saveThemePreference(newTheme);
    });

    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Form validation
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

    // Theme toggle functionality
    const themeToggle = document.getElementById('theme-toggle');
    themeToggle.addEventListener('click', () => {
        document.body.classList.toggle('dark-mode');
        const currentTheme = document.body.classList.contains('dark-mode') ? 'dark-mode' : 'light-mode';
        localStorage.setItem('theme', currentTheme);
    });

    // Handle UPI payment actions
    const buyButtons = document.querySelectorAll('.buy-now');
    buyButtons.forEach(button => {
        button.addEventListener('click', () => {
            const upiLink = button.getAttribute('data-upi');
            window.location.href = upiLink;
        });
    });
});

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
