const ModeloTabelaAgendamento = require('../routes/agendamentos/modelTabelaAgendamento');

ModeloTabelaAgendamento.sync()
    .then(()=> {
        console.log('Tabela Criada com Sucesso')
    })
    .catch(
        console.log('Erro, tabela não criada')
    );