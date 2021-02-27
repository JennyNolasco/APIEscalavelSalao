class FormatoInvalido extends Error {
    constructor(contentType){
        super(`O tipo ${contentType} é inválido! A api suporta somente JSON`); 
        this.name = 'FOrmatoInvalido';
        this.idErro = 3;
    };
};

module.exports = FormatoInvalido