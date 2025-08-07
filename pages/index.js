import FormValidator from "../components/FromValidation.js";
import Card from "../components/card.js";

// Sample cards
const initialCards = [
  {
    name: "Yosemite Valley",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/yosemite.jpg",
  },
  {
    name: "Lake Louise",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lake-louise.jpg",
  },
  {
    name: "Bald Mountains",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/bald-mountains.jpg",
  },
  {
    name: "Latemar",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/latemar.jpg",
  },
  {
    name: "Vanoise National Park",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/vanoise.jpg",
  },
  {
    name: "Lago di Braies",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lago.jpg",
  },
];
const validationSettings = {
  inputSelector: ".modal__input",
  submitButtonSelector: ".modal__button",
  inactiveButtonClass: "modal__button_disabled",
  inputErrorClass: "modal__input_type_error",
  errorClass: "modal__error_visible",
};

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

  const card = new Card({ name, link }, cardTemplateSelector, handleImageClick);
  const newCardElement = card.getView();
  cardsList.prepend(newCardElement);

  closePopup(profileAddModal);
  profileAddTitleInput.value = "";
  profileAddDescriptionInput.value = "";
}
// function handleProfileAddSubmit(e) {
//   e.preventDefault();

//   const name = profileAddTitleInput.value.trim();
//   const link = profileAddDescriptionInput.value.trim();

//   const card = new Card({ name, link }, "#card-template", handleImageClick);
//   const cardElement = card.getView();
//   cardsList.prepend(cardElement);

//   profileAddForm.reset();
//   addCardValidator.resetValidation(); // disable submit + clear errors
//   closePopup(profileAddModal);
// }

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
