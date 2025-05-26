const express = require(`express`);

// Importando o AlarmeController
const AlarmeController = require('./src/controllers/AlarmeController');

// Router raiz da aplicação
const rootRouter = express.Router();

rootRouter.get(`/`, (req, res) => { // Rota raiz da aplicação
    res.send('Olá, Mundo!');
});

// Router para as operações de Alarme
const alarmeRouter = express.Router();

// Definindo caminho para o router Alarme dentro do router Raiz
// Isto cria uma hierarquia entre os routers
rootRouter.use(`/alarme`, alarmeRouter);

// Definindo rotas para o router /alarme
alarmeRouter.post(`/:id/ativar`, AlarmeController.ativar);
alarmeRouter.post(`/:id/desativar`, AlarmeController.desativar);
alarmeRouter.get(`/`, AlarmeController.buscar);

module.exports = rootRouter;

