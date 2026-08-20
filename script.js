const outcomes = {
  move: 'Choose when the five-day shift does not delay customer value. It protects quality and uses known expertise, but the revised integration-validation date must be agreed with the customer.',
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
