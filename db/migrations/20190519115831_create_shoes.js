
exports.up = function(knex, Promise) {
    return Promise.all([
        knex.schema.createTable('shoes', function(table) {
            table.increments('shoe_id').primary();
            table.string('shoe_name');
        }),

        knex.schema.createTable('shoe_fit_ranks', function(table) {
            table.increments('id').primary();
            table.integer('shoe_id').references('shoe_id').inTable('shoes');
            table.integer('rank');
            table.timestamp('created_at').defaultTo(knex.fn.now());
        }),
    ]);
};

exports.down = function(knex, Promise) {
    return Promise.all([
        knex.schema.dropTable('shoe_fit_ranks'),
        knex.schema.dropTable('shoes')
    ]);

};
