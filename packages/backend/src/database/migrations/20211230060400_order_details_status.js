exports.up = (knex) => knex.schema.createTable('order_details_status', (table) => {
    table.increments('order_details_status_id').primary();
    table.string('order_details_status_name', 50).notNullable();
});

exports.down = (knex) => knex.schema.dropTable('order_details_status');
