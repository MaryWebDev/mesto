import {photoPopup, openPopup} from './index.js';

export class Card {
  constructor(source, caption, cardSelector) {
    this._source = source;
    this._caption = caption;
    this._cardSelector = cardSelector;
  }

  _getTemplate() {
    const _cardElement = document
      .querySelector(this._cardSelector)
      .content
      .cloneNode(true);
    return _cardElement;
  }

  _handleOpenPopup() {
    photoPopup.querySelector('.photo-popup__source').src = this._source;
    photoPopup.querySelector('.photo-popup__source').alt = this._caption;
    photoPopup.querySelector('.photo-popup__caption').textContent = this._caption;
    openPopup(photoPopup);
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
    this._cardImg.addEventListener('click', () => this._handleOpenPopup());
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
