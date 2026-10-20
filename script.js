const root = document.documentElement;
const themeToggle = document.getElementById('themeToggle');
const savedTheme = localStorage.getItem('portfolio-theme');
if (savedTheme) root.dataset.theme = savedTheme;
themeToggle.addEventListener('click', () => {
  const next = root.dataset.theme === 'dark' ? 'light' : 'dark';
  if (next === 'light') delete root.dataset.theme; else root.dataset.theme = next;
  localStorage.setItem('portfolio-theme', next);
});
const menuToggle = document.getElementById('menuToggle');
const navMenu = document.getElementById('navMenu');
menuToggle.addEventListener('click', () => {
  const open = navMenu.classList.toggle('open');
  menuToggle.setAttribute('aria-expanded', String(open));
  menuToggle.textContent = open ? '×' : '☰';
});
navMenu.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
  navMenu.classList.remove('open'); menuToggle.setAttribute('aria-expanded','false'); menuToggle.textContent='☰';
}));
document.getElementById('year').textContent = new Date().getFullYear();

const search = document.getElementById('projectSearch');
const filter = document.getElementById('categoryFilter');
const cards = [...document.querySelectorAll('.project-card')];
const empty = document.getElementById('emptyState');
function filterProjects() {
  const term = search.value.trim().toLowerCase();
  const category = filter.value;
  let shown = 0;
  cards.forEach(card => {
    const haystack = [card.dataset.name, card.dataset.category, card.dataset.year, card.dataset.tech, card.innerText].join(' ').toLowerCase();
    const match = haystack.includes(term) && (category === 'all' || card.dataset.category === category);
    card.hidden = !match; if (match) shown++;
  });
  empty.hidden = shown !== 0;
}
search.addEventListener('input', filterProjects);
filter.addEventListener('change', filterProjects);

const projectInfo = {
  gym: {category:'INFORMATION SYSTEM · ACADEMIC CONCEPT', title:'Gym Membership & Management System', description:'A system concept for streamlining gym member records, QR code-based attendance, and point-of-sale workflows.', overview:'The proposed solution brings membership management, attendance tracking, and sales operations into one organized workflow. Confirm the final features against your actual project documentation.', tech:'Role: update with your actual contribution. Technologies: add only the tools and languages used in your implementation.'},
  network: {category:'NETWORKING · ACADEMIC PROJECT', title:'Network Monitoring & Analysis', description:'A networking assignment examining performance indicators and device monitoring concepts.', overview:'The project discusses network metrics such as jitter, packet loss, connected devices, and monitoring approaches including SNMP concepts. Add your actual measurements and screenshots.', tech:'Role: update with your actual contribution. Technologies and tools: list the actual tools used for measurement and analysis.'},
  research: {category:'RESEARCH · ACADEMIC PROJECT', title:'Game-Based Learning Research', description:'An academic research project about game-based learning and problem-solving performance among Grade 12 STEM students in General Physics 2.', overview:'The study used pre-test and post-test results to examine changes in student performance. Add the final approved paper, verified results, and your precise research role.', tech:'Role: add your actual role. Methods: research design, survey instrument, and analysis methods as described in the final paper.'}
};
const dialog = document.getElementById('projectDialog');
document.querySelectorAll('.details-button').forEach(button => button.addEventListener('click', () => {
  const p = projectInfo[button.dataset.project];
  document.getElementById('dialogCategory').textContent = p.category;
  document.getElementById('dialogTitle').textContent = p.title;
  document.getElementById('dialogDescription').textContent = p.description;
  document.getElementById('dialogOverview').textContent = p.overview;
  document.getElementById('dialogTech').textContent = p.tech;
  dialog.showModal();
}));
document.getElementById('dialogClose').addEventListener('click', () => dialog.close());
dialog.addEventListener('click', e => { if (e.target === dialog) dialog.close(); });

document.getElementById('contactForm').addEventListener('submit', e => {
  e.preventDefault();
  const data = new FormData(e.currentTarget);
  const recipient = 'YOUR_EMAIL_HERE';
  if (recipient === 'YOUR_EMAIL_HERE') {
    document.getElementById('formFeedback').textContent = 'Before using this form, replace YOUR_EMAIL_HERE in script.js with your public email address.';
    return;
  }
  const subject = encodeURIComponent(data.get('subject'));
  const body = encodeURIComponent(`Name: ${data.get('name')}\nEmail: ${data.get('email')}\n\n${data.get('message')}`);
  window.location.href = `mailto:${recipient}?subject=${subject}&body=${body}`;
});
