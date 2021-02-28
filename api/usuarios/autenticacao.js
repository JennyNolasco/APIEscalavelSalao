const LocalStrategy  = require('passport-local').Strategy;
const Usuario = require('./Usuario');
const LoginInvalido = require('../errors/LoginInvalido');
const UsuarioNaoEncontrado = require('../errors/UsuarioNaoEncontrado');
const bcrypt = require('bcrypt');
const passport = require('passport');

    
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
    new LocalStrategy ({
        usernameField: 'email',
        passwordField: 'senha',
        session: false
    }, async (email, senha, done) => {
        try{
            const usuario = new Usuario({email: email});
            await usuario.buscarPorEmail(email);
            conferirUsuario(usuario);
            await conferirSenha(senha, usuario.senha)
            done(null, usuario);
        } catch (error) {
            done(error);
        }
        
    })
);
