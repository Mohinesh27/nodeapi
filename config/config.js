let Sequelize = require('sequelize');
let CONFIG = require('config');
// Import Mongoose
let mongoose = require('mongoose');
let secret = CONFIG.get('secret');


exports.configureMongoDb = () => {
    let dbConfig = CONFIG.get('database.mongodb');
    mongoose.connect(`${dbConfig.endpoint}${dbConfig.databasename}`);
    this.db = mongoose.connection;
}

exports.configureAWS = () => {
    return null;
}
