const axios = require(`axios`);
require(`dotenv`).config();

module.exports = {
    verificaJWT(req, res, next) {
        const tokenRequest = req.headers.token;

        let request = {
            url: `${process.env.AUTH_SERVER}/auth/validaToken`,
            data: {},
            config: {
                headers: {
                    token: tokenRequest
                }
            }
        };

        console.log(`Enviando token para [${request.url}]`);
        axios.post(request.url, request.data, request.config)
            .then((response) => {
                console.log(`Token OK!`);
                next();
            })
            .catch((error) => {
                console.error(`Token inválido.`);
                return res.status(error.response.status).json({ error });
            });
    }
};
