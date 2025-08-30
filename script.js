// script.js
const modal = document.getElementById('subscribeModal');
const subscribeButtons = document.querySelectorAll('.subscribe');
const modalSubscribe = document.querySelector('.modal-subscribe');

// Open modal on subscribe button click
subscribeButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    modal.style.display = 'flex';
  });
});

// Close modal when clicking outside modal content
window.addEventListener('click', (event) => {
  if (event.target === modal) {
    modal.style.display = 'none';
  }
});

modalSubscribe.addEventListener('click', () => {
  // Her kan du tilføje funktionalitet, fx sende email til server
  modal.style.display = 'none';
});

const modalInput = document.querySelector('.modal-input');

modalInput.addEventListener('focus', () => {
  modalInput.placeholder = '';
});

modalInput.addEventListener('blur', () => {
  modalInput.placeholder = 'ENTER EMAIL';
});