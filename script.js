const main = document.querySelector('main');
const preferredSectionOrder = ['case-study', 'decisions', 'method', 'outcomes', 'fit', 'ramp'];
const closingStatement = document.querySelector('.closing-statement');

preferredSectionOrder.forEach(id => main.append(document.getElementById(id)));
main.append(closingStatement);

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
  move: 'Choose when the five-day shift does not delay customer value. It protects quality and uses known expertise, but the revised dependency date must be agreed with Iris.',
  reassign: 'Choose only when the second engineer has verified capability and support. It protects both dates, but Implementation explicitly accepts the higher quality risk.',
  contract: 'Choose when both dates are commercially or clinically fixed. It protects the schedule, but cost, onboarding time, and decision authority must be confirmed.'
};

const choiceButtons = document.querySelectorAll('[data-choice]');
const choiceResult = document.getElementById('choiceResult');

choiceButtons.forEach(button => button.addEventListener('click', () => {
  choiceButtons.forEach(item => item.classList.remove('active'));
  button.classList.add('active');
  choiceResult.textContent = outcomes[button.dataset.choice];
}));
