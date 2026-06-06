(function () {
  const navLinks = document.querySelectorAll('.nav__link');
  const sections = document.querySelectorAll('[data-section]');
  const mobileToggle = document.querySelector('.mobile-toggle');
  const panelLeft = document.querySelector('.panel-left');

  // Intersection Observer for nav highlighting & reveal
  const observerOptions = {
    root: null,
    rootMargin: '-20% 0px -60% 0px',
    threshold: 0
  };

  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const id = entry.target.dataset.section;
        navLinks.forEach((link) => {
          link.classList.toggle('nav__link--active', link.dataset.section === id);
        });
      }
    });
  }, observerOptions);

  sections.forEach((section) => {
    sectionObserver.observe(section);
  });

  // Reveal animation
  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
        }
      });
    },
    { threshold: 0.1 }
  );

  document.querySelectorAll('.section').forEach((section) => {
    revealObserver.observe(section);
    if (section.classList.contains('section--hero')) {
      section.classList.add('is-visible');
    }
  });

  // Mobile nav toggle
  if (mobileToggle && panelLeft) {
    mobileToggle.addEventListener('click', () => {
      const isOpen = panelLeft.classList.toggle('is-open');
      mobileToggle.setAttribute('aria-expanded', String(isOpen));
    });

    navLinks.forEach((link) => {
      link.addEventListener('click', () => {
        panelLeft.classList.remove('is-open');
        mobileToggle.setAttribute('aria-expanded', 'false');
      });
    });
  }
})();
