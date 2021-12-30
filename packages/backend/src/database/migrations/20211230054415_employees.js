exports.up = (knex) => knex.schema.createTable('employees', (table) => {
    table.increments('employee_id').primary();
    table.string('last_name', 20).notNullable();
    table.string('first_name',20).notNullable();
    table.date('birth_date').notNullable();
    table.string('photo',255).notNullable();
    table.text('notes').notNullable();
    table.integer('account_id').unique().unsigned().notNullable()
        .references('account_id')
        .inTable('accounts');
    table.timestamp('created_at').defaultTo(knex.fn.now());
    table.timestamp('updated_at').defaultTo(knex.raw('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'));
});

exports.down = (knex) => knex.schema.dropTable('employees');
