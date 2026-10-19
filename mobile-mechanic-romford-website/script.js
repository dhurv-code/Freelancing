const nav = document.getElementById('nav');
const links = document.getElementById('links');
const burger = document.getElementById('burger');

addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', scrollY > 40);
  const bar = document.getElementById('bar');
  const maxScroll = document.documentElement.scrollHeight - innerHeight;
  bar.style.width = (maxScroll > 0 ? scrollY / maxScroll * 100 : 0) + '%';
}, { passive: true });

burger.addEventListener('click', () => {
  const open = links.classList.toggle('open');
  burger.setAttribute('aria-expanded', String(open));
  burger.setAttribute('aria-label', open ? 'Close navigation menu' : 'Open navigation menu');
  burger.textContent = open ? '×' : '☰';
});

links.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
  links.classList.remove('open');
  burger.setAttribute('aria-expanded', 'false');
  burger.setAttribute('aria-label', 'Open navigation menu');
  burger.textContent = '☰';
}));

const track = document.getElementById('track');
if (track && !track.dataset.duplicated) {
  track.innerHTML += track.innerHTML;
  track.dataset.duplicated = 'true';
}

if ('IntersectionObserver' in window) {
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('in');
      observer.unobserve(entry.target);
    });
  }, { threshold: 0.12 });
  document.querySelectorAll('.rv').forEach(el => observer.observe(el));
} else {
  document.querySelectorAll('.rv').forEach(el => el.classList.add('in'));
}

document.querySelectorAll('.fq button').forEach(button => {
  button.addEventListener('click', () => {
    const item = button.parentElement;
    const willOpen = !item.classList.contains('open');
    document.querySelectorAll('.fq').forEach(faq => {
      faq.classList.remove('open');
      faq.querySelector('button').setAttribute('aria-expanded', 'false');
    });
    if (willOpen) {
      item.classList.add('open');
      button.setAttribute('aria-expanded', 'true');
    }
  });
});

const modal = document.getElementById('modal');
const isMobile = /Android|iPhone|iPad|iPod/i.test(navigator.userAgent) ||
  matchMedia('(pointer: coarse)').matches;

document.querySelectorAll('a[href^="tel:"]').forEach(link => {
  link.addEventListener('click', event => {
    if (isMobile || link.hasAttribute('data-native')) return;
    event.preventDefault();
    modal.classList.add('show');
  });
});

function closeModal() { modal.classList.remove('show'); }
document.getElementById('mx').addEventListener('click', closeModal);
modal.addEventListener('click', event => { if (event.target === modal) closeModal(); });
addEventListener('keydown', event => { if (event.key === 'Escape') closeModal(); });

document.getElementById('copy').addEventListener('click', async () => {
  const number = '+447735642556';
  try {
    await navigator.clipboard.writeText(number);
  } catch {
    const input = document.createElement('textarea');
    input.value = number;
    input.style.position = 'fixed';
    input.style.opacity = '0';
    document.body.appendChild(input);
    input.select();
    document.execCommand('copy');
    input.remove();
  }
  const toast = document.getElementById('toast');
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), 2200);
});

document.getElementById('year').textContent = new Date().getFullYear();

if (matchMedia('(hover:hover) and (pointer:fine)').matches) {
  document.querySelectorAll('.spot, .step').forEach(card => {
    card.addEventListener('pointermove', event => {
      const rect = card.getBoundingClientRect();
      const x = (event.clientX - rect.left) / rect.width - 0.5;
      const y = (event.clientY - rect.top) / rect.height - 0.5;
      card.style.transform = `perspective(800px) rotateY(${x * 4}deg) rotateX(${-y * 4}deg) translateY(-4px)`;
    });
    card.addEventListener('pointerleave', () => { card.style.transform = ''; });
  });
}
