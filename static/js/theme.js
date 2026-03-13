// Apply saved theme on load (matches Oat's own approach).
(function () {
  var saved = localStorage.getItem('theme');
  if (saved) {
    document.documentElement.style.colorScheme = saved;
    document.documentElement.setAttribute('data-theme', saved);
  }
  updateIcon();
})();

// Toggle theme — same pattern as Oat's own docs site.
function toggleTheme() {
  var cs = document.documentElement.style.colorScheme;
  var isDark = cs === 'dark' || (!cs && matchMedia('(prefers-color-scheme: dark)').matches);
  var theme = isDark ? 'light' : 'dark';
  document.documentElement.style.colorScheme = theme;
  document.documentElement.setAttribute('data-theme', theme);
  localStorage.setItem('theme', theme);
  updateIcon();
}

function updateIcon() {
  var cs = document.documentElement.style.colorScheme;
  var isDark = cs === 'dark' || (!cs && matchMedia('(prefers-color-scheme: dark)').matches);
  document.querySelectorAll('.theme-icon').forEach(function (el) {
    el.textContent = isDark ? '☀️' : '🌙';
  });
}
