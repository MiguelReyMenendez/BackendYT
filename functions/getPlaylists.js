const axios = require('axios');

// Middleware de autenticación personalizado para verificar si el usuario está autenticado
function ensureAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
      return next();
    }
    res.redirect('/auth/google');
  }


module.exports = getPlaylistsFromYouTube;
