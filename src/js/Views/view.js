import icon from 'url:../../img/icons.svg';
export class views {
  _data;
  render(data, render = true) {
    if (!data || (Array.isArray(data) && data.length === 0))
      return this.errorMessage();
    this._data = data;

    if (!render) return this._renderMarkup();
    this._clear();
    //this._renderMarkup();
    this._parentEl.insertAdjacentHTML('afterbegin', this._renderMarkup());
  }
  update(data) {
    // if (!data) return this.errorMessage();
    this._data = data;
    const newMarkup = this._renderMarkup();
    const newElNode = document
      .createRange()
      .createContextualFragment(newMarkup);
    const newEl = Array.from(newElNode.querySelectorAll('*'));
    const curEl = Array.from(this._parentEl.querySelectorAll('*'));
    newEl.forEach((newCh, i) => {
      const curCh = curEl[i];
      if (
        !curCh.isEqualNode(newCh) &&
        newCh.firstChild?.nodeValue.trim() !== ''
      ) {
        //console.log(newCh.firstChild.nodeValue.trim());
        curCh.textContent = newCh.textContent;
      }
      if (!curCh.isEqualNode(newCh)) {
        Array.from(newCh.attributes).forEach(attr => {
          curCh.setAttribute(attr.name, attr.value);
        });
      }
    });
  }
  _clear() {
    this._parentEl.innerHTML = '';
  }
  renderSpinner() {
    const element = `
    <div class="spinner">
          <svg>
            <use href="${icon}#icon-loader"></use>
          </svg>
        </div> -->`;
    this._parentEl.innerHTML = '';
    this._parentEl.insertAdjacentHTML('afterbegin', element);
  }
  errorMessage(message = 'no such a recipe exist') {
    const err = ` 
   <div class="error">
      <div>
        <svg>
          <use href="src/img/${icon}#icon-alert-triangle"></use>
        </svg>
      </div>
      <p>${message}</p>
    </div>;`;
    this._parentEl.insertAdjacentHTML('afterbegin', err);
  }
}
export default new views();
