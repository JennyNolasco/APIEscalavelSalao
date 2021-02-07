const configExpress = require('./config/configExpress');
const config = require('config');

// O configExpress é uma função que retorna nosso app configurado. 
//Chamando a função para obter o app configurado
app = configExpress()

//Subindo o servidor na porta 3000 e assim que subir executar uma função
app.listen(config.get('api.port'),  () => {
    console.log('Servidor Rodando na porta 3000')
});


