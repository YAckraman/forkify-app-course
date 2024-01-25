import icon from 'url:../../img/icons.svg';
import { Fraction } from 'fractional';
import { views } from './view';

class recipesView extends views {
  _parentEl = document.querySelector('.recipe');
  _data;

  _renderMarkup() {
    const serving = this._data.serving;
    const bookmark = this._data.bookmarked;

    return ` <figure class="recipe__fig">
          <img crossorigin="anonymous" src="${
            this._data.image
          }" alt="Tomato" class="recipe__img" />
          <h1 class="recipe__title">
            <span>${this._data.title}</span>
          </h1>
        </figure>

        <div class="recipe__details">
          <div class="recipe__info">
            <svg class="recipe__info-icon">
              <use href="${icon}#icon-clock"></use>
            </svg>
            <span class="recipe__info-data recipe__info-data--minutes">${
              this._data.cookingTime
            }</span>
            <span class="recipe__info-text">minutes</span>
          </div>
          <div class="recipe__info">
            <svg class="recipe__info-icon">
              <use href="${icon}#icon-users"></use>
            </svg>
            <span class="recipe__info-data recipe__info-data--people">${serving}</span>
            <span class="recipe__info-text">servings</span>

            <div class="recipe__info-buttons">
              <button data-serving=${
                serving - 1
              } class="btn--tiny btn--increase-servings">
                <svg>
                  <use href="${icon}#icon-minus-circle"></use>
                </svg>
              </button>
              <button data-serving=${
                serving + 1
              } class="btn--tiny btn--increase-servings">
                <svg>
                  <use href="${icon}#icon-plus-circle"></use>
                </svg>
              </button>
            </div>
          </div>

          <div class="recipe__user-generated ${this._data.key ? '' : 'hidden'}">
            <svg>
              <use href="${icon}#icon-user"></use>
            </svg>
          </div>
          <button class="btn--round btn--bookmark">
            <svg class="">
              <use href="${icon}#icon-bookmark${
      this._data.bookmarked ? '-fill' : ''
    }"></use>
            </svg>
          </button>
        </div>

        <div class="recipe__ingredients">
          <h2 class="heading--2">Recipe ingredients</h2>
          <ul class="recipe__ingredient-list">
          ${this._data.ingredients
            .map(ing => {
              return `<li class="recipe__ingredient">
              <svg class="recipe__icon">
                <use href="${icon}#icon-check"></use>
              </svg>
              <div class="recipe__quantity">${
                ing.quantity !== null ? new Fraction(ing.quantity) : ''
              }</div>
              <div class="recipe__description">
                <span class="recipe__unit">${ing.unit}</span>
                ${ing.description}
              </div>
            </li>`;
            })
            .join('')}
          </ul>
        </div>

        <div class="recipe__directions">
          <h2 class="heading--2">How to cook it</h2>
          <p class="recipe__directions-text">
            This recipe was carefully designed and tested by
            <span class="recipe__publisher">The Pioneer Woman</span>. Please check out
            directions at their website.
          </p>
          <a
            class="btn--small recipe__btn"
            href="http://thepioneerwoman.com/cooking/pasta-with-tomato-cream-sauce/"
            target="_blank"
          >
            <span>Directions</span>
            <svg class="search__icon">
              <use href="${icon}#icon-arrow-right"></use>
            </svg>
          </a>
        </div>`;
  }
  addServingHandler(handle) {
    const parent = document.querySelector('.recipe__info-buttons');
    console.log(parent);
    this._parentEl.addEventListener('click', function (e) {
      const target = e.target.closest('.btn--tiny');
      if (!target) return;
      const serving = +target.dataset.serving;

      if (serving > 1) handle(serving);
    });
  }
  addHandlerRender(controlHandler) {
    ['hashchange', 'load'].forEach(ev =>
      window.addEventListener(ev, controlHandler)
    );
  }
  addBookmarkHandler(handler) {
    this._parentEl.addEventListener('click', function (e) {
      const target = e.target.closest('.btn--bookmark');
      if (!target) return;
      console.log(1);
      handler();
    });
  }
}
export default new recipesView();
