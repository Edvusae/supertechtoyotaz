document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.service-card').forEach(card => {
    card.addEventListener('click', () => {
      window.location.href = 'pages/services.html';
    });
    card.style.cursor = 'pointer';
  });
});