(() => {
  const menuToggle = document.querySelector('[data-menu-toggle]');
  const mobileNav = document.querySelector('[data-mobile-nav]');
  if (menuToggle && mobileNav) {
    menuToggle.addEventListener('click', () => {
      const open = menuToggle.getAttribute('aria-expanded') === 'true';
      menuToggle.setAttribute('aria-expanded', String(!open));
      mobileNav.classList.toggle('is-open', !open);
      document.body.classList.toggle('menu-open', !open);
    });

    mobileNav.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', () => {
        menuToggle.setAttribute('aria-expanded', 'false');
        mobileNav.classList.remove('is-open');
        document.body.classList.remove('menu-open');
      });
    });
  }

  document.querySelectorAll('[data-amount-presets]').forEach((group) => {
    const input = document.querySelector('[data-investment-amount]');
    if (!input) return;

    group.querySelectorAll('[data-amount]').forEach((button) => {
      button.addEventListener('click', () => {
        input.value = button.dataset.amount;
        group.querySelectorAll('button').forEach((item) => item.classList.remove('is-active'));
        button.classList.add('is-active');
      });
    });
  });

  const header = document.querySelector('[data-header]');
  if (header) {
    const updateHeader = () => header.classList.toggle('is-scrolled', window.scrollY > 20);
    updateHeader();
    window.addEventListener('scroll', updateHeader, { passive: true });
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.08 });

  document.querySelectorAll('.reveal').forEach((element) => observer.observe(element));
})();


/* =========================================================
   CUSTOMER AUTH
========================================================= */

document
  .querySelectorAll('[data-password-toggle]')
  .forEach((button) => {

    button.addEventListener('click', () => {

      const input = document.getElementById(
        button.dataset.target
      );

      if (!input) return;

      if (input.type === 'password') {
        input.type = 'text';
      } else {
        input.type = 'password';
      }

    });

});


/* Password recovery */

document
  .querySelectorAll('[data-recover-toggle]')
  .forEach((button) => {

    button.addEventListener('click', (event) => {

      event.preventDefault();

      const recover =
        document.getElementById('recover');

      if (!recover) return;

      recover.classList.toggle('is-open');

    });

});


/* Cart checkout: hide the cart summary while moving to checkout */
document
  .querySelectorAll('[data-cart-checkout]')
  .forEach((button) => {
    button.addEventListener('click', () => {
      const summary = button.closest('.cart-layout')?.querySelector('.cart-summary');
      if (summary) {
        summary.classList.add('is-checking-out');
      }
    });
  });


/* Empty the cart */
document
  .querySelectorAll('[data-cart-clear]')
  .forEach((button) => {
    button.addEventListener('click', async () => {
      if (!window.confirm('Vider le panier ?')) return;
      try {
        await fetch('/cart/clear.js', { method: 'POST' });
        window.location.reload();
      } catch (err) {
        // ignore
      }
    });
  });


/* =========================================================
   FEATURED PROJECTS SLIDER
========================================================= */

document.querySelectorAll('[data-featured-slider]').forEach((slider) => {
  const track = slider.querySelector('[data-slider-track]');
  const dotsContainer = slider.querySelector('[data-slider-dots]');
  const slides = track ? Array.from(track.querySelectorAll('.featured-projects-slider__slide')) : [];
  const dots = dotsContainer ? dotsContainer.querySelectorAll('[data-slider-dot]') : [];

  if (!track || slides.length === 0) return;

  const maxIndex = slides.length - 1;

  const slideWidth = () => slides[0].offsetWidth;

  function goTo(index) {
    const idx = Math.max(0, Math.min(index, maxIndex));
    track.scrollTo({ left: idx * slideWidth(), behavior: 'smooth' });
  }

  function updateDots() {
    const idx = Math.round(track.scrollLeft / slideWidth());
    dots.forEach(function (dot, i) {
      dot.classList.toggle('is-active', i === idx);
    });
  }

  dots.forEach(function (dot) {
    dot.addEventListener('click', function () {
      const idx = parseInt(dot.getAttribute('data-slider-dot'), 10);
      if (!isNaN(idx)) goTo(idx);
    });
  });

  let isDragging = false;
  let startX = 0;
  let startScroll = 0;

  track.addEventListener('mousedown', function (e) {
    isDragging = true;
    startX = e.clientX;
    startScroll = track.scrollLeft;
    track.style.cursor = 'grabbing';
    e.preventDefault();
  });

  document.addEventListener('mousemove', function (e) {
    if (!isDragging) return;
    track.scrollLeft = startScroll - (e.clientX - startX);
  });

  document.addEventListener('mouseup', function () {
    if (!isDragging) return;
    isDragging = false;
    track.style.cursor = '';
  });

  track.addEventListener('scroll', updateDots, { passive: true });
  window.addEventListener('resize', updateDots);

  updateDots();
});
