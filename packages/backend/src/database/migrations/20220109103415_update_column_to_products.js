exports.up = (knex) => knex.schema.alterTable('products', (table) => {
    table.json('images').notNullable().alter();
});

exports.down = (knex) => knex.schema.alterTable('products', (table) => {
        table.dropColumn('images');
    });
