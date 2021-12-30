exports.up = (knex) => knex.schema.createTable('shippers', (table) => {
    table.increments('shipper_id').primary();
    table.string('shipper_name', 50).notNullable();
    table.string('phone',20).notNullable();
    table.integer('account_id').unique().unsigned().notNullable()
        .references('account_id')
        .inTable('accounts');
    table.timestamp('created_at').defaultTo(knex.fn.now());
    table.timestamp('updated_at').defaultTo(knex.raw('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'));
});

exports.down = (knex) => knex.schema.dropTable('shippers');
