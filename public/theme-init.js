// Theme bootstrap — runs before first paint to avoid a light/dark flash.
// External file (not inline) so the CSP can forbid inline scripts.
(function () {
  try {
    var savedTheme = localStorage.getItem('freizy_theme');
    var prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    var root = document.documentElement;
    if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
      root.classList.remove('light');
      root.classList.add('dark');
      root.setAttribute('data-theme', 'dark');
    } else {
      root.classList.remove('dark');
      root.classList.add('light');
      root.setAttribute('data-theme', 'light');
    }
  } catch (e) {}
})();
