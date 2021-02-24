const FormatoInvalido = require('./errors/FormatoInvalido');

class Serializar {
    json(dados) {
        JSON.stringify(dados);
    };

    transformar(dados) {
        if (this.contentType !== 'application/json') {
            throw new FormatoInvalido(this.contentType);
        };
        return this.json(dados);
    };
}

class SerializarAgendamento extends Serializar{
    constructor(contentType){
        super();
        this.contentType = contentType;
    };
};

module.exports = {
    Serializar: Serializar,
    SerializarAgendamento: SerializarAgendamento,
    FormatosValidos: ['application/json']
}