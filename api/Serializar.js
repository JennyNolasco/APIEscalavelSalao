const FormatoInvalido = require('./errors/FormatoInvalido');

class Serializar {
    json(dados) {
        return JSON.stringify(dados);
    };

    transformar(dados) {
        if (this.contentType !== 'application/json') {
            throw new FormatoInvalido(this.contentType);
        };
        return this.json(
                this.filtrar(dados)
            );
    };

    filtrarCampos(dados) {
        const camposFiltrados = {}
        this.camposPermitidos.forEach((campo) => {
            if (dados.hasOwnProperty(campo)) {
                camposFiltrados[campo] = dados[campo];
            };
        });

        return camposFiltrados;
    };

    filtrar(dados) {
        let dadosFiltrados = this.filtrarCampos(dados);

        if(Array.isArray(dados)) {
            dadosFiltrados = dados.map((dado) => {
                return this.filtrarCampos(dado)
            });
        };

        return dadosFiltrados;
    };
}

class SerializarErro extends Serializar {
    constructor(contentType, camposPersonalidados){
        super();
        this.contentType = contentType;
        this.camposPermitidos = [
            'id', 'mensagem'
        ].concat(camposPersonalidados || []);
    };
};

class SerializarAgendamento extends Serializar {
    constructor(contentType, camposPersonalidados){
        super();
        this.contentType = contentType;
        this.camposPermitidos = [
            'id', 'nome_cliente', 'data_agendamento'
        ].concat(camposPersonalidados || []);
    };
};

module.exports = {
    Serializar: Serializar,
    SerializarAgendamento: SerializarAgendamento,
    SerializarErro: SerializarErro,
    FormatosValidos: ['application/json']
}