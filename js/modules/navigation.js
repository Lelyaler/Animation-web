/**
 * Header sticky scroll tracking and mobile burger menu controls.
 */

export function initNavigation() {
  const header = document.querySelector('.header');
  const burger = document.querySelector('.header__burger');
  const mobileNav = document.querySelector('.mobile-nav');

  if (header) {
    const handleScroll = () => {
      header.classList.toggle('scrolled', window.scrollY > 24);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
  }

  const closeMobileMenu = () => {
    if (burger && mobileNav && burger.classList.contains('active')) {
      burger.classList.remove('active');
      mobileNav.classList.remove('active');
      burger.setAttribute('aria-expanded', 'false');
      document.body.classList.remove('menu-open');
    }
  };

  const toggleMobileMenu = () => {
    if (!burger || !mobileNav) return;
    const isActive = burger.classList.toggle('active');
    mobileNav.classList.toggle('active');
    burger.setAttribute('aria-expanded', String(isActive));
    document.body.classList.toggle('menu-open', isActive);
  };

  if (burger && mobileNav) {
    burger.addEventListener('click', (e) => {
      e.stopPropagation();
      toggleMobileMenu();
    });

    mobileNav.querySelectorAll('a, button, .mobile-nav__menu-link, .mobile-nav__btn').forEach((link) => {
      link.addEventListener('click', closeMobileMenu);
    });

    document.addEventListener('click', (e) => {
      if (!mobileNav.contains(e.target) && !burger.contains(e.target)) {
        closeMobileMenu();
      }
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') closeMobileMenu();
    });
  }

  // Back to top floating button
  const backToTopBtn = document.getElementById('backToTop');
  if (backToTopBtn) {
    window.addEventListener(
      'scroll',
      () => {
        backToTopBtn.classList.toggle('visible', window.scrollY > 480);
      },
      { passive: true }
    );

    backToTopBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }
}
