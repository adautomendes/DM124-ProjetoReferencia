// Importe o módulo Express
const express = require('express');
const routes = require('./routes');
// Importe o módulo dotenv
require('dotenv').config();

// Crie uma aplicação Express
const app = express();

//Definindo que as requisições usaram body no formato JSON
app.use(express.json());

// Definindo as rotas para serem usadas na aplicação
app.use(routes);

// Configure a porta para o servidor escutar
const porta = process.env.PORT || 3001;

// Inicie o servidor e escute na porta especificada
app.listen(porta, () => {
  console.log(`O servidor está rodando em http://localhost:${porta}`);
});

