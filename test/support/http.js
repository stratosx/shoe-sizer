
const
    http = require('http');

const
    app = require('../../app'),
    server = http.createServer(app);

module.exports = require('supertest')(server);

module.exports.app = app;
module.exports.server = server;
