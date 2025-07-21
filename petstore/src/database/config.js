require('dotenv').config({ quiet: true });

module.exports = {
    DB_URL: `mongodb://${process.env.MONGODB_HOST || 'localhost'}:${process.env.MONGODB_PORT || '27017'}`,

    DB_SETTINGS: {
        dbName: `${process.env.MONGODB_NAME || 'petstore'}`
    }
}