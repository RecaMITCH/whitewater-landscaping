// Mobile Navigation Toggle
const menuToggle = document.getElementById('menu-toggle');
const nav = document.getElementById('nav');
const header = document.getElementById('header');
const navLinks = document.querySelectorAll('.header__link');

menuToggle.addEventListener('click', () => {
  menuToggle.classList.toggle('active');
  nav.classList.toggle('active');
  document.body.classList.toggle('nav-open');
});

navLinks.forEach(link => {
  link.addEventListener('click', () => {
    menuToggle.classList.remove('active');
    nav.classList.remove('active');
    document.body.classList.remove('nav-open');
  });
});

// Sticky header on scroll
let lastScroll = 0;
window.addEventListener('scroll', () => {
  const currentScroll = window.pageYOffset;
  if (currentScroll > 80) {
    header.classList.add('header--scrolled');
  } else {
    header.classList.remove('header--scrolled');
  }
  lastScroll = currentScroll;
});

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      const headerOffset = 80;
      const elementPosition = target.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
      window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
    }
  });
});

// Form submission with Web3Forms
function handleFormSubmit(formId, statusId) {
  const form = document.getElementById(formId);
  const status = document.getElementById(statusId);

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const btn = form.querySelector('button[type="submit"]');
    const originalText = btn.textContent;
    btn.textContent = 'Sending...';
    btn.disabled = true;

    try {
      const response = await fetch(form.action, {
        method: 'POST',
        body: new FormData(form),
      });
      const data = await response.json();

      if (data.success) {
        status.textContent = 'Message sent successfully! We\'ll be in touch soon.';
        status.className = 'form__status form__status--success';
        form.reset();
      } else {
        status.textContent = 'Something went wrong. Please call us or try again.';
        status.className = 'form__status form__status--error';
      }
    } catch {
      status.textContent = 'Something went wrong. Please call us or try again.';
      status.className = 'form__status form__status--error';
    }

    btn.textContent = originalText;
    btn.disabled = false;

    setTimeout(() => {
      status.textContent = '';
      status.className = 'form__status';
    }, 5000);
  });
}

handleFormSubmit('contact-form', 'contact-status');
handleFormSubmit('quote-form', 'quote-status');

// Scroll reveal animation
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('revealed');
      observer.unobserve(entry.target);
    }
  });
}, observerOptions);

document.querySelectorAll('.service-card, .testimonial-card, .gallery__item, .about__content, .about__image').forEach(el => {
  el.classList.add('reveal');
  observer.observe(el);
});
