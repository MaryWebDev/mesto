export const initialCards = [
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
].reverse();

export const dataObj = {
  inputSelector: '.popup__field',
  submitButtonSelector: '.popup__submit-btn',
  inactiveButtonClass: 'popup__submit-btn_disabled',
  inputErrorClass: 'popup__field_type_error',
  errorClass: 'popup__field-error_active'
}

export const userNameInput = document.querySelector('.popup__field_content_name');
export const userAboutInput = document.querySelector('.popup__field_content_about');
