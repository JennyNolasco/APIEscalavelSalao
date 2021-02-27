const modeloAgendamento = require('./modelTabelaAgendamento');
const NaoEncontrado = require('../errors/NaoEncontrado');

module.exports = {
    async listar() {
        return await modeloAgendamento.findAll({
            raw: true,
        });
    },

    async adicionar(agendamento) {
        return await modeloAgendamento.create(agendamento);
    },

    async buscarPorPK(id) {
        agendamento = await modeloAgendamento.findByPk(id)

        if(!agendamento) {
            throw new NaoEncontrado;
        };

        return agendamento
    },

    async atualizar(id, dados) {
        return await modeloAgendamento.update(
            dados,
            {
                where: {
                    id: id
                }
            }
        );
    },

    async remover(id) {
        return await modeloAgendamento.destroy(
            {
                where: {
                    id: id
                }
            }
        );
    }
};