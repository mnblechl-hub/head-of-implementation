const briefModal = document.getElementById('briefModal');
const briefOpeners = document.querySelectorAll('#briefButton, #caseBriefButton');
const briefClosers = document.querySelectorAll('.modal-close, .modal-done');

function openBrief() {
  briefModal.classList.add('open');
  briefModal.setAttribute('aria-hidden', 'false');
  document.querySelector('.modal-close').focus();
}

function closeBrief() {
  briefModal.classList.remove('open');
  briefModal.setAttribute('aria-hidden', 'true');
}

briefOpeners.forEach(button => button.addEventListener('click', openBrief));
briefClosers.forEach(button => button.addEventListener('click', closeBrief));

briefModal.addEventListener('click', event => {
  if (event.target === briefModal) closeBrief();
});

document.addEventListener('keydown', event => {
  if (event.key === 'Escape') closeBrief();
});

const outcomes = {
  move: 'Recommended: move Iris validation five days. Both cutovers retain skilled coverage and the customer milestone remains protected.',
  reassign: 'Not recommended: reassigning the work keeps the date but introduces an avoidable Epic skills gap during validation.',
  contract: 'Viable if timing is fixed: specialist capacity protects both dates, with an additional $8.4k cost requiring approval.'
};

const choiceButtons = document.querySelectorAll('[data-choice]');
const choiceResult = document.getElementById('choiceResult');

choiceButtons.forEach(button => button.addEventListener('click', () => {
  choiceButtons.forEach(item => item.classList.remove('active'));
  button.classList.add('active');
  choiceResult.textContent = outcomes[button.dataset.choice];
}));
