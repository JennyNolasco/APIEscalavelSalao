const modeloUsuario = require('./modelTabelaUsuario');
const NaoEncontrado = require('../../errors/NaoEncontrado');

module.exports = {
    async listar() {
        return await modeloUsuario.findAll({
            raw: true,
        });
    },

    async adicionar(usuario) {
        return await modeloUsuario.create(usuario);
    },

    async buscarPorPK(id) {
        usuario = await modeloUsuario.findByPk(id)

        if(!usuario) {
            throw new NaoEncontrado;
        };

        return usuario
    },

    async buscarPorEmail(email) {
        usuario = await modeloUsuario.findOne({
            where: {
                email: email
            }
        });

        if(!usuario) {
            throw new NaoEncontrado;
        };

        return usuario
    },

    async atualizar(id, dados) {
        return await modeloUsuario.update(
            dados,
            {
                where: {
                    id: id
                }
            }
        );
    },

    async remover(id) {
        return await modeloUsuario.destroy(
            {
                where: {
                    id: id
                }
            }
        );
    }
};