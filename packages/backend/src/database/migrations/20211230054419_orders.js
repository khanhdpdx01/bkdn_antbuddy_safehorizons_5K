exports.up = (knex) => knex.schema.createTable('orders', (table) => {
    table.increments('order_id').primary();
    table.integer('customer_id').unsigned().notNullable();
    table.integer('employee_id').unsigned().notNullable();
    table.integer('shipper_id').unsigned().notNullable();
    table.integer('orders_status_id').unsigned().notNullable();
    table.integer('payment_id').unsigned().notNullable();
    table.date('order_date').notNullable();
    table.text('order_address').notNullable();
    table.float('ship_fee').notNullable();
    table.timestamp('created_at').defaultTo(knex.fn.now());
    table.timestamp('updated_at').defaultTo(knex.raw('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'));

    table.foreign('customer_id').references('customer_id').inTable('customers').onUpdate('CASCADE').onDelete('CASCADE');
    table.foreign('orders_status_id').references('orders_status_id').inTable('orders_status').onUpdate('CASCADE').onDelete('CASCADE');
    table.foreign('employee_id').references('employee_id').inTable('employees').onUpdate('CASCADE').onDelete('CASCADE');
    table.foreign('shipper_id').references('shipper_id').inTable('shippers').onUpdate('CASCADE').onDelete('CASCADE');
    table.foreign('payment_id').references('payment_id').inTable('payments').onUpdate('CASCADE').onDelete('CASCADE');
  // table.uuid('id').primary();
});

exports.down = (knex) => knex.schema.dropTable('orders');
