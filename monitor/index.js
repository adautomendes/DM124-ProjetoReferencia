const express = require('express');
const fs = require('fs');
const path = require('path');
const morgan = require('morgan');
const routes = require('./routes');
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

app.use(routes);

const porta = process.env.PORTA || 3002;

app.listen(porta, function() {
    console.log(`Monitor rodando na porta ${porta}`);
});