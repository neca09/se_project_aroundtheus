import FormValidator from "../components/FormValidator.js";
import Card from "../components/Card.js";
import { initialCards, validationSettings } from "../pages/utils/constants.js";
// DOM Elements
const cardsList = document.querySelector(".cards__list");
const cardTemplateSelector = "#card-template";

const profileAddModal = document.querySelector("#profile-add-modal");
const profileAddTitleInput = document.querySelector("#add-title-input");
const profileAddDescriptionInput = document.querySelector(
  "#add-description-input"
);
const profileAddForm = document.querySelector("#add-card-form");
const profileAddCloseButton = document.querySelector("#add-close-button");

const profileEditButton = document.querySelector("#profile-edit-button");
const profileEditModal = document.querySelector("#profile-edit-modal");
const profileEditCloseButton = document.querySelector(".modal__close");
const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");
const profileTitleInput = document.querySelector("#profile-title-input");
const profileDescriptionInput = document.querySelector(
  "#profile-description-input"
);

const profileEditForm = document.querySelector(".modal__form");

const addNewCardButton = document.querySelector(".profile__add-button");

const previewModal = document.querySelector("#image-preview-modal");
const cardImage = previewModal.querySelector(".modal__fullscreen-image");
const cardCaption = previewModal.querySelector(".modal__caption");
const previewModalCloseButton = previewModal.querySelector(".modal__close");

const modals = document.querySelectorAll(".modal");

//class objects
const profileValidator = new FormValidator(validationSettings, profileEditForm);
profileValidator.enableValidation();

const addCardValidator = new FormValidator(validationSettings, profileAddForm);
addCardValidator.enableValidation();

// Functions
function openPopup(modal) {
  modal.classList.add("modal_opened");
  document.addEventListener("keyup", handleEscUp);
}

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

function handleProfileEditSubmit(e) {
  e.preventDefault();
  profileTitle.textContent = profileTitleInput.value.trim();
  profileDescription.textContent = profileDescriptionInput.value.trim();
  closePopup(profileEditModal);
}

function handleProfileAddSubmit(e) {
  e.preventDefault();
  const name = profileAddTitleInput.value.trim();
  const link = profileAddDescriptionInput.value.trim();

  if (!name || !link) {
    alert("Please fill in both fields.");
    return;
  }

  const newCardElement = card.getView();
  cardsList.prepend(newCardElement);

  closePopup(profileAddModal);
  profileAddTitleInput.value = "";
  profileAddDescriptionInput.value = "";
}
function handleAddCardFormSubmit(evt) {
  evt.preventDefault();

  // Get the form data
  const titleInput = document.querySelector("#card-title-input");
  const linkInput = document.querySelector("#card-link-input");

  // Create the new card data object
  const newCard = {
    name: titleInput.value,
    link: linkInput.value,
  };

  // Create a new Card instance
  const cardElement = createCard(newCard);

  // Add it to the page
  cardListSection.prepend(cardElement);

  // Reset the form
  formValidator.resetValidation();
  evt.target.reset();
}
// Initialize modals
modals.forEach((modal) => {
  modal.addEventListener("mousedown", handleClosePopup);
});

// Event listeners
profileEditForm.addEventListener("submit", handleProfileEditSubmit);
profileAddForm.addEventListener("submit", handleProfileAddSubmit);

profileEditButton.addEventListener("click", () => {
  profileTitleInput.value = profileTitle.textContent;
  profileDescriptionInput.value = profileDescription.textContent;
  profileValidator.resetValidation(); // clear old errors
  openPopup(profileEditModal);
});

addNewCardButton.addEventListener("click", () => openPopup(profileAddModal));

// Render initial cards
initialCards.forEach((cardData) => {
  const card = new Card(cardData, cardTemplateSelector, handleImageClick);
  const cardElement = card.getView();
  cardsList.append(cardElement);
});
