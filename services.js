document.addEventListener('DOMContentLoaded', () => {
  const container = document.getElementById('services-container');
  if (!container) return;
  let dynamic = [];
  try { dynamic = JSON.parse(localStorage.getItem('products')) || []; } catch { dynamic = []; }
  if (dynamic.length) {
    container.innerHTML = dynamic.map(s => `
      <div class="service">
        <h3>${s.name}</h3>
        <p>Starting at ₹${s.price}</p>
        <a class="btn-primary" href="service.html?id=${encodeURIComponent(s.name)}">View Details</a>
      </div>
    `).join('');
  }
});
