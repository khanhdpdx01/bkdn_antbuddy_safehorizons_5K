exports.up = (knex) => knex.schema.createTable('cart', (table) => {
    table.increments('cart_id').primary();
    table.integer('customer_id').unique().unsigned()
        .references('customer_id')
        .inTable('customers');
    table.string('session_id', 100);
    table.timestamp('created_at').defaultTo(knex.fn.now());
    table.timestamp('updated_at').defaultTo(knex.raw('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'));
});

exports.down = (knex) => knex.schema.dropTable('cart');
