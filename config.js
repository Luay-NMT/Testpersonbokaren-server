var config = {};

config.db = {};
config.db.username = 'root';
config.db.password = 'password';
config.db.host = 'localhost';
config.db.databasename = 'testpersonservice_bookings';

config.server = {};
config.server.protocol = 'http';
config.server.host = process.env.WEB_HOST || 'localhost';
config.server.port = process.env.WEB_PORT || 5000;

module.exports = config;