const editPopup = document.querySelector('.popup_type_edit');
const editOpenBtn = document.querySelector('.profile__edit-button');
const editCloseBtn = editPopup.querySelector('.popup__close');
const editSubmitBtn = editPopup.querySelector('.popup__submit-btn');

const addPopup = document.querySelector('.popup_type_add');
const addOpenBtn = document.querySelector('.profile__add-button');
const addCloseBtn = addPopup.querySelector('.popup__close');
const addSubmitBtn = addPopup.querySelector('.popup__submit-btn');

let nickname = document.querySelector('.profile__name');
let about = document.querySelector('.profile__about');
let editName = editPopup.querySelector('.popup__field_content_name');
let editAbout = editPopup.querySelector('.popup__field_content_about');
const addCaption = addPopup.querySelector('.popup__field_content_name');
const addSource = addPopup.querySelector('.popup__field_content_about');
const cardList = document.querySelector('.elements');
const cardTemplate = document.querySelector('.elements__item_template').content;

const togglePopup = function(popup) {
  return () => popup.classList.toggle('popup_is-opened');
}

const openEditPopup = function() {
  editName.value = nickname.textContent;
  editAbout.value = about.textContent;
  togglePopup(editPopup)();
}

editOpenBtn.addEventListener('click', openEditPopup);
editCloseBtn.addEventListener('click', togglePopup(editPopup));

const editFormElem = editPopup.querySelector('.popup__form');

const handleFormSubmit = function(e) {
  e.preventDefault();
  about.textContent = editAbout.value;
  nickname.textContent = editName.value;
  togglePopup(editPopup)();
}

editFormElem.addEventListener('submit', handleFormSubmit);

addOpenBtn.addEventListener('click', togglePopup(addPopup));
addCloseBtn.addEventListener('click', togglePopup(addPopup));

const addFormElem = addPopup.querySelector('.popup__form');

const newCard = function(source, caption) {
  const card = cardTemplate.cloneNode(true);
  card.querySelector('.elements__img').src = source;
  card.querySelector('.elements__caption').textContent = caption;
  card.querySelector('.elements__like-btn').addEventListener('click', function(e) {
    e.target.classList.toggle('elements__like-btn_is-liked');
  })
  card.querySelector('.elements__delete-btn').addEventListener('click', function(e) {
    e.target.parentNode.remove();
  })
  cardList.prepend(card);
}


const handleFormSubmit2 = function(e) {
  e.preventDefault();
  newCard(addSource.value, addCaption.value);
  togglePopup(addPopup)();
}

addFormElem.addEventListener('submit', handleFormSubmit2);

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

initialCards.reverse().forEach(function(item) {
  newCard(item.link, item.name);
})

const photoPopup = document.querySelector('.photo-popup');
const photoOpenBtnList = cardList.querySelectorAll('.elements__img');
const photoCloseBtn = photoPopup.querySelector('.popup__close');

photoOpenBtnList.forEach(photo => {
  photo.addEventListener('click', function(e) {
    photoPopup.querySelector('.photo-popup__source').src = e.target.src;
    photoPopup.querySelector('.photo-popup__caption').textContent = e.target.parentNode.querySelector('.elements__caption').textContent;
    togglePopup(photoPopup)();
  });
})
photoCloseBtn.addEventListener('click', togglePopup(photoPopup));

window.addEventListener('click', (e) => {
  if (e.target === editPopup) {
    togglePopup(editPopup)();
  }
  if (e.target === addPopup) {
    togglePopup(addPopup)();
  }
  if (e.target === photoPopup) {
    togglePopup(photoPopup)();
  }
});
