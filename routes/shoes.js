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
        //TODO: verify shoe name does not already exist
        await knex('shoes')
        .insert({ shoe_name: req.body.shoe_name });

        return res.status(201).send('ok');
    }
    catch(err) {
        console.error('error saving new shoe', err.message);
        return res.status(500).json({ error: 'error saving new shoe' });
    }
});

const shoeFitValidation = require('./validation/shoeFit.js');

/**
 * PUT to shoes to add a fit rating
 */
router.put('/:id/fit/ratings',
jsonParser,
validate(shoeFitValidation),
async (req, res, next) => {

    try {
        await knex('shoe_fit_ranks')
        .insert({
            rank: req.body.rank,
            shoe_id: req.params.id
        });

        return res.status(200).send('ok');
    }
    catch(err) {
        console.error('error saving new rank', err.message);
        return res.status(500).json({ error: 'error saving new rank' });
    }
});

/**
 * GET the average ranking of a shoe
 */
router.get('/:id/fit',
jsonParser,
async (req, res, next) => {

    try {
        const rank  = await knex('shoe_fit_ranks')
        .avg('rank')
        .where({ shoe_id: req.params.id }).first();

        if(rank.avg === null) {
            return res.status(400).json({ error: 'id does not exist' });
        }
        return res.json({ trueToSizeCalculation: rank.avg });

    }
    catch(err) {
        console.error('error saving new rank', err.message);
        return res.status(500).json({ error: 'error saving new rank' });
    }
});


module.exports = router;
