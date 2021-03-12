const router = require('express').Router()
const TabelaUsuario = require('../../usuarios/TabelaUsuario');
const passport = require('passport');

router.post('/login/',
      passport.authenticate('local', { session: false }),
      TabelaUsuario.login
);


module.exports = router