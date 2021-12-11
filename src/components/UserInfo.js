export default class UserInfo {
  constructor({profileNameSelector, profileAboutSelector, profileAvatarSelector}) {
    this._profileName = document.querySelector(profileNameSelector);
    this._profileAbout = document.querySelector(profileAboutSelector);
    this._profileAvatar= document.querySelector(profileAvatarSelector);
  }

  getUserInfo() {
    return ({userName: this._profileName.textContent, userAbout: this._profileAbout.textContent});
  }

  setUserInfo({editName, editAbout}) {
    this._profileName.textContent = editName;
    this._profileAbout.textContent = editAbout;
  }

  setUserAvatar(avatarUrl) {
    this._profileAvatar.src = avatarUrl;
  }
}
