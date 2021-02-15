const express = require('express');
const bodyParser = require('body-parser');
const router = require('../routes/agendamentos');

module.exports = () => {
    //Criando nossa aplicação
    const app = express()

    //use() é utilizado para carregar libs dentro do express, para Ler o body em json da requisição
    app.use(bodyParser.json());
    app.use('/api', router);
    
    return app;
};


