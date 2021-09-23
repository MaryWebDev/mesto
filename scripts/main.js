let popup = document.querySelector('.edit-popup');
let openBtn = document.querySelector('.profile__edit-button');
let closeBtn = popup.querySelector('.edit-popup__close');
let submitBtn = popup.querySelector('.edit-popup__submit-btn');
let nickname = document.querySelector('.profile__name');
let about = document.querySelector('.profile__about');
let editName = document.querySelector('.edit-popup__name');
let editAbout = document.querySelector('.edit-popup__about');

openBtn.addEventListener('click', () => {
  popup.style.display = 'block';
  editName.value = nickname.textContent;
  editAbout.value = about.textContent;
  document.addEventListener("keyup", (event) => {
    if (event.keyCode === 13) {
      submitBtn.click();
    }
  });
});

closeBtn.addEventListener('click', () => popup.style.display = 'none');

submitBtn.addEventListener('click',  () => {
  about.textContent = editAbout.value;
  nickname.textContent = editName.value;
  popup.style.display = 'none';
});

window.addEventListener('click', (event) => {
  if (event.target === popup) {
    popup.style.display = 'none';
  }
});
