const nav = document.querySelector('nav');
const menu = document.querySelector('.menu-toggle');
menu.addEventListener('click', () => { const open = nav.classList.toggle('open'); menu.setAttribute('aria-expanded', open); menu.setAttribute('aria-label', open ? 'Close navigation' : 'Open navigation'); });
nav.addEventListener('click', e => { if (e.target.closest('a')) { nav.classList.remove('open'); menu.setAttribute('aria-expanded', 'false'); } });
const dialog = document.querySelector('#detail-dialog');
function showDetail(title, description, tags = '') {
 document.querySelector('#dialog-title').textContent = title;
 document.querySelector('#dialog-description').textContent = description;
 document.querySelector('#dialog-extra').textContent = tags ? `Technologies: ${tags.split(',').join(' · ')}` : '';
 dialog.showModal();
}
document.querySelectorAll('dialog').forEach(d => { d.querySelector('.dialog-close').addEventListener('click', () => d.close()); d.addEventListener('click', e => { if (e.target === d) { const r = d.getBoundingClientRect(); if (e.clientX < r.left || e.clientX > r.right || e.clientY < r.top || e.clientY > r.bottom) d.close(); } }); });
const contactDialog = document.querySelector('#contact-dialog');
const contactForm = document.querySelector('#contact-form');
const contactTrigger = document.querySelector('#open-contact');
const contactStatus = document.querySelector('#contact-form-status');
const contactSubmit = document.querySelector('#contact-submit');
const contactSubmitLabel = document.querySelector('.contact-submit-label');
const contactSuccess = document.querySelector('#contact-success');
const contactSuccessTitle = document.querySelector('#contact-success-title');
const contactSuccessCopy = document.querySelector('#contact-success-copy');
const contactFields = [
  { name: 'name', requiredMessage: 'Enter your full name.', minimum: 2, minimumMessage: 'Enter at least 2 characters for your name.' },
  { name: 'email', requiredMessage: 'Enter your email address.', validate: field => field.validity.typeMismatch ? 'Enter a valid email address.' : '' },
  { name: 'phone', requiredMessage: 'Enter your phone number.', validate: field => {
    if (field.validity.patternMismatch) return 'Use digits and common phone punctuation only.';
    const digits = field.value.replace(/\D/g, '').length;
    return digits < 7 ? 'Enter a phone number with at least 7 digits.' : '';
  } },
  { name: 'subject', requiredMessage: 'Enter a subject.', minimum: 3, minimumMessage: 'Enter a subject with at least 3 characters.' },
  { name: 'message', requiredMessage: 'Enter a message.', minimum: 10, minimumMessage: 'Write a message with at least 10 characters.' }
];

function contactFieldError(field, message) {
  const error = document.querySelector(`#${field.id}-error`);
  field.setAttribute('aria-invalid', String(Boolean(message)));
  error.textContent = message;
}

function validateContactField(field, rule) {
  const value = field.value.trim();
  if (!value) return rule.requiredMessage;
  if (rule.validate) {
    const validationMessage = rule.validate(field);
    if (validationMessage) return validationMessage;
  }
  if (rule.minimum && value.length < rule.minimum) return rule.minimumMessage;
  return '';
}

contactTrigger.addEventListener('click', () => {
  contactDialog.showModal();
  window.requestAnimationFrame(() => {
    if (!contactStatus.hidden) contactStatus.focus();
    else if (contactForm.hidden) contactSuccessTitle.focus();
    else if (contactSubmit.disabled) contactDialog.querySelector('.dialog-close').focus();
    else contactForm.querySelector('input:not([type="hidden"])').focus();
  });
});

contactFields.forEach(rule => {
  const field = contactForm.elements.namedItem(rule.name);
  field.addEventListener('input', () => {
    if (field.hasAttribute('aria-invalid')) contactFieldError(field, validateContactField(field, rule));
    contactStatus.hidden = true;
    contactStatus.textContent = '';
  });
});

function setContactBusy(isBusy) {
  contactForm.setAttribute('aria-busy', String(isBusy));
  contactSubmit.disabled = isBusy;
  contactSubmit.setAttribute('aria-busy', String(isBusy));
  contactSubmitLabel.textContent = isBusy ? 'Sending…' : 'Send Message';
  contactForm.querySelectorAll('input:not([type="hidden"]), textarea').forEach(field => { field.disabled = isBusy; });
}

contactForm.addEventListener('submit', async event => {
  event.preventDefault();
  contactStatus.hidden = true;
  contactStatus.textContent = '';

  let firstInvalidField = null;
  contactFields.forEach(rule => {
    const field = contactForm.elements.namedItem(rule.name);
    const message = validateContactField(field, rule);
    contactFieldError(field, message);
    if (message && !firstInvalidField) firstInvalidField = field;
    field.value = field.value.trim();
  });

  if (firstInvalidField) {
    firstInvalidField.focus();
    return;
  }

  const formId = contactForm.dataset.formId.trim();
  if (!/^[A-Za-z0-9]{4,32}$/.test(formId)) {
    contactStatus.textContent = 'Secure email delivery is not connected yet. Please try again later.';
    contactStatus.hidden = false;
    contactStatus.focus();
    return;
  }

  const endpoint = `https://formspree.io/f/${encodeURIComponent(formId)}`;
  const name = contactForm.elements.namedItem('name').value;
  contactForm.elements.namedItem('submitted_at_utc').value = new Date().toISOString();
  const payload = new FormData(contactForm);
  const controller = new AbortController();
  const timeoutId = window.setTimeout(() => controller.abort(), 20000);
  setContactBusy(true);

  try {
    const response = await fetch(endpoint, {
      method: 'POST',
      body: payload,
      headers: { Accept: 'application/json' },
      signal: controller.signal
    });
    const result = await response.json().catch(() => ({}));
    if (!response.ok || result.ok === false) throw new Error('The message could not be sent. Please try again.');

    contactForm.reset();
    contactForm.hidden = true;
    contactSuccessCopy.textContent = `Thank you, ${name}. Your message has been sent successfully. I’ll be in touch soon.`;
    contactSuccess.hidden = false;
    if (contactDialog.open) contactSuccessTitle.focus();
  } catch (error) {
    contactStatus.textContent = error.name === 'AbortError'
      ? 'The request timed out. Check your connection and try again.'
      : error.name === 'TypeError'
        ? 'A connection problem prevented delivery. Check your connection and try again.'
        : error.message;
    contactStatus.hidden = false;
    if (contactDialog.open) contactStatus.focus();
  } finally {
    window.clearTimeout(timeoutId);
    setContactBusy(false);
  }
});
document.querySelectorAll('.detail').forEach(b => b.addEventListener('click', () => showDetail(b.dataset.title, b.dataset.description, b.dataset.tags)));
document.querySelectorAll('.profile[data-profile]').forEach(b => b.addEventListener('click', () => showDetail(b.dataset.profile, 'The verified profile or repository URL has not been supplied yet. Please contact Jaidev for the current link.')));
function toggleContent(button, content, collapsed, expanded) { const b = document.querySelector(button), c = document.querySelector(content); b.setAttribute('aria-expanded', 'false'); b.setAttribute('aria-controls', c.id); b.addEventListener('click', () => { c.hidden = !c.hidden; b.setAttribute('aria-expanded', String(!c.hidden)); b.textContent = c.hidden ? collapsed : expanded; }); }
toggleContent('#about-more', '#about-extra', 'More About Me →', 'Show Less ↑');
toggleContent('#all-skills', '#skills-extra', 'View All Skills →', 'Show Less ↑');
document.querySelector('#all-certificates').addEventListener('click', () => showDetail('Professional certifications', 'All four certifications are displayed here. Use each card to open its verification page or the supplied certificate image.'));
document.querySelector('#all-posts').addEventListener('click', () => showDetail('Latest insights', 'All three article previews from the reference are displayed here. Full articles will be available when their content is supplied.'));
const searchDialog = document.querySelector('#search-dialog'), input = document.querySelector('#search-input'), results = document.querySelector('#search-results');
const entries = [...document.querySelectorAll('main section[id]')].map(s => ({ title: s.querySelector('h2')?.textContent || s.id, text: s.textContent.toLowerCase(), id: s.id }));
function search() { results.replaceChildren(); const query = input.value.trim().toLowerCase(); const matches = entries.filter(e => !query || e.text.includes(query)); matches.forEach(e => { const a = document.createElement('a'); a.href = '#' + e.id; a.textContent = e.title; a.addEventListener('click', () => searchDialog.close()); results.append(a); }); if (!matches.length) results.textContent = 'No matches. Try embedded, C++, audio or robotics.'; }
document.querySelector('.search-toggle').addEventListener('click', () => { searchDialog.showModal(); search(); input.focus(); }); input.addEventListener('input', search);
const observer = new IntersectionObserver(entries => { entries.forEach(entry => { if (entry.isIntersecting) { document.querySelectorAll('nav a').forEach(a => { const active = a.hash === '#' + entry.target.id; a.classList.toggle('active', active); if(active) a.setAttribute('aria-current', 'location'); else a.removeAttribute('aria-current'); }); } }); }, { rootMargin: '-10% 0px -65% 0px' });
document.querySelectorAll('main section[id]').forEach(s => observer.observe(s));
if (!matchMedia('(prefers-reduced-motion: reduce)').matches) { const reveal = new IntersectionObserver(entries => entries.forEach(e => { if(e.isIntersecting) { e.target.classList.add('reveal'); reveal.unobserve(e.target); } }), { threshold: .08 }); document.querySelectorAll('.skill,.project,.mini-project,.experience,.certificate,.post').forEach(e => reveal.observe(e)); }
