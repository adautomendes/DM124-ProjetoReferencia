const express = require('express');
const AlarmeController = require('./src/controllers/AlarmeController');
const AuthController = require('./src/controllers/AuthController');
const rootRouter = express.Router();

// http://localhost:3000/
rootRouter.get('/', function(req, res) {
    res.json({ msg: "Olá mundo!" });
});

const alarmeRouter = express.Router();

rootRouter.use('/alarme', alarmeRouter);

alarmeRouter.patch('/:id/:acao', AuthController.verificaAPP, AlarmeController.validaAlarme, AlarmeController.alterar);
alarmeRouter.get('/', AuthController.verificaJWT, AlarmeController.buscar);

module.exports = rootRouter;