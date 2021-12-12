import Card from '../components/Card.js';
import Section from '../components/Section.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupWithSubmit from '../components/PopupWithSubmit.js';
import UserInfo from '../components/UserInfo.js';
import FormValidator from '../components/FormValidator.js';
import Api from '../components/Api.js';
import './index.css';
import {dataObj, userNameInput, userAboutInput} from '../utils/constants';


const userInfo = new UserInfo({
  profileNameSelector: '.profile__name',
  profileAboutSelector: '.profile__about',
  profileAvatarSelector: '.profile__avatar-img'
});


const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-31',
  headers: {
    authorization: '16a7ef91-d058-4e96-a003-459792f390db',
    'Content-Type': 'application/json'
  }
});


Promise.all([
  api.getProfileInfo()
    .then(res => {
      if (res.ok) {
        return res.json();
      }
    }),
  api.getInitalCards()
    .then(res => {
      if (res.ok) {
        return res.json();
      }
    })
])
  .then(([userData, cards]) => {
    userInfo.setUserInfo(userData);
    Card.ownerId = userData._id;
    cards.forEach(card => cardSection.addItem(card));
  })
  .catch(res => {
    return Promise.reject(`Ошибка: ${res.status}`);
  });


const cardSection = new Section(
  (cardData) => {
    const card = new Card(cardData,
      '.elements__item_template',
      () => popupWithImage.open(cardData.link, cardData.name),
      () => {
        if (card.isLiked) {
          api.deleteLike(cardData._id)
            .then(res => {
              if (res.ok) {
                return res.json();
              }
            })
            .then(({likes}) => {
              card.updateLikes(likes);
            })
            .catch(res => {
              return Promise.reject(`Ошибка: ${res.status}`);
            })

        } else {
          api.putLike(cardData._id)
            .then(res => {
              if (res.ok) {
                return res.json();
              }
            })
            .then(({likes}) => {
              card.updateLikes(likes);
            })
            .catch(res => {
              return Promise.reject(`Ошибка: ${res.status}`);
            })
        }
      },

      () => removePopup.open(card)
    );

    return card.generateCard();
  }, '.elements');


const popupWithEditForm = new PopupWithForm('.popup_type_edit',
  (e) => {
    popupWithEditForm.renderLoading(true);
    e.preventDefault();
    const {editName, editAbout} = popupWithEditForm.getInputValues();
    api.editUserInfo(editName, editAbout)
      .then(res => {
        if (res.ok) {
          return res.json();
        }
      })
      .then(userData => {
        userInfo.setUserInfo(userData);
        popupWithEditForm.close();
      })
      .catch(res => {
        return Promise.reject(`Ошибка: ${res.status}`);
      })
      .finally(() => popupWithEditForm.renderLoading(false));
  });
popupWithEditForm.setEventListeners();


const editOpenBtn = document.querySelector('.profile__edit-button');
editOpenBtn.addEventListener('click', () => {
  const {userName, userAbout} = userInfo.getUserInfo();
  userNameInput.value = userName;
  userAboutInput.value = userAbout;
  editFormValidator.resetValidation();
  popupWithEditForm.open();
});


const popupWithAddForm = new PopupWithForm('.popup_type_add',
  (e) => {
    popupWithAddForm.renderLoading(true);
    e.preventDefault();
    const {name, link} = popupWithAddForm.getInputValues();
    api.addCard(name, link)
      .then(res => {
        if (res.ok) {
          return res.json();
        }
      })
      .then(res => {
        cardSection.addItem(res);
        popupWithAddForm.close();
      })
      .catch(res => {
        return Promise.reject(`Ошибка: ${res.status}`);
      })
      .finally(() => popupWithAddForm.renderLoading(false));
  });
popupWithAddForm.setEventListeners();


const addOpenBtn = document.querySelector('.profile__add-button');
addOpenBtn.addEventListener('click', () => {
  popupWithAddForm.open();
  addFormValidator.resetValidation();
});


const removePopup = new PopupWithSubmit('.remove-popup',
  (e) => {
    e.preventDefault();
    const card = removePopup.getCard();
    api.deleteCard(card._id)
      .then(res => {
        if (res.ok) {
          card.removeCard();
          removePopup.close();
        }
      })
      .catch(res => {
        return Promise.reject(`Ошибка: ${res.status}`);
      })
  });
removePopup.setEventListeners();


const popupWithAvatarUrl = new PopupWithForm('.avatar-popup',
  (e) => {
    popupWithAvatarUrl.renderLoading(true);
    e.preventDefault();
    const {link} = popupWithAvatarUrl.getInputValues();
    api.updateAvatar(link)
      .then(res => {
        if (res.ok) {
          return res.json();
        }
      })
      .then(userData => {
        userInfo.setUserInfo(userData);
        popupWithAvatarUrl.close();
      })
      .catch(res => {
        return Promise.reject(`Ошибка: ${res.status}`);
      })
      .finally(() => popupWithAddForm.renderLoading(false));
  });
popupWithAvatarUrl.setEventListeners();

const updateAvatarBtn = document.querySelector('.profile__avatar-overlay');
updateAvatarBtn.addEventListener('click', () => {
  popupWithAvatarUrl.open();
  avatarFormValidator.resetValidation();
});

const editFormValidator = new FormValidator(dataObj, document.forms.profileform);
editFormValidator.enableValidation();

const addFormValidator = new FormValidator(dataObj, document.forms.cardform);
addFormValidator.enableValidation();

const avatarFormValidator = new FormValidator(dataObj, document.forms.avatarform);
avatarFormValidator.enableValidation();

const popupWithImage = new PopupWithImage('.photo-popup');
popupWithImage.setEventListeners();
