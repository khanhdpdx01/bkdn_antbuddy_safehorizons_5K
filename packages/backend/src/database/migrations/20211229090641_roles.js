exports.up = (knex) => knex.schema.createTable('roles', (table) => {
  table.increments('id').primary();
  table.string('role_name', 50).unique().notNullable();
  // table.uuid('id').primary();
});

exports.down = (knex) => knex.schema.dropTable('roles');
