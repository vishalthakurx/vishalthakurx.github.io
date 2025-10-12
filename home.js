document.addEventListener('DOMContentLoaded', () => {
  const hireBtn = document.querySelector('.hero button');
  if (hireBtn) {
    hireBtn.addEventListener('click', () => {
      const contact = document.getElementById('contact');
      if (contact) contact.scrollIntoView({ behavior: 'smooth' });
    });
  }
});
