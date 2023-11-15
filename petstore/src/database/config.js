require('dotenv').config();

module.exports = {
    DB_URL: `mongodb://${process.env.MONGODB_HOST}:${process.env.MONGODB_PORT}`,

    DB_SETTINGS: {
        dbName: `${process.env.MONGODB_DBNAME}`
    }
};

