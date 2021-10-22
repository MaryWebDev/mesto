const enableValidation = dataObj => {
  const showInputError = (formElement, inputElement, errorMessage) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add(dataObj.inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(dataObj.errorClass);
  };

  const hideInputError = (formElement, inputElement) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove(dataObj.inputErrorClass);
    errorElement.classList.remove(dataObj.errorClass);
    errorElement.textContent = '';
  };

  const checkInputValidity = (formElement, inputElement) => {
    if (!inputElement.validity.valid) {
      showInputError(formElement, inputElement, inputElement.validationMessage);
    } else {
      hideInputError(formElement, inputElement);
    }
  };

  const setEventListeners = formElement => {
    const inputList = Array.from(formElement.querySelectorAll(dataObj.inputSelector));
    const buttonElement = formElement.querySelector(dataObj.submitButtonSelector);
    inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', function () {
        checkInputValidity(formElement, inputElement);
        toggleButtonState(inputList, buttonElement);
      });
    });
  };

  hasInvalidInput = function (inputList) {
    return inputList.some(input => !input.validity.valid);
  }

  toggleButtonState = function (inputList, buttonElement) {
    if (hasInvalidInput(inputList)) {
      buttonElement.classList.add(dataObj.inactiveButtonClass);
      buttonElement.setAttribute('disabled', true);
    } else {
      buttonElement.classList.remove(dataObj.inactiveButtonClass);
      buttonElement.removeAttribute('disabled');
    }
  }

  const formList = Array.from(document.querySelectorAll(dataObj.formSelector));
  formList.forEach((formElement) => {
    setEventListeners(formElement);
    formElement.addEventListener('submit', function (evt) {
      evt.preventDefault();
    });
  });
};

enableValidation({
  formSelector: '.popup__form',
  inputSelector: '.popup__field',
  submitButtonSelector: '.popup__submit-btn',
  inactiveButtonClass: 'popup__submit-btn_disabled',
  inputErrorClass: 'popup__field_type_error',
  errorClass: 'popup__field-error_active'
});
