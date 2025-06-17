// validation.js

const validationConfig = {
  formSelector: ".modal__form",
  inputSelector: ".modal__input",
  submitButtonSelector: ".modal__button",
  inactiveButtonClass: "modal__button_disabled",
  inputErrorClass: "modal__input_type_error",
  errorClass: "modal__error_visible",
};

function showInputError(formEl, inputEl, config, errorMessage) {
  const errorMessageEl = formEl.querySelector(`#${inputEl.id}-error`);
  inputEl.classList.add(config.inputErrorClass);
  errorMessageEl.textContent = errorMessage;
  errorMessageEl.classList.add(config.errorClass);
}

function hideInputError(formEl, inputEl, config) {
  const errorMessageEl = formEl.querySelector(`#${inputEl.id}-error`);
  inputEl.classList.remove(config.inputErrorClass);
  errorMessageEl.textContent = "";
  errorMessageEl.classList.remove(config.errorClass);
  console.log(errorMessageEl.status);
}

function checkInputValidity(formEl, inputEl, config) {
  if (!inputEl.validity.valid) {
    showInputError(formEl, inputEl, config, inputEl.validationMessage);
  } else {
    hideInputError(formEl, inputEl, config);
  }
}

function setEventListeners(formEl, config) {
  const inputEls = [...formEl.querySelectorAll(config.inputSelector)];
  inputEls.forEach((inputEl) => {
    inputEl.addEventListener("input", () => {
      checkInputValidity(formEl, inputEl, config);
    });
  });
}

function enableValidation(config) {
  const formEls = [...document.querySelectorAll(config.formSelector)];
  formEls.forEach((formEl) => {
    formEl.addEventListener("submit", (e) => e.preventDefault());
    setEventListeners(formEl, config);
  });
}
function checkInputValidity(formEl, inputEl, config) {
  if (inputEl.type === "url" && inputEl.value && !inputEl.validity.valid) {
    showInputError(formEl, inputEl, config, "Please enter a valid URL.");
  } else if (!inputEl.validity.valid) {
    showInputError(formEl, inputEl, config, inputEl.validationMessage);
  } else {
    hideInputError(formEl, inputEl, config);
  }
}
function toggleButtonState(inputEls, buttonEl, config) {
  const isFormValid = inputEls.every((inputEl) => inputEl.validity.valid);
  if (!isFormValid) {
    buttonEl.classList.add(config.inactiveButtonClass);
    buttonEl.disabled = true;
  } else {
    buttonEl.classList.remove(config.inactiveButtonClass);
    buttonEl.disabled = false;
  }
}

function setEventListeners(formEl, config) {
  const inputEls = [...formEl.querySelectorAll(config.inputSelector)];
  const submitButton = formEl.querySelector(config.submitButtonSelector);

  toggleButtonState(inputEls, submitButton, config); // initial state

  inputEls.forEach((inputEl) => {
    inputEl.addEventListener("input", () => {
      checkInputValidity(formEl, inputEl, config);
      toggleButtonState(inputEls, submitButton, config);
    });
  });
}
function isValidUrl(string) {
  try {
    new URL(string);
    return true;
  } catch (_) {
    return false;
  }
}

enableValidation(validationConfig);
