class OpinionSetDefinition {
    constructor(resultsContainer) {
      this.opinionInput = resultsContainer.querySelector('#opinion');
      this.ratingInput = resultsContainer.querySelector('#rating');      
    }
  
    show(opinionData) {
      this.opinionInput.value = opinionData.opinion;
      this.ratingInput.value = opinionData.rating;
    }
  
    read() {
      const result = {
        opinion: this.opinionInput.value,
        rating: this.ratingInput.value
      };
      return result;
    }
  }
  
  export default OpinionSetDefinition;
  
  