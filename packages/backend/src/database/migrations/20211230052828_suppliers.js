exports.up = (knex) => knex.schema.createTable('suppliers', (table) => {
    table.increments('supplier_id').primary();
    table.string('supplier_name', 100).notNullable();
    table.string('contact_name', 100).notNullable();
    table.string('address',255).notNullable();
    table.string('postal_code',15).notNullable();
    table.string('country',30).notNullable();
    table.string('phone',15).notNullable();
    table.integer('account_id').unique().unsigned().notNullable()
        .references('account_id')
        .inTable('accounts');
    table.timestamp('created_at').defaultTo(knex.fn.now());
    table.timestamp('updated_at').defaultTo(knex.raw('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'));
  // table.uuid('id').primary();
});

exports.down = (knex) => knex.schema.dropTable('suppliers');
