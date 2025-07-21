const fs = require('fs');
const path = require('path');
require('dotenv').config({ quiet: true });

module.exports = {
    info(msg) {
        console.log(`[INFO] - ${msg}`);
    },
    debug(msg) {
        if (process.env.NODE_ENV === 'dev') {
            console.log(`[DEBUG] - ${msg}`);
        }
    },
    json(obj) {
        if (process.env.NODE_ENV === 'dev') {
            console.log(`[DEBUG] - Object:\n${JSON.stringify(obj, {}, 2)}`);
        }
    },
    request(req, res, next) {
        if (process.env.NODE_ENV === 'dev') {
            console.log(`[DEBUG] - Request headers:\n${JSON.stringify(req.headers, {}, 2)}`);
            if (req.body) {
                console.log(`[DEBUG] - Request body:\n${JSON.stringify(req.body, {}, 2)}`);
            }
        } else {
            const logFileStream = fs.createWriteStream(path.join(__dirname, 'debug.log'), { flags: 'a' });
            logFileStream.write(`[DEBUG] - Request headers:\n${JSON.stringify(req.headers, {}, 2)}`);
            if (req.body) {
                logFileStream.write(`[DEBUG] - Request body:\n${JSON.stringify(req.body, {}, 2)}`);
            }
        }
        next();
    }
}