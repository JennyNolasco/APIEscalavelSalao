const express = require('express');
const bodyParser = require('body-parser');
const routesAgendamento = require('../routes/agendamentos');
const routesUsuario = require('../routes/usuarios');
const NaoEncontrado = require('../errors/NaoEncontrado');
const CampoInvalido = require('../errors/CampoInvalido');
const DadosNaoInformados = require('../errors/DadosNaoInformados');
const FormatoInvalido = require('../errors/FormatoInvalido');
const FormatosValidos = require('../Serializar').FormatosValidos;
const SerializarErro = require('../Serializar').SerializarErro;

const { autenticacao } = require('../usuarios');

module.exports = () => {
    //Criando nossa aplicação
    const app = express()

    app.use((req, resp, next) => {
        let formatoSolicitado = req.header('Accept');
        if(formatoSolicitado === '*/*') {
            formatoSolicitado = 'application/json'
        }

        if(FormatosValidos.indexOf(formatoSolicitado) === -1) {
            resp.status(406);
            resp.end();
            return
        };

        resp.setHeader('Content-Type', formatoSolicitado);
        next();
    });

    //use() é utilizado para carregar libs dentro do express, para Ler o body em json da requisição
    app.use(bodyParser.json());
    app.use('/api', routesAgendamento);
    app.use('/api', routesUsuario);
    app.use((error, req, resp, next) => {
        let status = 500;
        if( error instanceof NaoEncontrado) {
            status = 404
        };
        if( error instanceof CampoInvalido || error instanceof DadosNaoInformados ) {
            status = 400
        };

        if( error instanceof FormatoInvalido) {
            status = 406
        };

        serializarErro = new SerializarErro(
            resp.getHeader('Content-Type')
        );


        resp.status(status).send(
            serializarErro.transformar({
                id: error.id,
                mensagem: error.message
            })
        );

    });
    
    return app;
};


