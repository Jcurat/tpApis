const session = require('express-session');
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;

class AuthorizationGoogle {
  constructor(app) {
    const GOOGLE_CLIENT_ID = "782947744959-m58n1q0403ampr46n00jtqer4ju28h6e.apps.googleusercontent.com";
    const GOOGLE_CLIENT_SECRET = "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";

    // Configuración del middleware de sesión
    app.use(session({
      secret: "secret",
      resave: false,
      saveUninitialized: true,
    }));

    app.use(passport.initialize());
    app.use(passport.session());

    passport.use(new GoogleStrategy({
      clientID: GOOGLE_CLIENT_ID,
      clientSecret: GOOGLE_CLIENT_SECRET,
      callbackURL: "http://localhost:3000/auth/google/callback",
      passReqToCallback: true
    }, this._verify.bind(this))); // Corregido: Agregar bind(this) para mantener el contexto de la clase

    passport.serializeUser((user, done) => done(null, user));
    passport.deserializeUser((user, done) => done(null, user));
  }

  _verify(request, accessToken, refreshToken, profile, done) {
    console.log(profile);
    return done(null, profile);
  }

  checkAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
      return next();
    }
    res.redirect("/login");
  }
}

module.exports = AuthorizationGoogle;

app.post('/login', (req, res) => {
    // Aquí se maneja la solicitud de inicio de sesión del cliente
  });
