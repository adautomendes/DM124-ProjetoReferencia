// Importando o módulo Axios
const axios = require('axios');

module.exports = {
    handleAlarm(alarmId, action) {
        // Enviando request para o alarme ativando/desativando os alarmes 
        axios.post(`${process.env.MONITOR_SERVER}/alarm/${alarmId}/${action}`)
            .then(response => {
                console.log(`Alarm changed: ${JSON.stringify(response.data)}`);
            })
            .catch(error => {
                console.error(`Error changing alarm: ${error.message}`);
            });
    }
}