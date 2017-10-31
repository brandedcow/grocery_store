
exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTable('customer_addresses', function(table) {
      table.increments()
      table.integer('customer_id').unsigned().index().references('id').inTable('customers')
      table.integer('address_id').unsigned().index().references('id').inTable('addresses')
    })
  ])
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.dropTable('purchases')
  ])
};
