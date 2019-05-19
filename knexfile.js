const devConfig = require('./config/database.json');

module.exports = {

  development: {
    client: 'postgresql',
    connection: devConfig.development,
    migrations: {
      directory: './db/migrations' 
    },
    seeds: {
      directory: './db/seeds' 
    }
  }

};
