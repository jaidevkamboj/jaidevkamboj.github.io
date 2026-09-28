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
