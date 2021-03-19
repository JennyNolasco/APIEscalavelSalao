const jwt= require('jsonwebtoken');
const Usuario = require('./Usuario');

function criarToken(usuario) {
    const payload = {
        id: usuario.id
    };

    return jwt.sign(payload, process.env.JWT_KEY, { expiresIn: '1m'});
}



module.exports = {
    login: (req, resp) => {
        const token = criarToken(req.user);
        resp.set('Authorization', token);
        resp.status(204).send();
    },
    delete: async (req, resp, next) => {
        try {
            const id = req.params.idUsuario;
            const usuario = new Usuario({id: id});
            await usuario.remover();
            resp.status(204).send();
        } catch (error) {
            next(error)
        };
    }
};
