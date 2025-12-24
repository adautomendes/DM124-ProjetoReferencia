const jwt = require(`jsonwebtoken`);
require('dotenv').config();

module.exports = {
    login(req, res) {
        let user = req.body.user;
        let pass = req.body.pass;

        if (user && pass) {
            let token = jwt.sign({ user, pass }, process.env.PRIVATE_KEY, {
                expiresIn: `${process.env.TOKEN_EXP}`
            });

            console.log(`User ${user} logged in.`);
            return res.status(200).json({ token, expiresIn: `${process.env.TOKEN_EXP}` });
        } else {
            return res.status(401).json({ msg: `Invalid login.` });
        }
    },

    validateJWT(req, res) {
        const tokenRequest = req.headers.token;

        if (tokenRequest) {
            console.log(`Verifying token ${tokenRequest.slice(0, 10)}...`);
            jwt.verify(tokenRequest, process.env.PRIVATE_KEY, (error, decoded) => {
                if (error) {
                    return res.status(401).json({ msg: `Invalid token.`, token: tokenRequest, error });
                } else {
                    return res.status(200).json({ user: decoded.user, token: tokenRequest });
                }
            });
        } else {
            return res.status(401).json({ msg: `Token not provided.` });
        }
    },
};