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

// Elements
const profileAddModal = document.querySelector("#profile-add-modal");
const profileAddTitleInput = document.querySelector("#add-title-input");
const profileAddDescriptionInput = document.querySelector(
  "#add-description-input"
);
const cardsList = document.querySelector(".cards__list");
const cardCaption = document.querySelector(".modal__caption");
const cardTemplate = document.querySelector("#card-template");

const profileAddCloseButton = document.querySelector("#add-close-button");
const profileAddForm = document.querySelector("#add-card-form");

const cardImage = document.querySelector(".modal__fullscreen-image");
const profileEditButton = document.querySelector("#profile-edit-button");
const profileEditModal = document.querySelector("#profile-edit-modal");
const profileEditCloseButton = document.querySelector(".modal__close");
const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");
const profileTitleInput = document.querySelector("#profile-title-input");
const profileDescriptionInput = document.querySelector(
  "#profile-description-input"
);
const previewModal = document.querySelector("#image-preview-modal");

const addNewCardButton = document.querySelector(".profile__add-button");
const previewModalCloseButton = previewModal.querySelector(".modal__close");
const cardLikeButton = document.querySelector(".card__like-button");
const cardLikeActive = document.querySelector(".card__like-button-active");
const addOpenButton = document.querySelector("#add-submit-button");
const modals = document.querySelectorAll(".modal");
// Functions
function openPopup(modal) {
  modal.classList.add("modal_opened");
  document.addEventListener("keyup", handleEscUp);
}

function closePopup(modal) {
  modal.classList.remove("modal_opened");
  document.addEventListener("keyup", handleEscUp);
}
``;
function handleClosePopup(evt) {
  if (
    evt.target.classList.contains("modal") ||
    evt.target.classList.contains("modal__close")
  ) {
    closePopup(evt.currentTarget);
  }
}

/* isEscEvent() function
we will pass evt and action as arguments
create if else statement with condition
evt.key === "Escape"
then creat variable for popupactive = to Modal__opened
last line should be something like this
action(popupactive)
*/

/* 
make handle escape function make evt an argument
evt.preventDefault()

use your isEscEvent funtion 
isEscEvent(evt, closeModal)
pass 
*/
// Corrected isEscEvent function
function isEscEvent(evt, action) {
  if (evt.key === "Escape") {
    const openedModal = document.querySelector(".modal_opened"); // Fixed selector
    if (openedModal) {
      action(openedModal);
    }
  }
}

function handleEscUp(evt) {
  evt.preventDefault();
  isEscEvent(evt, closePopup); // Ensure closeModal is passed as the action
}

function openModal(modal) {
  modal.classList.add("modal_opened");
  document.addEventListener("keyup", handleEscUp);
}

function closeModal(modal) {
  modal.classList.remove("modal_opened");
  document.removeEventListener("keyup", handleEscUp);
}

function handleImageClick(cardData) {
  const data = cardData;
  cardImage.src = data.link;
  cardImage.alt = data.name;
  cardCaption.textContent = data.name;
  openPopup(previewModal);
}

function getCardElement(cardData) {
  const cardElement = cardTemplate.content
    .querySelector(".card")
    .cloneNode(true);
  const cardImageEl = cardElement.querySelector(".card__image");
  const cardTitleEl = cardElement.querySelector(".card__title");
  const deleteButtonEl = cardElement.querySelector(".card__delete-button");
  const cardLikeButton = cardElement.querySelector(".card__like-button");

  // Set card content
  cardImageEl.src = cardData.link;
  cardImageEl.alt = cardData.name;
  cardTitleEl.textContent = cardData.name;

  // Add delete button functionality
  deleteButtonEl.addEventListener("click", () => {
    cardElement.remove(); // Removes the specific card element
  });

  cardImageEl.addEventListener("click", () => {
    handleImageClick(cardData);
  });

  cardLikeButton.addEventListener("click", (event) => {
    event.target.classList.toggle("card__like-button-active");
  });

  return cardElement;
}

modals.forEach((modal) => {
  modal.addEventListener("mousedown", handleClosePopup);
});

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

  const newCard = getCardElement({ name, link });
  cardsList.prepend(newCard);

  closePopup(profileAddModal);

  profileAddTitleInput.value = "";
  profileAddDescriptionInput.value = "";
}

const profileEditForm = document.querySelector(".modal__form");

profileEditForm.addEventListener("submit", handleProfileEditSubmit);

// Event Listeners
profileEditButton.addEventListener("click", () => {
  profileTitleInput.value = profileTitle.textContent;
  profileDescriptionInput.value = profileDescription.textContent;
  openPopup(profileEditModal);
});

profileEditCloseButton.addEventListener("click", () =>
  closePopup(profileEditModal)
);
profileAddCloseButton.addEventListener("click", () =>
  closePopup(profileAddModal)
);
previewModalCloseButton.addEventListener("click", () =>
  closePopup(previewModal)
);

addNewCardButton.addEventListener("click", () => openPopup(profileAddModal));

profileAddForm.addEventListener("submit", handleProfileAddSubmit);

initialCards.forEach((cardData) => {
  const cardElement = getCardElement(cardData);
  cardsList.append(cardElement);
});
