import Popup from './Popup.js';

export default class PopupWithSubmit extends Popup {
  constructor(popupSelector, handleFormSubmit) {
    super(popupSelector);
    this._handleFormSubmit = handleFormSubmit;
    this.submitBtn = this._popup.querySelector('.popup__submit-btn');
  }

  setEventListeners() {
    super.setEventListeners();
    this._popup.addEventListener('submit', this._handleFormSubmit);
  }

  open(card) {
    this.card = card;
    super.open();
  }

  getCard() {
    return this.card;
  }

  renderLoading(isLoading) {
    this.submitBtn.textContent = isLoading ? 'Сохранение...' : 'Сохранить';
  }
}
