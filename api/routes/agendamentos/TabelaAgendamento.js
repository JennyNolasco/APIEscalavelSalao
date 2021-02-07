const Modelo = require('./modelTabelaAgendamento');

module.exports = {
    listar() {
        return Modelo.findAll();
    },

    adicionar(agendamento) {
        return Modelo.create(agendamento);
    }
};