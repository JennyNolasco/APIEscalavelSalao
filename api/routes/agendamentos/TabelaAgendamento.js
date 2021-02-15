const modeloAgendamento = require('./modelTabelaAgendamento');

module.exports = {
    async listar() {
        return await modeloAgendamento.findAll();
    },

    async adicionar(agendamento) {
        return await modeloAgendamento.create(agendamento);
    },

    async buscarPorPK(id) {
        agendamento = await modeloAgendamento.findByPk(id)

        if(!agendamento) {
            throw new Error('Agendamento não encontrado');
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