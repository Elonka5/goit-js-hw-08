import throttle from 'lodash.throttle';

const refs = {
  form: document.querySelector('.feedback-form'),
};
const STORAGE_KEY = 'feedback-form-state';

const feedbackForm = {};

refs.form.addEventListener('submit', onSubmitClickBtn);
refs.form.addEventListener('input', throttle(onInputSubmit, 500));

populateTextarea();

function onSubmitClickBtn(evt) {
  evt.preventDefault();
  localStorage.removeItem(STORAGE_KEY);
  evt.target.reset();
}

function onInputSubmit(evt) {
  feedbackForm[evt.target.name] = evt.target.value;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(feedbackForm));
  console.log(feedbackForm);
}

function populateTextarea() {
  const savedMessage = JSON.parse(localStorage.getItem(STORAGE_KEY));

  if (savedMessage) {
    feedbackForm = savedMessage;
  }
}
