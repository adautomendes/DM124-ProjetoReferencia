const express = require('express');
const AuthController = require('./src/controllers/AuthController');
const rootRouter = express.Router();

// http://localhost:3001/
rootRouter.get('/', function(req, res) {
    res.json({ msg: "Olá mundo!" });
});

const authRouter = express.Router();

rootRouter.use('/auth', authRouter);

authRouter.post('/login', AuthController.login)
authRouter.post('/validaToken', AuthController.validaToken)

module.exports = rootRouter;