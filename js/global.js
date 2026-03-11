/* =============================================
   SUPERTECH TOYOTAZ — GLOBAL JS
   Handles: cursor, nav, mobile menu, scroll
            animations, footer injection
   ============================================= */

'use strict';

// ---- CURSOR ----
(function initCursor() {
  const cursor = document.querySelector('.cursor');
  const trail  = document.querySelector('.cursor-trail');
  if (!cursor || !trail) return;

  let mx = -100, my = -100;
  let tx = -100, ty = -100;

  document.addEventListener('mousemove', e => {
    mx = e.clientX; my = e.clientY;
    cursor.style.transform = `translate(${mx}px, ${my}px) translate(-50%,-50%)`;
  });

  function animTrail() {
    tx += (mx - tx) * 0.12;
    ty += (my - ty) * 0.12;
    trail.style.transform = `translate(${tx}px, ${ty}px) translate(-50%,-50%)`;
    requestAnimationFrame(animTrail);
  }
  animTrail();

  document.querySelectorAll('a, button, [data-hover]').forEach(el => {
    el.addEventListener('mouseenter', () => cursor.classList.add('expanded'));
    el.addEventListener('mouseleave', () => cursor.classList.remove('expanded'));
  });
})();

// ---- NAVBAR ----
(function initNav() {
  const nav = document.querySelector('.nav');
  if (!nav) return;

  const onScroll = () => {
    nav.classList.toggle('scrolled', window.scrollY > 40);
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  // Active link
  const links = nav.querySelectorAll('.nav-links a');
  const current = window.location.pathname.split('/').pop() || 'index.html';
  links.forEach(link => {
    const href = link.getAttribute('href');
    if (href === current) link.classList.add('active');
  });
})();

// ---- MOBILE MENU ----
(function initMobileMenu() {
  const hamburger = document.querySelector('.hamburger');
  const mobileMenu = document.querySelector('.mobile-menu');
  if (!hamburger || !mobileMenu) return;

  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('open');
    mobileMenu.classList.toggle('open');
    document.body.style.overflow = mobileMenu.classList.contains('open') ? 'hidden' : '';
  });

  mobileMenu.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => {
      hamburger.classList.remove('open');
      mobileMenu.classList.remove('open');
      document.body.style.overflow = '';
    });
  });
})();

// ---- SCROLL REVEAL ----
(function initScrollReveal() {
  const targets = document.querySelectorAll('[data-reveal]');
  if (!targets.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const anim = el.dataset.reveal || 'fadeUp';
        const delay = el.dataset.delay || '0';

        el.style.animationDelay = delay + 's';
        el.classList.add('animate-' + anim);
        el.style.opacity = '1';
        observer.unobserve(el);
      }
    });
  }, { threshold: 0.15, rootMargin: '0px 0px -60px 0px' });

  targets.forEach(el => {
    el.style.opacity = '0';
    observer.observe(el);
  });
})();

// ---- COUNTER ANIMATION ----
function animateCounter(el, target, duration = 1800) {
  let start = null;
  const isFloat = target % 1 !== 0;

  function step(timestamp) {
    if (!start) start = timestamp;
    const progress = Math.min((timestamp - start) / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    const current = eased * target;
    el.textContent = isFloat ? current.toFixed(1) : Math.floor(current);
    if (progress < 1) requestAnimationFrame(step);
    else el.textContent = isFloat ? target.toFixed(1) : target;
  }
  requestAnimationFrame(step);
}

(function initCounters() {
  const counters = document.querySelectorAll('[data-count]');
  if (!counters.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const target = parseFloat(el.dataset.count);
        animateCounter(el, target);
        observer.unobserve(el);
      }
    });
  }, { threshold: 0.5 });

  counters.forEach(c => observer.observe(c));
})();

// ---- TOAST ----
function showToast(title, message, duration = 4000) {
  let toast = document.querySelector('.toast');
  if (!toast) {
    toast = document.createElement('div');
    toast.className = 'toast';
    document.body.appendChild(toast);
  }
  toast.innerHTML = `<div class="toast-title">${title}</div><div>${message}</div>`;
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), duration);
}

// ---- INJECT NAV ----
function injectNav(activePage) {
  const html = `
    <div class="cursor"></div>
    <div class="cursor-trail"></div>
    <nav class="nav">
      <a href="index.html" class="nav-logo">
        <div class="brand">SUPERTECH <span>TOYOTAZ</span></div>
        <div class="tagline">Toyota Specialists · Est. 2009</div>
      </a>
      <ul class="nav-links">
        <li><a href="index.html" ${activePage==='home'?'class="active"':''}>Home</a></li>
        <li><a href="services.html" ${activePage==='services'?'class="active"':''}>Services</a></li>
        <li><a href="about.html" ${activePage==='about'?'class="active"':''}>About</a></li>
        <li><a href="contact.html" ${activePage==='contact'?'class="active"':''}>Contact</a></li>
      </ul>
      <a href="contact.html" class="btn btn-primary nav-cta">Book Service</a>
      <button class="hamburger" aria-label="Menu">
        <span></span><span></span><span></span>
      </button>
    </nav>
    <div class="mobile-menu">
      <a href="index.html">Home</a>
      <a href="services.html">Services</a>
      <a href="about.html">About</a>
      <a href="contact.html">Contact</a>
      <a href="contact.html" class="btn btn-primary">Book Service</a>
    </div>
  `;
  document.body.insertAdjacentHTML('afterbegin', html);
}

// ---- INJECT FOOTER ----
function injectFooter() {
  const html = `
    <footer>
      <div class="footer-grid">
        <div class="footer-brand">
          <div class="brand">SUPERTECH <span>TOYOTAZ</span></div>
          <div style="font-family:var(--font-cond);font-size:0.65rem;letter-spacing:0.25em;color:var(--grey);text-transform:uppercase;margin-top:0.25rem">Toyota Specialists · Est. 2009</div>
          <p>Harare's trusted Toyota specialists. Expert mechanical care, genuine parts, and over 15 years of precision service excellence.</p>
          <div class="social-links" style="margin-top:1.5rem">
            <a href="#" title="Facebook">f</a>
            <a href="#" title="Instagram">ig</a>
            <a href="#" title="WhatsApp">wa</a>
            <a href="#" title="YouTube">yt</a>
          </div>
        </div>
        <div class="footer-col">
          <h4>Quick Links</h4>
          <ul>
            <li><a href="index.html">Home</a></li>
            <li><a href="services.html">Services</a></li>
            <li><a href="about.html">About Us</a></li>
            <li><a href="contact.html">Contact</a></li>
            <li><a href="contact.html">Book a Service</a></li>
          </ul>
        </div>
        <div class="footer-col">
          <h4>Services</h4>
          <ul>
            <li><a href="services.html">Engine Repair</a></li>
            <li><a href="services.html">Transmission</a></li>
            <li><a href="services.html">Brake Systems</a></li>
            <li><a href="services.html">Diagnostics</a></li>
            <li><a href="services.html">Suspension & Steering</a></li>
            <li><a href="services.html">AC Service</a></li>
          </ul>
        </div>
        <div class="footer-col">
          <h4>Contact</h4>
          <div class="footer-contact-item">
            <span class="icon">📍</span>
            <span>14 Coventry Road, Workington, Harare, Zimbabwe</span>
          </div>
          <div class="footer-contact-item">
            <span class="icon">📞</span>
            <span>+263 78 123 4567<br>+263 71 987 6543</span>
          </div>
          <div class="footer-contact-item">
            <span class="icon">✉️</span>
            <span>info@supertectoyotaz.co.zw</span>
          </div>
          <div class="footer-contact-item">
            <span class="icon">🕐</span>
            <span>Mon–Fri: 7:30am – 5:30pm<br>Sat: 8:00am – 1:00pm</span>
          </div>
        </div>
      </div>
      <div class="footer-bottom">
        <p>© ${new Date().getFullYear()} Supertech Toyotaz. All Rights Reserved. Harare, Zimbabwe.</p>
        <p style="color:var(--grey);font-size:0.75rem">Toyota Specialist · Genuine Parts · Expert Service</p>
      </div>
    </footer>
  `;
  document.body.insertAdjacentHTML('beforeend', html);
}

// Export for page-level use
window.ST = { injectNav, injectFooter, showToast };