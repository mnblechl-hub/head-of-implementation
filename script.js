const filters = document.querySelectorAll('.filter');
const rows = document.querySelectorAll('.launch-row');
const toast = document.querySelector('.toast');
const modal = document.getElementById('modal');

filters.forEach(button => button.addEventListener('click', () => {
  filters.forEach(item => item.classList.remove('active'));
  button.classList.add('active');
  const riskOnly = button.dataset.filter === 'risk';
  rows.forEach(row => row.hidden = riskOnly && row.dataset.risk !== 'true');
}));

document.getElementById('applyInsight').addEventListener('click', () => {
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), 3600);
});

function openModal(title) {
  if (title) document.getElementById('modalTitle').innerHTML = `${title}<br>Technical deployment detail.`;
  modal.classList.add('open');
  modal.setAttribute('aria-hidden', 'false');
}

function closeModal() {
  modal.classList.remove('open');
  modal.setAttribute('aria-hidden', 'true');
}

document.getElementById('execBriefBtn').addEventListener('click', () => {
  document.getElementById('modalTitle').innerHTML = 'Portfolio is controlled.<br>One owner decision required.';
  openModal();
});

rows.forEach(row => row.addEventListener('click', () => openModal(row.dataset.client)));
document.querySelectorAll('[data-action]').forEach(button => button.addEventListener('click', () => openModal()));
document.querySelectorAll('.modal-close,.modal-close-action').forEach(button => button.addEventListener('click', closeModal));
modal.addEventListener('click', event => { if (event.target === modal) closeModal(); });
document.addEventListener('keydown', event => { if (event.key === 'Escape') closeModal(); });

document.querySelector('.copy-brief').addEventListener('click', async () => {
  const text = 'Steering brief: 91% of technical stage gates are on time across seven deployments. Decision: Northstar CIO to assign an identity owner today or move cutover one week.';
  try { await navigator.clipboard.writeText(text); } catch (_) {}
  closeModal();
  toast.querySelector('strong').textContent = 'Steering brief copied';
  toast.querySelector('small').textContent = 'Ready to share with your stakeholder team.';
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), 3200);
});

document.querySelector('.mobile-menu').addEventListener('click', () => document.body.classList.toggle('menu-open'));
document.querySelectorAll('.nav-item').forEach(item => item.addEventListener('click', () => {
  document.querySelectorAll('.nav-item').forEach(link => link.classList.remove('active'));
  item.classList.add('active');
  document.body.classList.remove('menu-open');
}));
