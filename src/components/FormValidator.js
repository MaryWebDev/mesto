export default class FormValidator {
  constructor(dataObj, formElement) {
    this._formElement = formElement;
    this._dataObj = dataObj;
  }

  _showInputError(inputElement, errorMessage) {
    const errorElement = this._formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add(this._dataObj.inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(this._dataObj.errorClass);
  };

  _hideInputError(inputElement) {
    const errorElement = this._formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove(this._dataObj.inputErrorClass);
    errorElement.classList.remove(this._dataObj.errorClass);
    errorElement.textContent = '';
  };

  _checkInputValidity(inputElement) {
    if (!inputElement.validity.valid) {
      this._showInputError(inputElement, inputElement.validationMessage);
    } else {
      this._hideInputError(inputElement);
    }
  };

  _setEventListeners() {
    this._inputList.forEach(inputElement => {
      inputElement.addEventListener('input', () => {
        this._checkInputValidity(inputElement);
        this._toggleButtonState();
      });
    });
  };

  _hasInvalidInput() {
    return this._inputList.some(input => !input.validity.valid);
  }

  resetValidation() {
    this._toggleButtonState();
    this._inputList.forEach(inputElement => this._hideInputError(inputElement));
  }

  _toggleButtonState() {
    if (this._hasInvalidInput()) {
      this._buttonElement.classList.add(this._dataObj.inactiveButtonClass);
      this._buttonElement.setAttribute('disabled', true);
    } else {
      this._buttonElement.classList.remove(this._dataObj.inactiveButtonClass);
      this._buttonElement.removeAttribute('disabled');
    }
  }

  enableValidation() {
    this._inputList = Array.from(this._formElement.querySelectorAll(this._dataObj.inputSelector));
    this._buttonElement = this._formElement.querySelector(this._dataObj.submitButtonSelector);
    this._setEventListeners();
    this._formElement.addEventListener('submit', e => e.preventDefault());
  }
}
