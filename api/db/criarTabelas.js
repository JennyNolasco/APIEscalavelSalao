const ModeloTabelaAgendamento = require('../routes/agendamentos/modelTabelaAgendamento');
const ModeloTabelaUsuario = require('../routes/usuarios/modelTabelaUsuario');

ModeloTabelaAgendamento.sync()
    .then(()=> {
        console.log('Tabela Agendamento Criada com Sucesso')
    })
    .catch(
        console.log('Erro, tabela Agendamento não criada')
    );

ModeloTabelaUsuario.sync()
    .then(()=> {
        console.log('Tabela Usuario Criada com Sucesso')
    })
    .catch(
        console.log('Erro, tabela usuario não criada')
    );