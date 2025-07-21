const jwt = require('jsonwebtoken');
require('dotenv').config({ quiet: true });

module.exports = {
    login(req, res) {
        const { user, pass } = req.body;

        if (user && pass) { // User e pass são válidos
            let token = jwt.sign({ user, pass }, process.env.CHAVE_PRIVADA, {
                expiresIn: process.env.TEMPO_EXP
            });

            console.log(`Usuário ${user} logado com sucesso...`);
            return res.status(200).json({
                user,
                token
            });
        }

        return res.status(401).json({
            codigo: 'AUTH0001',
            msg: "Usuário ou senha inválidos."
        });
    },
    validaToken(req, res) {
        const { token } = req.headers;

        if (token) {
            jwt.verify(token, process.env.CHAVE_PRIVADA, (erro, decoded) => {
                if (erro) {
                    return res.status(401).json({
                        codigo: 'AUTH0003',
                        msg: "Token inválido.",
                        token,
                        erro
                    });
                } else {
                    return res.status(200).json({
                        user: decoded.user,
                        token
                    });
                }
            })
        } else {
            return res.status(401).json({
                codigo: 'AUTH0002',
                msg: "Token não fornecido."
            });
        }
    }
}