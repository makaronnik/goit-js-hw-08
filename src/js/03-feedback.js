import throttle from 'lodash.throttle';

const LOCAL_STORAGE_KEY = 'feedback-form-state';

const refs = {
  form: document.querySelector('.feedback-form'),
  emailInput: document.querySelector('.feedback-form input'),
  messageInput: document.querySelector('.feedback-form textarea'),
};

const formData = {
  email: '',
  message: '',
};

const throttledSaveFormDataToLocalStorage = throttle(
  saveFormDataToLocalStorage,
  500
);

function saveFormDataToLocalStorage() {
  try {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(formData));
  } catch (e) {
    console.error(e);
  }
}

function saveInputData(name, value) {
  if (formData[name] === '' && value === '') {
    return;
  }

  formData[name] = value;

  throttledSaveFormDataToLocalStorage();
}

function checkTheFieldsAreFilled(elements) {
  return elements.email.value.length > 0 && elements.message.value.length > 0;
}

function alertFieldsAreNotFilled() {
  alert('Не всі поля заповнені! Заповніть будь ласка.');
}

function clearSavedData() {
  formData.email = '';
  formData.message = '';

  localStorage.removeItem(LOCAL_STORAGE_KEY);
}

function onInput({ target: { name, value } }) {
  saveInputData(name, value);
}

function onFormSubmit(event) {
  event.preventDefault();

  throttledSaveFormDataToLocalStorage.cancel();

  const form = event.target;

  if (!checkTheFieldsAreFilled(form.elements)) {
    alertFieldsAreNotFilled();

    return;
  }

  console.log(formData);

  form.reset();

  clearSavedData();
}

function setFormDataFromLocalStorage() {
  const jsonData = localStorage.getItem(LOCAL_STORAGE_KEY);

  if (jsonData !== undefined) {
    try {
      data = JSON.parse(jsonData);

      refs.emailInput.value = formData.email = data?.email ?? '';
      refs.messageInput.value = formData.message = data?.message ?? '';
    } catch (e) {
      console.error(e);
    }
  }
}

setFormDataFromLocalStorage();

refs.form.addEventListener('input', onInput);
refs.form.addEventListener('submit', onFormSubmit);
