
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
    return knex('shoe_fit_ranks').del()
    .then(async function () {
        // Inserts seed entries
        let inserts = [];
        for(let i = 0; i < 100; i++) {
            inserts[i] = {
                shoe_id: randomInt(3),
                rank: randomInt(5),
            };
        }
        await knex('shoe_fit_ranks').insert(inserts);
        await knex.raw('select setval(\'shoe_fit_ranks_id_seq\', max(id)) from shoe_fit_ranks');
    });
};

function randomInt(max) {
    return Math.floor(Math.random() * max) + 1;
}
