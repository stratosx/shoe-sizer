
exports.up = function(knex, Promise) {
    return Promise.all([
        knex.schema.createTable('shoes', function(table) {
            table.increments('shoe_id').primary();
            table.string('shoe_name');
            table.foreign('shoe_id')
                .references('shoe_fit_ranks');
        }),
        
        knex.schema.createTable('shoe_fit_ranks', function(table) {
            table.increments('id').primary();
            table.integer('shoe_id');
            table.integer('rank');
            table.timestampsd
        }),
    ]);
};

exports.down = function(knex, Promise) {
    return Promise.all([
        knex.schema.dropTable('shoes'),
        knex.schema.dropTable('shoe_fit_ranks')
    ]);
  
};
