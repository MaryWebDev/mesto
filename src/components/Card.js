export default class Card {
  constructor(source, caption, cardSelector, handleCardClick) {
    this._source = source;
    this._caption = caption;
    this._cardSelector = cardSelector;
    this._handleCardClick = handleCardClick;
  }

  _getTemplate() {
    const _cardElement = document
      .querySelector(this._cardSelector)
      .content
      .cloneNode(true);
    return _cardElement;
  }

  _handleRemoveCard() {
    this._deleteBtn.parentNode.remove();
  }

  _handleLikeBtn() {
    this._likeBtn.classList.toggle('elements__like-btn_is-liked');
  }

  _setEventListeners() {
    this._likeBtn.addEventListener('click', () => this._handleLikeBtn());
    this._deleteBtn.addEventListener('click', () => this._handleRemoveCard());
    this._cardImg.addEventListener('click', () => this._handleCardClick());
  }

  generateCard() {
    this._element = this._getTemplate();
    this._likeBtn = this._element.querySelector('.elements__like-btn');
    this._deleteBtn = this._element.querySelector('.elements__delete-btn');
    this._cardImg = this._element.querySelector('.elements__img');
    this._setEventListeners();
    this._cardImg.src = this._source;
    this._cardImg.alt = this._caption;
    this._element.querySelector('.elements__caption').textContent = this._caption;
    return this._element;
  }
}
