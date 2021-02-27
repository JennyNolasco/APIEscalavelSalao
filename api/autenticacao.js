const passport = require('passport');
const Strategy = require('passport-local').Strategy;
const Usuario = require('./usuarios/Usuario');
const LoginInvalido = require('./errors/LoginInvalido');
const UsuarioNaoEncontrado = require('./errors/UsuarioNaoEncontrado');
const bcrypt = require('bcrypt');

function conferirUsuario(usuario) {
    if(!usuario){
        throw new UsuarioNaoEncontrado();
    }
}

async function conferirSenha(senha, senhaHash) {
    const senhaCorreta = await bcrypt.compare(senha, senhaHash);
    if(!senhaCorreta) {
        throw new LoginInvalido();
    }
}

passport.use(
    new Strategy({
        usernameField: 'email',
        passwordField: 'senha',
        session: false
    }, async (email, senha, done) => {
        try{
            const usuario = await Usuario.buscarPorEmail(email);
            conferirUsuario(usuario);
            conferirSenha(senha, usuario.senha)
            done(null, usuario);
        } catch (error) {
            done(error);
        }
        
    })
);