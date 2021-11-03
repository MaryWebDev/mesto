import {Card} from './Card.js';
import {FormValidator} from './FormValidator.js';

const popupList = document.querySelectorAll('.popup');
const editPopup = document.querySelector('.popup_type_edit');
const editOpenBtn = document.querySelector('.profile__edit-button');
const editSubmitBtn = editPopup.querySelector('.popup__submit-btn');
const addPopup = document.querySelector('.popup_type_add');
const addOpenBtn = document.querySelector('.profile__add-button');
const addSubmitBtn = addPopup.querySelector('.popup__submit-btn');
const nickname = document.querySelector('.profile__name');
const about = document.querySelector('.profile__about');
const editName = editPopup.querySelector('.popup__field_content_name');
const editAbout = editPopup.querySelector('.popup__field_content_about');
const addCaption = addPopup.querySelector('.popup__field_content_name');
const addSource = addPopup.querySelector('.popup__field_content_about');
const cardList = document.querySelector('.elements');
export const photoPopup = document.querySelector('.photo-popup');

const dataObj = {
  inputSelector: '.popup__field',
  submitButtonSelector: '.popup__submit-btn',
  inactiveButtonClass: 'popup__submit-btn_disabled',
  inputErrorClass: 'popup__field_type_error',
  errorClass: 'popup__field-error_active'
}

const editFormValidator = new FormValidator(dataObj, document.forms.profileform);
editFormValidator.enableValidation();

const addFormValidator = new FormValidator(dataObj, document.forms.cardform);
addFormValidator.enableValidation();

const closePopupByEsc = e => {
  if (e.key === 'Escape') {
    closePopup(document.querySelector('.popup_is-opened'));
  }
}

export const openPopup = popup => {
  popup.classList.add('popup_is-opened');
  window.addEventListener('keydown', closePopupByEsc);
}

const closePopup = popup => {
  popup.classList.remove('popup_is-opened');
  window.removeEventListener('keydown', closePopupByEsc);
}

const openEditPopup = () => {
  editName.value = nickname.textContent;
  editAbout.value = about.textContent;
  editName.dispatchEvent(new Event('input'));
  editAbout.dispatchEvent(new Event('input'));
  openPopup(editPopup);
}

editOpenBtn.addEventListener('click', openEditPopup);

const editFormElem = editPopup.querySelector('.popup__form');

const handleFormSubmit = e => {
  e.preventDefault();
  about.textContent = editAbout.value;
  nickname.textContent = editName.value;
  closePopup(editPopup);
}

editFormElem.addEventListener('submit', handleFormSubmit);

addOpenBtn.addEventListener('click', () => {
  openPopup(addPopup);
  addFormValidator.resetValidation();
});

const addFormElem = addPopup.querySelector('.popup__form');

const initialCards = [
  {
    name: 'Hogwarts',
    link: 'https://images.unsplash.com/photo-1618944913480-b67ee16d7b77?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1170&q=80'
  },
  {
    name: 'Acceptance letter',
    link: 'https://images.unsplash.com/photo-1598153346810-860daa814c4b?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1632&q=80'
  },
  {
    name: 'Hogwarts Express',
    link: 'https://images.unsplash.com/photo-1547756536-cde3673fa2e5?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1241&q=80'
  },
  {
    name: 'Hogsmeade Village',
    link: 'https://images.unsplash.com/photo-1618945034853-b46e0475da11?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80'
  },
  {
    name: 'Platform 9¾',
    link: 'https://images.unsplash.com/photo-1618944847828-82e943c3bdb7?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1170&q=80'
  },
  {
    name: 'Hedwig',
    link: 'https://images.unsplash.com/photo-1586796676789-f6fe8cc276f7?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=687&q=80'
  }
];

popupList.forEach(popup => {
  popup.addEventListener('click', e => {
    if (e.target === e.currentTarget) {
      closePopup(popup);
    }
    if (e.target.classList.contains('popup__close')) {
      closePopup(popup);
    }
  }, true);
});

const createCard = (source, caption) => {
  const card = new Card(source, caption, '.elements__item_template');
  const cardElement = card.generateCard();
  return cardElement;
}

initialCards.forEach(item => {
  const cardElement = createCard(item.link, item.name);
  cardList.append(cardElement);
});

const handleFormSubmit2 = e => {
  e.preventDefault();
  const cardElement = createCard(addSource.value, addCaption.value);
  cardList.prepend(cardElement);
  closePopup(addPopup);
  addSource.value = '';
  addCaption.value = '';
}
addFormElem.addEventListener('submit', handleFormSubmit2);
