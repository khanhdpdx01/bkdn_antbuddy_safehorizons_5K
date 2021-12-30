exports.up = (knex) => knex.schema.createTable('categories', (table) => {
    table.increments('category_id').primary();
    table.string('category_name', 100).notNullable();
    table.text('description').notNullable();
    table.timestamp('created_at').defaultTo(knex.fn.now());
    table.timestamp('updated_at').defaultTo(knex.raw('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'));
  // table.uuid('id').primary();
});

exports.down = (knex) => knex.schema.dropTable('categories');
