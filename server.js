import Authorization from "./auth.js";
import express from 'express';
import passport from 'passport';
import db from './db.js';
import path from 'path';
import fs from 'fs';

const __dirname = fs.realpathSync('.');

/*  //const express = require('express');
 const app = express();

// Resto del código del servidor

 const port = 3000;
app.listen(port, () => {
  console.log(`Servidor escuchando en el puerto ${port}`);
});  */


class cocktailManiaBackEndServer {
  constructor() {

    const app = express();
    app.use(express.json());
    app.use(express.static('public'));
    app.use(express.urlencoded({ extended: false }));
    this._auth = new Authorization(app);

    app.get('/lookup/:name', this._doLookup);
    app.post('/save/', this._doSave);
    //app.delete('/delete/', this._doDelete);
    app.get('/login/', this._login);
    app.get('/auth/google/',
      passport.authenticate('google', {
        scope: ['email', 'profile']
      }));
    app.get('/auth/google/callback', passport.authenticate('google', {
      successRedirect: '/',
      failureRedirect: '/login'
    }));
    app.get('/', this._auth.checkAuthenticated, this._goHome);

    app.post("/logout", (req,res) => {
      req.logOut(err=>console.log(err));
      res.redirect("/login");
   })
    // Start server
    app.listen(3000, () => console.log('Listening on port 3000'));
  }

  async _login(req, res) {
    res.sendFile(path.join(__dirname, "login.html"));
  }

  async _goHome(req, res) {
    res.sendFile(path.join(__dirname, "index.html"));
  }

  async _doLookup(req, res) {
    const routeParams = req.params;
    const name = routeParams.name;
    const query = { name: name.toLowerCase() };
    const collection = db.collection("dict");
    const stored = await collection.findOne(query);
    const response = {
      name: name,
      opinion: stored ? stored.opinion : ''
    };
    res.json(response);
  }  

  async _doSave(req, res) {
    const query = { name: req.body.name.toLowerCase() };
    const update = { $set: { opinion: req.body.opinion } };
    const params = { upsert: true };
    const collection = db.collection("dict");
    await collection.updateOne(query, update, params);
    res.json({ success: true });
  }
}

new cocktailManiaBackEndServer();