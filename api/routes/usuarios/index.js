const router = require('express').Router()
const TabelaUsuario = require('../../usuarios/TabelaUsuario');
const Usuario = require('../../usuarios/Usuario');
const SerializarUsuario = require('../../Serializar').SerializarUsuario;
const controllerUsuario = require('../../usuarios/controllerUsuario');
const passport = require('passport');

router.get('/usuarios', async (req, resp) => {
    const results = await TabelaUsuario.listar();
    const serializador = new SerializarUsuario(
        resp.getHeader('Content-Type'), 
        ['nome_servico', 'status']
    );
    teste = serializador.transformar(results)
    resp.status(200).send(teste);
});

router.post('/usuarios', async (req, resp, next) => {
    try {
        const reqUsuario = req.body;
        const usuario = new Usuario(reqUsuario);
        await usuario.criar()
        const serializador = new SerializarUsuario(
            resp.getHeader('Content-Type')
        );
        resp.status(201).send(serializador.transformar(usuario));
    } catch (error) {
        next(error);
    };
});

router.get('/usuarios/:idUsuario', async (req, resp, next) => {
    try {
        const id = req.params.idUsuario;
        const usuario = new Usuario({id: id});
        await usuario.buscarPorID();
        const serializador = new SerializarUsuario(
            resp.getHeader('Content-Type', 
                ['nome_servico', 'status'])
        );
        resp.status(200).send(serializador.transformar(usuario));
    } catch (error) {
        next(error)
    };
});

router.delete('/usuarios/:idUsuario', 
    passport.authenticate('bearer', { session: false }),
    controllerUsuario.delete
);

router.put('/usuarios/:idUsuario', async (req, resp, next) => {
    try {
        const id = req.params.idUsuario;
        const dadosBody = req.body;
        const dados = Object.assign({}, dadosBody, {id: id})
        const usuario = new Usuario(dados);
        await usuario.atualizar();
        resp.status(204).send();
    } catch (error) {
        next(error);
    };
});

module.exports = router