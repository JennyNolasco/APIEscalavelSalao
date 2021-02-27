const TabelaUsuario = require('./TabelaUsuario');
const CampoInvalido = require('../../errors/CampoInvalido');
const DadosNaoInformados = require('../../errors/DadosNaoInformados');
const CampoQtdMaxima = require('../../errors/CampoQtdMaxima');
const CampoQtdMinima = require('../../errors/CampoQtdMinima');

const bcrypt = require('bcrypt');

class Usuario {
    constructor({id, nome, email, senha, data_criacao, data_atualizacao}){
        this.id = id;
        this.nome = nome;
        this.email = email;
        this.senha = senha;
        this.data_criacao = data_criacao;
        this.data_atualizacao = data_atualizacao;
    };

    async criar() {
        this.validar()
        const result = await TabelaUsuario.adicionar({
            nome: this.nome,
            email: this.email,
            senha: this.senha
        });
        this.id = result.id;
        this.data_criacao = result.data_criacao;
        this.data_atualizacao = result.data_atualizacao;
    };

    async buscarPorID() {
        const result = await TabelaUsuario.buscarPorPK(this.id);
        this.nome = result.nome;
        this.email = result.email;
        this.senha = result.senha;
        this.data_criacao = result.data_criacao;
        this.data_atualizacao = result.data_atualizacao;
    };

    async buscarPorEmail() {
        const result = await TabelaUsuario.buscarPorEmail(this.email);
        this.nome = result.nome;
        this.email = result.email;
        this.senha = result.senha;
        this.data_criacao = result.data_criacao;
        this.data_atualizacao = result.data_atualizacao;
    };

    async atualizar() {
        await TabelaUsuario.buscarPorPK(this.id);
        const camposAtualizaveis = ['nome', 'email', 'senha']
        const dadosAtualizar = {}

        camposAtualizaveis.forEach((campo) => {
            const valor = this[campo];
            if (typeof valor === 'string' && valor.length > 0) {
                dadosAtualizar[campo] = valor
            };
        });

        if(Object.keys(dadosAtualizar).length === 0) {
            throw new DadosNaoInformados()
        };

        await TabelaUsuario.atualizar(this.id, dadosAtualizar);
    };

    async remover() {
        await TabelaUsuario.remover(this.id);
    };

    validar() {
        const camposObrigatorios = ['nome', 'email', 'senha']

        camposObrigatorios.forEach((campo) => {
            const valor = this[campo];
            if (typeof valor !== 'string' || valor.length === 0) {
                throw new CampoInvalido(campo)
            };

            
            if(valor.length < 8 && valor === 'senha') {
                throw new CampoQtdMinima()
            }
        });
    };

    async gerarHash(campo) {
        const saltRounds  = 12;
        return await bcrypt.hash(campo, saltRounds)
    };

    async adicionaSenha(senha) {
        this.senhaHash = await this.gerarHash(senha);
    };
};

module.exports = Usuario;