const select = (selector, root = document) => root.querySelector(selector);
const selectAll = (selector, root = document) => [...root.querySelectorAll(selector)];

const detailDialog = select('#detail-dialog');

function showDetail(title, description, tags = '') {
  select('#dialog-title').textContent = title;
  select('#dialog-description').textContent = description;
  select('#dialog-extra').textContent = tags
    ? `Technologies: ${tags.split(',').join(' · ')}`
    : '';
  detailDialog.showModal();
}

function setupNavigation() {
  const nav = select('#navigation');
  const menu = select('.menu-toggle');

  menu.addEventListener('click', () => {
    const isOpen = nav.classList.toggle('open');
    menu.setAttribute('aria-expanded', String(isOpen));
    menu.setAttribute('aria-label', isOpen ? 'Close navigation' : 'Open navigation');
  });

  nav.addEventListener('click', event => {
    if (!event.target.closest('a')) return;

    nav.classList.remove('open');
    menu.setAttribute('aria-expanded', 'false');
    menu.setAttribute('aria-label', 'Open navigation');
  });
}

function setupDialogs() {
  selectAll('dialog').forEach(dialog => {
    select('.dialog-close', dialog).addEventListener('click', () => dialog.close());

    dialog.addEventListener('click', event => {
      if (event.target !== dialog) return;

      const bounds = dialog.getBoundingClientRect();
      const isOutside = event.clientX < bounds.left
        || event.clientX > bounds.right
        || event.clientY < bounds.top
        || event.clientY > bounds.bottom;

      if (isOutside) dialog.close();
    });
  });

  selectAll('.detail').forEach(button => {
    button.addEventListener('click', () => showDetail(
      button.dataset.title,
      button.dataset.description,
      button.dataset.tags
    ));
  });

  selectAll('.profile[data-profile]').forEach(button => {
    button.addEventListener('click', () => showDetail(
      button.dataset.profile,
      'The verified profile or repository URL has not been supplied yet. Please contact Jaidev for the current link.'
    ));
  });
}

function setupContentToggles() {
  const toggles = [
    {
      button: '#about-more',
      content: '#about-extra',
      collapsedLabel: 'More About Me →',
      expandedLabel: 'Show Less ↑'
    },
    {
      button: '#all-skills',
      content: '#skills-extra',
      collapsedLabel: 'View All Skills →',
      expandedLabel: 'Show Less ↑'
    }
  ];

  toggles.forEach(({ button: buttonSelector, content: contentSelector, collapsedLabel, expandedLabel }) => {
    const button = select(buttonSelector);
    const content = select(contentSelector);

    button.setAttribute('aria-controls', content.id);
    button.setAttribute('aria-expanded', String(!content.hidden));
    button.addEventListener('click', () => {
      content.hidden = !content.hidden;
      button.setAttribute('aria-expanded', String(!content.hidden));
      button.textContent = content.hidden ? collapsedLabel : expandedLabel;
    });
  });

}

const contactRules = [
  {
    name: 'name',
    requiredMessage: 'Enter your full name.',
    minimum: 2,
    minimumMessage: 'Enter at least 2 characters for your name.'
  },
  {
    name: 'email',
    requiredMessage: 'Enter your email address.',
    validate: field => field.validity.typeMismatch ? 'Enter a valid email address.' : ''
  },
  {
    name: 'phone',
    requiredMessage: 'Enter your phone number.',
    validate: field => {
      if (field.validity.patternMismatch) return 'Use digits and common phone punctuation only.';
      const digitCount = field.value.replace(/\D/g, '').length;
      return digitCount < 7 ? 'Enter a phone number with at least 7 digits.' : '';
    }
  },
  {
    name: 'subject',
    requiredMessage: 'Enter a subject.',
    minimum: 3,
    minimumMessage: 'Enter a subject with at least 3 characters.'
  },
  {
    name: 'message',
    requiredMessage: 'Enter a message.',
    minimum: 10,
    minimumMessage: 'Write a message with at least 10 characters.'
  }
];

function getContactFieldError(field) {
  return select(`#${field.id}-error`);
}

function setContactFieldError(field, message) {
  field.setAttribute('aria-invalid', String(Boolean(message)));
  getContactFieldError(field).textContent = message;
}

function validateContactField(field, rule) {
  const value = field.value.trim();
  if (!value) return rule.requiredMessage;

  const validationMessage = rule.validate?.(field);
  if (validationMessage) return validationMessage;
  if (rule.minimum && value.length < rule.minimum) return rule.minimumMessage;
  return '';
}

function setContactBusy(form, submit, submitLabel, isBusy) {
  form.setAttribute('aria-busy', String(isBusy));
  submit.disabled = isBusy;
  submit.setAttribute('aria-busy', String(isBusy));
  submitLabel.textContent = isBusy ? 'Sending…' : 'Send Message';
  selectAll('input:not([type="hidden"]), textarea', form).forEach(field => {
    field.disabled = isBusy;
  });
}

function setupContactForm() {
  const dialog = select('#contact-dialog');
  const form = select('#contact-form');
  const status = select('#contact-form-status');
  const submit = select('#contact-submit');
  const submitLabel = select('.contact-submit-label');
  const success = select('#contact-success');
  const successTitle = select('#contact-success-title');
  const successCopy = select('#contact-success-copy');

  selectAll('[data-open-contact]').forEach(trigger => {
    trigger.addEventListener('click', () => {
      dialog.showModal();
      window.requestAnimationFrame(() => {
        if (!status.hidden) status.focus();
        else if (form.hidden) successTitle.focus();
        else if (submit.disabled) select('.dialog-close', dialog).focus();
        else select('input:not([type="hidden"])', form).focus();
      });
    });
  });

  contactRules.forEach(rule => {
    const field = form.elements.namedItem(rule.name);
    field.addEventListener('input', () => {
      if (field.hasAttribute('aria-invalid')) {
        setContactFieldError(field, validateContactField(field, rule));
      }

      status.hidden = true;
      status.textContent = '';
    });
  });

  form.addEventListener('submit', async event => {
    event.preventDefault();
    status.hidden = true;
    status.textContent = '';

    let firstInvalidField = null;
    contactRules.forEach(rule => {
      const field = form.elements.namedItem(rule.name);
      const message = validateContactField(field, rule);
      setContactFieldError(field, message);
      if (message && !firstInvalidField) firstInvalidField = field;
      field.value = field.value.trim();
    });

    if (firstInvalidField) {
      firstInvalidField.focus();
      return;
    }

    const formId = form.dataset.formId.trim();
    if (!/^[A-Za-z0-9]{4,32}$/.test(formId)) {
      status.textContent = 'Secure email delivery is not connected yet. Please try again later.';
      status.hidden = false;
      status.focus();
      return;
    }

    const name = form.elements.namedItem('name').value;
    form.elements.namedItem('submitted_at_utc').value = new Date().toISOString();

    const controller = new AbortController();
    const timeoutId = window.setTimeout(() => controller.abort(), 20000);
    setContactBusy(form, submit, submitLabel, true);

    try {
      const response = await fetch(`https://formspree.io/f/${encodeURIComponent(formId)}`, {
        method: 'POST',
        body: new FormData(form),
        headers: { Accept: 'application/json' },
        signal: controller.signal
      });
      const result = await response.json().catch(() => ({}));

      if (!response.ok || result.ok === false) {
        throw new Error('The message could not be sent. Please try again.');
      }

      form.reset();
      form.hidden = true;
      successCopy.textContent = `Thank you, ${name}. Your message has been sent successfully. I’ll be in touch soon.`;
      success.hidden = false;
      if (dialog.open) successTitle.focus();
    } catch (error) {
      status.textContent = error.name === 'AbortError'
        ? 'The request timed out. Check your connection and try again.'
        : error.name === 'TypeError'
          ? 'A connection problem prevented delivery. Check your connection and try again.'
          : error.message || 'The message could not be sent. Please try again.';
      status.hidden = false;
      if (dialog.open) status.focus();
    } finally {
      window.clearTimeout(timeoutId);
      setContactBusy(form, submit, submitLabel, false);
    }
  });
}

function getSectionTitle(section) {
  const headingId = section.getAttribute('aria-labelledby');
  const labelledHeading = headingId ? document.getElementById(headingId) : null;
  return (labelledHeading || select('h1, h2', section))?.textContent.trim() || section.id;
}

function setupSearch() {
  const dialog = select('#search-dialog');
  const input = select('#search-input');
  const results = select('#search-results');
  const sections = selectAll('main section[id]').map(section => ({
    title: getSectionTitle(section),
    text: section.textContent.toLowerCase(),
    id: section.id
  }));

  function renderResults() {
    results.replaceChildren();
    const query = input.value.trim().toLowerCase();
    const matches = sections.filter(section => !query || section.text.includes(query));

    matches.forEach(section => {
      const link = document.createElement('a');
      link.href = `#${section.id}`;
      link.textContent = section.title;
      link.addEventListener('click', () => dialog.close());
      results.append(link);
    });

    if (!matches.length) {
      results.textContent = 'No matches. Try embedded, C++, audio or robotics.';
    }
  }

  select('.search-toggle').addEventListener('click', () => {
    dialog.showModal();
    renderResults();
    input.focus();
  });
  input.addEventListener('input', renderResults);
}

function setupSectionNavigation() {
  if (!('IntersectionObserver' in window)) return;

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;

      selectAll('#navigation a').forEach(link => {
        const isCurrent = link.hash === `#${entry.target.id}`;
        link.classList.toggle('active', isCurrent);
        if (isCurrent) link.setAttribute('aria-current', 'location');
        else link.removeAttribute('aria-current');
      });
    });
  }, { rootMargin: '-10% 0px -65% 0px' });

  selectAll('main section[id]').forEach(section => observer.observe(section));
}

function setupRevealAnimations() {
  if (!('IntersectionObserver' in window) || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('reveal');
      observer.unobserve(entry.target);
    });
  }, { threshold: 0.08 });

  selectAll('.skill, .project, .mini-project, .experience, .certificate, .post').forEach(card => {
    observer.observe(card);
  });
}

setupNavigation();
setupDialogs();
setupContentToggles();
setupContactForm();
setupSearch();
setupSectionNavigation();
setupRevealAnimations();
