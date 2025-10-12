async function includeHTML() {
  const includes = document.querySelectorAll('[data-include]');
  await Promise.all(Array.from(includes).map(async (el) => {
    const path = el.getAttribute('data-include');
    try {
      const res = await fetch(path);
      if (!res.ok) {
        el.innerHTML = '';
        return;
      }
      const text = await res.text();
      el.innerHTML = text;
    } catch (err) {
      console.error('Include failed:', path, err);
      el.innerHTML = '';
    }
  }));
}
document.addEventListener('DOMContentLoaded', includeHTML);
