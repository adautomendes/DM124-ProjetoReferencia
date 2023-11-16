const jwt = require(`jsonwebtoken`);
require('dotenv').config();

module.exports = {
    login(req, res) {
        let user = req.body.user;
        let pass = req.body.pass;

        if (user && pass) {
            let token = jwt.sign({ user, pass }, process.env.CHAVE_PRIVADA, {
                expiresIn: `${process.env.TEMPO_EXP}`
            });

            console.log(`Usuário ${user} logado.`);
            return res.status(200).json({ token, expiresIn: `${process.env.TEMPO_EXP}` });
        } else {
            return res.status(401).json({ msg: `Login inválido.` });
        }
    },

    verificaJWT(req, res) {
        const tokenRequest = req.headers.token;

        if (tokenRequest) {
            console.log(`Verificando token ${tokenRequest.slice(0, 10)}...`);

            jwt.verify(tokenRequest, process.env.CHAVE_PRIVADA, (error, decoded) => {
                if (error) {
                    return res.status(401).json({ msg: `Token inválido.`, token: tokenRequest, error });
                } else {
                    return res.status(200).json({ user: decoded.user, token: tokenRequest });
                }
            });
        } else {
            return res.status(401).json({ msg: `Token não fornecido.` });
        }
    },
};