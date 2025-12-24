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
const AlarmService = require('./src/service/AlarmService');

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
    console.log(`[CEASE ALARM] - DB up`);
    dbUp = true;
    AlarmService.handleAlarm('DB_0001', 'cease');
});

mongoose.connection.on('disconnected', () => {
    console.log(`[RAISE ALARM] - DB down`);
    dbUp = false;
    AlarmService.handleAlarm('DB_0001', 'raise');
});

app.use((req, res, next) => {
    console.log(`[MIDDLEWARE] - MongoDB Health Check`);
    if (dbUp) {
        next();
    } else {
        return res.status(503).json({ msg: "MongoDB service unavailable." });
    }
});

// Definindo as rotas para serem usadas na aplicação
app.use(routes);

//Configure a conexão com o MongoDB
mongoose.connect(DB.DB_URL, DB.DB_SETTINGS)
    .then(() => console.log(`Connected to MongoDB: ${DB.DB_URL}`))
    .catch(err => console.log(`Error connecting to MongoDB: ${err}`));

// Configure a porta para o servidor escutar
const port = process.env.PORT || 3000;

// Inicie o servidor e escute na porta especificada
app.listen(port, () => {
    console.log(`The server is running at http://localhost:${port}`);
});

