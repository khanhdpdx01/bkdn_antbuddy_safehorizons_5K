exports.up = (knex) => knex.schema.createTable('payments', (table) => {
    table.increments('payment_id').primary();
    table.string('payment_name', 50).notNullable();
});

exports.down = (knex) => knex.schema.dropTable('payments');
