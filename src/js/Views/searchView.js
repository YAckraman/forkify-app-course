import { views } from './view';
import icon from 'url:../../img/icons.svg';
class searchView extends views {
  #parentEl = document.querySelector('.search');
  #serchField = this.#parentEl.querySelector('.search__field');
  getSearchValue() {
    const query = this.#serchField.value;
    this.#cleanSearhField();
    return query;
  }
  #cleanSearhField() {
    this.#serchField.value = '';
  }
  addSearchHandler(searchHandler) {
    this.#parentEl.addEventListener('submit', function (e) {
      e.preventDefault();
      searchHandler();
    });
  }
}
export default new searchView();
