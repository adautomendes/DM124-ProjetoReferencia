const express = require(`express`);

// Importando o AuthController
const AuthController = require(`./src/controllers/AuthController`);

// Router raiz da aplicação
const rootRouter = express.Router();

rootRouter.get(`/`, (req, res) => { // Rota raiz da aplicação
    res.send('Olá, Mundo!');
});

// Router para as operações de Auth
const authRouter = express.Router();

// Definindo caminho para o router Auth dentro do router Raiz
// Isto cria uma hierarquia entre os routers
rootRouter.use(`/auth`, authRouter);

// Definindo rotas para o router /auth
authRouter.post(`/login`, AuthController.login); // /auth/login
authRouter.post(`/validaToken`, AuthController.verificaJWT); // /auth/validaToken

module.exports = rootRouter;

