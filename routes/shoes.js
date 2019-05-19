const
    express = require('express'),
    router = express.Router(),
    config = require("../knexfile"),
    bodyParser = require('body-parser')
    knexConfig = config[process.env.NODE_ENV || 'development'],
    Knex = require("knex"),
    knex = Knex(knexConfig);


/**
 * Get the list of shoes that have been added to the database.
 * You can pass query string param search to do a simple like on the shoe_name
 */
router.get('/', async function(req, res, next) {
    const query = knex('shoes');

    if(req.query.search) {
        query.where('shoe_name', 'like', `%${req.query.search}%`);
    }

    shoes = await query.select();

    res.json(shoes);
});


module.exports = router;
