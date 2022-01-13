exports.up = (knex) => knex.schema.table('cart_items', (table) => {
    table.float('ship_fee');
});

exports.down = (knex) => knex.schema.table('cart_items', (table) => {
        table.dropColumn('ship_fee');
});
