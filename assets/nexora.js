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
