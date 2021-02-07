const router = require('express').Router()
const TabelaAgendamento = require('./TabelaAgendamento');
const Agendamento = require('./Agendamento')

router.get('/', async (req, resp) => {
    const results = await TabelaAgendamento.listar();
    resp.send(JSON.stringify(results));
});

router.post('/', async (req, resp) => {
    const reqAgendamento = req.body;
    const agendamento = new Agendamento(reqAgendamento);
    await agendamento.criar()
    resp.send(JSON.stringify(agendamento));
});
module.exports = router