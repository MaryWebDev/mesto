export default class Card {
  constructor({
                link: source,
                name: caption,
                likes,
                _id,
                owner: {_id: ownerId}
              },
              cardSelector,
              handleCardClick,
              handleLikeClick,
              handleRemoveClick
  ) {
    this._source = source;
    this._caption = caption;
    this._cardSelector = cardSelector;
    this._handleCardClick = handleCardClick;
    this._handleLikeClick = handleLikeClick;
    this._handleRemoveClick = handleRemoveClick;
    this._likes = likes;
    this._id = _id;
    this._ownerId = ownerId;
  }

  _getTemplate() {
    const _cardElement = document
      .querySelector(this._cardSelector)
      .content
      .cloneNode(true);
    return _cardElement;
  }

  removeCard() {
    this._deleteBtn.parentNode.remove();
  }

  updateLikes(updatedLikes) {
    this._likes = updatedLikes;
    this._likesCount.textContent = this._likes.length;
    this._toggleLikeBtn();
    this.isLiked = !this.isLiked;
  }

  _toggleLikeBtn() {
    this._likeBtn.classList.toggle('elements__like-btn_is-liked');
  }

  _setEventListeners() {
    this._likeBtn.addEventListener('click', () => this._handleLikeClick());
    this._deleteBtn.addEventListener('click', () => this._handleRemoveClick());
    this._cardImg.addEventListener('click', () => this._handleCardClick());
  }

  generateCard() {
    this._element = this._getTemplate();
    this._likeBtn = this._element.querySelector('.elements__like-btn');
    this._deleteBtn = this._element.querySelector('.elements__delete-btn');
    if (this._ownerId !== Card.ownerId) this._deleteBtn.remove();
    this._cardImg = this._element.querySelector('.elements__img');
    this._likesCount = this._element.querySelector('.elements__like-count');
    this._setEventListeners();
    this._cardImg.src = this._source;
    this._cardImg.alt = this._caption;
    this._likesCount.textContent = this._likes.length;
    this._element.querySelector('.elements__caption').textContent = this._caption;
    this.isLiked = this._likes.some(({_id}) => _id === Card.ownerId);
    if (this.isLiked) this._toggleLikeBtn();
    return this._element;
  }
}

