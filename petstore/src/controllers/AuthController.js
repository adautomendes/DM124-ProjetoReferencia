const axios = require('axios');
require('dotenv').config({ quiet: true });

module.exports = {
    verificaJWT(req, res, next) {
        const { token } = req.headers;

        let request = {
            url: `http://${process.env.AUTH_SERVER}/auth/validaToken`,
            data: {},
            config: {
                headers: { token }
            }
        };

        axios.post(request.url, request.data, request.config)
            .then(res => {
                next();
            })
            .catch(erro => {
                if (erro.response) {
                    return res.status(erro.response.status).json(erro.response.data);
                } else {
                    return res.status(503).json({
                        codigo: 'PET0003',
                        msg: 'Não foi possível validar o token no serviço Auth.'
                    });
                }
            });
    }
}