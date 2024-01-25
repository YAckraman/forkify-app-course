import * as model from './model.js';
import recipe from './Views/recipeView.js';
import searchView from './Views/searchView.js';
import results from './Views/results.js';
import { views } from './Views/view.js';
import bookmarkView from './Views/bookmarkView.js';
import addRecipeView from './Views/addRecipeView.js';
import 'core-js/stable';
import 'regenerator-runtime/runtime';
import paginationView from './Views/paginationView.js';
import recipeView from './Views/recipeView.js';
const recipeContainer = document.querySelector('.recipe');

// https://forkify-api.herokuapp.com/v2

///////////////////////////////////////

const showReciepe = async function () {
  try {
    //render the spinner

    //get the id of data and get the data
    const id = window.location.hash;
    if (!id) return;
    recipe.renderSpinner();
    await model.loadRecipe(id.slice(1));

    //render the data
    bookmarkView.update(model.state.bookmarking);
    results.update(model.getPageRecipes());
    recipe.render(model.state.recipe);
    //const html =
    //if (!res.ok) throw new Error(`${data.message} ${res.status}`);

    // recipe.render(model.state.recipe);
  } catch (err) {
    recipe.errorMessage();
  }
};
//console.log(results);
const controlSearch = async function () {
  try {
    //render waiting for the search

    //get the search value
    const query = searchView.getSearchValue();

    if (!query) return;
    //get the data of the search
    results.renderSpinner();
    await model.loadSearch(query);
    //render the search data
    //render the results on ui
    results.render(model.getPageRecipes());
    //render pagination buttond
    paginationView.render(model.state.search);
  } catch (err) {
    results.errorMessage(err);
  }
};
//console.log(paginationView);
const PaginationController = function (page = model.state.search.page) {
  //send the data to pagination class
  results.render(model.getPageRecipes(page));
  //render pagination buttond
  paginationView.render(model.state.search);
};
const controlServing = function (serving) {
  //update the search
  model.updateServing(serving);
  // render the search recipe
  // recipe.render(model.state.recipe);
  recipe.update(model.state.recipe);
};
const controlBookmark = function () {
  //bookmark the recipe
  if (!model.state.recipe.bookmarked) model.updateBookmark(model.state.recipe);
  else if (model.state.recipe.bookmarked)
    model.removeBookmark(model.state.recipe.id);
  //update the view
  console.log(model.state.recipe);
  bookmarkView.render(model.state.bookmarking);
  recipe.update(model.state.recipe);
};
const instantiateBookmarks = function () {
  //render bookmarks
  bookmarkView.render(model.state.bookmarking);
};
const formController = async function (formData) {
  try {
    const data = await model.addRecipe(formData);
    addRecipeView.toggleWindow();
    recipe.render(model.state.recipe);
    bookmarkView.render(model.state.bookmarking);
    window.history.pushState(null, '', `${model.state.recipe.id}`);
  } catch (err) {
    addRecipeView.errorMessage(err);
  }
};
const init = function () {
  bookmarkView.bookmarkHandle(instantiateBookmarks);
  recipe.addHandlerRender(showReciepe);
  recipe.addServingHandler(controlServing);
  searchView.addSearchHandler(controlSearch);
  recipe.addBookmarkHandler(controlBookmark);
  paginationView.PaginationHanler(PaginationController);
  addRecipeView.addRecipeHandler(formController);
};
init();
