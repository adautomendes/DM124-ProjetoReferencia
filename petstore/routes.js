const express = require(`express`);

// Importando o PetController
const PetController = require('./src/controllers/PetController');

// Router raiz da aplicação
const rootRouter = express.Router();

rootRouter.get(`/`, (req, res) => { // Rota raiz da aplicação
    res.send('Olá, Mundo!');
});

// Router para as operações de Pet
const petRouter = express.Router();

// Definindo caminho para o router Pet dentro do router Raiz
// Isto cria uma hierarquia entre os routers
rootRouter.use(`/pet`, petRouter);

// Definindo rotas para o router /pet
petRouter.post(`/`, PetController.inserir);
petRouter.get(`/`, PetController.buscar);

module.exports = rootRouter;

