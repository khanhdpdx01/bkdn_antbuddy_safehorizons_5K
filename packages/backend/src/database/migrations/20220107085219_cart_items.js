exports.up = (knex) => knex.schema.createTable('cart_items', (table) => {
    table.integer('cart_id').unsigned().notNullable()
                .references('cart_id').inTable('cart');
    table.integer('product_id').unsigned().notNullable()
                .references('product_id').inTable('products').onUpdate('CASCADE').onDelete('CASCADE');
    table.integer('quantity').unsigned().notNullable();
    table.float('price').notNullable();
    table.float('discount').unsigned().notNullable();
    table.timestamp('created_at').defaultTo(knex.fn.now());
    table.timestamp('updated_at').defaultTo(knex.raw('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'));

    table.primary(['cart_id', 'product_id']);
});

exports.down = (knex) => knex.schema.dropTable('cart_items');
