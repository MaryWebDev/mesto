let popup = document.querySelector('.edit-popup');
let openBtn = document.querySelector('.profile__edit-button');
let closeBtn = popup.querySelector('.edit-popup__close');
let submitBtn = popup.querySelector('.edit-popup__submit-btn');
let nickname = document.querySelector('.profile__name');
let about = document.querySelector('.profile__about');
let editName = document.querySelector('.edit-popup__field_content_name');
let editAbout = document.querySelector('.edit-popup__field_content_about');
let likeBtnList = document.querySelectorAll('.elements__like-btn');

[...likeBtnList].forEach(function eventListener(btn) {
  btn.addEventListener('click', function likeToggle() {
    btn.classList.toggle('elements__like-btn_is-liked');
  });
});

function displayToggle() {
  popup.classList.toggle('edit-popup_is-opened');
}

function openPopup () {
  displayToggle();
  editName.value = nickname.textContent;
  editAbout.value = about.textContent;
}
openBtn.addEventListener('click', openPopup);

closeBtn.addEventListener('click', displayToggle);

const formElem = document.querySelector('.edit-popup__form');

function handleFormSubmit(e) {
  e.preventDefault();
  about.textContent = editAbout.value;
  nickname.textContent = editName.value;
  displayToggle();
}
formElem.addEventListener('submit', handleFormSubmit);

window.addEventListener('click', (event) => {
  if (event.target === popup) {
    displayToggle();
  }
});
