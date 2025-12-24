const express = require(`express`);

// Importando o PetController
const PetController = require('./src/controllers/PetController');

// Importando o AuthController
const AuthController = require('./src/controllers/AuthController');

// Router raiz da aplicação
const rootRouter = express.Router();

rootRouter.get(`/`, (req, res) => { // Rota raiz da aplicação
    res.send('Olá, Mundo!');
});

// Router para as operações de Pet
const petRouter = express.Router();

// Definindo caminho para o router Pet dentro do router Raiz
// Isto cria uma hierarquia entre os routers
rootRouter.use(`/pet`, AuthController.verificaJWT, petRouter);

// Definindo rotas para o router /pet
petRouter.post(`/`, PetController.inserir);
petRouter.get(`/`, PetController.buscar);

module.exports = rootRouter;

