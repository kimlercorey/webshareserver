
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('jobs').del()
    .then(function () {
      // Inserts seed entries
      return knex('jobs').insert([
        {type: 'dummy', request: '{"request":"null_request1"}'},
        {type: 'dummy', request: '{"request":"null_request2"}'},
        {type: 'dummy'}
      ]);
    });
};
