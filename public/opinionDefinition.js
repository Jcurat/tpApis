class OpinionView {
    constructor(resultsContainer, opinionData) {
      const opinionDisplay = resultsContainer.querySelector('#opinion');
      const ratingDisplay = resultsContainer.querySelector('#rating');
      opinionDisplay.textContent = opinionData.opinion;
      ratingDisplay.textContent = opinionData.rating;
    }
  }
  
  export default OpinionView;
  
