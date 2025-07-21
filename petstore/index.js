const express = require('express');
const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');
const morgan = require('morgan');
const routes = require('./routes');
const database = require('./src/database/config');
const AlarmeService = require('./src/service/AlarmeService');
require('dotenv').config({ quiet: true });

const app = express();

app.use(express.json());

morgan.token('body', req => {
    return JSON.stringify(req.body, {}, 2);
});

morgan.token('headers', req => {
    return JSON.stringify(req.headers, {}, 2);
});

if (process.env.NODE_ENV === 'dev') {
    app.use(morgan(':method :url\n:headers\n:body'));
} else {
    app.use(morgan('tiny'));

    const logFileStream = fs.createWriteStream(path.join(__dirname, 'app.log'), { flags: 'a' });
    app.use(morgan(':method :url\n:headers\n:body', {
        stream: logFileStream
    }));
}

app.use((req, res, next) => {
    if (dbUp) {
        next();
    } else {
        return res.status(503).json({
            codigo: 'PET0004',
            msg: 'MongoDB fora do ar.'
        })
    }
});

app.use(routes);

const porta = process.env.PORTA || 3000;

mongoose.connect(database.DB_URL, database.DB_SETTINGS)
    .then(() => console.log('Conectado ao MongoDB.'))
    .catch(erro => console.log(`Erro ao conectar ao MongoDB: ${erro}`));

let dbUp = false;

mongoose.connection.on('connected', () => {
    console.log('[DESATIVAR ALARME] - DB up');
    dbUp = true;
    AlarmeService.gerenciarAlarme('DB0001', 'desativar');
});

mongoose.connection.on('disconnected', () => {
    console.log('[ATIVAR ALARME] - DB down');
    dbUp = false;
    AlarmeService.gerenciarAlarme('DB0001', 'ativar');
});

app.listen(porta, function () {
    console.log(`Petstore rodando na porta ${porta}`);
});