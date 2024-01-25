import 'core-js/stable';
import 'regenerator-runtime/runtime';
import { AJAX } from './helper';
import { URL_API, Recipes_Per_Page, POST_KEY } from './config';
export const state = {
  recipe: {},
  search: {
    url: '',
    result: [],
    page: 1,
    resultPerPage: Recipes_Per_Page,
  },
  bookmarking: [],
};
const createRecipeObject = function (recipe) {
  return {
    id: recipe.id,
    publisher: recipe.publisher,
    title: recipe.title,
    serving: recipe.servings,
    cookingTime: recipe.cooking_time,
    url: recipe.source_url,
    ingredients: recipe.ingredients,
    image: recipe.image_url,
    ...(recipe.key && { key: recipe.key }),
  };
};
export const loadRecipe = async function (id) {
  try {
    const data = await AJAX(`${URL_API}${id}?key=${POST_KEY}`);
    const { recipe } = data.data;
    state.recipe = createRecipeObject(recipe);
    if (state.bookmarking.some(el => el.id === id))
      state.recipe.bookmarked = true;
  } catch (err) {
    console.log(err);
  }
};
export const loadSearch = async function (query) {
  try {
    const data = await AJAX(`${URL_API}?search=${query}&key=${POST_KEY}`);
    console.log(data, 'from here');

    state.search.url = `${URL_API}?search=${query}`;
    state.search.result = data.data.recipes.map(searchItem => {
      return {
        id: searchItem.id,
        publisher: searchItem.publisher,
        image: searchItem.image_url,
        title: searchItem.title,
        ...(searchItem.key && { key: searchItem.key }),
      };
    });
  } catch (err) {
    throw err;
  }
};
export const getPageRecipes = function (page = 1) {
  state.search.page = page;
  const start = (page - 1) * Recipes_Per_Page;
  const end = page * Recipes_Per_Page;
  return state.search.result.slice(start, end);
};
export const updateServing = function (newServing) {
  state.recipe.ingredients.forEach(ing => {
    if (ing.quantity)
      ing.quantity = (ing.quantity * newServing) / state.recipe.serving;
  });

  state.recipe.serving = newServing;
};
const storeAtLocal = function () {
  localStorage.setItem('bookmarks', JSON.stringify(state.bookmarking));
};
export const updateBookmark = function (recipe) {
  state.bookmarking.push(recipe);
  if (recipe.id === state.recipe.id) state.recipe.bookmarked = true;
  storeAtLocal();
};
export const removeBookmark = function (id) {
  const idx = state.bookmarking.findIndex(el => el.id === id);
  state.bookmarking.splice(idx, 1);
  if (id === state.recipe.id) state.recipe.bookmarked = false;
  storeAtLocal();
};
export const getBookmarks = function () {
  const bookmarkData = localStorage.getItem('bookmarks');
  if (bookmarkData) state.bookmarking = JSON.parse(bookmarkData);
};
getBookmarks();
export const addRecipe = async function (newRecipe) {
  try {
    const ingredients = Object.entries(newRecipe)
      .filter(ing => ing[0].startsWith('ingredient'))
      .map(ing => {
        const ingComponent = ing[1].split(',');
        console.log(ing);
        if (ingComponent.length !== 3 && ing[1] !== '')
          throw new Error('enter the ingredients in correct form');
        const [quantity, unit, description] = ingComponent;
        return { quantity: quantity ? +quantity : null, unit, description };
      });

    const recipe = {
      title: newRecipe.title,
      image_url: newRecipe.image,
      servings: +newRecipe.servings,
      cooking_time: +newRecipe.cookingTime,
      source_url: newRecipe.sourceUrl,
      publisher: newRecipe.publisher,
      ingredients,
    };

    const data = await AJAX(`${URL_API}?key=${POST_KEY}`, recipe);
    state.recipe = createRecipeObject(data.data.recipe);
    updateBookmark(data.data.recipe);
  } catch (err) {
    throw err;
  }
};
