// Importe o módulo Express
const express = require('express');
// Importe o módulo Morgan
const morgan = require('morgan');
// Importe o módulo fs
const fs = require('fs');
// Importe o módulo path
const path = require('path');
const routes = require('./routes');
// Importe o módulo dotenv
require('dotenv').config();
// Importe o módulo do mongoose
const mongoose = require(`mongoose`);
// Importe as configurações do BD
const DB = require(`./src/database/config`);
// Importe o serviço de alarmes
const AlarmeService = require('./src/service/AlarmeService');

// Crie uma aplicação Express
const app = express();

// Definindo que as requisições usaram body no formato JSON
app.use(express.json());

// Customizando o token 'body' para o morgan
morgan.token('body', req => {
    return JSON.stringify(req.body, null, 4);
});

// Definindo morgan como middleware do app
if (process.env.NODE_ENV === 'dev') {
    app.use(morgan(':method :url\n:body'));
} else {
    /**
     * Assumiremos que se o NODE_ENV não
     * for 'dev' por padrão será 'prod'.
    */
    // Definindo log para o console
    app.use(morgan('tiny'));

    // Criando um file stream para armazenar o log
    const logFileStream = fs.createWriteStream(path.join(__dirname, 'app.log'), { flags: 'a' });
    // Definindo log para o arquivo
    app.use(morgan(':method :url\n:body', {
        stream: logFileStream
    }));
}

// Health check para o MongoDB
let dbUp = true;

mongoose.connection.on('connected', () => {
    console.log(`[DESATIVAR ALARME] - DB up`);
    dbUp = true;
    AlarmeService.gerenciarAlarme('DB_0001', 'desativar');
});

mongoose.connection.on('disconnected', () => {
    console.log(`[ATIVAR ALARME] - DB down`);
    dbUp = false;
    AlarmeService.gerenciarAlarme('DB_0001', 'ativar');
});

app.use((req, res, next) => {
    console.log(`[MIDDLEWARE] - Health Check do MongoDB`);
    if (dbUp) {
        next();
    } else {
        return res.status(503).json({ msg: "MongoDB fora do ar." });
    }
});

// Definindo as rotas para serem usadas na aplicação
app.use(routes);

//Configure a conexão com o MongoDB
mongoose.connect(DB.DB_URL, DB.DB_SETTINGS)
    .then(() => console.log(`Conectado ao MongoDB: ${DB.DB_URL}`))
    .catch(err => console.log(`Erro ao conectar ao MongoDB: ${err}`));

// Configure a porta para o servidor escutar
const porta = process.env.PORT || 3000;

// Inicie o servidor e escute na porta especificada
app.listen(porta, () => {
    console.log(`O servidor está rodando em http://localhost:${porta}`);
});

