// Importando o módulo Axios
const axios = require('axios');

module.exports = {
    gerenciarAlarme(alarmeId, acao) {
        // Enviando request para o alarme ativando/desativando os alarmes 
        axios.post(`${process.env.ALARME_SERVER}/alarme/${alarmeId}/${acao}`)
            .then(response => {
                console.log(`Alarme alterado: ${JSON.stringify(response.data)}`);
            })
            .catch(error => {
                console.error(`Erro ao alterar alarme: ${error.message}`);
            });
    }
}