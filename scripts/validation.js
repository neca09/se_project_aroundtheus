// validation.js

const validationConfig = {
  formSelector: ".modal__form",
  inputSelector: ".modal__input",
  submitButtonSelector: ".modal__button",
  inactiveButtonClass: "modal__button_disabled",
  inputErrorClass: "modal__input_type_error",
  errorClass: "popup__error_visible",
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
  if (inputEl.type === "url" && inputEl.value && !isValidUrl(inputEl.value)) {
    showInputError(formEl, inputEl, config, "Please enter a valid URL.");
  } else if (!inputEl.validity.valid) {
    showInputError(formEl, inputEl, config, inputEl.validationMessage);
  } else {
    hideInputError(formEl, inputEl, config);
  }
}

enableValidation(validationConfig);
