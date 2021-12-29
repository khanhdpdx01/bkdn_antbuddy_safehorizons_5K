exports.up = (knex) => knex.schema.createTable('accounts', (table) => {
    table.increments('id').primary();
    table.string('username', 50).unique().notNullable();
    table.string('password', 255).notNullable();
    table.boolean('status').defaultTo(0);
    table.timestamp('created_at').defaultTo(knex.fn.now());
    table.timestamp('updated_at').defaultTo(knex.raw('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'));
  // table.uuid('id').primary();
});

exports.down = (knex) => knex.schema.dropTable('accounts');
