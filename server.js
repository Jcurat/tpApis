import express from 'express';
import passport from 'passport';
import db from './db.js';
import path from 'path';
import fs from 'fs';
import Authorization from "./auth.js"

const express = require('express');
const fetch = require('node-fetch');
const app = express();

app.use(express.static('public')); // Ruta a la carpeta que contiene tu archivo HTML y otros archivos estáticos

// Ruta para buscar cócteles
app.get('/search-cocktail', async (req, res) => {
  const busquedaCocktail = req.query.cocktailName;

  if (busquedaCocktail === '') {
    res.status(400).json({ error: 'Por favor, ingrese un nombre de trago válido' });
    return;
  }

  try {
    const response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${busquedaCocktail}`);
    const data = await response.json();

    if (data.drinks === null) {
      res.status(404).json({ error: 'No se encontraron resultados para el trago ingresado' });
      return;
    }

    const cocktail = data.drinks[0];
    const ingredientes = [];

    // Extraer los ingredientes y las medidas del objeto cocktail
    for (let i = 1; i <= 15; i++) {
      const ingrediente = cocktail[`strIngredient${i}`];
      const medida = cocktail[`strMeasure${i}`];

      if (ingrediente !== null && ingrediente !== '') {
        ingredientes.push(`${ingrediente} - ${medida}`);
      }
    }

    res.json({
      name: cocktail.strDrink,
      category: cocktail.strCategory,
      instructions: cocktail.strInstructions,
      ingredientes: ingredientes,
      image: cocktail.strDrinkThumb
    });
  } catch (error) {
    console.log('Error:', error);
    res.status(500).json({ error: 'Error en el servidor' });
  }
});

// Inicia el servidor
const port = 3000;
app.listen(port, () => {
  console.log(`Servidor escuchando en el puerto ${port}`);
});

class DictionaryBackendServer {
  constructor() {
    
    const app = express();
    app.use(express.json());
    app.use(express.static('public'));
    app.use(express.urlencoded({extended: false}));
    const authorization = new Authorization (app); // creo el objeto authorization
    // TODO: create the Authorization object

    app.get('/lookup/:word', this._doLookup);
    app.post('/save/', this._doSave);
    app.get('/login/', this._login);   //estos son endpoints
    app.get('/',authorization.checkAuthenticated, this._goHome);
    app.post('/login/', passport.authenticate('local', {failureRedirect: '/login/'}))

    // TODO: add endpoings for login (GET and POST), for root (/)
    
    // Start server
    app.listen(3000, () => console.log('Listening on port 3000'));    
  }

  async _login(req, res) {
    res.sendFile(path.join(__dirname, "public/login.html"));
  }

  async _goHome(req, res) {
    res.sendFile(path.join(__dirname, "public/home.html"));
  }
}

new DictionaryBackendServer();

