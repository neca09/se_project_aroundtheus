// src/pages/index.js

import FormValidator from "../components/FormValidator.js";
import Card from "../components/Card.js";
import { initialCards, validationSettings } from "../pages/utils/constants.js";

// DOM Elements
const cardsList = document.querySelector(".cards__list");
const cardTemplateSelector = "#card-template";

const profileAddModal = document.querySelector("#profile-add-modal");
const profileAddForm = document.querySelector("#add-card-form");
const profileAddTitleInput = document.querySelector("#card-title-input");
const profileAddLinkInput = document.querySelector("#card-link-input");

const profileEditButton = document.querySelector("#profile-edit-button");
const profileEditModal = document.querySelector("#profile-edit-modal");
const profileEditForm = document.querySelector(".modal__form");
const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");
const profileTitleInput = document.querySelector("#profile-title-input");
const profileDescriptionInput = document.querySelector(
  "#profile-description-input"
);

const addNewCardButton = document.querySelector(".profile__add-button");

const previewModal = document.querySelector("#image-preview-modal");
const cardImage = previewModal.querySelector(".modal__fullscreen-image");
const cardCaption = previewModal.querySelector(".modal__caption");

const modals = document.querySelectorAll(".modal");

// Validators
const profileValidator = new FormValidator(validationSettings, profileEditForm);
profileValidator.enableValidation();

const addCardValidator = new FormValidator(validationSettings, profileAddForm);
addCardValidator.enableValidation();

/**
 * Create a Card instance and return its DOM element
 */
function createCard(cardData) {
  const card = new Card(cardData, cardTemplateSelector, handleImageClick);
  return card.getView();
}

/**
 * Render a card into the given container
 */
function renderCard(cardData, container) {
  const cardElement = createCard(cardData);
  container.prepend(cardElement);
}

/**
 * Open popup
 */
function openPopup(modal) {
  modal.classList.add("modal_opened");
  document.addEventListener("keyup", handleEscUp);
}

/**
 * Close popup
 */
function closePopup(modal) {
  modal.classList.remove("modal_opened");
  document.removeEventListener("keyup", handleEscUp);
}

function handleClosePopup(evt) {
  if (
    evt.target.classList.contains("modal") ||
    evt.target.classList.contains("modal__close")
  ) {
    closePopup(evt.currentTarget);
  }
}

function isEscEvent(evt, action) {
  if (evt.key === "Escape") {
    const openedModal = document.querySelector(".modal_opened");
    if (openedModal) {
      action(openedModal);
    }
  }
}

function handleEscUp(evt) {
  evt.preventDefault();
  isEscEvent(evt, closePopup);
}

function handleImageClick(cardData) {
  cardImage.src = cardData.link;
  cardImage.alt = cardData.name;
  cardCaption.textContent = cardData.name;
  openPopup(previewModal);
}

function handleProfileEditSubmit(evt) {
  evt.preventDefault();
  profileTitle.textContent = profileTitleInput.value.trim();
  profileDescription.textContent = profileDescriptionInput.value.trim();
  closePopup(profileEditModal);
}

function handleAddCardFormSubmit(evt) {
  evt.preventDefault();

  const newCard = {
    name: profileTitleInput.value.trim(),
    link: profileDescriptionInput.value.trim(),
  };

  // if (!newCard.name || !newCard.link) {
  //   alert("Please fill in both fields.");
  //   return;
  // }

  renderCard(newCard, cardsList);

  addCardValidator.resetValidation();
  evt.target.reset();
  closePopup(profileAddModal);
}

// Initialize modals
modals.forEach((modal) => {
  modal.addEventListener("mousedown", handleClosePopup);
});

// Event listeners
profileEditForm.addEventListener("submit", handleProfileEditSubmit);
profileAddForm.addEventListener("submit", handleAddCardFormSubmit);

profileEditButton.addEventListener("click", () => {
  profileTitleInput.value = profileTitle.textContent;
  profileDescriptionInput.value = profileDescription.textContent;
  profileValidator.resetValidation();
  openPopup(profileEditModal);
});

addNewCardButton.addEventListener("click", () => {
  addCardValidator.resetValidation();
  openPopup(profileAddModal);
});

// Render initial cards
initialCards.forEach((cardData) => {
  renderCard(cardData, cardsList);
});
