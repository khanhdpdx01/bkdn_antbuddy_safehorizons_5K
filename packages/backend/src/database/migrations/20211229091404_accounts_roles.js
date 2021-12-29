exports.up = (knex) => knex.schema.createTable('accounts_roles', (table) => {
    table.integer('account_id').unsigned().notNullable().references('id')
        .inTable('accounts');
    table.integer('role_id').unsigned().notNullable().references('id')
        .inTable('roles');
    table.primary(['account_id', 'role_id']);
});

exports.down = (knex) => knex.schema.dropTable('accounts_roles');
