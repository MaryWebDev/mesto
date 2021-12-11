import Popup from './Popup.js';

export default class PopupWithForm extends Popup {
  constructor(popupSelector, handleFormSubmit) {
    super(popupSelector);
    this._handleFormSubmit = handleFormSubmit;
    this._inputList = this._popup.querySelectorAll('.popup__field');
    this._form = this._popup.querySelector('.popup__form');
    this.submitBtn = this._form.querySelector('.popup__submit-btn');
  }

  getInputValues() {
    this._formValues = {};
    this._inputList.forEach(input => this._formValues[input.name] = input.value);
    return this._formValues;
  }

  setEventListeners() {
    super.setEventListeners();
    this._popup.addEventListener('submit', this._handleFormSubmit);
  }

  close() {
    super.close();
    this._form.reset();
  }

  renderLoading(isLoading) {
    this.submitBtn.textContent = isLoading ? 'Сохранение...' : 'Сохранить';
  }
}
