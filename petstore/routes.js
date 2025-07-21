const express = require('express');
const PetController = require('./src/controllers/PetController');
const AuthController = require('./src/controllers/AuthController');
const rootRouter = express.Router();

// http://localhost:3000/
rootRouter.get('/', function(req, res) {
    res.json({ msg: "Olá mundo!" });
});

const petRouter = express.Router();

rootRouter.use('/pet', AuthController.verificaJWT, petRouter);

petRouter.post('/', PetController.validaPet, PetController.inserir);
petRouter.patch('/:nome', PetController.validaPet, PetController.atualizar);
petRouter.get('/', PetController.buscar);
petRouter.delete('/:nome', PetController.excluir);

module.exports = rootRouter;