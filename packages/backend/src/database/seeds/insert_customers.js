const { data } = require('../customers');

exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex('customers').del()
    .then(async () => knex('customers').insert([...data]));
};
