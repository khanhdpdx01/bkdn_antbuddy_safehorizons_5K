exports.up = (knex) => knex.schema.createTable('auth_identities', (table) => {
    table.increments('id').primary();
    table.integer('account_id').unique().unsigned().notNullable()
        .references('account_id')
        .inTable('accounts');
    table.string('refresh_token', 500);
    table.string('email_verification_token', 500);
    table.string('password_reset_token', 500);
});

exports.down = (knex) => knex.schema.dropTable('auth_identities');
