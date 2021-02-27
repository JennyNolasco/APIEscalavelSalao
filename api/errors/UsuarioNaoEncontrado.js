class UsuarioNaoEncontrado extends Error {
    constructor(){
        super('Usuário não encontrado!');
        this.name = 'UsuarioNaoEncontrado';
        this.idErro = 7;
    };
};

module.exports = UsuarioNaoEncontrado