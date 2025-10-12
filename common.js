// Common utilities for all pages
document.addEventListener('DOMContentLoaded', () => {
  // safe theme apply
  const savedTheme = localStorage.getItem('theme') || 'light';
  document.body.classList.add(savedTheme);
});

function safeQuery(selector) {
  try { return document.querySelector(selector); } catch { return null; }
}

export { safeQuery };
