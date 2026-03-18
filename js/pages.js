/* =============================================
   SERVICES PAGE — JS
   ============================================= */

function initServicesPage() {
  ST.injectNav('services');
  ST.injectFooter();

  // Filter tabs
  const tabs = document.querySelectorAll('.filter-tab');
  const rows = document.querySelectorAll('.service-row');

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');

      const filter = tab.dataset.filter;
      rows.forEach(row => {
        if (filter === 'all' || row.dataset.category === filter) {
          row.style.display = 'grid';
          row.style.animation = 'fadeUp 0.4s ease both';
        } else {
          row.style.display = 'none';
        }
      });
    });
  });
}

/* =============================================
   ABOUT PAGE — JS
   ============================================= */

function initAboutPage() {
  ST.injectNav('about');
  ST.injectFooter();

  // Animate timeline items on scroll
  const tlItems = document.querySelectorAll('.timeline-item');
  const observer = new IntersectionObserver(entries => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        setTimeout(() => {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateX(0)';
        }, i * 100);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.2 });

  tlItems.forEach(item => {
    item.style.opacity = '0';
    item.style.transform = 'translateX(-20px)';
    item.style.transition = 'all 0.6s ease';
    observer.observe(item);
  });
}

/* =============================================
   CONTACT PAGE — JS
   ============================================= */

function initContactPage() {
  ST.injectNav('contact');
  ST.injectFooter();

  const form = document.querySelector('.contact-form');
  if (!form) return;

  form.addEventListener('submit', e => {
    e.preventDefault();

    const btn = form.querySelector('.form-submit');
    const originalText = btn.textContent;

    btn.textContent = 'Sending...';
    btn.disabled = true;
    btn.style.opacity = '0.7';

    // Simulate form submission
    setTimeout(() => {
      btn.textContent = '✓ Message Sent!';
      btn.style.background = '#16a34a';
      btn.style.borderColor = '#16a34a';
      btn.style.opacity = '1';

      ST.showToast(
        'Message Received!',
        'Thank you! We\'ll get back to you within 2 business hours.'
      );

      form.reset();

      setTimeout(() => {
        btn.textContent = originalText;
        btn.disabled = false;
        btn.style.background = '';
        btn.style.borderColor = '';
      }, 4000);
    }, 1800);
  });

  // Phone click tracking
  document.querySelectorAll('[data-phone]').forEach(el => {
    el.addEventListener('click', () => {
      ST.showToast('Calling...', 'Connecting to Supertech Toyotaz');
    });
  });
}

// Page router — called from each HTML page
window.STPAGES = { initServicesPage, initAboutPage, initContactPage };