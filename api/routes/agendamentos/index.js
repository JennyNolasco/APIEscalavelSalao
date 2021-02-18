const router = require('express').Router()
const TabelaAgendamento = require('./TabelaAgendamento');
const Agendamento = require('./Agendamento')

router.get('/agendamentos', async (req, resp) => {
    const results = await TabelaAgendamento.listar();
    resp.status(200).send(JSON.stringify(results));
});

router.post('/agendamentos', async (req, resp, next) => {
    try {
        const reqAgendamento = req.body;
        const agendamento = new Agendamento(reqAgendamento);
        await agendamento.criar()
        resp.status(201).send(JSON.stringify(agendamento));
    } catch (error) {
        next(error)
    };
});

router.get('/agendamentos/:idAgendamento', async (req, resp, next) => {
    try {
        const id = req.params.idAgendamento;
        const agendamento = new Agendamento({id: id});
        await agendamento.buscar();
        resp.status(200).send(JSON.stringify(agendamento));
    } catch (error) {
        next(error)
    };
});

router.delete('/agendamentos/:idAgendamento', async (req, resp, next) => {
    try {
        const id = req.params.idAgendamento;
        const agendamento = new Agendamento({id: id});
        await agendamento.remover();
        resp.status(204).send();
    } catch (error) {
        next(error)
    };
});

router.put('/agendamentos/:idAgendamento', async (req, resp, next) => {
    try {
        const id = req.params.idAgendamento;
        const dadosBody = req.body;
        const dados = Object.assign({}, dadosBody, {id: id})
        const agendamento = new Agendamento(dados);
        await agendamento.atualizar();
        resp.status(204).send();
    } catch (error) {
        next(error);
    };
});

module.exports = router