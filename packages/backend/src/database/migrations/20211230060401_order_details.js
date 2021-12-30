exports.up = (knex) => knex.schema.createTable('order_details', (table) => {
    table.integer('order_id').unsigned().notNullable()
                .references('order_id').inTable('orders').onUpdate('CASCADE').onDelete('CASCADE');
    table.integer('product_id').unsigned().notNullable()
                .references('product_id').inTable('products').onUpdate('CASCADE').onDelete('CASCADE');
    table.integer('quantity').unsigned().notNullable();
    table.integer('order_details_status_id').unsigned().notNullable();
    table.float('price').notNullable();
    table.float('discount').unsigned().notNullable();
    table.timestamp('created_at').defaultTo(knex.fn.now());
    table.timestamp('updated_at').defaultTo(knex.raw('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'));

    table.primary(['order_id', 'product_id']);
    table.foreign('order_details_status_id').references('order_details_status_id').inTable('order_details_status').onUpdate('CASCADE').onDelete('CASCADE');
});

exports.down = (knex) => knex.schema.dropTable('order_details');
