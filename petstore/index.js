// Importe o módulo Express
const express = require('express');
const routes = require('./routes');
// Importe o módulo do mongoose
const mongoose = require(`mongoose`);
// Importe as configurações do BD
const DB = require(`./src/database/config`);

// Crie uma aplicação Express
const app = express();

//Definindo que as requisições usaram body no formato JSON
app.use(express.json());

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

