exports.up = (knex) => knex.schema.table('products', (table) => {
    table.json('images').nullable();
    table.string('thumbnail', 150).notNullable();
});

exports.down = (knex) => knex.schema.table('products', (table) => {
        table.dropColumn('images');
        table.dropColumn('thumbnail');
    });
