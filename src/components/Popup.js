export default class Popup {
  constructor(popupSelector) {
    this._popup = document.querySelector(popupSelector);
  }

  open() {
    this._popup.classList.add('popup_is-opened');
    window.addEventListener('keydown', this._handleEscClose.bind(this));
  }

  close() {
    this._popup.classList.remove('popup_is-opened');
    window.removeEventListener('keydown', this._handleEscClose.bind(this));
  }

  _handleEscClose(e) {
    if (e.key === 'Escape') {
      this.close();
    }
  }

  setEventListeners() {
    this._popup.addEventListener('click', e => {
      if (e.target === e.currentTarget) {
        this.close();
      }
      if (e.target.classList.contains('popup__close')) {
        this.close();
      }
    }, true);
  }
}
