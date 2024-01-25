import { views } from './view';
import icon from 'url:../../img/icons.svg';
class paginationView extends views {
  _parentEl = document.querySelector('.pagination');
  _data;
  _curPage;
  renderNextbtn() {
    return `<button data-goto = ${
      this._curPage + 1
    } class="btn--inline pagination__btn--next">
            <span>Page ${this._curPage + 1}</span>
            <svg class="search__icon">
              <use href="${icon}#icon-arrow-right"></use>
            </svg>
          </button>`;
  }
  renderPrevbtn() {
    return `<button data-goto = ${
      this._curPage - 1
    } class="btn--inline pagination__btn--prev">
            <svg class="search__icon">
              <use href="${icon}#icon-arrow-left"></use>
            </svg>
            <span>Page ${this._curPage - 1}</span>
          </button>`;
  }

  _renderMarkup() {
    this._curPage = this._data.page;
    const numOfPages = Math.ceil(
      this._data.result.length / this._data.resultPerPage
    );

    if (this._curPage === 1 && numOfPages > 1) {
      return this.renderNextbtn();
    }
    if (this._curPage > 1 && this._curPage !== numOfPages) {
      return [this.renderPrevbtn(), this.renderNextbtn()].join('');
    }
    if (this._curPage === numOfPages && numOfPages !== 1) {
      return this.renderPrevbtn();
    }
    return '';
  }
  PaginationHanler(handler) {
    this._parentEl.addEventListener('click', function (e) {
      if (!e.target.closest('.btn--inline')) return;
      const targetEl = e.target.closest('.btn--inline');
      const goToPage = +targetEl.dataset.goto;
      handler(goToPage);
    });
  }
}
export default new paginationView();
