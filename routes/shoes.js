const
    express = require('express'),
    assert = require('assert'),
    router = express.Router(),
    config = require("../knexfile"),
    bodyParser = require('body-parser'),
    jsonParser = bodyParser.json()
    knexConfig = config[process.env.NODE_ENV || 'development'],
    Knex = require("knex"),
    validate = require('express-validation');

    knex = Knex(knexConfig);


/**
 * Get the list of shoes that have been added to the database.
 * You can pass query string param search to do a simple like on the shoe_name
 */
router.get('/',
async (req, res, next) => {
    const query = knex('shoes');

    if(req.query.search) {
        query.where('shoe_name', 'like', `%${req.query.search}%`);
    }

    shoes = await query.select();

    res.json(shoes);
});

const createShoeValidation = require('./validation/createShoe.js');

/**
 * POST to shoes to create a new shoe with the shoe_name passed in
 */
router.post('/',
jsonParser,
validate(createShoeValidation),
async (req, res, next) => {

    try {

        const id =
        await knex('shoes')
        .insert({ shoe_name: req.body.shoe_name });
    }
    catch(err) {
        console.err('error saving new shoe', err);
        res.status(500).json({ error: 'error saving new shoe' });
    }

    res.status(201).send('ok');
});


module.exports = router;
