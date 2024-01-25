import { views } from './view';
import previewViewJs from './previewView.Js';
import icon from 'url:../../img/icons.svg';
class result extends views {
  _parentEl = document.querySelector('.results');
  _data;
  _renderMarkup() {
    return this._data
      .map(ele => {
        return previewViewJs.render(ele, false);
      })
      .join('');
  }
}
export default new result();
