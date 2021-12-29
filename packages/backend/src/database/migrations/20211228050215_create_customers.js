exports.up = (knex) => knex.schema.createTable('customers', (table) => {
  table.increments('id').primary();
  table.string('company', 50);
  table.string('last_name', 50).notNullable();
  table.string('first_name', 50).notNullable();
  table.string('email_address', 50).unique().notNullable();
  table.string('job_title', 50);
  table.string('business_phone', 25).unique();
  table.string('home_phone', 25).unique();
  table.string('mobile_phone', 25).unique();
  table.string('fax_number', 25);
  table.longText('address');
  table.string('city', 50);
  table.string('state_province', 50);
  table.string('zip_postal_code', 15);
  table.string('country_region', 50);
  table.longText('web_page');
  table.longText('notes');
  table.specificType('attachments', 'LONGBLOB');
  table.timestamp('created_at').defaultTo(knex.fn.now());
  table.timestamp('updated_at').defaultTo(knex.raw('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'));
  // table.uuid('id').primary();
});

exports.down = (knex) => knex.schema.dropTable('customers');
