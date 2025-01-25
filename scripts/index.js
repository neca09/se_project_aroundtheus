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
const cardTemplate = document.querySelector("#card-template").content;

const profileAddCloseButton = document.querySelector("#add-close-button");
const profileAddForm = document.querySelector("#add-card-form");
const cardListEl = document.querySelector(".cards__list");

const profileEditButton = document.querySelector("#profile-edit-button");
const profileEditModal = document.querySelector("#profile-edit-modal");
const profileEditCloseButton = document.querySelector(".modal__close");
const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");
const profileTitleInput = document.querySelector("#profile-title-input");
const profileDescriptionInput = document.querySelector(
  "#profile-description-input"
);

const addNewCardButton = document.querySelector(".profile__add-button");

// Functions
function openPopup(modal) {
  modal.classList.add("modal_opened");
}

function closePopup(modal) {
  modal.classList.remove("modal_opened");
}

function getCardElement(cardData) {
  const cardElement = cardTemplate.querySelector(".card").cloneNode(true);
  const cardImageEl = cardElement.querySelector(".card__image");
  const cardTitleEl = cardElement.querySelector(".card__title");
  const deleteButtonEl = cardElement.querySelector(".card__delete-button");

  // Set card content
  cardImageEl.src = cardData.link;
  cardImageEl.alt = cardData.name;
  cardTitleEl.textContent = cardData.name;

  // Add delete button functionality
  deleteButtonEl.addEventListener("click", () => {
    cardElement.remove(); // Removes the specific card element
  });

  return cardElement;
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

  const newCard = getCardElement({ name, link });
  cardListEl.prepend(newCard);

  profileAddForm();
  closePopup(profileAddModal);
}

const profileEditForm = document.querySelector(".modal__form");

profileEditForm.addEventListener("submit", handleProfileEditSubmit);

// Fullscreen Image View
function openImageFullscreen(imageSrc, imageAlt) {
  // Create fullscreen overlay dynamically
  const fullscreenOverlay = document.createElement("div");
  fullscreenOverlay.className = "fullscreen-overlay";

  // Add image content
  fullscreenOverlay.innerHTML = `
    <img class="fullscreen-image" src="${imageSrc}" alt="${imageAlt}" />
    <button class="fullscreen-close">&times;</button>
  `;

  // Append overlay to the body
  document.body.appendChild(fullscreenOverlay);

  // Close functionality
  const closeButton = fullscreenOverlay.querySelector(".fullscreen-close");
  closeButton.addEventListener("click", () => {
    fullscreenOverlay.remove();
  });

  // Allow clicking anywhere on the overlay to close
  fullscreenOverlay.addEventListener("click", (event) => {
    if (event.target === fullscreenOverlay) {
      fullscreenOverlay.remove();
    }
  });
}

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

profileAddForm.addEventListener("submit", handleProfileAddSubmit);

initialCards.forEach((cardData) => {
  const cardElement = getCardElement(cardData);
  cardListEl.append(cardElement);
});

addNewCardButton.addEventListener("click", () => openPopup(profileAddModal));

cardListEl.addEventListener("click", (event) => {
  if (event.target.classList.contains("card__image")) {
    const imageSrc = event.target.src;
    const imageAlt = event.target.alt;
    openImageFullscreen(imageSrc, imageAlt); // Open fullscreen view
  } else if (event.target.classList.contains("card__like-button")) {
    event.target.classList.toggle("card__like-button_active");
  }
});

// Open modal on image click
imageCards.forEach(image => {
  image.addEventListener('click', () => {
    // Set the modal image source to the clicked image
    fullscreenImage.src = image.src;

    // Set the caption text (use alt attribute or data-name)
    const captionText = image.alt || image.getAttribute('data-name') || 'Untitled';
    document.getElementById('imageCaption').textContent = captionText;

    // Show the modal
    modal.style.display = 'flex';
  });
});

// Close modal on close button click
closeModal.addEventListener('click', () => {
  modal.style.display = 'none';
  fullscreenImage.src = ''; // Clear the image source
  document.getElementById('imageCaption').textContent = ''; // Clear the caption text
});

// Close modal on outside click
modal.addEventListener('click', (e) => {
  if (e.target === modal) {
    modal.style.display = 'none';
    fullscreenImage.src = ''; // Clear the image source
    document.getElementById('imageCaption').textContent = ''; // Clear the caption text
  }
});

function openImageFullscreen(imageSrc, imageAlt) {
  // Create fullscreen overlay dynamically
  const fullscreenOverlay = document.createElement("div");
  fullscreenOverlay.className = "fullscreen-overlay";

  // Add image content
  fullscreenOverlay.innerHTML = `
    <img class="fullscreen-image" src="${imageSrc}" alt="${imageAlt}" />
    <p class="fullscreen-caption">${imageAlt}</p>
    <button class="fullscreen-close">&times;</button>
    </div>
  `;

  // Append overlay to the body
  document.body.appendChild(fullscreenOverlay);

  // Close functionality
  const closeButton = fullscreenOverlay.querySelector(".fullscreen-close");
  closeButton.addEventListener("click", () => {
    fullscreenOverlay.remove();
  });

  // Allow clicking anywhere on the overlay to close
  fullscreenOverlay.addEventListener("click", (event) => {
    if (event.target === fullscreenOverlay) {
      fullscreenOverlay.remove();
    }
  });
}