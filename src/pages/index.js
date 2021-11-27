import Card from '../components/Card.js';
import Section from '../components/Section.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import UserInfo from '../components/UserInfo.js';
import FormValidator from '../components/FormValidator.js';
import './index.css';
import {initialCards, dataObj, userNameInput, userAboutInput} from '../utils/constants';


const editFormValidator = new FormValidator(dataObj, document.forms.profileform);
editFormValidator.enableValidation();

const addFormValidator = new FormValidator(dataObj, document.forms.cardform);
addFormValidator.enableValidation();

const popupWithImage = new PopupWithImage('.photo-popup');
popupWithImage.setEventListeners();

const cardSection = new Section({
  items: initialCards,
  renderer: item => {
    const card = new Card(item.link, item.name, '.elements__item_template', () => popupWithImage.open(item.link, item.name));
    return card.generateCard();
  }
}, '.elements');
cardSection.render();


const userInfo = new UserInfo({profileNameSelector: '.profile__name', profileAboutSelector: '.profile__about'});

const popupWithEditForm = new PopupWithForm('.popup_type_edit',
  (e) => {
    e.preventDefault();
    const inputValues = popupWithEditForm.getInputValues();
    userInfo.setUserInfo(inputValues);
    popupWithEditForm.close();
  });
popupWithEditForm.setEventListeners();

const editOpenBtn = document.querySelector('.profile__edit-button');
editOpenBtn.addEventListener('click', () => {
  const {userName, userAbout}  = userInfo.getUserInfo();
  userNameInput.value = userName;
  userAboutInput.value = userAbout;
  editFormValidator.resetValidation();
  popupWithEditForm.open();
});


const popupWithAddForm = new PopupWithForm('.popup_type_add',
  (e) => {
    e.preventDefault();
    const {name, link} = popupWithAddForm.getInputValues();
    cardSection.addItem({link, name});
    popupWithAddForm.close();
  });
popupWithAddForm.setEventListeners();

const addOpenBtn = document.querySelector('.profile__add-button');
addOpenBtn.addEventListener('click', () => {
  popupWithAddForm.open();
  addFormValidator.resetValidation();
});
