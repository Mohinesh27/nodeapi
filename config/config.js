let Sequelize = require('sequelize');
let CONFIG = require('config');

class AppConfig {

    constructor() {
        this.db = null;
        this.Sequelize = null;
    }

    configureMySQL() {
        let dbConfig = CONFIG.get('database.mysql');
        console.log(dbConfig);
        console.log('In configureMySQL');


        if (this.db == null) {
            console.log('in configureMySQL creating object');
            this.Sequelize = Sequelize;
           
            this.db = new Sequelize(dbConfig.database, dbConfig.username, dbConfig.password, {
                host: dbConfig.endpoint,
                dialect: dbConfig.dialect,
                port: dbConfig.port,

                pool: {
                    max: dbConfig.poolConfig.max,
                    min: dbConfig.poolConfig.min,
                    idle: dbConfig.poolConfig.idle
                }
            });

            this.db.authenticate()
            .then(() => {
                console.log('Connection has been established successfully.');
            })
            .catch(err => {
                console.error('Unable to connect to the database:', err);
            });
        }

        console.log(this.db);
    }

    getDB() {
        console.log('in getDB');
        if (this.db == null) {
            console.log('in getDB creating object');
            this.Sequelize = Sequelize;
            this.db = new Sequelize(dbConfig.database, dbConfig.username, dbConfig.password, {
                host: 'localhost',//dbConfig.host,
                dialect: dbConfig.dialect,
                port: dbConfig.port,
                pool: {
                    max: dbConfig.poolConfig.max,
                    min: dbConfig.poolConfig.min,
                    idle: dbConfig.poolConfig.idle
                }
            });

            this.db.authenticate()
            .then(() => {
                console.log('Connection has been established successfully.');
            })
            .catch(err => {
                console.error('Unable to connect to the database:', err);
            });

            return { db: this.db, Sequelize: this.Sequelize };
        }
        else {
            console.log('in getDB returning object');
            return { db: this.db, Sequelize: this.Sequelize };
        }
    }

    configureAWS() {
        return null;
    }

    syncDatabase(){
        this.db.sync({force:true}).then(()=>{
            console.log('Database synchronization successfully done.');
        }).catch(err=>{
            console.log('Database synchronization failed');
            console.log(err);
        })
    }
}

module.exports = new AppConfig();