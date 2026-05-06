document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.service-card').forEach(card => {
    card.addEventListener('click', () => {
      window.location.href = 'pages/services.html';
    });
    card.style.cursor = 'pointer';
  });
});

// Navigation bar scroll effect
const nav = document.getElementById('main-nav');

  window.addEventListener('scroll', () => {
  if (window.scrollY > 50) {
    nav.classList.add('nav--scrolled');
  } else {
    nav.classList.remove('nav--scrolled');
  }
});