const express = require('express');
const bodyParser = require('body-parser');
const router = require('../routes/agendamentos');
const NaoEncontrado = require('../errors/NaoEncontrado');
const CampoInvalido = require('../errors/CampoInvalido');

module.exports = () => {
    //Criando nossa aplicação
    const app = express()

    //use() é utilizado para carregar libs dentro do express, para Ler o body em json da requisição
    app.use(bodyParser.json());
    app.use('/api', router);
    app.use((error, req, resp, next) => {
        let status = 500;
        if( error instanceof NaoEncontrado){
            status = 404
        };
        if( error instanceof CampoInvalido){
            status = 400
        };

        resp.status(status).send(JSON.stringify({
            mensagem: error.message
        }));

    });
    
    return app;
};


