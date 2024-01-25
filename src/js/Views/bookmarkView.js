import { views } from './view';
import previewViewJs from './previewView.Js';
import icon from 'url:../../img/icons.svg';

class bookmark extends views {
  _parentEl = document.querySelector('.bookmarks__list');
  _data;
  _message = 'there is no current bookmark ;)';
  _renderMarkup() {
    return this._data
      .map(ele => {
        return previewViewJs.render(ele, false);
      })
      .join('');
  }
  bookmarkHandle(handle) {
    window.addEventListener('load', function () {
      handle();
    });
  }
}
export default new bookmark();
