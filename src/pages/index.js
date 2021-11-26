import Card from '../components/Card.js';
import Section from '../components/Section.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import UserInfo from '../components/UserInfo.js';
import FormValidator from '../components/FormValidator.js';
import './index.css';

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

const popupWithImage = new PopupWithImage('.photo-popup');
popupWithImage.setEventListeners();

const createCard = (source, caption) => {
  const card = new Card(source, caption, '.elements__item_template', () => popupWithImage.open(source, caption));
  const cardElement = card.generateCard();
  return cardElement;
}

const cardSection = new Section({
  items: initialCards,
  renderer: item => {
    const cardElement = createCard(item.link, item.name);
    document.querySelector('.elements').append(cardElement);
  }
}, '.elements');
cardSection.render();


const userInfo = new UserInfo({profileNameSelector: '.profile__name', profileAboutSelector: '.profile__about'});

const popupWithEditForm = new PopupWithForm('.popup_type_edit',
  (e) => {
    e.preventDefault();
    const inputValues = popupWithEditForm._getInputValues();
    userInfo.setUserInfo(inputValues);
    popupWithEditForm.close();
  });
popupWithEditForm.setEventListeners();

const editOpenBtn = document.querySelector('.profile__edit-button');
editOpenBtn.addEventListener('click', () => {
  const userNameInput = popupWithEditForm._popup.querySelector('.popup__field_content_name');
  const userAboutInput = popupWithEditForm._popup.querySelector('.popup__field_content_about');
  userNameInput.value = userInfo.getUserInfo().userName;
  userAboutInput.value = userInfo.getUserInfo().userAbout;
  userNameInput.dispatchEvent(new Event('input'));
  userAboutInput.dispatchEvent(new Event('input'));
  popupWithEditForm.open();
});


const popupWithAddForm = new PopupWithForm('.popup_type_add',
  (e) => {
    e.preventDefault();
    const inputValues = popupWithAddForm._getInputValues();
    const cardElement = createCard(...inputValues.reverse());
    cardSection.addItem(cardElement);
    popupWithAddForm.close();
  });
popupWithAddForm.setEventListeners();

const addOpenBtn = document.querySelector('.profile__add-button');
addOpenBtn.addEventListener('click', () => {
  popupWithAddForm.open();
  addFormValidator.resetValidation();
});
