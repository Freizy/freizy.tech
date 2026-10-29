// Stays landing page interactions — external file so the CSP can forbid inline scripts.
(function () {
  'use strict';
  document.documentElement.classList.add('js');
  var menuBtn = document.getElementById('menuBtn');
  var nav = document.getElementById('nav');
  var menuIcon = document.getElementById('menuIcon');
  function closeMenu() {
    nav.classList.remove('open');
    menuBtn.setAttribute('aria-expanded', 'false');
    menuBtn.setAttribute('aria-label', 'Open menu');
    menuIcon.innerHTML = '<path d="M4 7h16M4 12h16M4 17h16"/>';
  }
  menuBtn.addEventListener('click', function () {
    var isOpen = nav.classList.toggle('open');
    menuBtn.setAttribute('aria-expanded', String(isOpen));
    menuBtn.setAttribute('aria-label', isOpen ? 'Close menu' : 'Open menu');
    menuIcon.innerHTML = isOpen ? '<path d="m6 6 12 12M18 6 6 18"/>' : '<path d="M4 7h16M4 12h16M4 17h16"/>';
  });
  nav.querySelectorAll('a').forEach(function (link) { link.addEventListener('click', closeMenu); });
  document.addEventListener('keydown', function (event) {
    if (event.key === 'Escape' && nav.classList.contains('open')) {
      closeMenu();
      menuBtn.focus();
    }
  });
  var desktopQuery = window.matchMedia('(min-width: 801px)');
  desktopQuery.addEventListener('change', function (event) {
    if (event.matches) closeMenu();
  });

  var search = document.getElementById('hostelSearch');
  var listings = Array.prototype.slice.call(document.querySelectorAll('.listing'));
  var empty = document.getElementById('emptyResults');
  var activeButton = null;

  function filterListings() {
    var query = (search.value || '').trim().toLowerCase();
    var filter = activeButton ? activeButton.getAttribute('data-filter') : '';
    var shown = 0;
    listings.forEach(function (listing) {
      var nameMatch = listing.getAttribute('data-name').indexOf(query) !== -1;
      var filterMatch = !filter || listing.getAttribute('data-' + filter) === 'true';
      var visible = nameMatch && filterMatch;
      listing.hidden = !visible;
      if (visible) shown += 1;
    });
    empty.hidden = shown !== 0;
  }
  search.addEventListener('input', filterListings);
  document.querySelectorAll('.filters button').forEach(function (button) {
    button.addEventListener('click', function () {
      var wasActive = button === activeButton;
      document.querySelectorAll('.filters button').forEach(function (other) {
        other.classList.remove('active');
        other.setAttribute('aria-pressed', 'false');
      });
      activeButton = wasActive ? null : button;
      if (activeButton) {
        activeButton.classList.add('active');
        activeButton.setAttribute('aria-pressed', 'true');
      }
      filterListings();
    });
  });

  document.getElementById('year').textContent = new Date().getFullYear();

  if ('IntersectionObserver' in window) {
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
    document.querySelectorAll('.reveal').forEach(function (el) { observer.observe(el); });
  } else {
    document.querySelectorAll('.reveal').forEach(function (el) { el.classList.add('visible'); });
  }
})();
