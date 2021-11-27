export default class UserInfo {
  constructor({profileNameSelector, profileAboutSelector}) {
    this._profileName = document.querySelector(profileNameSelector);
    this._profileAbout = document.querySelector(profileAboutSelector);
  }

  getUserInfo() {
    return ({userName: this._profileName.textContent, userAbout: this._profileAbout.textContent});
  }

  setUserInfo({editName, editAbout}) {
    this._profileName.textContent = editName;
    this._profileAbout.textContent = editAbout;
  }
}
