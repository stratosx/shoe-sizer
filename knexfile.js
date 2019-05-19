const config = require('./config/database.json');

module.exports = {

  development: {
    client: 'postgresql',
    connection: config.development,
    migrations: {
      directory: './db/migrations' 
    },
    seeds: {
      directory: './db/seeds' 
    }
  }

};
