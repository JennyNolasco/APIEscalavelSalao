class LoginInvalido extends Error{
    constructor(){
        super('E-mail ou senha inválidos');
        this.name = 'LoginInvalido';
        this.idErro = 6; 
    };
};

module.exports = LoginInvalido