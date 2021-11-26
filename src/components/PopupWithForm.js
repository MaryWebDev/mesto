import Popup from './Popup.js';

export default class PopupWithForm extends Popup {
  constructor(popupSelector, handleFormSubmit) {
    super(popupSelector);
    this._handleFormSubmit = handleFormSubmit;
  }

  _getInputValues() {
    const inputValues = [];
    const inputList = this._popup.querySelectorAll('.popup__field');
    inputList.forEach(input => inputValues.push(input.value));
    return inputValues;
  }

  setEventListeners() {
    super.setEventListeners();
    this._popup.addEventListener('submit', this._handleFormSubmit);
  }

  close() {
    super.close();
    this._popup.querySelector('.popup__form').reset();
  }
}
