exports.up = (knex) => knex.schema.createTable('orders_status', (table) => {
    table.increments('orders_status_id').primary();
    table.string('orders_status_name', 50).notNullable();
});

exports.down = (knex) => knex.schema.dropTable('orders_status');
