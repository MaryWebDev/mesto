import Popup from './Popup.js';

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
  }

  open(source, caption) {
    this._popup.querySelector('.photo-popup__source').src = source;
    this._popup.querySelector('.photo-popup__source').alt = caption;
    this._popup.querySelector('.photo-popup__caption').textContent = caption;
    super.open();
  }
}
