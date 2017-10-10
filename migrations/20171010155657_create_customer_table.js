
exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTable('customers',function(table) {
      table.increments()
      table.integer('address_id').unsigned().index().references('id').inTable('addresses')
      table.string('customer_name')
      table.string('customer_email')
    })
  ])
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.dropTable('customers')
  ])
};
