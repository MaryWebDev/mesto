export class FormValidator {
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
    const inputList = Array.from(this._formElement.querySelectorAll(this._dataObj.inputSelector));
    const buttonElement = this._formElement.querySelector(this._dataObj.submitButtonSelector);
    inputList.forEach(inputElement => {
      inputElement.addEventListener('input', () => {
        this._checkInputValidity(inputElement);
        this._toggleButtonState(inputList, buttonElement);
      });
    });
  };

  _hasInvalidInput(inputList) {
    return inputList.some(input => !input.validity.valid);
  }

  _toggleButtonState(inputList, buttonElement) {
    if (this._hasInvalidInput(inputList)) {
      buttonElement.classList.add(this._dataObj.inactiveButtonClass);
      buttonElement.setAttribute('disabled', true);
    } else {
      buttonElement.classList.remove(this._dataObj.inactiveButtonClass);
      buttonElement.removeAttribute('disabled');
    }
  }

  enableValidation() {
    this._setEventListeners();
    this._formElement.addEventListener('submit', e => e.preventDefault());
  }
}
