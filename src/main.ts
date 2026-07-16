import './style.css';

function initNavbar() {
  const navbar = document.getElementById('navbar');
  if (!navbar) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  }, { passive: true });
}

function initMobileNav() {
  const navToggle = document.getElementById('navToggle');
  const navLinks = document.getElementById('navLinks');
  if (!navToggle || !navLinks) return;

  navToggle.addEventListener('click', () => {
    navToggle.classList.toggle('active');
    navLinks.classList.toggle('open');
    document.body.style.overflow = navLinks.classList.contains('open') ? 'hidden' : '';
  });

  navLinks.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
      navToggle.classList.remove('active');
      navLinks.classList.remove('open');
      document.body.style.overflow = '';
    });
  });
}

function initActiveNav() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${id}`) {
            link.classList.add('active');
          }
        });
      }
    });
  }, { threshold: 0.3, rootMargin: '-80px 0px -50% 0px' });

  sections.forEach(section => observer.observe(section));
}

function initReveal() {
  const reveals = document.querySelectorAll('.reveal');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const delay = entry.target.getAttribute('data-delay') || 0;
        setTimeout(() => {
          entry.target.classList.add('active');
        }, parseInt(delay));
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

  reveals.forEach(el => observer.observe(el));
}

function initSkillBars() {
  const skillBars = document.querySelectorAll('.skill-progress');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const progress = entry.target.getAttribute('data-progress');
        entry.target.style.width = `${progress}%`;
      }
    });
  }, { threshold: 0.5 });

  skillBars.forEach(bar => observer.observe(bar));
}

function initParallax() {
  const heroGradients = document.querySelectorAll('.hero-gradient-1, .hero-gradient-2, .hero-gradient-3');

  window.addEventListener('mousemove', (e) => {
    const x = (e.clientX / window.innerWidth - 0.5) * 30;
    const y = (e.clientY / window.innerHeight - 0.5) * 30;

    heroGradients.forEach((gradient, index) => {
      const speed = (index + 1) * 0.5;
      (gradient as HTMLElement).style.transform = `translate(${x * speed}px, ${y * speed}px)`;
    });
  }, { passive: true });
}

function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      e.preventDefault();
      const target = document.querySelector((anchor as HTMLAnchorElement).getAttribute('href') || '');
      if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });
}

function initTypeEffect() {
  const subtitle = document.querySelector('.hero-subtitle');
  if (!subtitle) return;

  const roles = ['Frontend Developer', 'UI/UX Enthusiast', 'Problem Solver', 'Creative Coder'];
  let roleIndex = 0;
  let charIndex = 0;
  let isDeleting = false;

  function type() {
    const currentRole = roles[roleIndex];

    if (isDeleting) {
      subtitle.textContent = currentRole.substring(0, charIndex - 1);
      charIndex--;
    } else {
      subtitle.textContent = currentRole.substring(0, charIndex + 1);
      charIndex++;
    }

    if (!isDeleting && charIndex === currentRole.length) {
      setTimeout(() => { isDeleting = true; }, 2000);
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      roleIndex = (roleIndex + 1) % roles.length;
    }

    const speed = isDeleting ? 50 : 100;
    setTimeout(type, speed);
  }

  setTimeout(type, 1500);
}

function initLoader() {
  const loader = document.getElementById('loader');
  if (!loader) return;
  setTimeout(() => {
    loader.classList.add('hidden');
  }, 1400);
}

function initScrollProgress() {
  const bar = document.getElementById('scrollProgress');
  if (!bar) return;

  window.addEventListener('scroll', () => {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
    bar.style.width = `${progress}%`;
  }, { passive: true });
}

function initBackToTop() {
  const btn = document.getElementById('backToTop');
  if (!btn) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 400) {
      btn.classList.add('visible');
    } else {
      btn.classList.remove('visible');
    }
  }, { passive: true });

  btn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

function initCounters() {
  const counters = document.querySelectorAll('.stat-number[data-target]');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target as HTMLElement;
        const target = parseInt(el.getAttribute('data-target') || '0');
        const suffix = el.getAttribute('data-suffix') || '';
        let current = 0;
        const duration = 1500;
        const step = target / (duration / 16);

        function update() {
          current += step;
          if (current >= target) {
            el.textContent = `${target}${suffix}`;
          } else {
            el.textContent = `${Math.floor(current)}${suffix}`;
            requestAnimationFrame(update);
          }
        }

        update();
        observer.unobserve(el);
      }
    });
  }, { threshold: 0.5 });

  counters.forEach(c => observer.observe(c));
}

function initTiltCards() {
  const cards = document.querySelectorAll('.project-card');

  cards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const el = card as HTMLElement;
      const rect = el.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const rotateX = (y - centerY) / 12;
      const rotateY = (centerX - x) / 12;

      el.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
    });

    card.addEventListener('mouseleave', () => {
      const el = card as HTMLElement;
      el.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
    });
  });
}

document.addEventListener('DOMContentLoaded', () => {
  initLoader();
  initScrollProgress();
  initBackToTop();
  initNavbar();
  initMobileNav();
  initActiveNav();
  initReveal();
  initSkillBars();
  initCounters();
  initParallax();
  initSmoothScroll();
  initTypeEffect();
  initTiltCards();
});
