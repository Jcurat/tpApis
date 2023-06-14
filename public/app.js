import Opinions from "./opinion.js";
import opinionReview from "./opinionDefinition.js";
import NameSetOpinion from "./opinionSetdefinition.js";

class App {
  constructor() {
    this.opinions = new Opinions();

    const searchForm = document.querySelector('#search');
    this._onSearch = this._onSearch.bind(this);
    searchForm.addEventListener('submit', this._onSearch);

    const setForm = document.querySelector('#set');
    this._onSet = this._onSet.bind(this);
    setForm.addEventListener('submit', this._onSet);

  }

  _onSet(event) {
    event.preventDefault();

    const resultsContainer = document.querySelector('#results');
    const nameSetOpinion = new NameSetOpinion(resultsContainer);
    const postBody = nameSetOpinion.read();

    const status = results.querySelector('#status');
    status.textContent = '';

    this.opinions.save(postBody)
      .then(result => {
        // Update definition
        new opinionReview(resultsContainer, postBody);
        status.textContent = 'Saved.';
      });

  }

  _onSearch(event) {
    event.preventDefault();
    const status = results.querySelector('#status');
    status.textContent = '';
    const input = document.querySelector('#name-input');
    const name = input.value.trim();
    this.opinions.doLookup(name)
      .then(this._showResults);
  }

  _showResults(result) {
    const resultsContainer = document.querySelector('#results');
    resultsContainer.classList.add('hidden');

    // Show Word Definition.
    new opinionReview(resultsContainer, result);

    // Prep set definition form.
    const nameSetOpinion = new NameSetOpinion(resultsContainer);
    nameSetOpinion.show(result);

    // Display.
    resultsContainer.classList.remove('hidden');
  }
}

// Init app
const app = new App();