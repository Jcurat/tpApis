import express from 'express';
import passport from 'passport';
import db from './db.js';
import path from 'path';
import fs from 'fs';
import Authorization from "./auth.js"

const __dirname = fs.realpathSync('.');

////////////////////////////////////////////////////////////////////////////////
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

  async _doLookup(req, res) {
    const routeParams = req.params;
    const word = routeParams.word;
    const query = { word: word.toLowerCase() };
    const collection = db.collection("dict");
    const stored = await collection.findOne(query);
    const response = {
      word: word,
      definition: stored ? stored.definition : ''
    };
    res.json(response);
  }

  async _doSave(req, res) {
    const query = { word: req.body.word.toLowerCase() };
    const update = { $set: { definition: req.body.definition } };
    const params = { upsert: true };
    const collection = db.collection("dict");
    await collection.updateOne(query, update, params);
    res.json({ success: true });
  }
}

new DictionaryBackendServer();





class Login {
    constructor() {
      const loginForm = document.querySelector('#loginForm');
      this._doLogin = this._doLogin.bind(this);
      loginForm.addEventListener('submit', this._doLogin);
    }
  
    _doLogin(event) {
      event.preventDefault();
      const username = document.querySelector("#username").value;
      const password = document.querySelector("#password").value;
  
      // Realizar las acciones necesarias para el inicio de sesión, por ejemplo, enviar los datos al servidor
      // Aquí puedes utilizar fetch o AJAX para enviar los datos al servidor y manejar la respuesta
  
      // Ejemplo de uso de fetch:
      const loginData = {
        username: username,
        password: password
      };
  
      fetch('/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(loginData)
      })
        .then(response => {
          if (response.ok) {
            window.location.href = '/index'; // Redirigir a la página de inicio de sesión exitoso
          } else {
            // Manejar error de inicio de sesión
            console.error('Error en el inicio de sesión');
          }
        })
        .catch(error => {
          console.error('Error en el inicio de sesión', error);
        });
    }
  }
  
  const login = new Login();

  fetch('/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(loginData)
  })
  
  