class Card {
  constructor(data, cardSelector, handleImageClick) {
    this._name = data.name;
    this._link = data.link;
    this._cardSelector = cardSelector;
    this._handleImageClick = handleImageClick;
  }

  _getTemplate() {
    const template = document
      .querySelector(this._cardSelector)
      .content.querySelector(".card")
      .cloneNode(true);
    return template;
  }

  _setEventListeners() {
    this._likeButton.addEventListener("click", () => {
      this._handleLike();
    });

    this._deleteButton.addEventListener("click", () => {
      this._handleDelete();
    });

    this._cardImageElement.addEventListener("click", () => {
      this._handleImageClick({ name: this._name, link: this._link });
    });
  }

  _handleLike() {
    this._likeButton.classList.toggle("card__like-button_is-active");
  }

  _handleDelete() {
    this._element.remove();
    this._element = null;
  }

  getView() {
    this._element = this._getTemplate();

    this._cardImageElement = this._element.querySelector(".card__image");
    this._likeButton = this._element.querySelector(".card__like-button");
    this._deleteButton = this._element.querySelector(".card__delete-button");
    this._titleElement = this._element.querySelector(".card__title");

    this._cardImageElement.src = this._link;
    this._cardImageElement.alt = this._name;
    this._titleElement.textContent = this._name;

    this._setEventListeners();

    return this._element;
  }
}

export default Card;
