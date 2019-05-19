const pgp = require('pg-promise')();
const database = require('../config/database.json');

if(typeof process.env.NODE_ENV === 'undefined') {
  throw new Error('NODE_ENV is not defined');
}

const environment = process.env.NODE_ENV;
const db = pgp(database[environment]);

let retryCounter = 0;
const retryCountMax = 60;

(async function retryConnectTillSucceed() {

    console.info(`Checking PG connection on port ${database[environment].port}...`);
    try{
	    await db.one('SELECT NOW()');
		console.info('PG connection succeeded!');
		process.exit(0);
    }
    catch(err) {
        console.info('PG connection failed. Stack trace as follows:');
        console.error(err.stack);
        if(++retryCounter >= retryCountMax) { 
            process.exit(1); 
		} else { 
            setTimeout(retryConnectTillSucceed, 1000);
    	}
    }
})();
