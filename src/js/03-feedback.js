import throttle from 'lodash.throttle';

const form = document.querySelector('.feedback-form');
const inputMessage = document.querySelector('.feedback-form textarea');
const inputEmail = document.querySelector('.feedback-form input');
const KEY_STORAGE = 'feedback-form-state';

const inputValue = localStorage.getItem(KEY_STORAGE);


if (inputValue !== null && inputValue !== '') {
  const parseSetting = JSON.parse(inputValue);
  inputEmail.value = parseSetting.email;
  inputMessage.value = parseSetting.message;
}

let objects = {
  email: inputEmail.value,
  message: inputMessage.value,
};

function onChangeHandler(event) {
  objects[event.target.name] = event.target.value;
  localStorage.setItem(KEY_STORAGE, JSON.stringify(objects));
}

function onSubmitHandler(event) {
  event.preventDefault();
  console.log(objects);
  localStorage.setItem(KEY_STORAGE, '');
  event.currentTarget.reset();
}

form.addEventListener('input', throttle(onChangeHandler, 500));
form.addEventListener('submit', onSubmitHandler);
