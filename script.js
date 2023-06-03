function getCocktail() {
    fetch('www.thecocktaildb.com/api/json/v1/1/search.php?s=margarita').then((response) => response.json().then((data)=> {
        console.log(data);
    }).catch((err) => {
        console.log('No encontramos el cocktail :(', err);
    })
}

getCocktail()
