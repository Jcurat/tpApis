class opinionReview {
  constructor(resultsContainer, wordDefinition) {
      const nameDisplay = resultsContainer.querySelector('#name');
      const opDisplay = resultsContainer.querySelector('#opinion');
      nameDisplay.textContent = wordDefinition.name;
      opDisplay.textContent = wordDefinition.opinion;
  }
}

export default opinionReview;
  
