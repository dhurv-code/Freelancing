/* Shared behaviour for all pages */
(function () {
  const header = document.querySelector('.site-header');
  const burger = document.querySelector('.burger');
  const links = document.querySelector('.nav-links');

  // Header style on scroll
  const onScroll = () => header && header.classList.toggle('scrolled', window.scrollY > 40);
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });

  // Mobile menu
  if (burger && links) {
    burger.addEventListener('click', () => {
      const open = burger.classList.toggle('open');
      links.classList.toggle('open', open);
      burger.setAttribute('aria-expanded', open);
    });
    links.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
      burger.classList.remove('open'); links.classList.remove('open');
    }));
  }

  // Scroll reveal
  const io = new IntersectionObserver((entries) => {
    entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } });
  }, { threshold: 0.12 });
  document.querySelectorAll('.reveal').forEach(el => io.observe(el));

  // Cookie notice (UK / PECR friendly)
  const cookie = document.getElementById('cookie');
  try {
    if (cookie && !localStorage.getItem('cookie-ok')) setTimeout(() => cookie.classList.add('show'), 1200);
  } catch (e) {}
  const ok = document.getElementById('cookie-ok');
  if (ok) ok.addEventListener('click', () => {
    cookie.classList.remove('show');
    try { localStorage.setItem('cookie-ok', '1'); } catch (e) {}
  });

  // Reservation form (front-end demo – see README note in the form)
  const form = document.getElementById('reserve-form');
  if (form) {
    const date = form.querySelector('input[type=date]');
    if (date) date.min = new Date().toISOString().split('T')[0];
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      if (!form.checkValidity()) { form.reportValidity(); return; }
      /* TODO (when you sell this): connect to Formspree / EmailJS / your backend here.
         Example: fetch('https://formspree.io/f/YOUR_ID', { method:'POST', body:new FormData(form) }) */
      const name = form.querySelector('[name=name]').value.split(' ')[0];
      form.style.display = 'none';
      const s = document.getElementById('success');
      s.querySelector('.who').textContent = name;
      s.classList.add('show');
    });
  }

  // Footer year
  const y = document.getElementById('year');
  if (y) y.textContent = new Date().getFullYear();
})();
