exports.up = (knex) => knex.schema.createTable('products', (table) => {
    table.increments('product_id').primary();
    table.string('product_name', 100).notNullable();
    table.integer('supplier_id').unsigned().notNullable();
    table.integer('category_id').unsigned().notNullable();
    table.string('unit',50).notNullable();
    table.float('price').notNullable();
    table.float('quantity').notNullable();
    table.float('discount').notNullable();
    table.timestamp('created_at').defaultTo(knex.fn.now());
    table.timestamp('updated_at').defaultTo(knex.raw('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'));

    table.foreign('supplier_id').references('supplier_id').inTable('suppliers').onUpdate('CASCADE').onDelete('CASCADE');
    table.foreign('category_id').references('category_id').inTable('categories').onUpdate('CASCADE').onDelete('CASCADE');
});

exports.down = (knex) => knex.schema.dropTable('products');
