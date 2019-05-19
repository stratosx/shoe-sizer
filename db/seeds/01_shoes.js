
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('shoes').del()
    .then(function () {
      // Inserts seed entries
      return knex('shoes').insert([
        {
            shoe_id: 1,
            shoe_name: 'adidas ZX 500 Dragon Ball Z Son Goku'
        },
        {
            shoe_id: 2,
            shoe_name: 'adidas Ultra Tech Dragon Ball Z Vegeta'
        },
        {
            shoe_id: 3,
            shoe_name: 'adidas Yung-1 Dragon Ball Z Frieza'
        },
      ]);
    });
};
