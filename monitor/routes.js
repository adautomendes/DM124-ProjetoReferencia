const express = require(`express`);

// Importando o AlarmeController
const AlarmController = require('./src/controllers/AlarmController');

// Router raiz da aplicação
const rootRouter = express.Router();

rootRouter.get(`/`, (req, res) => { // Rota raiz da aplicação
    res.send('Hello world!');
});

// Router para as operações de Alarme
const alarmRouter = express.Router();

// Definindo caminho para o router Alarme dentro do router Raiz
// Isto cria uma hierarquia entre os routers
rootRouter.use(`/alarm`, alarmRouter);

// Definindo rotas para o router /alarm
alarmRouter.post(`/:id/raise`, AlarmController.raise);
alarmRouter.post(`/:id/cease`, AlarmController.cease);
alarmRouter.get(`/`, AlarmController.search);

module.exports = rootRouter;

