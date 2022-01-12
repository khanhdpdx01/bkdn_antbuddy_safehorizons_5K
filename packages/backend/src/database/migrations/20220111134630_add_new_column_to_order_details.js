exports.up = (knex) => knex.schema.table('order_details', (table) => {
    table.float('ship_fee');
});

exports.down = (knex) => knex.schema.table('order_details', (table) => {
        table.dropColumn('ship_fee');
});
