const express = require('express');
const router = express.Router();
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;

passport.use(new GoogleStrategy({
    clientID: process.env.YT_CLIENT_ID,
    clientSecret: process.env.YT_CLIENT_SECRET,
    callbackURL: 'http://localhost:8005/auth/google/callback'
  },
  function(accessToken, refreshToken, profile, done) {
    // Aquí puedes guardar la información del perfil de usuario en tu base de datos
    return done(null, profile);
  }
));

router.get('/google', passport.authenticate('google', { scope: ['https://www.googleapis.com/auth/youtube.readonly'] }));

router.get('/google/callback',
  passport.authenticate('google', { failureRedirect: '/' }),
  function(req, res) {
    // Redirecciona al usuario a la página donde puede obtener las listas de reproducción
    res.redirect('/playlists/get');
  }
);

module.exports = router;
