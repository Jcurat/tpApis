class NameSetOpinion {
  constructor(resultsContainer) {
    this.setNameInput = resultsContainer.querySelector('#set-name-input');
    this.setOpinionInput = resultsContainer.querySelector('#set-opinion-input');      
  }

  show(wordDefinition) {
    this.setNameInput.value = wordDefinition.name;
    this.setOpinionInput.value = wordDefinition.opinion;
  }

  read() {
    const result = {
      name: this.setNameInput.value,
      opinion: this.setOpinionInput.value
    };
    return result;
  }
}

export default NameSetOpinion;
  