import Popup from './Popup.js';

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._source = this._popup.querySelector('.photo-popup__source');
    this._caption = this._popup.querySelector('.photo-popup__caption');
  }

  open(source, caption) {
    this._source.src = source;
    this._source.alt = caption;
    this._caption.textContent = caption;
    super.open();
  }
}
