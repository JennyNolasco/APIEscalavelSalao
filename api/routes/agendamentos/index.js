const router = require('express').Router()
const TabelaAgendamento = require('./TabelaAgendamento');
const Agendamento = require('./Agendamento')

router.get('/agendamentos', async (req, resp) => {
    const results = await TabelaAgendamento.listar();
    resp.send(JSON.stringify(results));
});

router.post('/agendar', async (req, resp) => {
    const reqAgendamento = req.body;
    const agendamento = new Agendamento(reqAgendamento);
    await agendamento.criar()
    resp.send(JSON.stringify(agendamento));
});

router.get('/agendamentos/:idAgendamento', async (req, resp) => {
    try {
        const id = req.params.idAgendamento;
        const agendamento = new Agendamento({id: id});
        await agendamento.buscar();
        resp.send(JSON.stringify(agendamento));
    } catch (error) {
        resp.send(JSON.stringify({
            mensagem: error.message
        }));
    };
});

router.delete('/agendamentos/:idAgendamento', async (req, resp) => {
    try {
        const id = req.params.idAgendamento;
        const agendamento = new Agendamento({id: id});
        response = await agendamento.remover();
        resp.send(JSON.stringify(response));
    } catch (error) {
        resp.send(JSON.stringify({
            mensagem: error.message
        }));
    };
});

router.put('/agendamentos/:idAgendamento', async (req, resp) => {
    try {
        const id = req.params.idAgendamento;
        const dadosBody = req.body;
        const dados = Object.assign({}, dadosBody, {id: id})
        const agendamento = new Agendamento(dados);
        await agendamento.atualizar();
        resp.send(JSON.stringify(agendamento));
    } catch (error) {
        resp.send(JSON.stringify({
            mensagem: error.message
        }));
    };
});

module.exports = router