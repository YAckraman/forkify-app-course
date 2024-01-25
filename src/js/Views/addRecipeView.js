import { views } from './view';
import icon from 'url:../../img/icons.svg';
class addRecipeView extends views {
  _parentEl = document.querySelector('.upload');
  _window = document.querySelector('.add-recipe-window');
  openButton = document.querySelector('.nav__btn');
  closeButton = document.querySelector('.btn--close-modal');
  overlay = document.querySelector('.overlay');
  uploadBtn = document.querySelector('.upload__btn');
  constructor() {
    super();
    this.openForumHandle();
    this.closeForumHandle();
  }
  toggleWindow() {
    // console.log(this);
    this.overlay.classList.toggle('hidden');
    this._window.classList.toggle('hidden');
  }
  openForumHandle() {
    this.openButton.addEventListener('click', this.toggleWindow.bind(this));
  }
  closeForumHandle() {
    this.closeButton.addEventListener('click', this.toggleWindow.bind(this));
  }
  addRecipeHandler(handle) {
    this._parentEl.addEventListener('submit', function (e) {
      e.preventDefault();
      const data = [...new FormData(this)];
      const dataObj = Object.fromEntries(data);
      handle(dataObj);
    });
  }
}
export default new addRecipeView();
