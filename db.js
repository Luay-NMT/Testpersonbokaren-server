const mysql = require('mysql');
const config = require('./config');

module.exports = {
    dbConnect() {
        return mysql.createConnection({
            user: config.db.username,
            host: config.db.host,
            password: config.db.password,
            database: config.db.databasename,
        });
    }
};