/* =========================================
   THE PHILLY PIZZA PROJECT — main.js
   ========================================= */

'use strict';

/* --- Dark mode --- */
const ThemeManager = (() => {
  const KEY = 'tppp-theme';
  const btn = document.getElementById('theme-toggle');
  const iconLight = `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="5"/><path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/></svg>`;
  const iconDark = `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>`;

  function apply(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem(KEY, theme);
    if (btn) btn.innerHTML = theme === 'dark' ? iconLight : iconDark;
  }

  function toggle() {
    const current = document.documentElement.getAttribute('data-theme') || 'light';
    apply(current === 'dark' ? 'light' : 'dark');
  }

  function init() {
    const saved = localStorage.getItem(KEY);
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    apply(saved || (prefersDark ? 'dark' : 'light'));
    if (btn) btn.addEventListener('click', toggle);
  }

  return { init };
})();

/* --- Sticky nav --- */
const NavManager = (() => {
  const nav = document.querySelector('.nav');
  const hamburger = document.getElementById('hamburger');
  const mobileMenu = document.getElementById('mobile-menu');

  function onScroll() {
    if (!nav) return;
    nav.classList.toggle('scrolled', window.scrollY > 20);
  }

  function toggleMenu() {
    if (!mobileMenu) return;
    const open = mobileMenu.classList.toggle('open');
    hamburger.setAttribute('aria-expanded', open);
  }

  function init() {
    window.addEventListener('scroll', onScroll, { passive: true });
    if (hamburger) hamburger.addEventListener('click', toggleMenu);
    // Close on link click
    if (mobileMenu) {
      mobileMenu.querySelectorAll('a').forEach(a => {
        a.addEventListener('click', () => mobileMenu.classList.remove('open'));
      });
    }
  }

  return { init };
})();

/* --- Back to top --- */
const BackToTop = (() => {
  const btn = document.getElementById('back-top');

  function init() {
    if (!btn) return;
    window.addEventListener('scroll', () => {
      btn.classList.toggle('visible', window.scrollY > 400);
    }, { passive: true });
    btn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  return { init };
})();

/* --- Fade-in on scroll --- */
const FadeIn = (() => {
  function init() {
    const els = document.querySelectorAll('.fade-in');
    if (!els.length) return;

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.classList.add('visible');
          observer.unobserve(e.target);
        }
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

    els.forEach(el => observer.observe(el));
  }

  return { init };
})();

/* --- Score bars --- */
const ScoreBars = (() => {
  function init() {
    document.querySelectorAll('.score-bar__fill').forEach(bar => {
      const score = parseFloat(bar.dataset.score || 0);
      bar.style.width = (score / 10 * 100) + '%';
    });
  }
  return { init };
})();

/* --- Client-side search --- */
const Search = (() => {
  let data = [];
  const input = document.getElementById('search-input');
  const results = document.getElementById('search-results');

  async function loadData() {
    try {
      const res = await fetch('/search.json');
      data = await res.json();
    } catch (e) {
      console.warn('Search index not loaded', e);
    }
  }

  function query(q) {
    if (!q || q.length < 2) return [];
    const terms = q.toLowerCase().split(' ').filter(Boolean);
    return data.filter(item => {
      const text = (item.title + ' ' + item.excerpt + ' ' + (item.tags || []).join(' ')).toLowerCase();
      return terms.every(t => text.includes(t));
    }).slice(0, 8);
  }

  function renderResults(items) {
    if (!results) return;
    if (!items.length) {
      results.innerHTML = '<p class="no-results">No results found. Try different keywords.</p>';
      return;
    }
    results.innerHTML = items.map(item => `
      <a href="${item.url}" class="card" style="display:block;text-decoration:none;margin-bottom:16px;">
        <div class="card__body">
          <div class="card__meta">
            <span class="badge badge--${item.type || 'blog'}">${item.category || 'Article'}</span>
          </div>
          <h3 class="card__title" style="font-size:1.1rem;">${item.title}</h3>
          <p class="card__excerpt">${item.excerpt}</p>
        </div>
      </a>
    `).join('');
  }

  function init() {
    if (!input) return;
    loadData();
    input.addEventListener('input', (e) => {
      const q = e.target.value.trim();
      if (!q) { if (results) results.innerHTML = ''; return; }
      renderResults(query(q));
    });
  }

  return { init };
})();

/* --- Newsletter form --- */
const Newsletter = (() => {
  function init() {
    document.querySelectorAll('.newsletter-form').forEach(form => {
      form.addEventListener('submit', (e) => {
        e.preventDefault();
        const input = form.querySelector('input[type="email"]');
        if (input && input.value) {
          form.innerHTML = '<p style="color:rgba(250,248,244,0.9);font-size:1rem;">🍕 You\'re on the list! First to know when we post a new review.</p>';
        }
      });
    });
  }
  return { init };
})();

/* --- Smooth anchor links --- */
const SmoothLinks = (() => {
  function init() {
    document.querySelectorAll('a[href^="#"]').forEach(a => {
      a.addEventListener('click', (e) => {
        const target = document.querySelector(a.getAttribute('href'));
        if (target) {
          e.preventDefault();
          target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      });
    });
  }
  return { init };
})();

/* --- Reading time --- */
const ReadingTime = (() => {
  function init() {
    const el = document.getElementById('reading-time');
    const body = document.querySelector('.article-body');
    if (!el || !body) return;
    const words = body.innerText.trim().split(/\s+/).length;
    const mins = Math.max(1, Math.ceil(words / 220));
    el.textContent = `${mins} min read`;
  }
  return { init };
})();

/* --- Init all --- */
document.addEventListener('DOMContentLoaded', () => {
  ThemeManager.init();
  NavManager.init();
  BackToTop.init();
  FadeIn.init();
  ScoreBars.init();
  Search.init();
  Newsletter.init();
  SmoothLinks.init();
  ReadingTime.init();
});
