
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('shoes').del()
    .then(async function () {
      // Inserts seed entries
      await knex('shoes').insert([
        {
            shoe_id: 1,
            shoe_name: 'adidas zx 500 dragon ball z son goku'
        },
        {
            shoe_id: 2,
            shoe_name: 'adidas ultra tech dragon ball z vegeta'
        },
        {
            shoe_id: 3,
            shoe_name: 'adidas yung-1 dragon ball z frieza'
        },
      ]);
      //Need to set this or it will assume the id starts at 1
      await knex.raw('select setval(\'shoes_shoe_id_seq\', max(shoe_id)) from shoes');
    });
};
