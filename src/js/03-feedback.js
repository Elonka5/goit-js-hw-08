import throttle from 'lodash.throttle';

const form = document.querySelector('.feedback-form');
const inputMessage = document.querySelector('.feedback-form textarea');
const inputEmail = document.querySelector('.feedback-form input');
const KEY_STORAGE = 'feedback-form-state';

let inputValue = JSON.parse(localStorage.getItem(KEY_STORAGE)) || {};
console.log(inputValue);

inputEmail.value = inputValue.email || '';
inputMessage.value = inputValue.message || '';

const savedSettings = throttle(() => {
  let objects = {
    email: inputEmail.value,
    message: inputMessage.value,
  };
  localStorage.setItem(KEY_STORAGE, JSON.stringify(objects));
}, 500);

form.addEventListener('input', savedSettings);
form.addEventListener('submit', event => {
  event.preventDefault();
  form.removeEventListener('input', savedSettings)
  localStorage.removeItem(KEY_STORAGE);
  inputEmail.value = '';
  inputMessage.value = '';
});
