const axios = require(`axios`);
require(`dotenv`).config();

module.exports = {
    validateJWT(req, res, next) {
        const tokenRequest = req.headers.token;

        let request = {
            url: `${process.env.AUTH_SERVER}/auth/validateToken`,
            data: {},
            config: {
                headers: {
                    token: tokenRequest
                }
            }
        };

        console.log(`Sending token to [${request.url}]`);
        axios.post(request.url, request.data, request.config)
            .then((response) => {
                console.log(`Token OK!`);
                next();
            })
            .catch((error) => {
                console.error(`Invalid token.`);
                return res.status(error.response.status).json({ error });
            });
    }
};
